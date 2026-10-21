import { type Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  emailTextbox() {
    return this.page.getByRole('textbox', { name: 'Email *' });
  }

  passwordTextbox() {
    return this.page.getByRole('textbox', { name: 'Password *' });
  }

  signInButton() {
    return this.page.getByRole('button', { name: /Sign in/i });
  }

  adminPortalHeading() {
    return this.page.getByRole('heading', { name: 'VMG Admin Portal' });
  }

  loginHeading() {
    return this.page.getByText('LOGIN', { exact: true });
  }

  async gotoLoginPage() {
    const baseUrl =
      process.env.ADMIN_PORTAL_QA_URL ?? 'https://admin-qa.vmg-portal.com';
    await this.page.goto(`${baseUrl}/login`);
  }

  async enterEmail(email: string) {
    await this.emailTextbox().fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordTextbox().fill(password);
  }

  async clearEmail() {
    await this.emailTextbox().fill('');
  }

  async clearPassword() {
    await this.passwordTextbox().fill('');
  }

  async clickSignIn() {
    await this.signInButton().click();
  }

  async login(email: string, password: string) {
    await this.gotoLoginPage();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}
