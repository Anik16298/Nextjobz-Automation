import { BasePage } from './BasePage.js';

export class CampusConnectPage extends BasePage {
    constructor(page) {
        super(page);
        this.url = '/campus-connect';

        // Locators based on potential landing page
        this.pageTitle = page.locator('h1, h2, h3').filter({ hasText: /Campus Connect|University|Student|Academic|Event/i });
        // Cards for events or universities
        this.cards = page.locator('.MuiCard-root, .MuiPaper-root').filter({ hasText: /Event|Date|Location|University|More/i });
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
