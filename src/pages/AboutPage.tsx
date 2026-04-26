import { Link } from 'react-router-dom';
import {
  Building,
  ShieldCheck,
  BookOpen,
  Lock,
  Warehouse,
  Server,
  Network,
  Terminal,
  Layers,
  Container,
  Brain,
  Bot,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { cn } from '@/lib/utils';

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function AboutPage() {
  useDocumentTitle(
    '关于 GPUTest 核芯 · 北京品晰科技',
    '北京品晰科技有限公司旗下 GPU 集群测试与验收品牌。第三方独立、方法学公开、报告可审计。',
  );
  return (
    <>
      <PageHero
        eyebrow="关于 GPUTest 核芯"
        title="第三方独立 · 方法学公开 · 报告可审计"
        desc="北京品晰科技有限公司旗下 GPU 集群测试与验收品牌。我们不卖卡、不卖云、不与任何一家硬件厂家分润 — 客户买的是中立。"
        tone="amber"
      />

      <SectionWrap
        eyebrow="01 · 我们是谁"
        title="一支站在 AI 基础设施每一层的团队"
      >
        <div className="surface p-8">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
            <div className="grid h-20 w-20 place-items-center rounded-lg border border-border-strong bg-bg-elevated font-mono">
              <span className="text-3xl font-bold text-accent-amber">2021</span>
            </div>
            <div>
              <p className="leading-7 text-ink">
                北京品晰科技有限公司成立于 2021 年,聚焦 GPU 集群测试与验收。
                <span className="text-ink-muted">"品晰"</span> — 甄别清晰;
                <span className="text-ink-muted">"核芯"</span> — 核验芯片。
              </p>
              <p className="mt-3 leading-7 text-ink-muted">
                我们做的事情是:把每一颗 GPU、每一台服务器、每一个集群,从硬件健康、性能基线到模型输出质量,做一次可审计的、可签字的、可被独立复核的检验。
              </p>
            </div>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap
        eyebrow="02 · 团队背景"
        title="覆盖 AI 基础设施全栈 — 从数据中心到 LLMOps"
        desc="团队成员的工作经历跨越 AI 基础设施的每一层 — 从机房配电到模型推理服务化,任何一层的异常我们都能定位。"
        alt
      >
        <StackLayer
          tag="L3 · AI 工作负载"
          tone="violet"
          items={[
            {
              icon: Brain,
              title: 'LLMOps 训练',
              en: 'Training',
              desc: '多机训练框架、checkpoint、loss 调试、收敛曲线、混合并行(TP/PP/EP),从单机调到千卡。',
              examples: 'Megatron-LM · DeepSpeed · NeMo · Pai-Megatron · Colossal-AI',
            },
            {
              icon: Bot,
              title: 'LLMOps 推理',
              en: 'Inference',
              desc: '推理引擎、KV cache 优化、长上下文、量化与编译、服务化与弹性扩缩。',
              examples: 'vLLM · TensorRT-LLM · SGLang · LMDeploy · TGI',
            },
          ]}
          gridCols={2}
        />

        <Connector />

        <StackLayer
          tag="L2 · 系统与基础软件"
          tone="steel"
          items={[
            {
              icon: Terminal,
              title: '操作系统',
              en: 'OS',
              desc: '内核、GPU 驱动栈、调度、信创适配,知道国产 OS 与国产卡的兼容深度。',
              examples: '统信 UOS · 麒麟 V10 · OpenEuler · RHEL · Ubuntu',
            },
            {
              icon: Layers,
              title: '虚拟化',
              en: 'Virtualization',
              desc: 'GPU 直通 / SR-IOV / vGPU 切分,知道虚拟化层怎么影响 GPU 测试结果与隔离边界。',
              examples: 'KVM · vSphere · NVIDIA vGPU · MIG · GPU Direct',
            },
            {
              icon: Container,
              title: '云原生',
              en: 'Cloud-Native',
              desc: '容器编排、GPU operator、训练 / 推理调度,大规模 GPU 集群的运维实战。',
              examples: 'Kubernetes · Volcano · Slurm · KubeRay · NVIDIA GPU Operator',
            },
          ]}
          gridCols={3}
        />

        <Connector />

        <StackLayer
          tag="L1 · 硬件与设施"
          tone="amber"
          items={[
            {
              icon: Warehouse,
              title: '数据中心',
              en: 'Data Center',
              desc: '机柜 / 配电 / 制冷 / 容灾,智算中心从图纸到投产的全流程。',
              examples: 'AIDC 选址 · PDU · 风冷 / 液冷 · 容灾架构',
            },
            {
              icon: Server,
              title: '服务器硬件',
              en: 'Server',
              desc: '整机设计、BMC、电源散热、firmware、RMA — 知道服务器在客户机房怎么"塌"。',
              examples: '浪潮 · 超聚变 · 联想 · 新华三 · Dell · HPE',
            },
            {
              icon: Network,
              title: 'GPU 集群',
              en: 'GPU Cluster',
              desc: 'IB / RoCE 网络、NCCL 通信、千卡规模部署与运维,集群级故障排障经验。',
              examples: 'NVIDIA · 昇腾 · 海光 · 寒武纪 · 摩尔线程',
            },
          ]}
          gridCols={3}
        />

        <p className="mt-8 text-sm leading-6 text-ink-muted">
          <span className="text-ink">这种纵深覆盖在测试服务行业很少见。</span>
          大多数同行只懂软件或只懂硬件,而问题往往出在层与层之间。我们做到八个领域齐备,因此可以把测试做穿——
          从 BMC 数据到模型 logits、从机柜热点到 NCCL 抖动、从国产 OS 兼容到推理引擎延迟,任何一层的异常都不会卡在"这不是我的领域"。
        </p>
      </SectionWrap>

      <SectionWrap eyebrow="03 · 三个原则" title="决定我们怎么做事的几条底线">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: '独立',
              desc: '不卖卡、不卖云、不收任何硬件厂家的市场费用。这是中立报告的根。一旦失去,品牌即崩。',
            },
            {
              icon: BookOpen,
              title: '公开',
              desc: '工具清单、版本号、触发参数、报告骨架全部公开。每一份报告附录都能被独立复核 — 这是我们的护城河。',
            },
            {
              icon: Lock,
              title: '保密',
              desc: '客户原始 telemetry 不出客户机房,只带走脱敏后的指标摘要。NDA + 数据销毁条款标准化,案例公开必须客户书面授权。',
            },
          ].map((p) => (
            <div key={p.title} className="surface p-6">
              <p.icon className="h-6 w-6 text-accent-amber" strokeWidth={1.75} />
              <h4 className="mt-3 text-lg font-semibold">{p.title}</h4>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="04 · 公司主体" title="北京品晰科技有限公司" alt>
        <div className="surface flex flex-col items-start gap-6 p-8 md:flex-row md:items-center">
          <Building className="h-12 w-12 shrink-0 text-accent-amber" strokeWidth={1.5} />
          <div className="flex-1">
            <table className="w-full text-sm">
              <tbody className="[&_tr]:border-b [&_tr]:border-border [&_tr:last-child]:border-b-0">
                <tr>
                  <td className="w-32 py-2 text-ink-dim">公司全称</td>
                  <td className="py-2 text-ink">北京品晰科技有限公司</td>
                </tr>
                <tr>
                  <td className="w-32 py-2 text-ink-dim">成立时间</td>
                  <td className="py-2 text-ink">2021 年</td>
                </tr>
                <tr>
                  <td className="w-32 py-2 text-ink-dim">主要业务</td>
                  <td className="py-2 text-ink">
                    GPU 集群测试与验收 · 模型质量评测 · 单机批量测试
                  </td>
                </tr>
                <tr>
                  <td className="w-32 py-2 text-ink-dim">业务品牌</td>
                  <td className="py-2 text-ink">GPUTest · 核芯</td>
                </tr>
                <tr>
                  <td className="w-32 py-2 text-ink-dim">官网</td>
                  <td className="py-2 text-ink">gputest.cn</td>
                </tr>
                <tr>
                  <td className="w-32 py-2 text-ink-dim">服务范围</td>
                  <td className="py-2 text-ink">中国大陆,聚焦智算 / 金融 / 政企 / 互联网</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrap>

      <section className="border-t border-border">
        <div className="container-x flex flex-col gap-3 py-12 md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-semibold tracking-tight">想了解更多?</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/methodology"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong bg-bg-surface px-6 text-sm font-medium text-ink hover:border-accent-violet/60 hover:bg-bg-elevated"
            >
              方法学
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
            >
              项目咨询
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface StackItem {
  icon: LucideIcon;
  title: string;
  en: string;
  desc: string;
  examples: string;
}

const TONE_STYLES: Record<
  'amber' | 'violet' | 'steel',
  { dot: string; tag: string; icon: string; ring: string }
> = {
  amber: {
    dot: 'bg-accent-amber',
    tag: 'border-accent-amber/30 text-accent-amber bg-accent-amber/5',
    icon: 'text-accent-amber bg-accent-amber/10',
    ring: 'hover:border-accent-amber/40',
  },
  violet: {
    dot: 'bg-accent-violet',
    tag: 'border-accent-violet/30 text-accent-violet bg-accent-violet/5',
    icon: 'text-accent-violet bg-accent-violet/10',
    ring: 'hover:border-accent-violet/40',
  },
  steel: {
    dot: 'bg-pillar-performance',
    tag: 'border-pillar-performance/30 text-pillar-performance bg-pillar-performance/5',
    icon: 'text-pillar-performance bg-pillar-performance/10',
    ring: 'hover:border-pillar-performance/40',
  },
};

function StackLayer({
  tag,
  tone,
  items,
  gridCols,
}: {
  tag: string;
  tone: 'amber' | 'violet' | 'steel';
  items: StackItem[];
  gridCols: 2 | 3;
}) {
  const t = TONE_STYLES[tone];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className={cn('h-1.5 w-1.5 rounded-full', t.dot)} />
        <span
          className={cn(
            'inline-block rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest',
            t.tag,
          )}
        >
          {tag}
        </span>
      </div>
      <div
        className={cn(
          'grid gap-3',
          gridCols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3',
        )}
      >
        {items.map((it) => (
          <div
            key={it.title}
            className={cn(
              'surface flex flex-col p-5 transition-colors',
              t.ring,
            )}
          >
            <div className="flex items-baseline justify-between">
              <div
                className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md', t.icon)}
              >
                <it.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                {it.en}
              </span>
            </div>
            <h4 className="mt-3 text-base font-semibold text-ink">{it.title}</h4>
            <p className="mt-1.5 flex-1 text-sm leading-6 text-ink-muted">{it.desc}</p>
            <div className="mt-3 border-t border-border pt-3 text-xs leading-5 text-ink-muted">
              {it.examples}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="my-3 flex justify-center" aria-hidden>
      <div className="h-6 w-px bg-gradient-to-b from-border via-border-strong to-border" />
    </div>
  );
}
