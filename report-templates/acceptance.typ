// AIDC 项目验收综合测试报告模板
// 编译: typst compile acceptance.typ output.pdf --input data=data/acceptance-example.json

#import "_brand.typ": *
#import "_components.typ": *

#let data = json(sys.inputs.at("data", default: "data/acceptance-example.json"))

#show: setup-doc(
  title: "AIDC 项目验收综合测试报告",
  report-id: data.report.id,
)

// ────────────── 封面 ──────────────
#cover-page(
  title: "AIDC 项目验收综合测试报告",
  subtitle: data.report.subtitle,
  report-id: data.report.id,
  customer: data.report.customer,
  date: data.report.date,
  version: data.report.version,
)

// ────────────── 摘要 ──────────────
#section-divider("01", "执行摘要")

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  column-gutter: 12pt,
  stat([合同 KPI 项], [#data.summary.totalKpi]),
  stat([一次达标], [#data.summary.passed], color: brand.ok),
  stat([整改后达标], [#data.summary.remediated], color: brand.steel),
  stat([未达标], [#data.summary.failed], color: brand.err),
)

#v(14pt)

#info-box(
  "整体结论",
  data.summary.verdict,
  kind: if data.summary.failed == 0 { "ok" } else { "warn" }
)

#v(10pt)

== 项目概况

#table(
  columns: (auto, 1fr),
  fill: none, stroke: none,
  [项目名称], [#data.scope.projectName],
  [集群规模], [#data.scope.cards 张 GPU · #data.scope.nodes 节点],
  [GPU 卡型], [#data.scope.vendor #data.scope.model],
  [网络类型], [#data.scope.network],
  [测试周期], [#data.scope.duration],
)

== 测试范围(三支柱 × 两层级)

本次验收按合同 SOW 执行**全部 6 格**测试用例。

#table(
  columns: (auto, 1fr, 1fr),
  [], [*单机*], [*集群*],
  [稳定性], [DCGM Diag · gpu-burn · cuda_memtest], [168h 真实负载 soak · 故障注入],
  [性能], [算力 vs 标称 · HBM/PCIe/NVLink], [NCCL 多机扩展 · e2e 时延],
  [模型质量], [单卡推理精度 · 量化], [多机训练收敛 · 长上下文],
)

#pagebreak()

// ────────────── KPI 对账 ──────────────
#section-divider("02", "合同 KPI 逐项对账")

#text(10pt, fill: brand.text-muted)[
  下表为合同 KPI 与实测值的逐项对照。状态分为「通过 / 整改后达标 / 未达标」三档。
  未达标项详细分析见 §05。
]

#v(8pt)
#kpi-table(data.kpi)

#pagebreak()

// ────────────── 稳定性 ──────────────
#section-divider("03", "稳定性 · 单机与集群")

== 单机硬件健康

测试项:DCGM Diag Level 3 · gpu-burn 8h · cuda_memtest 全 HBM · IPMI 整机风冷

#table(
  columns: (2fr, 1fr, 2fr),
  [*检测维度*], [*状态*], [*实测摘要*],
  [HBM ECC],     badge(data.stability.single.ecc.status), [#data.stability.single.ecc.summary],
  [温度 / 降频], badge(data.stability.single.thermal.status), [#data.stability.single.thermal.summary],
  [PSU / 风扇],  badge(data.stability.single.psu.status), [#data.stability.single.psu.summary],
)

== 集群级 168h soak

执行 #data.stability.cluster.workload,持续 #data.stability.cluster.duration。

#table(
  columns: (2fr, 1fr, 2fr),
  [*指标*], [*状态*], [*实测*],
  [训练任务 NaN 中断], badge(data.stability.cluster.nan.status), [#data.stability.cluster.nan.summary],
  [XID 事件总数],   badge(data.stability.cluster.xid.status), [#data.stability.cluster.xid.summary],
  [链路抖动 / Flap], badge(data.stability.cluster.flap.status), [#data.stability.cluster.flap.summary],
)

#pagebreak()

// ────────────── 性能 ──────────────
#section-divider("04", "性能 · 单机与集群")

== 单机性能

#table(
  columns: (2fr, 1fr, 1fr, 1fr),
  align: (left, right, right, center),
  [*指标*], [*标称*], [*实测中位*], [*状态*],
  [FP16 算力 (TFLOPS)],
    [#data.performance.single.fp16.nominal],
    [#data.performance.single.fp16.measured],
    badge(data.performance.single.fp16.status),
  [HBM 带宽 (GB/s)],
    [#data.performance.single.hbm.nominal],
    [#data.performance.single.hbm.measured],
    badge(data.performance.single.hbm.status),
)

== 集群性能 · NCCL 多机扩展

#table(
  columns: (1fr, 1fr, 1fr, 1fr, 1fr),
  align: (center,) * 5,
  [*节点数*], [*8*], [*16*], [*32*], [*N*],
  [扩展效率],
    [#data.performance.cluster.scaling.n8],
    [#data.performance.cluster.scaling.n16],
    [#data.performance.cluster.scaling.n32],
    [#data.performance.cluster.scaling.full],
)

#info-box(
  "训练吞吐",
  "Llama2-70B 千卡训练 step 时间 " + str(data.performance.cluster.trainStep) + " ms,达标。",
  kind: "ok"
)

#pagebreak()

// ────────────── 不达标项 ──────────────
#section-divider("05", "不达标项与整改")

#if data.findings.len() == 0 [
  #info-box("无不达标项", "本次验收全部 KPI 一次通过,无需整改。", kind: "ok")
] else [
  #text(10pt, fill: brand.text-muted)[
    本次验收识别 #data.findings.len() 项不达标 / 待关注项,按风险优先级列出,附定位证据与建议处置路径。
  ]
  #v(8pt)
  #finding-list(data.findings)
]

#pagebreak()

// ────────────── 工具与版本 ──────────────
#section-divider("A", "附录 · 工具与版本")

#tools-appendix(data.tools)

#v(12pt)

== 原始数据索引

#text(10pt)[
  全部 telemetry / NCCL 跑分 / DCGM 日志按节点归档于交付数据包中,SHA256 见 `MANIFEST.sha256`。
  客户可在合同 NDA 期限内执行独立复核。
]

== 复测条款

#text(10pt)[
  乙方完成整改后,我方依据本 SOW 对整改项执行复测,出具复测确认函,作为最终签收依据。
  复测费用按合同附件 B 第 4 条计。
]

// ────────────── 签字页 ──────────────
#signoff-page(
  customer: data.report.customer,
  customer-rep: data.signoff.customerRep,
  vendor-rep: data.signoff.vendorRep,
  report-id: data.report.id,
  date: data.report.date,
)
