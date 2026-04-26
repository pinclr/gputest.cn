import {
  ShieldCheck,
  Lock,
  Network,
  KeyRound,
  Bug,
  Boxes,
  FileBadge,
  GitBranch,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { Timeline } from '@/components/solution/Timeline';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function SecurityTestingPage() {
  useDocumentTitle(
    '智算安全测试',
    '等保 2.0 / 信创合规、网络隔离、访问控制、漏洞扫描、GPU 多租户隔离、容器镜像安全与供应链审计。出具可签字的安全测试报告。',
  );

  return (
    <>
      <PageHero
        eyebrow="解决方案 · 安全测试"
        title="智算环境的全栈安全与合规测试"
        desc="覆盖等保 2.0 三级、信创合规、网络隔离、访问控制、漏洞扫描、GPU 多租户隔离、容器镜像与供应链审计。出具可签字的安全测试报告,作为合规验收与监管对接依据。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '安全测试报告样张', to: '/resources' }}
        tone="amber"
      />

      <SectionWrap eyebrow="01 · 适用场景" title="安全测试的典型购买动因">
        <Scenarios
          tone="amber"
          items={[
            {
              icon: FileBadge,
              title: '等保 2.0 测评准备',
              desc: '智算 / GPU 算力相关系统通过等保 2.0 三级测评前的预测试与整改建议。',
            },
            {
              icon: ShieldCheck,
              title: '信创采购合规',
              desc: '信创项目要求出具自主可控算力的安全合规报告,作为采购验收依据。',
            },
            {
              icon: Boxes,
              title: '多租户出租合规',
              desc: '算力出租平台对外服务需通过多租户隔离与数据安全的中立测试。',
            },
            {
              icon: Bug,
              title: '内部安全审计',
              desc: '政企内部安全部门定期对 AI 基础设施进行第三方独立审计。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="02 · 测试范围" title="8 个安全维度 · 智算专属" alt>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Network,
              title: '网络隔离',
              items: ['VLAN / VPC 隔离', '安全组与微隔离', '南北向 / 东西向流量审计', '管理面与业务面分离'],
            },
            {
              icon: KeyRound,
              title: '身份与访问控制',
              items: ['RBAC / ABAC 策略', 'SSO 与多因素认证', '特权账号管理', '审计日志完备性'],
            },
            {
              icon: Lock,
              title: '数据加密',
              items: ['静态数据加密', '传输加密 (TLS / IPsec)', '密钥管理 (KMS / HSM)', '敏感数据脱敏'],
            },
            {
              icon: Bug,
              title: '漏洞扫描',
              items: ['主机系统 CVE', '容器镜像漏洞', 'Driver 与 firmware', '内核与依赖库'],
            },
            {
              icon: Boxes,
              title: 'GPU 多租户隔离',
              items: ['MIG / vGPU 隔离验证', '容器 GPU 命名空间', '设备穿透安全', '租户间数据残留检测'],
            },
            {
              icon: GitBranch,
              title: '供应链安全',
              items: ['镜像签名验证', 'SBOM 软件物料清单', 'Firmware 来源核验', '第三方组件审计'],
            },
            {
              icon: ShieldCheck,
              title: 'API 与控制面',
              items: ['Kubernetes API 安全', '存储 / 监控 API 鉴权', 'Webhook 与 CRD 审计', '管理控制台安全'],
            },
            {
              icon: FileBadge,
              title: '等保合规对照',
              items: ['物理 / 网络 / 主机', '应用 / 数据 / 管理', '与等保 2.0 三级条款映射', '不达标项整改建议'],
            },
          ].map((d) => (
            <div key={d.title} className="surface p-5">
              <d.icon className="h-5 w-5 text-accent-amber" strokeWidth={1.75} />
              <h4 className="mt-3 text-sm font-semibold">{d.title}</h4>
              <ul className="mt-2 space-y-1">
                {d.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-1.5 text-xs leading-5 text-ink-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-amber/60" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="03 · 工作流" title="标准 10 天 / 等保级 2 周">
        <Timeline
          steps={[
            {
              day: 'Day 0',
              title: '现场勘察与 SOW',
              desc: '系统拓扑、合规目标(等保 / 信创 / 内审)、范围边界确认,输出测试方案',
            },
            {
              day: 'Day 1–4',
              title: '资产盘点 + 漏洞扫描',
              desc: '主机 / 容器 / 镜像 / firmware 漏洞扫描,SBOM 生成,基础合规对照',
            },
            {
              day: 'Day 5–8',
              title: '隔离与控制面验证',
              desc: '网络隔离、多租户 GPU 隔离、RBAC 策略、API 安全测试',
            },
            {
              day: 'Day 9–10',
              title: '报告与整改建议',
              desc: '出具完整安全测试报告、不达标项清单、与合规条款的逐项映射',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="04 · 交付物" title="可签字报告 + 合规对照表" alt>
        <Deliverables
          items={[
            {
              title: '安全测试报告',
              desc: '50–100 页 PDF:封面 / 摘要 / 8 维度结论 / 风险等级 / 工具版本附录',
            },
            {
              title: '等保对照表',
              desc: '与等保 2.0 三级控制项的逐条映射,标注符合 / 部分符合 / 不符合 + 证据',
            },
            {
              title: '漏洞清单',
              desc: 'CVE 列表按 CVSS 评分排序,附受影响资产 / 复现路径 / 修复建议',
            },
            {
              title: '整改建议',
              desc: '按优先级与实施成本排序的整改路径,可作为后续整改 SOW 的输入',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="05 · 价格" title="按系统规模与合规深度分层">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              name: '快速体检',
              size: '单一系统 / 集群',
              range: '10 万 – 18 万',
              days: '5–7 天',
              desc: '8 维度抽样测试 + 关键合规条款映射',
            },
            {
              name: '标准测试',
              size: '智算平台 / 出租平台',
              range: '25 万 – 45 万',
              days: '10–14 天',
              desc: '8 维度全套 + 等保 2.0 三级对照',
            },
            {
              name: '等保级',
              size: '政企 / 央企智算',
              range: '50 万 – 80 万',
              days: '2 周',
              desc: '+ 整改复测 + 等保测评协作 + 监管对接',
            },
          ].map((p) => (
            <div key={p.name} className="surface p-5">
              <ShieldCheck className="h-5 w-5 text-accent-amber" strokeWidth={1.75} />
              <h4 className="mt-3 text-base font-semibold">{p.name}</h4>
              <div className="mt-1 text-xs text-ink-muted">{p.size}</div>
              <div className="mt-3 font-mono text-2xl font-semibold text-ink">¥{p.range}</div>
              <div className="mt-2 text-xs text-ink-dim">{p.days}</div>
              <p className="mt-3 border-t border-border pt-3 text-xs leading-5 text-ink-muted">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-dim">
          * 我方为安全测试服务方,不承担渗透测试 / 攻防演练职责。涉及红蓝对抗的项目可对接合作伙伴。
        </p>
      </SectionWrap>

      <SolutionFooter
        title="智算合规需要中立第三方安全测试"
        desc="从等保 2.0 到信创采购,从多租户隔离到供应链审计,出具可签字的安全测试报告。"
      />
    </>
  );
}
