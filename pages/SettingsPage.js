import { BasePage } from './BasePage.js';

export class SettingsPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Settings/i);
        this.passwordSection = page.getByText(/Change Password/i);
        this.notificationSection = page.getByText(/Notification/i);
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
