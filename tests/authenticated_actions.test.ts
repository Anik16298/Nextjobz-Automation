import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfileSection } from '../pages/ProfileSection';
import { JobSearchPage } from '../pages/JobSearchPage';
import { SavedJobzPage } from '../pages/SavedJobzPage';
import { AppliedJobzPage } from '../pages/AppliedJobzPage';
import { EnrolledTrainingsPage } from '../pages/EnrolledTrainingsPage';
import { SettingsPage } from '../pages/SettingsPage';
import config from '../utils/ConfigProvider';

test.describe('Nextjobz Authenticated User Actions', () => {
    let loginPage;
    let profileSection;
    let jobSearchPage;
    let savedJobzPage;
    let appliedJobzPage;
    let enrolledTrainingsPage;
    let settingsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profileSection = new ProfileSection(page);
        jobSearchPage = new JobSearchPage(page);
        savedJobzPage = new SavedJobzPage(page);
        appliedJobzPage = new AppliedJobzPage(page);
        enrolledTrainingsPage = new EnrolledTrainingsPage(page);
        settingsPage = new SettingsPage(page);

        await loginPage.navigate('/');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        const loggedIn = await loginPage.verifyLogin();
        expect(loggedIn, 'User should be logged in successfully').toBeTruthy();
        await page.waitForTimeout(2000);
    });

    test('should view user profile/dashboard', async ({ page }) => {
        const profileIcon = page.locator('div[class*="MuiAvatar-root"]').first();
        const userName = page.getByText(new RegExp(config.credentials.displayName, 'i')).first();

        await expect(profileIcon).toBeVisible({ timeout: 15000 });
        console.log('✓ User profile icon is visible');

        await page.screenshot({ path: 'test-results/dashboard_logged_in.png' });
    });

    test('should access and verify profile menu', async ({ page }) => {
        await profileSection.openProfileMenu();
        const menuItems = await profileSection.verifyMenuItemsVisible();

        console.log('Profile Menu Items:', menuItems);
        expect(menuItems['Profile'], 'Profile menu item should be visible').toBeTruthy();
        expect(menuItems['Dashboard'], 'Dashboard menu item should be visible').toBeTruthy();
        expect(menuItems['Saved Jobz'], 'Saved Jobz menu item should be visible').toBeTruthy();
        expect(menuItems['Applied Jobz'], 'Applied Jobz menu item should be visible').toBeTruthy();
        expect(menuItems['Enrolled Trainings'], 'Enrolled Trainings menu item should be visible').toBeTruthy();
        expect(menuItems['Settings'], 'Settings menu item should be visible').toBeTruthy();
        expect(menuItems['Logout'], 'Logout menu item should be visible').toBeTruthy();

        await page.screenshot({ path: 'test-results/profile_menu_verified.png' });
    });

    test('should navigate to job search and search for jobs', async ({ page }) => {
        await jobSearchPage.navigate();
        const isLoaded = await jobSearchPage.isLoaded();
        expect(isLoaded, 'Job search page should load').toBeTruthy();

        const jobCount = await jobSearchPage.getJobCount();
        console.log(`✓ Found ${jobCount} jobs`);

        await page.screenshot({ path: 'test-results/job_search_authenticated.png' });
    });

    test('should access saved jobs section', async ({ page }) => {
        await profileSection.navigateToSavedJobz();
        await page.waitForTimeout(2000);

        const isWorking = await savedJobzPage.isWorking();
        expect(isWorking, 'Saved Jobz page should be accessible').toBeTruthy();
        console.log('✓ Saved Jobz section accessed');

        await page.screenshot({ path: 'test-results/saved_jobs_authenticated.png' });
    });

    test('should access applied jobs section', async ({ page }) => {
        await profileSection.navigateToAppliedJobz();
        await page.waitForTimeout(2000);

        const isWorking = await appliedJobzPage.isWorking();
        expect(isWorking, 'Applied Jobz page should be accessible').toBeTruthy();
        console.log('✓ Applied Jobz section accessed');

        await page.screenshot({ path: 'test-results/applied_jobs_authenticated.png' });
    });

    test('should access enrolled trainings section', async ({ page }) => {
        await profileSection.navigateToEnrolledTrainings();
        await page.waitForTimeout(2000);

        const isWorking = await enrolledTrainingsPage.isWorking();
        expect(isWorking, 'Enrolled Trainings page should be accessible').toBeTruthy();
        console.log('✓ Enrolled Trainings section accessed');

        await page.screenshot({ path: 'test-results/enrolled_trainings_authenticated.png' });
    });

    test('should access settings section', async ({ page }) => {
        await profileSection.navigateToSettings();
        await page.waitForTimeout(2000);

        const isWorking = await settingsPage.isWorking();
        expect(isWorking, 'Settings page should be accessible').toBeTruthy();
        console.log('✓ Settings section accessed');

        await page.screenshot({ path: 'test-results/settings_authenticated.png' });
    });

    test('should successfully logout', async ({ page }) => {
        await profileSection.logout();
        await page.waitForTimeout(3000);

        const signInButton = page.getByRole('button', { name: /Sign In/i }).first();
        await expect(signInButton).toBeVisible({ timeout: 15000 });
        console.log('✓ User logged out successfully');

        await page.screenshot({ path: 'test-results/after_logout_authenticated.png' });
    });
});
