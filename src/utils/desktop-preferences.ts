/** Shared by the desktop and the project reading view. */
export function applyTheme() {
  let theme = 'system';
  try {
    const saved = localStorage.getItem('shea-theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) theme = saved;
  } catch {
    /* Storage is optional. */
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle(
    'dark',
    theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

export function initThemeControls(signal: AbortSignal) {
  const themeSelect = document.querySelector<HTMLSelectElement>('#theme-select');
  const media = matchMedia('(prefers-color-scheme: dark)');
  const setTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && media.matches));
  };
  if (themeSelect) {
    themeSelect.value = document.documentElement.dataset.theme ?? 'system';
    themeSelect.addEventListener(
      'change',
      () => {
        setTheme(themeSelect.value);
        try {
          localStorage.setItem('shea-theme', themeSelect.value);
        } catch {
          /* Storage is optional. */
        }
      },
      { signal }
    );
  }
  media.addEventListener(
    'change',
    () => {
      if (document.documentElement.dataset.theme === 'system') setTheme('system');
    },
    { signal }
  );
}

export function rememberLocaleSelection(signal: AbortSignal) {
  document.querySelectorAll<HTMLAnchorElement>('[data-locale]').forEach((link) => {
    link.addEventListener(
      'click',
      () => {
        try {
          localStorage.setItem('shea-locale', link.dataset.locale ?? 'zh');
        } catch {
          /* Storage is optional. */
        }
      },
      { signal }
    );
  });
}
