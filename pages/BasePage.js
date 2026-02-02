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
        try {
            const loader = this.page.getByText(/Steer Your Life/i).first();
            if (await loader.isVisible({ timeout: 2000 })) {
                await loader.waitFor({ state: 'detached', timeout: 15000 });
            }
        } catch (e) {
            // Loader not present
        }
    }

    async scrollToFooter() {
        try {
            const footer = this.page.locator('footer').first();
            if (await footer.count() > 0) {
                await footer.scrollIntoViewIfNeeded();
            } else {
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            }
        } catch (e) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        }
        await this.page.waitForTimeout(500);
    }
}
