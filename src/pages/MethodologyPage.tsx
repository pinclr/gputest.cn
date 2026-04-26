import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ShieldCheck, Gauge, Sparkles, Cpu } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { MatrixGrid } from '@/components/matrix/MatrixGrid';
import {
  STABILITY_TOOLS,
  SOURCE_LABEL,
  SOURCE_STYLE,
  TIER_LABEL,
  PLATFORM_LABEL,
  type ToolPillar,
} from '@/data/tools';
import { VENDORS, COVERAGE_LABEL, COVERAGE_STYLE } from '@/data/vendors';
import { cn } from '@/lib/utils';

const PILLAR_ICON = {
  stability: ShieldCheck,
  performance: Gauge,
  quality: Sparkles,
};

const PILLAR_TONE: Record<ToolPillar, { color: string; bg: string; border: string }> = {
  stability: {
    color: 'text-pillar-stability',
    bg: 'bg-pillar-stability/8',
    border: 'border-pillar-stability/30',
  },
  performance: {
    color: 'text-pillar-performance',
    bg: 'bg-pillar-performance/8',
    border: 'border-pillar-performance/30',
  },
  quality: {
    color: 'text-pillar-quality',
    bg: 'bg-pillar-quality/8',
    border: 'border-pillar-quality/30',
  },
};

const PILLAR_TITLE: Record<ToolPillar, string> = {
  stability: '稳定性',
  performance: '性能',
  quality: '模型质量',
};

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function MethodologyPage() {
  useDocumentTitle(
    '方法学 · 测试体系',
    'GPUTest 三支柱 × 两层级测试体系。Field Diag / DCGM Diag / gpu-burn / NCCL-tests / lm-eval-harness / OpenCompass 全公开,与厂商官方文档对齐。',
  );
  return (
    <>
      <PageHero
        eyebrow="方法学 · 测试体系"
        title="3 支柱 × 2 层级，6 个格子，1 套标准"
        desc="我们公开方法学，公开工具清单，公开报告骨架。每一项测试都能追到一份业界标准文档与一段可复现的脚本。"
        primaryCta={{ label: '下载方法学白皮书', to: '/resources' }}
        secondaryCta={{ label: '看样例报告', to: '/resources' }}
        tone="violet"
      >
        <div className="rounded-xl border border-border bg-bg-surface/70 p-5 backdrop-blur">
          <MatrixGrid density="compact" />
        </div>
      </PageHero>

      {/* 锚点导航 */}
      <nav className="sticky top-16 z-30 border-b border-border bg-bg/80 backdrop-blur">
        <div className="container-x flex flex-wrap gap-4 py-3 text-sm">
          {(['stability', 'performance', 'quality'] as const).map((p) => {
            const Icon = PILLAR_ICON[p];
            return (
              <a
                key={p}
                href={`#${p}`}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded px-3 py-1.5 transition-colors hover:bg-bg-surface',
                  PILLAR_TONE[p].color,
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {PILLAR_TITLE[p]}
              </a>
            );
          })}
          <a
            href="#tools"
            className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-ink-muted hover:bg-bg-surface hover:text-ink"
          >
            <BookOpen className="h-4 w-4" strokeWidth={1.75} />
            工具清单
          </a>
          <a
            href="#vendors"
            className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-ink-muted hover:bg-bg-surface hover:text-ink"
          >
            <Cpu className="h-4 w-4" strokeWidth={1.75} />
            硬件覆盖
          </a>
        </div>
      </nav>

      {/* 三支柱深入 */}
      {(['stability', 'performance', 'quality'] as const).map((p, idx) => (
        <PillarSection key={p} pillar={p} reverse={idx % 2 === 1} />
      ))}

      {/* 工具清单总表 */}
      <section id="tools" className="border-t border-border bg-bg-surface/40">
        <div className="container-x py-16 lg:py-20">
          <SectionHeader
            eyebrow="工具清单"
            title="厂商官方 + 业界标准 + 自研补足"
            desc="我们使用的所有测试工具公开列出。每一份报告附录都会附上工具版本号与原始执行日志,可被独立复核。"
          />
          <div className="mt-8 surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-bg-elevated text-left text-ink-muted">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 font-medium">工具</th>
                    <th className="px-4 py-3 font-medium">说明</th>
                    <th className="px-4 py-3 font-medium">来源</th>
                    <th className="px-4 py-3 font-medium">层级</th>
                    <th className="px-4 py-3 font-medium">支柱</th>
                    <th className="px-4 py-3 font-medium">范围</th>
                    <th className="px-4 py-3 font-medium">平台</th>
                  </tr>
                </thead>
                <tbody>
                  {STABILITY_TOOLS.map((t) => (
                    <tr
                      key={t.name}
                      className="border-b border-border last:border-b-0 hover:bg-bg-elevated/40"
                    >
                      <td className="px-4 py-3 font-mono text-ink">{t.name}</td>
                      <td className="px-4 py-3 text-ink-muted">{t.desc}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-block rounded border px-1.5 py-0.5 text-[10px] font-medium',
                            SOURCE_STYLE[t.source],
                          )}
                        >
                          {SOURCE_LABEL[t.source]}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-dim">
                        {TIER_LABEL[t.tier]}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {t.pillars.map((p) => (
                            <span
                              key={p}
                              className={cn('h-1.5 w-1.5 rounded-full', PILLAR_TONE[p].color.replace('text-', 'bg-'))}
                              title={PILLAR_TITLE[p]}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-muted">
                        {t.scales.map((s) => (s === 'single' ? '单机' : '集群')).join(' · ')}
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-muted">
                        {t.platforms.map((p) => PLATFORM_LABEL[p]).join(' · ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-dim">
            注:NVIDIA Field Diag 二进制不入公开仓库,仅在客户授权前提下从内网制品库取用。所有自研工具均提交脚本与数据 schema 给客户备查。
          </p>
        </div>
      </section>

      {/* 硬件覆盖 */}
      <section id="vendors" className="border-t border-border">
        <div className="container-x py-16 lg:py-20">
          <SectionHeader
            eyebrow="硬件覆盖"
            title="主流 NVIDIA 与全部信创卡生态"
            desc="国产卡是一等公民。三支柱在每个生态都有对应的工具链与适配层,报告输出格式跨平台一致。"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {VENDORS.map((v) => (
              <div key={v.vendor} className="surface p-6">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-semibold tracking-tight">{v.vendor}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                      {v.vendorEn}
                    </span>
                  </div>
                  {v.hasCase && (
                    <span className="rounded-full bg-status-ok/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-status-ok">
                      已有真实交付
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {v.models.map((m) => (
                    <span
                      key={m}
                      className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-ink-muted"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-ink-dim">
                  生态:{' '}
                  <span className="text-ink-muted">{v.ecosystem.join(' · ')}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {(['stability', 'performance', 'quality'] as const).map((p) => (
                    <div
                      key={p}
                      className={cn(
                        'flex items-center justify-between rounded border px-2 py-1.5 text-[11px]',
                        COVERAGE_STYLE[v.coverage[p]],
                      )}
                    >
                      <span>{PILLAR_TITLE[p]}</span>
                      <span className="font-medium">{COVERAGE_LABEL[v.coverage[p]]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="border-t border-border">
        <div className="container-x flex flex-col gap-3 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">把方法学带进合同</h3>
            <p className="mt-1 text-sm text-ink-muted">
              我们把工具清单与版本写进 SOW,拒绝黑盒测试。
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
          >
            项目咨询 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function PillarSection({
  pillar,
  reverse,
}: {
  pillar: ToolPillar;
  reverse?: boolean;
}) {
  const Icon = PILLAR_ICON[pillar];
  const tone = PILLAR_TONE[pillar];
  const tools = STABILITY_TOOLS.filter((t) => t.pillars.includes(pillar));

  const pillarContent: Record<
    ToolPillar,
    { headline: string; desc: string; single: string[]; cluster: string[] }
  > = {
    stability: {
      headline: '稳定性',
      desc: '把每一台机器、每一颗芯,推到合同允许的极限,看它先在哪里塌。',
      single: [
        'NVIDIA Field Diag + DCGM Diag Level 3 全套',
        'gpu-burn 8–24h 满载,温度 / 功耗 / 降频曲线',
        'cuda_memtest 全 HBM 扫描,捕获 ECC',
        'IPMI / Redfish 整机风冷与 PSU 数据',
      ],
      cluster: [
        '72–168h 真实负载 soak (Llama2 / GPT 训练 harness)',
        'NCCL-tests 长时跑,链路抖动与降速捕获',
        '故障注入演练:拔卡 / 断网 / 断 PSU / 网卡 down',
        'DCGM Exporter + Prometheus telemetry 全程归档',
      ],
    },
    performance: {
      headline: '性能',
      desc: '与厂商标称对账,与同代卡横评,与上一次审计对比。',
      single: [
        'FP16 / BF16 / FP8 实测算力 vs 标称',
        'HBM 带宽 / PCIe / NVLink 对称性',
        '单机训练 / 推理吞吐 (Llama2 / SD / ResNet)',
        'MLPerf 单机子集',
      ],
      cluster: [
        'NCCL / HCCL 多机扩展效率曲线',
        '多机训练 token/s 与 step 时间',
        '端到端推理 e2e 时延分布',
        'HPL / HPCG 集群 HPC 基线',
      ],
    },
    quality: {
      headline: '模型质量',
      desc: '量化与硬件差异是否影响输出 — 国产卡选型决策的最后一公里。',
      single: [
        'MMLU / CMMLU / CEval / GSM8K / HumanEval',
        'FP16 / FP8 / INT8 / INT4 量化精度退化曲线',
        '与 H100 FP32 参考的 logits 与输出 diff',
        '确定性测试:同输入 N 次输出一致性',
      ],
      cluster: [
        'loss curve 偏离 (KL / 余弦)',
        '多机输出语义相似度 (跨节点一致性)',
        '长上下文 (NIAH / RULER / LongBench)',
        '多模态 VQA / 文生图质量 (LMMs-Eval)',
      ],
    },
  };

  const c = pillarContent[pillar];

  return (
    <section id={pillar} className={cn('border-t border-border', reverse && 'bg-bg-surface/30')}>
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <div
              className={cn(
                'inline-flex h-12 w-12 items-center justify-center rounded-md',
                tone.bg,
                tone.color,
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              {c.headline}
            </h2>
            <p className="mt-3 text-ink-muted">{c.desc}</p>
            <div className="mt-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                覆盖工具
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span
                    key={t.name}
                    className={cn(
                      'rounded border px-1.5 py-0.5 font-mono text-[11px]',
                      tone.border,
                      tone.color,
                    )}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ScaleCard label="单机" items={c.single} tone={tone} />
            <ScaleCard label="集群" items={c.cluster} tone={tone} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScaleCard({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: { color: string; bg: string; border: string };
}) {
  return (
    <div className={cn('surface p-5', tone.border)}>
      <div className={cn('absolute -mt-px h-px w-12', tone.color.replace('text-', 'bg-'))} />
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{label}</h4>
        <span className={cn('font-mono text-[10px] uppercase tracking-wider', tone.color)}>
          {label === '单机' ? 'S/N' : 'CLUSTER'}
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm leading-6 text-ink-muted">
            <span className={cn('mt-2 h-1 w-1 shrink-0 rounded-full', tone.color.replace('text-', 'bg-'))} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
