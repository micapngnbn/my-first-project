// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('Dark Mode can be turned off after being enabled', async ({ page }) => {
  const { appChrome } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Enable Dark Mode
  await appChrome.enableDarkMode();
  await expect(appChrome.darkModeRoot()).toBeAttached();

  // Disable Dark Mode
  await appChrome.disableDarkMode();
  await expect(appChrome.darkModeRoot()).toHaveCount(0);
});
