import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class SearchPage extends BasePage {
    protected pageName = "Страница поиска";
    readonly emptyStateMessage: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        super(page);
        this.emptyStateMessage = page.getByText("Ничего не найдено");
        this.searchResults = page.locator("[data-marker=\"search-results\"]"); 
    }

    protected root(): Locator {
        return this.emptyStateMessage;
    }

    async assertEmptyStateVisible() {
        await expect(
            this.emptyStateMessage,
            "Сообщение 'Ничего не найдено' отображается"
        ).toBeVisible();
    }

    async assertResultsVisible() {
        await expect(
            this.searchResults,
            "Результаты поиска не отображаются"
        ).toBeVisible();
    }
}
