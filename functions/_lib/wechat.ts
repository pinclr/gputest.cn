import type { Env } from './types';

/**
 * 公众号 MP API 客户端(Edge runtime)
 *
 * 关键端点:
 *   - cgi-bin/token            获取 access_token(2小时,缓存到 KV)
 *   - cgi-bin/material/...     永久素材(图片用于公众号正文)
 *   - cgi-bin/draft/add        新建草稿
 *   - cgi-bin/freepublish/submit  群发(草稿审核通过后)
 *
 * 注意:服务器 IP 必须加入公众号后台白名单,否则 token 接口直接报错。
 */

const TOKEN_KEY = 'wechat:access_token';

interface TokenResp {
  access_token?: string;
  expires_in?: number;
  errcode?: number;
  errmsg?: string;
}

export async function getAccessToken(env: Env): Promise<string> {
  // 优先读 KV 缓存
  if (env.CACHE) {
    const cached = await env.CACHE.get(TOKEN_KEY);
    if (cached) return cached;
  }

  if (!env.WECHAT_APP_ID || !env.WECHAT_APP_SECRET) {
    throw new Error(
      'WECHAT_APP_ID / WECHAT_APP_SECRET 未配置;请在阿里云 FC 控制台环境变量中设置后再调用。',
    );
  }

  const url = new URL('https://api.weixin.qq.com/cgi-bin/token');
  url.searchParams.set('grant_type', 'client_credential');
  url.searchParams.set('appid', env.WECHAT_APP_ID);
  url.searchParams.set('secret', env.WECHAT_APP_SECRET);

  const resp = await fetch(url.toString());
  const data = (await resp.json()) as TokenResp;

  if (!data.access_token) {
    throw new Error(`公众号 token 获取失败: ${data.errcode} ${data.errmsg}`);
  }

  // 缓存到 expires_in - 5min,避免临界点过期
  if (env.CACHE && data.expires_in) {
    await env.CACHE.put(TOKEN_KEY, data.access_token, {
      expirationTtl: Math.max(60, data.expires_in - 300),
    });
  }

  return data.access_token;
}

/**
 * 上传永久图文素材中的图片(用于正文 img / 封面)
 * 公众号正文图必须从公众号侧上传,不能用外链。
 */
export async function uploadImage(env: Env, imageBlob: Blob, filename: string): Promise<string> {
  const token = await getAccessToken(env);
  const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${token}&type=image`;

  const form = new FormData();
  form.append('media', imageBlob, filename);

  const resp = await fetch(url, { method: 'POST', body: form });
  const data = (await resp.json()) as { media_id?: string; url?: string; errmsg?: string };
  if (!data.media_id) throw new Error(`图片上传失败: ${data.errmsg}`);
  return data.media_id;
}

export interface DraftArticle {
  /** 标题 */
  title: string;
  /** 作者 */
  author?: string;
  /** 摘要(140 字内,服务号会显示) */
  digest?: string;
  /** 正文 HTML(必须使用公众号上传的 image url) */
  content: string;
  /** 原文链接(可选) */
  contentSourceUrl?: string;
  /** 封面图 media_id(必填) */
  thumbMediaId: string;
  /** 是否打开评论 */
  needOpenComment?: 0 | 1;
  /** 是否仅粉丝可评论 */
  onlyFansCanComment?: 0 | 1;
}

/**
 * 新建草稿(公众号编辑器侧会出现待发文章)
 */
export async function addDraft(env: Env, articles: DraftArticle[]): Promise<string> {
  const token = await getAccessToken(env);
  const url = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${token}`;

  const body = {
    articles: articles.map((a) => ({
      title: a.title,
      author: a.author ?? 'GPUTest 核芯',
      digest: a.digest ?? '',
      content: a.content,
      content_source_url: a.contentSourceUrl ?? '',
      thumb_media_id: a.thumbMediaId,
      need_open_comment: a.needOpenComment ?? 1,
      only_fans_can_comment: a.onlyFansCanComment ?? 0,
    })),
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await resp.json()) as { media_id?: string; errcode?: number; errmsg?: string };
  if (!data.media_id) throw new Error(`新建草稿失败: ${data.errcode} ${data.errmsg}`);
  return data.media_id;
}

/**
 * 群发(草稿审核通过后才能发,服务号才有此权限,订阅号只能用群发接口的旧版)
 */
export async function freepublishSubmit(env: Env, mediaId: string): Promise<string> {
  const token = await getAccessToken(env);
  const url = `https://api.weixin.qq.com/cgi-bin/freepublish/submit?access_token=${token}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id: mediaId }),
  });
  const data = (await resp.json()) as { publish_id?: string; errcode?: number; errmsg?: string };
  if (!data.publish_id) throw new Error(`发布失败: ${data.errcode} ${data.errmsg}`);
  return data.publish_id;
}

// 线索通知 → 已迁移到 functions/_lib/notify.ts(飞书 + 企微双通道)
