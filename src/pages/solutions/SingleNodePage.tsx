import { Truck, RefreshCw, Recycle, Factory } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { MatrixHitMap } from '@/components/matrix/MatrixHitMap';
import { Scenarios } from '@/components/solution/Scenarios';
import { Deliverables } from '@/components/solution/Deliverables';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';
import { SingleNodePricer } from '@/components/solution/SingleNodePricer';

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function SingleNodePage() {
  useDocumentTitle(
    '单机批量测试',
    'GPU 服务器到货验收 / RMA 复测 / 二手交易 / 入库 QA。¥1,200 起 / 台,48h 出报告,量贩制。',
  );
  return (
    <>
      <PageHero
        eyebrow="解决方案 · 单机批量测试"
        title="到货验收 / RMA 复测 / 二手交易,48 小时报告交付"
        desc="按台计费,工程化流水线交付。报告标准化、SLA 化,支持批量出具。¥1,200 起 / 台,10 台量贩 9 折,50 台量贩 8 折。"
        primaryCta={{ label: '立即报价', to: '#pricer' }}
        secondaryCta={{ label: '单机标准报告样张', to: '/resources' }}
        tone="amber"
      >
        <MatrixHitMap
          hit={['stability.single', 'performance.single', 'quality.single']}
          title="本方案命中 3 个单机格"
        />
      </PageHero>

      <SectionWrap
        eyebrow="01 · 适用场景"
        title="高频次、批量化的单机测试需求"
        desc="不替代大型集群级验收,但覆盖经销 / 维修 / 二手 / 出租等场景下每月数十至上百台的稳定送测刚需。"
      >
        <Scenarios
          tone="amber"
          items={[
            {
              icon: Truck,
              title: 'GPU 服务器经销商',
              desc: '持续到货场景下快速出具中立健康度证明,作为产品页素材与交付凭证,降低验收纠纷概率。',
            },
            {
              icon: RefreshCw,
              title: 'RMA 复测',
              desc: '厂家维修返厂之后送测复核,作为资产复用前的质量门槛与流程节点。',
            },
            {
              icon: Recycle,
              title: '二手 GPU 服务器交易',
              desc: '卖方提供中立健康度报告以支撑议价,买方据此完成到货验收,广泛应用于二手交易与企业回收场景。',
            },
            {
              icon: Factory,
              title: '算力出租入库 QA',
              desc: '设备入库阶段完成基线测试,作为对外承诺的设备出厂认证,降低运营期争议。',
            },
          ]}
        />
      </SectionWrap>

      <SectionWrap
        eyebrow="02 · 报价计算器"
        title="实时报价 · 明码标价"
        desc="选取 GPU 类型、套餐与数量,即时计算总价与交付周期。本 SKU 为站内唯一公开标价产品。"
        alt
        id="pricer"
      >
        <SingleNodePricer />
      </SectionWrap>

      <SectionWrap eyebrow="03 · 套餐内容" title="基础与进阶,工具命中清单">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="surface p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-tight">基础套餐</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-amber">
                ¥1,200 起 · 48h
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-muted">
              {[
                'NVIDIA DCGM Diag Level 3',
                'gpu-burn 8h 满载 (温度 / 功耗 / ECC / 降频监控)',
                'cuda_memtest 全 HBM 扫描',
                'nvbandwidth (PCIe / NVLink 对称性)',
                '单机 NCCL P2P / All-Reduce',
                'dcgmi health watch 全程事件捕获',
                'IPMI / Redfish 整机风冷与功耗时间序列',
                '标准 PDF 报告 + 原始 telemetry 数据包',
              ].map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pillar-stability" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface border-accent-amber/40 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-tight">进阶套餐</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-amber">
                ¥2,000–2,800 · 72h
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-muted">基础全部 + 以下:</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-muted">
              {[
                'NVIDIA Field Diag 全套 (含厂商专属诊断)',
                '24h 真实负载 soak (Llama2 / SD 模板任选)',
                '模型质量基线 (MMLU / GSM8K 抽测)',
                '更详尽的报告 (含整改建议章节)',
              ].map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-amber" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-xs text-ink-dim">
          国产卡套餐工具自动切换为对应平台 (Ascend Field Diag / npu-smi / HCCS-Diag 等),报告输出格式统一。
        </p>
      </SectionWrap>

      <SectionWrap eyebrow="04 · 流水线工程化" title="48 小时 SLA 怎么保" alt>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { num: '01', title: '客户提交清单', desc: '机器列表、卡型、套餐、联系人,网页表单或 API' },
            { num: '02', title: '排程 + 上架', desc: '我方测试台并发分配,客户寄送 / 上门取件二选一' },
            { num: '03', title: '自动跑测', desc: 'acceptance-toolkit 自动执行,人工只在异常路径介入' },
            { num: '04', title: '报告自动生成', desc: 'Typst 模板渲染,< 30 秒/份,加密发送至客户邮箱' },
          ].map((s) => (
            <div key={s.num} className="surface p-5">
              <div className="font-mono text-2xl font-bold text-accent-amber">{s.num}</div>
              <h4 className="mt-2 text-base font-semibold">{s.title}</h4>
              <p className="mt-1 text-xs leading-5 text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="05 · 交付物" title="标准化 PDF + 汇总 Excel">
        <Deliverables
          items={[
            {
              title: '单机标准 PDF 报告',
              desc: '每台一份,~10 页,封面 + 三支柱结论 + 关键指标 + 异常事件清单 + 附录',
            },
            {
              title: '汇总 Excel',
              desc: '一次送测的全部机器横评,通过 / 警告 / 失败 三态,直接拉到客户工单系统',
            },
            {
              title: '原始数据包',
              desc: '加密 zip,DCGM telemetry / IPMI / 日志 / 跑分 raw,SHA256 签名',
            },
            {
              title: '失败件诊断建议',
              desc: '失败的机器附定位思路与处置建议 (RMA / 调机 / 部件替换)',
            },
          ]}
        />
      </SectionWrap>

      <SolutionFooter
        title="月度合约客户专属优惠"
        desc="月度送测量 ≥ 100 台可享 7 折定价、专属对接窗口与优先排程。请联系销售评估签约。"
      />
    </>
  );
}
