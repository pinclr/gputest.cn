import { Building2, ServerCog, ShoppingCart, FileBadge } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { MatrixHitMap } from '@/components/matrix/MatrixHitMap';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { Timeline } from '@/components/solution/Timeline';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function AcceptancePage() {
  useDocumentTitle(
    'AIDC 项目验收综合测试',
    '智算中心 / GPU 服务器到货 / 算力入库的第三方综合验收。三支柱 × 两层级全维度,出具可签字、可审计的验收报告。',
  );
  return (
    <>
      <PageHero
        eyebrow="解决方案 · AIDC 项目验收综合测试"
        title="中立第三方综合验收,逐项验证合同 KPI"
        desc="面向新建智算中心、大规模 GPU 服务器交付、算力租赁入库等场景的端到端综合验收。覆盖三支柱 × 两层级全维度,出具可签字、可审计的验收报告。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '验收报告样张', to: '/resources' }}
        tone="amber"
      >
        <MatrixHitMap
          hit={[
            'stability.single',
            'stability.cluster',
            'performance.single',
            'performance.cluster',
            'quality.single',
            'quality.cluster',
          ]}
          title="本方案命中 6 / 6 测试格"
        />
      </PageHero>

      <SectionWrap
        eyebrow="01 · 适用场景"
        title="第三方综合验收的典型场景"
        desc="项目规模越大、合同 KPI 越复杂,中立第三方报告对验收边界的界定价值越显著。"
      >
        <Scenarios
          tone="amber"
          items={[
            {
              icon: Building2,
              title: '新建 AIDC 项目交付',
              desc: '甲方与总包之间需逐项核对合同 KPI:算力达标率、IB 实测带宽、NCCL 扩展效率、稳定性指标与故障率上限等。',
            },
            {
              icon: ServerCog,
              title: '大规模服务器到货',
              desc: '单批数十至数百台到货,乙方单机自测难以覆盖集群级可用性,需第三方完成完整验收。',
            },
            {
              icon: ShoppingCart,
              title: '算力租赁入库验证',
              desc: '算力出租方于卡入库前完成基线测试,作为后续运营与客户责任界定的依据。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="02 · 测试范围" title="三支柱 × 两层级全覆盖" alt>
        <p className="max-w-3xl text-ink-muted">
          标准方案默认执行全部 6 格测试用例。客户亦可按合同 KPI 选取子集,工具版本与触发参数将写入 SOW 与合同附录,可直接被合同条款引用。
        </p>
        <div className="mt-8">
          <MatrixHitMap
            hit={[
              'stability.single',
              'stability.cluster',
              'performance.single',
              'performance.cluster',
              'quality.single',
              'quality.cluster',
            ]}
          />
        </div>
      </SectionWrap>

      <SectionWrap
        eyebrow="03 · 交付物"
        title="一份可签字的验收报告 + 完整原始数据"
      >
        <Deliverables
          items={[
            {
              title: '可签字 PDF 验收报告',
              desc: '60–150 页,封面 + 摘要 + 6 格测试结论 + 不达标项 + 合同 KPI 逐项核对表 + 附录(工具版本与日志索引)',
            },
            {
              title: '原始 telemetry 数据包',
              desc: 'DCGM Exporter / IPMI / 日志 / NCCL 跑分 raw,加密压缩,SHA256 留痕',
            },
            {
              title: '不达标项清单与整改建议',
              desc: '按风险红 / 黄 / 绿分级,附定位思路与整改优先级,可作为乙方整改输入',
            },
            {
              title: '复测条款',
              desc: '乙方整改后,我方按照同 SOW 进行复测,复测费用按比例计 (合同条款约定)',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="04 · 流程时间表" title="一周起步,标准 2–3 周完成" alt>
        <Timeline
          steps={[
            {
              day: 'Day 0',
              title: '现场勘察 · SOW',
              desc: '机房环境、网络拓扑、合同 KPI 拆解,确认测试范围与触发参数',
            },
            {
              day: 'Day 1–3',
              title: '部署 · 单机基线',
              desc: '工具部署、单机三支柱基线、初筛个体故障件',
            },
            {
              day: 'Day 3–7',
              title: '集群压测 · soak',
              desc: 'NCCL 多机扩展、IB 链路扫描、72–168h 真实负载 soak',
            },
            {
              day: 'Day 8–10',
              title: '报告 · 整改建议',
              desc: '出具完整 PDF 报告,与甲乙双方对齐结论,提交不达标项与整改建议',
            },
          ]}
        />
        <div className="mt-6 rounded-md border border-border bg-bg-surface/60 p-4 text-sm text-ink-muted">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">备注 · </span>
          深度验收(含故障注入与多轮整改复测)按 4 周计;
          <span className="font-mono text-xs uppercase tracking-widest text-ink-dim"> </span>
          Hyperscale 项目 (2k+ 卡) 需驻场,排期单独约定。
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="05 · 价格区间" title="按规模分层" alt={false}>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { name: 'Quick Check', size: '< 32 卡', range: '8 万 – 15 万', days: '3–5 天' },
            { name: 'Standard', size: '32–256 卡', range: '25 万 – 60 万', days: '7–10 天' },
            { name: 'Enterprise', size: '256–2048 卡', range: '80 万 – 250 万', days: '2–3 周' },
            { name: 'Hyperscale', size: '2k+ 卡', range: '定制', days: '4 周+' },
          ].map((p) => (
            <div key={p.name} className="surface p-5">
              <FileBadge className="h-5 w-5 text-accent-amber" strokeWidth={1.75} />
              <h4 className="mt-3 text-base font-semibold">{p.name}</h4>
              <div className="mt-1 text-xs text-ink-muted">{p.size}</div>
              <div className="mt-3 font-mono text-2xl font-semibold text-ink">¥{p.range}</div>
              <div className="mt-2 text-xs text-ink-dim">{p.days}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-dim">
          * 区间根据卡型、网络复杂度、是否含故障注入与多轮复测调整。具体报价以现场勘察后的 SOW 为准。
        </p>
      </SectionWrap>

      <SolutionFooter />
    </>
  );
}
