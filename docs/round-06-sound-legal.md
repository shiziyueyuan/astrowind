# 声音与法律声明

用户在已上线的 Demo 上要求增加音乐、音效和法律声明。作为当前内容与体验的增补，保留十轮开发安排，不将它描述为剩余轮次全部完成。

## 新增声音

Open Desk / 桌面微光由本站新写的音符序列、和弦规则与 Web Audio 基础波形实时合成；没有导入外部曲目、录音、乐器采样或音乐服务。音符规则在 `src/utils/audio-score.ts`，播放与交互实现在 `src/utils/desktop-audio.ts`。实现代码沿用仓库 MIT 许可，不新增对用户作品内容的许可授予。

每页初始静音，由访客点击开启；独立选择环境音乐、界面音效，统一调节音量。只在本地保存音量和选项，不持久化播放开关。切到后台或播放项目视频时，桌面声音暂停；停止声音与离开页面时释放声音节点。音效覆盖开窗、关闭、桌面图标悬停、账号复制及部分界面选择，不依赖外部音频下载。

## 法律与隐私

中英日 `/legal` 页面从各页面页眉和声音面板可达。说明新增声音的生成方式、代码与字体许可、协作与第三方素材、偏好存储、GitHub Pages 安全日志及权益反馈方式。保留原 MIT 与 OFL 全文，不把声明当成视频、游戏素材或他人作品的授权，也不宣称能够保证任何场景下零侵权风险。没有加入线下身份、地址、伪造备案、公司信息或强制同意条款。

参考：

- [Web Audio 用户操作与控制](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
- [MIT](https://opensource.org/license/mit)
- [SIL OFL](https://openfontlicense.org/open-font-license-official-text/)
- [GitHub Pages 数据收集](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub 隐私声明](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [中华人民共和国著作权法](https://fjca.miit.gov.cn/zwgk/zcwj/wjfb/art/2020/art_3fd5e3c5e6624d95af229036f95e20d3.html)
