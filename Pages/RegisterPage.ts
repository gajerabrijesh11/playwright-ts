import { Page, Locator } from '@playwright/test';
export class RegisterPage {

    readonly page: Page;
    readonly RegisterURL: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmpasswordInput: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.RegisterURL = page.getByRole('link', { name: 'Register' });
        this.emailInput = page.getByTestId('register-email');
        this.passwordInput = page.getByTestId('register-password');
        this.confirmpasswordInput = page.getByRole('textbox', { name: 'Repeat your password' });
        this.registerButton = page.getByTestId('register-btn');
    }
    async registeruser(): Promise<void> {
        await this.RegisterURL.click();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/login');
    }


    async register(email: string, password: string, repassword: string): Promise<void> {
        await this.RegisterURL.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmpasswordInput.fill(repassword);
        await this.registerButton.click();
    }


}