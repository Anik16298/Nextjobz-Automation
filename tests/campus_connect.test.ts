import { test, expect } from '@playwright/test';
import { CampusConnectPage } from '../pages/CampusConnectPage';

test.describe('Campus Connect Page', () => {
    let campusPage;

    test.beforeEach(async ({ page }) => {
        campusPage = new CampusConnectPage(page);
        await campusPage.navigate();
    });

    test('should load campus connect content', async ({ page }) => {
        await expect(campusPage.pageTitle.first()).toBeVisible({ timeout: 10000 });
        const count = await campusPage.getEventCount();
        console.log(`Campus Connect events found: ${count}`);
        await page.screenshot({ path: 'test-results/campus_connect.png' });
    });
});
