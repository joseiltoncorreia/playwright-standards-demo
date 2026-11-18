import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Inventory', () => {
  test('shows the product list after login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(3000);

    await expect(page.getByTestId('inventory-list')).toBeVisible();
  });
});
