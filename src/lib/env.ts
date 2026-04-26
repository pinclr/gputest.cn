/**
 * 运行时环境探测
 *
 * 优先级:
 *   1. 构建时注入的 VITE_ENV(由 GitHub Actions 在 build 时设置)
 *   2. 当前 hostname 推断:
 *        - staging.gputest.cn          → staging
 *        - dev{N}.gputest.cn           → dev
 *        - 其他(含 localhost / prod)  → prod
 */

export type DeployEnv = 'dev' | 'staging' | 'prod';

interface EnvInfo {
  env: DeployEnv;
  isProd: boolean;
  prNumber?: number;
  publicUrl: string;
  commitSha?: string;
}

function inferFromHostname(): DeployEnv {
  if (typeof window === 'undefined') return 'prod';
  const host = window.location.hostname;
  // 临时调试期 dev/staging 走 pinclr.com,gputest.cn 备案完后切回(两套都识别)
  if (host === 'staging.gputest.cn' || host === 'staging.pinclr.com') return 'staging';
  if (/^dev\d+\.(gputest\.cn|pinclr\.com)$/.test(host)) return 'dev';
  return 'prod';
}

function inferPrNumber(): number | undefined {
  const buildTimePR = import.meta.env.VITE_PR_NUMBER;
  if (buildTimePR) return Number(buildTimePR);
  if (typeof window === 'undefined') return undefined;
  const m = window.location.hostname.match(/^dev(\d+)\.(gputest\.cn|pinclr\.com)$/);
  return m ? Number(m[1]) : undefined;
}

export function getEnv(): EnvInfo {
  const buildTimeEnv = import.meta.env.VITE_ENV as DeployEnv | undefined;
  const env = buildTimeEnv ?? inferFromHostname();
  return {
    env,
    isProd: env === 'prod',
    prNumber: inferPrNumber(),
    publicUrl:
      (import.meta.env.VITE_PUBLIC_URL as string | undefined) ??
      (typeof window !== 'undefined' ? window.location.origin : 'https://gputest.cn'),
    commitSha: import.meta.env.VITE_COMMIT_SHA as string | undefined,
  };
}
