import { type Page } from '@playwright/test';
import { LoginPage } from '../../pages/Login/LoginPage';
import { DashboardPage } from '../../pages/Dashboard/DashboardPage';
import { AppChromePage } from '../../pages/AppChrome/AppChromePage';

export const email = process.env.ADMIN_EMAIL ?? '';
export const password = process.env.ADMIN_PASSWORD ?? '';

function requireAdminCredentials() {
  if (!email || !password) {
    throw new Error(
      'Missing ADMIN_EMAIL or ADMIN_PASSWORD. Create a .env file in the project root (see .env.example).'
    );
  }
}

/** Sign in to Admin Portal QA and land on the Dashboard. */
export async function signInAsAdmin(page: Page) {
  requireAdminCredentials();

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const appChrome = new AppChromePage(page);

  await loginPage.login(email, password);
  await page.waitForURL(/dashboard/i, { timeout: 30000 });

  return { loginPage, dashboardPage, appChrome };
}
