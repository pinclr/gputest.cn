import { useState } from 'react';
import { Copy, Check, Loader2, FileText } from 'lucide-react';
import { exportToZhihuMarkdown } from '@/lib/zhihuExporter';
import { cn } from '@/lib/utils';

interface Props {
  markdown: string;
  title: string;
}

/**
 * 一键导出知乎 markdown:复制到剪贴板,在知乎专栏编辑器粘贴即可。
 * 与公众号区别:知乎原生支持 markdown,无需 inline-style 转换。
 */
export function ZhihuExportButton({ markdown, title: _title }: Props) {
  const [state, setState] = useState<'idle' | 'pending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    setState('pending');
    setError(null);
    try {
      const md = exportToZhihuMarkdown(markdown, { appendFooter: true });
      await navigator.clipboard.writeText(md);
      setState('done');
      setTimeout(() => setState('idle'), 2400);
    } catch (e) {
      setError((e as Error).message || '复制失败');
      setState('idle');
    }
  }

  return (
    <div className="surface relative overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pillar-performance/60 to-transparent" />
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-pillar-performance/10 text-pillar-performance">
          <FileText className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
            发布工具
          </div>
          <h3 className="mt-1 text-base font-semibold">导出知乎 Markdown</h3>
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            知乎专栏编辑器原生支持 markdown 粘贴,无需转换。文末已附品牌 footer。
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
            : 'border-pillar-performance/40 bg-pillar-performance/10 text-pillar-performance hover:border-pillar-performance hover:bg-pillar-performance/20',
        )}
      >
        {state === 'pending' && <Loader2 className="h-4 w-4 animate-spin" />}
        {state === 'done' && <Check className="h-4 w-4" />}
        {state === 'idle' && <Copy className="h-4 w-4" />}
        {state === 'pending' && '转换中…'}
        {state === 'done' && '已复制到剪贴板'}
        {state === 'idle' && '复制知乎 Markdown'}
      </button>

      {error && <p className="mt-2 text-xs text-status-err">{error}</p>}

      <ol className="mt-4 space-y-1.5 text-[11px] leading-5 text-ink-dim">
        <li>1. 知乎 → 写文章 → 切换到 markdown 编辑模式</li>
        <li>2. Cmd/Ctrl+V 粘贴,知乎自动识别格式</li>
        <li>3. 替换 [图N] 占位为实图(从知乎相册上传)</li>
        <li>4. 审阅后发布到「GPUTest 核芯」专栏</li>
      </ol>
    </div>
  );
}
