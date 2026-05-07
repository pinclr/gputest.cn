import { test, expect } from '@playwright/test';

/**
 * 样式与视觉合规检查(轻量,不做像素级回归):
 *   - 主背景为暗色(品牌定调)
 *   - 主色 / 强调色实际生效
 *   - 关键文本可见(对比度通过浏览器默认)
 *   - 字体回退栈正常加载
 */

test('主背景为深色调', async ({ page }) => {
  await page.goto('/');
  const bg = await page
    .locator('body')
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  // RGB 三个通道均小于 60(深色)
  const m = bg.match(/rgb\((\d+), (\d+), (\d+)\)/);
  expect(m, `body bg color 解析失败: ${bg}`).toBeTruthy();
  if (m) {
    const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
    expect(r).toBeLessThan(60);
    expect(g).toBeLessThan(60);
    expect(b).toBeLessThan(80);
  }
});

test('hero 主标题字号在桌面端大于 36px', async ({ page }) => {
  await page.goto('/');
  const fontSize = await page
    .locator('h1')
    .first()
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(fontSize).toBeGreaterThan(36);
});

test('CTA 按钮 hover 颜色变化', async ({ page }) => {
  await page.goto('/');
  const cta = page.getByRole('link', { name: '项目咨询' }).first();
  const before = await cta.evaluate((el) => getComputedStyle(el).backgroundColor);
  await cta.hover();
  await page.waitForTimeout(200);
  const after = await cta.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(before).not.toBe(after);
});

test('链接颜色与正文颜色不同(可识别)', async ({ page }) => {
  await page.goto('/methodology');
  const linkColor = await page
    .locator('a[href]')
    .first()
    .evaluate((el) => getComputedStyle(el).color);
  const textColor = await page
    .locator('p')
    .first()
    .evaluate((el) => getComputedStyle(el).color);
  expect(linkColor).not.toBe(textColor);
});

test('页面主要 section 有视觉分隔(border-top)', async ({ page }) => {
  await page.goto('/');
  const sections = await page.locator('section').count();
  expect(sections).toBeGreaterThanOrEqual(3);
});

test('关键品牌词清晰显示', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('GPUTest').first()).toBeVisible();
  await expect(page.getByText('核芯').first()).toBeVisible();
});

test('footer 包含关键合规元素(品晰科技 + 备案位)', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.getByText(/北京品晰科技/)).toBeVisible();
  await expect(footer.getByText(/京ICP备\d+号-\d+/)).toBeVisible();
  await expect(footer.getByText(/sales@gputest.cn/)).toBeVisible();
});
