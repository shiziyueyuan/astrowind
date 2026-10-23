import type { Locale } from './index';

interface VideoCopy {
  play: string;
  posterAlt: string;
  sectionTitle: string;
  languageNote: string;
  notice: string;
  captions: string;
  fallback: string;
  stages: [string, string, string];
  end: string;
}
interface ArchiveCopy {
  video: VideoCopy;
  open: string;
  back: string;
  skip: string;
  contents: string;
  end: string;
  visualTitle: string;
  visualDescription: string;
  visualCaption: string;
  models: [string, string, string];
  anchors: [string, string];
  stages: [string, string, string];
}

export const archiveCopy = {
  zh: {
    video: {
      play: '观看网站展示版',
      posterAlt: '实际成片画面：室内纸框背景、角色与拉普拉斯谜题小课堂标题。',
      sectionTitle: '影像现场',
      languageNote: '网站展示版 · 中文配音 / 中文字幕。中英日制作记录见下方。',
      notice: '含谜底与剧情剧透。游戏本体含跳脸微恐内容；若要亲自游玩，请做好一定心理准备。',
      captions: '中文（原声字幕）',
      fallback: '浏览器无法直接播放时，可打开视频：',
      stages: ['素材与叙事', '剪辑与动效', '观看与修订'],
      end: '把线索，变成看得见的叙事。',
    },
    open: '打开项目档案',
    back: '返回创作桌面',
    skip: '跳至项目正文',
    contents: '阅读路径',
    end: '让观察，走向下一个问题。',
    visualTitle: '同一组锚点，不同的曲线假说。',
    visualDescription: '圆弧、抛物线和倒悬链线经过相同的两个拱脚与拱顶，但中段轮廓有所不同。',
    visualCaption: '候选曲线概念示意，不对应研究对象的实测数据。',
    models: ['圆弧', '抛物线', '悬链线'],
    anchors: ['拱脚', '拱顶'],
    stages: ['观察与描点', '构造与比较', '检验与反思'],
  },
  en: {
    video: {
      play: 'Watch the website edition',
      posterAlt:
        'Frame from the finished video: an indoor paper-frame setting, a character and the Laplace Puzzle Classroom title.',
      sectionTitle: 'Watch the work',
      languageNote:
        'Website edition · Chinese narration and captions. Production notes below are available in Chinese, English and Japanese.',
      notice:
        'Contains puzzle solutions and story spoilers. The game itself includes mild horror and jump scares; be prepared if you choose to play.',
      captions: 'Chinese (original language)',
      fallback: 'If playback is unavailable, open the video: ',
      stages: ['Materials & narrative', 'Editing & animation', 'Viewing & revision'],
      end: 'Turn clues into a visible narrative.',
    },
    open: 'Open project notes',
    back: 'Back to the desktop',
    skip: 'Skip to the project notes',
    contents: 'Reading path',
    end: 'An observation becomes another question.',
    visualTitle: 'Shared anchors. Different hypotheses.',
    visualDescription:
      'A circular arc, a parabola and an inverted catenary share two springing points and a crown, with different profiles in between.',
    visualCaption: 'Conceptual candidate curves; not measured data from the study.',
    models: ['Circular arc', 'Parabola', 'Catenary'],
    anchors: ['Springing', 'Crown'],
    stages: ['Observe & trace', 'Model & compare', 'Check & reflect'],
  },
  ja: {
    video: {
      play: 'サイト展示版を再生',
      posterAlt: '完成映像の一場面。室内と紙のフレーム、キャラクター、ラプラス謎解き教室のタイトル。',
      sectionTitle: '映像を見る',
      languageNote: 'サイト展示版 · 中国語音声／中国語字幕。下の制作記録は中国語・英語・日本語で読めます。',
      notice:
        '謎の答えと物語のネタバレを含みます。ゲーム本体には軽いホラーやジャンプスケアがあります。遊ぶ際は心の準備をしてください。',
      captions: '中国語（原音字幕）',
      fallback: '再生できない場合は映像を開いてください：',
      stages: ['素材と物語', '編集と動き', '視聴と修正'],
      end: '手がかりを、目に見える物語へ。',
    },
    open: 'プロジェクト記録を開く',
    back: '創作デスクに戻る',
    skip: 'プロジェクト本文へ移動',
    contents: '読む道筋',
    end: '観察から、次の問いへ。',
    visualTitle: '同じ基準点から、異なる曲線の仮説へ。',
    visualDescription: '円弧、放物線、上下を反転した懸垂線は、両端と頂点を共有していても、中間の輪郭が異なります。',
    visualCaption: '候補曲線の概念図です。研究対象の実測値ではありません。',
    models: ['円弧', '放物線', '懸垂線'],
    anchors: ['起拱点', '頂点'],
    stages: ['観察と座標抽出', 'モデルと比較', '検証と振り返り'],
  },
} satisfies Record<Locale, ArchiveCopy>;
