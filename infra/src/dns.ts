import * as alicloud from '@pulumi/alicloud';
import * as pulumi from '@pulumi/pulumi';

export interface DnsArgs {
  rootDomain: string;
  env: string;
  siteHost: string;
  /** 站点别名(prod 对应 www;其他环境为空) */
  siteAlias?: string;
  apiHost: string;
  /** OSS 站托管对外 endpoint 或 DCDN CNAME 目标 */
  siteCnameTarget: pulumi.Input<string>;
  /** FC 自定义域名 endpoint(经 FC 控制台获取) */
  apiCnameTarget: pulumi.Input<string>;
}

/**
 * AliDNS 记录
 *
 * 注意:rootDomain 必须先在阿里云解析后台被托管(添加为域名),
 * 否则 alicloud.dns.AlidnsRecord 会找不到 domainName。
 */
export function createDnsRecords(args: DnsArgs) {
  const records: alicloud.dns.AlidnsRecord[] = [];

  // 主站
  records.push(
    new alicloud.dns.AlidnsRecord(`${args.env}-site`, {
      domainName: args.rootDomain,
      rr: hostToRr(args.siteHost, args.rootDomain),
      type: 'CNAME',
      value: args.siteCnameTarget,
      ttl: 600,
    }),
  );

  // 站点别名(www)
  if (args.siteAlias) {
    records.push(
      new alicloud.dns.AlidnsRecord(`${args.env}-site-alias`, {
        domainName: args.rootDomain,
        rr: hostToRr(args.siteAlias, args.rootDomain),
        type: 'CNAME',
        value: args.siteCnameTarget,
        ttl: 600,
      }),
    );
  }

  // API 子域名
  records.push(
    new alicloud.dns.AlidnsRecord(`${args.env}-api`, {
      domainName: args.rootDomain,
      rr: hostToRr(args.apiHost, args.rootDomain),
      type: 'CNAME',
      value: args.apiCnameTarget,
      ttl: 600,
    }),
  );

  return { records };
}

function hostToRr(host: string, root: string): string {
  if (host === root) return '@';
  if (host.endsWith('.' + root)) return host.slice(0, -root.length - 1);
  return host;
}
