import { regionIds, type RegionId } from '~/i18n/dictionaries';
import {
  cascadePosition,
  constrainPosition,
  focusOrder,
  parseWindowLayout,
  windowGutter,
  type Point,
  type Viewport,
} from '~/utils/desktop-windows';

const storageKey = 'shea-window-layout-v1';

function viewportBounds(): Viewport {
  const viewport = window.visualViewport;
  const left = viewport?.offsetLeft ?? 0;
  const viewportTop = viewport?.offsetTop ?? 0;
  const height = viewport?.height ?? window.innerHeight;
  const header = document.querySelector('.os-desktop .desktop-header')?.getBoundingClientRect();
  const taskbar = document.querySelector('.os-taskbar')?.getBoundingClientRect();
  const top = Math.max(viewportTop, header ? header.bottom + 6 : viewportTop);
  const bottom = Math.min(viewportTop + height, taskbar ? taskbar.top - 6 : viewportTop + height);
  return {
    left,
    top,
    width: viewport?.width ?? document.documentElement.clientWidth,
    height: Math.max(1, bottom - top),
  };
}

export function initDesktop(signal: AbortSignal) {
  const root = document.querySelector<HTMLElement>('.workspace');
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = 'true';

  const clock = root.querySelector<HTMLTimeElement>('[data-desktop-clock]');
  if (clock) {
    const clockLocale =
      root.dataset.localeName === 'ja' ? 'ja-JP' : root.dataset.localeName === 'en' ? 'en-GB' : 'zh-CN';
    const updateClock = () => {
      const now = new Date();
      clock.dateTime = now.toISOString();
      clock.textContent = new Intl.DateTimeFormat(clockLocale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
    };
    updateClock();
    const timer = window.setInterval(updateClock, 30000);
    signal.addEventListener('abort', () => clearInterval(timer), { once: true });
  }

  const dialogs = new Map<RegionId, HTMLDialogElement>();
  const positions = new Map<RegionId, Point>();
  const openers = new Map<RegionId, HTMLElement>();
  const arrangeButton = document.querySelector<HTMLButtonElement>('[data-arrange-windows]');
  let order: RegionId[] = [];
  const requestedRegion = regionIds.find((id) => id === location.hash.slice(1));

  for (const id of regionIds) {
    const dialog = document.querySelector<HTMLDialogElement>(`#window-${id}`);
    if (dialog) dialogs.set(id, dialog);
  }

  const persist = () => {
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          version: 1,
          windows: order.map((id) => ({ id, position: positions.get(id) })),
        })
      );
    } catch {
      /* The desktop also works without storage. */
    }
  };

  const sync = () => {
    const active = order.at(-1);
    if (arrangeButton) arrangeButton.disabled = order.length === 0;
    const status = root.querySelector<HTMLElement>('[data-window-status]');
    if (status)
      status.textContent = order.length ? `${order.length} ${status.dataset.countLabel}` : (status.dataset.empty ?? '');
    for (const [id, dialog] of dialogs) {
      dialog.dataset.active = String(id === active);
      dialog.style.zIndex = String(30 + order.indexOf(id));
    }
    document.querySelectorAll<HTMLButtonElement>('[data-open-window]').forEach((button) => {
      const id = regionIds.find((region) => region === button.dataset.openWindow);
      button.setAttribute('aria-expanded', String(Boolean(id && dialogs.get(id)?.open)));
      button.classList.toggle('is-active', id === active);
    });
    const suffix = active ? `#${active}` : '';
    history.replaceState(history.state, '', `${location.pathname}${location.search}${suffix}`);
  };

  const bringToFront = (id: RegionId) => {
    if (!dialogs.get(id)?.open) return;
    order = focusOrder(order, id);
    sync();
  };

  const constrainSize = (dialog: HTMLDialogElement) => {
    const viewport = viewportBounds();
    dialog.style.maxWidth = `${Math.max(1, viewport.width - windowGutter * 2)}px`;
    dialog.style.maxHeight = `${Math.max(1, Math.min(760, viewport.height - windowGutter * 2))}px`;
  };

  const moveTo = (id: RegionId, target: Point) => {
    const dialog = dialogs.get(id);
    if (!dialog?.open) return;
    const rect = dialog.getBoundingClientRect();
    const position = constrainPosition(target, rect, viewportBounds());
    dialog.style.left = `${position.x}px`;
    dialog.style.top = `${position.y}px`;
    positions.set(id, position);
  };

  const openWindow = (id: RegionId, trigger?: HTMLElement, restored?: Point, focus = true) => {
    const dialog = dialogs.get(id);
    if (!dialog) return;
    if (trigger) openers.set(id, trigger);
    if (!dialog.open) {
      constrainSize(dialog);
      dialog.show();
      const point =
        restored ??
        positions.get(id) ??
        cascadePosition(order.length, dialog.getBoundingClientRect(), viewportBounds());
      moveTo(id, point);
    }
    bringToFront(id);
    if (focus) dialog.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    persist();
  };

  const removeClosed = (id: RegionId) => {
    order = order.filter((region) => region !== id);
    sync();
    persist();
  };

  const closeWindow = (id: RegionId) => {
    const dialog = dialogs.get(id);
    if (!dialog?.open) return;
    const restoreFocus = dialog.contains(document.activeElement);
    const remainingOrder = order.filter((region) => region !== id);
    dialog.close();
    // Native focus restoration can promote an older window during close().
    order = remainingOrder;
    removeClosed(id);
    if (restoreFocus) {
      const next = order.at(-1);
      const focusTarget = next
        ? dialogs.get(next)?.querySelector<HTMLElement>('h2')
        : (openers.get(id) ?? document.querySelector<HTMLElement>(`[data-open-window="${id}"]`));
      focusTarget?.focus({ preventScroll: true });
    }
  };

  interface Drag {
    id: RegionId;
    pointerId: number;
    handle: HTMLElement;
    pointer: Point;
    origin: Point;
  }
  let drag: Drag | null = null;
  let pending: Point | null = null;
  let dragFrame = 0;

  const flushDrag = () => {
    dragFrame = 0;
    if (drag && pending) moveTo(drag.id, pending);
    pending = null;
  };

  const finishDrag = () => {
    if (!drag) return;
    if (dragFrame) cancelAnimationFrame(dragFrame);
    flushDrag();
    const previous = drag;
    drag = null;
    dialogs.get(previous.id)?.removeAttribute('data-dragging');
    document.body.classList.remove('is-dragging-window');
    if (previous.handle.hasPointerCapture(previous.pointerId))
      previous.handle.releasePointerCapture(previous.pointerId);
    persist();
  };

  for (const [id, dialog] of dialogs) {
    dialog.addEventListener('pointerdown', () => bringToFront(id));
    dialog.addEventListener('focusin', () => bringToFront(id));
    dialog.querySelector('[data-close-window]')?.addEventListener('click', () => {
      finishDrag();
      closeWindow(id);
    });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      finishDrag();
      closeWindow(id);
    });
    dialog.addEventListener('close', () => {
      // A queued close event must not remove a window that was reopened meanwhile.
      if (!dialog.open && order.includes(id)) removeClosed(id);
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        finishDrag();
        closeWindow(id);
      }
    });

    const handle = dialog.querySelector<HTMLButtonElement>('[data-drag-window]');
    if (!handle) continue;
    handle.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary || event.button !== 0 || drag) return;
      event.preventDefault();
      handle.focus({ preventScroll: true });
      bringToFront(id);
      const rect = dialog.getBoundingClientRect();
      drag = {
        id,
        pointerId: event.pointerId,
        handle,
        pointer: { x: event.clientX, y: event.clientY },
        origin: { x: rect.left, y: rect.top },
      };
      dialog.dataset.dragging = 'true';
      document.body.classList.add('is-dragging-window');
      try {
        handle.setPointerCapture(event.pointerId);
      } catch {
        /* Global listeners still handle movement within the page. */
      }
    });
    handle.addEventListener('lostpointercapture', (event) => {
      if (drag?.pointerId === event.pointerId) finishDrag();
    });
    handle.addEventListener('keydown', (event) => {
      const steps: Record<string, Point> = {
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
      };
      const step = steps[event.key];
      if (event.altKey || event.ctrlKey || event.metaKey || (!step && event.key !== 'Home')) return;
      event.preventDefault();
      finishDrag();
      bringToFront(id);
      const rect = dialog.getBoundingClientRect();
      const distance = event.shiftKey ? 32 : 8;
      moveTo(
        id,
        step
          ? { x: rect.left + step.x * distance, y: rect.top + step.y * distance }
          : cascadePosition(order.indexOf(id), rect, viewportBounds())
      );
      persist();
    });
  }

  window.addEventListener(
    'pointermove',
    (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      pending = {
        x: drag.origin.x + event.clientX - drag.pointer.x,
        y: drag.origin.y + event.clientY - drag.pointer.y,
      };
      if (!dragFrame) dragFrame = requestAnimationFrame(flushDrag);
    },
    { signal }
  );
  window.addEventListener(
    'pointerup',
    (event) => {
      if (drag?.pointerId === event.pointerId) {
        pending = {
          x: drag.origin.x + event.clientX - drag.pointer.x,
          y: drag.origin.y + event.clientY - drag.pointer.y,
        };
        finishDrag();
      }
    },
    { signal }
  );
  window.addEventListener(
    'pointercancel',
    (event) => {
      if (drag?.pointerId === event.pointerId) finishDrag();
    },
    { signal }
  );
  window.addEventListener('blur', finishDrag, { signal });
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) finishDrag();
    },
    { signal }
  );

  let resizeFrame = 0;
  const resizeWindows = () => {
    if (resizeFrame) return;
    finishDrag();
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      for (const id of order) {
        const dialog = dialogs.get(id);
        if (!dialog) continue;
        constrainSize(dialog);
        moveTo(id, positions.get(id) ?? cascadePosition(0, dialog.getBoundingClientRect(), viewportBounds()));
      }
      persist();
    });
  };
  window.addEventListener('resize', resizeWindows, { signal });
  window.visualViewport?.addEventListener('resize', resizeWindows, { signal });
  window.visualViewport?.addEventListener('scroll', resizeWindows, { signal });

  document.querySelectorAll<HTMLButtonElement>('[data-open-window]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = regionIds.find((region) => region === button.dataset.openWindow);
      if (id) openWindow(id, button);
    });
  });
  arrangeButton?.addEventListener('click', () => {
    finishDrag();
    order.forEach((id, index) => {
      const dialog = dialogs.get(id);
      if (dialog) moveTo(id, cascadePosition(index, dialog.getBoundingClientRect(), viewportBounds()));
    });
    persist();
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-locale]').forEach((link) => {
    link.addEventListener('click', () => {
      finishDrag();
      persist();
      try {
        localStorage.setItem('shea-locale', link.dataset.locale ?? 'zh');
      } catch {
        /* Storage is optional. */
      }
      const target = new URL(link.href);
      target.hash = location.hash;
      target.search = location.search;
      link.href = target.href;
    });
  });
  window.addEventListener(
    'hashchange',
    () => {
      const id = regionIds.find((region) => region === location.hash.slice(1));
      if (id) openWindow(id);
    },
    { signal }
  );
  signal.addEventListener(
    'abort',
    () => {
      finishDrag();
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      persist();
      delete root.dataset.initialized;
    },
    { once: true }
  );

  try {
    const saved = parseWindowLayout(JSON.parse(sessionStorage.getItem(storageKey) ?? 'null'), regionIds);
    for (const item of saved.windows) {
      const id = regionIds.find((region) => region === item.id);
      if (id) openWindow(id, undefined, item.position, false);
    }
  } catch {
    /* Invalid or disabled storage starts a fresh desktop. */
  }
  if (requestedRegion) openWindow(requestedRegion);
  sync();
}
