import { BasePage } from './BasePage.js';

export class CampusConnectPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.locator('h1, h2').filter({ hasText: /Campus Connect/i });
        this.eventCards = page.locator('div[class*="MuiPaper-root"]').filter({ hasText: /University|Events|Join/i });
    }

    async getEventCount() {
        return await this.eventCards.count();
    }
}
