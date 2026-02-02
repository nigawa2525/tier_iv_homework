import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { AuthApi } from '../api/AuthApi';
import { Env } from '../helpers/Env';

test.describe('商品並び替えシナリオ', () => {
  let inventoryPage: InventoryPage;
  let authApi: AuthApi;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    authApi = new AuthApi(page);
    
    // 準備: APIクラスを使用してログイン済みの状態にする
    await authApi.loginAsStandardUser();
  });

  test('商品名での並び替え (昇順・降順)', async () => {
    // 名前の昇順 (A to Z)
    await inventoryPage.sortProducts('az');
    const namesAZ = await inventoryPage.getProductNames();
    const sortedAZ = [...namesAZ].sort();
    expect(namesAZ).toEqual(sortedAZ);

    // 名前の降順 (Z to A)
    await inventoryPage.sortProducts('za');
    const namesZA = await inventoryPage.getProductNames();
    const sortedZA = [...namesZA].sort().reverse();
    expect(namesZA).toEqual(sortedZA);
  });

  test('価格での並び替え (安い順・高い順)', async () => {
    // 金額の昇順 (low to high)
    await inventoryPage.sortProducts('lohi');
    const pricesLOHI = await inventoryPage.getProductPrices();
    const sortedLOHI = [...pricesLOHI].sort((a, b) => a - b);
    expect(pricesLOHI).toEqual(sortedLOHI);

    // 金額の降順 (high to low)
    await inventoryPage.sortProducts('hilo');
    const pricesHILO = await inventoryPage.getProductPrices();
    const sortedHILO = [...pricesHILO].sort((a, b) => b - a);
    expect(pricesHILO).toEqual(sortedHILO);
  });
});
