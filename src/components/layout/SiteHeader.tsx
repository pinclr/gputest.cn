import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BrandMark } from '@/components/BrandMark';
import { MobileMenu } from '@/components/layout/MobileMenu';

// 一级菜单:5 个测试分类(全部 4 字),其余资源类入口在 mobile menu / footer。
const nav = [
  { to: '/testing/node', label: '节点测试' },
  { to: '/testing/cluster', label: '集群测试' },
  { to: '/testing/network', label: '网络测试' },
  { to: '/testing/storage', label: '存储测试' },
  { to: '/testing/platform', label: '平台测试' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          className="group flex items-center gap-2 font-mono text-sm tracking-tight"
        >
          <BrandMark
            size={28}
            className="text-accent-amber transition-transform group-hover:scale-105"
          />
          <span className="font-semibold text-ink">GPUTest</span>
          <span className="hidden text-ink-muted sm:inline">·</span>
          <span className="hidden text-ink-muted sm:inline">核芯</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded px-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-bg-elevated text-ink'
                    : 'text-ink-muted hover:bg-bg-surface hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-md bg-accent-amber px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent-amber/90 sm:inline-flex"
          >
            项目咨询
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
