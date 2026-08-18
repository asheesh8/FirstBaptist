"use client";
/* eslint-disable @next/next/no-img-element -- the poster is a pre-sized local WebP asset */

import { useState } from "react";

const ARCHIVE_URL =
  "https://www.youtube.com/watch?v=VU_YRBHOq24&t=1819s";
const EMBED_URL =
  "https://www.youtube-nocookie.com/embed/VU_YRBHOq24?start=1819&autoplay=1";

export default function ServiceArchive() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="service-video">
      {videoLoaded ? (
        <iframe
          src={EMBED_URL}
          title="First Congregational Church service archive from July 26, 2026"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
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
            width="1600"
            height="900"
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
        The video loads from YouTube only after you choose to play it. You can
        also{" "}
        <a href={ARCHIVE_URL} target="_blank" rel="noreferrer">
          watch on YouTube ↗
        </a>
        .
      </p>
    </div>
  );
}
