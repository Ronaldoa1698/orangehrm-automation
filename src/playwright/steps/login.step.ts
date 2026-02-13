import { Given, When, Then } from '../util/playwright-bdd';
import { LoginPage } from '../pages/login.page';
import { credenciales } from '../../resources/fixtures/admin.json';

let loginPage: LoginPage

Given('Navego a la pagina principal de orange hrm', async ({ page }) => {
    const baseUrl = process.env.BASEURL;
    loginPage = new LoginPage(page);
    await loginPage.navigateToUrl(`${baseUrl}/login`);
});

Given('Ingreso mis credenciales válidas', async ({}) => {
    const userName = credenciales.username;
    const password = credenciales.password;
    await loginPage.enterUsername(userName);
    await loginPage.enterPassword(password);
});

Given('Ingreso las credenciales inválidas {string} y {string}', async ({}, username: string, password: string) => {
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
});

When('Hago clic en el botón de inicio de sesión', async ({}) => {
    await loginPage.clickLoginButton();
});

Then('Verifico que el usuario ha iniciado sesión correctamente', async ({ page }) => {
    await loginPage.verifyLoginSuccess();
});

Then('Verifico que el usuario no ha podido iniciar sesión', async ({ page }) => {
    await loginPage.verifyLoginFailure();
});