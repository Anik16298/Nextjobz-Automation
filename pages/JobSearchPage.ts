import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class JobSearchPage extends BasePage {
    url: any /* Locator */;
    filterContainer: any /* Locator */;
    jobListContainer: any /* Locator */;
    jobCards: any /* Locator */;
    homePageHeader: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.url = '/job-search?pageNo=1&pageSize=10&activeTab=0';

        // Locators for the Job Search / Listing page
        this.filterContainer = page.locator('.MuiGrid-root').filter({ hasText: /Filter|Category|Location/i }).first();
        this.jobListContainer = page.locator('.MuiGrid-root').filter({ hasText: /Jobz Found|Vacancies/i });
        this.jobCards = page.locator('.MuiPaper-root').filter({ hasText: /Apply|View Details/i });

        // Error handling fallback for guest redirects
        this.homePageHeader = page.locator('h1, h2, h3').filter({ hasText: /Find your Next Step|Smarter Career Building/i }).first();
    }

    async navigate(path?: string) {
        const url = path || this.url;
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async isLoaded(): Promise<boolean | string> {
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

    async getJobCount(): Promise<number> {
        return await this.jobCards.count();
    }

    async getResultCount(): Promise<number> {
        return await this.jobCards.count();
    }

    async robustSearch(searchTerm: string) {
        // Navigate to the search page with the search term
        const searchUrl = `${this.url}&search=${encodeURIComponent(searchTerm)}`;
        await this.page.goto(searchUrl);
        await this.page.waitForLoadState('networkidle');
    }
}
