import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  size?: number;
  /** 是否显示中心高亮(头部默认显示) */
  glow?: boolean;
}

/**
 * GPUTest 核芯品牌标:
 * - 外框 = 芯片轮廓
 * - 四角缺口 = 晶圆切割标记
 * - 中心圆 = 被核验的核心
 * - 十字诊断线 = 测量与对齐
 */
export function BrandMark({ className, size = 28, glow = true }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn('block', className)}
      aria-label="GPUTest 核芯"
    >
      {/* 外框 + 四角缺口 */}
      <path
        d="M9 4 H23 M28 9 V23 M23 28 H9 M4 23 V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 9 V4 H9 M23 4 H28 V9 M28 23 V28 H23 M9 28 H4 V23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {/* 十字诊断线 */}
      <line x1="16" y1="6" x2="16" y2="11" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="16" y1="21" x2="16" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="6" y1="16" x2="11" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="21" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* 中心核 */}
      {glow && (
        <circle cx="16" cy="16" r="5" fill="currentColor" opacity="0.12">
          <animate
            attributeName="r"
            values="4.5;5.5;4.5"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
}
