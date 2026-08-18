import type { Metadata } from "next";
import { ContactSection } from "../components/ContentSections";
import SiteFrame from "../components/SiteFrame";
import VisitPlanner from "../components/VisitPlanner";

export const metadata: Metadata = {
  title: "Plan a Visit | First Congregational Church of St. Albans",
  description:
    "Plan a first Sunday at First Congregational Church: worship at 10:00 am, arrival details, accessibility, directions, and an optional welcome note.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Your first Sunday, made simple",
    description:
      "What to expect at First Congregational Church of St. Albans, beside Taylor Park.",
    images: [{ url: "/images/arrival-exterior.webp", alt: "The church beside Taylor Park." }],
  },
  twitter: { card: "summary_large_image", images: ["/images/arrival-exterior.webp"] },
};

export default function VisitPage() {
  return (
    <SiteFrame currentPath="/visit">
      <VisitPlanner />
      <ContactSection />
    </SiteFrame>
  );
}
