import { BasePage } from './BasePage.js';

export class CareerGuidancePage extends BasePage {
    constructor(page) {
        super(page);
        this.url = '/career-guidance';

        // Locators covering "Career Advice", "Learning Lab", "Training"
        this.pageTitle = page.locator('h1, h2, h3').filter({ hasText: /Career Advice|Career Guidance|Training|Learning/i });
        this.articles = page.locator('.MuiCard-root, .MuiPaper-root').filter({ hasText: /Read More|View Details|Resume|Interview/i });
    }

    async navigate() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');
    }

    async isWorking() {
        try {
            await Promise.race([
                this.pageTitle.first().waitFor({ state: 'visible', timeout: 5000 }),
                this.articles.first().waitFor({ state: 'visible', timeout: 5000 })
            ]);
            return true;
        } catch (e) {
            return false;
        }
    }
}
