import { Activity, ShieldAlert, Coins, Stethoscope } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { MatrixHitMap } from '@/components/matrix/MatrixHitMap';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function HealthAuditPage() {
  useDocumentTitle(
    'GPU 集群健康审计',
    '已上线 GPU 集群的周期性体检 — 硬件健康、性能基线、网络健康、稳定性预测、利用率分析。订阅化交付。',
  );
  return (
    <>
      <PageHero
        eyebrow="解决方案 · GPU 集群健康审计"
        title="已上线 GPU 集群的周期性诊断与隐患识别"
        desc="覆盖硬件健康度、性能基线、网络健康、稳定性预测与利用率分析。单次审计识别隐患,订阅化服务实现长期监测与趋势归档。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '健康审计报告样张', to: '/resources' }}
        tone="steel"
      >
        <MatrixHitMap
          hit={[
            'stability.single',
            'stability.cluster',
            'performance.cluster',
            'quality.cluster',
          ]}
          title="本方案常规命中 4 / 6"
        />
      </PageHero>

      <SectionWrap
        eyebrow="01 · 触发场景"
        title="健康审计的典型购买动因"
        desc="集群运行时间越长,潜在隐患积累越多——单卡老化、HBM ECC 漂移、链路误码累积、性能退化等,均可能导致训练任务异常中断。"
      >
        <Scenarios
          tone="steel"
          items={[
            {
              icon: Activity,
              title: '集群运行半年以上',
              desc: '已承载若干训练 / 推理负载,需要周期性诊断以评估整体健康度并积累趋势数据。',
            },
            {
              icon: ShieldAlert,
              title: '训练异常中断或客户投诉',
              desc: '出租方收到训练任务失败反馈,需快速定位至具体节点与卡件,界定故障责任。',
            },
            {
              icon: Coins,
              title: '资产保险续保与估值',
              desc: '算力资产保险续保、二手集群转售估值场景,需中立第三方健康度评分作为评估依据。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="02 · 服务套餐" title="按规模分层 · 订阅化推荐" alt>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: '轻量巡检',
              size: '< 64 卡',
              range: '5 万 – 10 万',
              days: '1–2 天',
              tag: '一次性',
            },
            {
              name: '标准审计',
              size: '64–512 卡',
              range: '15 万 – 35 万',
              days: '3–5 天',
              tag: '一次性',
            },
            {
              name: '深度审计',
              size: '512–2048 卡',
              range: '40 万 – 80 万',
              days: '1–2 周',
              tag: '一次性',
            },
            {
              name: '年度订阅',
              size: '任意',
              range: '基础费 + 按卡数',
              days: '季度审计 + 月度巡检',
              tag: '推荐',
              highlight: true,
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`surface p-5 ${p.highlight ? 'border-accent-amber/40' : ''}`}
            >
              <div className="flex items-start justify-between">
                <Stethoscope className="h-5 w-5 text-pillar-performance" strokeWidth={1.75} />
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                    p.highlight
                      ? 'bg-accent-amber/15 text-accent-amber'
                      : 'bg-bg-elevated text-ink-dim'
                  }`}
                >
                  {p.tag}
                </span>
              </div>
              <h4 className="mt-3 text-base font-semibold">{p.name}</h4>
              <div className="mt-1 text-xs text-ink-muted">{p.size}</div>
              <div className="mt-3 font-mono text-xl font-semibold text-ink">¥{p.range}</div>
              <div className="mt-2 text-xs text-ink-dim">{p.days}</div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap
        eyebrow="03 · 交付物"
        title="健康度评分 + 隐患清单 + 趋势对比"
      >
        <Deliverables
          items={[
            {
              title: '健康度百分制评分',
              desc: '硬件 / 性能 / 网络 / 稳定性 / 利用率 5 维评分,综合一个整体分,作为对外可披露的健康度证明',
            },
            {
              title: '隐患清单 (红 / 黄 / 绿)',
              desc: '逐节点逐张卡列出潜在故障 — 已发生、即将发生、需关注三档,附定位日志与建议处置',
            },
            {
              title: '与上次审计趋势对比',
              desc: '订阅客户独享 — 同一指标、同一节点的时间序列变化曲线,提前预警退化',
            },
            {
              title: '整改优先级与处置 SOP',
              desc: '按风险与运维成本排序,RMA / 调机 / 软件升级 / 替换部件 各自的处置步骤',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap
        eyebrow="04 · 订阅服务的价值"
        title="季度审计 + 月度巡检 + 阈值告警三层产品"
        alt
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              tag: '季度',
              title: '完整审计',
              desc: '每季度一次全维度深度审计,产出完整报告并与上一次对比,趋势可见。',
            },
            {
              tag: '月度',
              title: '轻量巡检',
              desc: '每月一次自动跑测脚本 + 健康度评分快报,30 页内,适合内部备查。',
            },
            {
              tag: '实时',
              title: '阈值告警通道',
              desc: '将我方采集器接入客户 Prometheus,异常超阈值通过邮件 / 企微推送。',
            },
          ].map((s) => (
            <div key={s.title} className="surface p-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-pillar-performance">
                {s.tag}
              </span>
              <h4 className="mt-2 text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-dim">
          * 订阅客户首单做一次"基线"审计,后续季度审计与基线对比,趋势数据作为续保 / 估值的核心证据。
        </p>
      </SectionWrap>

      <SolutionFooter
        title="单次审计或订阅服务,按规模与风险偏好定制"
        desc="基于集群规模、卡型与风险偏好,提供匹配的审计方案与服务节奏。"
      />
    </>
  );
}
