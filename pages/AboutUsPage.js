import { BasePage } from './BasePage.js';

export class AboutUsPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/About Us/i).first();
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
