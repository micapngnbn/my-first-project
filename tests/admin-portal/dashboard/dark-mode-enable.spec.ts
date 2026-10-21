// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('Dark Mode toggle enables dark mode', async ({ page }) => {
  const { appChrome } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Open User Menu and enable Dark Mode
  await appChrome.openUserMenu();
  await expect(appChrome.darkModeButton()).toBeVisible();

  await appChrome.enableDarkMode();
  await expect(appChrome.darkModeRoot()).toBeAttached();
});
