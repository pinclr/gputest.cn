/**
 * 微信公众号 HTML 导出器
 *
 * 公众号编辑器的限制:
 *   - 不接受 class 属性,只读 style="..." inline 样式
 *   - 不接受外链 css / 自定义字体
 *   - 部分标签会被过滤(script / iframe 等),img 必须用粘贴时由编辑器替换
 *
 * 因此本导出器:
 *   1. marked 把 markdown 转成基础 HTML
 *   2. 对每个标签注入 inline style
 *   3. 用 <section> 包裹主体,符合公众号"秀米""135"等编辑器约定
 *   4. 保留 [图1: ...] 占位文本,编辑时再插入图片
 */

import { marked, Renderer } from 'marked';
import type { Tokens, RendererObject } from 'marked';

// 品牌色 (与 tailwind.config.ts 一致)
const COLOR = {
  amber: '#E5A100',
  violet: '#8B5CF6',
  steel: '#1E6091',
  ink: '#1A2233',
  inkMuted: '#4F5B72',
  inkDim: '#7A8499',
  border: '#E5E8EE',
  bgSurface: '#F4F7FB',
  bgCode: '#1F2937',
};

// 每个标签的 inline style
const S = {
  section: `font-size: 16px; line-height: 1.75; color: ${COLOR.ink}; word-wrap: break-word;`,
  h1: `font-size: 22px; font-weight: 600; line-height: 1.3; margin: 32px 0 16px; color: ${COLOR.ink};`,
  h2: `font-size: 19px; font-weight: 600; line-height: 1.3; margin: 28px 0 12px; padding-bottom: 8px; border-bottom: 2px solid ${COLOR.amber}; color: ${COLOR.ink};`,
  h3: `font-size: 17px; font-weight: 600; line-height: 1.3; margin: 24px 0 10px; color: ${COLOR.ink}; border-left: 4px solid ${COLOR.amber}; padding-left: 10px;`,
  h4: `font-size: 16px; font-weight: 600; margin: 20px 0 8px; color: ${COLOR.ink};`,
  p: `margin: 14px 0; color: ${COLOR.ink}; line-height: 1.85;`,
  a: `color: ${COLOR.amber}; text-decoration: none; border-bottom: 1px dashed ${COLOR.amber};`,
  strong: `font-weight: 600; color: ${COLOR.ink};`,
  em: `font-style: italic; color: ${COLOR.inkMuted};`,
  ul: `margin: 14px 0; padding-left: 24px; color: ${COLOR.ink};`,
  ol: `margin: 14px 0; padding-left: 24px; color: ${COLOR.ink};`,
  li: `margin: 6px 0; line-height: 1.85;`,
  blockquote: `margin: 18px 0; padding: 12px 16px; background: ${COLOR.bgSurface}; border-left: 3px solid ${COLOR.amber}; color: ${COLOR.inkMuted}; font-style: italic;`,
  hr: `margin: 32px auto; border: none; border-top: 1px solid ${COLOR.border}; width: 80px;`,
  code: `padding: 2px 6px; background: ${COLOR.bgSurface}; color: ${COLOR.amber}; border-radius: 3px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px;`,
  pre: `margin: 18px 0; padding: 16px; background: ${COLOR.bgCode}; color: #E5E8EE; border-radius: 8px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 1.6;`,
  preCode: `background: transparent; color: #E5E8EE; padding: 0; font-size: 13px;`,
  table: `width: 100%; margin: 18px 0; border-collapse: collapse; font-size: 14px;`,
  th: `padding: 8px 12px; background: ${COLOR.bgSurface}; border: 1px solid ${COLOR.border}; text-align: left; font-weight: 600; color: ${COLOR.ink};`,
  td: `padding: 8px 12px; border: 1px solid ${COLOR.border}; color: ${COLOR.inkMuted};`,
  img: `display: block; max-width: 100%; margin: 18px auto; border-radius: 8px;`,
};

// 自定义 marked renderer,直接发出带 style 的标签
function makeRenderer(): RendererObject {
  return {
    heading({ tokens, depth }: Tokens.Heading) {
      const text = this.parser.parseInline(tokens);
      const style = ({ 1: S.h1, 2: S.h2, 3: S.h3, 4: S.h4, 5: S.h4, 6: S.h4 } as Record<number, string>)[depth];
      return `<h${depth} style="${style}">${text}</h${depth}>\n`;
    },
    paragraph({ tokens }: Tokens.Paragraph) {
      const text = this.parser.parseInline(tokens);
      return `<p style="${S.p}">${text}</p>\n`;
    },
    link({ href, title, tokens }: Tokens.Link) {
      const text = this.parser.parseInline(tokens);
      const t = title ? ` title="${title}"` : '';
      return `<a href="${href}"${t} style="${S.a}">${text}</a>`;
    },
    strong({ tokens }: Tokens.Strong) {
      const text = this.parser.parseInline(tokens);
      return `<strong style="${S.strong}">${text}</strong>`;
    },
    em({ tokens }: Tokens.Em) {
      const text = this.parser.parseInline(tokens);
      return `<em style="${S.em}">${text}</em>`;
    },
    list({ ordered, items }: Tokens.List) {
      const tag = ordered ? 'ol' : 'ul';
      const style = ordered ? S.ol : S.ul;
      const body = items
        .map((item) => {
          const inner = this.parser.parse(item.tokens);
          return `<li style="${S.li}">${inner.replace(/<\/?p[^>]*>/g, '')}</li>`;
        })
        .join('\n');
      return `<${tag} style="${style}">\n${body}\n</${tag}>\n`;
    },
    blockquote({ tokens }: Tokens.Blockquote) {
      const inner = this.parser.parse(tokens);
      return `<blockquote style="${S.blockquote}">${inner}</blockquote>\n`;
    },
    hr() {
      return `<hr style="${S.hr}" />\n`;
    },
    code({ text }: Tokens.Code) {
      return `<pre style="${S.pre}"><code style="${S.preCode}">${escapeHtml(text)}</code></pre>\n`;
    },
    codespan({ text }: Tokens.Codespan) {
      return `<code style="${S.code}">${text}</code>`;
    },
    table({ header, rows }: Tokens.Table) {
      const headerHtml = header
        .map((cell) => {
          const text = this.parser.parseInline(cell.tokens);
          return `<th style="${S.th}">${text}</th>`;
        })
        .join('');
      const bodyHtml = rows
        .map((row) => {
          const cells = row
            .map((cell) => {
              const text = this.parser.parseInline(cell.tokens);
              return `<td style="${S.td}">${text}</td>`;
            })
            .join('');
          return `<tr>${cells}</tr>`;
        })
        .join('\n');
      return `<table style="${S.table}"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>\n`;
    },
    image({ href, title, text }: Tokens.Image) {
      const t = title ? ` title="${title}"` : '';
      return `<img src="${href}" alt="${text}"${t} style="${S.img}" />`;
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export interface ExportOptions {
  /** 文末是否附"关注公众号 + 联系我们"卡片 */
  appendCta?: boolean;
  /** 标题(出现在 section 顶部) */
  title?: string;
}

export function exportToWeChatHTML(markdown: string, opts: ExportOptions = {}): string {
  marked.use({ renderer: makeRenderer() });
  // 抑制未使用 Renderer 警告(预留外部扩展使用)
  void Renderer;
  const body = marked.parse(markdown, { async: false }) as string;

  const cta = opts.appendCta
    ? `
<section style="margin: 40px 0 0; padding: 20px; background: ${COLOR.bgSurface}; border-radius: 8px; border-left: 4px solid ${COLOR.amber};">
  <p style="${S.p} margin: 0 0 8px;"><strong style="${S.strong}">— 关于 GPUTest · 核芯</strong></p>
  <p style="${S.p} margin: 0; font-size: 14px; color: ${COLOR.inkMuted};">
    北京品晰科技(2021)旗下 GPU 集群测试与验收品牌。第三方独立、方法学公开、报告可审计。
    业务线:AIDC 项目验收 · 集群健康审计 · 模型质量评测 · 单机批量测试 · 国产卡专项。
  </p>
  <p style="${S.p} margin: 8px 0 0; font-size: 13px; color: ${COLOR.inkDim};">
    gputest.cn · 工作日 9:30–18:30 · sales@gputest.cn
  </p>
</section>
`
    : '';

  return `<section style="${S.section}">\n${body}\n${cta}\n</section>`;
}

/** 一份用于人眼快速预览的纯文本摘要(把 inline style 去掉) */
export function exportPlainHTML(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}
