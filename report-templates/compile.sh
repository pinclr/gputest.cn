#!/usr/bin/env bash
# 一次性编译四份示例报告 PDF(用 ./fonts/ 内的同源字体)
set -euo pipefail

cd "$(dirname "$0")"
mkdir -p out

# 字体未就位则先拉取
if [ ! -f "fonts/NotoSansSC-Regular.otf" ] || [ ! -f "fonts/JetBrainsMono-Regular.ttf" ]; then
  echo "→ 字体未就位,先拉取(只需一次)…"
  bash download-fonts.sh
fi

for tpl in single-node acceptance health-audit model-quality; do
  echo "→ ${tpl}"
  typst compile "${tpl}.typ" "out/${tpl}-example.pdf" \
    --font-path ./fonts \
    --input "data=data/${tpl}-example.json"
done

echo
echo "✅ 输出在 ./out/"
ls -la out/
