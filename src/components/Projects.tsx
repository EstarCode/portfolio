import type { Project } from "../types";
import { Section } from "./Section";

/** Maps icon/category to a compact inline SVG badge */
function ProjectIcon({ icon, category = "", name = "" }: { icon?: string; category?: string; name?: string }) {
  const t = icon || `${category} ${name}`.toLowerCase();

  if (t === "space" || t.includes("space") || t.includes("observatory")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
        <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
      </svg>
    );
  }
  if (t === "agriculture" || t.includes("farm") || t.includes("agri")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (t === "document" || t.includes("pdf") || t.includes("doc")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export function Projects({ projects }: { projects?: Project[] }) {
  const list = Array.isArray(projects) ? projects : [];
  if (list.length === 0) return null;

  const DOWNLOAD_LABEL_KEYWORDS = ["download", "apk", "install", "get app"];
  const DOWNLOAD_EXTENSIONS = /\.(apk|exe|dmg|zip|rar|msi|pkg|deb|rpm|pdf)$/i;
  const DOWNLOAD_HOSTS = ["drive.google.com", "mega.nz", "dropbox.com"];
  const DOWNLOAD_HOST_PATH = /github\.com\/[^/]+\/[^/]+\/releases/;

  function isDownload(href: string, label: string) {
    const clean = href.split("?")[0] ?? "";
    return Boolean(
      DOWNLOAD_LABEL_KEYWORDS.some((kw) => label.toLowerCase().includes(kw)) ||
      DOWNLOAD_EXTENSIONS.test(clean) ||
      DOWNLOAD_HOSTS.some((h) => href.includes(h)) ||
      DOWNLOAD_HOST_PATH.test(href)
    );
  }

  return (
    <Section id="projects" title="Projects">
      <div className="project-grid">
        {list.map((p, idx) => {
          const tags = Array.isArray(p.tags) ? p.tags : [];
          const links = Array.isArray(p.links) ? p.links : [];
          const highlights = Array.isArray(p.highlights) ? p.highlights : [];
          const firstLink = links[0];
          const firstIsDownload = firstLink ? isDownload(firstLink.href || "", firstLink.label) : false;

          return (
            <article key={String(p.name || idx)} className="project-card">
              {/* Card header: icon badge + name + category */}
              <div className="project-card-top">
                <div className="project-icon-badge">
                  <ProjectIcon icon={p.icon} category={p.category} name={p.name} />
                </div>
                <div className="project-title-block">
                  <h3 className="project-name">
                    {firstLink?.href && !firstIsDownload ? (
                      <a
                        href={firstLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-name-link"
                        aria-label={`Visit ${p.name} (opens in new tab)`}
                      >
                        {p.name}
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="project-title-arrow">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  {p.category && (
                    <span className="project-category">{p.category}</span>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="project-summary">{p.summary}</p>

              {/* Highlights */}
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

              {/* Tech stack tags */}
              {tags.length > 0 && (
                <div className="project-tags">
                  {tags.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
              )}

              {/* Action links */}
              {links.length > 0 && (
                <div className="project-links">
                  {links.map((link) => {
                    const dl = isDownload(link.href || "", link.label);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`project-link${dl ? " is-download" : ""}`}
                        aria-label={`${p.name} — ${link.label} (opens in new tab)`}
                      >
                        <span>{link.label}</span>
                        {dl ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="5 12 12 19 19 12" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        )}
                      </a>
                    );
                  })}
                  {/* Live / Download status indicator */}
                  <span
                    className={`project-status-pill${firstIsDownload ? " is-download" : ""}`}
                    aria-hidden="true"
                  >
                    <span className="status-dot" />
                    {firstIsDownload ? "Download" : "Live"}
                  </span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
