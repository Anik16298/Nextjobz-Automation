import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import config from '../utils/ConfigProvider.js';

test.describe('Nextjobz Authenticated User Actions', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate('/');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        const loggedIn = await loginPage.verifyLogin();
        expect(loggedIn).toBeTruthy();
    });

    test('should view user profile/dashboard', async ({ page }) => {
        // Look for profile-related indicators
        const profileIcon = page.locator('div[class*="MuiAvatar-root"]').first();
        const userName = page.getByText(new RegExp(config.credentials.displayName, 'i')).first();

        // Ensure we are in a logged-in state and elements are visible
        await expect(profileIcon).toBeVisible({ timeout: 15000 });
        console.log('User profile icon is visible.');

        // Take a screenshot of the logged-in state
        await page.screenshot({ path: 'test-results/dashboard_logged_in.png' });
    });
});
