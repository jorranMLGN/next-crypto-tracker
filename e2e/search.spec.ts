import { test, expect } from "@playwright/test";

test("Search by value", async ({ page }) => {
  await page.goto("http://localhost:3000/"); // replace with your app's URL

  const cell = page.getByPlaceholder("Search products...");

  await cell.fill("Bitcoin");

  await page.waitForTimeout(1000);

  const link = page.getByRole("link", { name: "Bitcoin BTC" });

  await link.click();

  const h1Content = await page.textContent("h1");
  expect(h1Content).toContain("Bitcoin");
});
