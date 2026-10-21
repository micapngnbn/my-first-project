// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login/LoginPage';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('User confirms Logout and returns to login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { appChrome } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Open User Menu and start Logout
  await appChrome.openUserMenu();
  await expect(appChrome.logoutButton()).toBeVisible();

  await appChrome.clickLogout();
  await expect(appChrome.logoutDialog()).toBeVisible();
  await expect(
    page.getByText('Are you sure you want to logout?'),
  ).toBeVisible();
  await expect(appChrome.logoutConfirmCancelButton()).toBeVisible();
  await expect(appChrome.logoutConfirmOkButton()).toBeVisible();

  // Confirm Logout
  await appChrome.confirmLogout();
  await expect(page).toHaveURL(/login/i, { timeout: 30000 });
  await expect(loginPage.loginHeading()).toBeVisible();
});
