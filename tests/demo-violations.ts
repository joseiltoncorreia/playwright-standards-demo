import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Cart', () => {
  test('bad example: many violations on purpose', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    login.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(3000);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click({ force: true });
    var count = await page.locator('.shopping_cart_badge').innerText();
    if (count == '1') {
      console.log('ok');
    }
    expect(await page.locator('.shopping_cart_badge').isVisible()).toBe(true);
  });

  test('good example', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  });
});
