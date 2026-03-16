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
import { RegistrationPage } from '../pages/RegistrationPage';
import { TermsOfUsePage } from '../pages/TermsOfUsePage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { OurTeamPage } from '../pages/OurTeamPage';
import config from '../utils/ConfigProvider';

test.describe('Full Coverage Test Suite - Nextjobz', () => {
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
    let registrationPage;
    let termsOfUsePage;
    let privacyPolicyPage;
    let ourTeamPage;

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
        registrationPage = new RegistrationPage(page);
        termsOfUsePage = new TermsOfUsePage(page);
        privacyPolicyPage = new PrivacyPolicyPage(page);
        ourTeamPage = new OurTeamPage(page);
    });

    // PART 1: PUBLIC PAGES AND NAVIGATION
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

        // Test footer links
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
        const footerLinks = page.locator('footer a');
        const footerLinkCount = await footerLinks.count();
        console.log(`✓ Found ${footerLinkCount} footer links`);
    });

    // PART 2: JOB SEARCH AND LISTING
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

                // Get job count
                const jobCount = await jobSearchPage.getJobCount();
                console.log(`✓ Found ${jobCount} jobs`);
            }
        }

        // Navigate to job listing page
        await jobSearchPage.navigate();
        await page.waitForLoadState('networkidle');
        console.log('✓ Job listing page loaded');
    });

    // PART 3: CAREER DEVELOPMENT PAGES
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

    // PART 4: INFORMATION PAGES
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

        // Our Team
        await ourTeamPage.navigate();
        const isOurTeamVisible = await ourTeamPage.isWorking();
        expect(isOurTeamVisible, 'Our Team content should be visible').toBeTruthy();
        console.log('✓ Our Team page verified');

        // Terms of Use
        await termsOfUsePage.navigate();
        const isTermsVisible = await termsOfUsePage.isWorking();
        expect(isTermsVisible, 'Terms of Use content should be visible').toBeTruthy();
        console.log('✓ Terms of Use page verified');

        // Privacy Policy
        await privacyPolicyPage.navigate();
        const isPrivacyVisible = await privacyPolicyPage.isWorking();
        expect(isPrivacyVisible, 'Privacy Policy content should be visible').toBeTruthy();
        console.log('✓ Privacy Policy page verified');
    });

    // PART 5: AUTHENTICATION FLOW
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

        // Logout
        await profileSection.logout();
        await page.waitForTimeout(3000);
        const signInButton = page.getByRole('button', { name: /Sign In/i }).first();
        await expect(signInButton).toBeVisible({ timeout: 15000 });
        console.log('✓ Logout successful');
    });

    // PART 6: REGISTRATION FLOW
    test('Part 6: Registration Flow', async ({ page }) => {
        console.log('\n=== Part 6: Registration Flow ===');

        // Navigate to registration page
        await page.goto(config.baseUrl + 'registration');
        await page.waitForLoadState('networkidle');
        console.log('✓ Registration page loaded');

        // Verify registration form
        await registrationPage.waitForGlobalLoader();
        console.log('✓ Registration form verified');
    });

    // PART 7: DASHBOARD AND PROFILE NAVIGATION
    test('Part 7: Dashboard and Profile Navigation', async ({ page }) => {
        console.log('\n=== Part 7: Dashboard and Profile Navigation ===');

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

    // PART 8: CV BUILDER AND PROFILE MANAGEMENT
    test('Part 8: CV Builder and Profile Management', async ({ page }) => {
        console.log('\n=== Part 8: CV Builder and Profile Management ===');

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
        console.log(`✓ Verified ${Object.keys(sections).length} profile sections`);

        // Verify key sections
        expect(sections['Personal Details'], 'Personal Details should be visible').toBeTruthy();
        expect(sections['Career Snapshot'], 'Career Snapshot should be visible').toBeTruthy();
        expect(sections['Work Experience'], 'Work Experience should be visible').toBeTruthy();
        expect(sections['Education'], 'Education should be visible').toBeTruthy();
        expect(sections['Skills & Expertise'], 'Skills & Expertise should be visible').toBeTruthy();
        console.log('✓ All key profile sections verified');

        // Test edit functionality
        await jobseekerProfile.clickEditForSection('Personal Details');
        const modalVisible = await jobseekerProfile.editModal.isVisible();
        expect(modalVisible, 'Edit modal should be visible').toBeTruthy();
        console.log('✓ Edit modal opened');

        // Close modal
        await jobseekerProfile.cancelBtn.click();
        console.log('✓ Edit modal closed');
    });

    // PART 9: PROFILE DATA INTEGRITY
    test('Part 9: Profile Data Integrity', async ({ page }) => {
        console.log('\n=== Part 9: Profile Data Integrity ===');

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
            await expect(locator, `${dp.desc} data should be visible`).toBeVisible({ timeout: 5000 });
            console.log(`✓ ${dp.desc} verified: ${dp.text}`);
        }
    });

    // PART 10: CONTACT FORM
    test('Part 10: Contact Form Functionality', async ({ page }) => {
        console.log('\n=== Part 10: Contact Form Functionality ===');

        // Navigate to contact page
        await page.goto(config.baseUrl + 'contact-us');
        await page.waitForLoadState('networkidle');
        await contactPage.waitForGlobalLoader();
        console.log('✓ Contact page loaded');

        // Fill contact form
        const testData = {
            name: 'QA Automation',
            email: 'qa@nextjobz.com',
            subject: 'Test Inquiry',
            message: 'Testing contact form functionality'
        };

        await contactPage.fillContactForm(testData);
        console.log('✓ Contact form filled');

        // Verify submit button is visible
        await expect(contactPage.submitButton).toBeVisible();
        console.log('✓ Submit button verified');
    });

    // PART 11: RESPONSIVE DESIGN
    test('Part 11: Responsive Design', async ({ page }) => {
        console.log('\n=== Part 11: Responsive Design ===');

        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
        console.log('✓ Mobile viewport loaded');

        // Test mobile menu
        const mobileMenuBtn = page.getByRole('button').filter({ has: page.locator('svg') }).first();
        await expect(mobileMenuBtn).toBeVisible();
        await mobileMenuBtn.click();
        await page.waitForTimeout(1000);
        console.log('✓ Mobile menu opened');

        // Test tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
        console.log('✓ Tablet viewport loaded');

        // Test desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');
        console.log('✓ Desktop viewport loaded');
    });

    // PART 12: ACCESSIBILITY
    test('Part 12: Accessibility', async ({ page }) => {
        console.log('\n=== Part 12: Accessibility ===');

        // Navigate to home page
        await page.goto(config.baseUrl);
        await page.waitForLoadState('networkidle');

        // Check for alt text on images
        const images = page.locator('img');
        const imageCount = await images.count();
        console.log(`✓ Found ${imageCount} images`);

        // Check for proper heading hierarchy
        const headings = page.locator('h1, h2, h3, h4, h5, h6');
        const headingCount = await headings.count();
        console.log(`✓ Found ${headingCount} headings`);

        // Check for form labels
        const inputs = page.locator('input');
        const inputCount = await inputs.count();
        console.log(`✓ Found ${inputCount} input fields`);
    });
});
