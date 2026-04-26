import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

/**
 * 漏斗入口:免费自测工具包 + 50 元报告解读。
 * 放在 PillarsBand 之后、SolutionsBand 之前,作为低门槛入口与付费方案的桥梁。
 */
export function FreeToolBand() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,161,0,0.12),transparent_55%)]" />
      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* 左:文案 + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-status-ok/30 bg-status-ok/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-status-ok">
              <span className="h-1.5 w-1.5 rounded-full bg-status-ok" />
              新增 · 免费工具
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              先免费自测一次,数据决定下一步
            </h2>
            <p className="mt-3 max-w-xl text-ink-muted">
              下载 GPUTest 单机自测工具包,本地 3 小时完成测试,自动生成报告。可选 ¥50 升级专家书面解读,24 小时内交付。
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/self-serve#download"
                className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
              >
                <Download className="h-4 w-4" />
                下载工具包(免费)
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/self-serve#interpretation"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong bg-bg-surface px-6 text-sm font-medium text-ink hover:border-accent-violet/60 hover:bg-bg-elevated"
              >
                <Sparkles className="h-4 w-4 text-accent-violet" />
                了解 ¥50 解读服务
              </Link>
            </div>
          </div>

          {/* 右:价格对比卡 */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="surface relative overflow-hidden border-status-ok/30 p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-status-ok" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-status-ok">
                工具包
              </div>
              <div className="mt-2 text-3xl font-bold text-ink">免费</div>
              <p className="mt-3 text-xs leading-5 text-ink-muted">
                NVIDIA Field Diag · DCGM Diag · gpu-burn · cuda_memtest 等业界标准工具的一键测试包
              </p>
              <ul className="mt-3 space-y-1 text-[11px] text-ink-dim">
                <li>· 本地执行,数据不出客户机房</li>
                <li>· 3 小时完成单机三支柱标准用例</li>
                <li>· 自动生成 PDF 报告 + JSON 原始数据</li>
              </ul>
            </div>

            <div className="surface relative overflow-hidden border-accent-amber/40 p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-accent-amber" />
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent-amber">
                  专家解读
                </div>
                <span className="rounded-full bg-accent-amber/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent-amber">
                  可选
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-base text-accent-amber">¥</span>
                <span className="text-3xl font-bold text-ink">50</span>
                <span className="text-xs text-ink-dim">/ 次</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-ink-muted">
                上传报告,24 小时内收到 4–6 页书面分析与改进建议
              </p>
              <ul className="mt-3 space-y-1 text-[11px] text-ink-dim">
                <li>· 资深工程师人工审阅</li>
                <li>· 红 / 黄 / 绿评级 + 优先级</li>
                <li>· 5 台合并 ¥200 / 10 台 ¥350</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
