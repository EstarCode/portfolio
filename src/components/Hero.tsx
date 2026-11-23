import { useState } from "react";
import type { Profile } from "../types";

export function Hero({ p }: { p: Profile }) {
  const photos = [
    p.photos?.[0] || "/assets/photos/photo1.jpg",
    p.photos?.[1] || "/assets/photos/photo2.jpg",
  ];

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // Displayed photo:
  // When cursor hovers over frame with mouse, show the shadow photo (index 1)
  // When not hovering, show the selected photo (index 0 / bright by default)
  const displayedIdx = isHovered ? (activeIdx === 0 ? 1 : 0) : activeIdx;

  const handleToggle = () => {
    setActiveIdx((prev) => (prev === 0 ? 1 : 0));
  };

  const initials = (p.name || "AT")
    .trim()
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-editorial-grid">
        {/* Portrait */}
        <div className="hero-photo-column">
          <div
            className="hero-single-frame"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setIsHovered(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setIsHovered(false);
            }}
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            aria-label={`Portrait photo ${displayedIdx + 1} of 2. Click or tap to toggle alternative portrait.`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
          >
            {photos.map((src, idx) => {
              const isVisible = idx === displayedIdx;
              const isFailed = failedImages[idx];
              return (
                <div
                  key={src + idx}
                  className={`frame-photo-layer ${isVisible ? "is-visible" : "is-hidden"}`}
                  aria-hidden={!isVisible}
                >
                  {!isFailed && src ? (
                    <img
                      src={src}
                      alt={`${p.name || "Abraham Tiruneh"} portrait`}
                      className="hero-photo-img"
                      width={240}
                      height={300}
                      loading="eager"
                      decoding="async"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [idx]: true }))
                      }
                    />
                  ) : (
                    <div className="hero-photo-fallback" aria-hidden="true">
                      {initials}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Identity */}
        <div className="hero-content-column">
          <h1 id="hero-title">{p.name || "Abraham Tiruneh"}</h1>
          <p className="role-headline">{p.headline || p.title || "Full-Stack Developer"}</p>
          {p.bio && <p className="lead">{p.bio}</p>}

          <div className="hero-meta-row">
            <span className="hero-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {p.location}
            </span>
            {p.availability && (
              <span className="hero-availability-badge">
                <span className="availability-dot" aria-hidden="true" />
                {p.availability}
              </span>
            )}
          </div>

          <div className="actions">
            <a className="cta" href="#contact">Get in touch</a>
            {p.resumeUrl && (
              <a
                className="ghost"
                href={p.resumeUrl}
                download="resume.pdf"
                aria-label="Download resume (PDF)"
              >
                Resume
              </a>
            )}
            {p.socials?.github && (
              <a
                className="ghost"
                href={p.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name ?? "Abraham"}'s GitHub profile (opens in new tab)`}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
