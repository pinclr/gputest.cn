import * as pulumi from '@pulumi/pulumi';
import { createSiteBucket } from './oss';
import { createFcService } from './fc';
import { createDnsRecords } from './dns';

const config = new pulumi.Config();
const env = config.require('env');
const rootDomain = config.require('rootDomain');
const siteHost = config.require('siteHost');
const siteAlias = config.get('siteAlias');
const apiHost = config.require('apiHost');
const bucketName = config.require('bucketName');
const fcServiceName = config.require('fcServiceName');
const fcMemoryMb = Number(config.require('fcMemoryMb'));
const fcTimeoutSec = Number(config.require('fcTimeoutSec'));

// 1. OSS 静态站
const site = createSiteBucket({ bucketName, env, siteHost });

// 2. FC3.0 函数(无 CustomDomain — 备案下来后控制台手动绑定)
const fc = createFcService({
  serviceName: fcServiceName,
  env,
  apiHost,
  memoryMb: fcMemoryMb,
  timeoutSec: fcTimeoutSec,
});

// 3. DNS 记录(可选,默认创建)
//    备案前:CNAME 指向 OSS website endpoint(可经 HTTP 访问 .aliyuncs.com 子域)
//    备案后:在 stack config 中改 siteCnameTarget 为 DCDN endpoint
const dns = createDnsRecords({
  rootDomain,
  env,
  siteHost,
  siteAlias,
  apiHost,
  siteCnameTarget: site.websiteEndpoint,
  // FC3.0 函数默认 endpoint(无自定义域名时由控制台获取并填回 stack config)
  apiCnameTarget: pulumi.interpolate`${fc.function.functionName}.fcv3-http.cn-beijing.fcapp.run`,
});

// 输出供 CI / 运维查看
export const outputs = {
  env,
  bucketName: site.bucketName,
  bucketEndpoint: site.extranetEndpoint,
  bucketWebsiteEndpoint: site.websiteEndpoint,
  fcFunctionName: fc.function.functionName,
  apiUrl: fc.apiUrlInternet,
  dnsRecordCount: dns.records.length,
};
