import { BasePage } from './BasePage.js';

export class CareerAbroadPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Career Abroad/i).first();
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
