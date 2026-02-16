import { BasePage } from './BasePage.js';

export class MidCareerPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Mid Career/i);
        this.contentCards = page.locator('.MuiCard-root, .MuiPaper-root');
    }

    async navigate() {
        await this.page.goto('/mid-career');
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
