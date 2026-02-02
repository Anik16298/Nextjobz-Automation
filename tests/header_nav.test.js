import { test, expect } from '@playwright/test';

test.describe('Nextjobz Header Navigation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
    });

    test('Navigate to Jobz page', async ({ page }) => {
        const link = page.locator('text=Jobz').first();
        await expect(link).toBeVisible();
        await link.click({ force: true });
        // URL might contain 'job' or be /jobs
        await expect(page).toHaveURL(/job/i);
        console.log('Navigated to Jobz');
    });

    test.skip('Navigate to Career Development', async ({ page }) => {
        const link = page.locator('text=/Career Development/i').first();
        await expect(link).toBeVisible();
        await link.click({ force: true });
        await expect(page).toHaveURL(/career-development/i);
        console.log('Navigated to Career Development');
    });

    test('Navigate to Campus Connect', async ({ page }) => {
        const link = page.locator('text=Campus Connect').first();
        await expect(link).toBeVisible();
        await link.click({ force: true });
        await expect(page).toHaveURL(/campus-connect/i);
        console.log('Navigated to Campus Connect');
    });
});
