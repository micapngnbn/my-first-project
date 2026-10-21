// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('Sidebar menu dropdown expands', async ({ page }) => {
  const { appChrome } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);
  await expect(appChrome.sidebarMenu()).toBeVisible();

  // Expand Staff sidebar dropdown
  await appChrome.expandSidebarDropdown('Staff');
  await expect(appChrome.expandedSidebarDropdown('Staff')).toBeVisible();
  await expect(
    appChrome.sidebarSubmenuLink('Staff', 'Masterlist'),
  ).toBeVisible();
});
