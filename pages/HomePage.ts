import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    smarterCareerSection: any /* Locator */;
    categorySection: any /* Locator */;
    topCompaniesSection: any /* Locator */;
    cvBuilderSection: any /* Locator */;
    careerGuidanceSection: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.smarterCareerSection = page.getByText(/Smarter Career Building Starts Here/i);
        this.categorySection = page.getByText(/Jobz by Category/i);
        this.topCompaniesSection = page.getByText(/Top Companies Hiring Now/i);
        this.cvBuilderSection = page.getByText(/Build a Winning CV/i);
        this.careerGuidanceSection = page.getByText(/Career Guidance/i).first();
    }

    async isWorking(): Promise<boolean> {
        try {
            await this.smarterCareerSection.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
