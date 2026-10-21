import { type Page } from '@playwright/test';

/** Authenticated Admin Portal Dashboard content. */
export class DashboardPage {
  constructor(private page: Page) {}

  welcomeToText() {
    return this.page.getByText('WELCOME TO', { exact: true });
  }

  organizationHeading() {
    return this.page
      .locator('app-dashboard')
      .getByRole('heading', {
        name: 'Veteran Medical Group Inc.',
        exact: true,
      });
  }

  adminPortalHeading() {
    return this.page
      .locator('app-dashboard')
      .getByRole('heading', { name: 'ADMIN PORTAL', exact: true });
  }
}
