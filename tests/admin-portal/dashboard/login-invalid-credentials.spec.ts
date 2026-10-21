// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login/LoginPage';

test('Invalid credentials do not grant Dashboard access', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const invalidEmail = 'invalid@example.com';
  const invalidPassword = 'WrongPassword1!';

  // Navigate to login
  await loginPage.gotoLoginPage();
  await expect(loginPage.loginHeading()).toBeVisible();

  // Enter invalid credentials
  await loginPage.enterEmail(invalidEmail);
  await expect(loginPage.emailTextbox()).toHaveValue(invalidEmail);

  await loginPage.enterPassword(invalidPassword);
  await expect(loginPage.passwordTextbox()).toHaveValue(invalidPassword);

  // Attempt Sign in
  await loginPage.clickSignIn();
  await expect(page).not.toHaveURL(/dashboard/i, { timeout: 15000 });
  await expect(page).toHaveURL(/login/i);
  await expect(loginPage.loginHeading()).toBeVisible();
});
