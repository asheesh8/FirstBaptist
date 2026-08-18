/* eslint-disable @next/next/no-img-element -- all photos are pre-sized local WebP assets */

import { church, gallery, programCards, stories } from "../site-data";

export function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function WelcomeSection() {
  return (
    <section
      className="welcome-section section-shell"
      id="all-are-welcome"
      aria-labelledby="welcome-title"
    >
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
          ethnicity, age, sexual orientation, gender identity and expression,
          family structure, faith background, ability, and economic
          circumstance to share fully in the life of the church.
        </p>
        <p className="welcome-note">Open &amp; Affirming since May 16, 2021</p>
      </div>
    </section>
  );
}

export function ProgramSection() {
  return (
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
  );
}

export function StoriesSection() {
  return (
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
        <div className="facebook-mark" aria-hidden="true">
          f
        </div>
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
  );
}

export function HistorySection() {
  return (
    <section
      className="history-section"
      id="history"
      aria-labelledby="history-title"
    >
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
          The congregation was organized in 1803. After a fire destroyed the
          earlier church, the present red-brick building rose between 1892 and
          1894.
        </p>
        <p>
          Its four-faced clock keeps time over Taylor Park, while the sanctuary
          holds historic stained-glass windows and a tracker organ that still
          supports worship and music.
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
  );
}

export function GallerySection() {
  return (
    <section
      className="gallery-section section-shell"
      id="gallery"
      aria-labelledby="gallery-title"
    >
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
  );
}

export function BuildingSection() {
  return (
    <section
      className="building-section section-shell"
      id="building-use"
      aria-labelledby="building-title"
    >
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
          family gatherings, and meetings. Ask the office about availability,
          fees, and a tour.
        </p>
        <a
          className="button"
          href={`mailto:${church.email}?subject=${encodeURIComponent("Building use inquiry")}`}
        >
          Ask about the building <Arrow />
        </a>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      className="contact-section section-shell"
      id="location"
      aria-labelledby="contact-title"
    >
      <div className="contact-copy">
        <p className="eyebrow">Come say hello</p>
        <h2 id="contact-title">Right beside Taylor Park.</h2>
        <p>
          Office hours vary. Leave a message or send an email and someone from
          the church will get back to you.
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
          <a className="button" href={church.directionsUrl} target="_blank" rel="noreferrer">
            Get directions <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-quiet" href={`mailto:${church.email}`}>
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
  );
}
