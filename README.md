# Monorepo boilerplate

A monorepo boilerplate using `pnpm` (package-manager), `turborepo` (task-runner), `dumi`(doc-generator), and `changesets` (publisher).

这是一个Monorepo项目架构模板，能够便捷地进行npm包的开发和文档管理。相关技术如下：

- [pnpm](https://pnpm.io/) 高性能的包管理器
  - 节省磁盘空间。使用硬链接和符号链接，避免重复安装相同的依赖，显著减少了项目的磁盘占用。
  - 安装速度更快。在安装依赖时速度更快，因为它能够重用缓存中的包，而不是每次都重新下载。
  - 严格的依赖关系。解决了幽灵依赖的问题。
- [turborepo](https://turbo.build/repo/docs) 高性能的构建工具
  - 增量构建。通过智能依赖图，仅重新构建修改过的部分，从而加快构建速度。
  - 并行执行。支持任务的并行执行，充分利用多核 CPU，提升构建效率。
  - 缓存机制。内置缓存功能，能够缓存构建输出，减少重复工作。即使在不同机器上，也能复用缓存。
- [dumi](https://d.umijs.org/) 静态站点框架，非常适合文档生成
  - 内置文档路由。自动生成文档路由，能够根据目录结构和文件自动组织文档内容。
  - 组件演示。支持实时预览和演示组件，帮助开发者和用户快速了解组件的用法。
- [changesets](https://github.com/changesets/changesets) 用于管理版本控制和发布流程的工具
  - 简化版本管理。通过创建更改集（changeset），自动管理和更新版本号，减少手动干预。
  - 支持多包版本管理。在 monorepo 中，可以针对多个包进行版本控制，轻松处理各个包的版本升级和发布。
  - 生成变更日志。自动生成变更日志（changelog），记录每个版本的更改，提高项目的可追溯性和透明度。
  - 灵活的发布策略。支持按需发布，允许开发者选择哪些包需要发布，灵活应对不同的发布场景。

## 如何使用？

### 脚本运行

首次执行`pnpm run prepack`，然后执行`pnpm run doc:dev`，访问：`http://localhost:8000/` 查看文档演示。

其它脚本如下：

```shell
{
  // ...
  "scripts": {
    "prepare": "husky", // 执行install时自动运行 Husky 命令来设置 Git 钩子
    "prepack": "pnpm install && turbo build", // 首次执行
    "doc:dev": "dumi dev", // 文档开发
    "doc:build": "NODE_ENV=production dumi build", // 文档打包
    "docs:preview": "dumi preview", // 预览打包后的文档
    "dev": "turbo dev", // 运行packages文件夹下的所有子包的dev
    "build": "turbo build", // 打包所有子包
    "lint": "turbo lint", // 运行代码检查
    "clean": "turbo clean && rm -rf node_modules", // 清理缓存并删除 node_modules 目录
    "changeset": "changeset", // 创建变更集
    "version-packages": "changeset version", // 基于 Changesets 定义的改动自动更新包的版本号
    "release": "turbo build && changeset publish" // 构建所有包并发布新版本
  }
}
```

### 添加子包

- `packages/bar`和`packages/foo`是两个示例，按照`packages/xx/src/index.js`结构（复制一个子包改名即可）。
- 子包中的`README.md`会被自动解析生成文档网页，更推荐就近维护文档的方式。当然也支持在`docs/`下新建一个文件编写。
