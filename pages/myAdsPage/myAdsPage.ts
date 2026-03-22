import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MyAdsPage extends BasePage {
    protected pageName = "Мои объявления";

    readonly emptyStateTitle: Locator;
    readonly myAdsTitle: Locator;
    readonly adItems: Locator;  

    constructor(page: Page) {
        super(page);
        this.myAdsTitle = page.locator("[data-marker=\"my-ads-title\"]");
        this.emptyStateTitle = page.locator("[data-marker=\"empty-state-title\"]");
        this.adItems = page.locator("[data-marker=\"ad-item\"]");  
    }

    protected root(): Locator {
        return this.myAdsTitle;
    }

    async assertEmptyStateTitleIsVisible() {
        await expect(
            this.emptyStateTitle,
            "Заголовок заглушки отсутствия объявлений не отображается"
        ).toBeVisible();
    }

    /**
     * Проверить, что объявление отображается в списке
     */
    async assertAdExists(adTitle: string) {
        const ad = this.page.locator(`[data-marker="ad-item"]:has-text("${adTitle}")`);
        await expect(
            ad,
            `Объявление с названием "${adTitle}" не найдено в списке "Мои объявления"`
        ).toBeVisible();
    }

    /**
     * Получить карточку объявления по названию
     */
    getAdCard(adTitle: string): Locator {
        return this.page.locator(`[data-marker="ad-item"]:has-text("${adTitle}")`);
    }

    /**
     * Проверить параметры объявления на карточке
     */
    async assertAdParams(adTitle: string, params: { description?: string; price?: string }) {
        const adCard = this.getAdCard(adTitle);
        
        if (params.description) {
            await expect(
                adCard.locator("[data-marker=\"ad-description\"]"),
                `Описание объявления "${adTitle}" не соответствует ожидаемому`
            ).toHaveText(params.description);
        }
        
        if (params.price) {
            await expect(
                adCard.locator("[data-marker=\"ad-price\"]"),
                `Цена объявления "${adTitle}" не соответствует ожидаемой`
            ).toHaveText(params.price);
        }
    }
}
