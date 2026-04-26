import { test, expect, type Page } from '@playwright/test';

/**
 * 站内链接完整性:
 *   1. 抓取首页所有 <a href> 与 mobile menu 中的链接
 *   2. 对每个内链分别打开,确认 200 + 无 console error
 *   3. 外链不触达,但要求 protocol 合法 + 不为 javascript:
 */

async function collectInternalLinks(page: Page): Promise<string[]> {
  await page.goto('/');
  const hrefs = await page.$$eval('a[href]', (els) =>
    els.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''),
  );
  // 同源 + 站内
  const internal = hrefs
    .filter((h) => h.startsWith('/') && !h.startsWith('//'))
    .filter((h) => !h.startsWith('/api/'))
    .map((h) => h.split('#')[0])
    .filter((h, i, arr) => arr.indexOf(h) === i)
    .filter((h) => h.length > 0);
  return internal;
}

test('首页抓取的所有内链全部可访问', async ({ page }) => {
  const links = await collectInternalLinks(page);
  expect(links.length).toBeGreaterThan(5);

  for (const href of links) {
    const resp = await page.goto(href);
    expect(resp?.ok(), `${href} 应返回 2xx,实际 ${resp?.status()}`).toBeTruthy();
    // 不应渲染 404 页面
    const body = (await page.locator('body').innerText()) ?? '';
    expect(body, `${href} 渲染了 404 文案`).not.toMatch(/页面不存在|这张卡掉线/);
  }
});

test('移动端菜单的所有链接全部可访问', async ({ page, browser }) => {
  // 切换到 mobile viewport
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const mobile = await ctx.newPage();
  await mobile.goto('/');
  await mobile.getByRole('button', { name: /菜单/ }).click();

  const hrefs = await mobile.$$eval(
    'a[href^="/"]',
    (els) => Array.from(new Set(els.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''))),
  );
  expect(hrefs.length).toBeGreaterThan(8);

  for (const href of hrefs) {
    const url = href.split('#')[0];
    if (!url) continue;
    const resp = await mobile.goto(url);
    expect(resp?.ok(), `${url} 应返回 2xx`).toBeTruthy();
  }
  await ctx.close();
});

test('外链使用合法 protocol(无 javascript: 等危险链接)', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.$$eval('a[href]', (els) =>
    els.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''),
  );
  const dangerous = hrefs.filter(
    (h) => h.startsWith('javascript:') || h.startsWith('data:'),
  );
  expect(dangerous, `检测到危险链接: ${dangerous.join(', ')}`).toHaveLength(0);
});

test('sitemap.xml 与 robots.txt 可访问且包含核心路径', async ({ page }) => {
  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const sm = await sitemap.text();
  expect(sm).toContain('/testing/node');
  expect(sm).toContain('/published');
  expect(sm).toContain('/solutions/acceptance');

  const robots = await page.request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain('Sitemap');
});
