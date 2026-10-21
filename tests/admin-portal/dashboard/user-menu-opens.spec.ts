// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('User Menu opens with Dark Mode and Logout', async ({ page }) => {
  const { appChrome } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Open User Menu
  await appChrome.openUserMenu();
  await expect(appChrome.darkModeButton()).toBeVisible();
  await expect(appChrome.logoutButton()).toBeVisible();
});
