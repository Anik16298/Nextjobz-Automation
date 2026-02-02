import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test.describe('Nextjobz Main Landing Page', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate('/');
    });

    test('should display all main landing page sections', async ({ page }) => {
        console.log('Verifying Landing Page Sections...');

        // 1. Hero / Smarter Career Section
        await expect(homePage.smarterCareerSection).toBeVisible();
        console.log('✓ Smarter Career section visible');

        // 2. Jobz by Category
        await expect(homePage.categorySection).toBeVisible();
        console.log('✓ Jobz by Category section visible');

        // 3. Top Companies
        await expect(homePage.topCompaniesSection).toBeVisible();
        console.log('✓ Top Companies section visible');

        // 4. CV Builder
        await expect(homePage.cvBuilderSection).toBeVisible();
        console.log('✓ CV Builder section visible');

        // 5. Career Guidance (Blog entries)
        await expect(homePage.careerGuidanceSection).toBeVisible();
        console.log('✓ Career Guidance section visible');

        await page.screenshot({ path: 'test-results/landing_page_full.png', fullPage: true });
    });

    test('should have working "Explore All" buttons', async ({ page }) => {
        // Scroll down to ensure all sections are triggered/loaded if there's lazy loading
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await page.waitForTimeout(1000);

        const exploreButtons = page.getByRole('button', { name: /Explore All/i });
        await exploreButtons.first().waitFor({ state: 'visible', timeout: 10000 });

        const count = await exploreButtons.count();
        console.log(`Found ${count} "Explore All" buttons on landing page.`);
        expect(count).toBeGreaterThanOrEqual(1);
    });
});
