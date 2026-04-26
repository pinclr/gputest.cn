import type { Env } from './types';

/**
 * 简易管理员 token 校验:
 *   - 客户端从 sessionStorage 拿到 token,放在 Authorization: Bearer <token>
 *   - Worker 与 env.ADMIN_TOKEN 直接比对
 *
 * 适用范围:小团队 admin 后台,不含敏感财务操作。
 * 进阶:接入腾讯云 IAM / 飞书 SSO / 企微扫码登录后再升级。
 */
export function checkAdmin(request: Request, env: Env): boolean {
  if (!env.ADMIN_TOKEN) return false;
  const auth = request.headers.get('Authorization') || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return false;
  // 常数时间比较,防 timing 攻击
  return constantTimeEqual(m[1], env.ADMIN_TOKEN);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
