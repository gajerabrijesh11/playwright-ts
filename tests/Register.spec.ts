import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';
import { GenerateData } from '@utils/GenerateData';
import { UserDataJson } from '../test-data/user-types';
import * as rawData from '../test-data/user-data.json';

const userdata: UserDataJson = rawData as UserDataJson;

test('User should be able to register successfully to EventHub', async ({ page }) => {
    const registerpage = new RegisterPage(page);


    await registerpage.navigate();
    const registerurl = registerpage.RegisterURL;
    await expect(registerurl).toBeVisible();
    const randomEmail = GenerateData.getRandomEmail();
    const randomPassword = GenerateData.getRandomPassword();

    const randomrepassword = randomPassword;
    await registerpage.register(randomEmail, randomPassword, randomrepassword);
    const loggeduser: string = await page.locator('#user-email-display').innerText()
    console.log(loggeduser);
});

for (const data of userdata.RegisterUser) {
    test(`User Regiser with ${data.scenario}`, async ({ page }) => {
        const registerpage = new RegisterPage(page);
        await registerpage.navigate();
        await registerpage.register(data.email, data.Password, data['Re-Password']);
        if(data.scenario === "Invalid Email")
            await expect(page.getByText('Enter a valid email', { exact: true })).toBeVisible();
        else if(data.scenario === "Invalid Password")
            await expect(page.getByText('Password does not meet the requirements below', { exact: true })).toBeVisible();
        else{
            await expect(page.getByText('Passwords do not match', { exact: true })).toBeVisible();
        }
    })

}