import { handlers } from "../src/test/handlers";
import { test as base, expect, type Page } from "@playwright/test";
import { createWorkerFixture, MockServiceWorker } from "playwright-msw";
import { rest } from "msw";

const test = base.extend<{ worker: MockServiceWorker }>({
  worker: createWorkerFixture(handlers),
});

test("should read default handler", async ({ page }) => {
  // await page.route("https://icanhazdadjoke.com/", (route) => {
  //   route.fulfill({
  //     status: 200,
  //     contentType: "application/json",
  //     body: JSON.stringify({
  //       id: "7h3oGtrOfxc",
  //       joke: "Whiteboards ... are remarkable.",
  //       status: 200,
  //     }),
  //   });
  // });

  await page.goto("http://localhost:3000");

  await expect(page.getByText(/get started/i)).toBeVisible();
  await expect(page.getByText("Joke from default handler")).toBeVisible();
});
test("should read overwritten handler", async ({ page, worker }) => {
  await worker.use(
    rest.get("https://icanhazdadjoke.com/", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: "7h3oGtrOfxc",
          joke: "Joke from overwritten handler",
        })
      );
    })
  );
  await page.goto("http://localhost:3000");

  await expect(page.getByText(/get started/i)).toBeVisible();
  await expect(page.getByText("Joke from overwritten handler")).toBeVisible();
});
