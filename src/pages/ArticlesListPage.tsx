import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { getAllArticles } from '@/lib/articles';

export function ArticlesListPage() {
  useDocumentTitle(
    '技术文章 · 方法学与实测',
    'GPUTest 核芯公众号同步文章 — 单机验收 SOP / 集群 NCCL 实测 / 国产卡迁移 / 模型质量 diff,周一/三/五更新。',
  );

  const articles = getAllArticles();

  return (
    <>
      <PageHero
        eyebrow="技术文章"
        title="方法学 · 实测 · 案例脱敏"
        desc="周一 / 三 / 五 更新。所有文章同步公众号 GPUTest 核芯,站内可读、可搜、可分享。"
        primaryCta={{ label: '关注公众号', to: '/resources' }}
        tone="violet"
      />

      <section className="border-t border-border">
        <div className="container-x py-12 lg:py-16">
          {articles.length === 0 ? (
            <div className="surface grid place-items-center p-16 text-center">
              <p className="text-ink-muted">暂无文章</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  to={`/articles/${a.slug}`}
                  className="surface surface-hover group block p-6"
                >
                  <div className="flex items-center gap-3 text-[11px] text-ink-dim">
                    <span className="font-mono uppercase tracking-widest">
                      {a.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      约 {a.readMinutes} 分钟
                    </span>
                    {a.targetAudience && (
                      <span className="hidden truncate text-ink-muted md:inline">
                        受众 · {a.targetAudience.split(/[/、]/)[0]}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent-amber">
                    {a.title}
                  </h2>
                  {a.seoKeywords && a.seoKeywords.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-ink-dim" />
                      {a.seoKeywords.slice(0, 6).map((kw) => (
                        <span
                          key={kw}
                          className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-muted"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors group-hover:text-ink">
                    阅读全文
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
