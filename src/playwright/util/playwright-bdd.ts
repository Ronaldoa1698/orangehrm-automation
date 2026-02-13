import { test as base, createBdd } from 'playwright-bdd';
import { config } from 'dotenv';
config({ path: 'playwright.env' });

export const test = base;
export const { Given, When, Then } = createBdd(test);


const currentEnv = process.env.STAGING || "ORANGE";
export const env = new Proxy({}, {
    get: (_, name: string) => {
        const value = process.env[`${currentEnv}_${name}`] || process.env[name] || undefined;
        if (!value) {
            throw new Error(`Environment variable ${currentEnv}_${name} is not defined`);
        }

        process.env[name] = value;
        return process.env[name];
    }
}) as Record<string, string>;
