# Guía de Uso del Framework Playwright
Este proyecto utiliza el framework Playwright para pruebas automatizadas. El proyecto está estructurado en TypeScript y utiliza Playwright para la automatización de navegadores.

Se ha rediseñado para mantener el uso de Playwright lo más limpio y natural posible, facilitando la escritura y mantenimiento de las pruebas.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:
```txt
frameworkpruebasautomatizadas-fe/
├── .github/
│   ├── workflows/
│   │   ├── certification-tests.yml
│   │   └── integration-tests.yml
│   └── CODEOWNERS
├── src/
│   ├── playwright/
│   │   ├── locators/
│   │   │   └── login.locator.ts
│   │   ├── pages/
│   │   │   ├── login.page.ts
│   │   │   └── sample.page.ts
│   │   ├── steps/
│   │   │   ├── login.step.ts
│   │   │   └── sample.step.ts
│   │   ├── util/
│   │   │   ├── cucumber.ts
│   │   │   ├── playwright-bdd.ts
│   └── resources/
│       ├── features/
│       │   ├── login.feature
│       │   └── sample.feature
│       └── fixtures/
│           └── .gitkeep
├── target/
├── playwright.config.ts
├── playwright.env
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

| Directorio/Archivo                       | Descripción                                                           |
| ---------------------------------------- | --------------------------------------------------------------------- |
| `.github/workflows`                        | Flujos de trabajo para integración continua con GitHub Actions        |
| `playwright/locators`                    | Define los localizadores de elementos para las páginas.               |
| `playwright/pages`                         | Contiene las clases que representan las páginas web.                  |
| `playwright/steps`                         | Define los pasos de las pruebas basados en Cucumber.                  |
| `playwright/util`                         | Utilidades para el framework.                                         |
| `resources/ features`                      | Archivos .feature de Cucumber que describen los escenarios de prueba. |
| `resources/fixtures`                       | Archivos de datos de prueba.                                          |
| `playwright.config.ts`                     | Configuración de Playwright, incluyendo navegadores y entornos.       |
| `playwright.env`                           | Variables de entorno necesarias para las pruebas.                     |
| `package.json`                             | Dependencias y scripts del proyecto.                                  |
| `.gitignore`                               | Archivos y carpetas que deben ser ignorados por Git.                  |
| `README.md`                                | Documentación del proyecto.                                           |

## Instalación de Dependencias
Instala las dependencias necesarias para el proyecto ejecutando:

```bash
npm install
```

## Instalación de Navegadores
Instala las dependencias de navegadores soportados

```bash
npx playwright install
```

## Configuración de Browser
El archivo de configuración de Playwright `playwright.config.ts` define los proyectos y dispositivos a utilizar en las pruebas. Configure lo necesario para su uso; el proyecto por defecto viene configurado con Chromium.

Aquí hay un ejemplo de configuración:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    }
  ]
```

Esta configuración permite ejecutar pruebas en múltiples navegadores, asegurando que tu aplicación funcione correctamente en diferentes entornos. Puedes ajustar o agregar más navegadores según tus necesidades específicas.

## Configuración de Entorno

El archivo `playwright.env` contiene las variables de entorno necesarias para la ejecución de las pruebas. Asegúrate de configurar las variables adecuadamente antes de ejecutar las pruebas.

Cada nueva variable de entorno debe seguir el formato basado en el entorno correspondiente: `INTE`, `CERT`, `PROD`. 

A continuación, se muestra un ejemplo de cómo definir estas variables en el archivo `playwright.env`:

```env
INTE_BASEURL=https://inte.example.com

```
> [!NOTE]
> Puedes definir las variables `STAGING` y `CI` sin utilizar el formato mencionado anteriormente para simplificar su uso en la terminal. Esto permite ejecutar las pruebas en diferentes entornos de manera más directa.

## Ejecución del Proyecto
```bash
  # Ejecución de todos los test
  npm run test

  # Ejecución por tags 
  npm run test -- --grep @filterUserSuccess

  # Ejecución por ambientes
  npm run test -- --grep @login --project firefox
  npm run test -- --grep @login --project chromium

```

## Storage State
Para el uso de storage en automatizaciones que requieran guardar la sesión, modifica `playwright.config.ts` y agrega `storageState` con el siguiente valor `./target/state/storage.json`.

Ejemplo de configuración en `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './target/state/storage.json'
      }
    }
  ]
});
```

En la definición de los steps, utiliza la misma ruta para definir la ruta de guardado del estado de la sesión:

```ts
await page.context().storageState({ path: './target/state/storage.json' })
```

Esto asegurará que el estado de la sesión se guarde y se reutilice en las pruebas posteriores, facilitando la automatización de flujos que requieren autenticación persistente.

## Reportes & Trace
Los reportes de las pruebas se generan en el directorio `target/playwright-reports`. Puedes abrir los reportes generados utilizando el siguiente comando:

```bash
npx playwright show-report target/playwright-reports/
```

Los reportes incluyen automáticamente el trace de las pruebas. Si necesitas compartir el trace con un desarrollador, ubica el archivo de trace correspondiente en la carpeta `target/generated-test-sources` y proporciona las instrucciones para levantar el trace en su ordenador.

Para abrir un trace específico, el desarrollador puede utilizar el siguiente comando:

```bash
npx playwright show-trace path/to/trace.zip
```

Asegúrate de reemplazar path/to/trace.zip con la ruta real del archivo de trace que deseas compartir.

## Ejecución vía GitHub Actions - "Playwright Tests"

El workflow se llama "Playwright Tests" y está configurado con `workflow_dispatch`. El input principal es `test_tag` (required) y se utiliza para filtrar pruebas con Playwright (`--grep`).

Cómo ejecutar desde la interfaz web:
1. Ve a la pestaña "Actions" en tu repositorio.
2. Selecciona el workflow "Playwright Tests".
3. Haz clic en "Run workflow".
4. En el campo `test_tag` introduce el tag a ejecutar (ej: `@filterUserSuccess`).
5. Ejecuta el workflow.

Cómo ejecutar desde la CLI (GitHub CLI):
```bash
# Ejecutar el workflow en la rama main pasando el tag
gh workflow run playwright-test.yml --ref main --field test_tag='@filterUserSuccess'
```

Qué hace internamente:
- Ejecuta el comando de pruebas usando el input:
  npm run test -- --grep "${{ github.event.inputs.test_tag }}"
- Sube los reportes como artifact desde: target/playwright-reports/

Ejemplos:
- Para ejecutar `@filterUserSuccess`:
  - test_tag = @filterUserSuccess

Notas importantes:
- El input `test_tag` está definido como required en `.github/workflows/playwright-test.yml`. Si prefieres hacerlo opcional cambia `required: true` a `required: false`.
- No se requieren credenciales locales para ejecutar Actions; los runners de GitHub se encargan de la ejecución.
- Si el tag contiene espacios, cuida el quoting; para tags normales no suele ser necesario.

## Dashboard Allure (GitHub Pages)

Este proyecto genera un dashboard Allure automáticamente en cada ejecución del workflow **"Playwright Tests"**.

### URL del Dashboard
El reporte se publica en GitHub Pages (rama `gh-pages`) y queda disponible en:

- https://ronaldoa1698.github.io/orangehrm-automation/