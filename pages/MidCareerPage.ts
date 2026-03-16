import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MidCareerPage extends BasePage {
    pageTitle: any /* Locator */;
    contentCards: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Mid Career/i);
        this.contentCards = page.locator('.MuiCard-root, .MuiPaper-root');
    }

    async navigate(path?: string) {
        const url = path || '/mid-career';
        await this.page.goto(url);
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
