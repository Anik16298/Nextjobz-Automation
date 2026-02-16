import { test, expect } from '@playwright/test';
import {
    LoginPage,
    ProfileSection,
    DashboardPage,
    SavedJobzPage,
    AppliedJobzPage,
    EnrolledTrainingsPage,
    SettingsPage,
    JobseekerProfilePage
} from '../pages/index.js';
import config from '../utils/ConfigProvider.js';

test.describe('Authenticated Section Deep Integrity Checks', () => {
    let loginPage;
    let profileMenu;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profileMenu = new ProfileSection(page);

        await loginPage.navigate('/');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();
    });

    test('should verify Dashboard section', async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await profileMenu.navigateToDashboard();
        expect(await dashboard.isWorking()).toBeTruthy();
    });

    test('should verify Saved Jobz section', async ({ page }) => {
        const saved = new SavedJobzPage(page);
        await profileMenu.navigateToSavedJobz();
        expect(await saved.isWorking()).toBeTruthy();
    });

    test('should verify Applied Jobz section', async ({ page }) => {
        const applied = new AppliedJobzPage(page);
        await profileMenu.navigateToAppliedJobz();
        expect(await applied.isWorking()).toBeTruthy();
    });

    test('should verify Enrolled Trainings section', async ({ page }) => {
        const trainings = new EnrolledTrainingsPage(page);
        await profileMenu.navigateToEnrolledTrainings();
        expect(await trainings.isWorking()).toBeTruthy();
    });

    test('should verify Settings section', async ({ page }) => {
        const settings = new SettingsPage(page);
        await profileMenu.navigateToSettings();
        expect(await settings.isWorking()).toBeTruthy();
    });

    test('should verify Profile page (CV Builder)', async ({ page }) => {
        const cvBuilder = new JobseekerProfilePage(page);
        await profileMenu.navigateToProfile();
        await cvBuilder.waitForGlobalLoader();
        expect(page.url()).toContain('cv-builder');
    });

    test('should verify Recommended Jobz section connectivity', async ({ page }) => {
        await profileMenu.navigateToRecommendedJobz();
        await page.waitForLoadState('networkidle');
        // Since we don't have a dedicated POM for recommended, we check for a result list or similar
        const contentHeader = page.locator('h1, h2, h3, h4, h5, h6').filter({ hasText: /Recommended|Match/i }).first();
        await expect(contentHeader).toBeVisible({ timeout: 10000 });
    });
});
