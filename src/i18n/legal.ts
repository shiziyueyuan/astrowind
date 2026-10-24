import type { Locale } from './index';

export const legalCopy = {
  zh: {
    label: '法律声明',
    title: '法律声明与隐私说明',
    description: '本站的声音来源、开源许可、素材权利与本地偏好说明。',
    updated: '更新于',
    back: '返回创作桌面',
    contact: '前往 SIGNAL 联系',
    references: '许可与参考资料',
    score: '查看新增声音的生成代码',
    mit: 'AstroWind 的 MIT 许可证全文',
    fonts: '字体许可证',
    sections: [
      {
        id: 'about',
        title: '关于这张桌面',
        paragraphs: [
          '本站由「时咨月圆 / Shea」这一线上身份维护，用于展示创作过程、项目实验与个人写作。项目说明记录相应阶段的工作，持续更新的 Demo 不代表所有计划均已完成。',
        ],
      },
      {
        id: 'sound',
        title: '环境音乐与界面音效',
        paragraphs: [
          '新增网页声音名为 Open Desk / 桌面微光：由为本站新写的音符序列、和弦规则与基础合成波形实时生成，未使用外部歌曲、录音、第三方音色采样或音乐流媒体。',
          '声音实现代码随网站开源仓库按 MIT 许可证提供。项目视频中的配乐、录音与其他素材仍分别受其权利和许可约束；这里的声音来源说明不代替这些素材的授权核对。',
          '首次打开或完整刷新网站时，声音默认关闭，由访客主动开启。开启后，站内切换页面和语言会延续播放及静音状态。音量、音乐与音效选项保存在本机；页面在后台或项目视频播放时暂停桌面声音。',
        ],
      },
      {
        id: 'licenses',
        title: '开源软件与字体',
        paragraphs: [
          '网站基于 AstroWind，保留原项目的 MIT 版权与许可声明。站点代码的开源许可应结合仓库许可证及各依赖的许可理解。',
          'LXGW WenKai、Klee One、Space Grotesk 与 Space Mono 使用 SIL Open Font License 1.1；对应版权与许可证全文保留在本站。软件许可不自动授予作品文字、影像、商标或第三方素材的使用权。',
        ],
      },
      {
        id: 'materials',
        title: '作品、协作与第三方素材',
        paragraphs: [
          '项目文字依具体记录说明创作范围，协作者及原素材权利人的贡献与权利应受到尊重。游戏、角色、截图、视频、声音及品牌名称可能涉及第三方权利，展示不表示本站与相关权利人存在官方合作或背书。',
          '公开可访问、注明来源或非商业展示，本身不等于取得使用许可。转载、改编或再次使用具体素材时，应核对相应授权及适用法律的例外。本声明不授予本站未拥有的权利。',
        ],
      },
      {
        id: 'privacy',
        title: '隐私与本地偏好',
        paragraphs: [
          '本站的桌面功能在浏览器本地保存语言、主题、音量与声音选项；窗口布局和开场状态保存在当前标签页的会话存储中。这些偏好不由本站代码上传，可通过浏览器清除站点数据来移除。',
          '本站未集成广告或访客行为统计，也不提供公开投稿、评论或回复接口。GitHub Pages 作为托管方会出于安全目的记录访问者 IP 地址；其处理方式见 GitHub 隐私声明。访问外部链接时适用相应平台的规则。',
        ],
      },
      {
        id: 'contact',
        title: '更正与权益反馈',
        paragraphs: [
          '如认为本站展示涉及您的著作权、署名、隐私或其他合法权益，请通过 SIGNAL 列出的联系渠道提供相关页面、争议素材及权利依据。核实后会视情况更正、补充署名或移除内容。',
          '本说明不排除适用法律规定不能排除的权利或责任。',
        ],
      },
    ],
  },
  en: {
    label: 'Legal',
    title: 'Legal & privacy notes',
    description: 'Sound sources, open source licences, material rights and local preferences.',
    updated: 'Updated',
    back: 'Back to the desktop',
    contact: 'Contact through SIGNAL',
    references: 'Licences & references',
    score: 'View the new sound generation code',
    mit: 'Full AstroWind MIT licence',
    fonts: 'Font licences',
    sections: [
      {
        id: 'about',
        title: 'About this desktop',
        paragraphs: [
          'This site is maintained under the online identity 时咨月圆 / Shea to share creative processes, experiments and personal writing. Project notes describe their stated stage; an evolving demo does not mean every planned feature is complete.',
        ],
      },
      {
        id: 'sound',
        title: 'Ambient music & interface sounds',
        paragraphs: [
          'Open Desk is the newly added website soundscape. A score, chord rules and basic synthesis waveforms written for this site generate it in real time, without external songs, recordings, third-party instrument samples or music streaming services.',
          'The sound implementation code is provided under the website repository’s MIT licence. Music, recordings and other materials inside project videos remain subject to their respective rights and licences. These source notes do not replace permission checks for those materials.',
          'Sound starts off on a fresh visit or full reload and requires a visitor to enable it. Internal page and language changes preserve playback or mute state. Volume and music/effects options stay on the device. Desktop sounds pause in background tabs and during project video playback.',
        ],
      },
      {
        id: 'licenses',
        title: 'Open source software & fonts',
        paragraphs: [
          'The site is based on AstroWind and retains its MIT copyright and licence notice. Read the repository licence together with the licences of individual dependencies.',
          'LXGW WenKai, Klee One, Space Grotesk and Space Mono use SIL Open Font License 1.1. Their copyright and licence texts are retained here. A software licence does not automatically grant rights to project writing, footage, trademarks or third-party materials.',
        ],
      },
      {
        id: 'materials',
        title: 'Projects, collaboration & third-party material',
        paragraphs: [
          'Project notes describe the scope of the work. Collaborators’ contributions and original rights holders’ rights should be respected. Games, characters, screenshots, videos, sounds and brand names may involve third-party rights; display does not imply official partnership or endorsement.',
          'Public availability, attribution or non-commercial display alone does not establish permission. Check the relevant authorisation and applicable legal exceptions before redistributing, adapting or reusing a particular material. This notice grants no rights the site does not hold.',
        ],
      },
      {
        id: 'privacy',
        title: 'Privacy & local preferences',
        paragraphs: [
          'Desktop features keep language, theme, volume and sound options in browser local storage; window layout and intro state use the tab’s session storage. Site code does not upload these preferences. Clear the site’s browser data to remove them.',
          'The site has no integrated advertising or visitor analytics, public submissions, comments or replies. GitHub Pages logs visitors’ IP addresses for security; see GitHub’s privacy statement. External links are subject to their destination platforms’ rules.',
        ],
      },
      {
        id: 'contact',
        title: 'Corrections & rights enquiries',
        paragraphs: [
          'For copyright, attribution, privacy or other rights concerns, use a contact channel listed in SIGNAL. Include the relevant page, material and basis of your concern. After review, content may be corrected, credited or removed as appropriate.',
          'These notes do not exclude rights or liabilities that applicable law does not allow to be excluded.',
        ],
      },
    ],
  },
  ja: {
    label: '法的表示',
    title: '法的表示とプライバシー',
    description: '音の出典、オープンソースのライセンス、素材の権利、ローカル設定について。',
    updated: '更新日',
    back: '創作デスクに戻る',
    contact: 'SIGNAL から連絡する',
    references: 'ライセンスと参考資料',
    score: '追加した音の生成コードを見る',
    mit: 'AstroWind の MIT ライセンス全文',
    fonts: 'フォントのライセンス',
    sections: [
      {
        id: 'about',
        title: 'このデスクについて',
        paragraphs: [
          'このサイトは「时咨月圆 / Shea」というオンラインの名義で運営し、制作過程、実験、個人の文章を公開しています。各記録は記載された段階の作業を示すもので、更新中の Demo がすべての計画の完成を意味するわけではありません。',
        ],
      },
      {
        id: 'sound',
        title: '環境音楽と操作音',
        paragraphs: [
          '新たに追加した音の名前は Open Desk / デスクの灯りです。このサイト用に書いた音列、和音の規則、基本波形からリアルタイムに合成します。外部の楽曲、録音、第三者の音色サンプル、音楽配信サービスは使用していません。',
          '音の実装コードは、サイトのリポジトリの MIT ライセンスで提供します。プロジェクト動画内の音楽、録音、その他の素材には、それぞれの権利とライセンスが適用されます。この出典説明は、それらの利用許諾の確認に代わるものではありません。',
          '初回アクセスやページ全体の再読み込みでは消音状態で始まり、訪問者が有効にします。サイト内のページや言語を切り替えても再生・消音状態は維持されます。音量と音楽・操作音の設定は端末内に保存します。バックグラウンドやプロジェクト動画の再生中はデスクの音を一時停止します。',
        ],
      },
      {
        id: 'licenses',
        title: 'オープンソースとフォント',
        paragraphs: [
          'サイトは AstroWind を基盤とし、元の MIT 著作権表示とライセンスを保持しています。コードの利用時は、リポジトリと各依存関係のライセンスを確認してください。',
          'LXGW WenKai、Klee One、Space Grotesk、Space Mono は SIL Open Font License 1.1 を採用し、著作権表示とライセンス全文をサイトに保管しています。ソフトウェアのライセンスは、作品の文章、映像、商標、第三者素材の権利を自動的に許諾するものではありません。',
        ],
      },
      {
        id: 'materials',
        title: '作品・共同制作・第三者素材',
        paragraphs: [
          '各プロジェクトは記録に応じて制作の範囲を説明しています。協力者の貢献と元の権利者の権利を尊重します。ゲーム、キャラクター、画像、動画、音、ブランド名には第三者の権利が関わる場合があり、掲載は公式な提携や推奨を示しません。',
          '公開されていること、出典表示、非営利での展示だけで利用許諾が成立するわけではありません。転載、改変、再利用の際は、該当する許諾と適用法の例外を確認してください。この表示は、サイトが有しない権利を許諾しません。',
        ],
      },
      {
        id: 'privacy',
        title: 'プライバシーとローカル設定',
        paragraphs: [
          '言語、テーマ、音量、サウンド設定はブラウザーのローカルストレージ、窓の配置と起動画面の状態はタブのセッションストレージに保存します。サイトのコードはこれらを送信しません。ブラウザーのサイトデータを削除すると消去できます。',
          '広告、訪問者の行動分析、公開投稿、コメント、返信の機能は組み込んでいません。ホスティングの GitHub Pages は安全管理のために訪問者の IP アドレスを記録します。詳細は GitHub のプライバシー声明をご覧ください。外部リンクの利用には各サービスの規則が適用されます。',
        ],
      },
      {
        id: 'contact',
        title: '訂正と権利に関する連絡',
        paragraphs: [
          '著作権、クレジット、プライバシーなどに関するご指摘は、SIGNAL に記載した連絡先へ、該当ページ、素材、権利の根拠をお知らせください。確認後、内容の訂正、クレジットの追記、削除などを状況に応じて行います。',
          'この説明は、適用法により排除できない権利や責任を排除するものではありません。',
        ],
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    description: string;
    updated: string;
    back: string;
    contact: string;
    references: string;
    score: string;
    mit: string;
    fonts: string;
    sections: { id: string; title: string; paragraphs: string[] }[];
  }
>;
