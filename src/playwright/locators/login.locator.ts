import { Page } from "@playwright/test";

export class LoginLocator {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get userNameInput() {
        return this.page.getByRole('textbox', { name: 'Username' });
    }

    get passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'Login' });
    }
    
    get errorMessage() {
        return this.page.getByText('Invalid credentials');
    }
}