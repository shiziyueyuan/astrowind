# 三语开源字体

2026-10-23：按照用户要求更换字体，不使用得意黑或系统默认字体作为网站主字体。

| 用途                     | 字体                   | 字重             | 官方来源                                        |
| ------------------------ | ---------------------- | ---------------- | ----------------------------------------------- |
| 中文正文、界面及标题     | 霞鹜文楷 / LXGW WenKai | 500、700         | https://github.com/lxgw/LxgwWenKai              |
| 日文正文、界面及标题     | Klee One               | 400、600         | https://github.com/fontworks-fonts/Klee         |
| 英文、拉丁字母、品牌字标 | Space Grotesk          | 300–700 可变字重 | https://github.com/floriankarsten/space-grotesk |
| 终端标签、编号、时钟     | Space Mono             | 400、700         | https://github.com/googlefonts/spacemono        |

四款字体均采用 SIL Open Font License 1.1。完整许可证保存在 `public/fonts/licenses/`，保留原作者版权信息；网站本身的 MIT 许可证继续保留。

## 加载和语言

使用 Astro 原生 Fonts API 和 Fontsource 提供方。首次构建需要下载字体，构建后字体文件由网站自身提供，不要求访客连接 Google Fonts 或其他字体 CDN，也不依赖访客电脑安装字体。

`BrandFonts.astro` 为桌面、案例阅读页和模板布局共用的入口。`CustomStyles.astro` 根据页面语言决定中日文字体优先级；日文优先使用 Klee One 的日文字形，中文优先使用文楷。英文和拉丁字母使用 Space Grotesk，终端使用 Space Mono。字体栈末尾的通用族仅用于资源加载失败或未覆盖字符时保留文字可读性。

不预加载整套 CJK 字库；浏览器按页面文字请求对应字体。Klee One 使用提供方的日文分片，文楷使用提供方包含中文字形的完整文件。正文与标题按可用字重设置，不改变三语内容和已确认的隐私边界。
