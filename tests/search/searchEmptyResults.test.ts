import { test } from "@playwright/test";
import { MainPage } from "../../pages/mainPage/mainPage";
import { SearchPage } from "../../pages/searchPage/searchPage";

test.describe("Поиск объявлений", () => {
    test("поиск по несуществующему значению показывает сообщение об отсутствии результатов", async ({ page }) => {
        const mainPage = new MainPage(page);
        const searchPage = new SearchPage(page);

        await mainPage.openMainPage();
        await mainPage.search("абвгд 123");

        await searchPage.assertEmptyStateVisible();
    });
});
