import type { Locale } from '~/i18n';

interface ShellCopy {
  desktop: string;
  launchHint: string;
  onDesk: string;
  readme: string;
  note: string;
  welcome: string;
  systemReady: string;
  noWindows: string;
  openWindows: string;
  replay: string;
  skip: string;
  bootTitle: string;
  bootSteps: [string, string, string];
  clock: string;
  dock: string;
  identity: string;
}

export const shellCopy = {
  zh: {
    desktop: '创作桌面',
    launchHint: '单击打开，随好奇心探索。',
    onDesk: '桌上的作品',
    readme: '从这里开始',
    note: '没有固定路线。打开一个图标，或把几个窗口并排放着。',
    welcome: '你好，欢迎来到我的桌面。',
    systemReady: '随时开始探索',
    noWindows: '桌面',
    openWindows: '个窗口已打开',
    replay: '重播开场',
    skip: '跳过开场',
    bootTitle: '让好奇心，找到入口。',
    bootSteps: ['打开创作空间', '连接想法与作品', '桌面已就绪'],
    clock: '本地时间',
    dock: '快捷启动栏',
    identity: '跨领域创造者 / 时咨月圆',
  },
  en: {
    desktop: 'Creative desktop',
    launchHint: 'Click to open. Follow your curiosity.',
    onDesk: 'On my desk',
    readme: 'Start here',
    note: 'There is no set route. Open an icon, or keep a few windows side by side.',
    welcome: 'Hello. Make yourself at home.',
    systemReady: 'Ready to explore',
    noWindows: 'Desktop',
    openWindows: 'windows open',
    replay: 'Replay intro',
    skip: 'Skip intro',
    bootTitle: 'A way in for your curiosity.',
    bootSteps: ['Opening the workspace', 'Connecting ideas and work', 'Your desktop is ready'],
    clock: 'Local time',
    dock: 'Quick launch',
    identity: 'Cross-disciplinary creator / Shea',
  },
  ja: {
    desktop: '創作デスク',
    launchHint: 'クリックして、好奇心のままに。',
    onDesk: 'デスクの作品',
    readme: 'ここからどうぞ',
    note: '決まった順路はありません。アイコンを開いたり、いくつかのウィンドウを並べたり。',
    welcome: 'こんにちは。ようこそ、私のデスクへ。',
    systemReady: '探索をはじめよう',
    noWindows: 'デスクトップ',
    openWindows: '個のウィンドウ',
    replay: 'オープニングを再生',
    skip: 'スキップ',
    bootTitle: '好奇心の、入り口へ。',
    bootSteps: ['創作の空間を開く', 'アイデアと作品をつなぐ', 'デスクの準備ができました'],
    clock: 'ローカル時刻',
    dock: 'クイック起動',
    identity: '分野を越えてつくる人 / Shea',
  },
} satisfies Record<Locale, ShellCopy>;
