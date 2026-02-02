import { BasePage } from './BasePage.js';

export class ContactPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Contact/i).first();
        this.submitButton = page.locator('button').filter({ hasText: /Send|Submit/i });
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
