import { BasePage } from './BasePage.js';

export class JobDetailsPage extends BasePage {
    constructor(page) {
        super(page);
        this.jobTitle = page.locator('h1, h2, h3, h4').first();
        this.applyButton = page.getByRole('button', { name: /Apply|Submit Application/i });
        this.saveButton = page.getByRole('button', { name: /Save/i });
        this.companyLink = page.locator('a').filter({ hasText: /Company|Employer/i });
        this.jobDescription = page.locator('.MuiTypography-root').filter({ hasText: /Description|Requirements|Responsibilities/i });
    }

    async isWorking() {
        try {
            await this.jobTitle.waitFor({ state: 'visible', timeout: 10000 });
            return await this.applyButton.isVisible();
        } catch (e) {
            return false;
        }
    }
}
