import { BasePage } from './BasePage.js';

export class LearningLabPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Learning Lab/i);
        this.articles = page.locator('.MuiCard-root');
    }

    async navigate() {
        await this.page.goto('/learning-lab');
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
