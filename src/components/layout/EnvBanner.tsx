import { useEffect, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { getEnv } from '@/lib/env';
import { cn } from '@/lib/utils';

/**
 * 非生产环境横幅 + meta robots noindex 注入。
 *   - prod:不渲染,不注入 noindex
 *   - staging:琥珀色横幅,标 STAGING + commit SHA
 *   - dev:紫色横幅,标 DEV · PR #N + commit SHA + 跳转 PR 链接
 */
export function EnvBanner() {
  const info = useMemo(() => getEnv(), []);

  // 非生产环境:注入 meta robots noindex,防止搜索引擎抓取
  useEffect(() => {
    if (info.isProd) return;
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow, noarchive');
    return () => {
      meta?.setAttribute('content', '');
    };
  }, [info.isProd]);

  if (info.isProd) return null;

  const isDev = info.env === 'dev';
  const tone = isDev
    ? 'bg-accent-violet/15 border-accent-violet/40 text-accent-violet'
    : 'bg-accent-amber/15 border-accent-amber/40 text-accent-amber';

  const label = isDev ? `DEV · PR #${info.prNumber ?? '?'}` : 'STAGING';
  const shortSha = info.commitSha?.slice(0, 7);

  return (
    <div
      role="status"
      aria-label={`非生产环境: ${label}`}
      className={cn(
        'flex h-7 items-center justify-center gap-3 border-b font-mono text-[11px] uppercase tracking-widest',
        tone,
      )}
    >
      <span className="font-semibold">{label}</span>
      {shortSha && (
        <>
          <span className="opacity-60">·</span>
          <span className="opacity-80">build {shortSha}</span>
        </>
      )}
      <span className="opacity-60">·</span>
      <span className="opacity-80">noindex</span>
      {isDev && info.prNumber && (
        <>
          <span className="opacity-60">·</span>
          <a
            href={`https://github.com/_/_/pull/${info.prNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
          >
            View PR
            <ExternalLink className="h-3 w-3" />
          </a>
        </>
      )}
    </div>
  );
}
