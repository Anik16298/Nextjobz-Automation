import { BasePage } from './BasePage.js';
import config from '../utils/ConfigProvider.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.signInXPath = config.selectors.signInXPath;
        this.phoneInputSelector = config.selectors.phoneInputSelector;
        this.passwordInputSelector = config.selectors.passwordInputSelector;
    }

    async openLoginModal() {
        await this.page.goto('/');

        const landingBtn = this.page.locator(this.signInXPath).first();
        await landingBtn.waitFor({ state: 'visible', timeout: 10000 });
        await landingBtn.click();

        await this.page.locator(this.phoneInputSelector).waitFor({ state: 'visible', timeout: 10000 });
    }

    async performLogin(phone, password) {
        const phoneField = this.page.locator(this.phoneInputSelector);
        const passField = this.page.locator(this.passwordInputSelector);

        await phoneField.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await phoneField.type(phone, { delay: 30 });

        await passField.click();
        await passField.fill(password);

        const submitBtn = this.page.locator(this.signInXPath).last();
        await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
        await submitBtn.click({ force: true });

        await this.page.waitForTimeout(1000);

        if (await this.page.locator('div[role="dialog"]').isVisible()) {
            await submitBtn.click();
        }
    }

    async verifyLogin() {
        try {
            if (await this.page.locator('text=/Invalid|Error|Failed/i').first().isVisible({ timeout: 2000 })) {
                return false;
            }
        } catch { }

        try {
            await Promise.race([
                this.page.waitForFunction(() => !document.querySelector('div[role="dialog"]'), { timeout: 15000 }),
                this.page.waitForURL(url => url.toString() !== config.baseUrl, { timeout: 15000 })
            ]);
        } catch (e) { }

        const indicators = [
            'text=/Success/i',
            'text=/Sign Out/i',
            'text=/Logout/i',
            'text=/Dashboard/i',
            '.MuiAvatar-root'
        ];

        for (const indicator of indicators) {
            try {
                if (await this.page.locator(indicator).first().isVisible({ timeout: 5000 })) {
                    return true;
                }
            } catch (e) { }
        }

        return false;
    }
}
