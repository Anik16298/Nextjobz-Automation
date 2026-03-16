import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HiringAdvicePage extends BasePage {
    pageTitle: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Hiring Advice/i);
    }

    async navigate(path?: string) {
        const url = path || '/hiring-advice';
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
