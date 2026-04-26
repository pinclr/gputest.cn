import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Stethoscope,
  FlaskConical,
  Boxes,
  Cpu,
  Network,
  HardDrive,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Solution {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  range: string;
  highlight?: 'cashflow' | 'new';
}

const solutions: Solution[] = [
  {
    icon: Building2,
    title: 'AIDC 项目验收',
    desc: '面向新建智算中心与大规模 GPU 服务器交付的第三方综合验收。',
    href: '/solutions/acceptance',
    range: '8 万 – 250 万',
  },
  {
    icon: Stethoscope,
    title: '集群健康审计',
    desc: '已上线集群的周期性诊断与隐患识别,支持订阅化交付。',
    href: '/solutions/health-audit',
    range: '5 万 – 80 万 / 次',
  },
  {
    icon: FlaskConical,
    title: '模型质量评测',
    desc: '客户模型在目标硬件上的精度、量化与跨平台一致性评测。',
    href: '/solutions/model-quality',
    range: '3 万 – 80 万',
  },
  {
    icon: Network,
    title: 'IB / RoCE 网络测试',
    desc: '链路、RDMA、拓扑、NCCL 基线全栈测试,出具网络专项验收报告。',
    href: '/solutions/network-testing',
    range: '5 万 – 60 万',
  },
  {
    icon: HardDrive,
    title: '智算存储测试',
    desc: '并行文件系统 / 对象存储 / 本地 NVMe 全栈,确保训练不被存储拖慢。',
    href: '/solutions/storage-testing',
    range: '8 万 – 80 万',
    highlight: 'new',
  },
  {
    icon: ShieldCheck,
    title: '安全与合规测试',
    desc: '等保 2.0 / 信创合规、网络隔离、漏洞扫描、GPU 多租户隔离、供应链审计。',
    href: '/solutions/security-testing',
    range: '10 万 – 80 万',
    highlight: 'new',
  },
  {
    icon: Boxes,
    title: '单机批量测试',
    desc: '到货验收 / RMA 复测 / 二手交易,标准化报告 48 小时交付。',
    href: '/solutions/single-node',
    range: '¥1,200 起 / 台',
    highlight: 'cashflow',
  },
  {
    icon: Cpu,
    title: '国产卡专项',
    desc: '昇腾 / 海光 / 寒武纪 / 摩尔线程全维度评测,与 NVIDIA 参考可对照。',
    href: '/solutions/domestic-gpu',
    range: '定制',
  },
];

export function SolutionsBand() {
  return (
    <section id="solutions" className="border-b border-border scroll-mt-16">
      <div className="container-x py-16 lg:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              解决方案
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              八条产品线,覆盖 GPU 集群测试全场景
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              className="surface surface-hover group flex flex-col gap-3 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent-violet/10 text-accent-violet">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                {s.highlight === 'cashflow' && (
                  <span className="rounded-full bg-accent-amber/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-amber">
                    现金流 SKU
                  </span>
                )}
                {s.highlight === 'new' && (
                  <span className="rounded-full bg-accent-violet/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-violet">
                    新增
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="flex-1 text-sm leading-6 text-ink-muted">{s.desc}</p>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                <span className="font-mono text-xs text-ink-dim">{s.range}</span>
                <ArrowRight className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
