import { errorResponse, okResponse, type PagesHandler } from '../../_lib/types';
import { checkAdmin } from '../../_lib/auth';
import { addDraft, freepublishSubmit } from '../../_lib/wechat';

interface PushPayload {
  /** 文章标题 */
  title: string;
  /** 完整 inline-style HTML(由前端公众号导出器生成) */
  contentHtml: string;
  /** 摘要,服务号会显示 */
  digest?: string;
  /** 封面图 media_id(必须先上传) */
  thumbMediaId: string;
  /** 原文链接(可选) */
  contentSourceUrl?: string;
  /** 操作类型:仅建草稿 / 草稿+群发 */
  action: 'draft' | 'publish';
}

/**
 * 推送文章到公众号
 *   - admin token 校验
 *   - 仅草稿:用户可在公众号后台预览并手动审核发送
 *   - 草稿 + 群发:订阅号 freepublish 接口(每日 1 次群发限制)
 */
export const onRequestPost: PagesHandler = async ({ request, env }) => {
  if (!checkAdmin(request, env)) {
    return errorResponse('未授权', 401);
  }

  let payload: PushPayload;
  try {
    payload = (await request.json()) as PushPayload;
  } catch {
    return errorResponse('请求体不是合法 JSON', 400);
  }

  if (!payload.title || !payload.contentHtml || !payload.thumbMediaId) {
    return errorResponse('缺少必填:title / contentHtml / thumbMediaId', 400);
  }

  try {
    const draftMediaId = await addDraft(env, [
      {
        title: payload.title,
        author: 'GPUTest 核芯',
        digest: payload.digest ?? '',
        content: payload.contentHtml,
        contentSourceUrl: payload.contentSourceUrl ?? '',
        thumbMediaId: payload.thumbMediaId,
      },
    ]);

    if (payload.action === 'draft') {
      return okResponse({ draftMediaId, action: 'draft' });
    }

    // action === 'publish'
    const publishId = await freepublishSubmit(env, draftMediaId);
    return okResponse({ draftMediaId, publishId, action: 'publish' });
  } catch (e) {
    return errorResponse((e as Error).message || '推送失败', 500);
  }
};
