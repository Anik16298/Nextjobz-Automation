import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AboutUsPage extends BasePage {
    pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/About Us/i).first();
    }

    async navigate(path = '/about-us') {
        await this.page.goto(path);
        await this.page.waitForLoadState('networkidle');
    }

    async isWorking(): Promise<boolean> {
        try {
            await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
