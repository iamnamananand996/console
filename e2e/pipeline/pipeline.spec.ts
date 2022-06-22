import { test, expect } from "@playwright/test";
import { openCreatePipelinePage } from "../common/pipeline";

test("should create pipeline", async ({ page }) => {
  await openCreatePipelinePage(page);
  page.screenshot({ path: "test.png" });
  await page.locator("#source.existing.id").click({ force: true });
});
