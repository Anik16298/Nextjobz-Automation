import { test, expect } from '@playwright/test';
import { CareerDevelopmentPage } from '../pages/CareerDevelopmentPage.js';
import { CareerAbroadPage } from '../pages/CareerAbroadPage.js';
import { CampusConnectPage } from '../pages/CampusConnectPage.js';
import { AboutUsPage } from '../pages/AboutUsPage.js';
import { OurTeamPage } from '../pages/OurTeamPage.js';
import { ContactPage } from '../pages/ContactPage.js';

test.describe('Nextjobz Section Pages Smoke Tests', () => {

    test('Career Development section should load', async ({ page }) => {
        const careerPage = new CareerDevelopmentPage(page);
        await careerPage.navigate('/career-guidance'); // Updated from /career-development based on screenshot URL
        const working = await careerPage.isWorking();
        expect(working, 'Career Development page should be working').toBeTruthy();
    });

    test('Career Abroad section should load', async ({ page }) => {
        const abroadPage = new CareerAbroadPage(page);
        await abroadPage.navigate('/career-abroad');
        const working = await abroadPage.isWorking();
        expect(working, 'Career Abroad page should be working').toBeTruthy();
    });

    test('Campus Connect section should load', async ({ page }) => {
        const campusPage = new CampusConnectPage(page);
        await campusPage.navigate('/campus-connect');
        await expect(page.getByText(/Campus Connect/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('About Us page should load', async ({ page }) => {
        const aboutPage = new AboutUsPage(page);
        await aboutPage.navigate('/about-us');
        const working = await aboutPage.isWorking();
        expect(working, 'About Us page should be working').toBeTruthy();
    });

    test('Our Team page should load', async ({ page }) => {
        const teamPage = new OurTeamPage(page);
        await teamPage.navigate('/our-team');
        const working = await teamPage.isWorking();
        expect(working, 'Our Team page should be working').toBeTruthy();
    });

    test('Contact page should load', async ({ page }) => {
        const contactPage = new ContactPage(page);
        await contactPage.navigate('/contact-us');
        const working = await contactPage.isWorking();
        expect(working, 'Contact page should be working').toBeTruthy();
    });


    test('Mid Career section should load', async ({ page }) => {
        await page.goto('/mid-career');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(/Mid Career/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('Learning Lab section should load', async ({ page }) => {
        await page.goto('/learning-lab');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(/Learning Lab/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('FAQ page should load', async ({ page }) => {
        await page.goto('/faq');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(/FAQ/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('Hiring Advice page should load', async ({ page }) => {
        await page.goto('/hiring-advice');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(/Hiring Advice/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('Terms of Use page should load', async ({ page }) => {
        await page.goto('/terms-of-use');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(/Terms/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('Privacy Policy page should load', async ({ page }) => {
        await page.goto('/privacyPolicy');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(/Privacy Policy/i).first()).toBeVisible({ timeout: 10000 });
    });
});
