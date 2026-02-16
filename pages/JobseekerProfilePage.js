import { BasePage } from './BasePage.js';

export class JobseekerProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.url = '/cv-builder';

        // Main sections
        this.personalDetailsSection = page.locator('h6:has-text("Personal Details")');
        this.careerSnapshotSection = page.locator('h6:has-text("Career Snapshot")');
        this.workExperienceSection = page.locator('h6:has-text("Work Experience")');
        this.educationSection = page.locator('h6:has-text("Education")');
        this.skillsSection = page.locator('h6:has-text("Skills & Expertise")');
        this.trainingSection = page.locator('h6:has-text("Training and Certification")');
        this.projectsSection = page.locator('h6:has-text("Projects")');
        this.volunteerSection = page.locator('h6:has-text("Club and Volunteer Experience")');
        this.portfolioSection = page.locator('h6:has-text("Portfolio/ Links")');
        this.preferencesSection = page.locator('h6:has-text("Availability and Job Preferences")');
        this.languageSection = page.locator('h6:has-text("Language")');
        this.referenceSection = page.locator('h6:has-text("Reference")');
        this.otherInfoSection = page.locator('h6:has-text("Other Information")');

        // Buttons & Icons
        this.addExperienceBtn = page.getByRole('button', { name: /Add Another Work Experience/i });
        this.addEducationBtn = page.getByRole('button', { name: /Add Another Education/i });
        this.addSkillBtn = page.getByRole('button', { name: /Add Another Skill/i });
        this.addCertificationBtn = page.getByRole('button', { name: /Add Another Certification/i });
        this.saveBtn = page.getByRole('button', { name: /Save|Update/i });
        this.cancelBtn = page.getByRole('button', { name: /Cancel/i });

        // Progress indicator
        this.profilePercentage = page.locator('.progress-text').or(page.locator('text=/100%/')).first();

        // Modal Locators
        this.editModal = page.locator('div[role="dialog"]');
    }

    async navigate() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');
    }

    async clickEditForSection(sectionName) {
        // Find the section container and then the edit button within it
        const sectionHeader = this.page.locator('h6').filter({ hasText: new RegExp(`^${sectionName}$`, 'i') }).first();
        const container = sectionHeader.locator('xpath=..'); // Parent container
        const editIcon = container.locator('svg[data-testid="EditIcon"], .MuiIconButton-root').first();

        await editIcon.scrollIntoViewIfNeeded();
        await editIcon.click();
        await this.editModal.waitFor({ state: 'visible', timeout: 5000 });
    }

    async updatePersonalDetails(details) {
        await this.clickEditForSection('Personal Details');

        if (details.bio) {
            const bioField = this.page.getByLabel(/Bio|About|Summary/i).first();
            await bioField.fill(details.bio);
        }

        if (details.location) {
            const locField = this.page.getByLabel(/Location|City/i).first();
            await locField.fill(details.location);
        }

        await this.saveBtn.first().click();
        await this.waitForGlobalLoader();
    }

    async verifyAllSectionsVisible() {
        const sections = [
            'Personal Details', 'Career Snapshot', 'Work Experience', 'Education',
            'Skills & Expertise', 'Training and Certification', 'Projects',
            'Club and Volunteer Experience', 'Portfolio/ Links',
            'Availability and Job Preferences', 'Language', 'Reference', 'Other Information'
        ];

        const results = {};
        for (const name of sections) {
            try {
                const locator = this.page.locator('h6').filter({ hasText: new RegExp(`^${name}$`, 'i') }).first();
                await locator.scrollIntoViewIfNeeded();
                results[name] = await locator.isVisible({ timeout: 5000 });
            } catch (e) {
                results[name] = false;
            }
        }
        return results;
    }

    async getProfileCompletion() {
        await this.profilePercentage.waitFor({ state: 'visible', timeout: 10000 });
        const text = await this.profilePercentage.innerText();
        return text.trim();
    }
}
