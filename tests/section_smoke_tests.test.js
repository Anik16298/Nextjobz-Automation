import { test, expect } from '@playwright/test';
import {
    CareerGuidancePage,
    CareerAbroadPage,
    CampusConnectPage,
    AboutUsPage,
    OurTeamPage,
    ContactPage,
    MidCareerPage,
    LearningLabPage,
    FAQPage,
    HiringAdvicePage,
    TermsOfUsePage,
    PrivacyPolicyPage
} from '../pages/index.js';

test.describe('Nextjobz Section Pages Smoke Tests', () => {

    test('Career Development section should load', async ({ page }) => {
        const careerPage = new CareerGuidancePage(page);
        await careerPage.navigate();
        expect(await careerPage.isWorking()).toBeTruthy();
    });

    test('Career Abroad section should load', async ({ page }) => {
        const abroadPage = new CareerAbroadPage(page);
        await abroadPage.navigate('/career-abroad');
        expect(await abroadPage.isWorking()).toBeTruthy();
    });

    test('Campus Connect section should load', async ({ page }) => {
        const campusPage = new CampusConnectPage(page);
        await campusPage.navigate('/campus-connect');
        await expect(page.getByText(/Campus Connect/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('About Us page should load', async ({ page }) => {
        const aboutPage = new AboutUsPage(page);
        await aboutPage.navigate('/about-us');
        expect(await aboutPage.isWorking()).toBeTruthy();
    });

    test('Our Team page should load', async ({ page }) => {
        const teamPage = new OurTeamPage(page);
        await teamPage.navigate('/our-team');
        expect(await teamPage.isWorking()).toBeTruthy();
    });

    test('Contact page should load', async ({ page }) => {
        const contactPage = new ContactPage(page);
        await contactPage.navigate('/contact-us');
        expect(await contactPage.isWorking()).toBeTruthy();
    });

    test('Mid Career section should load', async ({ page }) => {
        const midCareer = new MidCareerPage(page);
        await midCareer.navigate();
        expect(await midCareer.isWorking()).toBeTruthy();
    });

    test('Learning Lab section should load', async ({ page }) => {
        const learningLab = new LearningLabPage(page);
        await learningLab.navigate();
        expect(await learningLab.isWorking()).toBeTruthy();
    });

    test('FAQ page should load', async ({ page }) => {
        const faqPage = new FAQPage(page);
        await page.goto('/faq');
        await expect(page.getByText(/FAQ/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('Hiring Advice page should load', async ({ page }) => {
        const hiringAdvice = new HiringAdvicePage(page);
        await hiringAdvice.navigate();
        expect(await hiringAdvice.isWorking()).toBeTruthy();
    });

    test('Terms of Use page should load', async ({ page }) => {
        const terms = new TermsOfUsePage(page);
        await terms.navigate();
        expect(await terms.isWorking()).toBeTruthy();
    });

    test('Privacy Policy page should load', async ({ page }) => {
        const privacy = new PrivacyPolicyPage(page);
        await privacy.navigate();
        expect(await privacy.isWorking()).toBeTruthy();
    });
});
