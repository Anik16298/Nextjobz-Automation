import { BasePage } from './BasePage.js';

export class HiringAdvicePage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Hiring Advice/i);
    }

    async navigate() {
        await this.page.goto('/hiring-advice');
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
