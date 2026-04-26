import type { Env } from './types';

/**
 * 飞书 / 企微群机器人通知
 *
 * 配置项(阿里云 FC 控制台环境变量):
 *   - LARK_BOT_WEBHOOK    飞书自定义机器人 webhook URL(主)
 *   - WEWORK_BOT_WEBHOOK  企微群机器人(可选,作为备份/双投)
 *
 * 飞书机器人需要在群里"添加自定义机器人",拿到 https://open.feishu.cn/open-apis/bot/v2/hook/<token> URL。
 * 安全设置建议:打开"签名校验"或"关键词"防滥用(本工具暂未集成签名,后续按需扩展)。
 */

export interface LeadFields {
  company: string;
  name: string;
  title?: string;
  email: string;
  phone?: string;
  products?: string[];
  scale?: string;
  timing?: string;
  message?: string;
  utmSource?: string;
}

/**
 * 推送线索卡片到飞书群
 * 卡片样式:蓝色 header + 双列 fields + 留言 div + "回复邮件" 按钮
 */
export async function notifyLarkLead(env: Env, lead: LeadFields): Promise<void> {
  if (!env.LARK_BOT_WEBHOOK) return;

  const fields: { is_short: boolean; text: { tag: string; content: string } }[] = [];
  const push = (label: string, value: string | undefined, short = true) => {
    if (!value) return;
    fields.push({
      is_short: short,
      text: { tag: 'lark_md', content: `**${label}**\n${value}` },
    });
  };

  push('公司', lead.company);
  push('姓名', lead.title ? `${lead.name} (${lead.title})` : lead.name);
  push('邮箱', lead.email);
  push('手机 / 微信', lead.phone);
  push('产品线', lead.products?.join(' · '), false);
  push('规模', lead.scale);
  push('时间窗', lead.timing);
  push('来源', lead.utmSource);

  const elements: unknown[] = [
    { tag: 'div', fields },
    { tag: 'hr' },
  ];

  if (lead.message) {
    elements.push({
      tag: 'div',
      text: {
        tag: 'lark_md',
        content: `**留言**\n${lead.message.replace(/\n/g, '\n\n')}`,
      },
    });
    elements.push({ tag: 'hr' });
  }

  elements.push({
    tag: 'action',
    actions: [
      {
        tag: 'button',
        text: { tag: 'plain_text', content: '邮件回复' },
        type: 'primary',
        url: `mailto:${lead.email}?subject=Re%3A%20GPUTest%20%E9%A1%B9%E7%9B%AE%E5%92%A8%E8%AF%A2&body=${encodeURIComponent('您好' + lead.name + ',\n\n感谢您的咨询。\n\n')}`,
      },
      {
        tag: 'button',
        text: { tag: 'plain_text', content: '查看官网' },
        type: 'default',
        url: 'https://gputest.cn',
      },
    ],
  });

  const card = {
    msg_type: 'interactive',
    card: {
      config: { wide_screen_mode: true, enable_forward: true },
      header: {
        title: { tag: 'plain_text', content: '🎯 新咨询线索 · GPUTest' },
        template: 'blue',
      },
      elements,
    },
  };

  await fetch(env.LARK_BOT_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
}

/**
 * 兼容旧的企微通道(若环境变量 WEWORK_BOT_WEBHOOK 配置则双发)
 */
export async function notifyWeWorkLead(env: Env, lead: LeadFields): Promise<void> {
  if (!env.WEWORK_BOT_WEBHOOK) return;

  const lines: string[] = [
    `## 新咨询线索`,
    ``,
    `**公司**:${lead.company}`,
    `**姓名**:${lead.title ? `${lead.name} (${lead.title})` : lead.name}`,
    `**邮箱**:${lead.email}`,
    lead.phone ? `**手机/微信**:${lead.phone}` : '',
    lead.products?.length ? `**产品线**:${lead.products.join(' · ')}` : '',
    lead.scale ? `**规模**:${lead.scale}` : '',
    lead.timing ? `**期望时间窗**:${lead.timing}` : '',
    lead.utmSource ? `**来源**:${lead.utmSource}` : '',
    lead.message ? `\n**留言**\n> ${lead.message.replace(/\n/g, '\n> ')}` : '',
  ].filter(Boolean);

  await fetch(env.WEWORK_BOT_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: { content: lines.join('\n') },
    }),
  });
}

export async function notifyLead(env: Env, lead: LeadFields): Promise<void> {
  // 双发,任一失败不影响另一边
  await Promise.allSettled([notifyLarkLead(env, lead), notifyWeWorkLead(env, lead)]);
}
