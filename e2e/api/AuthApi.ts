import { Page, request } from '@playwright/test';
import { Env } from '../helpers/Env';

export class AuthApi {
  constructor(private readonly page: Page) {}

  /**
   * API/Cookieを使用してログイン状態をセットアップする
   * ※ Sauce Labs (SauceDemo) はフロントエンドのみで完結するデモサイトのため、
   * 実際にはAPIエンドポイントが存在しません。
   * 本来の業務アプリではここでAPIを叩き、TokenをCookie/LocalStorageにセットします。
   * ここでは課題の「APIクラスを使用して準備する」という設計方針に従い、
   * ログイン処理をカプセル化したクラスとして実装します。
   */
  async loginAsStandardUser() {
    // ログインページへ移動
    await this.page.goto(Env.BASE_URL);
    
    // ログイン処理を実行
    await this.page.getByPlaceholder('Username').fill(Env.STANDARD_USER);
    await this.page.getByPlaceholder('Password').fill(Env.PASSWORD);
    await this.page.getByRole('button', { name: 'Login' }).click();
    
    // ログイン完了を待機
    await this.page.waitForLoadState('networkidle');
  }
}
