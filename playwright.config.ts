import { test, expect } from '@playwright/test';

export default {
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  testDir: './e2e/tests',
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  reporter: [['html'], ['list']],
};
