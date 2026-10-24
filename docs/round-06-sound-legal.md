# 声音与法律声明

用户在已上线的 Demo 上要求增加音乐、音效和法律声明。作为当前内容与体验的增补，保留十轮开发安排，不将它描述为剩余轮次全部完成。

## 新增声音

Open Desk / 桌面微光由本站新写的音符序列、和弦规则与 Web Audio 基础波形实时合成；没有导入外部曲目、录音、乐器采样或音乐服务。音符规则在 `src/utils/audio-score.ts`，播放与交互实现在 `src/utils/desktop-audio.ts`。实现代码沿用仓库 MIT 许可，不新增对用户作品内容的许可授予。

首次访问或完整刷新时初始静音，由访客点击开启；独立选择环境音乐、界面音效，统一调节音量。只在本地保存音量和选项，不跨完整刷新持久化播放开关。站内使用 Astro ClientRouter 导航，播放器以单例保留同一个 AudioContext、声音节点与乐谱时钟；切换语言、项目、博客、法律页和前进后退均延续播放或静音状态，面板重新绑定当前语言的 DOM。页面控制器在换页前清理监听器与计时器，后台和项目视频播放时仍暂停桌面声音，离开视频页面会清除旧媒体状态并恢复音乐。真正离开文档时释放播放器。音效覆盖开窗、关闭、桌面图标悬停、账号复制及部分界面选择，不依赖外部音频下载。

## 法律与隐私

中英日 `/legal` 页面从各页面页眉和声音面板可达。说明新增声音的生成方式、代码与字体许可、协作与第三方素材、偏好存储、GitHub Pages 安全日志及权益反馈方式。保留原 MIT 与 OFL 全文，不把声明当成视频、游戏素材或他人作品的授权，也不宣称能够保证任何场景下零侵权风险。没有加入线下身份、地址、伪造备案、公司信息或强制同意条款。

参考：

- [Web Audio 用户操作与控制](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
- [MIT](https://opensource.org/license/mit)
- [SIL OFL](https://openfontlicense.org/open-font-license-official-text/)
- [GitHub Pages 数据收集](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub 隐私声明](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [中华人民共和国著作权法](https://fjca.miit.gov.cn/zwgk/zcwj/wjfb/art/2020/art_3fd5e3c5e6624d95af229036f95e20d3.html)

## 站内导航修复

整页重载会销毁声音上下文，因此导航与音频必须共同处理；仅保存开启选项仍会让乐曲重新开始。页面初始化统一监听 `astro:page-load`，换页前中止旧页面控制器；主题在 `astro:after-swap`、绘制前恢复。桌面修改 hash 时保留 Astro 的 history state，避免破坏前进后退。播放器在页面交换后只更新控制面板和媒体列表，不重置乐谱。

参考：[Astro 导航与脚本生命周期](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events)。
