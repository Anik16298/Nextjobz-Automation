import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { JobSearchPage } from '../pages/JobSearchPage.js';
import { CareerGuidancePage } from '../pages/CareerGuidancePage.js';
import { CareerAbroadPage } from '../pages/CareerAbroadPage.js';
import { CampusConnectPage } from '../pages/CampusConnectPage.js';
import { JobseekerProfilePage } from '../pages/JobseekerProfilePage.js';
import config from '../utils/ConfigProvider.js';

test.describe('End-to-End Deep Test of Nextjobz', () => {
    let loginPage;
    let homePage;
    let jobSearchPage;
    let careerGuidancePage;
    let careerAbroadPage;
    let campusConnectPage;
    let jobseekerProfile;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        jobSearchPage = new JobSearchPage(page);
        careerGuidancePage = new CareerGuidancePage(page);
        careerAbroadPage = new CareerAbroadPage(page);
        campusConnectPage = new CampusConnectPage(page);
        jobseekerProfile = new JobseekerProfilePage(page);

        // Start at Home
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
    });

    test('Guest User Journey: Navigation and Content Access', async ({ page }) => {
        test.setTimeout(180000);

        // 1. Verify Home Page
        console.log('Step 1: Verify Home Page');
        expect(await homePage.isWorking(), 'Home Page should load correctly').toBeTruthy();

        // 2. Job Search
        console.log('Step 2: Perform Job Search');
        const searchInput = page.getByPlaceholder('Enter Job Title').first();
        if (await searchInput.isVisible()) {
            await searchInput.fill('Engineer');
            // Using regex for search button is safer
            const searchBtn = page.locator('button').filter({ hasText: /Search/i }).first();
            await searchBtn.click();
            await page.waitForLoadState('networkidle');
        } else {
            console.log('Search input not found on Home Page');
        }

        // Verify we are on a listing page or results shown
        const isListingLoaded = await jobSearchPage.isLoaded();
        if (isListingLoaded === 'HomePage') {
            console.log('Redirected to Home. This might be expected behavior for guests.');
        } else {
            expect(isListingLoaded).toBeTruthy();
        }

        // 3. Career Development / Guidance
        console.log('Step 3: Career Guidance');
        await careerGuidancePage.navigate();
        const isCareerVisible = await careerGuidancePage.isWorking();
        expect(isCareerVisible, 'Career Guidance content should be visible').toBeTruthy();

        // 4. Career Abroad
        console.log('Step 4: Career Abroad');
        await careerAbroadPage.navigate();
        const isAbroadVisible = await careerAbroadPage.isWorking();
        expect(isAbroadVisible, 'Career Abroad content should be visible').toBeTruthy();

        // 5. Campus Connect
        console.log('Step 5: Campus Connect');
        await campusConnectPage.navigate();
        const isCampusVisible = await campusConnectPage.isWorking();
        expect(isCampusVisible, 'Campus Connect content should be visible').toBeTruthy();
    });

    test('Authenticated User Journey: Login & Profile Management', async ({ page }) => {
        // 1. Login
        console.log('Logging in...');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();

        // 2. Access CV Builder
        console.log('Accessing CV Builder...');
        await jobseekerProfile.navigate();
        await jobseekerProfile.waitForGlobalLoader();

        // 3. Verify Vital Profile Information
        const completion = await jobseekerProfile.getProfileCompletion();
        console.log(`Profile Completion Status: ${completion}`);
        expect(completion).toMatch(/\d+%/);

        const sections = await jobseekerProfile.verifyAllSectionsVisible();
        expect(sections['Personal Details'], 'Personal Details should be visible').toBeTruthy();

        console.log('Authenticated Profile Check Complete');
    });
});
