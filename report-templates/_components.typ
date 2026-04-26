// 复合组件:KPI 对账表 / 隐患清单 / 签字页 / diff 雷达 等

#import "_brand.typ": *

// KPI 对账表(验收 / 网络 / 存储用)
#let kpi-table(items) = {
  table(
    columns: (3fr, 2fr, 2fr, 1fr),
    align: (left, left, left, center),
    [*KPI*], [*合同要求*], [*实测值*], [*状态*],
    ..items.map(it => (
      [#it.kpi],
      [#it.required],
      [#text(weight: 600)[#it.measured]],
      badge(it.status, label: it.at("statusLabel", default: none)),
    )).flatten()
  )
}

// 隐患清单(健康审计 / 验收用)
#let finding-list(findings) = {
  table(
    columns: (auto, auto, 2fr, 3fr),
    align: (center, left, left, left),
    [*优先级*], [*资产*], [*问题*], [*建议处置*],
    ..findings.map(f => (
      priority-badge(f.priority),
      [#raw(f.asset)],
      [#f.issue],
      [#f.action],
    )).flatten()
  )
}

// 单机汇总表(单机批量批量出报告用)
#let machine-summary(machines) = {
  table(
    columns: (auto, auto, auto, auto, auto, auto, auto, 2fr),
    align: (center, left, left, center, center, center, center, left),
    [*序号*], [*SN*], [*卡型*], [*卡数*], [*稳定*], [*性能*], [*质量*], [*备注*],
    ..machines.enumerate().map(((i, m)) => (
      [#(i + 1)],
      [#raw(m.sn)],
      [#m.model],
      [#m.cards],
      badge(m.stability),
      badge(m.performance),
      badge(m.at("quality", default: "pass")),
      [#m.at("notes", default: "—")],
    )).flatten()
  )
}

// 签字页
#let signoff-page(
  customer: "",
  customer-rep: "甲方代表",
  vendor: "北京品晰科技有限公司",
  vendor-rep: "测试负责人",
  report-id: "",
  date: "",
) = {
  pagebreak()
  v(50pt)
  align(center, text(22pt, weight: 700, fill: brand.ink)[验收签字页])
  v(20pt)
  align(center, text(11pt, fill: brand.text-muted)[
    报告编号: #report-id
  ])
  v(60pt)
  text(11pt)[
    本人确认已收到由 北京品晰科技有限公司 出具的上述测试报告,并对报告中
    列示的测试方法、KPI 对账结果、不达标项及整改建议予以审阅。
    报告原文与原始 telemetry 数据按 NDA 约定保密。
  ]
  v(60pt)
  grid(
    columns: (1fr, 1fr),
    column-gutter: 30pt,
    [
      *甲方 #customer*
      #v(8pt)
      代表: #customer-rep
      #v(40pt)
      签字: #h(2cm) #box(width: 5cm, stroke: (bottom: 0.5pt))[]
      #v(20pt)
      日期: #h(2cm) #box(width: 5cm, stroke: (bottom: 0.5pt))[]
    ],
    [
      *乙方 #vendor*
      #v(8pt)
      代表: #vendor-rep
      #v(40pt)
      签字: #h(2cm) #box(width: 5cm, stroke: (bottom: 0.5pt))[]
      #v(20pt)
      日期: #h(2cm) #box(width: 5cm, stroke: (bottom: 0.5pt))[]
    ],
  )
}

// 量化退化瀑布图(用 rect 简化版,V2 用 cetz 提升)
#let quant-waterfall(precisions) = {
  let max-score = calc.max(..precisions.map(p => float(p.score)))
  block[
    #for p in precisions [
      #grid(
        columns: (60pt, 1fr, 60pt),
        column-gutter: 8pt,
        align: (left, left, left),
        [#text(10pt, weight: 600)[#p.name]],
        [
          #stack(dir: ltr, spacing: 0pt,
            rect(
              width: (float(p.score) / max-score) * 100%,
              height: 14pt,
              fill: if p.delta < 1 { brand.ok }
                else if p.delta < 3 { brand.warn }
                else { brand.err },
              stroke: none,
              radius: 2pt,
            ),
          )
        ],
        [#text(10pt)[#p.score #if p.delta != 0 [#text(8pt, fill: brand.text-dim)[ Δ#p.delta]]]],
      )
      #v(4pt)
    ]
  ]
}

// 简易分类雷达占位(基于 6 维表格)
#let benchmarks-table(items) = {
  table(
    columns: (2fr, 1fr, 1fr, 1fr),
    align: (left, right, right, right),
    [*测试项*], [*参考*], [*目标*], [*Δ*],
    ..items.map(b => (
      [#b.name],
      [#raw(str(b.reference))],
      [#text(weight: 600)[#raw(str(b.target))]],
      [
        #let d = float(b.target) - float(b.reference)
        #let c = if d >= -0.5 { brand.ok } else if d >= -1.5 { brand.warn } else { brand.err }
        #text(fill: c)[#if d >= 0 [+] #d]
      ],
    )).flatten()
  )
}

// 长上下文热力(NIAH 4-32k)— 简易格子展示
#let niah-heatmap(rows) = {
  table(
    columns: (auto,) * (rows.first().len() + 1),
    align: center,
    inset: 4pt,
    [*Depth↓ / Length→*], ..rows.first().keys().filter(k => k != "depth").map(k => [*#k*]),
    ..rows.map(r => (
      [#r.depth],
      ..r.cells.map(c => {
        let v = float(c)
        let color = if v >= 0.95 { brand.ok }
          else if v >= 0.85 { brand.warn }
          else { brand.err }
        rect(
          fill: color.lighten(60%),
          stroke: 0.5pt + color,
          inset: 4pt,
          width: 100%,
          radius: 1pt,
        )[#text(8pt, fill: color)[#v]]
      })
    )).flatten()
  )
}
