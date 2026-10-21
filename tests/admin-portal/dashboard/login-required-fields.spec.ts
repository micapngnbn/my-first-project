// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login/LoginPage';

test('Sign in requires Email and Password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to login with empty fields
  await loginPage.gotoLoginPage();
  await expect(loginPage.loginHeading()).toBeVisible();
  await expect(loginPage.emailTextbox()).toHaveValue('');
  await expect(loginPage.passwordTextbox()).toHaveValue('');

  // Attempt Sign in
  await loginPage.clickSignIn();
  await expect(page).toHaveURL(/login/i);
  await expect(page).not.toHaveURL(/dashboard/i);
  await expect(loginPage.loginHeading()).toBeVisible();
});
