import * as alicloud from '@pulumi/alicloud';
import * as pulumi from '@pulumi/pulumi';
import * as path from 'node:path';
import * as fs from 'node:fs';

export interface FcArgs {
  serviceName: string;
  env: string;
  apiHost: string;
  /** 函数代码 zip 路径,默认指向 ../aliyun/dist.zip */
  codeZipPath?: string;
  memoryMb: number;
  timeoutSec: number;
}

/**
 * FC3.0 服务 + 函数 + HTTP 触发器
 *
 * 注意:实际函数代码包(zip)由 CI 在部署阶段生成并上传;
 * Pulumi 这里只声明资源关系,代码内容会在 CI 通过 update-function-code 推上去。
 *
 * 环境变量值不在 IaC 写死,而是通过控制台 / CLI 单独配置(避免 Pulumi state 暴露密钥)。
 */
export function createFcService(args: FcArgs) {
  const tags = { project: 'gputest', env: args.env };

  // V3 service 概念已弱化,FC3.0 直接用 function 资源;此处保留 service 名作为 function 命名空间
  const codePath = args.codeZipPath ?? path.resolve(__dirname, '../../aliyun/dist.zip');

  // FC3.0 V3Function.code.zipFile 要求 base64 字符串,不是文件路径
  if (!fs.existsSync(codePath)) {
    throw new Error(
      `FC code zip not found: ${codePath}\n` +
        `请先在仓库根目录执行: bash aliyun/build-functions.sh`,
    );
  }
  const codeBase64 = fs.readFileSync(codePath).toString('base64');

  const fn = new alicloud.fc.V3Function(`${args.serviceName}-api`, {
    functionName: `${args.serviceName}-api`,
    description: `GPUTest API (${args.env})`,
    runtime: 'nodejs20',
    handler: '_aliyun/index.handler',
    memorySize: args.memoryMb,
    timeout: args.timeoutSec,
    diskSize: 512,
    cpu: 0.5,
    code: {
      zipFile: codeBase64,
    },
    // 实际敏感值在控制台配置;此处只声明键名让 Pulumi 不会 drift
    environmentVariables: {
      ENV: args.env,
      // ADMIN_TOKEN / WECHAT_* / LARK_BOT_WEBHOOK 等手动在控制台配置
    },
    tags,
  });

  // HTTP 触发器(匿名访问)
  const trigger = new alicloud.fc.V3Trigger(`${args.serviceName}-http`, {
    functionName: fn.functionName,
    triggerName: 'http',
    triggerType: 'http',
    qualifier: 'LATEST',
    triggerConfig: JSON.stringify({
      authType: 'anonymous',
      disableURLInternet: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  });

  // 自定义域名(api.gputest.cn / api-staging.gputest.cn / api-dev.gputest.cn)
  // 注:此资源依赖 ICP 备案,V1 期间不在 IaC 中创建,备案下来后在 FC 控制台手动绑定即可。
  // 待 alicloud provider 升级到 FC3.0 原生 CustomDomain API 时,再用 IaC 管理。
  // const customDomain = new alicloud.fc.CustomDomain(...);

  return {
    function: fn,
    trigger,
    apiUrlInternet: pulumi.interpolate`https://${args.apiHost}`,
  };
}
