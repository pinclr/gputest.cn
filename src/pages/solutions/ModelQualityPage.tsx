import { Sparkles, Beaker, GitCompare, Activity } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { MatrixHitMap } from '@/components/matrix/MatrixHitMap';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function ModelQualityPage() {
  useDocumentTitle(
    '模型质量评测',
    '客户模型在目标 GPU 上的精度评测:与 H100 参考的 logits / 输出 diff、量化精度损失、长上下文、跨硬件一致性。',
  );
  return (
    <>
      <PageHero
        eyebrow="解决方案 · 模型质量评测"
        title="量化与跨硬件迁移对模型输出影响的系统评估"
        desc="覆盖标准 benchmark、与 NVIDIA H100 参考输出的 diff、量化精度损失、长上下文与跨硬件一致性。由客户提供模型,我方实验室完成评测并出具报告,无需占用客户机房资源。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '评测报告样张', to: '/resources' }}
        tone="violet"
      >
        <MatrixHitMap
          hit={['quality.single', 'quality.cluster']}
          title="本方案专注 2 个质量格"
        />
      </PageHero>

      <SectionWrap
        eyebrow="01 · 适用场景"
        title="模型质量评测的典型购买动因"
        desc="硬件选型、量化方案与跨平台迁移均可能导致模型输出表面相近但实际质量退化,需通过系统化评测予以量化。"
      >
        <Scenarios
          tone="quality"
          items={[
            {
              icon: Sparkles,
              title: '国产卡迁移评估',
              desc: '客户模型从 NVIDIA 迁到昇腾 / 海光,需要量化与 H100 参考输出的差异 — 选型决策的最后一公里。',
            },
            {
              icon: Beaker,
              title: '量化方案选型',
              desc: 'FP16 / FP8 / INT8 / INT4 各档退化曲线,在 MMLU / GSM8K 等标准集上的具体分数损失。',
            },
            {
              icon: GitCompare,
              title: '卡厂家联合评测',
              desc: '与卡厂家联合发布"基于 X 卡的主流模型基线",作为白皮书与发布会素材。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="02 · 测试维度" title="七个子维度,逐一拆解" alt>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: '标准能力',
              d: 'MMLU · CMMLU · CEval · GSM8K · HumanEval · MT-Bench · MMBench',
            },
            {
              t: '推理一致性',
              d: '与 H100 FP32 参考的 logits / 输出 diff,语义余弦 / BLEU',
            },
            {
              t: '量化精度',
              d: 'FP16 / FP8 / INT8 / INT4 在标准集上的退化分数曲线',
            },
            {
              t: '长上下文质量',
              d: 'NIAH (针在草堆) · RULER · LongBench 长文摘要',
            },
            {
              t: '确定性',
              d: '同输入 N 次输出一致性,数值稳定性',
            },
            {
              t: '训练收敛',
              d: '同种子 / 同数据下 loss curve 与参考的偏离',
            },
            {
              t: '跨硬件一致性',
              d: 'NV golden vs 国产卡同任务 BLEU / 余弦相似度',
            },
            {
              t: '多模态',
              d: 'VQA · 文生图 · OCR 质量 (LMMs-Eval)',
            },
          ].map((d) => (
            <div key={d.t} className="surface p-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-pillar-quality" />
                <h4 className="text-sm font-semibold">{d.t}</h4>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{d.d}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="03 · 服务模式" title="客户提供模型 · 实验室执行 · 出具报告">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              num: '01',
              title: '提交模型',
              desc: '客户加密提交模型权重(或对接镜像仓),我方与客户签 NDA,数据销毁条款明示。',
            },
            {
              num: '02',
              title: '实验室执行',
              desc: '我方 H100 参考集群 + 目标卡集群双线跑,对比七个子维度 + 量化退化矩阵。',
            },
            {
              num: '03',
              title: '出具报告',
              desc: '完整 PDF + 雷达图 + diff 可视化 + 量化退化瀑布。可签字版本附 NDA 附录。',
            },
          ].map((s) => (
            <div key={s.num} className="surface relative overflow-hidden p-6">
              <div className="absolute -right-4 -top-4 font-mono text-6xl font-bold text-pillar-quality/10">
                {s.num}
              </div>
              <h4 className="text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="04 · 交付物" title="一份对比详尽的可视化报告" alt>
        <Deliverables
          items={[
            {
              title: 'PDF 评测报告',
              desc: '40–80 页,含分数雷达图、量化退化瀑布、长上下文热力图、diff 摘要、结论与建议',
            },
            {
              title: 'diff 数据包',
              desc: '逐 prompt 的 logits / 文本 diff 原始数据,客户可独立验证,JSON + Parquet',
            },
            {
              title: '基线脚本',
              desc: '可复现的 evaluation 脚本,客户可在自己环境复跑,作为基线监控依据',
            },
            {
              title: '改进建议',
              desc: '若发现退化超阈值,给出量化方案、kernel 调优、运行参数等具体改进路径',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="05 · 价格" title="按 SKU 计费" alt={false}>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { name: '快速诊断', desc: '1 模型 / 1 卡 / 标准集', price: '3 万 – 8 万', days: '5–7 天' },
            {
              name: '标准评测',
              desc: '1 模型 / 1 卡 / 全维度 + 量化',
              price: '10 万 – 18 万',
              days: '10–14 天',
            },
            {
              name: '国产卡迁移评估',
              desc: '客户模型 / NV→国产卡 / 全套 diff',
              price: '18 万 – 35 万',
              days: '2–3 周',
            },
            {
              name: '卡厂联合评测',
              desc: '主流模型横评 / 联合白皮书',
              price: '30 万 – 80 万',
              days: '4–6 周',
            },
          ].map((p) => (
            <div key={p.name} className="surface p-5">
              <Activity className="h-5 w-5 text-pillar-quality" strokeWidth={1.75} />
              <h4 className="mt-3 text-base font-semibold">{p.name}</h4>
              <p className="mt-1 text-xs text-ink-muted">{p.desc}</p>
              <div className="mt-3 font-mono text-xl font-semibold text-ink">¥{p.price}</div>
              <div className="mt-2 text-xs text-ink-dim">{p.days}</div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SolutionFooter
        title="无需占用客户机房资源,实验室完成全流程"
        desc="客户提交模型 → 我方实验室执行评测 → 出具报告。NDA 与数据销毁条款标准化,客户原始权重不出我方实验室。"
      />
    </>
  );
}
