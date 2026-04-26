import * as alicloud from '@pulumi/alicloud';
import * as pulumi from '@pulumi/pulumi';

export interface OssArgs {
  bucketName: string;
  env: string;
  /** 主自定义域名(经备案后由 DCDN 接管) */
  siteHost: string;
}

/**
 * OSS 静态站托管 bucket
 *   - 公共读
 *   - 默认页 index.html
 *   - 错误页转 index.html(实现 SPA fallback,但响应仍为 404,SEO 受限)
 *   - 跨域(允许任意来源 GET / HEAD)
 */
export function createSiteBucket(args: OssArgs) {
  const tags = { project: 'gputest', env: args.env };

  const bucket = new alicloud.oss.Bucket(args.bucketName, {
    bucket: args.bucketName,
    acl: 'public-read',
    storageClass: 'Standard',
    redundancyType: 'LRS',
    tags,
    website: {
      indexDocument: 'index.html',
      errorDocument: 'index.html',
    },
    corsRules: [
      {
        allowedOrigins: ['*'],
        allowedMethods: ['GET', 'HEAD'],
        allowedHeaders: ['*'],
        exposeHeaders: ['ETag', 'Content-Length'],
        maxAgeSeconds: 600,
      },
    ],
    lifecycleRules: [
      {
        id: 'expire-pr-previews-30d',
        prefix: 'pr-',
        enabled: args.env === 'dev',
        expirations: [{ days: 30 }],
      },
    ],
  });

  return {
    bucket,
    bucketName: bucket.bucket,
    websiteEndpoint: pulumi.interpolate`${bucket.bucket}.oss-website-cn-beijing.aliyuncs.com`,
    intranetEndpoint: pulumi.interpolate`${bucket.bucket}.oss-cn-beijing-internal.aliyuncs.com`,
    extranetEndpoint: pulumi.interpolate`${bucket.bucket}.oss-cn-beijing.aliyuncs.com`,
  };
}
