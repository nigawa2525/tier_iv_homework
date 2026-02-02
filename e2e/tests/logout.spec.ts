import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { AuthApi } from '../api/AuthApi';
import { Env } from '../helpers/Env';

test.describe('ログアウトシナリオ', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let authApi: AuthApi;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    authApi = new AuthApi(page);
    
    // 準備: APIクラスを使用してログイン済みの状態にする
    await authApi.loginAsStandardUser();
  });

  test('シナリオ 3: ログアウト', async ({ page }) => {
    // ログアウト実行
    await inventoryPage.logout();
    
    // ログインページへのリダイレクトを確認
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginButton()).toBeVisible();
  });
});
