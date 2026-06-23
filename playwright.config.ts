import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// 🎯 BDD કન્ફિગરેશન (હવે Steps ફાઈલો .ts માં હશે)
const myBddTestDir = defineBddConfig({
  features: './BDD_Layer/features/**/*.feature',
  steps: './BDD_Layer/Steps/**/*.ts', 
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  
  // 🎯 તમે કીધું એમ: જે વર્કર્સ લોકલ અને CI માં સેટ હતા, એ જ બેઠા રાખ્યા છે
  workers: process.env.CI ? 4 : 2,
  
  reporter: 'html',
  use: {
    baseURL: 'https://eventhub.rahulshettyacademy.com/login',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'setup',
      // 🎯 હવે auth.setup પણ .ts માં કન્વર્ટ થશે એટલે .ts રીડર રાખ્યો
      testMatch: /auth\.setup\.ts/, 
    },
    /* ---------------- UI TESTS PROJECTS ---------------- */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/API_tests/**', '**/.features-gen/**']  
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/API_tests/**', '**/.features-gen/**']
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/API_tests/**', '**/.features-gen/**']
    },
    /* ---------------- API TESTS PROJECT ---------------- */
    {
      name: 'api_tests',
      testMatch: '**/API_tests/**',
      dependencies: ['setup'],
      use: { browserName: undefined },
    },
    /* ---------------- BDD TESTS PROJECT ---------------- */
    {
      name: 'bdd-tests',
      testDir: myBddTestDir,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});