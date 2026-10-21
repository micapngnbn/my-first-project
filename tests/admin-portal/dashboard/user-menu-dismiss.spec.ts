// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('User Menu can be dismissed without logging out', async ({ page }) => {
  const { appChrome, dashboardPage } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Open then dismiss User Menu
  await appChrome.openUserMenu();
  await expect(appChrome.darkModeButton()).toBeVisible();

  await appChrome.dismissUserMenu();
  await expect(appChrome.darkModeButton()).toBeHidden();
  await expect(page).toHaveURL(/dashboard/i);
  await expect(dashboardPage.welcomeToText()).toBeVisible();
});
