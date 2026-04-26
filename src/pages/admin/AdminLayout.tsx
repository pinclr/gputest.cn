import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, FileText, ChevronRight } from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { clearToken } from '@/lib/adminAuth';
import { cn } from '@/lib/utils';

export function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate('/admin/login');
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] bg-bg">
      <header className="border-b border-border bg-bg-surface">
        <div className="container-x flex h-14 items-center justify-between gap-6">
          <Link to="/admin/articles" className="flex items-center gap-2 font-mono text-sm">
            <BrandMark size={24} className="text-accent-amber" />
            <span className="font-semibold">GPUTest 后台</span>
            <span className="text-ink-dim">/</span>
            <span className="text-ink-muted">admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs text-ink-muted transition-colors hover:text-ink"
            >
              查看公开站
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded border border-border bg-bg px-3 py-1.5 text-xs text-ink-muted hover:border-border-strong hover:text-ink"
            >
              <LogOut className="h-3.5 w-3.5" /> 退出
            </button>
          </div>
        </div>
      </header>

      <div className="container-x grid w-full gap-6 py-8 md:grid-cols-[200px_1fr]">
        <aside className="md:sticky md:top-8 md:self-start">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
            内容管理
          </div>
          <nav className="mt-3 space-y-1">
            <SidebarItem to="/admin/articles" icon={FileText} label="文章" />
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof FileText;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end={false}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between rounded px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-bg-surface text-ink'
            : 'text-ink-muted hover:bg-bg-surface hover:text-ink',
        )
      }
    >
      <span className="inline-flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <ChevronRight className="h-3.5 w-3.5 opacity-50" />
    </NavLink>
  );
}
