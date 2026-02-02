import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.smarterCareerSection = page.getByText(/Smarter Career Building Starts Here/i);
        this.categorySection = page.getByText(/Jobz by Category/i);
        this.topCompaniesSection = page.getByText(/Top Companies Hiring Now/i);
        this.cvBuilderSection = page.getByText(/Build a Winning CV/i);
        this.careerGuidanceSection = page.getByText(/Career Guidance/i).first();
    }

    async isWorking() {
        try {
            await this.smarterCareerSection.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
