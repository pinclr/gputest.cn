/**
 * 文章数据层:从 content/wechat/*.md 自动加载,解析 frontmatter,导出可查询的文章列表。
 * 所有文章既是站内 SEO 内容,也是公众号推送源。
 */

export interface ArticleMeta {
  slug: string;
  title: string;
  author: string;
  publishDate: string;
  targetAudience?: string;
  length?: string;
  imagesCount?: number;
  ctas?: string;
  seoKeywords?: string[];
  /** 是否已发布到公众号(用于 admin 状态展示) */
  publishedToWeChat?: boolean;
  /** 公众号文章链接(已发布后填) */
  weChatUrl?: string;
}

export interface Article extends ArticleMeta {
  /** 去掉 frontmatter 后的纯 markdown 正文 */
  content: string;
  /** 估算阅读时长(分钟) */
  readMinutes: number;
}

// Vite 在构建时把 content/wechat/*.md 全部内联为字符串
const modules = import.meta.glob('/content/wechat/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const fm = match[1];
  const body = match[2];
  const meta: Record<string, unknown> = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([\w_]+):\s*(.+)$/);
    if (!m) continue;
    const key = m[1];
    let value: unknown = m[2].trim();
    // 简单去引号
    if (typeof value === 'string') {
      const s = value as string;
      if (
        (s.startsWith('"') && s.endsWith('"')) ||
        (s.startsWith("'") && s.endsWith("'"))
      ) {
        value = s.slice(1, -1);
      }
    }
    meta[key] = value;
  }
  return { meta, body };
}

function camelize(snake: string): string {
  return snake.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

function estimateReadMinutes(content: string): number {
  // 中文每分钟阅读 ~400 字,英文按 word ~250/min
  const cn = (content.match(/[一-龥]/g) || []).length;
  const en = (content.match(/[A-Za-z]+/g) || []).length;
  const minutes = Math.max(1, Math.round(cn / 400 + en / 250));
  return minutes;
}

function buildArticles(): Article[] {
  const list: Article[] = [];
  for (const [path, raw] of Object.entries(modules)) {
    const { meta, body } = parseFrontmatter(raw);
    const fileSlug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'unknown';
    const slug = (meta.slug as string) || fileSlug.replace(/^post-\d+-/, '');
    const seo = meta.seo_keywords as string | undefined;
    const article: Article = {
      slug,
      title: (meta.title as string) || fileSlug,
      author: (meta.author as string) || 'GPUTest 核芯',
      publishDate: (meta.publish_date as string) || '',
      targetAudience: meta.target_audience as string | undefined,
      length: meta.length as string | undefined,
      imagesCount: meta.images
        ? Number(String(meta.images).match(/^\d+/)?.[0] ?? 0)
        : undefined,
      ctas: meta.ctas as string | undefined,
      seoKeywords: seo ? seo.split(/[,，]/).map((s) => s.trim()).filter(Boolean) : undefined,
      content: body,
      readMinutes: estimateReadMinutes(body),
    };
    list.push(article);
  }
  // 按发布日期倒序
  list.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
  return list;
}

const ARTICLES = buildArticles();

// 抑制未使用 camelize 警告(预留未来 frontmatter 字段映射)
void camelize;

export function getAllArticles(): Article[] {
  return ARTICLES;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticleMeta(): ArticleMeta[] {
  return ARTICLES.map(({ content: _content, readMinutes: _r, ...m }) => m);
}
