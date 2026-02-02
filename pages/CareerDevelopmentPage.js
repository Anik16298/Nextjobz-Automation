import { BasePage } from './BasePage.js';

export class CareerDevelopmentPage extends BasePage {
    constructor(page) {
        super(page);
        // Looking for any text matching Career Development to verify page load
        this.pageTitle = page.getByText(/Career Development/i).first();
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
