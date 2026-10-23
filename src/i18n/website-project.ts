import type { Locale } from './index';

export const websiteProjectCopy = {
  zh: {
    visualDescription: '创作桌面示意：五个入口、SHEA 字标和可以打开的项目窗口。',
    visualCaption: '从一句想法，到一张可以探索的桌面。',
    tagline: '把想法变成作品。',
    stages: ['想法与方向', '对话与迭代', '构建与上线'],
    end: '桌面已经打开，创作还在继续。',
  },
  en: {
    visualDescription: 'A creative desktop illustration with five entrances, the SHEA wordmark and project windows.',
    visualCaption: 'From an idea to a desktop someone can explore.',
    tagline: 'Turn ideas into things.',
    stages: ['Ideas & direction', 'Dialogue & iteration', 'Build & publish'],
    end: 'The desktop is open. The making continues.',
  },
  ja: {
    visualDescription: '五つの入口、SHEA のワードマーク、プロジェクトの窓を配した創作デスクのイメージ。',
    visualCaption: '一つのアイデアから、探索できるデスクへ。',
    tagline: 'アイデアを、かたちに。',
    stages: ['アイデアと方向', '対話と修正', 'ビルドと公開'],
    end: 'デスクは開きました。創作は続きます。',
  },
} satisfies Record<
  Locale,
  { visualDescription: string; visualCaption: string; tagline: string; stages: string[]; end: string }
>;
