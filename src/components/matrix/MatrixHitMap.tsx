import {
  MATRIX,
  PILLAR_COLOR,
  PILLAR_LABEL,
  SCALE_LABEL,
  type CellKey,
} from '@/data/matrix';
import { cn } from '@/lib/utils';

interface MatrixHitMapProps {
  /** 命中的格子（实心展示），未命中格子置灰 */
  hit: CellKey[];
  title?: string;
}

/** 紧凑命中图 — 用于解决方案页顶部，让客户一眼看出范围边界 */
export function MatrixHitMap({ hit, title = '本方案命中的测试范围' }: MatrixHitMapProps) {
  const hitSet = new Set(hit);

  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-medium text-ink">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
          3 支柱 × 2 层级 — 命中 {hit.length} / 6
        </span>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-[80px_1fr_1fr] gap-1.5 pb-1.5">
          <div />
          <div className="text-center text-[11px] uppercase tracking-widest text-ink-dim">
            {SCALE_LABEL.single}
          </div>
          <div className="text-center text-[11px] uppercase tracking-widest text-ink-dim">
            {SCALE_LABEL.cluster}
          </div>
        </div>
        <div className="space-y-1.5">
          {(['stability', 'performance', 'quality'] as const).map((pillar) => {
            const c = PILLAR_COLOR[pillar];
            return (
              <div key={pillar} className="grid grid-cols-[80px_1fr_1fr] items-center gap-1.5">
                <div className={cn('flex items-center gap-1.5 text-xs', c.text)}>
                  <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
                  {PILLAR_LABEL[pillar]}
                </div>
                {(['single', 'cluster'] as const).map((scale) => {
                  const cell = MATRIX.find((m) => m.pillar === pillar && m.scale === scale)!;
                  const isHit = hitSet.has(cell.key);
                  return (
                    <div
                      key={cell.key}
                      className={cn(
                        'flex h-9 items-center gap-2 rounded border px-2.5 text-xs transition-colors',
                        isHit
                          ? `${c.border} ${c.bg} ${c.text}`
                          : 'border-border bg-bg/40 text-ink-dim',
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-2 w-2 rounded-full',
                          isHit ? c.dot : 'bg-ink-dim/30',
                        )}
                      />
                      <span className="truncate">{cell.title}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
