import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="container-x grid place-items-center py-22">
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">404</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">页面不存在</h1>
        <p className="mt-3 text-ink-muted">看起来这张卡掉线了。</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent-amber px-4 py-2 text-sm font-medium text-bg hover:bg-accent-amber/90"
        >
          回到首页
        </Link>
      </div>
    </section>
  );
}
