import { expect, Page } from '@playwright/test';
import { DashboardIndexLocator } from '../locators/dashboardIndex.locator';
import { ViewSystemUsersLocator } from '../locators/viewSystemUsers.locator';

export class FilterPage {

    readonly page: Page;
    readonly dashboardIndexLocator: DashboardIndexLocator
    readonly viewSystemUsersLocator: ViewSystemUsersLocator

    constructor(page: Page) {
        this.page = page;
        this.dashboardIndexLocator = new DashboardIndexLocator(page);
        this.viewSystemUsersLocator = new ViewSystemUsersLocator(page);
    }

    async navigateToAdminModule() {
        await this.dashboardIndexLocator.buttonAdmin.click();
    }

    async selectUserRole(role: string) {
        await this.viewSystemUsersLocator.selectDropdownRole.click();
        await this.page.getByRole('option', { name: role }).click();
    }

    async clickSearchButton() {
        await this.viewSystemUsersLocator.buttonSearch.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyResultsAreVisible() {
        await expect(this.viewSystemUsersLocator.resultsTable).toBeVisible();
        await expect(this.viewSystemUsersLocator.editButtons.first()).toBeVisible();
        await expect(this.viewSystemUsersLocator.deleteButtons.first()).toBeVisible();
    }

    async verifyUserNameAdmin() {
        await expect(this.viewSystemUsersLocator.adminUserRow).toBeVisible();
        await expect(this.viewSystemUsersLocator.adminUsername).toHaveText('Admin');
    }

    async acctionDeleteAdminUser() {
        await this.viewSystemUsersLocator.adminDeleteButton.click();
        await this.page.waitForLoadState('networkidle');

        const errorMessage = this.page.locator('text=Cannot be deleted').or(
            this.page.locator('text=cannot be deleted')
        ).or(
            this.page.getByText(/cannot.*delete/i)
        );
        
        await expect(errorMessage).toBeVisible();
    }

    async actionEditAdminUser() {
        await this.viewSystemUsersLocator.adminEditButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/saveSystemUser\/\d+/);
    }
}