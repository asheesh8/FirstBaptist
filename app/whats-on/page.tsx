/* eslint-disable @next/next/no-img-element -- all photos are pre-sized local WebP assets */

import type { Metadata } from "next";
import { ProgramSection, StoriesSection } from "../components/ContentSections";
import EventExplorer from "../components/EventExplorer";
import SiteFrame from "../components/SiteFrame";

export const metadata: Metadata = {
  title: "What’s On | First Congregational Church of St. Albans",
  description:
    "Current worship, art, reflection, music, community programs, church updates, and Facebook news from First Congregational Church.",
  alternates: { canonical: "/whats-on" },
  openGraph: {
    title: "What’s on at First Congregational",
    description: "Events, programs, reflections, and recent church life in St. Albans.",
    images: [{ url: "/images/fellowship.webp", alt: "The church fellowship hall." }],
  },
  twitter: { card: "summary_large_image", images: ["/images/fellowship.webp"] },
};

export default function WhatsOnPage() {
  return (
    <SiteFrame currentPath="/whats-on">
      <section className="page-masthead page-masthead-compact" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Church life, this week and beyond</p>
          <h1 id="page-title">Find your next gathering.</h1>
          <p>
            Worship, creativity, reflection, and connection—choose the thing
            that sounds like you.
          </p>
        </div>
        <figure>
          <img
            src="/images/fellowship.webp"
            alt="The open, wood-floored fellowship hall beneath dark timber beams."
          />
          <figcaption>Fellowship Hall · A room made for gathering</figcaption>
        </figure>
      </section>

      <section
        className="events-section section-shell route-events"
        id="events"
        aria-labelledby="events-title"
      >
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Happening here</p>
            <h2 id="events-title">Come for what moves you.</h2>
          </div>
          <p>
            Current as of August 18, 2026. Special gatherings can change, so
            please confirm before coming.
          </p>
        </div>
        <EventExplorer />
      </section>

      <ProgramSection />
      <StoriesSection />
    </SiteFrame>
  );
}
