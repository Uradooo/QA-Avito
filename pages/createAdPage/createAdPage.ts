import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class CreateAdPage extends BasePage {
    protected pageName = "Создание объявления";

    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly photoUpload: Locator;
    readonly priceInput: Locator;
    readonly categorySelect: Locator;
    readonly publishButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        
        // Обязательные поля
        this.titleInput = page.locator("[data-marker=\"ad-title-input\"]");
        this.descriptionInput = page.locator("[data-marker=\"ad-description-input\"]");
        this.photoUpload = page.locator("[data-marker=\"photo-upload\"]");
        
        // Опциональные поля
        this.priceInput = page.locator("[data-marker=\"price-input\"]");
        this.categorySelect = page.locator("[data-marker=\"category-select\"]");
        
        // Кнопки
        this.publishButton = page.locator("[data-marker=\"publish-button\"]");
        
        // Сообщения
        this.successMessage = page.locator("[data-marker=\"success-message\"]");
    }

    protected root(): Locator {
        return this.titleInput;
    }

    async waitForOpen() {
        await expect(
            this.root(),
            `Страница ${this.pageName} не открылась`
        ).toBeVisible();
    }

    /**
     * Заполнить название объявления
     */
    async fillTitle(title: string) {
        await this.titleInput.fill(title);
    }

    /**
     * Заполнить описание объявления
     */
    async fillDescription(description: string) {
        await this.descriptionInput.fill(description);
    }

    /**
     * Загрузить фото
     */
    async uploadPhoto(filePath: string) {
        await this.photoUpload.setInputFiles(filePath);
    }

    /**
     * Заполнить цену (опционально)
     */
    async fillPrice(price: string) {
        await this.priceInput.fill(price);
    }

    /**
     * Выбрать категорию
     */
    async selectCategory(category: string) {
        await this.categorySelect.click();
        await this.page.locator(`[data-marker="category-${category}"]`).click();
    }

    /**
     * Нажать кнопку "Опубликовать"
     */
    async clickPublish() {
        await this.publishButton.click();
    }

    /**
     * Создать объявление с минимальными полями
     */
    async createAdWithMinimalFields(title: string, description: string, photoPath: string) {
        await this.fillTitle(title);
        await this.fillDescription(description);
        await this.uploadPhoto(photoPath);
        await this.clickPublish();
    }

    /**
     * Создать объявление со всеми полями
     */
    async createAdWithAllFields(
        title: string,
        description: string,
        photoPath: string,
        price: string,
        category: string
    ) {
        await this.fillTitle(title);
        await this.fillDescription(description);
        await this.uploadPhoto(photoPath);
        await this.fillPrice(price);
        await this.selectCategory(category);
        await this.clickPublish();
    }

    /**
     * Проверить, что объявление успешно создано
     */
    async assertAdCreated() {
        await expect(
            this.successMessage,
            "Сообщение об успешном создании объявления не отобразилось"
        ).toBeVisible();
    }
}
