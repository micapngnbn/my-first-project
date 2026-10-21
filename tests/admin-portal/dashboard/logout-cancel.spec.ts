// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('Cancel Logout keeps the user on the Dashboard', async ({ page }) => {
  const { appChrome, dashboardPage } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Start Logout then Cancel
  await appChrome.clickLogout();
  await expect(appChrome.logoutDialog()).toBeVisible();

  await appChrome.cancelLogout();
  await expect(appChrome.logoutDialog()).toBeHidden();
  await expect(page).toHaveURL(/dashboard/i);
  await expect(dashboardPage.welcomeToText()).toBeVisible();
});
