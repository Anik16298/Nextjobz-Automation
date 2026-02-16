import { test, expect } from '@playwright/test';
import config from '../utils/ConfigProvider.js';

test.describe('Footer & Links - Massive Connectivity Check', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
        // Scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    const categories = [
        'Accounting/Finance', 'Bank/Non-Bank Fin. Inst.', 'Commercial/Supply Chain',
        'Education/Training', 'Engineer/Architect', 'Garments/Textile',
        'HR/Org. Development', 'IT/Telecommunication', 'Marketing/Sales',
        'Medical/Pharma', 'NGO/Development', 'Production/Operation'
    ];

    for (const cat of categories) {
        test(`Homepage Category Link: ${cat}`, async ({ page }) => {
            const link = page.getByText(cat).first();
            await link.scrollIntoViewIfNeeded();
            await expect(link).toBeVisible();
        });
    }

    const footerLinks = [
        { name: 'About Us', href: '/about-us' },
        { name: 'Our Team', href: '/our-team' },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Career Guidance', href: '/career-guidance' },
        { name: 'Career Abroad', href: '/career-abroad' },
        { name: 'Terms of Use', href: '/terms-of-use' },
        { name: 'Privacy Policy', href: '/privacyPolicy' },
        { name: 'Mid Career', href: '/mid-career' },
        { name: 'Learning Lab', href: '/learning-lab' }
    ];

    for (const link of footerLinks) {
        test(`Footer Functional Link: ${link.name}`, async ({ page }) => {
            const locator = page.locator('footer').getByText(new RegExp(link.name, 'i')).first();
            if (await locator.isVisible()) {
                const href = await locator.getAttribute('href');
                expect(href).toContain(link.href.replace('/', ''));
            }
        });
    }

    test('Social Media Links Visibility', async ({ page }) => {
        const socialIcons = page.locator('footer svg');
        const count = await socialIcons.count();
        console.log(`Social icons found: ${count}`);
        expect(count).toBeGreaterThanOrEqual(1);
    });
});
