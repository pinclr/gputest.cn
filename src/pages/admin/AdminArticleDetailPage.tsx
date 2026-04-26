import { useState, type ChangeEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  Loader2,
  Upload,
  Send,
  Megaphone,
  AlertCircle,
} from 'lucide-react';
import { getArticleBySlug } from '@/lib/articles';
import { exportToWeChatHTML } from '@/lib/wechatExporter';
import { exportToZhihuMarkdown } from '@/lib/zhihuExporter';
import { api } from '@/lib/adminAuth';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { cn } from '@/lib/utils';

export function AdminArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  useDocumentTitle(article ? `管理 · ${article.title}` : '文章不存在');

  const [copyState, setCopyState] = useState<'idle' | 'done'>('idle');
  const [zhihuCopyState, setZhihuCopyState] = useState<'idle' | 'done'>('idle');
  const [thumbMediaId, setThumbMediaId] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pushAction, setPushAction] = useState<'draft' | 'publish'>('draft');
  const [pushing, setPushing] = useState(false);
  const [pushResult, setPushResult] = useState<
    | { kind: 'ok'; draftMediaId: string; publishId?: string; action: string }
    | { kind: 'err'; message: string }
    | null
  >(null);

  if (!article) return <NotFoundPage />;

  const wechatHtml = exportToWeChatHTML(article.content, {
    appendCta: true,
    title: article.title,
  });

  async function handleCopy() {
    await navigator.clipboard.writeText(wechatHtml);
    setCopyState('done');
    setTimeout(() => setCopyState('idle'), 2400);
  }

  async function handleCopyZhihu() {
    if (!article) return;
    const md = exportToZhihuMarkdown(article.content, { appendFooter: true });
    await navigator.clipboard.writeText(md);
    setZhihuCopyState('done');
    setTimeout(() => setZhihuCopyState('idle'), 2400);
  }

  async function handleUploadThumb(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('filename', file.name);
    const r = await api<{ mediaId: string }>('/api/wechat/upload-image', {
      method: 'POST',
      body: fd,
    });
    setUploading(false);
    if (!r.ok || !r.data) {
      setUploadError(r.error || '上传失败');
      return;
    }
    setThumbMediaId(r.data.mediaId);
  }

  async function handlePush() {
    if (!article || !thumbMediaId) return;
    setPushing(true);
    setPushResult(null);
    const r = await api<{
      draftMediaId: string;
      publishId?: string;
      action: string;
    }>('/api/wechat/push', {
      method: 'POST',
      body: JSON.stringify({
        title: article.title,
        contentHtml: wechatHtml,
        digest: article.targetAudience ?? '',
        thumbMediaId,
        action: pushAction,
      }),
    });
    setPushing(false);
    if (!r.ok || !r.data) {
      setPushResult({ kind: 'err', message: r.error || '推送失败' });
      return;
    }
    setPushResult({
      kind: 'ok',
      draftMediaId: r.data.draftMediaId,
      publishId: r.data.publishId,
      action: r.data.action,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/admin/articles"
          className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 文章列表
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{article.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
          <span className="font-mono">/{article.slug}</span>
          <span>·</span>
          <span>{article.publishDate}</span>
          <span>·</span>
          <span>约 {article.readMinutes} 分钟</span>
          {article.length && (
            <>
              <span>·</span>
              <span>{article.length}</span>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          title="① 复制公众号 HTML"
          icon={Copy}
          desc="markdown → inline-style HTML,粘贴进 mp.weixin.qq.com 编辑器,样式自动生效。"
        >
          <button
            onClick={handleCopy}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors',
              copyState === 'done'
                ? 'border-status-ok/40 bg-status-ok/10 text-status-ok'
                : 'border-accent-violet/40 bg-accent-violet/10 text-accent-violet hover:bg-accent-violet/20',
            )}
          >
            {copyState === 'done' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copyState === 'done' ? '已复制' : '复制 HTML'}
          </button>
          <p className="mt-3 text-[11px] text-ink-dim">
            HTML 长度约 {Math.round(wechatHtml.length / 1024)} KB,文末已附"关于"卡片。
          </p>
        </Card>

        <Card
          title="① 复制知乎 Markdown"
          icon={Copy}
          desc="知乎专栏支持 markdown 直接粘贴,文末已附品牌 footer。"
        >
          <button
            onClick={handleCopyZhihu}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors',
              zhihuCopyState === 'done'
                ? 'border-status-ok/40 bg-status-ok/10 text-status-ok'
                : 'border-pillar-performance/40 bg-pillar-performance/10 text-pillar-performance hover:bg-pillar-performance/20',
            )}
          >
            {zhihuCopyState === 'done' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {zhihuCopyState === 'done' ? '已复制' : '复制 Markdown'}
          </button>
          <p className="mt-3 text-[11px] text-ink-dim">
            知乎 → 写文章 → 切到 markdown 模式 → Cmd/Ctrl+V 粘贴。
          </p>
        </Card>
      </div>

      <Card
        title="② 上传文章封面"
        icon={Upload}
        desc="公众号文章必须有封面图(thumb_media_id)。上传图片到永久素材库,得到 media_id 用于下一步推送。建议 900×500 px,< 1MB。"
      >
        <label
          className={cn(
            'inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors',
            thumbMediaId
              ? 'border-status-ok/40 bg-status-ok/10 text-status-ok'
              : 'border-border bg-bg-surface text-ink hover:border-border-strong hover:bg-bg-elevated',
          )}
        >
          {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          {!uploading && (thumbMediaId ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />)}
          {uploading ? '上传中…' : thumbMediaId ? '已上传,可继续重传' : '选择封面图'}
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleUploadThumb}
          />
        </label>
        {thumbMediaId && (
          <div className="mt-3 rounded-md border border-border bg-bg-elevated p-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              media_id
            </div>
            <div className="mt-1 break-all font-mono text-xs text-ink">{thumbMediaId}</div>
          </div>
        )}
        {uploadError && (
          <div className="mt-3 flex items-start gap-2 rounded-md border border-status-err/40 bg-status-err/10 p-3 text-xs text-status-err">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>{uploadError}</div>
          </div>
        )}
      </Card>

      <Card
        title="③ 推送到公众号"
        icon={Send}
        desc="推到草稿箱后可在公众号编辑器侧预览发送;直接群发会立即推给所有粉丝(订阅号每日 1 次群发限制)。"
      >
        <div className="flex flex-wrap gap-2">
          <PushModeButton
            active={pushAction === 'draft'}
            onClick={() => setPushAction('draft')}
            label="仅草稿"
            sub="安全 · 后台手动审核发送"
          />
          <PushModeButton
            active={pushAction === 'publish'}
            onClick={() => setPushAction('publish')}
            label="草稿 + 群发"
            sub="立即推给全部粉丝"
            warn
          />
        </div>

        <button
          onClick={handlePush}
          disabled={pushing || !thumbMediaId}
          className={cn(
            'mt-4 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors',
            pushAction === 'publish'
              ? 'bg-status-warn text-bg hover:bg-status-warn/90'
              : 'bg-accent-amber text-bg hover:bg-accent-amber/90',
            'disabled:opacity-50',
          )}
        >
          {pushing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Megaphone className="h-4 w-4" />}
          {pushing
            ? '推送中…'
            : pushAction === 'publish'
              ? '草稿并立即群发'
              : '推送到草稿箱'}
        </button>

        {!thumbMediaId && (
          <p className="mt-2 text-[11px] text-ink-dim">需要先在 ② 步上传封面图。</p>
        )}

        {pushResult && pushResult.kind === 'ok' && (
          <div className="mt-4 rounded-md border border-status-ok/40 bg-status-ok/10 p-3 text-xs text-status-ok">
            <div className="font-medium">
              {pushResult.action === 'publish' ? '已推送并提交群发' : '已推送到草稿箱'}
            </div>
            <div className="mt-1 font-mono text-[11px]">
              draft media_id: {pushResult.draftMediaId}
              {pushResult.publishId && (
                <>
                  <br />
                  publish_id: {pushResult.publishId}
                </>
              )}
            </div>
            <p className="mt-2 text-status-ok/80">
              下一步:打开公众号后台 mp.weixin.qq.com → 草稿箱查看,审核样式后发送。
            </p>
          </div>
        )}
        {pushResult && pushResult.kind === 'err' && (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-status-err/40 bg-status-err/10 p-3 text-xs text-status-err">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <div className="font-medium">推送失败</div>
              <div className="mt-1">{pushResult.message}</div>
              <p className="mt-2 text-status-err/80">
                常见原因:WECHAT_APP_ID / SECRET 未在 FC 控制台配置,或服务器 IP 未加入公众号白名单。
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Card({
  title,
  desc,
  icon: Icon,
  children,
}: {
  title: string;
  desc: string;
  icon: typeof Copy;
  children: React.ReactNode;
}) {
  return (
    <div className="surface p-6">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent-violet/10 text-accent-violet">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-ink-muted">{desc}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function PushModeButton({
  active,
  onClick,
  label,
  sub,
  warn,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
  warn?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-start rounded-md border px-3 py-2 text-left transition-colors',
        active
          ? warn
            ? 'border-status-warn/60 bg-status-warn/10'
            : 'border-accent-amber/60 bg-accent-amber/10'
          : 'border-border bg-bg-surface hover:border-border-strong',
      )}
    >
      <span className={cn('text-sm font-medium', active && warn && 'text-status-warn')}>
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-ink-dim">{sub}</span>
    </button>
  );
}
