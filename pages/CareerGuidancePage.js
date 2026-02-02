import { BasePage } from './BasePage.js';

export class CareerGuidancePage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Career Advice|Career Guidance/i).first();
        this.blogCards = page.locator('div[class*="MuiPaper-root"]');
    }

    async isWorking() {
        try {
            await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    async getArticleCount() {
        return await this.blogCards.count();
    }
}
