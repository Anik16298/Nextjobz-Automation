import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EnrolledTrainingsPage extends BasePage {
    pageTitle: any /* Locator */;
    trainingCards: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Enrolled Trainings/i);
        this.trainingCards = page.locator('.MuiCard-root');
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
