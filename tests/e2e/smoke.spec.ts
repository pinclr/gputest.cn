import { test, expect } from '@playwright/test';

/**
 * 各路由可达性 + 关键 DOM + 无 console error 的烟雾测试
 */

const ROUTES = [
  { path: '/', title: /GPUTest/, h1Match: /核验/ },
  { path: '/self-serve', title: /免费自测/, h1Match: /免费自测/ },
  { path: '/testing/node', title: /节点测试/, h1Match: /节点/ },
  { path: '/testing/cluster', title: /集群测试/, h1Match: /集群/ },
  { path: '/testing/network', title: /网络/, h1Match: /KPI|网络|集群/ },
  { path: '/testing/storage', title: /存储/, h1Match: /存储/ },
  { path: '/testing/platform', title: /平台/, h1Match: /平台/ },
  { path: '/solutions/acceptance', title: /验收/, h1Match: /验收/ },
  { path: '/solutions/health-audit', title: /健康审计/, h1Match: /健康|审计|集群/ },
  { path: '/solutions/model-quality', title: /模型质量/, h1Match: /模型|量化|输出/ },
  { path: '/solutions/network-testing', title: /网络/, h1Match: /KPI|网络|集群/ },
  { path: '/solutions/storage-testing', title: /存储/, h1Match: /存储/ },
  { path: '/solutions/security-testing', title: /安全/, h1Match: /安全|合规/ },
  { path: '/solutions/single-node', title: /单机/, h1Match: /单机|RMA|交付/ },
  { path: '/solutions/domestic-gpu', title: /国产卡/, h1Match: /国产卡|信创|评测/ },
  { path: '/methodology', title: /方法学|测试体系/, h1Match: /支柱|测试|体系/ },
  { path: '/cases', title: /案例/, h1Match: /授权|案例|脱敏/ },
  { path: '/published', title: /公开测试/, h1Match: /公开|元信息|已交付/ },
  { path: '/about', title: /关于/, h1Match: /独立|方法学|品晰/ },
  { path: '/contact', title: /项目咨询|联系/, h1Match: /贵司|信息|项目背景/ },
  { path: '/articles', title: /文章/, h1Match: /方法学|实测|案例脱敏/ },
];

for (const route of ROUTES) {
  test(`route ${route.path} 渲染正常`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    const resp = await page.goto(route.path);
    expect(resp?.ok(), `${route.path} 应返回 2xx`).toBeTruthy();

    await expect(page).toHaveTitle(route.title);

    // 必有头部 + 主体 + 页脚
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // 至少一个 h1 / h2 包含期望文案
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
    const text = (await heading.textContent()) ?? '';
    expect(text).toMatch(route.h1Match);

    // 无 console error
    expect(consoleErrors, `console errors at ${route.path}: \n${consoleErrors.join('\n')}`).toHaveLength(0);
  });
}

test('404 页面渲染正常', async ({ page }) => {
  await page.goto('/this-does-not-exist');
  await expect(page.getByText(/404|不存在|这张卡掉线/)).toBeVisible();
});
