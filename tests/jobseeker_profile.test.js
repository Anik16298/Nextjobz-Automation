import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { JobseekerProfilePage } from '../pages/JobseekerProfilePage.js';
import config from '../utils/ConfigProvider.js';

test.describe('Jobseeker Profile - Deep Test (CV Builder)', () => {
    let loginPage;
    let jobseekerProfile;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        jobseekerProfile = new JobseekerProfilePage(page);

        // Login
        await loginPage.navigate('/');
        await loginPage.openLoginModal();
        await loginPage.performLogin(config.credentials.phone, config.credentials.password);
        await loginPage.verifyLogin();

        // Navigate to CV Builder
        await page.goto(config.baseUrl + 'cv-builder');
        await page.waitForLoadState('networkidle');
        await jobseekerProfile.waitForGlobalLoader();
        await page.waitForTimeout(5000);
    });

    test('should verify visibility of all sections', async ({ page }) => {
        const sectionsResult = await jobseekerProfile.verifyAllSectionsVisible();
        console.log('Sections visibility:', JSON.stringify(sectionsResult, null, 2));

        const expected = [
            'Personal Details', 'Career Snapshot', 'Work Experience', 'Skills & Expertise',
            'Education', 'Training and Certification', 'Projects',
            'Club and Volunteer Experience', 'Portfolio/ Links',
            'Availability and Job Preferences', 'Language', 'Reference', 'Other Information'
        ];

        for (const name of expected) {
            expect(sectionsResult[name], `Section "${name}" should be visible`).toBeTruthy();
        }
    });

    test('should verify profile completion percentage', async ({ page }) => {
        const percentage = await jobseekerProfile.getProfileCompletion();
        console.log(`Profile Completion: ${percentage}`);
        expect(percentage).toMatch(/\d+%/);
    });

    test('should verify presence of all key action buttons', async ({ page }) => {
        const buttons = [
            { name: 'Add Experience', locator: jobseekerProfile.addExperienceBtn },
            { name: 'Add Education', locator: jobseekerProfile.addEducationBtn },
            { name: 'Add Skill', locator: jobseekerProfile.addSkillBtn },
            { name: 'Add Certification', locator: jobseekerProfile.addCertificationBtn },
            { name: 'Add Project', locator: jobseekerProfile.addProjectBtn },
            { name: 'Add Volunteer', locator: jobseekerProfile.addVolunteerBtn },
            { name: 'Add Link', locator: jobseekerProfile.addLinkBtn },
            { name: 'Add Accomplishment', locator: jobseekerProfile.addAccomplishmentBtn },
            { name: 'Add Language', locator: jobseekerProfile.addLanguageBtn },
            { name: 'Add Reference', locator: jobseekerProfile.addReferenceBtn }
        ];

        for (const btn of buttons) {
            await btn.locator.first().scrollIntoViewIfNeeded();
            const isVisible = await btn.locator.first().isVisible({ timeout: 5000 });
            console.log(`Button "${btn.name}" visibility: ${isVisible}`);
            expect(isVisible, `Button "${btn.name}" should be visible`).toBeTruthy();
        }
    });

    test('should verify profile data integrity', async ({ page }) => {
        const dataPoints = [
            { text: /Akij iBOS Limited/i, desc: 'Experience' },
            { text: /Junior SQA Engineer/i, desc: 'Designation' },
            { text: /arunabhoanik@gmail.com/i, desc: 'Contact' },
            { text: /Manual Testing/i, desc: 'Skill' }
        ];

        for (const dp of dataPoints) {
            const locator = page.getByText(dp.text).first();
            await locator.scrollIntoViewIfNeeded();
            await expect(locator, `${dp.desc} data should be visible`).toBeVisible({ timeout: 5000 });
        }
    });
});
