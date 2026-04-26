#!/usr/bin/env bash
# 编译 functions/*.ts → aliyun/dist/*.js → aliyun/dist.zip
# Pulumi up 之前必须先跑这个

set -euo pipefail
cd "$(dirname "$0")/.."  # 仓库根目录

echo "→ 清理旧产物"
rm -rf aliyun/dist aliyun/dist.zip
mkdir -p aliyun/dist

echo "→ 编译 TypeScript → CommonJS (Node 20 / FC3.0 兼容)"
pnpm tsc -p functions/tsconfig.build.json

echo "→ 打包 dist.zip(从 dist 内部打,handler 路径平整)"
cd aliyun/dist
zip -rq ../dist.zip .
cd ..
ls -la dist.zip

echo
echo "✅ aliyun/dist.zip 就绪。可以跑 pulumi up 了。"
