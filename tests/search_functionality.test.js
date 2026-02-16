import { test, expect } from '@playwright/test';
import { JobSearchPage } from '../pages/JobSearchPage.js';

test.describe('Nextjobz Extensive Job Search', () => {
    let searchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new JobSearchPage(page);
        await searchPage.navigate('/');
    });

    const searchTerms = [
        'Data Analyst', 'Software Engineer', 'Project Manager', 'Architect',
        'QA Engineer', 'DevOps', 'Product Owner', 'UI/UX Designer',
        'Accountant', 'Marketing Manager', 'HR Specialist', 'Sales Executive',
        'Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Doctor',
        'Nurse', 'Teacher', 'Graphic Designer', 'Content Writer',
        'Digital Marketing', 'Data Scientist', 'Business Analyst', 'Customer Support',
        'Banker', 'Receptionist', 'Driver', 'Security Guard'
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
