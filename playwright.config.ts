import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
import { env } from './src/playwright/util/playwright-bdd';

const testDir = defineBddConfig({
	aiFix: {
		promptAttachment: true,
	  },
	featuresRoot: './src/resources/features/',
	steps: './src/playwright/steps/*.step.ts',
	outputDir: './target/playwright-test',
	importTestFrom: './src/playwright/util/playwright-bdd.ts',
	disableWarnings: {
		importTestFrom: true
	}
})

export default defineConfig({
	timeout: 5 * 6 * 1000,
	testDir,
	outputDir: './target/generated-test-sources',
	fullyParallel: true,
	workers: process.env.CI ? 1 : undefined,
	reporter: [
		cucumberReporter('json', { outputFile: './target/cucumber-reports/cucumber.json' }),
		['allure-playwright'],
		[process.env.CI ? 'github' : 'list'],
		['html', { outputFolder: './target/playwright-reports' }]
	],
	use: {
		baseURL: env.BASEURL,
		trace: 'on',
		screenshot: 'only-on-failure',
		headless: true,
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			},
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		}
	]
});
