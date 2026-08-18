/* eslint-disable @next/next/no-img-element -- all photos are pre-sized local WebP assets */

import type { Metadata } from "next";
import {
  BuildingSection,
  GallerySection,
  HistorySection,
  WelcomeSection,
} from "../components/ContentSections";
import SiteFrame from "../components/SiteFrame";

export const metadata: Metadata = {
  title: "About | First Congregational Church of St. Albans",
  description:
    "Meet an Open and Affirming United Church of Christ congregation rooted in St. Albans since 1803, and explore its historic building.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Rooted in St. Albans since 1803",
    description: "Our welcome, history, landmark building, and spaces for the community.",
    images: [{ url: "/images/clock-tower.webp", alt: "The church clock tower above St. Albans." }],
  },
  twitter: { card: "summary_large_image", images: ["/images/clock-tower.webp"] },
};

export default function AboutPage() {
  return (
    <SiteFrame currentPath="/about">
      <section className="page-masthead page-masthead-about" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">A church, a landmark, a shared home</p>
          <h1 id="page-title">Old roots. Open doors.</h1>
          <p>
            Organized in 1803, gathering in today’s red-brick landmark since
            1894, and still becoming a more welcoming church.
          </p>
        </div>
        <figure>
          <img
            src="/images/arrival-exterior.webp"
            alt="The church and clock tower seen across a green lawn."
          />
          <figcaption>First Congregational Church · United Church of Christ</figcaption>
        </figure>
      </section>
      <WelcomeSection />
      <HistorySection />
      <GallerySection />
      <BuildingSection />
    </SiteFrame>
  );
}
