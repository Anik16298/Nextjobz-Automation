import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';

test.describe('Nextjobz Footer Links', () => {
    let basePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.navigate('/');
    });

    test('should display functional footer content links', async ({ page }) => {
        await basePage.scrollToFooter();
        // Add a small wait to ensure footer is fully rendered and interaction-ready
        await page.waitForTimeout(1000);

        const linksToCheck = [
            'About Us',
            'Our Team',
            'Contact',
            'Terms of Service',
            'Privacy Policy'
        ];

        for (const linkName of linksToCheck) {
            console.log(`Checking footer link: ${linkName}`);
            // Use a broader text match and ensure we look anywhere in the page since footer is static
            const link = page.getByRole('link', { name: new RegExp(linkName, 'i') }).first();

            // Just verifying visibility and href exists
            await expect(link).toBeVisible({ timeout: 10000 });
            const href = await link.getAttribute('href');
            console.log(`Verified ${linkName} is visible with href: ${href}`);
            expect(href).toBeTruthy();
        }
    });
});
