import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https//localhost:3000");
});

test("should do async stuff", async ({ page }) => {
  await expect(page.getByText(/get started/i)).toBeVisible();
});
