# 阿里云部署配置

GPUTest 核芯使用阿里云组合方案,初创期月度成本 ¥5–20。

## 产品组合

| 产品 | 用途 | 月费(估算) |
|---|---|---|
| **OSS** 对象存储 | 静态站点托管 + 报告 PDF / 白皮书存储 | < ¥1(< 1GB) |
| **DCDN** 全站加速 | CDN 加速 + WAF 基础 + DDoS 基础 | ¥0.5–3(按流量) |
| **FC 3.0** 函数计算 | `/api/*` Worker 等价物,HTTP 触发器 + 自定义域名 | 免费额度内(月 100 万次调用) |
| **AliDNS** | gputest.cn 域名解析 | 免费 |
| **域名 / 备案** | ICP 备案(主体已就绪) | 一次性 |

总月费预估 **¥5–20**(V1 流量 < 5GB)。

## 三环境分配

3 套独立资源(不共享凭证 / 配额):

| 环境 | OSS bucket | DCDN 加速域名 | FC3.0 服务 | 域名 |
|---|---|---|---|---|
| **prod** | `gputest-cn-prod` | gputest.cn / www.gputest.cn | `gputest-fc-prod` | gputest.cn |
| **staging** | `gputest-cn-staging` | staging.gputest.cn | `gputest-fc-staging` | staging.gputest.cn |
| **dev** | `gputest-cn-dev` | *.gputest.cn(通配) | `gputest-fc-dev` | dev{PR}.gputest.cn |

## DNS 记录(AliDNS)

```
gputest.cn               CNAME → gputest-cn-prod.oss-cn-beijing.aliyuncs.com   (经 DCDN 转发)
www.gputest.cn           CNAME → 同上
staging.gputest.cn       CNAME → gputest-cn-staging.oss-cn-beijing.aliyuncs.com
*.gputest.cn(通配)       CNAME → gputest-cn-dev.oss-cn-beijing.aliyuncs.com
api.gputest.cn           CNAME → FC3.0 自定义域名(prod)
api-staging.gputest.cn   CNAME → FC3.0 自定义域名(staging)
```

> 实际 OSS / FC endpoint 在控制台获取后填入

## 部署流(GitHub Actions 推送式)

阿里云 OSS / FC3.0 需 push 式部署(不像 EdgeOne / Cloudflare Pages 自动拉取):

- PR opened/sync   → checks(typecheck / build / e2e)→ 部署到 dev OSS + dev FC
- push main        → checks → 部署到 staging OSS + staging FC
- workflow_dispatch + 审核 → 部署到 prod OSS + prod FC + DCDN 刷新

详见 `.github/workflows/deploy-aliyun.yml` 与 `deploy-aliyun-prod.yml`。

## 必需配置

### GitHub Secrets

```
ALIYUN_ACCESS_KEY_ID         RAM 子账号 AccessKey ID(限定 OSS / FC / DCDN 权限)
ALIYUN_ACCESS_KEY_SECRET     RAM 子账号 AccessKey Secret
ALIYUN_REGION                如 cn-beijing
ALIYUN_OSS_BUCKET_PROD       gputest-cn-prod
ALIYUN_OSS_BUCKET_STAGING    gputest-cn-staging
ALIYUN_OSS_BUCKET_DEV        gputest-cn-dev
ALIYUN_FC_SERVICE_PROD       gputest-fc-prod
ALIYUN_FC_SERVICE_STAGING    gputest-fc-staging
ALIYUN_FC_SERVICE_DEV        gputest-fc-dev
ALIYUN_DCDN_DOMAIN_PROD      gputest.cn
ALIYUN_DCDN_DOMAIN_STAGING   staging.gputest.cn
```

### GitHub Environment

`production` 环境配 required reviewers,门禁 prod 部署。

### FC3.0 环境变量(每环境一份,FC 控制台配)

```
ADMIN_TOKEN
LARK_BOT_WEBHOOK
WECHAT_APP_ID
WECHAT_APP_SECRET
WECHAT_TOKEN
WECHAT_AES_KEY      (可选)
WEWORK_BOT_WEBHOOK  (可选)
```

## OSS / DCDN 必要规则

### OSS bucket 配置

- 公共读(所有静态资源)
- 默认首页:`index.html`
- 错误页:`index.html` (HTTP 404 时返回 200 + index.html,实现 SPA fallback)
  > 阿里云 OSS 当前不支持自定义错误码,会保持 404,SEO 略影响。
  > 改进方案:DCDN 边缘 EdgeRoutine 拦截 404 重写为 200,V2 评估。

### DCDN 配置

- 缓存规则:
  - `/assets/*`       Cache-Control: public, max-age=31536000, immutable
  - `/index.html`     Cache-Control: no-cache(发布后立即生效)
  - `/api/*`          不缓存(走 FC3.0)
- 安全:
  - 启用 WAF 基础规则
  - 启用 HTTPS 强制跳转
  - SSL 证书:阿里云免费 DV 证书

### FC3.0 HTTP 触发器

- 入口函数:`functions/_aliyun/index.ts`(适配 fetch handler 到 FC3.0)
- 请求路径:挂在 `api.gputest.cn` 自定义域名,`/contact /admin/* /wechat/*` 路由按文件夹结构分发
- 超时:30 秒
- 内存:256 MB(基础足够)
- 实例并发:10 起步

## 备案对接

- ICP 备案在阿里云体系内一站完成
- 主体:北京品晰科技
- 备案域名:gputest.cn 主域 + 子域(staging / 通配 / api / api-staging)
- 审核 14–21 天
