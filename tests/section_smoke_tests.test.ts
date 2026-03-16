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
} from '../pages/index';

test.describe('Nextjobz Section Pages Smoke Tests', () => {
    test.setTimeout(60000);

    test('Career Development section should load', async ({ page }) => {
        const careerPage = new CareerGuidancePage(page);
        await careerPage.navigate();
        const isWorking = await careerPage.isWorking();
        expect(isWorking, 'Career Guidance page should load correctly').toBeTruthy();
        
        const articleCount = await careerPage.getArticleCount();
        console.log(`✓ Career Development loaded with ${articleCount} articles`);
        
        await page.screenshot({ path: 'test-results/career_guidance_smoke.png' });
    });

    test('Career Abroad section should load', async ({ page }) => {
        const abroadPage = new CareerAbroadPage(page);
        await abroadPage.navigate();
        const isWorking = await abroadPage.isWorking();
        expect(isWorking, 'Career Abroad page should load correctly').toBeTruthy();
        console.log('✓ Career Abroad section loaded successfully');
        
        await page.screenshot({ path: 'test-results/career_abroad_smoke.png' });
    });

    test('Campus Connect section should load', async ({ page }) => {
        const campusPage = new CampusConnectPage(page);
        await campusPage.navigate();
        await expect(page.getByText(/Campus Connect/i).first()).toBeVisible({ timeout: 10000 });
        
        const eventCount = await campusPage.getEventCount();
        console.log(`✓ Campus Connect loaded with ${eventCount} events`);
        
        await page.screenshot({ path: 'test-results/campus_connect_smoke.png' });
    });

    test('About Us page should load', async ({ page }) => {
        const aboutPage = new AboutUsPage(page);
        await aboutPage.navigate();
        const isWorking = await aboutPage.isWorking();
        expect(isWorking, 'About Us page should load correctly').toBeTruthy();
        console.log('✓ About Us page loaded successfully');
        
        await page.screenshot({ path: 'test-results/about_us_smoke.png' });
    });

    test('Our Team page should load', async ({ page }) => {
        const teamPage = new OurTeamPage(page);
        await teamPage.navigate();
        const isWorking = await teamPage.isWorking();
        expect(isWorking, 'Our Team page should load correctly').toBeTruthy();
        console.log('✓ Our Team page loaded successfully');
        
        await page.screenshot({ path: 'test-results/our_team_smoke.png' });
    });

    test('Contact page should load', async ({ page }) => {
        const contactPage = new ContactPage(page);
        await contactPage.navigate();
        const isWorking = await contactPage.isWorking();
        expect(isWorking, 'Contact page should load correctly').toBeTruthy();
        console.log('✓ Contact page loaded successfully');
        
        await page.screenshot({ path: 'test-results/contact_smoke.png' });
    });

    test('Mid Career section should load', async ({ page }) => {
        const midCareer = new MidCareerPage(page);
        await midCareer.navigate();
        const isWorking = await midCareer.isWorking();
        expect(isWorking, 'Mid Career page should load correctly').toBeTruthy();
        console.log('✓ Mid Career section loaded successfully');
        
        await page.screenshot({ path: 'test-results/mid_career_smoke.png' });
    });

    test('Learning Lab section should load', async ({ page }) => {
        const learningLab = new LearningLabPage(page);
        await learningLab.navigate();
        const isWorking = await learningLab.isWorking();
        expect(isWorking, 'Learning Lab page should load correctly').toBeTruthy();
        console.log('✓ Learning Lab section loaded successfully');
        
        await page.screenshot({ path: 'test-results/learning_lab_smoke.png' });
    });

    test('FAQ page should load', async ({ page }) => {
        const faqPage = new FAQPage(page);
        await faqPage.navigate();
        await expect(page.getByText(/FAQ/i).first()).toBeVisible({ timeout: 10000 });
        console.log('✓ FAQ page loaded successfully');
        
        await page.screenshot({ path: 'test-results/faq_smoke.png' });
    });

    test('Hiring Advice page should load', async ({ page }) => {
        const hiringAdvice = new HiringAdvicePage(page);
        await hiringAdvice.navigate();
        const isWorking = await hiringAdvice.isWorking();
        expect(isWorking, 'Hiring Advice page should load correctly').toBeTruthy();
        console.log('✓ Hiring Advice section loaded successfully');
        
        await page.screenshot({ path: 'test-results/hiring_advice_smoke.png' });
    });

    test('Terms of Use page should load', async ({ page }) => {
        const terms = new TermsOfUsePage(page);
        await terms.navigate();
        const isWorking = await terms.isWorking();
        expect(isWorking, 'Terms of Use page should load correctly').toBeTruthy();
        console.log('✓ Terms of Use page loaded successfully');
        
        await page.screenshot({ path: 'test-results/terms_of_use_smoke.png' });
    });

    test('Privacy Policy page should load', async ({ page }) => {
        const privacy = new PrivacyPolicyPage(page);
        await privacy.navigate();
        const isWorking = await privacy.isWorking();
        expect(isWorking, 'Privacy Policy page should load correctly').toBeTruthy();
        console.log('✓ Privacy Policy page loaded successfully');
        
        await page.screenshot({ path: 'test-results/privacy_policy_smoke.png' });
    });
});
