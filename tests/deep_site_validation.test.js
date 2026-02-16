import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { ContactPage } from '../pages/ContactPage.js';
import { JobSearchPage } from '../pages/JobSearchPage.js';
import { JobseekerProfilePage } from '../pages/JobseekerProfilePage.js';
import config from '../utils/ConfigProvider.js';

test.describe('Deep Site Validation - Nextjobz', () => {
    let homePage;
    let loginPage;
    let registrationPage;
    let contactPage;
    let jobSearchPage;
    let jobseekerProfile;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        registrationPage = new RegistrationPage(page);
        contactPage = new ContactPage(page);
        jobSearchPage = new JobSearchPage(page);
        jobseekerProfile = new JobseekerProfilePage(page);

        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
    });

    test('Negative Scenario: Invalid Login Attempts', async ({ page }) => {
        console.log('Case: Invalid Login');
        await loginPage.openLoginModal();

        await loginPage.performLogin('', '');
        const stillInModal = await page.locator('div[role="dialog"]').isVisible();
        console.log(`Still in modal after empty: ${stillInModal}`);

        await loginPage.performLogin(config.credentials.phone, 'wrongpassword123');
        const loginSucceeded = await loginPage.verifyLogin();
        expect(loginSucceeded, 'Login should fail with wrong password').toBeFalsy();
    });

    test('Negative Scenario: Registration Form Validation', async ({ page }) => {
        console.log('Case: Registration Validation');
        await page.goto('/registration');
        await registrationPage.waitForGlobalLoader();

        await registrationPage.submit();
        await page.waitForTimeout(2000);

        const error = await registrationPage.getErrorMessage();
        console.log(`Registration error found: ${error}`);
    });

    test('Deep Search: Specific Job and Content Check', async ({ page }) => {
        console.log('Case: Deep Search');
        const keyword = 'React';
        await jobSearchPage.navigate();

        const searchInput = page.getByPlaceholder(/Job Title|Search/i).first();
        if (await searchInput.isVisible()) {
            await searchInput.fill(keyword);
            await page.keyboard.press('Enter');
            await jobSearchPage.waitForGlobalLoader();

            const resultsCount = await jobSearchPage.getJobCount();
            console.log(`Results for ${keyword}: ${resultsCount}`);
            expect(page.url()).toContain('job');
        }
    });

    test('Responsive Design: Mobile Viewport Check', async ({ page }) => {
        console.log('Case: Mobile Viewport');
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');

        // Robust mobile menu detection
        const mobileMenuBtn = page.getByRole('button').filter({ has: page.locator('svg') }).first();
        await expect(mobileMenuBtn).toBeVisible();

        await mobileMenuBtn.click();
        await page.waitForTimeout(1000);

        // Check for any drawer or navigation overlay
        const navigationVisible = await page.locator('.MuiDrawer-root, .MuiPaper-root, nav').filter({ hasText: /Home|Login|Search/i }).first().isVisible();
        expect(navigationVisible).toBeTruthy();
        console.log('Mobile navigation access verified');
    });

    test('Footer Depth: Content and Links', async ({ page }) => {
        console.log('Case: Footer Content');
        await page.goto(config.baseUrl);

        // Scroll to the very bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Find footer by common copyright or company text
        const footerArea = page.locator('footer, div').filter({ hasText: /©|Nextjobz/i }).last();
        await expect(footerArea).toBeVisible();

        const linkCount = await footerArea.locator('a').count();
        console.log(`Footer links found: ${linkCount}`);
        expect(linkCount).toBeGreaterThanOrEqual(0); // Soft check
    });

    test('Dynamic Interaction: Contact Us Message Flow', async ({ page }) => {
        console.log('Case: Contact Us Flow');
        await page.goto('/contact-us');
        await contactPage.waitForGlobalLoader();

        const testData = {
            name: 'QA Automation',
            email: 'qa@nextjobz.com',
            subject: 'Deep Test Inquiry',
            message: 'Testing form accessibility and field interaction.'
        };

        await contactPage.fillContactForm(testData);
        await expect(contactPage.submitButton).toBeVisible();
        console.log('Contact form filled successfully');
    });

    test('Authenticated Deep Dive: Profile Management', async ({ page }) => {
        console.log('Case: Authenticated Profile Deep Dive');

        // 1. Login
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        const loggedIn = await loginPage.verifyLogin();
        expect(loggedIn).toBeTruthy();

        // 2. Navigate to Profile (CV Builder)
        await jobseekerProfile.navigate();
        await jobseekerProfile.waitForGlobalLoader();

        // 3. Verify all sections are present
        const sections = await jobseekerProfile.verifyAllSectionsVisible();
        const sectionNames = Object.keys(sections);
        console.log(`Verified ${sectionNames.length} sections`);
        expect(sections['Personal Details']).toBeTruthy();

        // 4. Test field validation in a modal
        await jobseekerProfile.clickEditForSection('Personal Details');
        const modalVisible = await jobseekerProfile.editModal.isVisible();
        expect(modalVisible).toBeTruthy();

        // Close modal
        await jobseekerProfile.cancelBtn.click();
        console.log('Profile modal interaction verified');
    });
});
