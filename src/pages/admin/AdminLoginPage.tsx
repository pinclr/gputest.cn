import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { api, setToken } from '@/lib/adminAuth';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function AdminLoginPage() {
  useDocumentTitle('管理后台登录');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/admin/articles';

  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const r = await api<{ token: string }>('/api/admin/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (!r.ok || !r.data?.token) {
      setError(r.error || '登录失败');
      return;
    }
    setToken(r.data.token);
    navigate(from, { replace: true });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-bg p-6">
      <form
        onSubmit={handleSubmit}
        className="surface w-full max-w-sm overflow-hidden p-7"
      >
        <div className="flex items-center gap-2 font-mono text-sm">
          <BrandMark size={24} className="text-accent-amber" />
          <span className="font-semibold">GPUTest 后台</span>
        </div>
        <h1 className="mt-5 text-xl font-semibold tracking-tight">管理员登录</h1>
        <p className="mt-1 text-sm text-ink-muted">
          输入阿里云 FC 环境变量 <code className="font-mono">ADMIN_TOKEN</code> 的值。
        </p>

        <div className="mt-5 grid gap-1.5">
          <label className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            管理员密钥
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim" />
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="h-11 w-full rounded-md border border-border bg-bg/60 pl-10 pr-3 text-sm text-ink placeholder:text-ink-dim focus:border-accent-amber focus:bg-bg focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-status-err/40 bg-status-err/10 px-3 py-2 text-xs text-status-err">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending || !password}
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-amber px-4 text-sm font-medium text-bg transition-colors hover:bg-accent-amber/90 disabled:opacity-60"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? '验证中…' : '登录'}
        </button>

        <p className="mt-4 text-center text-[11px] text-ink-dim">
          仅限内部团队 · sessionStorage 存储,关闭浏览器自动失效
        </p>
      </form>
    </div>
  );
}
