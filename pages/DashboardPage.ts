import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    pageTitle: any /* Locator */;
    summaryCards: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Dashboard/i);
        this.summaryCards = page.locator('.MuiCard-root');
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
