import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { JobseekerProfilePage } from '../pages/JobseekerProfilePage';
import config from '../utils/ConfigProvider';

test.describe('Profile Data Filling - Using Config Data', () => {
    let loginPage: LoginPage;
    let jobseekerProfile: JobseekerProfilePage;

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

    test('should update personal details with config data', async ({ page }) => {
        const personalDetails: { bio: string; location: string } = {
            bio: `Experienced ${config.credentials.profileData.designation} at ${config.credentials.profileData.company}`,
            location: 'Dhaka, Bangladesh'
        };

        await jobseekerProfile.updatePersonalDetails(personalDetails);

        // Verify the data was saved
        await page.waitForTimeout(2000);
        await expect(page.getByText(new RegExp(personalDetails.bio, 'i'))).toBeVisible({ timeout: 10000 });
        console.log('✓ Personal details updated successfully');
    });

    test('should verify profile data integrity with config data', async ({ page }) => {
        const dataPoints: Array<{ text: RegExp; desc: string }> = [
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

    test('should verify all profile sections are accessible', async ({ page }) => {
        const sectionsResult: Record<string, boolean> = await jobseekerProfile.verifyAllSectionsVisible();
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
        console.log('✓ All profile sections verified');
    });

    test('should verify profile completion percentage', async ({ page }) => {
        const percentage: string = await jobseekerProfile.getProfileCompletion();
        console.log(`Profile Completion: ${percentage}`);
        expect(percentage).toMatch(/\d+%/);
        console.log('✓ Profile completion verified');
    });

    test('should verify presence of all key action buttons', async ({ page }) => {
        const buttons: Array<{ name: string; locator: any }> = [
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
        console.log('✓ All action buttons verified');
    });
});
