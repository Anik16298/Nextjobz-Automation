import { test, expect } from '@playwright/test';
import { CareerGuidancePage } from '../pages/CareerGuidancePage.js';

test.describe('Career Guidance Page', () => {
    let guidancePage;

    test.beforeEach(async ({ page }) => {
        guidancePage = new CareerGuidancePage(page);
        await guidancePage.navigate('/career-guidance');
    });

    test('should load career guidance articles', async ({ page }) => {
        const working = await guidancePage.isWorking();
        expect(working, 'Career Guidance page should be working').toBeTruthy();

        const count = await guidancePage.getArticleCount();
        console.log(`Career Guidance articles found: ${count}`);
        expect(count).toBeGreaterThan(0);

        await page.screenshot({ path: 'test-results/career_guidance_articles.png' });
    });
});
