import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionWrap } from '@/components/solution/SectionWrap';
import { SolutionFooter } from '@/components/solution/SolutionFooter';
import { cn } from '@/lib/utils';

export interface HubProduct {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  range?: string;
  /** 标签:主推 / 入门 / 即将上线 */
  tag?: 'primary' | 'intro' | 'coming';
}

export interface TestingHubProps {
  /** 一级类别名,如"节点测试" */
  category: string;
  /** 英文 */
  categoryEn: string;
  /** Hero 标题 */
  title: string;
  /** Hero 描述 */
  desc: string;
  tone: 'amber' | 'violet' | 'steel';
  /** 测试范围(简洁列表) */
  scope: { label: string; items: string[] }[];
  /** 该维度下的具体 SKU / 方案 */
  products: HubProduct[];
}

const TAG_STYLE: Record<NonNullable<HubProduct['tag']>, { bg: string; text: string; label: string }> = {
  primary: { bg: 'bg-accent-amber/15', text: 'text-accent-amber', label: '主推' },
  intro: { bg: 'bg-status-ok/15', text: 'text-status-ok', label: '入门' },
  coming: { bg: 'bg-bg-elevated', text: 'text-ink-dim', label: '即将上线' },
};

export function TestingHub({
  category,
  categoryEn,
  title,
  desc,
  tone,
  scope,
  products,
}: TestingHubProps) {
  return (
    <>
      <PageHero
        eyebrow={`测试分类 · ${category}`}
        title={title}
        desc={desc}
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '查看测试方法', to: '/methodology' }}
        tone={tone}
      >
        <div className="surface p-5">
          <div className="flex items-baseline justify-between">
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              {category}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              {categoryEn}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {scope.slice(0, 4).map((s) => (
              <div key={s.label} className="rounded border border-border bg-bg-elevated p-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-ink-muted">
                  {s.items.slice(0, 2).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <SectionWrap
        eyebrow="01 · 包含的测试方案"
        title={`${category}下的具体 SKU`}
        desc={`${category}维度下,我方提供以下产品。每个 SKU 均独立报价、独立 SOW,可单独签约或组合执行。`}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const isComing = p.tag === 'coming';
            const Wrapper = (props: { children: React.ReactNode; className: string }) =>
              isComing ? (
                <div className={props.className}>{props.children}</div>
              ) : (
                <Link to={p.href} className={props.className}>
                  {props.children}
                </Link>
              );
            return (
              <Wrapper
                key={p.href}
                className={cn(
                  'surface group flex flex-col gap-3 p-6',
                  !isComing && 'surface-hover',
                  isComing && 'opacity-70',
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent-violet/10 text-accent-violet">
                    <p.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  {p.tag && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest',
                        TAG_STYLE[p.tag].bg,
                        TAG_STYLE[p.tag].text,
                      )}
                    >
                      {TAG_STYLE[p.tag].label}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="flex-1 text-sm leading-6 text-ink-muted">{p.desc}</p>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-mono text-xs text-ink-dim">{p.range ?? '—'}</span>
                  {!isComing && (
                    <ArrowRight className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </SectionWrap>

      <SectionWrap eyebrow="02 · 测试范围" title={`${category}的核心维度`} alt>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {scope.map((s) => (
            <div key={s.label} className="surface p-5">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                {s.label}
              </div>
              <ul className="mt-3 space-y-1.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-ink-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-dim" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SolutionFooter
        title={`${category} · 中立第三方测试服务`}
        desc={`基于业界标准工具与公开方法学,出具可签字、可审计的${category}报告。`}
      />
    </>
  );
}
