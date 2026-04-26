import { useMemo, useState } from 'react';
import { Boxes, Clock, FileText } from 'lucide-react';
import { RollingNumber } from '@/components/effects/RollingNumber';
import { cn } from '@/lib/utils';

type Vendor = 'nvidia' | 'domestic';
type Tier = 'standard' | 'plus';

const BASE_PRICE: Record<Vendor, Record<Tier, number>> = {
  nvidia: { standard: 1200, plus: 2000 },
  domestic: { standard: 1500, plus: 2800 },
};

const TIER_INFO: Record<Tier, { name: string; desc: string; sla: string }> = {
  standard: {
    name: '基础套餐',
    desc: 'DCGM Diag + gpu-burn 8h + cuda_memtest + nvbandwidth + IPMI 整机',
    sla: '48 小时',
  },
  plus: {
    name: '进阶套餐',
    desc: '基础全套 + Field Diag + 24h 真实负载 soak + 模型质量基线 (MMLU / GSM8K)',
    sla: '72 小时',
  },
};

function discount(qty: number) {
  if (qty >= 50) return { rate: 0.8, label: '50 台量贩 8 折' };
  if (qty >= 10) return { rate: 0.9, label: '10 台量贩 9 折' };
  return { rate: 1, label: '' };
}

export function SingleNodePricer() {
  const [vendor, setVendor] = useState<Vendor>('nvidia');
  const [tier, setTier] = useState<Tier>('standard');
  const [qty, setQty] = useState(8);

  const { unit, total, disc } = useMemo(() => {
    const base = BASE_PRICE[vendor][tier];
    const d = discount(qty);
    const unit = Math.round(base * d.rate);
    return { unit, total: unit * qty, disc: d };
  }, [vendor, tier, qty]);

  return (
    <div className="surface overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        {/* 左:配置区 */}
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
            报价计算器
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            选 GPU 类型、套餐、数量
          </h3>

          {/* 卡型 */}
          <div className="mt-6">
            <Label>GPU 类型</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Pill active={vendor === 'nvidia'} onClick={() => setVendor('nvidia')}>
                NVIDIA B200/H200/H100/H20/A100/5090
              </Pill>
              <Pill active={vendor === 'domestic'} onClick={() => setVendor('domestic')}>
                国产卡 (昇腾 / 海光 / 寒武纪 / MTT)
              </Pill>
            </div>
          </div>

          {/* 套餐 */}
          <div className="mt-6">
            <Label>套餐</Label>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              {(['standard', 'plus'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={cn(
                    'rounded-lg border px-4 py-3 text-left transition-all',
                    tier === t
                      ? 'border-accent-amber bg-accent-amber/8'
                      : 'border-border bg-bg hover:border-border-strong',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{TIER_INFO[t].name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                      {TIER_INFO[t].sla}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-ink-muted">{TIER_INFO[t].desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 数量 */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <Label>送测数量</Label>
              <div className="flex items-baseline gap-1">
                <RollingNumber
                  value={qty}
                  pad={3}
                  className="text-xl font-semibold text-ink"
                />
                <span className="text-xs text-ink-dim">台</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={200}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="mt-3 w-full accent-accent-amber"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-dim">
              <span>1</span>
              <span>10 (-10%)</span>
              <span>50 (-20%)</span>
              <span>200</span>
            </div>
          </div>
        </div>

        {/* 右:总价区 */}
        <div className="bg-bg-elevated/40 p-6">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
            预估总价
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-ink">¥</span>
            <RollingNumber
              value={total}
              separator
              className="text-5xl font-bold text-ink"
            />
          </div>
          <div className="mt-2 font-mono text-xs text-ink-dim">
            ¥<RollingNumber value={unit} separator className="text-xs text-ink-muted" /> /台 × {qty} 台
            {disc.label && <span className="ml-2 text-accent-amber">· {disc.label}</span>}
          </div>

          <div className="mt-6 space-y-3">
            <Row icon={Clock} label="工期 SLA">
              {TIER_INFO[tier].sla}内出报告
            </Row>
            <Row icon={FileText} label="报告交付">
              N 份单机 PDF + 1 份汇总 Excel
            </Row>
            <Row icon={Boxes} label="发货">
              客户寄送 / 我方上门取件 / 远程驻场可选
            </Row>
          </div>

          <a
            href="/contact"
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
          >
            提交送测
          </a>
          <p className="mt-3 text-center text-[11px] text-ink-dim">
            ≥ 100 台月度合约可谈 7 折,联系销售
          </p>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{children}</div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md border px-3 py-2.5 text-xs transition-all',
        active
          ? 'border-accent-amber bg-accent-amber/8 text-ink'
          : 'border-border bg-bg text-ink-muted hover:border-border-strong hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0">
      <div className="flex items-center gap-2 text-xs text-ink-dim">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        {label}
      </div>
      <div className="text-right text-xs text-ink-muted">{children}</div>
    </div>
  );
}
