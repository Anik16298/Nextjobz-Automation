import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    pageTitle: any /* Locator */;
    nameInput: any /* Locator */;
    emailInput: any /* Locator */;
    subjectInput: any /* Locator */;
    messageInput: any /* Locator */;
    submitButton: any /* Locator */;
    successMessage: any /* Locator */;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText(/Contact/i).first();

        // Form Fields
        this.nameInput = page.getByPlaceholder(/Name/i).first();
        this.emailInput = page.getByPlaceholder(/Email/i).first();
        this.subjectInput = page.getByPlaceholder(/Subject/i).first();
        this.messageInput = page.getByPlaceholder(/Message/i).first();
        this.submitButton = page.locator('button').filter({ hasText: /Send|Submit/i });

        // Success/Error indicators
        this.successMessage = page.getByText(/Success|Thank you|Message sent/i);
    }

    async navigate(path = '/contact-us') {
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

    async fillContactForm(data) {
        if (data.name) await this.nameInput.fill(data.name);
        if (data.email) await this.emailInput.fill(data.email);
        if (data.subject) await this.subjectInput.fill(data.subject);
        if (data.message) await this.messageInput.fill(data.message);
    }

    async submit() {
        await this.submitButton.click();
    }
}
