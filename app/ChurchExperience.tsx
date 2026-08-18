"use client";
/* eslint-disable @next/next/no-img-element -- all photos are pre-sized local WebP assets */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  church,
  eventCategories,
  events,
  gallery,
  navigation,
  programCards,
  seatingChoices,
  stories,
  visitDates,
  type EventCategory,
} from "./site-data";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function ChurchExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitStep, setVisitStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [partySize, setPartySize] = useState("1");
  const [childrenComing, setChildrenComing] = useState(false);
  const [accessNotes, setAccessNotes] = useState("");
  const [seating, setSeating] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<EventCategory>("all");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const visibleEvents = useMemo(
    () =>
      activeCategory === "all"
        ? events
        : events.filter((event) => event.category === activeCategory),
    [activeCategory],
  );

  const visitMailto = useMemo(() => {
    const subject = `Planning a visit on ${selectedDate || "an upcoming Sunday"}`;
    const body = [
      "Hello First Congregational Church,",
      "",
      `I’m thinking about visiting for worship on ${selectedDate || "an upcoming Sunday"}.`,
      firstName ? `First name: ${firstName}` : "",
      email ? `Best email: ${email}` : "",
      `Group size: ${partySize}`,
      `Children coming: ${childrenComing ? "Yes" : "No / not noted"}`,
      `Seating preference: ${seating || "No preference noted"}`,
      accessNotes ? `Arrival or access question: ${accessNotes}` : "",
      "",
      "I understand that no sign-up is needed, this is not a reservation, and seating is not assigned or guaranteed.",
      "",
      "Thank you!",
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${church.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [accessNotes, childrenComing, email, firstName, partySize, seating, selectedDate]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="service-strip">
        <p>
          <strong>Sunday worship at 10:00 am</strong>
          <span aria-hidden="true">·</span>
          <span className="strip-address">27 Church Street, St. Albans</span>
        </p>
        <a href="#visit">
          Your first Sunday <Arrow />
        </a>
      </div>

      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="First Congregational Church of St. Albans, home"
        >
          <img
            src="/brand/welcome-chime-mark.svg"
            alt=""
            width="48"
            height="48"
          />
          <span>
            <strong>First Congregational</strong>
            <small>Church of St. Albans</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="text-link desktop-only"
            href={church.giveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Give
          </a>
          <a className="button button-small desktop-plan" href="#visit">
            Plan your visit
          </a>
          <button
            className="menu-button"
            type="button"
            ref={menuButtonRef}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open site menu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-backdrop">
          <div
            className="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="mobile-menu-top">
              <p>Come on in.</p>
              <button
                type="button"
                ref={menuCloseRef}
                aria-label="Close site menu"
                onClick={closeMenu}
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {item.label}
                  <Arrow />
                </a>
              ))}
            </nav>
            <a
              className="button"
              href="#visit"
              onClick={closeMenu}
            >
              Plan your visit <Arrow />
            </a>
            <a
              className="mobile-give-link"
              href={church.giveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Give through Givelify ↗
            </a>
          </div>
        </div>
      )}

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy-block">
            <p className="eyebrow">
              Open &amp; Affirming · St. Albans, Vermont
            </p>
            <h1 id="hero-title">
              There’s room
              <br />
              for you here.
            </h1>
            <p className="hero-copy">
              Worship, music, reflection, and everyday community life meet in
              our historic church beside Taylor Park.
            </p>
            <div className="hero-actions">
              <a className="button" href="#visit">
                Plan your first Sunday <Arrow />
              </a>
              <a className="button button-quiet" href="#events">
                What’s happening
              </a>
            </div>
            <div className="hero-meta" aria-label="Sunday worship summary">
              <span>
                <strong>10:00</strong>
                <small>Sunday morning</small>
              </span>
              <span>
                <strong>~1 hour</strong>
                <small>Stay for coffee</small>
              </span>
              <span>
                <strong>All ages</strong>
                <small>Come as you are</small>
              </span>
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
                <p>Music · Reflection · Coffee afterward</p>
              </div>
              <a href="#visit" aria-label="Learn what to expect on Sunday">
                <Arrow />
              </a>
            </aside>
          </figure>
        </section>

        <div className="trust-rail" aria-label="About our church">
          <p>
            <span aria-hidden="true">✦</span> United Church of Christ
          </p>
          <p>
            <span aria-hidden="true">✦</span> Open &amp; Affirming
          </p>
          <p>
            <span aria-hidden="true">✦</span> Rooted in St. Albans since 1803
          </p>
          <p>
            <span aria-hidden="true">✦</span> Children welcome in worship
          </p>
        </div>

        <section className="welcome-section section-shell" aria-labelledby="welcome-title">
          <div className="welcome-mark" aria-hidden="true">
            <img src="/brand/welcome-chime-mark.svg" alt="" />
          </div>
          <div>
            <p className="eyebrow">An open and affirming congregation</p>
            <h2 id="welcome-title">You are welcome here.</h2>
          </div>
          <div className="welcome-copy">
            <p className="welcome-lede">
              Each person is unique, valuable, and on a spiritual journey.
            </p>
            <p>
              Our Open and Affirming covenant welcomes people across race,
              ethnicity, age, sexual orientation, gender identity and
              expression, family structure, faith background, ability, and
              economic circumstance to share fully in the life of the church.
            </p>
            <p className="welcome-note">
              Open &amp; Affirming since May 16, 2021
            </p>
          </div>
        </section>

        <section
          className="programs-section section-shell"
          id="programs"
          aria-labelledby="programs-title"
        >
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Find your place here</p>
              <h2 id="programs-title">More than Sunday.</h2>
            </div>
            <p>
              There are many ways to gather—make music, ask questions, create,
              serve, share a meal, or simply take a breath.
            </p>
          </div>

          <div className="program-grid">
            {programCards.map((program) => (
              <article className="program-card" key={program.number}>
                <div className="program-image">
                  <img src={program.image} alt={program.alt} loading="lazy" />
                  <span>{program.number}</span>
                </div>
                <div className="program-card-copy">
                  <p className="card-kicker">{program.eyebrow}</p>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <a href={program.href}>
                    {program.link} <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="visit-section" id="visit" aria-labelledby="visit-title">
          <div className="visit-intro">
            <p className="eyebrow light">Your first Sunday, made simple</p>
            <h2 id="visit-title">Know what to expect before you walk in.</h2>
            <p className="visit-lede">
              Worship begins at 10:00 am and lasts about an hour. Children may
              stay with you, and everyone is invited for coffee and treats
              afterward.
            </p>
            <div className="visit-facts">
              <div>
                <span>01</span>
                <p>
                  <strong>Come as you are.</strong>
                  There is no dress code and no sign-up is needed.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Bring your questions.</strong>
                  Belief, doubt, and curiosity can all sit together.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Ask before you arrive.</strong>
                  We are happy to help with arrival or accessibility questions.
                </p>
              </div>
            </div>
            <div className="visit-contact-row">
              <a href={church.directionsUrl} target="_blank" rel="noreferrer">
                Get directions ↗
              </a>
              <a href={church.phoneHref}>{church.phone}</a>
            </div>
          </div>

          <div className="visit-planner" aria-labelledby="planner-title">
            <div className="planner-topline">
              <div>
                <p className="card-kicker">Optional welcome note</p>
                <h3 id="planner-title">Save a welcome</h3>
              </div>
              <span>
                {Math.min(visitStep, 3)} / 3
              </span>
            </div>
            <div
              className="planner-progress"
              role="progressbar"
              aria-label="Visit planner progress"
              aria-valuemin={1}
              aria-valuemax={3}
              aria-valuenow={Math.min(visitStep, 3)}
            >
              <span style={{ width: `${(Math.min(visitStep, 3) / 3) * 100}%` }} />
            </div>

            <div className="planner-content" aria-live="polite">
              {visitStep === 1 && (
                <fieldset>
                  <legend>Which Sunday are you considering?</legend>
                  <p className="field-help">
                    You can always come another week—or simply walk in.
                  </p>
                  <div className="date-options">
                    {visitDates.map((date) => (
                      <label
                        key={date.long}
                        htmlFor={`visit-${date.short.replace(" ", "-").toLowerCase()}`}
                      >
                        <input
                          id={`visit-${date.short.replace(" ", "-").toLowerCase()}`}
                          type="radio"
                          name="visit-date"
                          value={date.long}
                          aria-label={`${date.long} at 10:00 am`}
                          checked={selectedDate === date.long}
                          onChange={(event) => setSelectedDate(event.target.value)}
                        />
                        <span>
                          <small>Sunday</small>
                          <strong>{date.short}</strong>
                          <em>10:00 am</em>
                        </span>
                      </label>
                    ))}
                  </div>
                  <button
                    className="button planner-next"
                    type="button"
                    disabled={!selectedDate}
                    onClick={() => setVisitStep(2)}
                  >
                    Continue <Arrow />
                  </button>
                </fieldset>
              )}

              {visitStep === 2 && (
                <fieldset>
                  <legend>Who should we look out for?</legend>
                  <p className="field-help">
                    Every field is optional. Nothing is sent until you choose to
                    email the church.
                  </p>
                  <div className="field-grid">
                    <label>
                      <span>First name</span>
                      <input
                        type="text"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Your first name"
                      />
                    </label>
                    <label>
                      <span>Email</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                      />
                    </label>
                    <label>
                      <span>Group size</span>
                      <select
                        value={partySize}
                        onChange={(event) => setPartySize(event.target.value)}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <option key={size} value={size}>
                            {size} {size === 1 ? "person" : "people"}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="check-field">
                      <input
                        type="checkbox"
                        checked={childrenComing}
                        onChange={(event) => setChildrenComing(event.target.checked)}
                      />
                      <span>Children will be with me</span>
                    </label>
                    <label className="field-full">
                      <span>Arrival or accessibility question</span>
                      <textarea
                        rows={3}
                        value={accessNotes}
                        onChange={(event) => setAccessNotes(event.target.value)}
                        placeholder="Anything you would like to ask before arriving?"
                      />
                    </label>
                  </div>
                  <div className="planner-buttons">
                    <button
                      className="button button-back"
                      type="button"
                      onClick={() => setVisitStep(1)}
                    >
                      Back
                    </button>
                    <button
                      className="button"
                      type="button"
                      onClick={() => setVisitStep(3)}
                    >
                      Continue <Arrow />
                    </button>
                  </div>
                </fieldset>
              )}

              {visitStep === 3 && (
                <fieldset>
                  <legend>Where might you feel comfortable?</legend>
                  <p className="field-help">
                    This is only a preference—not an assigned or guaranteed
                    seat.
                  </p>
                  <div className="seat-options">
                    {seatingChoices.map((choice) => (
                      <label key={choice}>
                        <input
                          type="radio"
                          name="seating"
                          value={choice}
                          checked={seating === choice}
                          onChange={(event) => setSeating(event.target.value)}
                        />
                        <span>{choice}</span>
                      </label>
                    ))}
                  </div>
                  <p className="reservation-note">
                    No sign-up is needed to attend. This is not a reservation or
                    ticket, and seating is never assigned or guaranteed.
                  </p>
                  <div className="planner-buttons">
                    <button
                      className="button button-back"
                      type="button"
                      onClick={() => setVisitStep(2)}
                    >
                      Back
                    </button>
                    <button
                      className="button"
                      type="button"
                      disabled={!seating}
                      onClick={() => setVisitStep(4)}
                    >
                      Prepare my note <Arrow />
                    </button>
                  </div>
                </fieldset>
              )}

              {visitStep === 4 && (
                <div className="planner-summary">
                  <span className="summary-mark" aria-hidden="true">
                    ✓
                  </span>
                  <p className="card-kicker">Ready when you are</p>
                  <h4>Your welcome note is prepared.</h4>
                  <p>
                    Nothing has been sent. The button below opens your email app
                    with your details so you can review everything first.
                  </p>
                  <dl>
                    <div>
                      <dt>Sunday</dt>
                      <dd>{selectedDate}</dd>
                    </div>
                    <div>
                      <dt>Group</dt>
                      <dd>
                        {partySize} {partySize === "1" ? "person" : "people"}
                      </dd>
                    </div>
                    <div>
                      <dt>Preference</dt>
                      <dd>{seating}</dd>
                    </div>
                  </dl>
                  <a className="button planner-email" href={visitMailto}>
                    Email the church about my visit <Arrow />
                  </a>
                  <button
                    className="start-over"
                    type="button"
                    onClick={() => setVisitStep(1)}
                  >
                    Change my answers
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          className="events-section section-shell"
          id="events"
          aria-labelledby="events-title"
        >
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Happening here</p>
              <h2 id="events-title">Come for what moves you.</h2>
            </div>
            <p>
              A living calendar of worship, creativity, reflection, and
              connection around the church.
            </p>
          </div>

          <div className="event-filters" aria-label="Filter events">
            {eventCategories.map((category) => (
              <button
                type="button"
                key={category.value}
                aria-pressed={activeCategory === category.value}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {visibleEvents.length} {visibleEvents.length === 1 ? "event" : "events"}.
          </p>
          <div className="event-grid">
            {visibleEvents.map((event) => (
              <article
                className={`event-card accent-${event.accent}`}
                key={event.title}
              >
                <div className="event-card-top">
                  <span>{event.cadence}</span>
                  <small>{event.category}</small>
                </div>
                <h3>{event.title}</h3>
                <p className="event-time">{event.time}</p>
                <p>{event.description}</p>
                <div className="event-location">
                  <span aria-hidden="true">⌖</span>
                  {event.location}
                </div>
                {event.confirm && (
                  <p className="confirm-chip">Please confirm before coming</p>
                )}
              </article>
            ))}
          </div>
          <div className="schedule-note">
            <span aria-hidden="true">i</span>
            <p>
              Schedule current as of August 18, 2026. Call{" "}
              <a href={church.phoneHref}>{church.phone}</a> or{" "}
              <a href={`mailto:${church.email}`}>email the office</a> to confirm.
            </p>
          </div>
        </section>

        <section className="worship-section" id="worship" aria-labelledby="worship-title">
          <div className="worship-copy">
            <p className="eyebrow light">Sunday worship</p>
            <h2 id="worship-title">Come into the quiet. Leave with something to carry.</h2>
            <p>
              Gather at 10:00 am for music, meditation, hymn-singing, and
              reflection. Worship lasts about an hour, and coffee and treats
              follow.
            </p>
            <ul>
              <li>Children are welcome to remain in worship.</li>
              <li>Ask the office about current nursery arrangements.</li>
              <li>Services replay on Channel 1079 Sundays at 4:00 pm.</li>
            </ul>
            <a className="inline-link light-link" href="#visit">
              Plan your Sunday <Arrow />
            </a>
          </div>

          <div className="service-video">
            {videoLoaded ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/VU_YRBHOq24?start=1819&autoplay=1"
                title="First Congregational Church service archive from July 26, 2026"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                className="video-consent"
                type="button"
                onClick={() => setVideoLoaded(true)}
                aria-label="Load the July 26, 2026 service video from YouTube"
              >
                <img
                  src="/images/sanctuary-balcony.webp"
                  alt="View from the rear balcony across the sunlit sanctuary."
                  loading="lazy"
                />
                <span className="video-overlay" aria-hidden="true" />
                <span className="play-button" aria-hidden="true">
                  ▶
                </span>
                <span className="video-label">
                  <small>Service archive · July 26, 2026</small>
                  <strong>Load service video</strong>
                </span>
              </button>
            )}
            <p>
              The video loads from YouTube only after you choose to play it. You
              can also{" "}
              <a
                href="https://www.youtube.com/watch?v=VU_YRBHOq24&t=1819s"
                target="_blank"
                rel="noreferrer"
              >
                watch on YouTube ↗
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="stories-section section-shell"
          id="stories"
          aria-labelledby="stories-title"
        >
          <div className="section-heading stories-heading">
            <p className="eyebrow">Notes from church life</p>
            <h2 id="stories-title">What we’re reflecting on lately.</h2>
            <p>
              Fresh notes, weekly updates, and glimpses of the community that
              gathers here.
            </p>
          </div>

          <div className="story-grid">
            {stories.map((story, index) => (
              <a
                className="story-card"
                href={story.href}
                target="_blank"
                rel="noreferrer"
                key={story.href}
              >
                <div className="story-number">0{index + 1}</div>
                <div>
                  <p className="card-kicker">{story.type}</p>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
                <div className="story-footer">
                  <span>{story.date}</span>
                  <strong aria-hidden="true">↗</strong>
                </div>
              </a>
            ))}
          </div>

          <div className="facebook-callout">
            <div className="facebook-mark" aria-hidden="true">f</div>
            <div>
              <p className="card-kicker">Day-to-day church life</p>
              <h3>Follow along on Facebook.</h3>
              <p>
                See new photos, timely announcements, and conversation from the
                church community.
              </p>
            </div>
            <a
              className="button button-quiet"
              href={church.facebook}
              target="_blank"
              rel="noreferrer"
            >
              Visit Facebook <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="history-section" id="about" aria-labelledby="history-title">
          <div className="history-visuals">
            <figure className="clock-photo">
              <img
                src="/images/clock-tower.webp"
                alt="The church roofline and four-faced clock tower."
                loading="lazy"
              />
              <figcaption>The clock above Taylor Park</figcaption>
            </figure>
            <figure className="bell-photo">
              <img
                src="/images/bell.webp"
                alt="The historic bell and timber supports inside the clock tower."
                loading="lazy"
              />
              <figcaption>Inside the bell tower</figcaption>
            </figure>
            <div className="history-year" aria-hidden="true">
              1803
            </div>
          </div>

          <div className="history-copy">
            <p className="eyebrow light">A town landmark</p>
            <h2 id="history-title">Built by many hands. Kept by many hearts.</h2>
            <p>
              The congregation was organized in 1803. After a fire destroyed
              the earlier church, the present red-brick building rose between
              1892 and 1894.
            </p>
            <p>
              Its four-faced clock keeps time over Taylor Park, while the
              sanctuary holds historic stained-glass windows and a tracker
              organ that still supports worship and music.
            </p>
            <ol className="history-timeline">
              <li>
                <span>1803</span>
                <p>Congregation organized</p>
              </li>
              <li>
                <span>1892–94</span>
                <p>Present church built</p>
              </li>
              <li>
                <span>2021</span>
                <p>Open &amp; Affirming covenant adopted</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="gallery-section section-shell" aria-labelledby="gallery-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Take a look around</p>
              <h2 id="gallery-title">A beautiful old building, still full of life.</h2>
            </div>
            <p>
              Sanctuary, fellowship rooms, music, and the familiar clock above
              downtown St. Albans.
            </p>
          </div>
          <div className="gallery-grid">
            {gallery.map((photo) => (
              <figure className={photo.className} key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="building-section section-shell" aria-labelledby="building-title">
          <div className="building-photo">
            <img
              src="/images/community-rooms.webp"
              alt="View from the fellowship hall through the library toward the kitchen."
              loading="lazy"
            />
          </div>
          <div className="building-copy">
            <p className="eyebrow">A place the town gathers</p>
            <h2 id="building-title">Make room for your gathering.</h2>
            <p>
              The church offers spaces for weddings, receptions, shared meals,
              family gatherings, and meetings. Ask the office about
              availability, fees, and a tour.
            </p>
            <a
              className="button"
              href={`mailto:${church.email}?subject=${encodeURIComponent("Building use inquiry")}`}
            >
              Ask about the building <Arrow />
            </a>
          </div>
        </section>

        <section className="give-section" aria-labelledby="give-title">
          <div className="give-mark" aria-hidden="true">
            <img src="/brand/welcome-chime-mark.svg" alt="" />
          </div>
          <div>
            <p className="eyebrow">Support the life we share</p>
            <h2 id="give-title">Give, if it feels right.</h2>
            <p>
              Online gifts are handled securely on the church’s hosted
              Givelify page. Giving is always optional.
            </p>
          </div>
          <a
            className="button button-ink"
            href={church.giveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Continue to Givelify <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="contact-section section-shell" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="eyebrow">Come say hello</p>
            <h2 id="contact-title">Right beside Taylor Park.</h2>
            <p>
              Office hours vary. Leave a message or send an email and someone
              from the church will get back to you.
            </p>
            <address>
              <a href={church.directionsUrl} target="_blank" rel="noreferrer">
                27 Church Street
                <br />
                St. Albans, Vermont 05478 ↗
              </a>
              <a href={church.phoneHref}>{church.phone}</a>
              <a href={`mailto:${church.email}`}>{church.email}</a>
            </address>
            <div className="contact-actions">
              <a className="button" href="#visit">
                Plan your first Sunday <Arrow />
              </a>
              <a
                className="button button-quiet"
                href={`mailto:${church.email}`}
              >
                Email the office
              </a>
            </div>
          </div>
          <figure className="contact-image">
            <img
              src="/images/taylor-park.webp"
              alt="Taylor Park with its fountain, gazebo, and the church beyond."
              loading="lazy"
            />
            <figcaption>
              <span>Taylor Park</span>
              <span>Downtown St. Albans</span>
            </figcaption>
          </figure>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img
            src="/brand/welcome-chime-horizontal.svg"
            alt="First Congregational Church of St. Albans"
          />
          <p>
            An Open and Affirming congregation of the United Church of Christ.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href={church.giveUrl} target="_blank" rel="noreferrer">
            Give ↗
          </a>
        </nav>
        <div className="footer-bottom">
          <p>© 2026 First Congregational Church of St. Albans</p>
          <p>Sunday worship · 10:00 am</p>
        </div>
      </footer>

      <div className="mobile-visit-bar">
        <div>
          <small>Sunday worship</small>
          <strong>10:00 am</strong>
        </div>
        <a href="#visit">Plan your visit</a>
      </div>
    </>
  );
}
