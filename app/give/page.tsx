/* eslint-disable @next/next/no-img-element -- brand and photo assets are local */

import type { Metadata } from "next";
import { Arrow } from "../components/ContentSections";
import SiteFrame from "../components/SiteFrame";
import { church } from "../site-data";

export const metadata: Metadata = {
  title: "Give | First Congregational Church of St. Albans",
  description:
    "Optional online giving to support worship, music, care, and community life at First Congregational Church of St. Albans.",
  alternates: { canonical: "/give" },
  openGraph: {
    title: "Give, if it feels right",
    description: "Support the shared life of First Congregational Church through Givelify.",
    images: [{ url: "/images/community-rooms.webp", alt: "Community rooms inside the church." }],
  },
  twitter: { card: "summary_large_image", images: ["/images/community-rooms.webp"] },
};

export default function GivePage() {
  return (
    <SiteFrame currentPath="/give">
      <section className="give-page" aria-labelledby="give-title">
        <div className="give-page-copy">
          <div className="give-mark" aria-hidden="true">
            <img src="/brand/welcome-chime-mark.svg" alt="" />
          </div>
          <p className="eyebrow">Support the life we share</p>
          <h1 id="give-title">Give, if it feels right.</h1>
          <p>
            Gifts help sustain worship, music, care, and a building that makes
            room for the wider St. Albans community. Giving is always optional.
          </p>
          <a
            className="button button-ink"
            href={church.giveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Continue to Givelify <span aria-hidden="true">↗</span>
          </a>
          <small>
            This button opens the church’s existing hosted Givelify page. No
            payment information is collected on this website.
          </small>
        </div>
        <figure className="give-page-photo">
          <img
            src="/images/community-rooms.webp"
            alt="View from the fellowship hall through the library toward the kitchen."
          />
          <figcaption>Making room for worship and community life</figcaption>
        </figure>
      </section>

      <section className="give-help section-shell" aria-labelledby="give-help-title">
        <div>
          <p className="eyebrow">Questions about a gift?</p>
          <h2 id="give-help-title">A real person can help.</h2>
        </div>
        <p>
          Contact the church office before giving if you have a question about
          the fund, memorial gifts, or another way to contribute.
        </p>
        <a className="button" href={`mailto:${church.email}?subject=Giving%20question`}>
          Email the office <Arrow />
        </a>
      </section>
    </SiteFrame>
  );
}
