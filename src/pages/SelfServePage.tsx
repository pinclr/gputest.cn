import { Link } from 'react-router-dom';
import {
  Download,
  Terminal,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Boxes,
  ShieldCheck,
  Mail,
  QrCode,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function SelfServePage() {
  useDocumentTitle(
    '免费自测 · 50 元报告解读',
    '下载 GPUTest 单机自测工具包,本地 3 小时完成测试。可选 50 元升级专家书面解读,24 小时内交付。',
  );

  return (
    <>
      <PageHero
        eyebrow="免费工具 · 入门服务"
        title="免费自测你的 GPU 服务器,50 元升级专家解读"
        desc="一键测试包覆盖 NVIDIA Field Diag、DCGM Diag、gpu-burn、cuda_memtest 等业界标准工具。本地 3 小时内完成,自动生成报告。可选 50 元升级专家书面解读,24 小时内交付。"
        primaryCta={{ label: '下载工具包', to: '#download' }}
        secondaryCta={{ label: '上传报告获取解读', to: '#interpretation' }}
        tone="amber"
      >
        <div className="surface space-y-3 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              价格
            </span>
            <span className="rounded-full bg-status-ok/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-status-ok">
              限时
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded border border-status-ok/30 bg-status-ok/5 p-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-status-ok">
                工具包
              </div>
              <div className="mt-1 text-2xl font-bold text-ink">免费</div>
              <div className="mt-1 text-[11px] text-ink-dim">永久免费 · 留邮箱即可下载</div>
            </div>
            <div className="rounded border border-accent-amber/30 bg-accent-amber/5 p-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent-amber">
                专家解读
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-mono text-sm text-accent-amber">¥</span>
                <span className="text-2xl font-bold text-ink">50</span>
                <span className="text-[11px] text-ink-dim">/ 次</span>
              </div>
              <div className="mt-1 text-[11px] text-ink-dim">24h 交付 · 书面分析</div>
            </div>
          </div>
        </div>
      </PageHero>

      <SectionWrap eyebrow="01 · 工作流" title="下载 → 运行 → 报告 → (可选) 解读">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              num: '01',
              icon: Download,
              title: '下载工具包',
              desc: 'Docker image 或离线 tar 包,留邮箱获取下载链接,工具包永久免费。',
            },
            {
              num: '02',
              icon: Terminal,
              title: '本地一键执行',
              desc: '单条命令启动,自动跑完三支柱单机用例,典型耗时 3 小时。',
            },
            {
              num: '03',
              icon: FileText,
              title: '自动生成报告',
              desc: '本地输出 PDF 报告与原始 telemetry JSON,SHA256 留痕。',
            },
            {
              num: '04',
              icon: Sparkles,
              title: '可选 · 专家解读',
              desc: '上传报告并支付 50 元,24 小时内收到专家书面分析与改进建议。',
            },
          ].map((s) => (
            <div key={s.num} className="surface p-5">
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-accent-amber" strokeWidth={1.75} />
                <span className="font-mono text-2xl font-bold text-accent-amber/30">
                  {s.num}
                </span>
              </div>
              <h4 className="mt-3 text-base font-semibold">{s.title}</h4>
              <p className="mt-2 text-xs leading-5 text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="02 · 工具包内容" title="单机三支柱标准用例" alt>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'NVIDIA DCGM Diag Level 3', cat: '稳定性', desc: '数据中心标准诊断' },
            { name: 'gpu-burn 8h', cat: '稳定性', desc: '满载温度 / 功耗 / ECC 触发' },
            { name: 'cuda_memtest', cat: '稳定性', desc: 'HBM 显存逐 bit 扫描' },
            { name: 'nvbandwidth', cat: '性能', desc: 'PCIe / NVLink 对称性' },
            { name: '单机 NCCL P2P', cat: '性能', desc: '多卡 P2P 带宽与 All-Reduce' },
            { name: 'dcgmi health watch', cat: '稳定性', desc: '全程 XID / ECC / Thermal 事件捕获' },
            { name: 'IPMI / Redfish 采集', cat: '稳定性', desc: 'BMC 级温度与功耗时间序列' },
            {
              name: 'MMLU / GSM8K 抽测',
              cat: '模型质量',
              desc: '单卡推理精度抽测(可选启用)',
            },
            {
              name: '报告自动生成',
              cat: '交付',
              desc: 'Typst 渲染 PDF + JSON 原始数据',
            },
          ].map((tool) => (
            <div key={tool.name} className="surface p-5">
              <div className="flex items-center justify-between">
                <span
                  className={
                    tool.cat === '稳定性'
                      ? 'rounded border border-pillar-stability/30 bg-pillar-stability/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-pillar-stability'
                      : tool.cat === '性能'
                        ? 'rounded border border-pillar-performance/30 bg-pillar-performance/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-pillar-performance'
                        : tool.cat === '模型质量'
                          ? 'rounded border border-pillar-quality/30 bg-pillar-quality/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-pillar-quality'
                          : 'rounded border border-border bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted'
                  }
                >
                  {tool.cat}
                </span>
              </div>
              <h4 className="mt-3 font-mono text-sm font-semibold text-ink">{tool.name}</h4>
              <p className="mt-1 text-xs leading-5 text-ink-muted">{tool.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap
        eyebrow="03 · 下载工具包"
        title="留邮箱获取下载链接(永久免费)"
        id="download"
      >
        <div className="surface grid items-center gap-6 p-8 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
              <span className="rounded border border-border bg-bg-elevated px-2 py-1 text-xs text-ink-muted">
                $ docker pull gputest/single-node:latest
              </span>
              <span className="text-ink-dim">或</span>
              <span className="rounded border border-border bg-bg-elevated px-2 py-1 text-xs text-ink-muted">
                离线 tar 包 · 离网环境可用
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-muted">
              工具包内置我方维护的容器镜像与一键执行脚本。无需互联网,适用于政企离网环境。当前版本 v1.0,持续更新。
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-ink-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-status-ok" />
                <span>NVIDIA H100 / H200 / A100 / L40S 等主流卡型</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-status-ok" />
                <span>支持单机 1–8 GPU,自动适配卡数</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-status-ok" />
                <span>测试结果与本地报告均不上传任何数据</span>
              </li>
            </ul>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
          >
            <Mail className="h-4 w-4" />
            留邮箱获取下载链接
          </Link>
        </div>
        <p className="mt-3 text-xs text-ink-dim">
          国产卡(昇腾 / 海光 / 寒武纪 / 摩尔线程)版本目前仅向企业客户提供,联系销售评估开通。
        </p>
      </SectionWrap>

      <SectionWrap
        eyebrow="04 · 50 元报告解读服务"
        title="把原始数据变成可决策的结论"
        alt
        id="interpretation"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="surface p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-semibold tracking-tight">报告解读 · ¥50 / 次</h3>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                24h 交付
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              工具包生成的报告对工程师友好,但若需要把数据快速翻译为采购 / 维修 / 整改决策,可购买专家书面解读。
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-status-ok">
                  <CheckCircle2 className="h-4 w-4" />
                  服务内容
                </div>
                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-ink-muted">
                  <li>· 1 名资深工程师审阅原始 telemetry</li>
                  <li>· 4–6 页书面分析(PDF)</li>
                  <li>· 健康度红 / 黄 / 绿评级</li>
                  <li>· 具体改进建议(运维 / 采购视角)</li>
                  <li>· 异常项的复测与排查路径</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-status-warn">
                  <XCircle className="h-4 w-4" />
                  不在范围内
                </div>
                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-ink-muted">
                  <li>· 现场访问与设备接触</li>
                  <li>· 整改与维修实施</li>
                  <li>· 集群级 / 多机问题分析</li>
                  <li>· 实时电话 / 视频咨询</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-md border border-accent-amber/30 bg-accent-amber/5 p-4 text-xs text-ink-muted">
              <div className="font-medium text-accent-amber">规模化优惠</div>
              <ul className="mt-2 space-y-1">
                <li>· 5 台合并解读:¥200(原价 ¥250)</li>
                <li>· 10 台合并解读:¥350(原价 ¥500)</li>
                <li>· 已购单机批量测试客户:解读免费</li>
              </ul>
            </div>
          </div>

          <div className="surface p-6">
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              支付与提交
            </div>
            <ol className="mt-3 space-y-3">
              {[
                { n: 1, t: '微信扫码付款', d: '扫描下方收款码,备注"GPU 报告解读"' },
                { n: 2, t: '加销售企微', d: '通过页面右下角浮窗或联系页二维码' },
                { n: 3, t: '提交报告', d: '将 zip 报告包发给销售,附付款截图' },
                { n: 4, t: '24h 内拿解读', d: '专家分析 PDF 通过邮件 / 企微回传' },
              ].map((s) => (
                <li key={s.n} className="flex items-start gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-strong bg-bg-elevated font-mono text-xs text-accent-amber">
                    {s.n}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-ink">{s.t}</div>
                    <div className="mt-0.5 text-xs text-ink-muted">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 grid h-32 w-full place-items-center rounded-md border border-border bg-bg text-xs text-ink-dim">
              <div className="flex flex-col items-center gap-1.5">
                <QrCode className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
                <span>微信收款码占位 · 部署后替换</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-ink-dim">
              V2 接入网页内微信支付后,可实现一键支付 + 自动派单。
            </p>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="05 · 升级路径" title="入门 · 标准 · 集群三档清晰可循">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              tier: '入门',
              title: '免费自测 + 50 元解读',
              desc: '工具包永久免费;可选 50 元解读获取专家结论。',
              feat: ['本地执行 · 数据不出客户机房', '自动报告 + 可选书面分析', '24h 交付'],
              tone: 'amber',
              icon: ShieldCheck,
            },
            {
              tier: '标准',
              title: '单机批量测试',
              desc: '由我方测试台执行,标准化报告 48h 交付,SLA 保障。',
              feat: ['¥1,200 起 / 台', '量贩 9 折 / 8 折', '汇总 Excel + 单机 PDF'],
              tone: 'violet',
              icon: Boxes,
              cta: { label: '查看单机批量', to: '/solutions/single-node' },
            },
            {
              tier: '集群',
              title: 'AIDC 验收 / 健康审计 / 调优',
              desc: '集群级中立第三方服务,合同 KPI 对账,可签字报告。',
              feat: ['项目制', '5 万 – 250 万 / 项目', '可对接信创合规需求'],
              tone: 'steel',
              icon: Sparkles,
              cta: { label: '查看集群方案', to: '/solutions/acceptance' },
            },
          ].map((t) => (
            <div
              key={t.tier}
              className={
                t.tone === 'amber'
                  ? 'surface border-accent-amber/40 p-6'
                  : t.tone === 'violet'
                    ? 'surface border-accent-violet/40 p-6'
                    : 'surface border-pillar-performance/40 p-6'
              }
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    t.tone === 'amber'
                      ? 'rounded-full bg-accent-amber/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-amber'
                      : t.tone === 'violet'
                        ? 'rounded-full bg-accent-violet/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-violet'
                        : 'rounded-full bg-pillar-performance/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-pillar-performance'
                  }
                >
                  {t.tier}
                </span>
                <t.icon
                  className={
                    t.tone === 'amber'
                      ? 'h-5 w-5 text-accent-amber'
                      : t.tone === 'violet'
                        ? 'h-5 w-5 text-accent-violet'
                        : 'h-5 w-5 text-pillar-performance'
                  }
                  strokeWidth={1.75}
                />
              </div>
              <h4 className="mt-3 text-lg font-semibold tracking-tight">{t.title}</h4>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{t.desc}</p>
              <ul className="mt-3 space-y-1 text-xs text-ink-muted">
                {t.feat.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-dim" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {'cta' in t && t.cta && (
                <Link
                  to={t.cta.to}
                  className={
                    t.tone === 'violet'
                      ? 'mt-4 inline-flex items-center gap-1.5 text-sm text-accent-violet hover:opacity-80'
                      : 'mt-4 inline-flex items-center gap-1.5 text-sm text-pillar-performance hover:opacity-80'
                  }
                >
                  {t.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </SectionWrap>

      <section className="relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,161,0,0.16),transparent_60%)]" />
        <div className="container-x relative flex flex-col items-center gap-3 py-14 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">先免费试一次,数据决定下一步</h3>
          <p className="max-w-2xl text-sm text-ink-muted">
            工具包永久免费,本地执行不上传数据。专家解读一次 50 元,作为决策放大镜。
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
            >
              留邮箱下载工具包
            </Link>
            <Link
              to="/solutions/single-node"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong bg-bg-surface px-6 text-sm font-medium text-ink hover:border-accent-violet/60 hover:bg-bg-elevated"
            >
              查看付费单机批量
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
