import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, X, ArrowRight, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 右下角浮窗:展开后给出"加企微 / 项目咨询"两条转化路径。
 * 在 /contact 页隐藏(避免重复)。
 */
export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/contact') {
      setVisible(false);
      setOpen(false);
      return;
    }
    // 滚动一段后再出现,避免一进站就弹
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* 展开面板 */}
      <div
        className={cn(
          'origin-bottom-right transition-all duration-200',
          open
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0',
        )}
      >
        <div className="surface w-72 overflow-hidden p-4 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              快速联系
            </span>
            <button
              onClick={() => setOpen(false)}
              className="grid h-7 w-7 place-items-center rounded text-ink-muted hover:bg-bg-elevated hover:text-ink"
              aria-label="关闭"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-3 grid h-32 w-full place-items-center rounded-md border border-border bg-bg text-xs text-ink-dim">
            <div className="flex flex-col items-center gap-2">
              <QrCode className="h-8 w-8 text-accent-violet" strokeWidth={1.5} />
              <span>企微活码 · 部署后生成</span>
            </div>
          </div>

          <p className="mt-3 text-xs leading-5 text-ink-muted">
            扫码加销售个人企微,1v1 跟进。或直接走表单。
          </p>

          <Link
            to="/contact"
            className="group mt-3 flex h-10 items-center justify-center gap-2 rounded-md bg-accent-amber text-sm font-medium text-bg hover:bg-accent-amber/90"
          >
            填写咨询表单
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-3 flex items-center justify-between text-[11px] text-ink-dim">
            <span>邮箱: sales@gputest.cn</span>
            <span>公众号: GPUTest 核芯</span>
          </div>
        </div>
      </div>

      {/* 主按钮 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'group relative flex h-14 w-14 items-center justify-center rounded-full bg-accent-amber text-bg shadow-lg shadow-accent-amber/30 transition-all hover:scale-105 hover:bg-accent-amber/90',
          open && 'scale-95',
        )}
        aria-label="联系我们"
      >
        {!open && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-accent-amber opacity-30"
            aria-hidden
          />
        )}
        <MessageSquare className="relative h-6 w-6" strokeWidth={2} />
      </button>
    </div>
  );
}
