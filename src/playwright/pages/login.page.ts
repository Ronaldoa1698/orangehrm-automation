import { expect, Page } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';

export class LoginPage {

    readonly page: Page;
    readonly loginLocator: LoginLocator;

    constructor(page: Page) {
        this.page = page;
        this.loginLocator = new LoginLocator(page);
    }

    async navigateToUrl(url: string) {
        await this.page.goto(url);
    }

    async enterUsername(username: string) {
        await this.loginLocator.userNameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.loginLocator.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginLocator.loginButton.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(/dashboard/);
    }

    async verifyLoginFailure() {
        await expect(this.loginLocator.errorMessage).toBeVisible();
    }

    async login(username: string, password: string) {  
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
};