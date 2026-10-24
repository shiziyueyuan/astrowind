export function initContactTerminal() {
  document.querySelectorAll<HTMLElement>('[data-contact-terminal]').forEach((root) => {
    if (root.dataset.initialized) return;
    root.dataset.initialized = 'true';
    const feedback = root.querySelector<HTMLElement>('[data-contact-feedback]');
    const resetTimers = new Map<HTMLButtonElement, number>();
    let latestRequest = 0;

    root.querySelectorAll<HTMLButtonElement>('[data-copy-contact]').forEach((button) => {
      const label = button.querySelector<HTMLElement>('[data-copy-label]');
      const idleLabel = label?.textContent ?? '';
      button.hidden = false;
      button.addEventListener('click', async () => {
        const account = button.dataset.copyContact;
        if (!account || button.disabled) return;
        const request = ++latestRequest;
        const previousTimer = resetTimers.get(button);
        if (previousTimer) window.clearTimeout(previousTimer);
        button.disabled = true;
        if (feedback) feedback.textContent = '';

        try {
          if (!navigator.clipboard?.writeText) throw new Error('Manual copy required');
          await navigator.clipboard.writeText(account);
          document.dispatchEvent(new Event('shea:copied'));
          if (label) label.textContent = root.dataset.copyDone ?? idleLabel;
          if (feedback && request === latestRequest)
            feedback.textContent = (root.dataset.copySuccess ?? '').replace(
              '{channel}',
              button.dataset.channelName ?? ''
            );
          resetTimers.set(
            button,
            window.setTimeout(() => {
              if (label) label.textContent = idleLabel;
              resetTimers.delete(button);
            }, 2200)
          );
        } catch {
          if (label) label.textContent = idleLabel;
          if (request === latestRequest) {
            const value = button.closest('[data-contact-channel]')?.querySelector('[data-contact-value]');
            const selection = window.getSelection();
            if (value && selection) {
              const range = document.createRange();
              range.selectNodeContents(value);
              selection.removeAllRanges();
              selection.addRange(range);
            }
            if (feedback) feedback.textContent = root.dataset.copyManual ?? '';
          }
        } finally {
          button.disabled = false;
        }
      });
    });

    window.addEventListener(
      'pagehide',
      () => {
        for (const timer of resetTimers.values()) window.clearTimeout(timer);
        resetTimers.clear();
      },
      { once: true }
    );
  });
}
