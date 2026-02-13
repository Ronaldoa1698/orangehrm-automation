import { Page } from "@playwright/test";

export class PIMLocator {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get buttonPIM() {
        return this.page.getByRole('link', { name: 'PIM' });
    }

    get navigateToAdminModule() {
        return this.page.getByRole('link', { name: 'Admin' });
    }

    get buttonAddEmployee() {
        return this.page.getByRole('button', { name: 'Add' });
    }

    get inputFirstName() {
        return this.page.getByPlaceholder('First Name');
    }

    get inputMiddleName() {
        return this.page.getByPlaceholder('Middle Name');
    }

    get inputLastName() {
        return this.page.getByPlaceholder('Last Name');
    }

    get buttonSave() {
        return this.page.getByRole('button', { name: 'Save' });
    }

    get employeeSaveSuccessMessage() {
        return this.page.getByText('Successfully Saved');
    }
}