import { BasePage } from './BasePage.js';

export class PrivacyPolicyPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Privacy Policy/i);
    }

    async navigate() {
        await this.page.goto('/privacyPolicy');
        await this.page.waitForLoadState('networkidle');
    }

    async isWorking() {
        try {
            await this.pageTitle.first().waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
