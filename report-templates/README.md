# 报告模板(Typst 四件套)

GPUTest 核芯交付报告自动化:数据 JSON → Typst 模板 → 可签字 PDF。

## 模板矩阵

| 模板 | 适用产品 | 页数(典型) | 特色 |
|---|---|---|---|
| `single-node.typ` | 单机批量测试(¥1,200 起 / 台) | 8–12 | 流水线工程化,N 台批量出 |
| `acceptance.typ` | AIDC 项目验收 | 30–60 | 合同 KPI 对账表 + 签字页 |
| `health-audit.typ` | 集群健康审计 | 20–40 | 健康度 0–100 + 趋势对比 |
| `model-quality.typ` | 模型质量评测 | 18–30 | benchmark 对比 + diff + NIAH 热力 |

## 共享文件

- `_brand.typ` — 颜色 / 字体 / 标题 / 徽章 / 封面
- `_components.typ` — KPI 表 / 隐患清单 / 单机汇总 / 签字页 / 量化瀑布 / NIAH 热力

## 编译

```bash
# 安装 typst(如未装)
brew install typst

# 编译单份
typst compile single-node.typ out.pdf \
  --input data=data/single-node-example.json

# 一键编译四份示例
./compile.sh
```

## 数据模式

每个模板读取一份 JSON。`sys.inputs.data` 控制路径:

```typst
#let data = json(sys.inputs.at("data", default: "data/single-node-example.json"))
```

四份示例数据见 `data/`。生产中由 `acceptance-toolkit` 直接输出 schema 一致的 JSON。

## 中文字体

模板默认 fallback 顺序:

```
Source Han Sans CN  →  Noto Sans CJK SC  →  PingFang SC  →  Microsoft YaHei  →  Inter
```

macOS / Windows 自带 PingFang / 微软雅黑,Typst 能直接渲染。Linux CI 需 `apt install fonts-noto-cjk`。

## 集成到 admin / 自动化流水线

- `single-node` 模板由 `batch-pipeline/reporter` 读 JSON 自动编译,< 30 秒 / 份
- 其他三份目前由测试工程师按交付节奏手动跑 `compile.sh`
- V2 计划:接入 `/admin/reports`,后台一键预览 + 下发客户

## 升级方向

- V2:用 cetz / plot 替换简化雷达 / NIAH 占位图(更贴近论文级可视化)
- V2:报告封面接入客户 logo(经客户书面授权)
- V3:基于历史交付,自动生成行业基线对比段
