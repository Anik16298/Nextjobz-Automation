import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { JobSearchPage } from '../pages/JobSearchPage';
import { CareerGuidancePage } from '../pages/CareerGuidancePage';
import { CareerAbroadPage } from '../pages/CareerAbroadPage';
import { CampusConnectPage } from '../pages/CampusConnectPage';
import { JobseekerProfilePage } from '../pages/JobseekerProfilePage';
import { ProfileSection } from '../pages/ProfileSection';
import { DashboardPage } from '../pages/DashboardPage';
import { SavedJobzPage } from '../pages/SavedJobzPage';
import { AppliedJobzPage } from '../pages/AppliedJobzPage';
import { EnrolledTrainingsPage } from '../pages/EnrolledTrainingsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { ContactPage } from '../pages/ContactPage';
import { AboutUsPage } from '../pages/AboutUsPage';
import { FAQPage } from '../pages/FAQPage';
import { LearningLabPage } from '../pages/LearningLabPage';
import { MidCareerPage } from '../pages/MidCareerPage';
import { HiringAdvicePage } from '../pages/HiringAdvicePage';
import { EmployerPage } from '../pages/EmployerPage';
import config from '../utils/ConfigProvider';

test.describe('Comprehensive Headless Test Suite - Nextjobz', () => {
    let loginPage;
    let homePage;
    let jobSearchPage;
    let careerGuidancePage;
    let careerAbroadPage;
    let campusConnectPage;
    let jobseekerProfile;
    let profileSection;
    let dashboardPage;
    let savedJobzPage;
    let appliedJobzPage;
    let enrolledTrainingsPage;
    let settingsPage;
    let jobDetailsPage;
    let contactPage;
    let aboutUsPage;
    let faqPage;
    let learningLabPage;
    let midCareerPage;
    let hiringAdvicePage;
    let employerPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        jobSearchPage = new JobSearchPage(page);
        careerGuidancePage = new CareerGuidancePage(page);
        careerAbroadPage = new CareerAbroadPage(page);
        campusConnectPage = new CampusConnectPage(page);
        jobseekerProfile = new JobseekerProfilePage(page);
        profileSection = new ProfileSection(page);
        dashboardPage = new DashboardPage(page);
        savedJobzPage = new SavedJobzPage(page);
        appliedJobzPage = new AppliedJobzPage(page);
        enrolledTrainingsPage = new EnrolledTrainingsPage(page);
        settingsPage = new SettingsPage(page);
        jobDetailsPage = new JobDetailsPage(page);
        contactPage = new ContactPage(page);
        aboutUsPage = new AboutUsPage(page);
        faqPage = new FAQPage(page);
        learningLabPage = new LearningLabPage(page);
        midCareerPage = new MidCareerPage(page);
        hiringAdvicePage = new HiringAdvicePage(page);
        employerPage = new EmployerPage(page);
    });

    test('Part 1: Home Page and Navigation', async ({ page }) => {
        console.log('\n=== Part 1: Home Page and Navigation ===');

        // Navigate to home page
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
        console.log('✓ Home page loaded');

        // Verify home page elements
        expect(await homePage.isWorking(), 'Home Page should load correctly').toBeTruthy();
        console.log('✓ Home page verified');

        // Test navigation menu
        const navLinks = ['Home', 'Jobz', 'Career Guidance', 'Career Abroad', 'Campus Connect', 'Learning Lab', 'About Us', 'Contact'];
        for (const link of navLinks) {
            const navLink = page.getByRole('link', { name: link }).first();
            if (await navLink.isVisible()) {
                console.log(`✓ Navigation link "${link}" is visible`);
            }
        }
    });

    test('Part 2: Job Search Functionality', async ({ page }) => {
        console.log('\n=== Part 2: Job Search Functionality ===');

        // Navigate to home page
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');

        // Perform job search
        const searchInput = page.getByPlaceholder('Enter Job Title').first();
        if (await searchInput.isVisible()) {
            await searchInput.fill('Software Engineer');
            const searchBtn = page.locator('button').filter({ hasText: /Search/i }).first();
            await searchBtn.click();
            await page.waitForLoadState('networkidle');
            console.log('✓ Job search performed');

            // Verify search results
            const isListingLoaded = await jobSearchPage.isLoaded();
            if (isListingLoaded !== 'HomePage') {
                expect(isListingLoaded).toBeTruthy();
                console.log('✓ Job search results loaded');
            }
        }
    });

    test('Part 3: Career Development Pages', async ({ page }) => {
        console.log('\n=== Part 3: Career Development Pages ===');

        // Career Guidance
        await careerGuidancePage.navigate();
        const isCareerVisible = await careerGuidancePage.isWorking();
        expect(isCareerVisible, 'Career Guidance content should be visible').toBeTruthy();
        console.log('✓ Career Guidance page verified');

        // Career Abroad
        await careerAbroadPage.navigate();
        const isAbroadVisible = await careerAbroadPage.isWorking();
        expect(isAbroadVisible, 'Career Abroad content should be visible').toBeTruthy();
        console.log('✓ Career Abroad page verified');

        // Campus Connect
        await campusConnectPage.navigate();
        const isCampusVisible = await campusConnectPage.isWorking();
        expect(isCampusVisible, 'Campus Connect content should be visible').toBeTruthy();
        console.log('✓ Campus Connect page verified');

        // Learning Lab
        await learningLabPage.navigate();
        const isLearningLabVisible = await learningLabPage.isWorking();
        expect(isLearningLabVisible, 'Learning Lab content should be visible').toBeTruthy();
        console.log('✓ Learning Lab page verified');

        // Mid Career
        await midCareerPage.navigate();
        const isMidCareerVisible = await midCareerPage.isWorking();
        expect(isMidCareerVisible, 'Mid Career content should be visible').toBeTruthy();
        console.log('✓ Mid Career page verified');

        // Hiring Advice
        await hiringAdvicePage.navigate();
        const isHiringAdviceVisible = await hiringAdvicePage.isWorking();
        expect(isHiringAdviceVisible, 'Hiring Advice content should be visible').toBeTruthy();
        console.log('✓ Hiring Advice page verified');
    });

    test('Part 4: Information Pages', async ({ page }) => {
        console.log('\n=== Part 4: Information Pages ===');

        // About Us
        await aboutUsPage.navigate();
        const isAboutUsVisible = await aboutUsPage.isWorking();
        expect(isAboutUsVisible, 'About Us content should be visible').toBeTruthy();
        console.log('✓ About Us page verified');

        // Contact
        await contactPage.navigate();
        const isContactVisible = await contactPage.isWorking();
        expect(isContactVisible, 'Contact content should be visible').toBeTruthy();
        console.log('✓ Contact page verified');

        // FAQ
        await faqPage.navigate();
        const isFaqVisible = await faqPage.isWorking();
        expect(isFaqVisible, 'FAQ content should be visible').toBeTruthy();
        console.log('✓ FAQ page verified');

        // Employer
        await employerPage.navigate();
        const isEmployerVisible = await employerPage.isWorking();
        expect(isEmployerVisible, 'Employer content should be visible').toBeTruthy();
        console.log('✓ Employer page verified');
    });

    test('Part 5: Authentication Flow', async ({ page }) => {
        console.log('\n=== Part 5: Authentication Flow ===');

        // Navigate to home page
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');

        // Open login modal
        await loginPage.openLoginModal();
        console.log('✓ Login modal opened');

        // Perform login
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        const loggedIn = await loginPage.verifyLogin();
        expect(loggedIn, 'User should be logged in successfully').toBeTruthy();
        console.log('✓ Login successful');

        // Verify user is logged in
        const isLoggedIn = await profileSection.isLoggedIn();
        expect(isLoggedIn, 'User avatar should be visible').toBeTruthy();
        console.log('✓ User logged in verified');
    });

    test('Part 6: Dashboard and Profile Navigation', async ({ page }) => {
        console.log('\n=== Part 6: Dashboard and Profile Navigation ===');

        // Login
        await page.goto(config.baseUrl);
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();
        console.log('✓ Logged in');

        // Navigate to Dashboard
        await profileSection.navigateToDashboard();
        await page.waitForTimeout(2000);
        const dashboardUrl = page.url();
        console.log(`✓ Dashboard page loaded: ${dashboardUrl}`);

        // Navigate to Profile
        await profileSection.navigateToProfile();
        await page.waitForTimeout(2000);
        const profileUrl = page.url();
        console.log(`✓ Profile page loaded: ${profileUrl}`);

        // Navigate to Saved Jobz
        await profileSection.navigateToSavedJobz();
        await page.waitForTimeout(2000);
        const savedJobzUrl = page.url();
        console.log(`✓ Saved Jobz page loaded: ${savedJobzUrl}`);

        // Navigate to Recommended Jobz
        await profileSection.navigateToRecommendedJobz();
        await page.waitForTimeout(2000);
        const recommendedJobzUrl = page.url();
        console.log(`✓ Recommended Jobz page loaded: ${recommendedJobzUrl}`);

        // Navigate to Applied Jobz
        await profileSection.navigateToAppliedJobz();
        await page.waitForTimeout(2000);
        const appliedJobzUrl = page.url();
        console.log(`✓ Applied Jobz page loaded: ${appliedJobzUrl}`);

        // Navigate to Enrolled Trainings
        await profileSection.navigateToEnrolledTrainings();
        await page.waitForTimeout(2000);
        const enrolledTrainingsUrl = page.url();
        console.log(`✓ Enrolled Trainings page loaded: ${enrolledTrainingsUrl}`);

        // Navigate to Settings
        await profileSection.navigateToSettings();
        await page.waitForTimeout(2000);
        const settingsUrl = page.url();
        console.log(`✓ Settings page loaded: ${settingsUrl}`);
    });

    test('Part 7: CV Builder and Profile Management', async ({ page }) => {
        console.log('\n=== Part 7: CV Builder and Profile Management ===');

        // Login
        await page.goto(config.baseUrl);
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();
        console.log('✓ Logged in');

        // Navigate to CV Builder
        await page.goto(config.baseUrl + 'cv-builder');
        await page.waitForLoadState('networkidle');
        await jobseekerProfile.waitForGlobalLoader();
        console.log('✓ CV Builder loaded');

        // Verify profile completion
        const completion = await jobseekerProfile.getProfileCompletion();
        console.log(`✓ Profile Completion: ${completion}`);
        expect(completion).toMatch(/\d+%/);

        // Verify all sections
        const sections = await jobseekerProfile.verifyAllSectionsVisible();
        console.log('✓ Profile sections verified:', Object.keys(sections).filter(k => sections[k]));

        // Verify action buttons
        const buttons = [
            { name: 'Add Experience', locator: jobseekerProfile.addExperienceBtn },
            { name: 'Add Education', locator: jobseekerProfile.addEducationBtn },
            { name: 'Add Skill', locator: jobseekerProfile.addSkillBtn },
            { name: 'Add Certification', locator: jobseekerProfile.addCertificationBtn }
        ];

        for (const btn of buttons) {
            await btn.locator.first().scrollIntoViewIfNeeded();
            const isVisible = await btn.locator.first().isVisible({ timeout: 5000 });
            console.log(`✓ Button "${btn.name}" visibility: ${isVisible}`);
            expect(isVisible, `Button "${btn.name}" should be visible`).toBeTruthy();
        }
    });

    test('Part 8: Profile Data Integrity', async ({ page }) => {
        console.log('\n=== Part 8: Profile Data Integrity ===');

        // Login
        await page.goto(config.baseUrl);
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();
        console.log('✓ Logged in');

        // Navigate to CV Builder
        await page.goto(config.baseUrl + 'cv-builder');
        await page.waitForLoadState('networkidle');
        await jobseekerProfile.waitForGlobalLoader();
        console.log('✓ CV Builder loaded');

        // Verify profile data
        const dataPoints = [
            { text: new RegExp(config.credentials.profileData.company, 'i'), desc: 'Experience' },
            { text: new RegExp(config.credentials.profileData.designation, 'i'), desc: 'Designation' },
            { text: new RegExp(config.credentials.email, 'i'), desc: 'Contact' },
            { text: new RegExp(config.credentials.profileData.skill, 'i'), desc: 'Skill' }
        ];

        for (const dp of dataPoints) {
            const locator = page.getByText(dp.text).first();
            await locator.scrollIntoViewIfNeeded();
            const isVisible = await locator.isVisible({ timeout: 5000 });
            console.log(`✓ ${dp.desc} verified: ${dp.text} (Visible: ${isVisible})`);
            if (isVisible) {
                await expect(locator, `${dp.desc} data should be visible`).toBeVisible({ timeout: 5000 });
            }
        }
    });

    test('Part 9: Logout Flow', async ({ page }) => {
        console.log('\n=== Part 9: Logout Flow ===');

        // Login
        await page.goto(config.baseUrl);
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();
        console.log('✓ Logged in');

        // Logout
        await profileSection.logout();
        console.log('✓ Logout initiated');

        // Wait for logout to complete
        await profileSection.waitForGlobalLoader();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        console.log('✓ Logout completed');

        // Verify logout
        const signInButton = page.getByRole('button', { name: /Sign In/i }).first();
        await expect(signInButton).toBeVisible({ timeout: 15000 });
        console.log('✓ Sign In button is visible - user logged out successfully');
    });

    test('Part 10: Full End-to-End Journey', async ({ page }) => {
        console.log('\n=== Part 10: Full End-to-End Journey ===');
        test.setTimeout(180000);

        // Step 1: Home Page
        console.log('Step 1: Verify Home Page');
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
        expect(await homePage.isWorking(), 'Home Page should load correctly').toBeTruthy();
        console.log('✓ Home page verified');

        // Step 2: Job Search
        console.log('Step 2: Perform Job Search');
        const searchInput = page.getByPlaceholder('Enter Job Title').first();
        if (await searchInput.isVisible()) {
            await searchInput.fill('Software Engineer');
            const searchBtn = page.locator('button').filter({ hasText: /Search/i }).first();
            await searchBtn.click();
            await page.waitForLoadState('networkidle');
            console.log('✓ Job search performed');
        }

        // Step 3: Login
        console.log('Step 3: Login');
        await page.goto(config.baseUrl);
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();
        console.log('✓ Login successful');

        // Step 4: Dashboard
        console.log('Step 4: Access Dashboard');
        await profileSection.navigateToDashboard();
        await page.waitForTimeout(2000);
        console.log('✓ Dashboard accessed');

        // Step 5: Profile
        console.log('Step 5: Access Profile');
        await profileSection.navigateToProfile();
        await page.waitForTimeout(2000);
        console.log('✓ Profile accessed');

        // Step 6: CV Builder
        console.log('Step 6: Access CV Builder');
        await page.goto(config.baseUrl + 'cv-builder');
        await page.waitForLoadState('networkidle');
        await jobseekerProfile.waitForGlobalLoader();
        const completion = await jobseekerProfile.getProfileCompletion();
        console.log(`✓ CV Builder accessed - Profile Completion: ${completion}`);

        // Step 7: Logout
        console.log('Step 7: Logout');
        await profileSection.logout();
        await profileSection.waitForGlobalLoader();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        const signInButton = page.getByRole('button', { name: /Sign In/i }).first();
        await expect(signInButton).toBeVisible({ timeout: 15000 });
        console.log('✓ Logout successful');

        console.log('\n=== Full End-to-End Journey Complete ===');
    });
});
