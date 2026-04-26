// 模型质量评测报告模板
// 编译: typst compile model-quality.typ output.pdf --input data=data/model-quality-example.json

#import "_brand.typ": *
#import "_components.typ": *

#let data = json(sys.inputs.at("data", default: "data/model-quality-example.json"))

#show: setup-doc(
  title: "模型质量评测报告",
  report-id: data.report.id,
)

#cover-page(
  title: "模型质量评测报告",
  subtitle: data.report.subtitle,
  report-id: data.report.id,
  customer: data.report.customer,
  date: data.report.date,
  version: data.report.version,
)

// ────────────── 摘要 ──────────────
#section-divider("01", "评测摘要")

== 评测对象

#table(
  columns: (auto, 1fr),
  fill: none, stroke: none,
  [模型], [#data.model],
  [参考硬件], [#data.reference],
  [目标硬件], [#data.target],
  [量化精度], [#data.precisionVariants.join(" · ")],
)

#v(8pt)
#info-box(
  "整体结论",
  data.summary.verdict,
  kind: if data.summary.passed { "ok" } else { "warn" }
)

#v(8pt)

== 关键指标

#grid(
  columns: (1fr, 1fr, 1fr),
  column-gutter: 12pt,
  stat([语义余弦相似度], [#data.diff.cosine], color: brand.ok),
  stat([BLEU], [#data.diff.bleu]),
  stat([NIAH 通过率], [#data.longContext.niah_pass]),
)

#pagebreak()

// ────────────── 标准 benchmark ──────────────
#section-divider("02", "标准 benchmark 对比")

#text(10pt, fill: brand.text-muted)[
  下表为目标硬件与参考硬件在公开标准 benchmark 上的分数对比。Δ 列为目标 − 参考。
  绿色表示 Δ ≥ −0.5(可视为同档),黄色表示退化在 0.5–1.5 之间,红色表示退化超过 1.5。
]

#v(8pt)
#benchmarks-table(data.benchmarks)

#pagebreak()

// ────────────── 量化精度退化 ──────────────
#section-divider("03", "量化精度退化")

== MMLU 分数随精度变化

#text(10pt, fill: brand.text-muted)[
  从 FP16 → FP8 → INT8 → INT4 各档对照 MMLU 实测分数与退化幅度。
]

#v(8pt)
#quant-waterfall(data.quantization)

#v(12pt)

#info-box(
  "量化推荐",
  data.quantization-summary,
  kind: "info"
)

#pagebreak()

// ────────────── diff 分析 ──────────────
#section-divider("04", "推理输出 diff 分析")

== 测试方法

测试集合:#data.diff.promptCount 条 prompt(来源:#data.diff.source)
对比方式:目标硬件输出 vs 参考硬件 FP32 输出

== 关键数据

#table(
  columns: (2fr, 1fr, 1fr),
  align: (left, right, right),
  [*指标*], [*实测*], [*基准*],
  [语义余弦相似度], [#data.diff.cosine], [≥ 0.99],
  [BLEU], [#data.diff.bleu], [≥ 90],
  [Logits L2 距离 (中位)], [#data.diff.l2], [-],
  [输出长度偏离], [#data.diff.lengthDeviation], [< 5%],
)

#v(8pt)

#info-box(
  "diff 结论",
  data.diff.verdict,
  kind: if float(data.diff.cosine) >= 0.99 { "ok" } else { "warn" }
)

#pagebreak()

// ────────────── 长上下文 ──────────────
#section-divider("05", "长上下文质量 · NIAH")

#text(10pt, fill: brand.text-muted)[
  Needle-In-A-Haystack(NIAH)测试:在不同上下文长度(横轴)与不同插入深度(纵轴)下,
  模型回忆 needle 的成功率。绿色 ≥ 0.95,黄色介于 0.85 至 0.95,红色低于 0.85。
]

#v(8pt)
#niah-heatmap(data.longContext.heatmap)

#v(8pt)

#info-box(
  "长上下文结论",
  data.longContext.verdict,
  kind: "info"
)

#pagebreak()

// ────────────── 结论与建议 ──────────────
#section-divider("06", "结论与迁移建议")

== 通过条件

#for c in data.conclusions.passed [
  · #c
  #v(2pt)
]

== 待优化项

#if data.conclusions.improvements.len() == 0 [
  无显著待优化项。
] else [
  #for i in data.conclusions.improvements [
    · #i
    #v(2pt)
  ]
]

== 迁移建议

#info-box(
  "迁移评估",
  data.conclusions.migration,
  kind: "info"
)

#pagebreak()

// ────────────── 附录 ──────────────
#section-divider("A", "附录 · 工具与版本")

#tools-appendix(data.tools)

#v(12pt)

== 复核说明

#text(10pt)[
  全部 prompt / 输出 / logits / 指标计算均保留在交付数据包中。
  客户可使用我方提供的 evaluation 脚本在自有环境复跑,结果应在 ±0.5 之内。
]

#text(10pt)[
  *北京品晰科技有限公司* · sales\@gputest.cn · gputest.cn
]
