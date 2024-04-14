import { test, expect } from "@playwright/test";

test("Add coin to favorites", async ({ page }) => {
  await page.goto("http://localhost:3000/coin/bitcoin"); // replace with your app's URL

  // Get the button with the text "Add to favorites"
  const button = await page.waitForSelector(
    'button:has-text("Add to favorites")'
  );

  // Click the button
  await button.click();

  await page.goto("http://localhost:3000/favorites");

  // Get the cell with the text "Bitcoin"
  const cell = page.getByRole("cell", { name: "Bitcoin" });
  expect(cell).toBeDefined();
});

test("Removed coin from favorite", async ({ page }) => {
  await page.goto("http://localhost:3000/coin/bitcoin"); // replace with your app's URL

  // Get the button with the text "Add to favorites"
  const button = await page.waitForSelector(
    'button:has-text("Add to favorites")'
  );

  // Click the button
  await button.click();

  await page.goto("http://localhost:3000/favorites");

  // Get the cell with the text "Bitcoin"
  const cell = page.getByRole("row", { name: "1 Bitcoin" }).getByRole("button");

  // Click the button
  await cell.click();

  // Get the cell with the text "Bitcoin"
  const cellRemoved = page.getByRole("cell", { name: "No Favorites" });
  expect(cellRemoved).toBeDefined();
});
