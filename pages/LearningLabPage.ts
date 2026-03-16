import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LearningLabPage extends BasePage {
    pageTitle: any /* Locator */;
    articles: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Learning Lab/i);
        this.articles = page.locator('.MuiCard-root');
    }

    async navigate(path?: string) {
        const url = path || '/learning-lab';
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
