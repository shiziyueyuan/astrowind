# 时咨月圆 / Shea

一张可以自由探索的个人创作桌面。跨领域创造者，把想法变成作品。

公开网站：**https://shiziyueyuan.github.io/astrowind/**

基于官方 [AstroWind](https://github.com/arthelokyo/astrowind) 模板，保留 MIT 许可证。

## 探索

ENTRY 数字入口、IDENTITY 关于我、ARCHIVE 项目档案、LAB 实验与博客、SIGNAL 联系终端。中英日三语界面、系统与手动主题、自由拖动窗口及可跳过的开场动画。

现有作品包含经过隐私处理的石拱桥轮廓研究，以及空白解谜组 / PoorerArt 的协作影像记录。过程与协作优先，不虚构项目成果。

## 本机使用

需要 Node.js 24 与 npm。

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4323
```

本地桌面：http://127.0.0.1:4323/zh

本地写作间：双击 **打开写作间.cmd**，随后访问 http://127.0.0.1:4324 。也可运行 `npm run studio`。

## 通过 Markdown 写博客

1. 在本机写作间导入 `.md`，或直接输入正文。
2. 填写标题、正文语言、分类、日期、文章地址。
3. “保存草稿”只保存在本机；“发布到本地预览”生成阅读页。
4. 确认后“同步到公开网站”，推送公开文章并触发 GitHub Pages 更新。

博客只读，不开放评论、回复或留言。草稿位于仓库外的 `work/journal-studio/drafts`，不随站点发布。管理服务仅监听本机，不部署到 Pages。若没有对应译文，其他语言界面明确展示原文，不自动编造翻译。

详细说明：[写作间](docs/round-06-journal.md)、[GitHub Pages](docs/github-pages.md)。

## 发布

推送至 `main` 后，由 GitHub Actions 检查、构建并部署 `dist`。部署环境使用 `/astrowind` 基路径；普通本地构建使用 `/`。模板示例页面保留在 `examples/` 供参考，不生成公开路由。

本项目仍按十轮计划逐步完善，当前包含第 6 轮博客与用户明确要求的提前上线工作。

字体均采用 SIL OFL 1.1，完整授权见 `public/fonts/licenses/`；字标为 SVG 路径。AstroWind 原始说明保留于 [examples/ASTROWIND-README.md](examples/ASTROWIND-README.md)。
