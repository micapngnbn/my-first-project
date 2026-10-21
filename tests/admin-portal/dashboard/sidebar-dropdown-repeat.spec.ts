// spec: specs/admin-portal/dashboard/login-sidebar-user-menu.plan.md
import { test, expect } from '@playwright/test';
import { signInAsAdmin } from '../flows/Login/login.flows';

test('Sidebar menu dropdown can be expanded and collapsed repeatedly', async ({
  page,
}) => {
  const { appChrome } = await signInAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/i);

  // Expand
  await appChrome.expandSidebarDropdown('Staff');
  await expect(appChrome.expandedSidebarDropdown('Staff')).toBeVisible();

  // Collapse
  await appChrome.collapseSidebarDropdown('Staff');
  await expect(appChrome.expandedSidebarDropdown('Staff')).toHaveCount(0);

  // Expand again
  await appChrome.expandSidebarDropdown('Staff');
  await expect(appChrome.expandedSidebarDropdown('Staff')).toBeVisible();
  await expect(
    appChrome.sidebarSubmenuLink('Staff', 'Masterlist'),
  ).toBeVisible();
});
