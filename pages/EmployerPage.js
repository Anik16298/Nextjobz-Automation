import { BasePage } from './BasePage.js';

export class EmployerPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Employer/i).first();
        this.postJobBtn = page.getByRole('button', { name: /Post a Job|Post Job/i });
        this.employerLoginBtn = page.getByText(/Employer Login/i);
        this.pricingLink = page.getByText(/Pricing|Packages/i);
    }

    async isWorking() {
        try {
            await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
