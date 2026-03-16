import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FAQPage extends BasePage {
    pageTitle: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/FAQ/i).first();
    }

    async navigate(path = '/faq') {
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
