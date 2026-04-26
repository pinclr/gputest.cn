import { Cpu, ShieldCheck, FileBadge2, GitCompareArrows } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';
import { VENDORS, COVERAGE_LABEL, COVERAGE_STYLE } from '@/data/vendors';
import { cn } from '@/lib/utils';

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function DomesticGpuPage() {
  useDocumentTitle(
    '国产卡专项测评',
    '昇腾 / 海光 / 寒武纪 / 摩尔线程国产卡三支柱全覆盖。与 NVIDIA H100 参考可对照,信创采购与项目验收的中立依据。',
  );
  const domestic = VENDORS.filter((v) => v.vendor !== 'NVIDIA');

  return (
    <>
      <PageHero
        eyebrow="解决方案 · 国产卡专项测评"
        title="信创算力的中立第三方评测"
        desc="覆盖昇腾、海光、寒武纪、摩尔线程,三支柱全维度评测。报告字段跨平台一致,与 NVIDIA H100 参考结果可直接对照,适用于信创采购与项目验收。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '国产卡评测样张', to: '/resources' }}
        tone="violet"
      />

      <SectionWrap
        eyebrow="01 · 触发场景"
        title="国产卡相关的三类典型决策场景"
      >
        <Scenarios
          tone="quality"
          items={[
            {
              icon: Cpu,
              title: '采购前 PoC',
              desc: '面向多款国产卡的横向选型,需中立第三方评测数据替代卡厂家自有 benchmark。',
            },
            {
              icon: GitCompareArrows,
              title: 'NVIDIA → 国产卡迁移',
              desc: '原 NVIDIA H100 上运行的模型迁移至国产卡,需量化输出差异并定位 kernel / 算子层瓶颈。',
            },
            {
              icon: FileBadge2,
              title: '信创项目验收',
              desc: '政企信创项目要求出具自主可控算力健康度证明,由中立第三方机构评测后签发。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap
        eyebrow="02 · 支持的卡型"
        title="主流国产卡生态全覆盖"
        desc="每家卡型都有独立维护的适配层,工具自动切换。报告字段对齐 NV 报告结构,横评友好。"
        alt
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {domestic.map((v) => (
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
                生态: <span className="text-ink-muted">{v.ecosystem.join(' · ')}</span>
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
                    <span>
                      {p === 'stability' ? '稳定性' : p === 'performance' ? '性能' : '模型质量'}
                    </span>
                    <span className="font-medium">{COVERAGE_LABEL[v.coverage[p]]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="03 · 自主可控与合规对接" title="信创合规一并交付">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: '国产 OS 兼容',
              desc: '工具镜像支持统信 UOS / 麒麟 V10 / OpenEuler,ARM (鲲鹏 / 飞腾) 与 x86 双栈。',
            },
            {
              icon: Cpu,
              title: '等保对接',
              desc: '提供等保 2.0 三级所需的算力健康度证据章节,可作为等保测评附录。',
            },
            {
              icon: FileBadge2,
              title: '采购合规材料',
              desc: '协助甲方在信创采购环节提供"中立第三方测试报告",作为投标加分项与验收依据。',
            },
          ].map((s) => (
            <div key={s.title} className="surface p-6">
              <s.icon className="h-5 w-5 text-pillar-quality" strokeWidth={1.75} />
              <h4 className="mt-3 text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="04 · 与 NVIDIA 对照评测" title="同模型同任务的跨硬件 diff" alt>
        <p className="max-w-3xl text-ink-muted">
          客户在 NVIDIA H100 上验证通过的模型迁移至国产卡时,我方双线集群并行运行同一推理任务,完成逐 prompt 的输出 diff,并输出语义余弦相似度与 BLEU 指标。
          <span className="text-ink"> 该数据是国产卡选型决策中最具说服力的中立证据。</span>
        </p>
        <div className="mt-6">
          <Deliverables
            items={[
              {
                title: '横评报告',
                desc: 'NV vs 国产卡同模型的标准 benchmark 分数对照,雷达图直观',
              },
              {
                title: '逐 prompt diff',
                desc: '语义余弦 / BLEU 相似度分布,异常 case 单独列出,附原始输出',
              },
              {
                title: '量化退化对照',
                desc: 'FP16 / INT8 / INT4 各档在 NV 与国产卡上的退化曲线,选择最优量化方案',
              },
              {
                title: '迁移整改建议',
                desc: '若发现退化超阈值,给出 kernel / 算子 / 量化参数的具体调整路径',
              },
            ]}
          />
        </div>
      </SectionWrap>

      <SolutionFooter
        title="信创采购决策的中立评测支撑"
        desc="国产卡选型不应仅依赖厂商发布的 benchmark。我方基于公开方法学执行中立测试,提供真实可比的横评数据。"
      />
    </>
  );
}
