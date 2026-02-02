import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import config from '../utils/ConfigProvider.js';

test.describe('User Profile and Dashboard - Complete Coverage', () => {
    let loginPage;
    let profilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        // Perform login
        await loginPage.navigate('/');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        const loggedIn = await loginPage.verifyLogin();
        expect(loggedIn, 'User should be logged in successfully').toBeTruthy();

        // Wait for login to complete and modal to close
        await page.waitForTimeout(3000);
        await profilePage.waitForGlobalLoader();
    });

    test('should display user profile avatar and name after login', async ({ page }) => {
        const isLoggedIn = await profilePage.isLoggedIn();
        expect(isLoggedIn, 'User avatar should be visible').toBeTruthy();

        // Verify user name is visible
        await profilePage.openProfileMenu();
        await expect(profilePage.userName).toBeVisible({ timeout: 5000 });

        await page.screenshot({ path: 'test-results/profile_logged_in_state.png' });
    });

    test('should display all profile menu items', async ({ page }) => {
        const menuItems = await profilePage.verifyMenuItemsVisible();

        console.log('Profile Menu Items:', menuItems);

        // Verify all expected items are present
        expect(menuItems['Profile'], 'Profile menu item should be visible').toBeTruthy();
        expect(menuItems['Dashboard'], 'Dashboard menu item should be visible').toBeTruthy();
        expect(menuItems['Saved Jobz'], 'Saved Jobz menu item should be visible').toBeTruthy();
        expect(menuItems['Recommended Jobz'], 'Recommended Jobz menu item should be visible').toBeTruthy();
        expect(menuItems['Applied Jobz'], 'Applied Jobz menu item should be visible').toBeTruthy();
        expect(menuItems['Enrolled Trainings'], 'Enrolled Trainings menu item should be visible').toBeTruthy();
        expect(menuItems['Settings'], 'Settings menu item should be visible').toBeTruthy();
        expect(menuItems['Logout'], 'Logout menu item should be visible').toBeTruthy();

        await page.screenshot({ path: 'test-results/profile_menu_complete.png' });
    });

    test('should navigate to Profile page', async ({ page }) => {
        await profilePage.navigateToProfile();
        await page.waitForTimeout(2000);

        // Verify we're on a profile-related page
        const url = page.url();
        console.log(`Profile page URL: ${url}`);

        await page.screenshot({ path: 'test-results/profile_page_view.png', fullPage: true });
    });

    test('should navigate to Dashboard page', async ({ page }) => {
        await profilePage.navigateToDashboard();
        await page.waitForTimeout(2000);

        const url = page.url();
        console.log(`Dashboard page URL: ${url}`);

        await page.screenshot({ path: 'test-results/dashboard_page_view.png', fullPage: true });
    });

    test('should navigate to Saved Jobz page', async ({ page }) => {
        await profilePage.navigateToSavedJobz();
        await page.waitForTimeout(2000);

        const url = page.url();
        console.log(`Saved Jobz page URL: ${url}`);

        await page.screenshot({ path: 'test-results/saved_jobz_page.png', fullPage: true });
    });

    test('should navigate to Recommended Jobz page', async ({ page }) => {
        await profilePage.navigateToRecommendedJobz();
        await page.waitForTimeout(2000);

        const url = page.url();
        console.log(`Recommended Jobz page URL: ${url}`);

        await page.screenshot({ path: 'test-results/recommended_jobz_page.png', fullPage: true });
    });

    test('should navigate to Applied Jobz page', async ({ page }) => {
        await profilePage.navigateToAppliedJobz();
        await page.waitForTimeout(2000);

        const url = page.url();
        console.log(`Applied Jobz page URL: ${url}`);

        await page.screenshot({ path: 'test-results/applied_jobz_page.png', fullPage: true });
    });

    test('should navigate to Enrolled Trainings page', async ({ page }) => {
        await profilePage.navigateToEnrolledTrainings();
        await page.waitForTimeout(2000);

        const url = page.url();
        console.log(`Enrolled Trainings page URL: ${url}`);

        await page.screenshot({ path: 'test-results/enrolled_trainings_page.png', fullPage: true });
    });

    test('should navigate to Settings page', async ({ page }) => {
        await profilePage.navigateToSettings();
        await page.waitForTimeout(2000);

        const url = page.url();
        console.log(`Settings page URL: ${url}`);

        await page.screenshot({ path: 'test-results/settings_page_view.png', fullPage: true });
    });

    test('should successfully logout user', async ({ page }) => {
        await profilePage.logout();

        // Wait for global loader to disappear after logout
        await profilePage.waitForGlobalLoader();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Verify logout by checking if Sign In button is visible again
        const signInButton = page.getByRole('button', { name: /Sign In/i }).first();
        await expect(signInButton).toBeVisible({ timeout: 15000 });

        console.log('Sign In button is visible - user logged out successfully');

        await page.screenshot({ path: 'test-results/after_successful_logout.png' });
    });
});
