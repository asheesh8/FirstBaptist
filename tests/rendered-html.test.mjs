import assert from "node:assert/strict";
import test from "node:test";

let workerPromise;
const renderedPages = new Map();

async function getWorker() {
  if (!workerPromise) {
    workerPromise = (async () => {
      const workerUrl = new URL("../dist/server/index.js", import.meta.url);
      workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
      return (await import(workerUrl.href)).default;
    })();
  }
  return workerPromise;
}

async function renderPath(pathname) {
  if (!renderedPages.has(pathname)) {
    renderedPages.set(
      pathname,
      (async () => {
        const worker = await getWorker();

        const response = await worker.fetch(
          new Request(`http://localhost${pathname}`, {
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

        return { response, html: await response.text() };
      })(),
    );
  }

  return renderedPages.get(pathname);
}

test("server-renders the church homepage", async () => {
  const { response, html } = await renderPath("/");

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /<title>First Congregational Church of St\. Albans<\/title>/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("renders six focused routes with distinct page content", async () => {
  const routes = [
    ["/", /There’s room for you here/i],
    ["/visit", /Your first Sunday, made simple/i],
    ["/worship", /Come into the quiet/i],
    ["/whats-on", /Find your next gathering/i],
    ["/about", /Old roots\. Open doors/i],
    ["/give", /Give, if it feels right/i],
  ];

  for (const [pathname, marker] of routes) {
    const { response, html } = await renderPath(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(html, marker, pathname);
  }
});

test("keeps the homepage focused and sends deeper tasks to real pages", async () => {
  const { html } = await renderPath("/");

  assert.match(html, /href=["']\/visit["']/i);
  assert.match(html, /href=["']\/worship["']/i);
  assert.match(html, /href=["']\/whats-on["']/i);
  assert.match(html, /href=["']\/about["']/i);
  assert.match(html, /href=["']\/give["']/i);
  assert.doesNotMatch(html, /Save a welcome/i);
  assert.doesNotMatch(html, /Load service video/i);
  assert.doesNotMatch(html, /A beautiful old building, still full of life/i);
});

test("publishes the verified Sunday welcome and sitewide contact details", async () => {
  const { html } = await renderPath("/");

  assert.match(html, /Sunday(?:\s+worship)?[^<]{0,40}10:00\s*(?:a\.?m\.?|AM)/i);
  assert.match(html, /Open\s*(?:&amp;|&|and)\s*Affirming/i);
  assert.match(html, /27\s+Church\s+Street/i);
  assert.match(html, /\(?802\)?[\s.-]*524[\s.-]*4555/);
  assert.match(html, /info@firstcongregationalstalbans\.org/i);
  assert.match(html, /href=["']tel:\+?18025244555["']/i);
  assert.match(
    html,
    /href=["']mailto:info@firstcongregationalstalbans\.org["']/i,
  );
});

test("hands giving off to the church's existing Givelify page", async () => {
  const { html } = await renderPath("/give");

  assert.match(html, /href=["']https:\/\/giv\.li\/c4dzwq["']/i);
  assert.match(html, />\s*(?:Continue to Givelify|Give(?: securely)?)\s*(?:<|<!--)/i);
  assert.doesNotMatch(html, /<input[^>]+(?:card|credit|routing|account)[^>]*>/i);
});

test("describes visit planning as optional, not a reservation", async () => {
  const { html } = await renderPath("/visit");

  assert.match(html, /Optional\s+welcome\s+note/i);
  assert.match(
    html,
    /(?:no\s+sign\s*up\s+is\s+needed|never\s+need[^<]{0,90}(?:sign\s*up|reserve|ticket)|simply\s+walk\s+in)/i,
  );
  assert.doesNotMatch(
    html,
    /(?:reservation|booking|seat)\s+(?:is\s+)?(?:confirmed|complete|reserved)|you(?:'re| are)\s+(?:booked|confirmed)/i,
  );
});

test("keeps the service archive privacy-gated and publishes current church life", async () => {
  const worship = await renderPath("/worship");
  const whatsOn = await renderPath("/whats-on");

  assert.match(worship.html, /Load service video/i);
  assert.doesNotMatch(worship.html, /<iframe\b/i);
  assert.match(worship.html, /Children are welcome/i);
  assert.match(whatsOn.html, /Schedule current as of August 18, 2026/i);
  assert.match(whatsOn.html, /Follow along on Facebook/i);
});
