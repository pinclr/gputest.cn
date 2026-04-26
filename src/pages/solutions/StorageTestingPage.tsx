import {
  HardDrive,
  Database,
  FolderTree,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { MatrixHitMap } from '@/components/matrix/MatrixHitMap';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { Timeline } from '@/components/solution/Timeline';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function StorageTestingPage() {
  useDocumentTitle(
    '智算存储测试',
    '并行文件系统 / 对象存储 / 本地 NVMe 全栈测试,基于 IOR / mdtest / fio / DLIO 等业界标准工具,确保训练任务不会因存储成为瓶颈。',
  );

  return (
    <>
      <PageHero
        eyebrow="解决方案 · 智算存储测试"
        title="覆盖并行文件系统、对象存储与本地存储的全栈测试"
        desc="基于 IOR、mdtest、fio、COSBench、DLIO 等业界标准工具,从吞吐、IOPS、元数据、多客户端并发到真实训练负载,完整验证智算存储栈是否满足训练任务的容量与性能需求。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '存储测试报告样张', to: '/resources' }}
        tone="steel"
      >
        <MatrixHitMap
          hit={['stability.cluster', 'performance.cluster']}
          title="本方案聚焦集群存储层"
        />
      </PageHero>

      <SectionWrap eyebrow="01 · 适用场景" title="存储测试的典型购买动因">
        <Scenarios
          tone="steel"
          items={[
            {
              icon: ShieldCheck,
              title: 'AIDC 验收存储专项',
              desc: '合同约定的存储吞吐、IOPS、元数据性能等关键 KPI,需经第三方实测对账。',
            },
            {
              icon: AlertTriangle,
              title: '训练任务异常根因排查',
              desc: '训练 step 时间漂移、checkpoint 加载偏慢、dataloader 阻塞等,需要确认是否由存储引起。',
            },
            {
              icon: Activity,
              title: '存储产品厂家认证',
              desc: '并行文件系统、智能存储一体机等厂家委托第三方完成性能与稳定性认证。',
            },
            {
              icon: Database,
              title: '信创存储选型 PoC',
              desc: '多款国产并行文件系统 / 对象存储的横向选型对比,需中立评测数据。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="02 · 存储类型覆盖" title="并行 / 对象 / 本地三大类全覆盖" alt>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: FolderTree,
              tone: 'amber',
              title: '并行文件系统',
              en: 'Parallel FS',
              desc: '多客户端并发的高带宽文件系统,典型用于训练数据集与 checkpoint。',
              tags: ['Lustre', 'Spectrum Scale (GPFS)', 'BeeGFS', 'DAOS', 'JuiceFS', '国产 PFS'],
            },
            {
              icon: Database,
              tone: 'steel',
              title: '对象存储',
              en: 'Object Storage',
              desc: 'S3 协议系存储,典型用于冷数据归档、模型仓库、跨 IDC 共享。',
              tags: ['S3', 'MinIO', '腾讯 COS', '阿里 OSS', '火山 TOS', '信创对象存储'],
            },
            {
              icon: HardDrive,
              tone: 'quality',
              title: '本地存储',
              en: 'Local Storage',
              desc: '单机 NVMe / 软件 RAID / 内核文件系统,影响数据预热与中间结果落盘。',
              tags: ['NVMe-oF', 'mdadm', 'XFS / ext4', 'BlueField NVMe over Fabrics'],
            },
          ].map((s) => (
            <div key={s.title} className="surface p-6">
              <div className="flex items-baseline justify-between">
                <s.icon
                  className={
                    s.tone === 'amber'
                      ? 'h-6 w-6 text-pillar-stability'
                      : s.tone === 'steel'
                        ? 'h-6 w-6 text-pillar-performance'
                        : 'h-6 w-6 text-pillar-quality'
                  }
                  strokeWidth={1.75}
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                  {s.en}
                </span>
              </div>
              <h4 className="mt-3 text-lg font-semibold tracking-tight">{s.title}</h4>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="03 · 测试维度" title="6 个评测维度 · 业界标准工具">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              level: '顺序吞吐',
              tone: 'amber',
              tool: 'IOR · fio · iozone',
              items: [
                '大文件顺序读写带宽',
                '不同块大小 (1MB / 4MB / 16MB)',
                '单客户端与多客户端聚合带宽',
                '与厂商标称对账',
              ],
            },
            {
              level: '随机 IOPS',
              tone: 'amber',
              tool: 'fio',
              items: [
                '随机读写 IOPS (4K / 16K / 64K)',
                '混合读写比例',
                '队列深度对 IOPS 的影响',
                '与 NVMe 标称对账',
              ],
            },
            {
              level: '元数据性能',
              tone: 'steel',
              tool: 'mdtest · MDtest-bench',
              items: [
                '海量小文件 create / stat / unlink',
                '目录扩展性',
                '元数据服务 (MDS) 扩展能力',
                '训练 dataset 真实场景模拟',
              ],
            },
            {
              level: '多客户端并发',
              tone: 'steel',
              tool: 'IOR · 自研负载',
              items: [
                'N 客户端聚合带宽曲线',
                '客户端扩展线性度',
                '存储侧 fairness',
                'QoS / 限流验证',
              ],
            },
            {
              level: '真实训练负载',
              tone: 'quality',
              tool: 'DLIO Benchmark · 自研 dataloader',
              items: [
                'ImageNet / WebDataset 训练 I/O',
                'Megatron checkpoint 读写',
                'PyTorch DataLoader 阻塞分析',
                'I/O 与 GPU 计算 overlap',
              ],
            },
            {
              level: '稳定性与故障注入',
              tone: 'quality',
              tool: 'fio long-run · chaos 注入',
              items: [
                '24–72h 长时压测',
                '存储节点 down 与重建',
                '网络分区下的可用性',
                '客户端断连与重连恢复',
              ],
            },
          ].map((d) => (
            <div key={d.level} className="surface p-5">
              <div
                className={
                  d.tone === 'amber'
                    ? 'inline-block rounded border border-pillar-stability/30 bg-pillar-stability/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-pillar-stability'
                    : d.tone === 'steel'
                      ? 'inline-block rounded border border-pillar-performance/30 bg-pillar-performance/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-pillar-performance'
                      : 'inline-block rounded border border-pillar-quality/30 bg-pillar-quality/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-pillar-quality'
                }
              >
                {d.level}
              </div>
              <div className="mt-2 font-mono text-[11px] text-ink-dim">{d.tool}</div>
              <ul className="mt-3 space-y-1.5">
                {d.items.map((it) => (
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

      <SectionWrap eyebrow="04 · 工作流" title="标准 7 天 / 验收级 2 周" alt>
        <Timeline
          steps={[
            {
              day: 'Day 0',
              title: '现场勘察与 SOW',
              desc: '梳理存储拓扑、客户端规模、合同 KPI 与训练 workload,确认测试范围',
            },
            {
              day: 'Day 1–2',
              title: '吞吐 + IOPS 基线',
              desc: '执行 IOR / fio / iozone 全矩阵,采集顺序与随机性能基线',
            },
            {
              day: 'Day 3–5',
              title: '元数据 + 多客户端扩展',
              desc: 'mdtest 元数据扩展、N 客户端聚合带宽、DLIO 真实负载',
            },
            {
              day: 'Day 6–7',
              title: '稳定性 + 故障 + 报告',
              desc: '24–72h 稳定性压测、故障注入(可选)、合同 KPI 对账与报告交付',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="05 · 交付物" title="可签字报告 + 可独立复核数据">
        <Deliverables
          items={[
            {
              title: '存储专项验收报告',
              desc: '40–80 页 PDF:封面 / 摘要 / 6 维度结论 / 合同 KPI 逐项对账表 / 工具版本附录',
            },
            {
              title: 'Raw telemetry 数据包',
              desc: 'IOR / fio / mdtest / DLIO 全部原始数据,SHA256 留痕,客户可独立复核',
            },
            {
              title: '训练 I/O 路径分析',
              desc: '从 dataloader → 客户端缓存 → 网络 → 存储节点的 I/O 路径瓶颈定位',
            },
            {
              title: '不达标项清单',
              desc: '按风险红 / 黄 / 绿三档分级,定位至具体客户端 / 存储节点 / 配置项',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap eyebrow="06 · 价格" title="按集群规模与测试深度分层" alt>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              name: '快速诊断',
              size: '< 100 客户端',
              range: '8 万 – 15 万',
              days: '3–5 天',
              desc: '吞吐与 IOPS 基线,简版报告,定位主要瓶颈',
            },
            {
              name: '标准测试',
              size: '100–500 客户端',
              range: '18 万 – 35 万',
              days: '7–10 天',
              desc: '6 维度全套覆盖,合同 KPI 对账,完整报告',
            },
            {
              name: '验收级',
              size: '500+ 客户端',
              range: '40 万 – 80 万',
              days: '2 周',
              desc: '附加故障注入、长时稳定性、整改复测',
            },
          ].map((p) => (
            <div key={p.name} className="surface p-5">
              <Layers className="h-5 w-5 text-pillar-performance" strokeWidth={1.75} />
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
          * 支持主流并行文件系统、S3 协议对象存储与国产存储产品。混合云与跨 IDC 复制场景按合同另议。
        </p>
      </SectionWrap>

      <SolutionFooter
        title="存储是训练的隐形瓶颈,需中立第三方测试"
        desc="出具可签字的存储专项验收报告,作为 AIDC 项目存储 KPI 的对账依据。"
      />
    </>
  );
}
