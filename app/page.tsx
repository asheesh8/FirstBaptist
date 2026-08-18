/* eslint-disable @next/next/no-img-element -- all photos are pre-sized local WebP assets */

import { Arrow } from "./components/ContentSections";
import SiteFrame from "./components/SiteFrame";
import { events } from "./site-data";

const startHere = [
  {
    number: "01",
    kicker: "New here?",
    title: "Plan a first Sunday",
    copy: "What to expect, where to park, accessibility, and an optional note to say you’re coming.",
    href: "/visit",
    link: "Start your visit",
    image: "/images/arrival-exterior.webp",
    alt: "The church and clock tower seen across a green lawn.",
  },
  {
    number: "02",
    kicker: "Sunday at 10",
    title: "Worship & music",
    copy: "A thoughtful hour of music, meditation, hymn-singing, and reflection—children included.",
    href: "/worship",
    link: "See what worship feels like",
    image: "/images/sanctuary.webp",
    alt: "The center aisle and wooden pews leading toward the chancel and organ pipes.",
  },
  {
    number: "03",
    kicker: "All week long",
    title: "Find what’s on",
    copy: "Gatherings for reflection, art, music, conversation, and everyday community life.",
    href: "/whats-on",
    link: "Browse events",
    image: "/images/fellowship.webp",
    alt: "The open, wood-floored fellowship hall beneath dark timber beams.",
  },
] as const;

export default function Home() {
  return (
    <SiteFrame currentPath="/">
      <section className="hero home-hero" aria-labelledby="hero-title">
        <div className="hero-copy-block">
          <p className="eyebrow">Open &amp; Affirming · St. Albans, Vermont</p>
          <h1 id="hero-title">
            There’s room
            <br />
            for you here.
          </h1>
          <p className="hero-copy">
            Worship, music, reflection, and everyday community life meet in our
            historic church beside Taylor Park.
          </p>
          <div className="hero-actions">
            <a className="button" href="/visit">
              Plan your first Sunday <Arrow />
            </a>
            <a className="button button-quiet" href="/whats-on">
              See what’s on
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <div className="hero-photo-frame">
            <img
              src="/images/hero-exterior.webp"
              alt="The red-brick First Congregational Church and its clock tower beneath a clear blue sky."
            />
            <span className="photo-stamp">Since 1803</span>
          </div>
          <figcaption>
            <span>27 Church Street</span>
            <span>Beside Taylor Park</span>
          </figcaption>
          <aside className="sunday-card" aria-label="Sunday worship details">
            <div className="date-tile" aria-hidden="true">
              <span>Every</span>
              <strong>Sun</strong>
            </div>
            <div>
              <p className="card-kicker">Come as you are</p>
              <h2>Worship at 10:00 am</h2>
              <p>About one hour · Coffee afterward</p>
            </div>
            <a href="/visit" aria-label="Learn what to expect on Sunday">
              <Arrow />
            </a>
          </aside>
        </figure>
      </section>

      <section className="home-start section-shell" aria-labelledby="start-title">
        <div className="home-section-heading">
          <p className="eyebrow">Start here</p>
          <h2 id="start-title">Choose your doorway in.</h2>
          <p>New, curious, or already part of the church—there’s a clear next step.</p>
        </div>
        <div className="home-route-grid">
          {startHere.map((item) => (
            <a className="home-route-card" href={item.href} key={item.href}>
              <div className="home-route-image">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span>{item.number}</span>
              </div>
              <div>
                <p className="card-kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <strong>
                  {item.link} <Arrow />
                </strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-week" aria-labelledby="week-title">
        <div className="section-shell">
          <div className="home-week-heading">
            <div>
              <p className="eyebrow light">This week at church</p>
              <h2 id="week-title">Come for what moves you.</h2>
            </div>
            <a className="inline-link light-link" href="/whats-on">
              See the full calendar <Arrow />
            </a>
          </div>
          <div className="home-event-grid">
            {events.slice(0, 3).map((event) => (
              <article key={event.title}>
                <p className="card-kicker">{event.cadence}</p>
                <h3>{event.title}</h3>
                <strong>{event.time}</strong>
                <span>{event.location}</span>
              </article>
            ))}
          </div>
          <p className="home-current-note">
            Schedule current as of August 18, 2026. Please confirm special
            gatherings before coming.
          </p>
        </div>
      </section>

      <section className="home-welcome section-shell" aria-labelledby="home-welcome-title">
        <div className="home-welcome-copy">
          <div className="welcome-mark" aria-hidden="true">
            <img src="/brand/welcome-chime-mark.svg" alt="" />
          </div>
          <p className="eyebrow">Open &amp; Affirming</p>
          <h2 id="home-welcome-title">Bring your whole self.</h2>
          <p>
            Belief, doubt, identity, family, and life experience all belong in
            the room. This is a community still learning how to welcome well.
          </p>
          <a className="inline-link" href="/about#all-are-welcome">
            Read our welcome covenant <Arrow />
          </a>
        </div>
        <a className="home-location-card" href="/visit#location">
          <img
            src="/images/taylor-park.webp"
            alt="Taylor Park with its fountain, gazebo, and the church beyond."
            loading="lazy"
          />
          <span>
            <small>In the heart of St. Albans</small>
            <strong>Meet us beside Taylor Park</strong>
            <em>Directions &amp; arrival details →</em>
          </span>
        </a>
      </section>
    </SiteFrame>
  );
}
