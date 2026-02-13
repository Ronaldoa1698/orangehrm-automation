import { Page } from "@playwright/test";

export class DashboardIndexLocator {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get buttonAdmin() {
        return this.page.getByRole('link', { name: 'Admin' });
    }
}