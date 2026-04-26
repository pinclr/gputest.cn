// 集群健康审计报告模板
// 编译: typst compile health-audit.typ output.pdf --input data=data/health-audit-example.json

#import "_brand.typ": *
#import "_components.typ": *

#let data = json(sys.inputs.at("data", default: "data/health-audit-example.json"))

#show: setup-doc(
  title: "集群健康审计报告",
  report-id: data.report.id,
)

#cover-page(
  title: "集群健康审计报告",
  subtitle: data.report.subtitle,
  report-id: data.report.id,
  customer: data.report.customer,
  date: data.report.date,
  version: data.report.version,
)

// ────────────── 摘要 + 健康度评分 ──────────────
#section-divider("01", "健康度评分")

#grid(
  columns: (1fr, 2fr),
  column-gutter: 24pt,
  // 左:百分制总分
  {
    let score-color = if data.score >= 90 { brand.ok }
      else if data.score >= 70 { brand.steel }
      else if data.score >= 50 { brand.warn }
      else { brand.err }
    block[
      #text(10pt, fill: brand.text-dim, weight: 600)[本次健康度]
      #v(8pt)
      #text(72pt, weight: 700, fill: score-color)[#data.score]
      #h(4pt)
      #text(20pt, fill: brand.text-dim)[#sym.slash 100]
      #v(4pt)
      #if data.at("previous", default: none) != none {
        let delta = data.score - data.previous
        let trend-color = if delta >= 0 { brand.ok } else { brand.err }
        let prefix = if delta >= 0 { "+" } else { "" }
        text(10pt, fill: trend-color)[
          较上次 (#data.previous): #prefix#delta
        ]
      }
    ]
  },
  // 右:分维度评分
  block[
    #text(10pt, fill: brand.text-dim, weight: 600)[分维度评分]
    #v(8pt)
    #for cat in data.categories [
      #grid(
        columns: (auto, 1fr, auto),
        column-gutter: 8pt,
        align: (left, left, right),
        text(10pt)[#cat.name],
        score-bar(cat.score),
        text(10pt, weight: 600)[#cat.score],
      )
      #v(4pt)
    ]
  ]
)

#v(14pt)

#info-box(
  "审计结论",
  data.summary.verdict,
  kind: if data.score >= 90 { "ok" }
    else if data.score >= 70 { "info" }
    else if data.score >= 50 { "warn" }
    else { "err" }
)

== 集群概况

#table(
  columns: (auto, 1fr),
  fill: none, stroke: none,
  [集群规模],   [#data.scope.cards 张 GPU · #data.scope.nodes 节点 · 已运行 #data.scope.runtime],
  [GPU 卡型],   [#data.scope.vendor #data.scope.model],
  [审计套餐],   [#data.scope.tier],
  [审计周期],   [#data.scope.duration],
)

#pagebreak()

// ────────────── 隐患清单 ──────────────
#section-divider("02", "隐患清单 · 红 / 黄 / 绿")

#text(10pt, fill: brand.text-muted)[
  按风险优先级三档排序。建议按红 → 黄 → 绿顺序处置;
  绿色项可计入持续监测,无需立即处置。
]

#v(8pt)
#finding-list(data.findings)

#pagebreak()

// ────────────── 趋势对比(订阅版) ──────────────
#if data.at("trends", default: none) != none [
  #section-divider("03", "趋势对比 · 与上次审计")

  #table(
    columns: (2fr, 1fr, 1fr, 1fr, 1fr),
    align: (left, right, right, right, center),
    [*指标*], [*上次*], [*本次*], [*Δ*], [*趋势*],
    ..data.trends.map(t => (
      [#t.metric],
      [#t.previous],
      [#t.current],
      text(fill: if t.direction == "good" { brand.ok } else { brand.err })[#t.delta],
      [#t.symbol],
    )).flatten()
  )
  #pagebreak()
]

// ────────────── 整改建议 ──────────────
#section-divider("04", "整改优先级与处置 SOP")

#text(10pt)[
  下表按"风险 × 实施成本"排序,推荐的执行顺序如下。
  涉及 RMA 流程的项目,我方可代客户与厂家对接;集群侧调整(参数 / 调度)可通过订阅服务跟进。
]

#v(8pt)

#table(
  columns: (auto, 2fr, 2fr, 1fr),
  align: (center, left, left, center),
  [*序号*], [*建议处置*], [*预计影响*], [*成本*],
  ..data.remediation.enumerate().map(((i, r)) => (
    [#(i + 1)],
    [#r.action],
    [#r.impact],
    [#r.cost],
  )).flatten()
)

#pagebreak()

// ────────────── 工具与附录 ──────────────
#section-divider("A", "附录 · 工具与版本")

#tools-appendix(data.tools)

#v(12pt)

== 持续监测建议

#text(10pt)[
  订阅版客户可将本次审计的 raw telemetry 接入持续监测看板(Prometheus + Grafana)。
  下次季度审计时,我方将与本次基线对比,报告趋势变化。
]

#text(10pt)[
  *北京品晰科技有限公司* · sales\@gputest.cn · gputest.cn
]
