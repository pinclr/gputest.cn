#!/usr/bin/env bash
# 把站点同款字体复制到 report-templates/fonts/,Typst 编译时通过 --font-path 引用
# 字体源:node_modules/@fontsource/*(SIL OFL 商用免费)

set -euo pipefail

cd "$(dirname "$0")"
mkdir -p fonts

# Noto Sans SC(中文)
NOTO_DIR="../node_modules/@fontsource/noto-sans-sc/files"
if [ ! -d "$NOTO_DIR" ]; then
  echo "❌ 请先在仓库根目录跑 pnpm install" >&2
  exit 1
fi
for weight in 400 500 700; do
  cp "$NOTO_DIR/noto-sans-sc-chinese-simplified-${weight}-normal.woff2" "fonts/" 2>/dev/null || \
  cp "$NOTO_DIR/noto-sans-sc-latin-${weight}-normal.woff2" "fonts/" 2>/dev/null || true
done

# JetBrains Mono(英文 + 数字)
JBM_DIR="../node_modules/@fontsource/jetbrains-mono/files"
for weight in 400 500 700; do
  cp "$JBM_DIR/jetbrains-mono-latin-${weight}-normal.woff2" "fonts/" 2>/dev/null || true
done

# Typst 需要 ttf / otf,从 GitHub release 拉一份 ttf
if [ ! -f "fonts/JetBrainsMono-Regular.ttf" ]; then
  echo "→ 拉取 JetBrains Mono TTF..."
  TMP=$(mktemp -d)
  curl -fsSL -o "$TMP/jbm.zip" \
    "https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-2.304.zip"
  unzip -q -o "$TMP/jbm.zip" "fonts/ttf/JetBrainsMono-Regular.ttf" -d "$TMP"
  unzip -q -o "$TMP/jbm.zip" "fonts/ttf/JetBrainsMono-Medium.ttf" -d "$TMP"
  unzip -q -o "$TMP/jbm.zip" "fonts/ttf/JetBrainsMono-Bold.ttf" -d "$TMP"
  cp "$TMP/fonts/ttf/"*.ttf fonts/
  rm -rf "$TMP"
fi

if [ ! -f "fonts/NotoSansSC-Regular.otf" ]; then
  echo "→ 拉取 Noto Sans SC OTF..."
  TMP=$(mktemp -d)
  curl -fsSL -o "$TMP/notocjk.zip" \
    "https://github.com/notofonts/noto-cjk/releases/download/Sans2.004/03_NotoSansCJKsc.zip"
  unzip -q -o "$TMP/notocjk.zip" "OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf" -d "$TMP"
  unzip -q -o "$TMP/notocjk.zip" "OTF/SimplifiedChinese/NotoSansCJKsc-Medium.otf" -d "$TMP"
  unzip -q -o "$TMP/notocjk.zip" "OTF/SimplifiedChinese/NotoSansCJKsc-Bold.otf" -d "$TMP"
  cp "$TMP/OTF/SimplifiedChinese/"*.otf fonts/
  # 改名以匹配 Typst 字体匹配
  mv fonts/NotoSansCJKsc-Regular.otf fonts/NotoSansSC-Regular.otf
  mv fonts/NotoSansCJKsc-Medium.otf fonts/NotoSansSC-Medium.otf
  mv fonts/NotoSansCJKsc-Bold.otf fonts/NotoSansSC-Bold.otf
  rm -rf "$TMP"
fi

echo "✅ 字体准备完毕:"
ls -la fonts/ | grep -v '^total\|^d'
