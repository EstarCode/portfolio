import type { Project } from "../types";
import { Section } from "./Section";

function ProjectGraphic({
  icon,
  category = "",
  name = "",
}: {
  icon?: string;
  category?: string;
  name?: string;
}) {
  const t = icon || `${category} ${name}`.toLowerCase();
  if (t === "space" || t.includes("space") || t.includes("observatory")) {
    return (
      <div className="project-preview-canvas graphic-space">
        <div className="canvas-orbit-ring" />
        <div className="canvas-orbit-ring ring-outer" />
        <div className="canvas-icon-badge">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8" />
            <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
          </svg>
        </div>
        <span className="canvas-sub-label">Space Science · 3D Telemetry</span>
      </div>
    );
  }
  if (t === "agriculture" || t.includes("farm") || t.includes("agri")) {
    return (
      <div className="project-preview-canvas graphic-farm">
        <div className="canvas-orbit-ring" />
        <div className="canvas-icon-badge">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span className="canvas-sub-label">Satellite IoT · Agronomy</span>
      </div>
    );
  }
  if (t === "document" || t.includes("pdf") || t.includes("doc")) {
    return (
      <div className="project-preview-canvas graphic-pdf">
        <div className="canvas-orbit-ring" />
        <div className="canvas-icon-badge">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <span className="canvas-sub-label">Vector Retrieval · Doc Intelligence</span>
      </div>
    );
  }
  return (
    <div className="project-preview-canvas graphic-ai">
      <div className="canvas-orbit-ring" />
      <div className="canvas-icon-badge">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>
      <span className="canvas-sub-label">Gemini AI · Virtual STEM Labs</span>
    </div>
  );
}

export function Projects({ projects }: { projects?: Project[] }) {
  const list = Array.isArray(projects) ? projects : [];
  if (list.length === 0) return null;

  return (
    <Section id="projects" title="Projects">
      <div className="project-grid">
        {list.map((p, idx) => {
          const tags = Array.isArray(p.tags) ? p.tags : [];
          const links = Array.isArray(p.links) ? p.links : [];
          const highlights = Array.isArray(p.highlights) ? p.highlights : [];

          let displayUrl = "";
          const firstLink = links[0];

          // Detect direct downloads by label keywords or known file extensions
          const DOWNLOAD_LABEL_KEYWORDS = ["download", "apk", "install", "get app"];
          const DOWNLOAD_EXTENSIONS = /\.(apk|exe|dmg|zip|rar|msi|pkg|deb|rpm|pdf)$/i;
          const DOWNLOAD_HOSTS = ["drive.google.com", "mega.nz", "dropbox.com", "github.com/releases"];
          const cleanHref = (firstLink?.href || "").split("?")[0] || "";
          const isDirectDownload = Boolean(
            firstLink &&
            (
              DOWNLOAD_LABEL_KEYWORDS.some((kw) => firstLink.label.toLowerCase().includes(kw)) ||
              DOWNLOAD_EXTENSIONS.test(cleanHref) ||
              DOWNLOAD_HOSTS.some((h) => (firstLink.href || "").includes(h))
            )
          );

          if (firstLink?.href) {
            try {
              const parsed = new URL(firstLink.href);
              displayUrl = parsed.hostname.replace(/^www\./, "");
            } catch {
              displayUrl = firstLink.label;
            }
          }

          return (
            <article key={String(p.name || idx)} className="project-card">
              {/* Browser chrome with interactive preview */}
              <div className="project-frame">
                <div className="project-chrome">
                  <div className="chrome-dots" aria-hidden="true">
                    <span className="chrome-dot" />
                    <span className="chrome-dot" />
                    <span className="chrome-dot" />
                  </div>
                  {displayUrl && (
                    <div className="chrome-url-box">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <span className="chrome-url">{displayUrl}</span>
                    </div>
                  )}
                  {links.length > 0 && !isDirectDownload && (
                    <span className="chrome-status-pill">
                      <span className="status-live-dot" aria-hidden="true" />
                      Live
                    </span>
                  )}
                  {isDirectDownload && (
                    <span className="chrome-status-pill chrome-status-dl">
                      <span className="status-dl-dot" aria-hidden="true" />
                      Download
                    </span>
                  )}
                </div>

                {p.image ? (
                  <img src={p.image} alt={p.name} className="project-img" loading="lazy" />
                ) : (
                  <ProjectGraphic icon={p.icon} category={p.category} name={p.name} />
                )}
              </div>

              {/* Card body */}
              <div className="project-body">
                <div className="project-header">
                  <h3 className="project-name">
                    {firstLink?.href && !isDirectDownload ? (
                      <a
                        href={firstLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-name-link"
                        aria-label={`Visit ${p.name} (opens in new tab)`}
                      >
                        <span>{p.name}</span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="project-title-arrow">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  {p.category && <span className="project-category">{p.category}</span>}
                </div>

                <p className="project-summary">{p.summary}</p>

                {highlights.length > 0 && (
                  <ul className="project-highlights">
                    {highlights.map((h, i) => (
                      <li key={h.slice(0, 40) + i}>
                        <span className="highlight-bullet" aria-hidden="true">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {tags.length > 0 && (
                  <div className="project-tags">
                    {tags.map((t) => (
                      <span key={t} className="project-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Links */}
              {links.length > 0 && (
                <div className="project-links">
                  {links.map((link) => {
                    const cleanHrefL = (link.href || "").split("?")[0] || "";
                    const isLinkDownload = Boolean(
                      DOWNLOAD_LABEL_KEYWORDS.some((kw) => link.label.toLowerCase().includes(kw)) ||
                      DOWNLOAD_EXTENSIONS.test(cleanHrefL) ||
                      DOWNLOAD_HOSTS.some((h) => (link.href || "").includes(h))
                    );
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`project-link${isLinkDownload ? " is-download" : ""}`}
                        aria-label={`${p.name} — ${link.label} (opens in new tab)`}
                      >
                        <span>{link.label}</span>
                        {isLinkDownload ? (
                          /* Download arrow (↓) */
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="5 12 12 19 19 12" />
                          </svg>
                        ) : (
                          /* External link arrow (↗) */
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
