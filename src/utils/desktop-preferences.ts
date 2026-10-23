/** Shared by the desktop and the project reading view. */
export function initThemeControls() {
  const themeSelect = document.querySelector<HTMLSelectElement>('#theme-select');
  const media = matchMedia('(prefers-color-scheme: dark)');
  const setTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && media.matches));
  };
  if (themeSelect) {
    themeSelect.value = document.documentElement.dataset.theme ?? 'system';
    themeSelect.addEventListener('change', () => {
      setTheme(themeSelect.value);
      try {
        localStorage.setItem('shea-theme', themeSelect.value);
      } catch {
        /* Storage is optional. */
      }
    });
  }
  media.addEventListener('change', () => {
    if (document.documentElement.dataset.theme === 'system') setTheme('system');
  });
}

export function rememberLocaleSelection() {
  document.querySelectorAll<HTMLAnchorElement>('[data-locale]').forEach((link) => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem('shea-locale', link.dataset.locale ?? 'zh');
      } catch {
        /* Storage is optional. */
      }
    });
  });
}
