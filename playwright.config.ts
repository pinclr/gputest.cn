import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright e2e 配置
 *
 * 测试目标:
 *   - 页面正确渲染(无 console error / 关键 DOM 存在)
 *   - 内链有效(404 探测)
 *   - 导航切换(SPA 路由)
 *   - 移动端 viewport 渲染
 *
 * 在 CI 中,先 pnpm build 再 webServer 启动 vite preview 服务,
 * 测试运行在生产构建产物上,与上线行为一致。
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'pnpm preview --host 127.0.0.1 --port 4173',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
