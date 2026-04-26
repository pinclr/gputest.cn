# gputest.cn — GPUTest · 核芯

GPU 集群测试与验收平台前端站点 + 阿里云 FC3.0 后端。

中立第三方测试服务覆盖:节点 / 集群 / 网络 / 存储 / 平台五大维度。
- **法人主体**:北京品晰科技有限公司 (2021)
- **品牌**:GPUTest · 核芯
- **域名**:[gputest.cn](https://gputest.cn)

---

## 技术栈

| 层 | 选型 |
|---|---|
| 前端框架 | Vite 5 + React 18 + TypeScript(strict) |
| 路由 | react-router-dom v6,文章 / admin 走懒加载 |
| 样式 | Tailwind CSS v3 + 自研 design tokens(暗色优先) |
| 状态 | useState / sessionStorage(无全局 store) |
| 内容 | `content/wechat/*.md` 由 Vite glob 在构建时内联 |
| Markdown | react-markdown + remark-gfm + rehype-highlight |
| 公众号导出 | marked + inline-style 转换 |
| 后端 | 阿里云 FC3.0 函数计算(HTTP 触发器)`/api/*` |
| 部署 | OSS + DCDN + FC3.0(三环境) |
| 测试 | Playwright e2e + Lighthouse CI + Linkinator |

---

## 快速开始

```bash
# 0. Node 20+ / pnpm 10+ 必需
node --version  # ≥ 20.0.0
pnpm --version  # ≥ 10.0.0

# 1. 安装依赖
pnpm install

# 2. 起 dev server (http://localhost:5173)
pnpm dev

# 3. 类型检查 / 构建
pnpm typecheck
pnpm build
pnpm preview        # 本地起生产构建产物
```

---

## 目录结构

```
gputest.cloud/
├── content/wechat/             # markdown 文章源(/articles 与公众号导出共用)
├── functions/                  # 平台无关 fetch handlers
│   ├── _lib/                   # 共享:auth / wechat / notify / sign / types
│   ├── _aliyun/                # 阿里云 FC3.0 入口适配
│   └── api/                    # 路由化 API:contact / admin / wechat
├── aliyun/                     # 阿里云部署配置
│   ├── README.md               # 产品组合 / DNS / 备案
│   └── fc-{prod,staging,dev}.yaml  # Serverless Devs 函数定义
├── public/                     # 静态资源 + sitemap / robots / favicon
├── src/
│   ├── components/             # UI 组件
│   │   ├── home/               # 首页 band 们
│   │   ├── layout/             # Header / Footer / EnvBanner / MobileMenu
│   │   ├── matrix/             # 3×2 测试矩阵
│   │   ├── solution/           # 解决方案页通用组件
│   │   ├── testing/            # 测试分类 hub 通用组件
│   │   ├── article/            # 文章相关
│   │   └── effects/            # 数字雨 / 翻牌计数器
│   ├── data/                   # 静态数据(matrix / tools / vendors / cases / published)
│   ├── lib/                    # 工具(env / utils / articles / adminAuth / wechatExporter)
│   ├── pages/                  # 路由页面
│   │   ├── admin/              # /admin/* 文章管理后台
│   │   ├── solutions/          # /solutions/* 详细方案页
│   │   └── testing/            # /testing/* 一级测试分类 hub
│   ├── styles/                 # 全局 CSS
│   └── router.tsx, main.tsx    # 入口
├── tests/e2e/                  # Playwright 测试
│   ├── smoke.spec.ts           # 路由可达 / 关键 DOM / console 无 error
│   ├── navigation.spec.ts      # 导航 / SPA 切换 / 移动端菜单
│   ├── links.spec.ts           # 内链与 sitemap / robots 完整性
│   └── style.spec.ts           # 样式锚点(暗色 / 字号 / hover / 品牌词)
├── .github/workflows/          # CI/CD
│   ├── deploy.yml              # PR 预览 + main → staging
│   └── deploy-prod.yml         # workflow_dispatch + 审核 → prod
├── lighthouserc.json           # Lighthouse CI 阈值
├── playwright.config.ts        # Playwright 配置
└── tailwind.config.ts, vite.config.ts, tsconfig.*.json
```

---

## 测试

```bash
# 单元 / 类型
pnpm typecheck

# E2E(自动起 vite preview 服务器)
pnpm exec playwright install --with-deps chromium  # 首次需安装浏览器
pnpm test:e2e
pnpm test:e2e:ui         # 带 UI 的 Playwright 调试
pnpm test:e2e:headed     # 看着浏览器跑

# 死链扫描(需先 pnpm preview)
pnpm test:links

# Lighthouse CI(性能 / 无障碍 / SEO)
pnpm test:lighthouse
```

测试覆盖:
- 21 个路由的渲染与 console error 检测
- 5 个一级菜单的导航与 SPA 切换
- 移动端汉堡菜单与 matrix 自适应
- 内链遍历(zero broken links)
- 样式锚点(暗色背景、CTA hover 色变、链接与正文色异)
- footer 合规元素(品晰科技 / 备案位 / 邮箱)

---

## 三环境部署

### 流向

```
开发者推 feature 分支 → 提 PR
        │
        ▼
 ┌──────────────┐
 │  PR opened   │──→  跑 typecheck / build / e2e   ──→  部署 dev{PR_NUM}.gputest.cn
 │  PR synced   │
 └──────────────┘
        │
   PR 审核合并到 main
        │
        ▼
 ┌──────────────┐
 │ push main    │──→  全套检查 + Lighthouse + 死链 + Bundle 守门  ──→  部署 staging.gputest.cn
 └──────────────┘
        │
  上线前 staging 上手动审阅
        │
        ▼
 ┌──────────────────────┐
 │ workflow_dispatch    │──→  GitHub Environment "production" 审核 gate ──→  部署 gputest.cn + www.gputest.cn
 │  (deploy-prod.yml)   │
 └──────────────────────┘
```

### 阿里云资源拓扑

详见 [`aliyun/README.md`](./aliyun/README.md)。三套独立资源:

| 环境 | OSS bucket | FC3.0 服务 | 站点域名 | API 域名 | 前端 / DCDN | 管理方 |
|---|---|---|---|---|---|---|
| **prod** | `gputest-cn-prod` | `gputest-fc-prod` | gputest.cn / www.gputest.cn | api.gputest.cn(自定义) | DCDN | Pulumi |
| **staging** | `gputest-cn-staging` | `gputest-fc-staging` | staging.gputest.cn | api-staging.gputest.cn(自定义) | DCDN | Pulumi |
| **dev**(每 PR 独立) | `gputest-cn-dev{N}` | `gputest-fc-dev{N}` | dev{N}.gputest.cn(直连 OSS website) | FC 默认 `*.fcapp.run`(跨域) | 无 DCDN,无证书依赖 | GitHub Actions(PR opened 创建,closed 销毁) |

DNS(AliDNS):

```
gputest.cn               CNAME → DCDN 生产加速域名
www.gputest.cn           CNAME → 同上
staging.gputest.cn       CNAME → DCDN staging 加速域名
api.gputest.cn           CNAME → FC3.0 自定义域名(prod)
api-staging.gputest.cn   CNAME → FC3.0 自定义域名(staging)
dev{N}.gputest.cn        CNAME → 该 PR 的 OSS website endpoint(workflow 创建/销毁)
```

> dev 不绑 API 自定义域名,前端通过 `VITE_API_URL`(workflow 部署 FC 后从 `s deploy` 输出提取)直接调 FC 默认 `*.fcapp.run` URL,跨域请求由 FC handler 的 CORS 头(允许 `*.gputest.cn` 与 localhost)放行。无需 wildcard 证书、无需 DCDN。

### 必需 GitHub Secrets

```
ALIYUN_ACCESS_KEY_ID         (RAM 子账号 AK,限定 OSS / FC / DCDN / AliDNS 权限)
ALIYUN_ACCESS_KEY_SECRET
ALIYUN_REGION                (默认 cn-beijing)
ALIYUN_ACCOUNT_ID            (阿里云账号 ID,FC 部署用)
ALIYUN_OSS_BUCKET_PROD       (gputest-cn-prod)
ALIYUN_OSS_BUCKET_STAGING    (gputest-cn-staging)
ALIYUN_FC_SERVICE_PROD       (gputest-fc-prod)
ALIYUN_FC_SERVICE_STAGING    (gputest-fc-staging)
ALIYUN_DCDN_DOMAIN_PROD      (gputest.cn)
ALIYUN_DCDN_DOMAIN_STAGING   (staging.gputest.cn)
```

> dev 资源名是确定性的(`gputest-cn-dev{N}` / `gputest-fc-dev{N}`),不需要单独 secret。

### 必需 GitHub Environment

`production` Environment 在 Settings → Environments → New environment 创建:
- Required reviewers:至少 1 人
- Wait timer:可选 5–15 分钟冷却期
- Deployment branches:仅 `main`

### Prod 发版动作

```
GitHub → Actions → Deploy Production → Run workflow
  ref: main(或某个 tag)
  release_note: 简述本次发版变更
  → 等审核者 approve → 自动部署到 gputest.cn / www.gputest.cn
```

---

## 环境变量

### 构建时(Vite,以 `VITE_*` 开头)

由 GitHub Actions 在 build 时自动注入,本地开发可参考 `.env.example`:

```bash
VITE_ENV=dev                              # dev / staging / prod
VITE_PR_NUMBER=                           # 仅 dev(由 PR 触发器赋值)
VITE_PUBLIC_URL=https://gputest.cn        # 用于 OG / canonical
VITE_COMMIT_SHA=                          # 显示在 EnvBanner
```

非 prod 环境会自动:
- 显示顶部紫 / 琥珀色 EnvBanner
- 注入 `<meta name="robots" content="noindex, nofollow">`

### 运行时(阿里云 FC3.0 函数环境变量,在 FC 控制台配置)

| 变量名 | 用途 | 必要性 |
|---|---|---|
| `ADMIN_TOKEN` | `/admin` 后台登录密钥 | 必需 |
| `LARK_BOT_WEBHOOK` | 飞书群机器人(线索卡片推送) | 必需 |
| `WECHAT_APP_ID` | 公众号 AppID | 公众号推送必需 |
| `WECHAT_APP_SECRET` | 公众号 AppSecret(密) | 公众号推送必需 |
| `WECHAT_TOKEN` | 服务器配置 Token(签名校验) | 公众号回调必需 |
| `WECHAT_AES_KEY` | 加密模式 AES Key | 可选(明文模式不需要) |
| `WEWORK_BOT_WEBHOOK` | 企微群机器人(可选,双发) | 可选 |

FC3.0 没有原生 KV,`functions/_aliyun/index.ts` 中实现了内存版 fallback(单实例不持久),仅适用于 access_token 短期缓存。V2 接 Tablestore / Redis 持久化。

---

## 内容发布

文章源统一在 `content/wechat/*.md`(frontmatter + markdown 正文),三个目标渠道共用同一份源文件:

| 渠道 | 导出格式 | 发布方式 |
|---|---|---|
| 站内 `/articles` | 自动渲染 | git push 后自动可见 |
| 微信公众号 | inline-style HTML | admin 复制 + Worker 推送(草稿 / 群发) |
| 知乎专栏 | 原生 markdown + 品牌 footer | admin 复制 + 知乎编辑器粘贴 |

### 公众号集成

- 公众号:GPUTest 核芯(2026-04-26 已注册)
- mp.weixin.qq.com → 设置 → 开发者工具 → 基本配置:获取 AppID / AppSecret
- 服务器配置 URL:`https://gputest.cn/api/wechat/callback`,Token 与 `WECHAT_TOKEN` 一致
- 安全设置:取消 IP 白名单(FC3.0 出口 IP 不固定)

### 发布工作流(公众号)

```
1. content/wechat/*.md 写一篇文章
2. 推到 main 分支后,文章自动出现在 staging.gputest.cn/articles
3. /admin/login 用 ADMIN_TOKEN 登录
4. /admin/articles/<slug>:
   ① 复制公众号 HTML 到剪贴板(inline-style 自动转换)
   ② 上传文章封面 → 调 /api/wechat/upload-image → 拿到 media_id
   ③ 推送到草稿箱 / 草稿+群发
5. 公众号编辑器侧预览 → 发送
```

### 发布工作流(知乎)

```
1. 同一份 content/wechat/*.md 源文件
2. /admin/articles/<slug> → "复制知乎 Markdown" 按钮(自动附品牌 footer)
3. 知乎 → 写文章 → 切到 markdown 编辑模式 → 粘贴(Cmd/Ctrl+V)
4. 替换 [图N] 占位为知乎相册图片
5. 发布到「GPUTest 核芯」专栏
```

知乎对原生 markdown 友好,无需 inline-style 转换;但图片需从知乎相册上传。

---

## 飞书线索通知

每次站内 `/contact` 表单提交后,Worker 通过 `LARK_BOT_WEBHOOK` 推送富卡片到飞书群:

- 蓝色 header「🎯 新咨询线索 · GPUTest」
- 双列字段:公司 / 姓名 / 邮箱 / 手机微信 / 产品线 / 规模 / 时间窗 / 来源
- 留言段
- 操作按钮:邮件回复(自动填收件人)/ 查看官网

配置:飞书群 → 设置 → 群机器人 → 自定义机器人 → 复制 webhook URL。

---

## Admin 后台

`/admin/login` 用 `ADMIN_TOKEN` 登录。当前提供:

- `/admin/articles` 文章列表(状态、日期、阅读时长)
- `/admin/articles/:slug` 文章详情:复制公众号 HTML / 上传封面 / 推送

后续(V2)规划:
- 会员管理(magic link 登录、福利券核销)
- 线索 CRM(飞书外的本地视图)
- 报告下载量统计
- 公众号自定义菜单管理

---

## 贡献流程

```bash
# 1. 创建 feature 分支
git checkout -b feat/your-feature

# 2. 本地开发
pnpm dev
# 跑测试
pnpm typecheck
pnpm test:e2e

# 3. 提 PR(任意分支均可)
git push origin feat/your-feature
# 在 GitHub 上 Create Pull Request → main

# 4. 等待 CI 通过 + 预览部署到 dev{PR_NUM}.gputest.cn
# 5. Reviewer 审核 → 合并到 main
# 6. main 自动部署到 staging.gputest.cn
# 7. 在 staging 实地验证 → 触发 deploy-prod.yml workflow → 审核者 approve
```

---

## 故障排查

| 现象 | 排查 |
|---|---|
| 表单提交后飞书没收到 | 检查 FC 控制台 `LARK_BOT_WEBHOOK` 配置;查看 FC 函数调用日志(SLS) |
| `/admin` 登录失败 | 确认 `ADMIN_TOKEN` 已在 FC 环境变量配置且与本地一致 |
| 公众号推送失败 | 1) `WECHAT_APP_ID/SECRET` 配置;2) IP 白名单已取消;3) 注意 FC 实例重启会清掉内存 KV |
| 备案未通过 | 主体证件需是品晰科技实名,法人短信验证、视频核验 |
| Playwright 跑挂 | `pnpm exec playwright install --with-deps chromium`;检查 dev server 是否能起 |
| Bundle 超过 600KB | 拆分懒加载:在 `router.tsx` 用 `lazy()` + `Suspense` |

---

## 相关文档

- [阿里云 FC3.0 文档](https://help.aliyun.com/zh/fc/) · [Serverless Devs](https://docs.serverless-devs.com/) · [OSS](https://help.aliyun.com/zh/oss/) · [DCDN](https://help.aliyun.com/zh/dcdn/)
- [WeChat MP API 文档](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)
- [飞书机器人](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot)

---

© 北京品晰科技有限公司 · GPUTest 核芯
