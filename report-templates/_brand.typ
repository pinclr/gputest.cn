// 品牌样式与共享设置(所有报告模板均 import 此文件)

#let brand = (
  ink: rgb("#0B2545"),
  steel: rgb("#1E6091"),
  amber: rgb("#E5A100"),
  violet: rgb("#6D28D9"),
  mist: rgb("#8DA9C4"),
  paper: rgb("#F4F7FB"),
  text: rgb("#1A2233"),
  text-muted: rgb("#4F5B72"),
  text-dim: rgb("#7A8499"),
  border: rgb("#E5E8EE"),
  ok: rgb("#10b981"),
  warn: rgb("#F59E0B"),
  err: rgb("#EF4444"),
)

// 与站点同源字体(SIL OFL,商用免费)
// 在 compile 时通过 --font-path ./fonts/ 加载,详见 download-fonts.sh
#let main-font = ("JetBrains Mono", "Noto Sans SC", "Noto Sans CJK SC", "PingFang SC")
#let mono-font = ("JetBrains Mono", "Menlo", "monospace")

// 全局页面 + 字体设置
#let setup-doc(title: "GPUTest 报告", report-id: "") = body => {
  set document(title: title, author: "北京品晰科技有限公司")
  set page(
    paper: "a4",
    margin: (top: 22mm, bottom: 22mm, left: 18mm, right: 18mm),
    header: context {
      if counter(page).get().first() > 1 {
        grid(
          columns: (1fr, auto),
          align(left, text(8pt, fill: brand.text-dim)[
            #title #if report-id != "" [· #report-id]
          ]),
          align(right, text(8pt, fill: brand.text-dim)[
            GPUTest · 核芯
          ])
        )
        v(-6pt)
        line(length: 100%, stroke: 0.5pt + brand.border)
      }
    },
    footer: context {
      grid(
        columns: (1fr, auto, 1fr),
        align(left, text(8pt, fill: brand.text-dim)[
          北京品晰科技有限公司 · 内部资料
        ]),
        align(center, text(8pt, fill: brand.text-dim)[
          #counter(page).display() / #counter(page).final().first()
        ]),
        align(right, text(8pt, fill: brand.text-dim)[
          gputest.cn
        ])
      )
    },
  )
  set text(
    font: main-font,
    size: 10.5pt,
    lang: "zh",
    region: "cn",
    fill: brand.text,
  )
  set par(justify: true, leading: 0.85em, first-line-indent: 0pt)

  // 标题层级
  show heading.where(level: 1): it => block[
    #set text(20pt, weight: 700, fill: brand.ink)
    #v(10pt)
    #it.body
    #v(6pt)
  ]
  show heading.where(level: 2): it => block[
    #set text(15pt, weight: 600, fill: brand.ink)
    #v(14pt)
    #block(
      below: 6pt,
      stroke: (bottom: 1.5pt + brand.amber),
      inset: (bottom: 4pt),
    )[#it.body]
  ]
  show heading.where(level: 3): it => block[
    #set text(13pt, weight: 600, fill: brand.ink)
    #v(8pt)
    #block(
      stroke: (left: 3pt + brand.amber),
      inset: (left: 8pt, top: 1pt, bottom: 1pt),
    )[#it.body]
    #v(2pt)
  ]
  show heading.where(level: 4): it => block[
    #set text(11.5pt, weight: 600, fill: brand.text)
    #v(6pt)
    #it.body
    #v(2pt)
  ]

  show link: it => text(fill: brand.steel, underline(it))
  show emph: it => text(fill: brand.text-muted, it)

  // 等宽
  show raw: it => text(font: mono-font, size: 9.5pt, fill: brand.steel, it)
  show raw.where(block: true): it => block(
    fill: brand.paper,
    stroke: (left: 2pt + brand.steel),
    inset: 8pt,
    radius: 2pt,
    width: 100%,
    text(font: mono-font, size: 9pt, fill: brand.text)[#it.text]
  )

  // 表格默认样式
  set table(
    stroke: 0.5pt + brand.border,
    inset: 6pt,
    fill: (col, row) => if row == 0 { brand.paper } else { white },
  )

  body
}

// 状态徽章
#let badge(status, label: none) = {
  let (color, default-label) = if status == "pass" { (brand.ok, "通过") }
    else if status == "warn" { (brand.warn, "警告") }
    else if status == "fail" { (brand.err, "未达标") }
    else if status == "remediated" { (brand.steel, "整改后达标") }
    else { (brand.text-dim, "未知") }
  box(
    fill: color.lighten(85%),
    stroke: 0.5pt + color,
    inset: (x: 5pt, y: 2pt),
    radius: 3pt,
    text(8pt, weight: 600, fill: color)[#if label != none { label } else { default-label }]
  )
}

// 优先级徽章(健康审计用)
#let priority-badge(level) = {
  let (color, label) = if level == "red" { (brand.err, "🔴 红") }
    else if level == "yellow" { (brand.warn, "🟡 黄") }
    else if level == "green" { (brand.ok, "🟢 绿") }
    else { (brand.text-dim, level) }
  box(
    fill: color.lighten(85%),
    stroke: 0.5pt + color,
    inset: (x: 5pt, y: 2pt),
    radius: 3pt,
    text(8pt, weight: 600, fill: color)[#label]
  )
}

// 统计大数字(摘要页用)
#let stat(label, value, sub: none, color: none) = {
  let c = if color != none { color } else { brand.ink }
  block(width: 100%)[
    #text(9pt, fill: brand.text-dim)[#label]
    #v(2pt)
    #text(28pt, weight: 700, fill: c)[#value]
    #if sub != none [
      #v(-4pt)
      #text(9pt, fill: brand.text-muted)[#sub]
    ]
  ]
}

// 评分条(0-100)
#let score-bar(score, max: 100, color: none) = {
  let pct = float(score) / float(max)
  let c = if color != none { color }
    else if pct >= 0.9 { brand.ok }
    else if pct >= 0.7 { brand.steel }
    else if pct >= 0.5 { brand.warn }
    else { brand.err }
  block(width: 100%)[
    #stack(
      dir: ltr,
      spacing: 0pt,
      rect(width: pct * 100%, height: 8pt, fill: c, stroke: none, radius: (left: 2pt)),
      rect(width: (1 - pct) * 100%, height: 8pt, fill: brand.border, stroke: none, radius: (right: 2pt)),
    )
    #v(2pt)
    #text(8pt, fill: brand.text-dim)[#score / #max]
  ]
}

// 提示信息盒
#let info-box(title, body, kind: "info") = {
  let (color, icon) = if kind == "info" { (brand.steel, "ℹ") }
    else if kind == "warn" { (brand.warn, "⚠") }
    else if kind == "err" { (brand.err, "✖") }
    else if kind == "ok" { (brand.ok, "✓") }
    else { (brand.text-muted, "·") }
  block(
    fill: color.lighten(90%),
    stroke: (left: 3pt + color),
    inset: (x: 12pt, y: 8pt),
    width: 100%,
    radius: 2pt,
  )[
    #text(10pt, weight: 600, fill: color)[#icon  #title]
    #v(2pt)
    #text(9.5pt, fill: brand.text-muted)[#body]
  ]
}

// 封面
#let cover-page(
  title: "",
  subtitle: "",
  report-id: "",
  customer: "",
  date: "",
  version: "v1.0",
  classification: "内部资料 · 限受文方使用",
) = {
  v(40pt)
  // 品牌区
  block[
    #box(
      fill: brand.ink,
      inset: (x: 14pt, y: 10pt),
      radius: 4pt,
      baseline: 0pt,
    )[
      #stack(dir: ltr, spacing: 8pt,
        text(20pt, weight: 700, fill: brand.amber)[GPUTest],
        v(0pt),
        text(13pt, weight: 400, fill: rgb("#E0E6F0"))[· 核芯]
      )
    ]
  ]
  v(50pt)
  text(28pt, weight: 700, fill: brand.ink)[#title]
  if subtitle != "" {
    v(8pt)
    text(13pt, fill: brand.text-muted)[#subtitle]
  }
  v(50pt)
  // 元数据
  table(
    columns: (auto, 1fr),
    inset: (x: 0pt, y: 6pt),
    stroke: none,
    fill: none,
    align: (left, left),
    [#text(9pt, fill: brand.text-dim, weight: 600)[报告编号]],
    [#text(11pt)[#report-id]],
    [#text(9pt, fill: brand.text-dim, weight: 600)[交付客户]],
    [#text(11pt)[#customer]],
    [#text(9pt, fill: brand.text-dim, weight: 600)[报告日期]],
    [#text(11pt)[#date]],
    [#text(9pt, fill: brand.text-dim, weight: 600)[版本]],
    [#text(11pt)[#version]],
    [#text(9pt, fill: brand.text-dim, weight: 600)[出具方]],
    [#text(11pt)[北京品晰科技有限公司]],
  )
  v(1fr)
  // 保密说明
  rect(
    fill: brand.amber.lighten(85%),
    stroke: 0.5pt + brand.amber,
    inset: 12pt,
    radius: 3pt,
    width: 100%,
  )[
    #text(9pt, weight: 700, fill: brand.amber.darken(30%))[保密说明]
    #v(3pt)
    #text(9pt, fill: brand.text-muted)[
      #classification。本报告含客户机密信息,未经书面授权不得复制 / 转发 / 公开。原始 telemetry 数据按 NDA 条款约定 30 日内销毁,仅保留指标摘要供合规备查。
    ]
  ]
  v(8pt)
  text(8pt, fill: brand.text-dim)[
    GPUTest · 核芯 · 北京品晰科技有限公司 · gputest.cn · sales\@gputest.cn
  ]
  pagebreak()
}

// 章节锚(给大节加视觉区隔)
#let section-divider(num, title) = block[
  #v(8pt)
  #grid(
    columns: (auto, 1fr),
    column-gutter: 12pt,
    rect(
      fill: brand.amber,
      stroke: none,
      inset: (x: 8pt, y: 4pt),
      radius: 2pt,
    )[#text(11pt, weight: 700, fill: white)[#num]],
    text(18pt, weight: 700, fill: brand.ink)[#title],
  )
  #v(6pt)
]

// 工具与版本附录(共享)
#let tools-appendix(tools) = {
  text(9.5pt)[
    本报告中使用的工具与版本如下,客户可独立复核。所有原始执行日志保存在交付的 telemetry 数据包中,SHA256 校验值见末尾。
  ]
  v(6pt)
  table(
    columns: (2fr, 1fr, 1fr, 2fr),
    [*工具*], [*版本*], [*来源*], [*用途*],
    ..tools.map(t => (
      [#t.name],
      [#raw(t.version)],
      [#t.source],
      [#t.purpose],
    )).flatten()
  )
}
