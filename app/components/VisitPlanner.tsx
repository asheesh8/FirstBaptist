"use client";

import { useMemo, useState } from "react";
import { church, seatingChoices, visitDates } from "../site-data";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function VisitPlanner() {
  const [visitStep, setVisitStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [partySize, setPartySize] = useState("1");
  const [childrenComing, setChildrenComing] = useState(false);
  const [accessNotes, setAccessNotes] = useState("");
  const [seating, setSeating] = useState("");

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
  }, [
    accessNotes,
    childrenComing,
    email,
    firstName,
    partySize,
    seating,
    selectedDate,
  ]);

  return (
    <section className="visit-section" id="visit" aria-labelledby="visit-title">
      <div className="visit-intro">
        <p className="eyebrow light">Your first Sunday, made simple</p>
        <h2 id="visit-title">Know what to expect before you walk in.</h2>
        <p className="visit-lede">
          Worship begins at 10:00 am and lasts about an hour. Children may stay
          with you, and everyone is invited for coffee and treats afterward.
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
          <span>{Math.min(visitStep, 3)} / 3</span>
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
                This is only a preference—not an assigned or guaranteed seat.
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
  );
}
