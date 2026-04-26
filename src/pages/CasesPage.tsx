import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CASES, INDUSTRY_LABEL, type Industry } from '@/data/cases';
import { MatrixHitMap } from '@/components/matrix/MatrixHitMap';
import { cn } from '@/lib/utils';

const PRODUCT_LABEL: Record<string, string> = {
  acceptance: '项目验收',
  'health-audit': '集群健康审计',
  'model-quality': '模型质量评测',
  'single-node': '单机批量测试',
  domestic: '国产卡专项',
};

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function CasesPage() {
  useDocumentTitle(
    '客户案例',
    '智算中心 / 金融 / 政企 / 互联网 / 经销商真实案例。脱敏可见、授权可披露,按行业筛选。',
  );
  const [industry, setIndustry] = useState<Industry | 'all'>('all');
  const filtered = industry === 'all' ? CASES : CASES.filter((c) => c.industry === industry);
  const industries: ('all' | Industry)[] = [
    'all',
    'aidc',
    'finance',
    'gov',
    'internet',
    'reseller',
    'cloud',
  ];

  return (
    <>
      <PageHero
        eyebrow="真实案例"
        title="脱敏可见,授权可披露"
        desc="所有案例均经客户书面授权,按既定脱敏 SOP 处理。原始数据保留在客户机房,公开页面只展示量级与方法学路径。"
        primaryCta={{ label: '查看公开测试结果列表', to: '/published' }}
        secondaryCta={{ label: '项目咨询', to: '/contact' }}
        tone="amber"
      />

      <section className="border-t border-border">
        <div className="container-x py-12">
          {/* 行业筛选 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              按行业
            </span>
            {industries.map((i) => (
              <button
                key={i}
                onClick={() => setIndustry(i)}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs transition-colors',
                  industry === i
                    ? 'border-accent-amber bg-accent-amber/10 text-accent-amber'
                    : 'border-border bg-bg-surface text-ink-muted hover:border-border-strong hover:text-ink',
                )}
              >
                {i === 'all' ? '全部' : INDUSTRY_LABEL[i]}
              </button>
            ))}
          </div>

          {/* 案例卡片网格 */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {filtered.map((c) => (
              <article
                key={c.slug}
                className={cn(
                  'surface relative overflow-hidden p-6',
                  !c.authorized && 'opacity-90',
                )}
              >
                {!c.authorized && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-border-strong bg-bg/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim backdrop-blur">
                    <Lock className="h-3 w-3" /> 待客户授权
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-bg-elevated px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    {INDUSTRY_LABEL[c.industry]}
                  </span>
                  <span className="rounded bg-bg-elevated px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-pillar-quality">
                    {PRODUCT_LABEL[c.product]}
                  </span>
                  <span className="font-mono text-[10px] text-ink-dim">{c.vendor}</span>
                </div>

                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">
                  {c.headline}
                </h3>

                <div className="mt-2 font-mono text-xs text-ink-muted">{c.scale}</div>

                <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                  关键发现
                </div>
                <ul className="mt-2 space-y-1">
                  {c.findings.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm leading-6 text-ink-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pillar-stability" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-md border border-border bg-bg-elevated/40 p-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                    整改后
                  </div>
                  <p className="mt-1 text-sm leading-6 text-ink">{c.outcome}</p>
                </div>

                {c.quote && (
                  <blockquote className="mt-4 border-l-2 border-accent-amber/60 pl-3">
                    <p className="text-sm italic leading-6 text-ink-muted">"{c.quote.text}"</p>
                    <footer className="mt-1 font-mono text-[10px] text-ink-dim">
                      — {c.quote.role}
                    </footer>
                  </blockquote>
                )}

                <div className="mt-5 border-t border-border pt-4">
                  <MatrixHitMap hit={c.hit} title="本案例命中的测试格" />
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="surface mt-8 grid place-items-center p-12 text-center">
              <p className="text-ink-muted">该行业暂无可披露案例</p>
            </div>
          )}

          {/* 私下案例引导 */}
          <div className="surface mt-10 flex flex-col items-start gap-3 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">未在公开案例中找到匹配的行业?</h3>
              <p className="mt-1 text-sm text-ink-muted">
                部分案例因 NDA 约束不便公开披露,可在保密会议中以匿名形式介绍。请通过联系页申请。
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
            >
              申请保密会议
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
