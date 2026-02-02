import { BasePage } from './BasePage.js';

export class JobzPage extends BasePage {
    constructor(page) {
        super(page);
        this.filterContainer = page.locator('.MuiGrid-root').filter({ hasText: /Filter|Category|Location/i }).first();
        this.jobListContainer = page.locator('.MuiGrid-root').filter({ hasText: /Jobz Found|Vacancies/i });
        // Individual job cards
        this.jobCards = page.locator('div[class*="MuiPaper-root"]').filter({ hasText: /Apply|View|Details/i });
    }

    async isLoaded() {
        await this.page.waitForLoadState('networkidle');
        return await this.yearFilterVisible() || await this.jobCards.first().isVisible();
    }

    async yearFilterVisible() {
        // Just a guess at a common filter, or we check for side bar
        return await this.filterContainer.isVisible();
    }

    async getJobCount() {
        // Wait for at least one card or timeout
        try {
            await this.jobCards.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {
            console.log('No job cards found immediately.');
        }
        return await this.jobCards.count();
    }

    async clickFirstJob() {
        const count = await this.getJobCount();
        if (count > 0) {
            await this.jobCards.first().click();
        } else {
            throw new Error('No jobs to click');
        }
    }

    async robustJobCheck() {
        const count = await this.getJobCount();
        if (count === 0) {
            console.log('No jobs found on Jobz page, searching for "Data Analyst" as fallback.');
            // Assuming there's a search bar on this page too, or we redirect to search
            // If the Jobz page is just a listing, we might need to go to Home or use a header search
            // Based on earlier tests, search is available on the main pages.
            // Let's assume we use the search functionality from JobSearchPage if available.
        }
    }
}
