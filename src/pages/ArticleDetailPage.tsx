import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageSquare, QrCode } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WeChatExportButton } from '@/components/article/WeChatExportButton';
import { ZhihuExportButton } from '@/components/article/ZhihuExportButton';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import 'highlight.js/styles/github-dark.css';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  // hooks 必须无条件调用
  useDocumentTitle(
    article ? article.title : '文章不存在',
    article?.targetAudience ? `受众:${article.targetAudience}` : undefined,
  );

  if (!article) return <NotFoundPage />;

  const all = getAllArticles();
  const idx = all.findIndex((a) => a.slug === article.slug);
  const prev = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  const next = idx > 0 ? all[idx - 1] : undefined;

  return (
    <>
      <PageHero
        eyebrow={`文章 · ${article.publishDate}`}
        title={article.title}
        desc={article.targetAudience ? `受众:${article.targetAudience}` : ''}
        tone="violet"
      >
        <div className="surface space-y-3 p-5 text-sm">
          <div className="flex items-center gap-2 text-ink-muted">
            <Calendar className="h-4 w-4" />
            <span>{article.publishDate}</span>
          </div>
          <div className="flex items-center gap-2 text-ink-muted">
            <Clock className="h-4 w-4" />
            <span>约 {article.readMinutes} 分钟阅读</span>
          </div>
          {article.length && (
            <div className="text-ink-dim">
              <span className="font-mono text-[11px] uppercase tracking-widest">长度 · </span>
              <span>{article.length}</span>
            </div>
          )}
          {article.seoKeywords && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {article.seoKeywords.slice(0, 6).map((kw) => (
                <span
                  key={kw}
                  className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-muted"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </PageHero>

      <article className="border-t border-border">
        <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_280px] lg:py-16">
          {/* 主文 */}
          <div className="prose-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* 侧栏:CTA + 相关 + 公众号导出 */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <WeChatExportButton markdown={article.content} title={article.title} />
            <ZhihuExportButton markdown={article.content} title={article.title} />

            <div className="surface p-5">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                关注公众号
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                周一 / 三 / 五 更新方法学与实测内容。扫码或在微信里搜「GPUTest 核芯」。
              </p>
              <div className="mt-3 grid h-32 w-full place-items-center rounded-md border border-border bg-bg text-xs text-ink-dim">
                <div className="flex flex-col items-center gap-1.5">
                  <QrCode className="h-7 w-7 text-accent-amber" strokeWidth={1.5} />
                  <span>公众号二维码</span>
                </div>
              </div>
            </div>

            <div className="surface p-5">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                想聊聊?
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                这篇文章覆盖的场景如果与您当前项目相关,我们能 1v1 提供具体方案与报价区间。
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-accent-amber px-4 text-sm font-medium text-bg hover:bg-accent-amber/90"
              >
                <MessageSquare className="h-4 w-4" /> 项目咨询
              </Link>
            </div>
          </aside>
        </div>

        {/* 上 / 下篇 */}
        {(prev || next) && (
          <div className="border-t border-border">
            <div className="container-x grid gap-3 py-10 md:grid-cols-2">
              {prev ? (
                <Link
                  to={`/articles/${prev.slug}`}
                  className="surface surface-hover group p-5"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                    <ArrowLeft className="h-3 w-3" /> 上一篇
                  </div>
                  <div className="mt-2 text-sm font-medium leading-6 text-ink group-hover:text-accent-amber">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={`/articles/${next.slug}`}
                  className="surface surface-hover group p-5 text-right"
                >
                  <div className="flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                    下一篇 <ArrowRight className="h-3 w-3" />
                  </div>
                  <div className="mt-2 text-sm font-medium leading-6 text-ink group-hover:text-accent-amber">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
