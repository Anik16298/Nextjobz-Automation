import { BasePage } from './BasePage.js';

export class CareerAbroadPage extends BasePage {
    constructor(page) {
        super(page);
        this.url = '/career-abroad';

        // Broader locators based on "Shape your global future..."
        this.pageTitle = page.locator('h1, h2, h3, div').filter({ hasText: /Career Abroad|Overseas|Global|Study In Abroad|Jobz In Abroad/i });
        this.cards = page.locator('.MuiCard-root, .MuiPaper-root').filter({ hasText: /Apply|View|Countries|University/i });
    }

    async navigate() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');
    }

    async isWorking() {
        try {
            await Promise.race([
                this.pageTitle.first().waitFor({ state: 'visible', timeout: 5000 }),
                this.cards.first().waitFor({ state: 'visible', timeout: 5000 })
            ]);
            return true;
        } catch (e) {
            return false;
        }
    }
}
