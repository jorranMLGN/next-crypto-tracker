import { test, expect } from "@playwright/test";

test("dashboard page test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const title = page
    .getByRole("heading", { name: "Dashboard" })
    .locator("span");

  expect(await title.textContent()).toBe("Dashboard");
});
