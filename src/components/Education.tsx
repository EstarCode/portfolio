import { useState, useEffect, useRef } from "react";
import type { Education, Certificate } from "../types";
import { Section } from "./Section";

interface EducationProps {
  education?: Education[];
  certificates?: Certificate[];
}

export function EducationSection({ education, certificates }: EducationProps) {
  const safeEdu = Array.isArray(education) ? education : [];
  const safeCerts = Array.isArray(certificates) ? certificates : [];

  const [activeCertIdx, setActiveCertIdx] = useState(0);
  const [certImgFailed, setCertImgFailed] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const hasCerts = safeCerts.length > 0;
  const currentCert = hasCerts ? safeCerts[activeCertIdx] ?? safeCerts[0] ?? null : null;

  useEffect(() => {
    if (activeCertIdx >= safeCerts.length && safeCerts.length > 0) {
      setActiveCertIdx(0);
    }
  }, [safeCerts.length, activeCertIdx]);

  useEffect(() => {
    if (safeCerts.length <= 1 || isPaused) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveCertIdx((prev) => (prev + 1) % safeCerts.length);
    }, 4500);

    return () => clearInterval(interval);
    // Intentionally excludes activeCertIdx: restarting on every manual nav
    // would fire the timer immediately after a click. isPaused already pauses it.
  }, [safeCerts.length, isPaused]);

  const handlePrev = () => {
    setActiveCertIdx((prev) => (prev === 0 ? safeCerts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCertIdx((prev) => (prev + 1) % safeCerts.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? null;
    if (touchEndX !== null) {
      const diffX = touchStartX.current - touchEndX;
      // Minimum swipe threshold of 45px
      if (diffX > 45) {
        handleNext();
      } else if (diffX < -45) {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (safeEdu.length === 0 && !hasCerts) return null;

  return (
    <Section id="education" title="Education & Credentials">
      {/* Education — Timeline matching Experience */}
      {safeEdu.length > 0 && (
        <ul className="timeline" role="list" style={{ marginBottom: hasCerts ? "2.5rem" : 0 }}>
          {safeEdu.map((e, idx) => (
            <li key={(e.school || "") + idx} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-org">{e.school}</span>
                {e.period && <span className="timeline-period">{e.period}</span>}
              </div>
              <div className="timeline-role">{e.degree}</div>
              {e.details && <p className="timeline-detail">{e.details}</p>}
            </li>
          ))}
        </ul>
      )}

      {/* Certificates — Auto-advancing showcase with manual controls */}
      {hasCerts && currentCert && (
        <div
          className="cert-showcase"
          role="region"
          aria-roledescription="carousel"
          aria-label="Certifications"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
          onKeyDown={handleKeyDown}
        >
          <div className="cert-showcase-header">
            <div className="cert-header-left">
              <h4 className="cert-showcase-title">Certifications</h4>
              <span className="cert-counter">
                {activeCertIdx + 1} / {safeCerts.length}
              </span>
            </div>
            <div className="cert-nav-btns">
              <button
                type="button"
                className="cert-nav-btn"
                onClick={handlePrev}
                aria-label="Previous certificate"
                title="Previous certificate"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className="cert-nav-btn"
                onClick={handleNext}
                aria-label="Next certificate"
                title="Next certificate"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="cert-frame"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {!certImgFailed[currentCert.image] && currentCert.image ? (
              <a
                href={currentCert.verifyUrl || currentCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className={`cert-img-link ${currentCert.verifyUrl ? "is-verify" : "is-preview"}`}
                title={currentCert.verifyUrl ? "Verify official credential (opens in new tab)" : "View full certificate (opens in new tab)"}
                aria-label={`View full certificate for ${currentCert.title} (opens in new tab)`}
              >
                <img
                  key={currentCert.image + activeCertIdx}
                  src={currentCert.image}
                  alt={`${currentCert.title} — ${currentCert.issuer} certificate`}
                  loading="lazy"
                  className="cert-img"
                  onError={() =>
                    setCertImgFailed((prev) => ({ ...prev, [currentCert.image]: true }))
                  }
                />
              </a>
            ) : (
              <div className="cert-fallback">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
                <span>{currentCert.title}</span>
              </div>
            )}

            {/* Progress track */}
            {safeCerts.length > 1 && (
              <div className="cert-progress-track" aria-hidden="true">
                {safeCerts.map((c, idx) => (
                  <div
                    key={(c.image || c.title || "") + idx}
                    className={`cert-segment ${
                      idx === activeCertIdx ? "active" : idx < activeCertIdx ? "passed" : ""
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="cert-meta">
            <div>
              <p className="cert-title">{currentCert.title}</p>
              <p className="cert-issuer">
                {currentCert.issuer}
                {currentCert.date && ` · ${currentCert.date}`}
              </p>
            </div>
            <div className="cert-actions">
              <div className="cert-dots" role="group" aria-label="Certificate selectors">
                {safeCerts.map((cert, idx) => (
                  <button
                    key={(cert.image || cert.title || "") + idx}
                    type="button"
                    aria-current={idx === activeCertIdx ? "true" : undefined}
                    aria-label={`View certificate ${idx + 1}: ${cert.title}`}
                    className={`cert-dot ${idx === activeCertIdx ? "active" : ""}`}
                    onClick={() => setActiveCertIdx(idx)}
                  />
                ))}
              </div>
              <a
                href={currentCert.verifyUrl || currentCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-verify"
                title={currentCert.verifyUrl ? "Verify official credential" : "View credential image"}
                aria-label={`Verify credential for ${currentCert.title} (opens in new tab)`}
              >
                {currentCert.verifyUrl ? "Verify" : "View Credential"}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

