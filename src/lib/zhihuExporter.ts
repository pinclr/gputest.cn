/**
 * 知乎 markdown 导出器
 *
 * 知乎专栏编辑器支持直接粘贴 markdown(在编辑模式下 Ctrl/Cmd+V),
 * 表头、列表、引文、代码块、链接均可被识别。因此与公众号不同,
 * 知乎不需要 inline-style 转换,只需在原 markdown 末尾加一段品牌 footer。
 *
 * 注意:
 *   - 知乎对图片要求从知乎相册上传,本工具保留 [图N] 占位文本,
 *     发布时由作者在编辑器中插入图片。
 *   - 知乎不支持 H1(会被自动降级),建议正文最高用 H2,本工具
 *     不强行降级,保留作者原意,作者可手动调整。
 *   - 知乎链接会自动加 nofollow,外链可正常出现但无 SEO 价值。
 */

export interface ZhihuExportOptions {
  /** 是否附"关于 GPUTest"页脚 */
  appendFooter?: boolean;
  /** 文章标题,用于生成置顶引子(可选) */
  title?: string;
}

const FOOTER = `

---

> **关于 GPUTest · 核芯**
> 北京品晰科技有限公司(2021)旗下 GPU 集群测试与验收品牌。
> 中立第三方 · 方法学公开 · 报告可审计。
>
> 业务线:节点 · 集群 · 网络 · 存储 · 平台 五大测试维度。
> 工具公开、报告可签字、数据可独立复核。
>
> 🔗 官网 [gputest.cn](https://gputest.cn) · ✉️ sales@gputest.cn
> 关注公众号「GPUTest 核芯」,周一 / 三 / 五 更新方法学与实测内容。
`;

export function exportToZhihuMarkdown(
  markdown: string,
  opts: ZhihuExportOptions = {},
): string {
  const body = markdown.trim();
  return opts.appendFooter === false ? body : body + FOOTER;
}
