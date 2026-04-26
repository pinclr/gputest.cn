/**
 * 阿里云 FC3.0 入口函数
 *
 * FC3.0 HTTP 触发器接收的是 fc-http event,我们把它适配成标准 Web Request,
 * 然后按路径分发到现有的 fetch-style handler(与 EdgeOne / CF Workers 同源)。
 */

import type { Env } from '../_lib/types';
import { onRequestPost as contactPost } from '../api/contact';
import { onRequestPost as adminAuthPost } from '../api/admin/auth';
import { onRequestGet as wechatCallbackGet, onRequestPost as wechatCallbackPost } from '../api/wechat/callback';
import { onRequestPost as wechatPushPost } from '../api/wechat/push';
import { onRequestPost as wechatUploadPost } from '../api/wechat/upload-image';

// FC3.0 HTTP event 类型(简化)
interface FCHttpEvent {
  version: string;
  rawPath: string;
  rawQueryString?: string;
  headers: Record<string, string>;
  requestContext: {
    http: { method: string; path: string };
  };
  body?: string;
  isBase64Encoded?: boolean;
}

interface FCHttpResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body?: string;
  isBase64Encoded?: boolean;
}

interface FCContext {
  requestId: string;
  function: { name: string };
  region: string;
}

/** 把 FC event 转成标准 Web Request */
function toRequest(event: FCHttpEvent): Request {
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers['host'] || 'api.gputest.cn';
  const url = `${protocol}://${host}${event.rawPath}${event.rawQueryString ? '?' + event.rawQueryString : ''}`;
  const method = event.requestContext.http.method;

  let body: BodyInit | null = null;
  if (event.body && method !== 'GET' && method !== 'HEAD') {
    body = event.isBase64Encoded
      ? Uint8Array.from(atob(event.body), (c) => c.charCodeAt(0))
      : event.body;
  }

  return new Request(url, {
    method,
    headers: event.headers,
    body,
  });
}

/** 把 Web Response 转成 FC 输出 */
async function fromResponse(resp: Response, requestOrigin: string | null): Promise<FCHttpResponse> {
  const headers: Record<string, string> = {};
  resp.headers.forEach((v, k) => {
    headers[k] = v;
  });
  Object.assign(headers, corsHeaders(requestOrigin));
  const text = await resp.text();
  return {
    statusCode: resp.status,
    headers,
    body: text,
  };
}

/**
 * CORS 头:dev 走 *.fcapp.run 跨域到 dev{N}.{gputest.cn|pinclr.com},prod/staging 走同源。
 * 允许任何 *.gputest.cn / *.pinclr.com(临时调试期)与 localhost(开发);
 * 其他来源不带 ACAO,等价于禁止跨域。
 */
function corsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin &&
    (/^https?:\/\/([a-z0-9-]+\.)*(gputest\.cn|pinclr\.com)$/.test(origin) ||
      /^http:\/\/localhost(:\d+)?$/.test(origin));
  if (!allowed) return {};
  return {
    'Access-Control-Allow-Origin': origin!,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  };
}

/** 路由分发 */
async function dispatch(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  const ctx = {
    request,
    env,
    params: {},
    waitUntil: (_p: Promise<unknown>) => {
      // FC3.0 同步执行,简单 ignore;异步任务建议改用消息服务
      void _p;
    },
  };

  // POST /api/contact
  if (path === '/api/contact' && method === 'POST') return contactPost(ctx);

  // POST /api/admin/auth
  if (path === '/api/admin/auth' && method === 'POST') return adminAuthPost(ctx);

  // GET/POST /api/wechat/callback
  if (path === '/api/wechat/callback') {
    if (method === 'GET') return wechatCallbackGet(ctx);
    if (method === 'POST') return wechatCallbackPost(ctx);
  }

  // POST /api/wechat/push
  if (path === '/api/wechat/push' && method === 'POST') return wechatPushPost(ctx);

  // POST /api/wechat/upload-image
  if (path === '/api/wechat/upload-image' && method === 'POST') return wechatUploadPost(ctx);

  return new Response(JSON.stringify({ ok: false, error: 'Not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** FC3.0 入口 */
export const handler = async (
  event: FCHttpEvent,
  _context: FCContext,
): Promise<FCHttpResponse> => {
  // FC 环境变量直接从 process.env 取
  const env: Env = {
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    WECHAT_APP_ID: process.env.WECHAT_APP_ID,
    WECHAT_APP_SECRET: process.env.WECHAT_APP_SECRET,
    WECHAT_TOKEN: process.env.WECHAT_TOKEN,
    WECHAT_AES_KEY: process.env.WECHAT_AES_KEY,
    LARK_BOT_WEBHOOK: process.env.LARK_BOT_WEBHOOK,
    WEWORK_BOT_WEBHOOK: process.env.WEWORK_BOT_WEBHOOK,
    // FC 内存版 KV 兜底(单实例非持久);V2 接 Tablestore / Redis 持久化
    CACHE: createMemoryKV(),
  };

  const origin = event.headers['origin'] || event.headers['Origin'] || null;

  // CORS preflight 短路
  if (event.requestContext.http.method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: '',
    };
  }

  try {
    const request = toRequest(event);
    const response = await dispatch(request, env);
    return await fromResponse(response, origin);
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      body: JSON.stringify({ ok: false, error: (e as Error).message }),
    };
  }
};

// 简易内存 KV(单实例 / 不持久化,只为 access_token 短期缓存)
function createMemoryKV() {
  const store = new Map<string, { value: string; expireAt: number }>();
  return {
    async get(key: string): Promise<string | null> {
      const entry = store.get(key);
      if (!entry) return null;
      if (entry.expireAt > 0 && Date.now() > entry.expireAt) {
        store.delete(key);
        return null;
      }
      return entry.value;
    },
    async put(key: string, value: string, options?: { expirationTtl?: number }) {
      const expireAt = options?.expirationTtl ? Date.now() + options.expirationTtl * 1000 : 0;
      store.set(key, { value, expireAt });
    },
    async delete(key: string) {
      store.delete(key);
    },
  };
}
