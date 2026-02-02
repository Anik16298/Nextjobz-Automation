import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

/**
 * Robust Page Object for Login functionality
 */
export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        // User provided XPath
        this.signInXPath = "//button[normalize-space()='Sign In']";
        this.phoneInputSelector = 'input[type="tel"]';
        this.passwordInputSelector = 'input[type="password"]';
    }

    async openLoginModal() {
        console.log('Navigating to homepage...');
        await this.page.goto('/');

        console.log('Clicking landing Sign In button...');
        // Targeting the one usually in the header/nav
        const landingBtn = this.page.locator(this.signInXPath).first();
        await landingBtn.waitFor({ state: 'visible', timeout: 10000 });
        await landingBtn.click();

        // Wait for modal transition
        await this.page.locator(this.phoneInputSelector).waitFor({ state: 'visible', timeout: 10000 });
        console.log('Modal is visible.');
    }

    async performLogin(phone, password) {
        console.log(`Clearing and entering Phone: ${phone}`);
        const phoneField = this.page.locator(this.phoneInputSelector);
        const passField = this.page.locator(this.passwordInputSelector);

        await phoneField.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await phoneField.type(phone, { delay: 50 });

        console.log('Entering Password...');
        await passField.click();
        await passField.fill(password);

        console.log('Submitting login form directly...');
        // User requested exact XPath usage
        const submitBtn = this.page.locator(this.signInXPath).last();
        await submitBtn.waitFor({ state: 'visible', timeout: 10000 });

        // Retry click strategy
        await submitBtn.click({ force: true });
        await this.page.waitForTimeout(1000);

        // If modal still exists, try clicking again
        if (await this.page.locator('div[role="dialog"]').isVisible()) {
            console.log('Modal still visible, clicking submit again...');
            await submitBtn.click();
        }

        console.log('Login submission triggered.');
    }

    async verifyLogin() {
        console.log('Waiting for login to complete (redirect or UI change)...');

        // Check for error strings first
        try {
            if (await this.page.locator('text=/Invalid|Error|Failed/i').first().isVisible({ timeout: 3000 })) {
                console.log('Login Error Message Detected');
                return false;
            }
        } catch { }

        try {
            // Wait longer for either the modal to disappear or a URL change
            await Promise.race([
                this.page.waitForFunction(() => !document.querySelector('div[role="dialog"]'), { timeout: 30000 }),
                this.page.waitForURL(url => url.toString() !== 'https://dev.nextjobz.com.bd/', { timeout: 30000 })
            ]).catch(() => console.log('Wait for transition timed out, checking indicators.'));
        } catch (e) { }

        const indicators = [
            'text=/Success/i',
            'text=/Nusrat/i',
            'text=/Sign Out/i',
            'text=/Logout/i',
            'text=/Dashboard/i',
            '.MuiAvatar-root'
        ];

        for (const indicator of indicators) {
            try {
                if (await this.page.locator(indicator).first().isVisible({ timeout: 5000 })) {
                    console.log(`Indicator found: ${indicator}`);
                    return true;
                }
            } catch (e) { }
        }

        return false;
    }
}
