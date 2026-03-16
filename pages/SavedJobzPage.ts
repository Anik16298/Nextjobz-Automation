import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SavedJobzPage extends BasePage {
    pageTitle: any /* Locator */;
    jobListings: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Saved Jobz/i);
        this.jobListings = page.locator('.MuiCard-root');
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
