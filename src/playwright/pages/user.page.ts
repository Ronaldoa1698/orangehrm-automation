import { expect, Page } from '@playwright/test';
import { PIMLocator } from '../locators/pim.locator';
import { ViewSystemUsersLocator } from '../locators/viewSystemUsers.locator';

export class UserPage {

    readonly page: Page
    readonly pimLocator: PIMLocator
    readonly viewSystemUsersLocator: ViewSystemUsersLocator

    constructor(page: Page) {
        this.page = page;
        this.pimLocator = new PIMLocator(page);
        this.viewSystemUsersLocator = new ViewSystemUsersLocator(page);
    }
    async navigateToPIMModule() {
        await this.pimLocator.buttonPIM.click();
    }

    async navigateToAdminModule() {
        await this.pimLocator.navigateToAdminModule.click();
    }

    async clickAddEmployeeButton() {
        await this.pimLocator.buttonAddEmployee.click();
        await this.page.waitForLoadState('networkidle');
    }

    async fillEmployeeForm(firstName: string, middleName: string, lastName: string) {
        await this.pimLocator.inputFirstName.fill(firstName);
        await this.pimLocator.inputMiddleName.fill(middleName);
        await this.pimLocator.inputLastName.fill(lastName);
    }

    async clickSaveButton() {
        await this.pimLocator.buttonSave.click();
        await this.page.waitForLoadState('networkidle');
        await this.pimLocator.employeeSaveSuccessMessage.waitFor({ state: 'visible' });
    }

    async searchUserInAdminModule(employeeName: string) {
        await this.viewSystemUsersLocator.buttonAdd.click();
        await this.viewSystemUsersLocator.inputEmployeeName.pressSequentially(employeeName, { delay: 100 });
        await this.page.waitForTimeout(1000);
        await this.page.getByText(employeeName).first().click();
    }

    async selectUserRole(role: string) {
        await this.viewSystemUsersLocator.userRoleDropdown.click();
        await this.viewSystemUsersLocator.getRoleOption(role).click();
    }

    async selectUserStatus(status: string) {
        await this.viewSystemUsersLocator.statusDropdown.click();
        await this.viewSystemUsersLocator.getStatusOption(status).click();
    }

    async fillUserDetails(username: string, password: string) {
        await this.viewSystemUsersLocator.inputUsername.fill(username);
        await this.viewSystemUsersLocator.inputPassword.fill(password);
        await this.viewSystemUsersLocator.inputConfirmPassword.fill(password);
    }

    async clickSaveUserButton() {
        await this.viewSystemUsersLocator.buttonSave.click();
        await this.page.waitForLoadState('networkidle');
    }

    async validateUserAdminCreationSuccess() {
        await this.viewSystemUsersLocator.successMessage.waitFor({ state: 'visible' });
    }

    async validateAllRequiredFieldErrors() {
        await this.viewSystemUsersLocator.userRoleError.waitFor({ state: 'visible' });
        await expect(this.viewSystemUsersLocator.userRoleError).toHaveText('Required');
        
        await this.viewSystemUsersLocator.employeeNameError.waitFor({ state: 'visible' });
        await expect(this.viewSystemUsersLocator.employeeNameError).toHaveText('Required');
        
        await this.viewSystemUsersLocator.usernameError.waitFor({ state: 'visible' });
        await expect(this.viewSystemUsersLocator.usernameError).toHaveText('Required');
        
        await this.viewSystemUsersLocator.passwordError.waitFor({ state: 'visible' });
        await expect(this.viewSystemUsersLocator.passwordError).toHaveText('Required');
        
        await this.viewSystemUsersLocator.confirmPasswordError.waitFor({ state: 'visible' });
        await expect(this.viewSystemUsersLocator.confirmPasswordError).toHaveText('Passwords do not match');
    }
}