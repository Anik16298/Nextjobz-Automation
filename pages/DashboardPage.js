import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Dashboard/i);
        this.summaryCards = page.locator('.MuiCard-root');
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
