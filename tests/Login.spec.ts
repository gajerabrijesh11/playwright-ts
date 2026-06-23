import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { UserDataJson } from '../test-data/user-types';
import * as rawData from '../test-data/user-data.json';


const userdata: UserDataJson = rawData as UserDataJson;

test('User should be able to login successfully to EventHub', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.navigate();
    await loginpage.login(userdata.validUser.email, userdata.validUser.password);
    await expect(page.getByRole('heading', { name: 'Discover & Book Amazing Events' })).toBeVisible();
});

for (const data of userdata.DDTLogindata) {
    test(`User login with DDTdata ${data.scenario}`, async ({ page }) => {
        
        const loginpage = new LoginPage(page);
        await loginpage.navigate();
        await loginpage.login(data.email, data.password);
        if(data.scenario === "Valid Login")
        await expect(page.getByRole('heading', { name: ' Discover & Book Amazing Events ' })).toBeVisible();
    else{
        const ErrorElement = page.getByText('✕Invalid email or password×');
        await expect(ErrorElement).toBeVisible();

    }

    });
}