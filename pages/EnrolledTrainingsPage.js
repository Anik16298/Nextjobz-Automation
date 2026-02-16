import { BasePage } from './BasePage.js';

export class EnrolledTrainingsPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.getByText(/Enrolled Trainings/i);
        this.trainingCards = page.locator('.MuiCard-root');
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
