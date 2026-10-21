import { type Page } from '@playwright/test';

/** Authenticated Admin Portal shell: sidebar and header User Menu. */
export class AppChromePage {
  constructor(private page: Page) {}

  sidebarMenu() {
    return this.page.getByRole('navigation', { name: 'menu' });
  }

  sidebarDropdown(name: string) {
    return this.sidebarMenu().getByRole('button', { name });
  }

  expandedSidebarDropdown(name: string) {
    return this.sidebarMenu().getByRole('button', { name, expanded: true });
  }

  sidebarDropdownRegion(name: string) {
    return this.page.getByRole('region', { name });
  }

  sidebarSubmenuLink(_dropdownName: string, linkName: string | RegExp) {
    return this.sidebarMenu().getByRole('link', { name: linkName });
  }

  userMenuButton() {
    return this.page
      .getByRole('banner')
      .getByRole('button')
      .locator('visible=true')
      .first();
  }

  userMenu() {
    return this.page.locator('ion-popover').filter({ hasText: 'Dark Mode' });
  }

  darkModeButton() {
    return this.userMenu().getByRole('button', { name: 'Dark Mode' });
  }

  darkModeSwitch() {
    return this.userMenu().getByRole('switch', { name: 'Dark Mode' });
  }

  logoutButton() {
    return this.userMenu().getByRole('button', { name: 'Logout' });
  }

  logoutDialog() {
    return this.page.getByRole('alertdialog', { name: 'Logout' });
  }

  logoutConfirmOkButton() {
    return this.logoutDialog().getByRole('button', { name: 'OK' });
  }

  logoutConfirmCancelButton() {
    return this.logoutDialog().getByRole('button', { name: 'Cancel' });
  }

  darkModeRoot() {
    return this.page.locator('body.dark');
  }

  async expandSidebarDropdown(name: string) {
    if (await this.expandedSidebarDropdown(name).isVisible().catch(() => false)) {
      return;
    }
    await this.sidebarDropdown(name).click();
    await this.expandedSidebarDropdown(name).waitFor({ state: 'visible' });
  }

  async collapseSidebarDropdown(name: string) {
    if (
      !(await this.expandedSidebarDropdown(name).isVisible().catch(() => false))
    ) {
      return;
    }
    await this.sidebarDropdown(name).click();
    await this.expandedSidebarDropdown(name).waitFor({ state: 'hidden' });
  }

  async openUserMenu() {
    if (await this.userMenu().isVisible().catch(() => false)) {
      return;
    }
    await this.userMenuButton().click();
    await this.userMenu().waitFor({ state: 'visible' });
  }

  async dismissUserMenu() {
    if (!(await this.userMenu().isVisible().catch(() => false))) {
      return;
    }
    await this.page.keyboard.press('Escape');
    await this.userMenu().waitFor({ state: 'hidden' });
  }

  async enableDarkMode() {
    await this.openUserMenu();
    if ((await this.darkModeRoot().count()) > 0) {
      await this.dismissUserMenu();
      return;
    }
    await this.darkModeButton().click();
    await this.darkModeRoot().waitFor({ state: 'attached' });
    await this.dismissUserMenu();
  }

  async disableDarkMode() {
    await this.openUserMenu();
    if ((await this.darkModeRoot().count()) === 0) {
      await this.dismissUserMenu();
      return;
    }
    await this.darkModeButton().click();
    await this.darkModeRoot().waitFor({ state: 'detached' });
    await this.dismissUserMenu();
  }

  async clickLogout() {
    await this.openUserMenu();
    await this.logoutButton().click();
    await this.logoutDialog().waitFor({ state: 'visible' });
  }

  async confirmLogout() {
    await this.logoutConfirmOkButton().click();
  }

  async cancelLogout() {
    await this.logoutConfirmCancelButton().click();
  }
}
