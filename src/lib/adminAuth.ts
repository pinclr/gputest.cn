/**
 * 管理员鉴权 + 带 token 的 fetch 封装
 * 仅 sessionStorage(关闭浏览器即失效),小团队后台够用。
 */

const KEY = 'gputest:admin_token';

export function getToken(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  sessionStorage.setItem(KEY, token);
}

export function clearToken(): void {
  sessionStorage.removeItem(KEY);
}

export function isAuthed(): boolean {
  return !!getToken();
}

export interface ApiResult<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}

export async function api<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<ApiResult<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (init.body && !(init.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // 当 VITE_API_URL 注入时(dev 走 FC 默认 *.fcapp.run URL)拼到 path 前;
  // 否则保持相对路径(staging/prod 同域反代)
  const base = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '');
  const url = base && path.startsWith('/') ? `${base}${path}` : path;

  let resp: Response;
  try {
    resp = await fetch(url, { ...init, headers });
  } catch (e) {
    return { ok: false, error: (e as Error).message || '网络错误' };
  }

  let body: unknown = null;
  try {
    body = await resp.json();
  } catch {
    return { ok: false, error: `非 JSON 响应 (HTTP ${resp.status})` };
  }

  if (!resp.ok) {
    const msg =
      typeof body === 'object' && body && 'error' in (body as Record<string, unknown>)
        ? String((body as { error: unknown }).error)
        : `HTTP ${resp.status}`;
    if (resp.status === 401) clearToken();
    return { ok: false, error: msg };
  }

  return { ok: true, data: body as T };
}
