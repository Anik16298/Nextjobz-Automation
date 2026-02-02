export class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async navigate(path = '') {
        await this.page.goto(path);
        await this.waitForGlobalLoader();
    }

    async waitFor(ms) {
        await this.page.waitForTimeout(ms);
    }

    async waitForGlobalLoader() {
        // Wait for the "Steer Your Life" text to disappear
        try {
            const loader = this.page.getByText(/Steer Your Life/i).first();
            if (await loader.isVisible({ timeout: 2000 })) {
                console.log('Global loader detected, waiting for it to disappear...');
                await loader.waitFor({ state: 'detached', timeout: 15000 });
                console.log('Global loader disappeared.');
            }
        } catch (e) {
            // Loader might not have appeared or already gone
        }
    }

    async scrollToFooter() {
        // Try multiple strategies to reach the footer
        try {
            // Strategy 1: Target the footer element directly
            const footer = this.page.locator('footer').first();
            if (await footer.count() > 0) {
                await footer.scrollIntoViewIfNeeded();
            } else {
                // Strategy 2: Scroll to bottom of window
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            }
        } catch (e) {
            console.log('Error scrolling to footer: ' + e);
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        }
        await this.page.waitForTimeout(1000); // Allow scroll layout to settle
    }
}
