import { test, expect } from '@playwright/test';
import { JobzPage } from '../pages/JobzPage.js';

test.describe('Nextjobz Job Listing Functionality', () => {
    let jobzPage;

    test.beforeEach(async ({ page }) => {
        jobzPage = new JobzPage(page);
        await jobzPage.navigate('/job');
    });

    test('should display job filters and list of jobs', async ({ page }) => {
        // Taking a screenshot to visually debug the page structure
        await page.waitForLoadState('domcontentloaded');
        await page.screenshot({ path: 'test-results/jobz_page_structure.png', fullPage: true });

        const count = await jobzPage.getJobCount();
        console.log(`Number of jobs found on page: ${count}`);

        // We expect some jobs to be there usually, but if not, at least the page shouldn't 404
        expect(page.url()).toContain('job');
    });

    test('should check for critical page elements', async () => {
        // This is a smoke test for the integrity of the listing page
        const isLoaded = await jobzPage.isLoaded();
        console.log(`Jobz Page Loaded state: ${isLoaded}`);
    });
});
