import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signinButton: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signinButton = page.getByRole('button', { name: 'Sign In' });
    
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signinButton.click();
  }
  async navigate(): Promise<void> {
    
    // await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
    await this.page.goto('/login'); 
  }
}