import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
    pageTitle: any /* Locator */;
    passwordSection: any /* Locator */;
    notificationSection: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Settings/i);
        this.passwordSection = page.getByText(/Change Password/i);
        this.notificationSection = page.getByText(/Notification/i);
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
