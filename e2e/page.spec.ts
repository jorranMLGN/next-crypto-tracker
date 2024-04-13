import { test, expect } from "@playwright/test";

test("coin page test", async ({ page }) => {
  await page.goto("http://localhost:3000/coin/bitcoin");

  test("should render the page with the correct coin based on the slug parameter", async () => {
    const h1Content = await page.textContent("h1");
    expect(h1Content).toContain("Bitcoin");
  });

  test("should render a loading spinner if the current coin is undefined or loading is true", async () => {
    // Check that the loader is present
    await page.waitForSelector(".mx-auto > .flex");

    const loader = await page.waitForSelector(".mx-auto > .flex");
    expect(loader).not.toBeNull();
  });
});
