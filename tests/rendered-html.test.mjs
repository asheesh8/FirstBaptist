import assert from "node:assert/strict";
import test from "node:test";

let homepagePromise;

async function renderHomepage() {
  if (!homepagePromise) {
    homepagePromise = (async () => {
      const workerUrl = new URL("../dist/server/index.js", import.meta.url);
      workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
      const { default: worker } = await import(workerUrl.href);

      const response = await worker.fetch(
        new Request("http://localhost/", {
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
    })();
  }

  return homepagePromise;
}

test("server-renders the church homepage", async () => {
  const { response, html } = await renderHomepage();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /<title>First Congregational Church of St\. Albans<\/title>/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("publishes the verified Sunday welcome and contact details", async () => {
  const { html } = await renderHomepage();

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
  const { html } = await renderHomepage();

  assert.match(html, /href=["']https:\/\/giv\.li\/c4dzwq["']/i);
  assert.match(html, />\s*(?:Continue to Givelify|Give(?: securely)?)\s*(?:<|<!--)/i);
  assert.doesNotMatch(html, /<input[^>]+(?:card|credit|routing|account)[^>]*>/i);
});

test("describes visit planning as optional, not a reservation", async () => {
  const { html } = await renderHomepage();

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
