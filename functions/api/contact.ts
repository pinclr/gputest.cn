import { errorResponse, okResponse, type PagesHandler } from '../_lib/types';
import { notifyLead } from '../_lib/notify';

interface ContactPayload {
  company?: string;
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  products?: string[];
  scale?: string;
  timing?: string;
  message?: string;
  utmSource?: string;
}

/**
 * 项目咨询表单接收
 *   - 字段校验
 *   - 推到飞书群机器人(主),并行推企业微信(备份,可选)
 *   - 后续可加:写 KV / D1 / 同步到 CRM(HubSpot / 飞书多维表 OpenAPI)
 */
export const onRequestPost: PagesHandler = async ({ request, env, waitUntil }) => {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return errorResponse('请求体不是合法 JSON', 400);
  }

  if (!payload.company || !payload.name || !payload.email) {
    return errorResponse('缺少必填字段:公司 / 姓名 / 邮箱', 400);
  }
  if (!/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(payload.email)) {
    return errorResponse('邮箱格式不正确', 400);
  }

  // 通知不阻塞响应:用户立即拿到 200,通知在后台 fire-and-forget
  waitUntil(
    notifyLead(env, {
      company: payload.company,
      name: payload.name,
      title: payload.title,
      email: payload.email,
      phone: payload.phone,
      products: payload.products,
      scale: payload.scale,
      timing: payload.timing,
      message: payload.message,
      utmSource: payload.utmSource,
    }),
  );

  return okResponse({ message: '已收到,我们会在 24 小时内回复' });
};
