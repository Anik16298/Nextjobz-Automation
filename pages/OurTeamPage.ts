import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OurTeamPage extends BasePage {
    pageTitle: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Our Team/i).first();
    }

    async navigate(path = '/our-team') {
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
