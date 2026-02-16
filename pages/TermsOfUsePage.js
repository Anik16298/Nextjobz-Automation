import { BasePage } from './BasePage.js';

export class TermsOfUsePage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Terms/i);
    }

    async navigate() {
        await this.page.goto('/terms-of-use');
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
