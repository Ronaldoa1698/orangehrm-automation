import { Given, When, Then } from '../util/playwright-bdd';
import { FilterPage } from '../pages/filter.page';
import { LoginPage } from '../pages/login.page';
import { credenciales } from '../../resources/fixtures/admin.json';

let filterPage: FilterPage
let loginPage: LoginPage

Given('El usuario está en la página de gestión de usuarios', async ({ page }) => {
    const baseUrl = process.env.BASEURL;
    
    loginPage = new LoginPage(page);
    filterPage = new FilterPage(page);

    await loginPage.navigateToUrl(`${baseUrl}/login`);
    await loginPage.login(credenciales.username, credenciales.password);

    await filterPage.navigateToAdminModule();
});

When('El usuario selecciona el rol {string} en el filtro de roles', async ({}, role: string) => {
    await filterPage.selectUserRole(role);
});

When('Hace clic en el botón "Search"', async ({}) => {
    await filterPage.clickSearchButton();
});

Then('Validar que los registros contengan acciciones de editar y eliminar', async ({}) => {
    await filterPage.verifyResultsAreVisible();
});

Then('Eliminamos el rol admin', async ({}) => {
    await filterPage.verifyUserNameAdmin();
    await filterPage.acctionDeleteAdminUser();
    
});
Then('Validar cuando editamos un user admin', async ({}) => {
    await filterPage.actionEditAdminUser();
});