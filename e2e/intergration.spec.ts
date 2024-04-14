import { test, expect } from "@playwright/test";

test("Integrate with pages", async ({ page }) => {
  await page.goto("http://localhost:3000/"); // replace with your app's URL

  const cell = page.getByPlaceholder("Search products...");

  await cell.fill("Bitcoin");

  await page.waitForTimeout(1000);

  const link = page.getByRole("link", { name: "Bitcoin BTC" });

  await link.click();

  const h1Content = await page.textContent("h1");
  expect(h1Content).toContain("Bitcoin");

  const button = await page.waitForSelector(
    'button:has-text("Add to favorites")'
  );

  // Click the button
  await button.click();

  const dashboardLink = page.getByRole("link").first();
  await dashboardLink.click();

  await page.waitForTimeout(1000);

  const dashboardTitle = page
    .getByRole("heading", { name: "Dashboard" })
    .locator("span");

  expect(await dashboardTitle.textContent()).toBe("Dashboard");

  //locator('td:nth-child(6)').first()

  const row = page.locator("td:nth-child(6)").first();

  await row.click({
    force: true,
  });

  await page.waitForTimeout(1000);

  const cellRemoved = page.getByRole("button", { name: "Remove favorites" });
  expect(cellRemoved).toBeDefined();

  await page.getByRole("link", { name: "Favorites" }).click();

  await page.waitForTimeout(1000);

  const cellFav = page.getByRole("cell", { name: "Bitcoin" });
  expect(cell).toBeDefined();

  await page
    .getByRole("row", { name: "1 Bitcoin" })
    .getByRole("button")
    .click();

  await dashboardLink.click();

  await page.waitForTimeout(1000);

  await page.getByRole("link", { name: "Bitcoin Bitcoin $" }).click();

  await page.waitForTimeout(1000);

  // Get the cell with the text "Bitcoin"
  expect(cellRemoved).toBeDefined();
});
