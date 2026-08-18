"use client";
/* eslint-disable @next/next/no-img-element -- brand files are local, fixed-size SVG assets */
/* eslint-disable @next/next/no-html-link-for-pages -- exported routes are standalone HTML documents */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { church, navigation } from "../site-data";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function SiteFrame({
  currentPath,
  children,
}: {
  currentPath: string;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <a href="/visit">
          Your first Sunday <Arrow />
        </a>
      </div>

      <header className="site-header">
        <a
          className="brand"
          href="/"
          aria-label="First Congregational Church of St. Albans, home"
          aria-current={currentPath === "/" ? "page" : undefined}
        >
          <img src="/brand/welcome-chime-mark.svg" alt="" width="48" height="48" />
          <span>
            <strong>First Congregational</strong>
            <small>Church of St. Albans</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="text-link desktop-only"
            href="/give"
            aria-current={currentPath === "/give" ? "page" : undefined}
          >
            Give
          </a>
          <a className="button button-small desktop-plan" href="/visit">
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

      {menuOpen ? (
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
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={currentPath === item.href ? "page" : undefined}
                  onClick={closeMenu}
                >
                  <span aria-hidden="true">0{index + 1}</span>
                  {item.label}
                  <Arrow />
                </a>
              ))}
            </nav>
            <a className="button" href="/visit" onClick={closeMenu}>
              Plan your visit <Arrow />
            </a>
            <a className="mobile-give-link" href="/give" onClick={closeMenu}>
              Give, if it feels right <Arrow />
            </a>
          </div>
        </div>
      ) : null}

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img
            src="/brand/welcome-chime-horizontal.svg"
            alt="First Congregational Church of St. Albans"
          />
          <p>An Open and Affirming congregation of the United Church of Christ.</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/give">Give</a>
          <a href={church.facebook} target="_blank" rel="noreferrer">
            Facebook ↗
          </a>
        </nav>
        <div className="footer-contact">
          <a href={church.directionsUrl} target="_blank" rel="noreferrer">
            27 Church Street, St. Albans, Vermont 05478 ↗
          </a>
          <a href={church.phoneHref}>{church.phone}</a>
          <a href={`mailto:${church.email}`}>{church.email}</a>
        </div>
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
        <a href="/visit">Plan your visit</a>
      </div>
    </>
  );
}
