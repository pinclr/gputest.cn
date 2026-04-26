import type { PagesHandler } from '../../_lib/types';
import { verifyWeChatSignature } from '../../_lib/sign';

/**
 * 公众号服务器配置回调
 *   - 配置 URL 时:微信会发 GET,带 echostr,我方原样返回即可完成验证
 *   - 用户消息事件:微信 POST XML;V1 暂回固定 success(48h 内回复消息可换为模板回复)
 *
 * 路径:/api/wechat/callback,在公众号后台填 https://gputest.cn/api/wechat/callback
 */
export const onRequestGet: PagesHandler = async ({ request, env }) => {
  const url = new URL(request.url);
  const signature = url.searchParams.get('signature') || '';
  const timestamp = url.searchParams.get('timestamp') || '';
  const nonce = url.searchParams.get('nonce') || '';
  const echostr = url.searchParams.get('echostr') || '';

  if (!env.WECHAT_TOKEN) {
    return new Response('WECHAT_TOKEN not configured', { status: 500 });
  }

  const ok = await verifyWeChatSignature({
    signature,
    timestamp,
    nonce,
    token: env.WECHAT_TOKEN,
  });

  if (!ok) return new Response('signature mismatch', { status: 403 });
  return new Response(echostr, { headers: { 'Content-Type': 'text/plain' } });
};

export const onRequestPost: PagesHandler = async () => {
  // 用户消息事件:V1 暂回 success;V2 可解析 XML 并按 event 类型回复
  // 例如 subscribe 关注事件 → 回欢迎语 + 文章导航
  return new Response('success');
};
