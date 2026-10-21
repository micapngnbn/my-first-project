import { test } from '@playwright/test';
import { signInAsAdmin } from './admin-portal/flows/Login/login.flows';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await signInAsAdmin(page);
  });
});
