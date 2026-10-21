// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('Sidebar menu dropdown collapses', async ({ page }) => {
  const { appChrome } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Expand then collapse Staff
  await appChrome.expandSidebarDropdown('Staff');
  await expect(appChrome.expandedSidebarDropdown('Staff')).toBeVisible();

  await appChrome.collapseSidebarDropdown('Staff');
  await expect(appChrome.expandedSidebarDropdown('Staff')).toHaveCount(0);
  await expect(appChrome.sidebarDropdownRegion('Staff')).toHaveCount(0);
});
