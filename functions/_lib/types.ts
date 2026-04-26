/**
 * 平台无关 fetch handler 共享类型
 *
 * Handler 接口符合 Web 标准 (Request / Response),
 * 通过 functions/_aliyun/index.ts 适配到阿里云 FC3.0 HTTP 触发器。
 * 同源代码亦可在 Cloudflare Pages Functions / EdgeOne Pages 上跑。
 */

export interface Env {
  // Admin
  ADMIN_TOKEN?: string;

  // WeChat MP
  WECHAT_APP_ID?: string;
  WECHAT_APP_SECRET?: string;
  WECHAT_TOKEN?: string;
  WECHAT_AES_KEY?: string;

  // 通知通道
  LARK_BOT_WEBHOOK?: string;     // 飞书群机器人(主)
  WEWORK_BOT_WEBHOOK?: string;   // 企微群机器人(可选 / 双发)

  // KV-like(FC3.0 内存 fallback / EdgeOne KV / CF KV 兼容)— 缓存 access_token 等
  CACHE?: KVLike;
}

export interface KVLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface PagesContext<P = unknown> {
  request: Request;
  env: Env;
  params: P;
  waitUntil(p: Promise<unknown>): void;
}

export type PagesHandler<P = unknown> = (
  ctx: PagesContext<P>,
) => Response | Promise<Response>;

export function jsonResponse(
  data: unknown,
  init: ResponseInit = {},
): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...init.headers,
    },
  });
}

export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ ok: false, error: message }, { status });
}

export function okResponse(data: unknown = {}): Response {
  return jsonResponse({ ok: true, ...((data as object) ?? {}) });
}
