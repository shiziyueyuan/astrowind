# GitHub Pages 发布

仓库：https://github.com/shiziyueyuan/astrowind

站点：https://shiziyueyuan.github.io/astrowind/

主分支更新触发 `.github/workflows/pages.yaml`：Node 24、npm ci、代码检查、Astro 静态构建、上传 Pages 产物、部署。部署产物仅为 dist。

默认本地构建使用根路径；GitHub Actions 设置 `SHEA_SITE_BASE=/astrowind`，由 AstroWind 配置集成传入 Astro 与虚拟站点配置，字体、脚本、媒体和三语链接随 base 路径生成。无自定义域名。

公开站点仅生成个人桌面、已确认项目、博客、语言入口与 404。原模板博客通过模板配置关闭；原模板营销、个人履历、联系表单和法律示例移至 examples 保留参考。

上传写作使用本机管理页，草稿在仓库外；公开网站没有上传接口，也没有评论或回复。
