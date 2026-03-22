import { test, expect } from "../../fixtures/auth.fixture";
import { MainPage } from "../../pages/mainPage/mainPage";
import { CreateAdPage } from "../../pages/createAdPage/createAdPage";
import { MyAdsPage } from "../../pages/myAdsPage/myAdsPage";
import { SearchPage } from "../../pages/searchPage/searchPage";

test.describe("Создание объявления", () => {
    // Уникальные данные для теста
    const adTitle = `Тестовое объявление ${Date.now()}`;
    const adDescription = "Это тестовое описание объявления для проверки функциональности";
    const adPrice = "1000";
    const photoPath = "test-data/test-photo.jpg"; // путь к тестовому файлу

    test("создание объявления со всеми обязательными полями", async ({ authedPage }) => {
        // arrange
        const mainPage = new MainPage(authedPage);
        const createAdPage = new CreateAdPage(authedPage);
        const myAdsPage = new MyAdsPage(authedPage);
        const searchPage = new SearchPage(authedPage);

        // act - создание объявления
        await mainPage.openMainPage();
        await mainPage.openCreateAdPage();
        await createAdPage.waitForOpen();
        
        await createAdPage.createAdWithMinimalFields(
            adTitle,
            adDescription,
            photoPath
        );

        // assert - проверка результатов
        // 1. Объявление отображается в списке "Мои объявления"
        await myAdsPage.waitForOpen();
        await myAdsPage.assertAdExists(adTitle);
        
        // 2. На созданной карточке отображаются все заполненные параметры
        await myAdsPage.assertAdParams(adTitle, {
            description: adDescription,
            price: adPrice
        });
        
        // 3. Объявление отображается в поиске
        await mainPage.openMainPage();
        await mainPage.search(adTitle);
        await searchPage.assertResultsVisible();
        
        // Проверяем, что наше объявление есть в результатах поиска
        const searchResult = authedPage.locator(`[data-marker="search-result"]:has-text("${adTitle}")`);
        await expect(searchResult).toBeVisible();
    });
});
