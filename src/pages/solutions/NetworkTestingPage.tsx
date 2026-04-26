import { Network, ListChecks, Activity, ShieldCheck, Wrench } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { MatrixHitMap } from '@/components/matrix/MatrixHitMap';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { Timeline } from '@/components/solution/Timeline';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function NetworkTestingPage() {
  useDocumentTitle(
    'IB / RoCE 网络全栈测试',
    '链路质量、RDMA 性能、PFC 配置、NCCL 基线、拓扑符合性与故障注入,出具网络专项验收报告。',
  );

  return (
    <>
      <PageHero
        eyebrow="解决方案 · IB / RoCE 网络测试"
        title="逐项验证集群网络层的合同 KPI"
        desc="覆盖链路质量、RDMA 实测、拓扑符合性与故障注入,出具可签字、可审计的中立第三方网络验收报告,作为甲乙双方对账与项目验收的依据。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '网络验收报告样张', to: '/resources' }}
        tone="steel"
      >
        <MatrixHitMap
          hit={['stability.cluster', 'performance.cluster']}
          title="本方案聚焦集群网络层"
        />
      </PageHero>

      <SectionWrap eyebrow="01 · 适用场景" title="网络专项测试的典型购买动因">
        <Scenarios
          tone="steel"
          items={[
            {
              icon: ListChecks,
              title: 'AIDC 网络专项验收',
              desc: '合同约定的 IB 带宽、NCCL 扩展效率、链路误码率等指标,需经中立第三方实测与对账。',
            },
            {
              icon: ShieldCheck,
              title: '网络厂商认证测试',
              desc: '交换机、智能网卡等产品由第三方完成性能与稳定性认证,作为产品发布与投标材料。',
            },
            {
              icon: Activity,
              title: '集成商交付前内审',
              desc: '总包于交付甲方前进行系统性网络层测试,作为出厂质检与责任界定的依据。',
            },
            {
              icon: Wrench,
              title: '故障事件后复测',
              desc: '链路抖动、丢包或训练异常事件之后,系统化复测以确认网络已回归健康状态。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="02 · 测试范围" title="6 层测试矩阵与关键 KPI" alt>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              level: 'L1 物理层与链路',
              tone: 'amber',
              items: [
                'IB / RoCE 链路速率与协商',
                'BER 误码率 (ibdiagnet)',
                '光模块与 DAC 线缆健康',
                '链路抖动与 Flap 次数',
              ],
            },
            {
              level: 'L2 拓扑符合性',
              tone: 'amber',
              items: [
                'Fat-tree 层间带宽 1:1 / 1:2 验证',
                '跨 rack 跳数与超订率',
                'Rail-optimized 排布核对',
                '叶脊冗余路径与负载均衡',
              ],
            },
            {
              level: 'L3 RDMA 性能',
              tone: 'steel',
              items: [
                'ib_send_bw / write_bw 双向带宽',
                'ib_read_lat / write_lat 时延分布',
                '大消息与小消息分段测试',
                '全节点对全节点矩阵',
              ],
            },
            {
              level: 'L4 流控配置',
              tone: 'steel',
              items: [
                'PFC 配置正确性与死锁检测',
                'ECN / DCQCN 阈值校验',
                'Buffer 占用与丢包统计',
                'MTU 与 MaxReadReq 一致性',
              ],
            },
            {
              level: 'L5 NCCL / HCCL 基线',
              tone: 'quality',
              items: [
                'all-reduce / all-gather / reduce-scatter',
                '扩展效率曲线(8 / 16 / 32 / … / N 节点)',
                'bus bandwidth 与 algo bandwidth 对照',
                'IB SHARP 加速效果对照',
              ],
            },
            {
              level: 'L6 故障注入',
              tone: 'quality',
              items: [
                '链路 down 与 LAG 切换',
                '交换机重启与恢复',
                'NIC 异常与 GPU Direct 自愈',
                'PFC 死锁注入与解除',
              ],
            },
          ].map((layer) => (
            <div key={layer.level} className="surface p-5">
              <div
                className={
                  layer.tone === 'amber'
                    ? 'inline-block rounded border border-pillar-stability/30 bg-pillar-stability/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-pillar-stability'
                    : layer.tone === 'steel'
                      ? 'inline-block rounded border border-pillar-performance/30 bg-pillar-performance/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-pillar-performance'
                      : 'inline-block rounded border border-pillar-quality/30 bg-pillar-quality/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-pillar-quality'
                }
              >
                {layer.level}
              </div>
              <ul className="mt-3 space-y-1.5">
                {layer.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 text-sm leading-6 text-ink-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-dim" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="03 · 工作流" title="标准 7 天 / 验收级 2 周">
        <Timeline
          steps={[
            {
              day: 'Day 0',
              title: '现场勘察与 SOW',
              desc: '梳理拓扑、硬件清单、交换机型号与合同 KPI,确认测试范围与触发参数',
            },
            {
              day: 'Day 1–2',
              title: '链路与 RDMA 基线',
              desc: '执行 ibdiagnet 与 perftest 全矩阵测试,采集链路质量与 RDMA 性能基线',
            },
            {
              day: 'Day 3–5',
              title: 'NCCL 多机与拓扑核对',
              desc: 'NCCL all-reduce 8 / 16 / 32 / … / N 扩展曲线,拓扑符合性与超订率核对',
            },
            {
              day: 'Day 6–7',
              title: '故障注入与报告',
              desc: '故障注入(可选)、合同 KPI 逐项对账、出具完整网络验收报告',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="04 · 交付物" title="可签字的报告与可独立复核的数据" alt>
        <Deliverables
          items={[
            {
              title: '网络专项验收报告',
              desc: '40–80 页 PDF:封面 / 摘要 / 6 层结论 / 合同 KPI 逐项对账表 / 工具与版本附录',
            },
            {
              title: 'Raw telemetry 数据包',
              desc: 'perftest / nccl-tests / ibdiagnet / DCGM 全部原始数据,SHA256 留痕,支持客户独立复核',
            },
            {
              title: '不达标项清单',
              desc: '按风险红 / 黄 / 绿三档分级,定位至具体链路与端口,附证据与建议处置路径',
            },
            {
              title: '后续改进建议',
              desc: '若发现性能瓶颈,可平滑衔接至 IB / RoCE 网络调优服务,SOW 续签即可启动',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="05 · 价格" title="按集群规模与测试深度分层">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              name: '快速测试',
              size: '64–256 卡',
              range: '5 万 – 10 万',
              days: '3–5 天',
              desc: '链路、RDMA 基线与 NCCL 抽样,简版报告',
            },
            {
              name: '标准测试',
              size: '256–1024 卡',
              range: '12 万 – 25 万',
              days: '7–10 天',
              desc: '6 层全套覆盖,合同 KPI 对账,完整报告',
            },
            {
              name: '验收级',
              size: '1024+ 卡',
              range: '30 万 – 60 万',
              days: '2 周',
              desc: '附加故障注入、整改复测与多轮交付',
            },
          ].map((p) => (
            <div key={p.name} className="surface p-5">
              <Network className="h-5 w-5 text-pillar-performance" strokeWidth={1.75} />
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
      </SectionWrap>

      <SolutionFooter
        title="网络层的合同 KPI · 中立第三方逐项验证"
        desc="提供可签字的网络专项验收报告,作为甲乙双方的对账依据与项目验收凭证。"
      />
    </>
  );
}
