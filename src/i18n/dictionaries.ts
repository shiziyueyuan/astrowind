import type { Locale } from './index';

export const regionIds = ['entry', 'identity', 'archive', 'lab', 'signal'] as const;
export type RegionId = (typeof regionIds)[number];

interface RegionCopy {
  label: string;
  title: string;
  body: string;
  items: string[];
  note: string;
}

export interface Dictionary {
  pageTitle: string;
  description: string;
  skip: string;
  workspace: string;
  building: string;
  language: string;
  theme: string;
  themes: { system: string; light: string; dark: string };
  eyebrow: string;
  headline: [string, string];
  introduction: string;
  invitation: string;
  explore: string;
  exploreHint: string;
  terminalGreeting: string;
  terminalLine: string;
  terminalPrompt: string;
  open: string;
  close: string;
  windowMove: string;
  windowMoveHint: string;
  windowMoveHelp: string;
  arrangeWindows: string;
  navigation: string;
  footer: string;
  signature: string;
  artCaption: string;
  roles: [string, string, string, string];
  regions: Record<RegionId, RegionCopy>;
}

export const dictionaries = {
  zh: {
    pageTitle: '时咨月圆 / Shea — 把想法变成作品',
    description: '时咨月圆 / Shea 的个人创作桌面。在谜题、代码、影像与协作之间，把想法变成作品。',
    skip: '跳至探索入口',
    workspace: '个人创作工作台',
    building: '持续构建中',
    language: '切换语言',
    theme: '显示主题',
    themes: { system: '跟随系统', light: '浅色', dark: '深色' },
    eyebrow: '思考 / 尝试 / 创造',
    headline: ['把想法', '变成作品。'],
    introduction: '我是时咨月圆，也可以叫我 Shea。\n在不同领域之间游走，让好奇心找到出口。',
    invitation: '随意打开一扇窗口。',
    explore: '开始探索',
    exploreHint: '五个入口，没有固定顺序。',
    terminalGreeting: '你好，陌生的同路人。',
    terminalLine: '一个想法，可以从这里开始。',
    terminalPrompt: '等待下一次好奇',
    open: '打开窗口',
    close: '关闭窗口',
    windowMove: '移动窗口',
    windowMoveHint: '拖动标题栏 · ESC 关闭',
    windowMoveHelp:
      '拖动标题栏移动窗口。标题栏获得焦点后，可用方向键移动，Shift 加速，Home 复位；Escape 关闭当前窗口。',
    arrangeWindows: '整理窗口',
    navigation: '探索五个区域',
    footer: '保持好奇，允许未完成。',
    signature: '一个持续生长的个人空间',
    artCaption: '让好奇心指引方向 ↗',
    roles: ['创造者', '探索者', '协作者', '问题解决者'],
    regions: {
      entry: {
        label: '数字入口',
        title: '欢迎，随意探索。',
        body: '这里是时咨月圆 / Shea 的创作桌面。你可以从任何一个窗口开始，在想法与作品之间自由走动。',
        items: ['打开窗口，发现一个方向', '切换主题，换一种观看方式', '沿着好奇心，选择下一站'],
        note: '每一次打开，都可以是新的起点。',
      },
      identity: {
        label: '关于我',
        title: '跨过边界，继续创造。',
        body: 'Builder、Explorer、Collaborator、Problem Solver。用不同的工具回应问题，在创造和协作中，让想法逐渐成形。',
        items: ['把问题拆开，再把可能性连接起来', '在代码、叙事与视觉之间寻找表达', '重视一起做事的人，也重视过程'],
        note: '时咨月圆 / Shea，是我在这里的名字。',
      },
      archive: {
        label: '项目档案',
        title: '作品，也有来时的路。',
        body: '从一个问题出发，留下建模、试验与反思的过程。打开一份档案，沿着思路继续探索。',
        items: ['ARG 与合作谜题', 'Vibe Coding · 网站开发', 'Vibe Videoing · 视频创作', '线上社群与活动', '视觉创意'],
        note: '更多创作过程，陆续整理。',
      },
      lab: {
        label: '实验与记录',
        title: '让不确定，先发生。',
        body: '一些代码，一些画面，一些暂时没有答案的念头。在这里保留试验，也保留思考的痕迹。',
        items: ['日志 · 记录正在发生的事', '观点 · 整理值得讨论的问题', '实验 · 留下尝试、迭代与发现'],
        note: '一些文字与实验，在这里慢慢积累。',
      },
      signal: {
        label: '联系终端',
        title: '下一个想法，也许来自你。',
        body: '一个问题，一次交流，或一段共同创造的可能。欢迎带着好奇心靠近。',
        items: ['一起做一个有趣的东西', '交换想法与不同的视角', '探索跨领域合作的可能'],
        note: '添加好友时，可以简单说说你想聊的事。',
      },
    },
  },
  en: {
    pageTitle: 'Shea / 时咨月圆 — Ideas into things',
    description:
      'The creative desktop of Shea / 时咨月圆. Turning ideas into things through puzzles, code, moving images and collaboration.',
    skip: 'Skip to exploration',
    workspace: 'A personal creative workspace',
    building: 'Always building',
    language: 'Choose language',
    theme: 'Display theme',
    themes: { system: 'System', light: 'Light', dark: 'Dark' },
    eyebrow: 'THINK / TRY / MAKE',
    headline: ['Ideas into', 'things.'],
    introduction: 'I’m Shea, also known as 时咨月圆.\nMoving between disciplines, making room for curiosity.',
    invitation: 'Open any window.',
    explore: 'Start exploring',
    exploreHint: 'Five ways in. No set order.',
    terminalGreeting: 'Hello, fellow wanderer.',
    terminalLine: 'An idea can begin right here.',
    terminalPrompt: 'Waiting for a little curiosity',
    open: 'Open window',
    close: 'Close window',
    windowMove: 'Move window',
    windowMoveHint: 'Drag title bar · ESC to close',
    windowMoveHelp:
      'Drag the title bar to move. With the title bar focused, use arrow keys to move, Shift for larger steps, and Home to reset. Escape closes this window.',
    arrangeWindows: 'Arrange windows',
    navigation: 'Explore five regions',
    footer: 'Stay curious. Leave room for the unfinished.',
    signature: 'A personal space, still growing',
    artCaption: 'CURIOSITY IS A DIRECTION ↗',
    roles: ['Builder', 'Explorer', 'Collaborator', 'Problem Solver'],
    regions: {
      entry: {
        label: 'Digital entrance',
        title: 'Welcome. Wander freely.',
        body: 'This is the creative desktop of Shea / 时咨月圆. Start with any window and find your own way between ideas and things.',
        items: [
          'Open a window, find a direction',
          'Switch the theme, change your perspective',
          'Let curiosity choose the next stop',
        ],
        note: 'Every window can be a new beginning.',
      },
      identity: {
        label: 'About me',
        title: 'Across boundaries. Into making.',
        body: 'Builder, Explorer, Collaborator, Problem Solver. Different tools for different questions; ideas taking shape through making and working together.',
        items: [
          'Take a problem apart, connect the possibilities',
          'Find expression between code, narrative and visuals',
          'Value the people and the process of making together',
        ],
        note: 'Shea / 时咨月圆 is the name I use here.',
      },
      archive: {
        label: 'Project archive',
        title: 'Every work has a way here.',
        body: 'Start with a question. Follow the models, experiments and reflections that turn it into a piece of work.',
        items: [
          'ARG & collaborative puzzles',
          'Vibe Coding · websites',
          'Vibe Videoing · moving images',
          'Online communities & events',
          'Visual creativity',
        ],
        note: 'More creative processes are being documented.',
      },
      lab: {
        label: 'Experiments & journal',
        title: 'Let the uncertain take shape.',
        body: 'Some code, some images, some thoughts without an answer yet. A place for experiments and the traces of thinking.',
        items: [
          'Journal · what is happening along the way',
          'Essays · questions worth discussing',
          'Experiments · attempts, iterations and discoveries',
        ],
        note: 'A growing collection of writing and experiments.',
      },
      signal: {
        label: 'Contact terminal',
        title: 'The next idea might be yours.',
        body: 'A question, a conversation, or a possibility to make something together. Bring your curiosity.',
        items: [
          'Make something interesting together',
          'Exchange ideas and perspectives',
          'Explore collaboration across disciplines',
        ],
        note: 'When adding me, include a short note about what you would like to discuss.',
      },
    },
  },
  ja: {
    pageTitle: '时咨月圆 / Shea — アイデアを、かたちに',
    description: '时咨月圆 / Shea の創作デスク。謎解き、コード、映像、コラボレーションを通じて、アイデアをかたちに。',
    skip: '探索メニューへ移動',
    workspace: '個人の創作ワークスペース',
    building: 'いつも制作中',
    language: '言語を選択',
    theme: '表示テーマ',
    themes: { system: 'システム', light: 'ライト', dark: 'ダーク' },
    eyebrow: '考える / 試す / つくる',
    headline: ['アイデアを、', 'かたちに。'],
    introduction: '时咨月圆、あるいは Shea。\n分野のあいだを行き来して、好奇心の出口を探しています。',
    invitation: '気になる窓を、開いてみて。',
    explore: '探索をはじめる',
    exploreHint: '入口は五つ。順番は自由。',
    terminalGreeting: 'はじめまして、旅の仲間。',
    terminalLine: 'アイデアは、ここからはじまる。',
    terminalPrompt: '次の好奇心を待っています',
    open: '窓を開く',
    close: '窓を閉じる',
    windowMove: '窓を移動',
    windowMoveHint: 'タイトルバーで移動 · ESC で閉じる',
    windowMoveHelp:
      'タイトルバーをドラッグして移動できます。タイトルバーにフォーカスした状態で矢印キーで移動、Shift で大きく移動、Home で位置を戻せます。Escape でこの窓を閉じます。',
    arrangeWindows: '窓を整列',
    navigation: '五つのエリアを探索',
    footer: '好奇心を忘れず、未完成の余白を。',
    signature: '育ちつづける、個人の空間',
    artCaption: '好奇心を、道しるべに ↗',
    roles: ['つくる人', '探る人', 'ともにつくる人', '問題を解く人'],
    regions: {
      entry: {
        label: 'デジタルの入口',
        title: 'ようこそ。自由に歩こう。',
        body: 'ここは时咨月圆 / Shea の創作デスク。どの窓からでも、アイデアと作品のあいだを自由に探索できます。',
        items: ['窓を開いて、方向を見つける', 'テーマを変えて、見方を変える', '好奇心に、次の行き先を任せる'],
        note: 'どの窓も、新しいはじまりに。',
      },
      identity: {
        label: '私について',
        title: '境界を越えて、つくりつづける。',
        body: 'Builder、Explorer、Collaborator、Problem Solver。問いに合わせて道具を選び、制作と協働を通じてアイデアをかたちにします。',
        items: [
          '問題をほどき、可能性をつなぐ',
          'コード、物語、ビジュアルのあいだで表現を探す',
          'ともにつくる人と、その過程を大切にする',
        ],
        note: 'ここでは、时咨月圆 / Shea と名乗っています。',
      },
      archive: {
        label: 'プロジェクト記録',
        title: '作品に至る道も、残しておく。',
        body: 'ひとつの問いから、モデル、実験、振り返りへ。記録を開いて、思考の道筋をたどってみてください。',
        items: [
          'ARG・共同制作の謎解き',
          'Vibe Coding · ウェブ制作',
          'Vibe Videoing · 映像制作',
          'オンラインコミュニティ・イベント',
          'ビジュアル表現',
        ],
        note: 'ほかの制作過程も、少しずつ記録しています。',
      },
      lab: {
        label: '実験と記録',
        title: 'まだわからないものを、試してみる。',
        body: 'コード、映像、まだ答えのない考え。実験も、思考の足跡も、そのまま残していく場所です。',
        items: ['日誌 · いま起きていること', 'エッセイ · 話し合いたい問い', '実験 · 試行、反復、発見'],
        note: '文章と実験を、少しずつ残していきます。',
      },
      signal: {
        label: '連絡ターミナル',
        title: '次のアイデアは、あなたから。',
        body: 'ひとつの問い、対話、あるいは一緒につくる可能性。好奇心を持って、気軽に近づいてください。',
        items: ['おもしろいものを一緒につくる', 'アイデアや異なる視点を交換する', '分野を越えた協働の可能性を探る'],
        note: '友だち追加の際は、話したいことをひとこと添えてください。',
      },
    },
  },
} satisfies Record<Locale, Dictionary>;
