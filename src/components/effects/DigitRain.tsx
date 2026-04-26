import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DigitRainProps {
  className?: string;
  /** 主色（落字头部）；默认琥珀 */
  headColor?: string;
  /** 拖尾色；默认紫 */
  trailColor?: string;
  /** 整体不透明度上限 0-1 */
  opacity?: number;
  /** 字体大小 */
  fontSize?: number;
}

/**
 * 数字雨：致敬"数字帝国"，画面里随机的 16 进制 / GPU 寄存器风字符流。
 * 暗示芯片正在运算与测试，不喧宾夺主，prefers-reduced-motion 下自动停。
 */
export function DigitRain({
  className,
  headColor = '229, 161, 0', // amber
  trailColor = '139, 92, 246', // violet
  opacity = 0.55,
  fontSize = 14,
}: DigitRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    // GPU / 测试相关的字符集：16 进制 + 一些 register-like token
    const charset = '0123456789ABCDEF';
    const tokens = ['XID', 'ECC', 'TFLOPS', 'SM', 'NCCL', 'HBM', 'PCIe', 'NVLINK', 'IB', 'PWR'];

    function resize() {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
      speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.8);
    }
    resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    let raf = 0;
    let lastT = 0;

    function frame(t: number) {
      if (!canvas || !ctx) return;
      const dt = Math.min(48, t - lastT);
      lastT = t;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // 半透明黑覆盖产生拖尾
      ctx.fillStyle = `rgba(10, 22, 40, ${0.07 + (dt / 1000) * 0.6})`;
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // 偶尔吐一个 token 而不是单字符
        const useToken = Math.random() > 0.985;
        const text = useToken
          ? tokens[Math.floor(Math.random() * tokens.length)]
          : charset[Math.floor(Math.random() * charset.length)];

        // 头部高亮 + 拖尾 fade
        const isHead = Math.random() > 0.94;
        ctx.fillStyle = isHead
          ? `rgba(${headColor}, ${opacity})`
          : `rgba(${trailColor}, ${opacity * 0.5})`;
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.97) {
          drops[i] = -Math.random() * 20;
        }
        drops[i] += speeds[i] * (dt / 16);
      }

      raf = requestAnimationFrame(frame);
    }

    if (!reduced) {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [fontSize, headColor, trailColor, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
}
