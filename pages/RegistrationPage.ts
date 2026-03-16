import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
    pageTitle: Locator;
    nameInput: Locator;
    emailInput: Locator;
    phoneInput: Locator;
    passwordInput: Locator;
    confirmPasswordInput: Locator;
    submitButton: Locator;
    errorMessageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Create Account|Register/i).first();

        // Form Fields - Common MUI patterns
        this.nameInput = page.getByLabel(/Full Name|Name/i);
        this.emailInput = page.getByLabel(/Email/i);
        this.phoneInput = page.getByLabel(/Phone|Mobile/i);
        this.passwordInput = page.getByLabel(/^Password/i);
        this.confirmPasswordInput = page.getByLabel(/Confirm Password/i);
        this.submitButton = page.getByRole('button', { name: /Register|Create Account|Sign Up/i });

        // Validation messages
        this.errorMessageLocator = page.locator('.Mui-error, [role="alert"]');
    }

    async navigate(path = '/register') {
        await this.page.goto(path);
        await this.page.waitForLoadState('networkidle');
    }

    async isWorking() {
        try {
            await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    async fillRegistrationForm(data) {
        if (data.name) await this.nameInput.fill(data.name);
        if (data.email) await this.emailInput.fill(data.email);
        if (data.phone) await this.phoneInput.fill(data.phone);
        if (data.password) await this.passwordInput.fill(data.password);
        if (data.confirmPassword) await this.confirmPasswordInput.fill(data.confirmPassword);
    }

    async submit() {
        await this.submitButton.click();
    }

    async getErrorMessage() {
        if (await this.errorMessageLocator.first().isVisible()) {
            return await this.errorMessageLocator.first().innerText();
        }
        return null;
    }
}
