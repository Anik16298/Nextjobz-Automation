import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import config from '../utils/ConfigProvider.js';

test.describe('Nextjobz Authentication', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('User should be able to login successfully', async ({ page }) => {
        // 1. Open the login modal from landing page
        await loginPage.openLoginModal();

        // 2. Perform the login with provided credentials
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);

        // 3. Verify the login success
        const isSuccess = await loginPage.verifyLogin();

        // Take a final screenshot for the user
        await page.screenshot({ path: 'test-results/login_final_check.png', fullPage: true });

        expect(isSuccess, 'Login should be successful and indicator should be visible').toBeTruthy();
    });
});
