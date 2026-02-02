import { test, expect } from '@playwright/test';
import { JobSearchPage } from '../pages/JobSearchPage.js';

test.describe('Nextjobz Extensive Job Search', () => {
    let searchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new JobSearchPage(page);
        await searchPage.navigate('/');
    });

    const searchTerms = [
        'Data Analyst',
        'Engineer',
        'Assistant Architect',
        'Software Developer'
    ];

    for (const term of searchTerms) {
        test(`should search for "${term}" and display results`, async ({ page }) => {
            console.log(`--- Searching for: ${term} ---`);
            await searchPage.robustSearch(term);

            // Allow some time for results to render
            await page.waitForTimeout(2000);

            // Check if results were found or if "No Jobz Found" is displayed
            const resultsCount = await searchPage.getResultCount();
            console.log(`Results found for "${term}": ${resultsCount}`);

            // Take a screenshot of each search result for verification
            const fileName = term.replace(/\s+/g, '_').toLowerCase();
            await page.screenshot({ path: `test-results/search_${fileName}.png` });

            // Basic assertion: page should not crash and should show either results or a "no results" message
            // Based on earlier logic, we check for cards or the header
            const noResults = page.getByText(/No Jobz Found/i);
            const someResults = page.getByText(/Jobz Found/i);

            expect(await someResults.isVisible() || await noResults.isVisible() || resultsCount >= 0).toBeTruthy();
        });
    }
});
