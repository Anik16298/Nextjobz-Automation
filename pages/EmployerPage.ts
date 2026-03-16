import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployerPage extends BasePage {
    pageTitle: any /* Locator */;
    postJobBtn: any /* Locator */;
    employerLoginBtn: any /* Locator */;
    pricingLink: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Employer/i).first();
        this.postJobBtn = page.getByRole('button', { name: /Post a Job|Post Job/i });
        this.employerLoginBtn = page.getByText(/Employer Login/i);
        this.pricingLink = page.getByText(/Pricing|Packages/i);
    }

    async navigate(path = '/employer') {
        await this.page.goto(path);
        await this.page.waitForLoadState('networkidle');
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
