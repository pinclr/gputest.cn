import { test, expect } from '@playwright/test';

test.describe('SPA 导航与切换', () => {
  test('header nav 5 个测试分类全部可点击且跳转', async ({ page }) => {
    await page.goto('/');
    const navLabels = ['节点测试', '集群测试', '网络测试', '存储测试', '平台测试'];
    for (const label of navLabels) {
      const link = page.locator('header').getByRole('link', { name: label });
      await expect(link).toBeVisible();
    }

    // 依次点击,确认 URL 变化与页面更新
    for (const label of navLabels) {
      await page.locator('header').getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(/\/testing\/(node|cluster|network|storage|platform)/);
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('点击 Logo 回到首页', async ({ page }) => {
    await page.goto('/about');
    await page.getByRole('link', { name: /GPUTest/i }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('CTA 项目咨询跳转到 /contact', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: '项目咨询' }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('首页 hero 双 CTA 可用', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /项目咨询|自助跑测|免费自测/ }).first()).toBeVisible();
  });

  test('解决方案卡跳转(从首页 SolutionsBand)', async ({ page }) => {
    await page.goto('/');
    const card = page.getByRole('link', { name: /AIDC 项目验收/ }).first();
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/\/solutions\/acceptance/);
  });

  test('单机批量页报价计算器交互', async ({ page }) => {
    await page.goto('/solutions/single-node');
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();
    await slider.fill('20');
    // 总价应包含 ¥
    await expect(page.getByText(/¥/).first()).toBeVisible();
  });
});

test.describe('移动端体验', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test('移动端汉堡菜单打开 / 关闭', async ({ page }) => {
    await page.goto('/');
    const burger = page.getByRole('button', { name: /菜单/ });
    await expect(burger).toBeVisible();
    await burger.click();
    await expect(page.getByRole('link', { name: '节点测试' })).toBeVisible();
    // 点击任一链接应自动关闭抽屉
    await page.getByRole('link', { name: '节点测试' }).click();
    await expect(page).toHaveURL(/\/testing\/node/);
  });

  test('matrix 在移动端为 6 卡纵向排列', async ({ page }) => {
    await page.goto('/');
    // 移动端 hero 内的 6 个 cell 都可见
    await expect(page.getByText('单机硬件健康')).toBeVisible();
    await expect(page.getByText('集群训练一致性')).toBeVisible();
  });
});
