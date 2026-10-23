const introStorageKey = 'shea-desktop-intro-v1';

export function initDesktopIntro(surface: HTMLElement) {
  const overlay = document.querySelector<HTMLElement>('[data-boot-screen]');
  const skip = overlay?.querySelector<HTMLButtonElement>('[data-skip-intro]');
  if (!overlay || !skip) {
    delete document.documentElement.dataset.desktopBoot;
    return;
  }
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const timers = new Set<number>();
  let active = false;
  let returnFocus: HTMLElement | null = null;
  const later = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };
  const clearTimers = () => {
    for (const timer of timers) clearTimeout(timer);
    timers.clear();
  };
  const finish = (immediate = false) => {
    clearTimers();
    const restoreFocus = overlay.contains(document.activeElement);
    active = false;
    surface.inert = false;
    surface.dataset.arrived = 'true';
    delete document.documentElement.dataset.desktopBoot;
    overlay.dataset.leaving = 'true';
    if (restoreFocus) {
      const previous =
        returnFocus?.isConnected && returnFocus.matches('button, a, input, select, textarea, [tabindex]')
          ? returnFocus
          : null;
      (previous ?? surface.querySelector<HTMLElement>('[data-open-window]'))?.focus({ preventScroll: true });
    }
    if (immediate || reducedMotion.matches) overlay.hidden = true;
    else
      later(() => {
        overlay.hidden = true;
      }, 300);
  };
  const start = () => {
    if (active) return;
    if (reducedMotion.matches) {
      finish(true);
      return;
    }
    clearTimers();
    active = true;
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    surface.inert = true;
    delete surface.dataset.arrived;
    delete overlay.dataset.leaving;
    overlay.dataset.phase = '0';
    overlay.hidden = false;
    document.documentElement.dataset.desktopBoot = 'playing';
    try {
      sessionStorage.setItem(introStorageKey, 'seen');
    } catch {
      /* Storage is optional. */
    }
    skip.focus({ preventScroll: true });
    later(() => {
      overlay.dataset.phase = '1';
    }, 650);
    later(() => {
      overlay.dataset.phase = '2';
    }, 1350);
    later(() => finish(), 2200);
  };
  skip.addEventListener('click', () => finish());
  overlay.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      finish();
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      skip.focus();
    }
  });
  document.querySelector('[data-replay-intro]')?.addEventListener('click', start);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && active) finish(true);
  });
  window.addEventListener('pagehide', () => finish(true));
  let seen = false;
  try {
    seen = sessionStorage.getItem(introStorageKey) === 'seen';
  } catch {
    /* Storage is optional. */
  }
  if (!seen && !location.hash && !reducedMotion.matches) start();
  else finish(true);
}
