import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AppliedJobzPage extends BasePage {
    pageTitle: any /* Locator */;
    applicationHistory: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Applied Jobz/i);
        this.applicationHistory = page.locator('.MuiTable-root, .MuiCard-root');
    }

    async isWorking(): Promise<boolean> {
        try {
            await this.pageTitle.first().waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
