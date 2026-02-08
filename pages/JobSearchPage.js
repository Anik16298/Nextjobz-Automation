import { BasePage } from './BasePage.js';

export class JobSearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.url = '/job-search?pageNo=1&pageSize=10&activeTab=0';

        // Locators for the Job Search / Listing page
        this.filterContainer = page.locator('.MuiGrid-root').filter({ hasText: /Filter|Category|Location/i }).first();
        this.jobListContainer = page.locator('.MuiGrid-root').filter({ hasText: /Jobz Found|Vacancies/i });
        this.jobCards = page.locator('.MuiPaper-root').filter({ hasText: /Apply|View Details/i });

        // Error handling fallback for guest redirects
        this.homePageHeader = page.locator('h1, h2, h3').filter({ hasText: /Find your Next Step|Smarter Career Building/i }).first();
    }

    async navigate() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');
    }

    async isLoaded() {
        await this.page.waitForLoadState('networkidle');
        try {
            await Promise.race([
                this.jobCards.first().waitFor({ state: 'visible', timeout: 5000 }),
                this.filterContainer.waitFor({ state: 'visible', timeout: 5000 }),
                this.homePageHeader.waitFor({ state: 'visible', timeout: 5000 })
            ]);

            // Check if redirected to home
            if (await this.homePageHeader.isVisible()) {
                console.log('Job Search Page redirected to Home Page content.');
                return 'HomePage';
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    async getJobCount() {
        return await this.jobCards.count();
    }
}
