import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Env } from '../helpers/Env';
import { SUCCESS_MESSAGES } from '../constants/Messages';

test.describe('Swag Labs E2E Scenarios', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.load(loginPage.url);
  });

  test('Scenario 1: Login', async ({ page }) => {
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
    await expect(page).toHaveURL(inventoryPage.url);
    await expect(inventoryPage.headerTitle()).toHaveText('Products');
  });

  test('Scenario 2: Purchase Product', async ({ page }) => {
    // Login
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
    
    // Add product to cart
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.goToCart();
    
    // Cart page
    await expect(page).toHaveURL(cartPage.url);
    await expect(cartPage.headerTitle()).toHaveText('Your Cart');
    await cartPage.proceedToCheckout();
    
    // Checkout step one
    await expect(page).toHaveURL(checkoutPage.urlStepOne);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Your Information');
    await checkoutPage.fillInformation('John', 'Doe', '123-4567');
    
    // Checkout step two
    await expect(page).toHaveURL(checkoutPage.urlStepTwo);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Overview');
    await checkoutPage.finishCheckout();
    
    // Checkout complete
    await expect(page).toHaveURL(checkoutPage.urlComplete);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader()).toHaveText(SUCCESS_MESSAGES.CHECKOUT_COMPLETE);
  });

  test('Scenario 3: Logout', async ({ page }) => {
    // Login
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
    
    // Logout
    await inventoryPage.logout();
    
    // Verify redirection to login page
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginButton()).toBeVisible();
  });
});
