import { writeFile } from "node:fs/promises";

const workerUrl = new URL(`../dist/server/index.js?export=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://firstcongregationalstalbans.org/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static export failed with status ${response.status}`);
}

const html = await response.text();

if (!html.includes("There’s room")) {
  throw new Error("Static export did not contain the church homepage");
}

await writeFile(new URL("../dist/client/index.html", import.meta.url), html);
console.log("Static homepage exported to dist/client/index.html");
