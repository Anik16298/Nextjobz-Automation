import { test, expect } from '@playwright/test';
import {
    HomePage,
    JobzPage,
    CareerDevelopmentPage,
    CareerAbroadPage,
    CampusConnectPage,
    CareerGuidancePage,
    EmployerPage,
    LoginPage,
    RegistrationPage,
    AboutUsPage,
    OurTeamPage,
    ContactPage,
    FAQPage,
    ProfilePage
} from '../pages/index.js';
import config from '../utils/ConfigProvider.js';

test.describe('Nextjobz Website Structural Tour', () => {

    test('Sequence 1: Landing Page (Home)', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate('/');
        expect(await homePage.isWorking()).toBeTruthy();
        console.log('✓ Home Page loaded');
    });

    test('Sequence 2: Jobz Listing', async ({ page }) => {
        const jobzPage = new JobzPage(page);
        await jobzPage.navigate('/job');
        expect(await jobzPage.isLoaded()).toBeTruthy();
        console.log('✓ Jobz Page loaded');
    });

    test('Sequence 3: Career Development', async ({ page }) => {
        const careerDev = new CareerDevelopmentPage(page);
        await careerDev.navigate('/career-guidance'); // Nextjobz uses /career-guidance for this section
        expect(await careerDev.isWorking()).toBeTruthy();
        console.log('✓ Career Development loaded');
    });

    test('Sequence 4: Career Abroad', async ({ page }) => {
        const careerAbroad = new CareerAbroadPage(page);
        await careerAbroad.navigate('/career-abroad');
        expect(await careerAbroad.isWorking()).toBeTruthy();
        console.log('✓ Career Abroad loaded');
    });

    test('Sequence 5: Campus Connect', async ({ page }) => {
        const campus = new CampusConnectPage(page);
        await campus.navigate('/campus-connect');
        // Campus connect check
        await expect(page.getByText(/Campus Connect/i).first()).toBeVisible();
        console.log('✓ Campus Connect loaded');
    });

    test('Sequence 6: Career Guidance (Blog)', async ({ page }) => {
        const guidance = new CareerGuidancePage(page);
        await guidance.navigate('/guidance');
        expect(await guidance.isWorking()).toBeTruthy();
        console.log('✓ Career Guidance loaded');
    });

    test('Sequence 7: For Employers', async ({ page }) => {
        const employer = new EmployerPage(page);
        await employer.navigate('/employer');
        expect(await employer.isWorking()).toBeTruthy();
        console.log('✓ Employer Page loaded');
    });

    test('Sequence 8: Registration Page', async ({ page }) => {
        const registration = new RegistrationPage(page);
        await registration.navigate('/register');
        expect(await registration.isWorking()).toBeTruthy();
        console.log('✓ Registration Page loaded');
    });

    test('Sequence 9: Login & User Flow', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const profilePage = new ProfilePage(page);

        await loginPage.navigate('/');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);

        const loggedIn = await loginPage.verifyLogin();
        expect(loggedIn).toBeTruthy();
        console.log('✓ Login Successful');

        // Verify Profile Page while logged in
        await profilePage.navigateToProfile();
        expect(await profilePage.isLoggedIn()).toBeTruthy();
        console.log('✓ User Profile loaded');

        // Logout
        await profilePage.logout();
        console.log('✓ Logout Successful');
    });

    test('Sequence 10: Footer - About Us', async ({ page }) => {
        const about = new AboutUsPage(page);
        await about.navigate('/about-us');
        expect(await about.isWorking()).toBeTruthy();
        console.log('✓ About Us Page loaded');
    });

    test('Sequence 11: Footer - Our Team', async ({ page }) => {
        const team = new OurTeamPage(page);
        await team.navigate('/our-team');
        expect(await team.isWorking()).toBeTruthy();
        console.log('✓ Our Team Page loaded');
    });

    test('Sequence 12: Footer - Contact Us', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.navigate('/contact-us');
        expect(await contact.isWorking()).toBeTruthy();
        console.log('✓ Contact Us Page loaded');
    });

    test('Sequence 13: Footer - FAQ', async ({ page }) => {
        const faq = new FAQPage(page);
        await faq.navigate('/faq');
        expect(await faq.isWorking()).toBeTruthy();
        console.log('✓ FAQ Page loaded');
    });

});
