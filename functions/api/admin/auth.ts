import { errorResponse, okResponse, type PagesHandler } from '../../_lib/types';

/**
 * 管理员登录:对 password 与 env.ADMIN_TOKEN 直接比较
 * 通过则把 token 回给客户端,客户端存 sessionStorage,后续请求带 Authorization: Bearer
 */
export const onRequestPost: PagesHandler = async ({ request, env }) => {
  if (!env.ADMIN_TOKEN) {
    return errorResponse('ADMIN_TOKEN 未配置,请在阿里云 FC 控制台先设置环境变量', 500);
  }

  let payload: { password?: string };
  try {
    payload = (await request.json()) as { password?: string };
  } catch {
    return errorResponse('请求体不是合法 JSON', 400);
  }

  if (!payload.password) return errorResponse('缺少 password', 400);

  // 常数时间比较防 timing
  const a = payload.password;
  const b = env.ADMIN_TOKEN;
  if (a.length !== b.length) return errorResponse('密码错误', 401);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  if (diff !== 0) return errorResponse('密码错误', 401);

  return okResponse({ token: env.ADMIN_TOKEN });
};
