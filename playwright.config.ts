import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    workers: 1,
    timeout: 60000,
    reporter: [
        ['list'],
        ['html', { 
            open: 'never',
            outputFolder: 'playwright-report'
        }],
        ['allure-playwright', { 
            outputFolder: 'allure-results',
            environmentInfo: {
                'Framework': 'Playwright',
                'Node Version': process.version,
                'OS': process.platform,
                'Test Environment': 'Production'
        }}],
        ['json', { outputFile: 'test-results/results.json' }]
    ],
    use: {
        baseURL: 'https://nextjobz.com.bd/',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
