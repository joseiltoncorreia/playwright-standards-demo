import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Cart', () => {
  test('adds a product to the cart', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  });
});
