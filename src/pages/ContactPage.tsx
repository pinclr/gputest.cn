import { useState, type FormEvent } from 'react';
import { CheckCircle2, MessageSquare, Phone, Mail, QrCode } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

const PRODUCT_OPTIONS = [
  { value: 'self-serve', label: '免费自测 + 50 元解读' },
  { value: 'acceptance', label: 'AIDC 项目验收' },
  { value: 'health-audit', label: '集群健康审计' },
  { value: 'model-quality', label: '模型质量评测' },
  { value: 'network-testing', label: 'IB / RoCE 网络测试' },
  { value: 'storage-testing', label: '智算存储测试' },
  { value: 'security-testing', label: '安全与合规测试' },
  { value: 'single-node', label: '单机批量测试' },
  { value: 'domestic', label: '国产卡专项' },
  { value: 'other', label: '其他 / 不确定' },
];

const SCALE_OPTIONS = [
  { value: '<32', label: '< 32 卡 / 单机' },
  { value: '32-256', label: '32–256 卡' },
  { value: '256-2048', label: '256–2048 卡' },
  { value: '>2048', label: '2048+ 卡' },
];

import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function ContactPage() {
  useDocumentTitle(
    '项目咨询 · 联系我们',
    '留下贵司、邮箱、规模与时间窗,24 小时内回复。或扫码加企业微信、关注公众号。',
  );
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    // V2 接 Worker → CRM。先做前端模拟。
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <>
      <PageHero
        eyebrow="联系我们 · 项目咨询"
        title="提交贵司信息与项目背景,24 小时内反馈"
        desc="自助跑测 V2 等候名单同样使用此通道,在留言中标注「Waitlist」即可。"
        tone="amber"
      />

      <section className="border-t border-border">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20">
          {/* 左:表单 */}
          <div>
            {submitted ? (
              <div className="surface flex flex-col items-center gap-4 p-12 text-center">
                <CheckCircle2
                  className="h-12 w-12 text-status-ok"
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl font-semibold tracking-tight">已收到,谢谢</h3>
                <p className="max-w-md text-ink-muted">
                  我们会在 24 小时内通过邮件 / 企微回复。如果是紧急项目 (本周内启动),也可以直接扫描右侧企微二维码加我。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="surface p-8">
                <div className="grid gap-5">
                  <div className="grid gap-1.5">
                    <Label required>公司名称</Label>
                    <input
                      required
                      type="text"
                      placeholder="北京 XX 科技有限公司"
                      className="input"
                    />
                  </div>

                  <div className="grid gap-1.5 md:grid-cols-2 md:gap-5">
                    <div className="grid gap-1.5">
                      <Label required>姓名</Label>
                      <input required type="text" placeholder="您的称呼" className="input" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>职位</Label>
                      <input
                        type="text"
                        placeholder="如:基础设施负责人"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5 md:grid-cols-2 md:gap-5">
                    <div className="grid gap-1.5">
                      <Label required>邮箱</Label>
                      <input
                        required
                        type="email"
                        placeholder="you@company.com"
                        className="input"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>手机 / 微信</Label>
                      <input
                        type="text"
                        placeholder="可留手机或微信号"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label required>感兴趣的产品线</Label>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_OPTIONS.map((p) => (
                        <label
                          key={p.value}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-bg-surface px-3 py-1.5 text-sm text-ink-muted has-[:checked]:border-accent-amber has-[:checked]:bg-accent-amber/10 has-[:checked]:text-accent-amber"
                        >
                          <input
                            type="checkbox"
                            name="product"
                            value={p.value}
                            className="hidden"
                          />
                          {p.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label>集群规模</Label>
                    <div className="flex flex-wrap gap-2">
                      {SCALE_OPTIONS.map((s) => (
                        <label
                          key={s.value}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-bg-surface px-3 py-1.5 text-sm text-ink-muted has-[:checked]:border-accent-violet has-[:checked]:bg-accent-violet/10 has-[:checked]:text-accent-violet"
                        >
                          <input
                            type="radio"
                            name="scale"
                            value={s.value}
                            className="hidden"
                          />
                          {s.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label>期望时间窗</Label>
                    <input
                      type="text"
                      placeholder="如:本月内启动 / 下季度立项"
                      className="input"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label>项目背景与需求</Label>
                    <textarea
                      rows={4}
                      placeholder="请简述卡型、网络、合同 KPI、关心的问题等。越具体我们的方案越精准。"
                      className="input resize-y"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg transition-colors hover:bg-accent-amber/90 disabled:opacity-60"
                >
                  {pending ? '提交中…' : '提交咨询'}
                </button>
                <p className="mt-3 text-center text-[11px] text-ink-dim">
                  提交即表示您同意我们按 NDA 标准条款处理您的信息,绝不外泄。
                </p>
              </form>
            )}
          </div>

          {/* 右:其他联系方式 */}
          <aside className="space-y-4">
            <div className="surface p-6">
              <h3 className="text-base font-semibold">紧急项目</h3>
              <p className="mt-2 text-sm text-ink-muted">
                本周内需要启动的项目,可以直接走以下任一通道。
              </p>
              <div className="mt-4 space-y-3">
                <ContactRow icon={QrCode} label="企业微信" value="扫描下方二维码" tone="violet" />
                <ContactRow icon={Mail} label="邮箱" value="sales@gputest.cn" tone="amber" />
                <ContactRow icon={Phone} label="电话" value="工作日 9:30–18:30" tone="steel" />
                <ContactRow
                  icon={MessageSquare}
                  label="公众号"
                  value="GPUTest 核芯 · 关注后留言"
                  tone="violet"
                />
              </div>
            </div>

            <div className="surface p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                企微二维码
              </div>
              <div className="mt-3 grid h-44 w-full place-items-center rounded-md border border-border bg-bg text-xs text-ink-dim">
                企微活码占位 · 部署前生成
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                扫码加销售个人企微,提交表单后会自动弹出此码,我们 1v1 跟进。
              </p>
            </div>

            <div className="surface p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                公众号
              </div>
              <div className="mt-3 grid h-32 w-full place-items-center rounded-md border border-border bg-bg text-xs text-ink-dim">
                公众号二维码占位
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                关注公众号 GPUTest 核芯,周一 / 三 / 五 更新方法学与实测内容。
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* 内联样式 — 表单输入框统一 */}
      <style>{`
        .input {
          width: 100%;
          height: 2.75rem;
          padding: 0 0.875rem;
          border-radius: 0.5rem;
          border: 1px solid rgb(31 53 86);
          background: rgb(15 30 54 / 0.6);
          color: rgb(232 238 247);
          font-size: 0.875rem;
          transition: border-color 150ms;
        }
        textarea.input { height: auto; padding: 0.625rem 0.875rem; line-height: 1.5; }
        .input::placeholder { color: rgb(95 122 158); }
        .input:focus {
          outline: none;
          border-color: rgb(229 161 0);
          background: rgb(15 30 54);
        }
      `}</style>
    </>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
      {children}
      {required && <span className="ml-1 text-accent-amber">*</span>}
    </label>
  );
}

interface ContactRowProps {
  icon: typeof Phone;
  label: string;
  value: string;
  tone: 'amber' | 'violet' | 'steel';
}

const TONE_FG: Record<ContactRowProps['tone'], string> = {
  amber: 'text-accent-amber',
  violet: 'text-accent-violet',
  steel: 'text-pillar-performance',
};

function ContactRow({ icon: Icon, label, value, tone }: ContactRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`grid h-8 w-8 place-items-center rounded ${TONE_FG[tone]} bg-bg-elevated`}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div>
        <div className="text-xs text-ink-dim">{label}</div>
        <div className="text-sm text-ink">{value}</div>
      </div>
    </div>
  );
}
