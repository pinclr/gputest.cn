import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RollingNumberProps {
  value: number;
  /** 千分位 */
  separator?: boolean;
  /** 固定整数位数（前补 0），用于"滚轮"感 */
  pad?: number;
  className?: string;
  digitClassName?: string;
}

/**
 * 数字滚动反转：每位数字独立翻牌，仿机场 / 电子时钟翻页效果。
 * 数字变化时只滚动改变的那几位，沉默稳定时 0 渲染开销。
 */
export function RollingNumber({
  value,
  separator = false,
  pad,
  className,
  digitClassName,
}: RollingNumberProps) {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const display = Math.max(0, Math.floor(value));
  let str = String(display);
  if (pad && str.length < pad) str = str.padStart(pad, '0');

  const chars: string[] = [];
  for (let i = 0; i < str.length; i++) {
    chars.push(str[i]);
    if (separator && i < str.length - 1) {
      const fromRight = str.length - 1 - i;
      if (fromRight > 0 && fromRight % 3 === 0) chars.push(',');
    }
  }

  return (
    <span className={cn('inline-flex font-mono tabular-nums', className)}>
      {chars.map((ch, i) =>
        ch === ',' ? (
          <span key={`s-${i}`} className="px-0.5 text-ink-dim">
            ,
          </span>
        ) : (
          <Digit key={`d-${i}`} value={ch} reduced={reduced} className={digitClassName} />
        ),
      )}
    </span>
  );
}

function Digit({
  value,
  reduced,
  className,
}: {
  value: string;
  reduced: boolean;
  className?: string;
}) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      if (reduced) {
        setPrev(value);
        return;
      }
      setFlipping(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [value, prev, reduced]);

  return (
    <span
      className={cn(
        'relative inline-block h-[1.1em] w-[0.65em] overflow-hidden text-center leading-[1.1]',
        className,
      )}
    >
      <span
        className={cn(
          'block transition-transform duration-300 ease-out',
          flipping ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
        )}
      >
        {prev}
      </span>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 block transition-transform duration-300 ease-out',
          flipping ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
        )}
      >
        {value}
      </span>
    </span>
  );
}
