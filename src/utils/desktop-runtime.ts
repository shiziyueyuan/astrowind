import { initDesktop } from '~/components/desktop/desktop-controller';
import { initDesktopIntro } from '~/components/desktop/desktop-intro';
import { initContactTerminal } from '~/components/desktop/contact-controller';
import { initDesktopAudio } from './desktop-audio';
import { applyTheme, initThemeControls, rememberLocaleSelection } from './desktop-preferences';

// Page controls belong to the current DOM; audio belongs to this browser document.
let page: AbortController | undefined;
let mountedBody: HTMLElement | undefined;
const disposePage = () => {
  page?.abort();
  page = undefined;
  mountedBody = undefined;
};

document.addEventListener('astro:before-swap', disposePage);
document.addEventListener('astro:after-swap', applyTheme);
window.addEventListener('pagehide', (event) => {
  if (!event.persisted) disposePage();
});
document.addEventListener('astro:page-load', () => {
  if (page && mountedBody === document.body) return;
  disposePage();
  mountedBody = document.body;
  page = new AbortController();
  const { signal } = page;
  initThemeControls(signal);
  rememberLocaleSelection(signal);
  initDesktopAudio();
  initContactTerminal(signal);
  const surface = document.querySelector<HTMLElement>('[data-desktop-surface]');
  if (surface) {
    initDesktop(signal);
    initDesktopIntro(surface, signal);
  }
  const search = document.querySelector<HTMLInputElement>('[data-journal-search]');
  const items = [...document.querySelectorAll<HTMLElement>('[data-journal-item]')];
  search?.addEventListener(
    'input',
    () => {
      const query = search.value.trim().toLocaleLowerCase();
      for (const item of items) item.hidden = !(item.dataset.search ?? '').toLocaleLowerCase().includes(query);
      const empty = document.querySelector<HTMLElement>('[data-journal-no-match]');
      if (empty) empty.hidden = items.some((item) => !item.hidden);
    },
    { signal }
  );
});
