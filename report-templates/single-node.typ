// 单机批量测试报告模板
// 编译: typst compile single-node.typ output.pdf --input data=data/single-node-example.json

#import "_brand.typ": *
#import "_components.typ": *

#let data = json(sys.inputs.at("data", default: "data/single-node-example.json"))

#show: setup-doc(
  title: "单机批量测试报告",
  report-id: data.report.id,
)

// ────────────── 封面 ──────────────
#cover-page(
  title: "单机批量测试报告",
  subtitle: data.report.subtitle,
  report-id: data.report.id,
  customer: data.report.customer,
  date: data.report.date,
  version: data.report.version,
)

// ────────────── 摘要 ──────────────
#section-divider("01", "测试摘要")

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  column-gutter: 12pt,
  stat([送测台数], [#data.summary.total]),
  stat([一次通过], [#data.summary.passed], color: brand.ok),
  stat([警告], [#data.summary.warned], color: brand.warn),
  stat([不达标], [#data.summary.failed], color: brand.err),
)

#v(12pt)

#info-box(
  "总体结论",
  data.summary.verdict,
  kind: if data.summary.failed == 0 { "ok" }
        else if data.summary.failed <= 2 { "warn" } else { "err" }
)

#v(8pt)

== 送测概况

#table(
  columns: (auto, 1fr),
  align: (left, left),
  fill: none,
  stroke: none,
  [GPU 厂商],   [#data.summary.vendor],
  [卡型],       [#data.summary.model],
  [测试周期],    [#data.summary.duration],
  [送测客户],   [#data.report.customer],
  [测试套餐],   [#data.summary.tier],
)

== 测试范围(命中)

本报告聚焦**单机层**三支柱:稳定性 · 性能 · 模型质量。集群级用例不在范围内。

#table(
  columns: (1fr, 2fr),
  [*维度*], [*用例*],
  [稳定性 · 单机], [DCGM Diag · gpu-burn 8h · cuda_memtest · IPMI 整机],
  [性能 · 单机], [nvbandwidth · NCCL P2P · 单机算力 vs 标称],
  [模型质量 · 单机], [if 进阶套餐: MMLU / GSM8K 抽测],
)

#pagebreak()

// ────────────── 单机汇总 ──────────────
#section-divider("02", "送测机器汇总")

#text(10pt, fill: brand.text-muted)[
  下表列出本批次全部 #data.summary.total 台送测机器的三支柱状态。
  详细 telemetry 见原始数据包(对应 SN)。
]

#v(6pt)
#machine-summary(data.machines)

#pagebreak()

// ────────────── 异常清单 ──────────────
#section-divider("03", "异常清单与处置建议")

#if data.findings.len() == 0 [
  #info-box("无异常", "本批次全部机器三支柱测试通过,可直接发往客户 / 入库。", kind: "ok")
] else [
  #text(10pt, fill: brand.text-muted)[
    本批次发现 #data.findings.len() 项需关注的异常。已按风险优先级排序,附定位证据与处置建议。
  ]
  #v(8pt)
  #finding-list(data.findings)
]

#pagebreak()

// ────────────── 三支柱详细结论 ──────────────
#section-divider("04", "三支柱详细结论")

== 稳定性

测试项:#raw("DCGM Diag (Level 3) + gpu-burn 8h + cuda_memtest 全 HBM + IPMI 整机风冷压测")

#table(
  columns: (2fr, 1fr, 1fr),
  align: (left, center, right),
  [*检测项*], [*状态*], [*异常台数*],
  [HBM ECC 计数], badge(data.stability.ecc.status), [#data.stability.ecc.affected],
  [温度 / 降频],    badge(data.stability.thermal.status), [#data.stability.thermal.affected],
  [PSU / 风扇],     badge(data.stability.psu.status), [#data.stability.psu.affected],
  [整机 XID 事件], badge(data.stability.xid.status), [#data.stability.xid.affected],
)

== 性能

测试项:#raw("nvbandwidth (PCIe / NVLink) + 单机 NCCL P2P + FP16/BF16 算力对账")

#table(
  columns: (2fr, 1fr, 1fr, 1fr),
  align: (left, right, right, center),
  [*指标*], [*标称*], [*实测中位数*], [*状态*],
  [FP16 算力 (TFLOPS)],
    [#data.performance.fp16.nominal],
    [#data.performance.fp16.median],
    badge(data.performance.fp16.status),
  [HBM 带宽 (GB/s)],
    [#data.performance.hbm.nominal],
    [#data.performance.hbm.median],
    badge(data.performance.hbm.status),
  [NVLink 对称性偏差],
    [< 5%],
    [#data.performance.nvlink.deviation],
    badge(data.performance.nvlink.status),
  [PCIe Gen5 实测],
    [≥ 50 GB/s],
    [#data.performance.pcie.median],
    badge(data.performance.pcie.status),
)

== 模型质量(进阶套餐)

#if data.at("quality", default: none) == none [
  #info-box("未启用", "本批次仅含基础套餐,模型质量评测未执行。如需,联系销售升级进阶套餐。", kind: "info")
] else [
  测试项:#raw("MMLU / GSM8K 抽测,与同批次中位数对照")
  #v(4pt)
  #benchmarks-table(data.quality.benchmarks)
]

#pagebreak()

// ────────────── 附录 ──────────────
#section-divider("A", "附录 · 工具与版本")

#tools-appendix(data.tools)

#v(12pt)

== 原始数据索引

每台机器的 raw telemetry 与日志按 SN 归档,对应 SHA256 见数据包内 `MANIFEST.sha256`。
客户可执行 `sha256sum -c MANIFEST.sha256` 独立复核。

== 联系方式

#text(10pt)[
  *北京品晰科技有限公司*
  #v(2pt)
  邮箱: sales\@gputest.cn ·
  电话: 工作日 9:30–18:30 ·
  网站: gputest.cn

  本报告由 GPUTest · 核芯 自动化流水线生成,可签字版另附扫描件。
]
