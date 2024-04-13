import { test, expect } from "@playwright/test";

test("should render the page with the correct coin based on the slug parameter", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/coin/bitcoin"); // replace with your app's URL

  // Check that the h1 element contains "Bitcoin"
  const h1Content = await page.textContent("h1");
  expect(h1Content).toContain("Bitcoin");
});

test("should render a loading spinner if the current coin is undefined or loading is true", async ({
  page,
}) => {
  // Check that the loader is present
  await page.goto("http://localhost:3000/coin/trtugyfhg");

  const loader = await page.waitForSelector(".mx-auto > .flex");
  expect(loader).toBeDefined();
});
