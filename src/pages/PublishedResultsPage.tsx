import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Filter, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import {
  PUBLISHED_RESULTS,
  CATEGORY_LABEL,
  STATUS_LABEL,
  STATUS_STYLE,
  type TestCategory,
  type Vendor,
  type Industry,
  type TestStatus,
} from '@/data/published';
import { cn } from '@/lib/utils';

export function PublishedResultsPage() {
  useDocumentTitle(
    '公开测试结果 · 透明度公示',
    'GPUTest 已交付且经客户授权公开的测试结果元信息。仅含编号、时间、维度、卡型、规模区间与结论摘要,严禁含客户名、精确数值或敏感数据。',
  );

  const [category, setCategory] = useState<TestCategory | 'all'>('all');
  const [vendor, setVendor] = useState<Vendor | 'all'>('all');
  const [industry, setIndustry] = useState<Industry | 'all'>('all');
  const [status, setStatus] = useState<TestStatus | 'all'>('all');

  const filtered = useMemo(() => {
    return PUBLISHED_RESULTS.filter((r) => {
      if (category !== 'all' && r.category !== category) return false;
      if (vendor !== 'all' && r.vendor !== vendor) return false;
      if (industry !== 'all' && r.industry !== industry) return false;
      if (status !== 'all' && r.status !== status) return false;
      return true;
    });
  }, [category, vendor, industry, status]);

  const stats = useMemo(() => {
    const total = PUBLISHED_RESULTS.length;
    const byCategory = PUBLISHED_RESULTS.reduce<Record<string, number>>((acc, r) => {
      acc[r.category] = (acc[r.category] ?? 0) + 1;
      return acc;
    }, {});
    return { total, byCategory };
  }, []);

  const allVendors: Vendor[] = ['NVIDIA', '昇腾', '海光', '寒武纪', '摩尔线程', '混合'];
  const allIndustries: Industry[] = [
    '智算 / IDC',
    '金融',
    '政企 / 央企',
    '互联网',
    '服务器经销',
    '算力出租',
    '高校 / 科研',
  ];

  return (
    <>
      <PageHero
        eyebrow="公开测试结果 · 透明度公示"
        title={`${stats.total} 份已交付测试报告的元信息公开`}
        desc="本页列出所有经客户书面授权对外可见的测试编号、时间、维度、卡型、规模区间与结论摘要。客户名称、原始 telemetry、精确指标因 NDA 约束不公开,详细案例请见客户案例页。"
        primaryCta={{ label: '项目咨询', to: '/contact' }}
        secondaryCta={{ label: '查看深度案例', to: '/cases' }}
        tone="steel"
      >
        <div className="surface p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
            <ShieldCheck className="h-4 w-4" />
            分类统计
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(Object.keys(CATEGORY_LABEL) as TestCategory[]).map((c) => (
              <div
                key={c}
                className="flex items-center justify-between rounded border border-border bg-bg-elevated px-2.5 py-1.5"
              >
                <span className="text-xs text-ink-muted">{CATEGORY_LABEL[c]}</span>
                <span className="font-mono text-sm font-semibold text-ink">
                  {stats.byCategory[c] ?? 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="border-t border-border">
        <div className="container-x py-12 lg:py-16">
          {/* 筛选 */}
          <div className="surface space-y-4 p-5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              <Filter className="h-3.5 w-3.5" /> 筛选
            </div>
            <FilterRow
              label="测试维度"
              value={category}
              setValue={setCategory}
              options={[
                { value: 'all', label: '全部' },
                ...(Object.keys(CATEGORY_LABEL) as TestCategory[]).map((c) => ({
                  value: c,
                  label: CATEGORY_LABEL[c],
                })),
              ]}
            />
            <FilterRow
              label="GPU 厂商"
              value={vendor}
              setValue={setVendor}
              options={[
                { value: 'all', label: '全部' },
                ...allVendors.map((v) => ({ value: v, label: v })),
              ]}
            />
            <FilterRow
              label="行业"
              value={industry}
              setValue={setIndustry}
              options={[
                { value: 'all', label: '全部' },
                ...allIndustries.map((i) => ({ value: i, label: i })),
              ]}
            />
            <FilterRow
              label="状态"
              value={status}
              setValue={setStatus}
              options={[
                { value: 'all', label: '全部' },
                { value: 'pass', label: '一次通过' },
                { value: 'partial', label: '部分达标' },
                { value: 'remediated', label: '整改后达标' },
              ]}
            />
          </div>

          {/* 表格 */}
          <div className="surface mt-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-bg-elevated text-left text-[11px] uppercase tracking-widest text-ink-muted">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 font-medium">编号</th>
                    <th className="px-4 py-3 font-medium">日期</th>
                    <th className="px-4 py-3 font-medium">测试维度</th>
                    <th className="px-4 py-3 font-medium">卡型</th>
                    <th className="px-4 py-3 font-medium">规模</th>
                    <th className="px-4 py-3 font-medium">行业</th>
                    <th className="px-4 py-3 font-medium">结论摘要</th>
                    <th className="px-4 py-3 font-medium">状态</th>
                    <th className="px-4 py-3 font-medium">工期</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-border last:border-b-0 hover:bg-bg-elevated/40"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-ink">{r.id}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-muted">
                        {r.publishDate}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                          {CATEGORY_LABEL[r.category]}
                        </span>
                        <div className="mt-1 text-xs text-ink-muted">{r.testType}</div>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <div className="font-mono text-ink">{r.vendor}</div>
                        <div className="mt-0.5 font-mono text-[11px] text-ink-muted">
                          {r.models.join(' · ')}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-muted">
                        {r.scaleRange}
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-muted">{r.industry}</td>
                      <td className="px-4 py-3 text-xs text-ink">{r.resultSummary}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-block rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest',
                            STATUS_STYLE[r.status],
                          )}
                        >
                          {STATUS_LABEL[r.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-dim">
                        {r.durationDays} 天
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-ink-muted">当前筛选无匹配结果</div>
            )}
          </div>

          <p className="mt-4 text-xs text-ink-dim">
            * 本表持续更新。每个新交付项目在客户书面授权后纳入。深度案例(含整改前后对照、客户原话)请见{' '}
            <Link to="/cases" className="text-accent-amber hover:underline">
              客户案例
            </Link>
            。报告原文 / 原始数据按 NDA 约定不公开。
          </p>

          <div className="surface mt-10 flex flex-col items-start gap-3 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">需要查看与您行业匹配的更多结果?</h3>
              <p className="mt-1 text-sm text-ink-muted">
                部分行业仍有未公开的交付项目,可于保密会议中以匿名形式介绍。
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
            >
              申请保密会议
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface FilterRowProps<T extends string> {
  label: string;
  value: T | 'all';
  setValue: (v: T | 'all') => void;
  options: { value: T | 'all'; label: string }[];
}

function FilterRow<T extends string>({ label, value, setValue, options }: FilterRowProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setValue(o.value as T | 'all')}
          className={cn(
            'rounded-full border px-2.5 py-1 text-xs transition-colors',
            value === o.value
              ? 'border-accent-amber bg-accent-amber/10 text-accent-amber'
              : 'border-border bg-bg-surface text-ink-muted hover:border-border-strong hover:text-ink',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
