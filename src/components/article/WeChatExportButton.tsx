import { useState } from 'react';
import { Copy, Check, Loader2, Sparkles } from 'lucide-react';
import { exportToWeChatHTML } from '@/lib/wechatExporter';
import { cn } from '@/lib/utils';

interface Props {
  markdown: string;
  title: string;
}

/**
 * 一键导出公众号 HTML:点击 → 转换 → 复制到剪贴板,
 * 用户切到 mp.weixin.qq.com 编辑器粘贴即可,样式直接生效。
 */
export function WeChatExportButton({ markdown, title }: Props) {
  const [state, setState] = useState<'idle' | 'pending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    setState('pending');
    setError(null);
    try {
      const html = exportToWeChatHTML(markdown, { appendCta: true, title });
      await navigator.clipboard.writeText(html);
      setState('done');
      setTimeout(() => setState('idle'), 2400);
    } catch (e) {
      setError((e as Error).message || '复制失败');
      setState('idle');
    }
  }

  return (
    <div className="surface relative overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-violet/60 to-transparent" />
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent-violet/10 text-accent-violet">
          <Sparkles className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
            发布工具
          </div>
          <h3 className="mt-1 text-base font-semibold">导出公众号 HTML</h3>
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            一键转 inline-style HTML,粘贴进 mp.weixin.qq.com 编辑器样式直接生效。
          </p>
        </div>
      </div>

      <button
        onClick={handleExport}
        disabled={state === 'pending'}
        className={cn(
          'mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors',
          state === 'done'
            ? 'border-status-ok/40 bg-status-ok/10 text-status-ok'
            : 'border-accent-violet/40 bg-accent-violet/10 text-accent-violet hover:border-accent-violet hover:bg-accent-violet/20',
        )}
      >
        {state === 'pending' && <Loader2 className="h-4 w-4 animate-spin" />}
        {state === 'done' && <Check className="h-4 w-4" />}
        {state === 'idle' && <Copy className="h-4 w-4" />}
        {state === 'pending' && '转换中…'}
        {state === 'done' && '已复制到剪贴板'}
        {state === 'idle' && '复制公众号 HTML'}
      </button>

      {error && <p className="mt-2 text-xs text-status-err">{error}</p>}

      <ol className="mt-4 space-y-1.5 text-[11px] leading-5 text-ink-dim">
        <li>1. 打开 mp.weixin.qq.com → 新建图文</li>
        <li>2. Cmd/Ctrl+V 粘贴,样式自动应用</li>
        <li>3. 替换 [图N] 占位为实图,审阅,发布</li>
      </ol>
    </div>
  );
}
