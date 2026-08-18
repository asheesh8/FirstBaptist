"use client";

import { useState } from "react";
import {
  church,
  eventCategories,
  events,
  type EventCategory,
} from "../site-data";

export default function EventExplorer() {
  const [activeCategory, setActiveCategory] =
    useState<EventCategory>("all");

  const visibleEvents =
    activeCategory === "all"
      ? events
      : events.filter((event) => event.category === activeCategory);

  return (
    <>
      <div
        className="event-filters"
        role="group"
        aria-label="Filter events"
      >
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

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {visibleEvents.length}{" "}
        {visibleEvents.length === 1 ? "event" : "events"}.
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
            {event.confirm ? (
              <p className="confirm-chip">Please confirm before coming</p>
            ) : null}
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
    </>
  );
}
