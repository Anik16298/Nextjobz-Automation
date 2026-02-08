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

        // Buttons
        this.addExperienceBtn = page.getByRole('button', { name: /Add Another Work Experience/i });
        this.addEducationBtn = page.getByRole('button', { name: /Add Another Education/i });
        this.addSkillBtn = page.getByRole('button', { name: /Add Another Skill/i });
        this.addCertificationBtn = page.getByRole('button', { name: /Add Another Certification/i });
        this.addProjectBtn = page.getByRole('button', { name: /Add Project/i });
        this.addVolunteerBtn = page.getByRole('button', { name: /Add Club and Volunteer Experience/i });
        this.addLinkBtn = page.getByRole('button', { name: /Add Another Link/i });
        this.addAccomplishmentBtn = page.getByRole('button', { name: /Add Accomplishment/i });
        this.addLanguageBtn = page.getByRole('button', { name: /Add Language/i });
        this.addReferenceBtn = page.getByRole('button', { name: /Add Another Reference/i });

        // Progress indicator
        this.profilePercentage = page.locator('.progress-text').or(page.locator('text=/100%/')).first();
    }

    async navigate() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');
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
                // Construct locator dynamically to be sure
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
