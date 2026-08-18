/* eslint-disable @next/next/no-img-element -- all photos are pre-sized local WebP assets */

import type { Metadata } from "next";
import { Arrow } from "../components/ContentSections";
import ServiceArchive from "../components/ServiceArchive";
import SiteFrame from "../components/SiteFrame";

export const metadata: Metadata = {
  title: "Worship & Music | First Congregational Church of St. Albans",
  description:
    "Sunday worship, children in church, choir, organ, piano, and arts at First Congregational Church of St. Albans.",
  alternates: { canonical: "/worship" },
  openGraph: {
    title: "Worship and music in the heart of St. Albans",
    description: "A thoughtful hour together every Sunday at 10:00 am.",
    images: [{ url: "/images/sanctuary.webp", alt: "The historic church sanctuary." }],
  },
  twitter: { card: "summary_large_image", images: ["/images/sanctuary.webp"] },
};

export default function WorshipPage() {
  return (
    <SiteFrame currentPath="/worship">
      <section className="page-masthead page-masthead-worship" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Worship · Sundays at 10:00 am</p>
          <h1 id="page-title">Come into the quiet.</h1>
          <p>
            Leave with something to carry: music, meditation, hymn-singing,
            reflection, and a little unhurried time together.
          </p>
          <a className="button" href="/visit">
            Plan your Sunday <Arrow />
          </a>
        </div>
        <figure>
          <img
            src="/images/sanctuary.webp"
            alt="The center aisle and wooden pews leading toward the chancel and organ pipes."
          />
          <figcaption>Worship lasts about an hour · Coffee and treats follow</figcaption>
        </figure>
      </section>

      <section className="worship-section" id="service-archive" aria-labelledby="service-title">
        <div className="worship-copy">
          <p className="eyebrow light">A Sunday for everyone</p>
          <h2 id="service-title">No performance required.</h2>
          <p>
            Come dressed as yourself. Belief, doubt, and curiosity can all sit
            together, and children are welcome to remain in worship.
          </p>
          <ul>
            <li>Worship begins at 10:00 am and lasts about one hour.</li>
            <li>Ask the office about current nursery arrangements.</li>
            <li>Services replay on Channel 1079 Sundays at 4:00 pm.</li>
          </ul>
        </div>
        <ServiceArchive />
      </section>

      <section className="music-section section-shell" id="music" aria-labelledby="music-title">
        <div className="music-copy">
          <p className="eyebrow">Music &amp; the arts</p>
          <h2 id="music-title">Make a joyful sound.</h2>
          <p>
            Choir, tracker organ, piano, art, and community concerts bring the
            sanctuary to life. Singers who read music or learn by ear are
            welcome; the choir season typically runs September through
            mid-June.
          </p>
          <a
            className="button"
            href="mailto:info@firstcongregationalstalbans.org?subject=Music%20at%20First%20Congregational"
          >
            Ask about music <Arrow />
          </a>
        </div>
        <div className="music-photo-grid">
          <figure className="music-photo-main">
            <img
              src="/images/music-stained-glass.webp"
              alt="Organ pipes, stained glass, and carved timberwork in the sanctuary."
              loading="lazy"
            />
            <figcaption>Music beneath stained glass</figcaption>
          </figure>
          <figure>
            <img
              src="/images/organ-console.webp"
              alt="The wooden console of the church’s historic tracker organ."
              loading="lazy"
            />
            <figcaption>The historic tracker organ</figcaption>
          </figure>
        </div>
      </section>
    </SiteFrame>
  );
}
