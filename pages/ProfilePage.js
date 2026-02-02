import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        // Avatar and menu
        this.profileAvatar = page.locator('.MuiAvatar-root').first();
        this.profileDropdown = page.locator('div[role="menu"], ul[role="menu"]').first();
        this.userName = page.getByText(/Nusrat Jahan/i).first();

        // Menu items - using text-based locators for reliability
        this.profileMenuItem = page.getByText('Profile', { exact: true });
        this.dashboardMenuItem = page.getByText('Dashboard', { exact: true });
        this.savedJobzMenuItem = page.getByText('Saved Jobz', { exact: true });
        this.recommendedJobzMenuItem = page.getByText('Recommended Jobz', { exact: true });
        this.appliedJobzMenuItem = page.getByText('Applied Jobz', { exact: true });
        this.enrolledTrainingsMenuItem = page.getByText('Enrolled Trainings', { exact: true });
        this.settingsMenuItem = page.getByText('Settings', { exact: true });
        this.logoutMenuItem = page.getByText('Logout', { exact: true });
    }

    async openProfileMenu() {
        await this.profileAvatar.waitFor({ state: 'visible', timeout: 10000 });
        await this.profileAvatar.click();
        await this.profileDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.page.waitForTimeout(500); // Allow menu animation
    }

    async navigateToProfile() {
        await this.openProfileMenu();
        await this.profileMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToDashboard() {
        await this.openProfileMenu();
        await this.dashboardMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToSavedJobz() {
        await this.openProfileMenu();
        await this.savedJobzMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToRecommendedJobz() {
        await this.openProfileMenu();
        await this.recommendedJobzMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToAppliedJobz() {
        await this.openProfileMenu();
        await this.appliedJobzMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToEnrolledTrainings() {
        await this.openProfileMenu();
        await this.enrolledTrainingsMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToSettings() {
        await this.openProfileMenu();
        await this.settingsMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async isLoggedIn() {
        try {
            await this.profileAvatar.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    async logout() {
        await this.openProfileMenu();
        await this.logoutMenuItem.click();
        await this.page.waitForTimeout(2000);
    }

    async verifyMenuItemsVisible() {
        await this.openProfileMenu();

        const items = [
            { name: 'Profile', locator: this.profileMenuItem },
            { name: 'Dashboard', locator: this.dashboardMenuItem },
            { name: 'Saved Jobz', locator: this.savedJobzMenuItem },
            { name: 'Recommended Jobz', locator: this.recommendedJobzMenuItem },
            { name: 'Applied Jobz', locator: this.appliedJobzMenuItem },
            { name: 'Enrolled Trainings', locator: this.enrolledTrainingsMenuItem },
            { name: 'Settings', locator: this.settingsMenuItem },
            { name: 'Logout', locator: this.logoutMenuItem }
        ];

        const results = {};
        for (const item of items) {
            try {
                results[item.name] = await item.locator.isVisible({ timeout: 2000 });
            } catch (e) {
                results[item.name] = false;
            }
        }

        return results;
    }
}
