import { errorResponse, okResponse, type PagesHandler } from '../../_lib/types';
import { checkAdmin } from '../../_lib/auth';
import { uploadImage } from '../../_lib/wechat';

/**
 * 把图片上传到公众号永久素材库,返回 media_id
 *   - admin 校验
 *   - multipart/form-data,字段 file
 *   - 用于:文章封面、正文配图(公众号正文图必须从公众号侧 url)
 */
export const onRequestPost: PagesHandler = async ({ request, env }) => {
  if (!checkAdmin(request, env)) {
    return errorResponse('未授权', 401);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return errorResponse('请求体不是合法 multipart/form-data', 400);
  }

  const file = form.get('file');
  if (!(file instanceof Blob)) {
    return errorResponse('缺少 file 字段', 400);
  }
  const filename = (form.get('filename') as string) || 'upload.png';

  try {
    const mediaId = await uploadImage(env, file, filename);
    return okResponse({ mediaId });
  } catch (e) {
    return errorResponse((e as Error).message || '上传失败', 500);
  }
};
