import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  {
    title: '免费工具',
    items: [
      { to: '/self-serve', label: '免费自测 + 50 元解读' },
    ],
  },
  {
    title: '测试分类',
    items: [
      { to: '/testing/node', label: '节点测试' },
      { to: '/testing/cluster', label: '集群测试' },
      { to: '/testing/network', label: '网络测试' },
      { to: '/testing/storage', label: '存储测试' },
      { to: '/testing/platform', label: '平台测试' },
    ],
  },
  {
    title: '具体方案',
    items: [
      { to: '/solutions/acceptance', label: 'AIDC 验收测试' },
      { to: '/solutions/health-audit', label: '集群健康审计' },
      { to: '/solutions/model-quality', label: '模型质量评测' },
      { to: '/solutions/network-testing', label: 'IB / RoCE 网络测试' },
      { to: '/solutions/storage-testing', label: '智算存储测试' },
      { to: '/solutions/security-testing', label: '安全与合规测试' },
      { to: '/solutions/single-node', label: '单机批量测试' },
      { to: '/solutions/domestic-gpu', label: '国产卡专项' },
    ],
  },
  {
    title: '资源',
    items: [
      { to: '/methodology', label: '测试方法' },
      { to: '/articles', label: '技术文章' },
      { to: '/cases', label: '客户案例' },
      { to: '/published', label: '公开测试结果' },
      { to: '/resources', label: '白皮书 / 报告' },
      { to: '/about', label: '关于我们' },
    ],
  },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // 路由变化自动关闭
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // 打开时锁定滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="菜单"
        className="grid h-10 w-10 place-items-center rounded-md border border-border bg-bg-surface text-ink-muted hover:border-border-strong hover:text-ink lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* 抽屉面板 */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        {/* 背景遮罩 */}
        <div
          onClick={() => setOpen(false)}
          className={cn(
            'absolute inset-0 bg-bg/80 backdrop-blur-sm transition-opacity duration-200',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* 抽屉 */}
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-bg-surface shadow-2xl transition-transform duration-300',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
              导航
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="关闭"
              className="grid h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-bg-elevated hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            {sections.map((s) => (
              <div key={s.title} className="mb-6">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                  {s.title}
                </div>
                <ul className="space-y-0.5">
                  {s.items.map((it) => (
                    <li key={it.to}>
                      <NavLink
                        to={it.to}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between rounded-md px-3 py-2.5 text-base transition-colors',
                            isActive
                              ? 'bg-bg-elevated text-ink'
                              : 'text-ink-muted hover:bg-bg-elevated hover:text-ink',
                          )
                        }
                      >
                        <span>{it.label}</span>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="border-t border-border p-5">
            <Link
              to="/contact"
              className="group flex h-12 items-center justify-center gap-2 rounded-md bg-accent-amber text-sm font-medium text-bg hover:bg-accent-amber/90"
            >
              项目咨询
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <p className="mt-3 text-center text-[11px] text-ink-dim">
              GPUTest · 核芯 · 北京品晰科技
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
