import { Download, FileText, BookOpen, FlaskConical, Boxes, Stethoscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { cn } from '@/lib/utils';

interface Resource {
  icon: LucideIcon;
  type: '白皮书' | '样例报告' | '技术文章';
  title: string;
  desc: string;
  meta: string;
  gated: boolean;
  tone: 'amber' | 'violet' | 'steel';
}

const RESOURCES: Resource[] = [
  {
    icon: BookOpen,
    type: '白皮书',
    title: 'AIDC 测试三支柱方法学 v1.0',
    desc: '稳定性 / 性能 / 模型质量,单机与集群两层级 — 我们如何系统化地评估一个 GPU 集群。',
    meta: '60 页 · PDF · 留资下载',
    gated: true,
    tone: 'violet',
  },
  {
    icon: FileText,
    type: '样例报告',
    title: 'AIDC 项目验收综合测试报告(脱敏样张)',
    desc: '128 节点 / 1024 卡 H100 集群完整验收的脱敏报告,封面 + 摘要 + 6 格测试结论可见。',
    meta: '120 页 · PDF · 留资下载',
    gated: true,
    tone: 'amber',
  },
  {
    icon: Stethoscope,
    type: '样例报告',
    title: '集群健康审计报告(脱敏样张)',
    desc: '256 卡集群周期性体检报告,健康度评分 + 隐患清单 + 趋势对比。',
    meta: '60 页 · PDF · 留资下载',
    gated: true,
    tone: 'steel',
  },
  {
    icon: FlaskConical,
    type: '样例报告',
    title: '模型质量评测报告(脱敏样张)',
    desc: 'Qwen2-72B 在昇腾与 H100 上的横评:diff 雷达图、量化退化曲线、长上下文热力图。',
    meta: '50 页 · PDF · 留资下载',
    gated: true,
    tone: 'violet',
  },
  {
    icon: Boxes,
    type: '样例报告',
    title: '单机标准报告(脱敏样张)',
    desc: '一台 H100 整机的三支柱基础测试报告,工业流水线产物。',
    meta: '12 页 · PDF · 公开下载',
    gated: false,
    tone: 'amber',
  },
  {
    icon: FileText,
    type: '技术文章',
    title: 'Field Diag / DCGM Diag / gpu-burn 都跑过了,为什么集群上线还掉卡?',
    desc: '从三件套的能力边界讲起,聊为什么 168h 真实负载 soak 与模型质量 diff 不可省略。',
    meta: '公众号长文 · 公开阅读',
    gated: false,
    tone: 'amber',
  },
];

const TONE_BG: Record<Resource['tone'], string> = {
  amber: 'bg-accent-amber/10 text-accent-amber',
  violet: 'bg-accent-violet/10 text-accent-violet',
  steel: 'bg-pillar-performance/10 text-pillar-performance',
};

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function ResourcesPage() {
  useDocumentTitle(
    '资源中心 · 白皮书 · 样例报告',
    'AIDC 测试方法学白皮书、4 份样例报告 (验收 / 健康审计 / 模型质量 / 单机)、技术文章下载。',
  );
  return (
    <>
      <PageHero
        eyebrow="资源中心"
        title="白皮书 · 样例报告 · 技术文章"
        desc="所有方法学相关的内容都开源 — 工具清单公开、报告样张可下载、技术文章公众号同步。"
        tone="violet"
      />

      <section className="border-t border-border">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r) => (
              <div key={r.title} className="surface group flex flex-col p-6">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      'inline-flex h-10 w-10 items-center justify-center rounded-md',
                      TONE_BG[r.tone],
                    )}
                  >
                    <r.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                    {r.type}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{r.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-[11px] text-ink-dim">{r.meta}</span>
                  <button className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors group-hover:text-ink">
                    {r.gated ? '留资下载' : '直接下载'}
                    <Download className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 公众号引导 */}
          <div className="surface mt-12 grid items-center gap-6 p-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                关注公众号 · GPUTest 核芯
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                每周一 / 三 / 五 更新方法学与实测内容
              </h3>
              <p className="mt-2 text-ink-muted">
                单机到货验收 SOP · NCCL 多机实测 · 国产卡跑大模型 diff · 真实案例脱敏长文。
              </p>
            </div>
            <div className="grid h-32 w-32 place-items-center rounded-md border border-border bg-bg text-xs text-ink-dim">
              公众号二维码
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
