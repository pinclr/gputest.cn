# Pulumi · 阿里云基础设施 IaC

声明式管理 GPUTest 核芯长期环境(**prod / staging**)的阿里云资源。
跑 `pulumi up` 即可创建 / 同步 OSS / FC3.0 / DNS。

> **dev 不在 Pulumi 管理范围**:每个 PR 由 `.github/workflows/deploy-aliyun.yml` 命令式创建/销毁专属 bucket(`gputest-cn-dev{N}`)与 FC service(`gputest-fc-dev{N}`)。dev 直接用 OSS 原生 URL 与 FC 默认 `*.fcapp.run` URL,不绑自定义子域,无 DNS / 证书 / DCDN 依赖。Pulumi 只管 staging 与 prod 的长期资源,职责正交。

## 资源覆盖

| 资源 | 说明 |
|---|---|
| `alicloud.oss.Bucket` | 静态站点 bucket(staging / prod 各一) |
| `alicloud.fc.V3Function` | FC3.0 函数 + 资源限额 |
| `alicloud.fc.V3Trigger` | HTTP 触发器(匿名) |
| `alicloud.fc.CustomDomain` | API 自定义域名(api / api-staging) |
| `alicloud.dns.AlidnsRecord` | 站点 + 别名(prod) + API |

不在 IaC 中(暂手动):
- ICP 备案(走阿里云控制台流程)
- DCDN 加速域名(备案完成后控制台开)
- 免费 SSL 证书(DCDN 开启后自动签发)
- RAM 子账号 / AccessKey(初次手动建,授予 OSS / FC / DNS 权限)
- FC 函数环境变量值(避免 Pulumi state 含密钥,在 FC 控制台单独配)

## 前置条件

```bash
# 1. 安装 Pulumi
brew install pulumi
pulumi version  # ≥ 3.140

# 2. 安装阿里云 CLI(可选,核对资源时方便)
brew install aliyun-cli

# 3. 阿里云凭证(本地或 CI 环境变量)
export ALICLOUD_ACCESS_KEY=...
export ALICLOUD_SECRET_KEY=...
export ALICLOUD_REGION=cn-beijing

# 4. 在阿里云控制台先做的事
#    - 注册账号 + 实名(个人 / 企业)
#    - 域名解析:gputest.cn 已托管在 AliDNS
#    - RAM 创建子账号 "gputest-iac",赋予权限:
#        AliyunOSSFullAccess
#        AliyunFCFullAccess
#        AliyunDNSFullAccess
#      下载该子账号 AK/SK,作为 ALICLOUD_ACCESS_KEY / SECRET_KEY 使用
```

## 安装依赖

```bash
cd infra
pnpm install
```

## Pulumi backend(状态后端)

推荐 **Pulumi Cloud 免费版**(200 KB state 免费,中小项目够用):

```bash
pulumi login                       # 跳浏览器授权;按 SSO / Email 注册即可
```

或自托管到阿里云 OSS:

```bash
# 先创建一个 OSS bucket,如 gputest-pulumi-state
pulumi login oss://gputest-pulumi-state
```

## 创建 / 切换 stack

```bash
# 首次初始化(只有 prod / staging)
pulumi stack init prod
pulumi stack init staging

# 切换到目标 stack
pulumi stack select prod
```

stack 配置文件 `Pulumi.<stack>.yaml` 已在 git 中(非敏感)。

## 跑预览 / 实际部署

```bash
# 预览(不实际改动)
pulumi preview

# 实际创建 / 更新资源
pulumi up

# 销毁 stack 所有资源(慎用)
pulumi destroy
```

## 部署顺序

1. **prod** 与 **staging** 两个 stack 互不依赖,可独立部署(dev 由 CI 管,不在此处)
2. 首次跑 `pulumi up prod` 时,FC `CustomDomain` 资源会失败(域名未备案);
   - 解法 A:先 ` --target` 跳过 CustomDomain,等备案下来再补
     ```bash
     pulumi up --target 'urn:pulumi:prod::gputest-infra::alicloud:oss/Bucket:Bucket::gputest-cn-prod' \
               --target '...' \
               --target '...'  # 列出非 CustomDomain 资源
     ```
   - 解法 B:在 prod stack 临时去掉 createFcService 中的 CustomDomain 调用,V2 备案后加回

3. 备案完成后:
   - 阿里云控制台启用 DCDN,接管 gputest.cn / staging / 通配
   - 更新 `Pulumi.<stack>.yaml` 中 `siteCnameTarget` 指向 DCDN(或在 IaC 中读 DCDN 输出)
   - `pulumi up` 同步 DNS

## 与 CI 的关系

- **GitHub Actions(`.github/workflows/deploy-aliyun.yml`)** 负责构建产物 + 推到 OSS + 更新 FC 代码包
- **Pulumi(本目录)** 负责声明式管理资源拓扑(创建 / 销毁)
- 两者职责正交:CI 只动数据(代码 + 静态资源),IaC 只动资源(bucket / 函数 / DNS)

## 常用命令速查

```bash
pulumi stack ls                 # 列出所有 stack
pulumi stack output             # 查看当前 stack 输出
pulumi stack output bucketName  # 查特定输出
pulumi config                   # 查当前 stack 配置
pulumi refresh                  # 拉取实际云端状态,与 IaC 状态对账
pulumi cancel                   # 取消运行中的更新(超时 / 卡住时)
```

## 排错

| 现象 | 解决 |
|---|---|
| `AccessDenied` | 检查 RAM 子账号是否有 OSS / FC / DNS Full Access |
| `BucketAlreadyExists` | OSS bucket 名是全 region 唯一,改 `Pulumi.<stack>.yaml` 中 bucketName |
| `域名未备案` | FC CustomDomain 资源临时跳过,备案后再 pulumi up |
| Pulumi state 损坏 | `pulumi stack export` 备份 → 修 → `pulumi stack import` |
