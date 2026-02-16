import { BasePage } from './BasePage.js';

export class AppliedJobzPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Applied Jobz/i);
        this.applicationHistory = page.locator('.MuiTable-root, .MuiCard-root');
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
