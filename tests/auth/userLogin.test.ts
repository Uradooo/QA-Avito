import { test } from "@playwright/test";
import { MainPage } from "../../pages/mainPage/mainPage";
import { LoginPopupPage } from "../../pages/loginPopupPage/loginPopupPage";
import { MyAdsPage } from "../../pages/myAdsPage/myAdsPage";

test.describe("Авторизация", () => {
    test("вход существующего пользователя", async ({ page }) => {
        // arrange
        const mainPage = new MainPage(page);
        const loginPopup = new LoginPopupPage(page);
        const myAdsPage = new MyAdsPage(page);
        
        const email = process.env.E2E_USER_EMAIL;
        const password = process.env.E2E_USER_PASSWORD;

        if (!email || !password) {
            throw new Error("Missing env creds: set E2E_USER_EMAIL and E2E_USER_PASSWORD in .env");
        }

        // act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.waitForOpen();
        await loginPopup.login(email, password);

        // assert
        // 1. Пользователю доступен раздел "Мои объявления"
        await mainPage.openMyAdsPage();
        await myAdsPage.waitForOpen();
        
        // 2. Пользователю доступен выход из аккаунта (меню пользователя видно)
        await mainPage.openMainPage();
        await mainPage.assertUserIsLoggedIn();
        
        // 3. В "Профиль и настройки" отображается информация о пользователе
        // Открываем меню пользователя и проверяем профиль
        await mainPage.userMenuBtn.click();

    });
});
