import { Page } from "@playwright/test";

export class ViewSystemUsersLocator {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get selectDropdownRole() {
        return this.page.locator('div.oxd-input-group')
                   .filter({ has: this.page.locator('label', { hasText: 'User Role' }) })
                   .locator('.oxd-select-text-input');
    }

    get buttonSearch() {
        return this.page.getByRole('button', { name: 'Search' });
    }

    get buttonAdd() {
        return this.page.getByRole('button', { name: 'Add' });
    }

    get inputEmployeeName() {
        return this.page.getByPlaceholder('Type for hints...');
    }

    get editButtons() {
        return this.page.getByRole('button').filter({ 
            has: this.page.locator('i.bi-pencil-fill') 
        });
    }

    get deleteButtons() {
        return this.page.getByRole('button').filter({ 
            has: this.page.locator('i.bi-trash') 
        });
    }

    get resultsTable() {
        return this.page.locator('.oxd-table[role="table"]');
    }


    get tableBody() {
        return this.page.locator('.oxd-table-body[role="rowgroup"]');
    }


    get tableRows() {
        return this.tableBody.locator('.oxd-table-row[role="row"]');
    }

    get adminUserRow() {
        return this.tableRows.filter({ 
            has: this.page.locator('.oxd-table-cell:nth-child(2) div', { hasText: /^Admin$/ }) 
        });
    }

    get adminUsername() {
        return this.adminUserRow.locator('.oxd-table-cell:nth-child(2) div');
    }

    get adminDeleteButton() {
        return this.adminUserRow.locator('.oxd-table-cell-actions .oxd-icon-button').filter({ 
            has: this.page.locator('i.bi-trash') 
        });
    }

    get adminEditButton() {
        return this.adminUserRow.locator('.oxd-table-cell-actions .oxd-icon-button').filter({ 
            has: this.page.locator('i.bi-pencil-fill') 
        });
    }

    get userRoleDropdown() {
        return this.page.locator('div.oxd-input-group')
                   .filter({ has: this.page.locator('label', { hasText: 'User Role' }) })
                   .locator('.oxd-select-text');
    }

    getRoleOption(roleName: string) {
        return this.page.locator('.oxd-select-dropdown').getByText(roleName);
    }

    get statusDropdown() {
        return this.page.locator('div.oxd-input-group')
                   .filter({ has: this.page.locator('label', { hasText: 'Status' }) })
                   .locator('.oxd-select-text');
    }

    get enabledStatusOption() {
        return this.page.locator('.oxd-select-dropdown').getByText('Enabled');
    }

    get disabledStatusOption() {
        return this.page.locator('.oxd-select-dropdown').getByText('Disabled');
    }

    getStatusOption(statusName: string) {
        return this.page.locator('.oxd-select-dropdown').getByText(statusName);
    }

    get inputUsername() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: 'Username' }) })
                .locator('input.oxd-input');
    }

    get inputPassword() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: /^Password$/ }) })
                .locator('input.oxd-input');
    }

    get inputConfirmPassword() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: 'Confirm Password' }) })
                .locator('input.oxd-input');
    }

    get buttonSave() {
        return this.page.getByRole('button', { name: 'Save' });
    }

    get successMessage() {
        return this.page.getByText('Successfully Saved');
    }

    get userRoleError() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: 'User Role' }) })
                .locator('.oxd-text--span, .oxd-input-field-error-message');
    }

    get employeeNameError() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: 'Employee Name' }) })
                .locator('.oxd-text--span, .oxd-input-field-error-message');
    }

    get usernameError() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: 'Username' }) })
                .locator('.oxd-text--span, .oxd-input-field-error-message');
    }

    get passwordError() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: /^Password$/ }) })
                .locator('.oxd-text--span, .oxd-input-field-error-message');
    }

    get confirmPasswordError() {
        return this.page.locator('div.oxd-input-group')
                .filter({ has: this.page.locator('label', { hasText: 'Confirm Password' }) })
                .locator('.oxd-text--span, .oxd-input-field-error-message');
    }

}