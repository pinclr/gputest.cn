import { useState } from 'react';
import { MATRIX, PILLAR_COLOR, PILLAR_LABEL, SCALE_LABEL, type CellKey, type MatrixCell } from '@/data/matrix';
import { cn } from '@/lib/utils';

interface MatrixGridProps {
  /** 紧凑模式用于 hero 内嵌；详细模式用于方法学页 */
  density?: 'compact' | 'detailed';
  /** 选中态：用于受控展开 */
  activeKey?: CellKey;
  onCellHover?: (key: CellKey | null) => void;
}

export function MatrixGrid({ density = 'compact', activeKey, onCellHover }: MatrixGridProps) {
  const [hovered, setHovered] = useState<CellKey | null>(null);
  const active = activeKey ?? hovered;

  return (
    <div className="w-full">
      {/* 列表头：单机 / 集群 */}
      <div className="grid grid-cols-[64px_1fr_1fr] gap-2 pb-2">
        <div />
        <ColHeader label={SCALE_LABEL.single} />
        <ColHeader label={SCALE_LABEL.cluster} />
      </div>

      {/* 行：每行一个支柱 */}
      <div className="space-y-2">
        {(['stability', 'performance', 'quality'] as const).map((pillar) => (
          <div key={pillar} className="grid grid-cols-[64px_1fr_1fr] items-stretch gap-2">
            <RowLabel pillar={pillar} />
            {(['single', 'cluster'] as const).map((scale) => {
              const cell = MATRIX.find((c) => c.pillar === pillar && c.scale === scale)!;
              return (
                <Cell
                  key={cell.key}
                  cell={cell}
                  density={density}
                  active={active === cell.key}
                  onHover={(hovered) => {
                    setHovered(hovered ? cell.key : null);
                    onCellHover?.(hovered ? cell.key : null);
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ColHeader({ label }: { label: string }) {
  return (
    <div className="text-center text-[11px] font-medium uppercase tracking-widest text-ink-dim">
      {label}
    </div>
  );
}

function RowLabel({ pillar }: { pillar: 'stability' | 'performance' | 'quality' }) {
  const c = PILLAR_COLOR[pillar];
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <span className={cn('h-2 w-2 rounded-full', c.dot)} />
      <span
        className={cn('text-[11px] font-medium tracking-wider', c.text)}
        style={{ writingMode: 'vertical-rl' }}
      >
        {PILLAR_LABEL[pillar]}
      </span>
    </div>
  );
}

interface CellProps {
  cell: MatrixCell;
  density: 'compact' | 'detailed';
  active: boolean;
  onHover: (hovered: boolean) => void;
  /** 移动端使用:在卡片内显示支柱标签(因为没有左侧 RowLabel) */
  showPillarBadge?: boolean;
}

function Cell({ cell, density, active, onHover, showPillarBadge }: CellProps) {
  const c = PILLAR_COLOR[cell.pillar];
  const pillarLabel =
    cell.pillar === 'stability' ? '稳定性' : cell.pillar === 'performance' ? '性能' : '模型质量';
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-bg-surface p-4 transition-all',
        c.border,
        active
          ? 'border-opacity-100 bg-bg-elevated shadow-[0_0_0_1px_rgba(139,92,246,0.15)]'
          : 'hover:border-opacity-100 hover:bg-bg-elevated',
      )}
    >
      {/* 顶部色条 */}
      <div className={cn('absolute left-0 right-0 top-0 h-[2px]', c.dot)} />

      {/* 移动端支柱徽章 */}
      {showPillarBadge && (
        <div className={cn('mb-2 flex items-center gap-1.5 text-[11px] font-medium', c.text)}>
          <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
          {pillarLabel}
        </div>
      )}

      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-ink">{cell.title}</h3>
        <span className={cn('font-mono text-[10px] uppercase tracking-wider', c.text)}>
          {cell.scale === 'single' ? 'S/N' : 'CLUSTER'}
        </span>
      </div>

      {/* 摘要（仅 detailed 或激活态展示） */}
      {(density === 'detailed' || active) && (
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-ink-muted">{cell.summary}</p>
      )}

      {/* 关键项 */}
      <ul className="mt-3 space-y-1">
        {cell.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs leading-5 text-ink-muted">
            <span className={cn('mt-1.5 h-1 w-1 shrink-0 rounded-full', c.dot)} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* 工具徽章（仅 detailed 或激活态展示） */}
      {(density === 'detailed' || active) && (
        <div className="mt-3 flex flex-wrap gap-1">
          {cell.tools.map((tool) => (
            <span
              key={tool}
              className={cn(
                'rounded border px-1.5 py-0.5 font-mono text-[10px]',
                c.border,
                c.text,
              )}
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
