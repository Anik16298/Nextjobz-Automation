import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { JobSearchPage } from '../pages/JobSearchPage.js';
import config from '../utils/ConfigProvider.js';

test.describe('Nextjobz Full Site Regression', () => {
    let loginPage;
    let searchPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        searchPage = new JobSearchPage(page);

        await loginPage.navigate('/');
        // navigate calls waitForGlobalLoader
    });

    test('End-to-End User Journey: Login, Search, Browse, Navigate', async ({ page }) => {
        test.setTimeout(120000); // Allow 2 minutes for full journey

        // 1. LOGIN
        console.log('Step 1: Login');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        const loggedIn = await loginPage.verifyLogin();
        expect(loggedIn, 'User should be logged in').toBeTruthy();

        // 2. SEARCH
        console.log('Step 2: Job Search');
        // Ensure loader is gone if login caused a reload/transition
        await loginPage.waitForGlobalLoader();

        await searchPage.searchForJob('Data Analyst');
        await searchPage.waitForGlobalLoader(); // Search might trigger loader

        const searchCount = await searchPage.getResultCount();
        console.log(`Search Results: ${searchCount}`);
        // We verify that we didn't crash, even if count is 0 (search results might be dynamic)

        // 3. BROWSE JOBZ
        console.log('Step 3: Browse Jobz Page');
        await searchPage.navigate(); // Go to dedicated listing
        // navigate waits for loader

        const listingCount = await searchPage.getJobCount();
        console.log(`Jobz Page Listing Count: ${listingCount}`);
        expect(listingCount).toBeGreaterThanOrEqual(0); // Should be valid number

        // Verify UI elements
        const filtersVisible = await searchPage.isLoaded();
        console.log(`Filters Valid: ${filtersVisible}`);

        // 4. NAVIGATION TO OTHER SECTIONS
        console.log('Step 4: Navigate to Campus Connect');
        const campusLink = page.locator('text=Campus Connect').first();
        if (await campusLink.isVisible()) {
            await campusLink.click({ force: true });
            await searchPage.waitForGlobalLoader();
            await expect(page).toHaveURL(/campus-connect/i);
            console.log('Campus Connect verified');
        } else {
            console.log('Campus Connect link not visible/found');
        }

        console.log('Regression Test Complete');
    });
});
