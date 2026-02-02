import { BasePage } from './BasePage.js';

export class JobSearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.searchBox = page.getByRole('textbox').first();
        this.searchButton = page.locator('button').filter({ hasText: /^Search$/i }).first();
        // Use a broader locator for the cards
        this.jobCard = page.locator('.MuiPaper-root').filter({ hasText: /(Jobz|Vacancies|Deadline|Apply|Details)/i });
    }

    async searchForJob(keyword) {
        console.log(`Searching for job: ${keyword}`);
        await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });

        await this.searchBox.focus();
        await this.searchBox.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.searchBox.fill(keyword);

        await this.page.waitForTimeout(500);
        console.log('Clicking the Search button...');
        await this.searchButton.click();

        // Wait for results to load or URL to change
        try {
            await this.page.waitForURL(/job-search/i, { timeout: 10000 });
        } catch (e) {
            console.log('URL did not change to job-search, maybe already there or results loaded in-place.');
        }
        await this.page.waitForLoadState('networkidle');
        await this.waitForGlobalLoader();
    }

    async robustSearch(keyword) {
        await this.searchForJob(keyword);
        const count = await this.getResultCount();
        if (count === 0) {
            console.log(`No results for "${keyword}". Falling back to "Data Analyst" as requested.`);
            await this.searchForJob('Data Analyst');
        }
    }

    async getResultCount() {
        return await this.jobCard.count();
    }
}
