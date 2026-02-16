import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { JobseekerProfilePage } from '../pages/JobseekerProfilePage.js';
import config from '../utils/ConfigProvider.js';

test.describe('CV Builder - Section by Section Deep Dive', () => {
    let loginPage;
    let profilePage;

    const sections = [
        'Personal Details',
        'Career Snapshot',
        'Work Experience',
        'Education',
        'Skills & Expertise',
        'Training and Certification',
        'Projects',
        'Club and Volunteer Experience',
        'Portfolio/ Links',
        'Availability and Job Preferences',
        'Language',
        'Reference',
        'Other Information'
    ];

    test.beforeAll(async ({ browser }) => {
        // Shared login session would be better, but for simplicity we do it here or in beforeEach
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new JobseekerProfilePage(page);

        await loginPage.navigate('/');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();

        await profilePage.navigate();
        await profilePage.waitForGlobalLoader();
    });

    for (const section of sections) {
        test(`Section Visibility: ${section}`, async ({ page }) => {
            const locator = page.locator('h6').filter({ hasText: new RegExp(`^${section}$`, 'i') }).first();
            await locator.scrollIntoViewIfNeeded();
            await expect(locator).toBeVisible({ timeout: 10000 });
        });

        test(`Section Edit Modal: ${section}`, async ({ page }) => {
            await profilePage.clickEditForSection(section);
            const modal = page.locator('div[role="dialog"]');
            await expect(modal).toBeVisible();

            // Close modal to cleanup
            const cancelBtn = page.getByRole('button', { name: /Cancel|Close/i }).first();
            if (await cancelBtn.isVisible()) {
                await cancelBtn.click();
            } else {
                await page.keyboard.press('Escape');
            }
            await expect(modal).not.toBeVisible();
        });
    }
});
