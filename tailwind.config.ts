import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // 品牌色板：深蓝主 + 钢青次 + 琥珀强调 + 紫（模型质量）
        brand: {
          ink: '#0B2545',       // 主：深蓝（合同 / 报告封面）
          steel: '#1E6091',     // 次：钢青（链接 / 强调）
          amber: '#E5A100',     // 强调：琥珀（CTA / 警示）
          violet: '#6D28D9',    // 强调：紫（AI / 模型质量）
          mist: '#8DA9C4',      // 中性辅助
          paper: '#F4F7FB',     // 浅底
        },
        // 语义色（暗色优先）
        bg: {
          DEFAULT: '#0A1628',
          surface: '#0F1E36',
          elevated: '#152844',
        },
        border: {
          DEFAULT: '#1F3556',
          strong: '#2C4A78',
        },
        ink: {
          DEFAULT: '#E8EEF7',
          muted: '#8DA9C4',
          dim: '#5F7A9E',
        },
        accent: {
          DEFAULT: '#3B82F6',
          steel: '#1E6091',
          amber: '#E5A100',
          violet: '#8B5CF6',    // 模型质量 / AI 维度
        },
        // 三支柱配色（与品牌叙事强绑定）
        pillar: {
          stability: '#E5A100',   // 琥珀 — 稳定性 / 烧机
          performance: '#38BDF8', // 钢青亮调 — 性能 / 速度
          quality: '#8B5CF6',     // 紫 — 模型质量 / AI
        },
        status: {
          ok: '#34D399',
          warn: '#F59E0B',
          err: '#EF4444',
        },
      },
      fontFamily: {
        // 默认字体栈:英文 / 数字优先 JetBrains Mono(等宽,品牌技术调性);
        // 中文走 Noto Sans SC(思源黑体 Google 版)。
        // 浏览器逐字符按列表匹配,英文 / 数字 / 符号会自动落到 JetBrains Mono,
        // 中文落到 Noto Sans SC。
        sans: [
          '"JetBrains Mono"',
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
        // 显示字体(标题用,如果想中文用纯 sans 不等宽,用此栈)
        display: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"JetBrains Mono"',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 240ms ease-out',
      },
    },
  },
  plugins: [animate],
};

export default config;
