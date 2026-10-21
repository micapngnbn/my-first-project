// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login/LoginPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { email, password } from '../flows/Login/login.flows';

test('User successfully signs in and lands on the Dashboard', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Navigate to login
  await loginPage.gotoLoginPage();
  await expect(loginPage.adminPortalHeading()).toBeVisible();
  await expect(loginPage.loginHeading()).toBeVisible();
  await expect(loginPage.emailTextbox()).toBeVisible();
  await expect(loginPage.passwordTextbox()).toBeVisible();
  await expect(loginPage.signInButton()).toBeVisible();

  // Enter credentials
  await loginPage.enterEmail(email);
  await expect(loginPage.emailTextbox()).toHaveValue(email);

  await loginPage.enterPassword(password);
  await expect(loginPage.passwordTextbox()).toHaveValue(password);

  // Sign in
  await loginPage.clickSignIn();
  await expect(page).toHaveURL(/dashboard/i, { timeout: 30000 });
  await expect(dashboardPage.welcomeToText()).toBeVisible();
  await expect(dashboardPage.organizationHeading()).toBeVisible();
  await expect(dashboardPage.adminPortalHeading()).toBeVisible();
});
