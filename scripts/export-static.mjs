import { mkdir, writeFile } from "node:fs/promises";

const workerUrl = new URL(`../dist/server/index.js?export=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);

const routes = [
  { path: "/", output: "index.html", marker: "There’s room" },
  { path: "/visit", output: "visit/index.html", marker: "Your first Sunday" },
  { path: "/worship", output: "worship/index.html", marker: "Come into the quiet" },
  { path: "/whats-on", output: "whats-on/index.html", marker: "Find your next gathering" },
  { path: "/about", output: "about/index.html", marker: "Old roots" },
  { path: "/give", output: "give/index.html", marker: "Give, if it feels right" },
];

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://firstcongregationalstalbans.org${route.path}`, {
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
    throw new Error(`Static export for ${route.path} failed with status ${response.status}`);
  }

  const html = await response.text();
  if (!html.includes(route.marker)) {
    throw new Error(`Static export for ${route.path} is missing ${route.marker}`);
  }

  const outputUrl = new URL(`../dist/client/${route.output}`, import.meta.url);
  await mkdir(new URL("./", outputUrl), { recursive: true });
  await writeFile(outputUrl, html);
  console.log(`Static route ${route.path} exported to dist/client/${route.output}`);
}
