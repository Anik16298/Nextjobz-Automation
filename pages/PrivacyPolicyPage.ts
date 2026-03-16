import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PrivacyPolicyPage extends BasePage {
    pageTitle: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Privacy Policy/i);
    }

    async navigate(path?: string) {
        const url = path || '/privacyPolicy';
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
