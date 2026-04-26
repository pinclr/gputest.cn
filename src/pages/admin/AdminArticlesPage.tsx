import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText, ExternalLink } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function AdminArticlesPage() {
  useDocumentTitle('文章管理');
  const articles = getAllArticles();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
            文章管理
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            全部文章 ({articles.length})
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            源文件在 <code className="font-mono text-ink">content/wechat/*.md</code>,Vite
            构建时自动加载。增加新文章 = 在该目录新建 md 文件并 push。
          </p>
        </div>
      </div>

      <div className="surface mt-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated text-left text-[11px] uppercase tracking-widest text-ink-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">标题 / Slug</th>
              <th className="px-4 py-3 font-medium">日期</th>
              <th className="px-4 py-3 font-medium">阅读</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr
                key={a.slug}
                className="border-b border-border last:border-b-0 hover:bg-bg-elevated/40"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-ink">{a.title}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-ink-dim">/{a.slug}</div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">
                  {a.publishDate}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                    <Clock className="h-3 w-3" /> {a.readMinutes} 分钟
                  </span>
                </td>
                <td className="px-4 py-3">
                  {a.publishedToWeChat ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-status-ok/40 bg-status-ok/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-status-ok">
                      已发布
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-elevated px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                      草稿
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/articles/${a.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-[11px] text-ink-muted hover:border-border-strong hover:text-ink"
                    >
                      <ExternalLink className="h-3 w-3" /> 站内
                    </Link>
                    <Link
                      to={`/admin/articles/${a.slug}`}
                      className="inline-flex items-center gap-1 rounded border border-accent-amber/40 bg-accent-amber/10 px-2 py-1 text-[11px] font-medium text-accent-amber hover:bg-accent-amber/20"
                    >
                      管理 <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink-muted">
                  <FileText className="mx-auto h-8 w-8 opacity-40" />
                  <div className="mt-2">暂无文章</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
