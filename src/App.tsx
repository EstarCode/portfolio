import { useEffect } from "react";
import { profile } from "./data/profile";
import { useTheme } from "./hooks/useTheme";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Background } from "./components/Background";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Stack } from "./components/Stack";
import { EducationSection } from "./components/Education";
import { Contact } from "./components/Contact";

import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/background.css";
import "./styles/projects.css";
import "./styles/experience.css";
import "./styles/education.css";
import "./styles/stack.css";
import "./styles/contact.css";

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  const { theme, toggle } = useTheme();

  useEffect(() => {
    let pendingG = false;
    let gTimeout: number | undefined;

    const onKey = (e: KeyboardEvent) => {
      // Ignore single-key shortcuts when typing into inputs
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isInput) return;

      // Do not intercept native browser shortcuts (e.g. Ctrl+T for new tab, Ctrl+G for find next)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggle();
        return;
      }

      // Vim shortcut: Shift+G jumps straight to the end/contact section
      if (e.key === "G" && !pendingG) {
        e.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      // Vim sequence: lowercase g followed by target key
      if (e.key === "g" && !pendingG) {
        pendingG = true;
        if (gTimeout) clearTimeout(gTimeout);
        gTimeout = window.setTimeout(() => {
          pendingG = false;
        }, 1200);
        return;
      }

      if (pendingG) {
        const k = e.key.toLowerCase();
        const targets: Record<string, string> = {
          g: "top",
          h: "top",
          a: "about",
          p: "projects",
          e: "experience",
          s: "stack",
          d: "education",
          c: "contact",
        };
        if (targets[k]) {
          e.preventDefault();
          const targetEl = document.getElementById(targets[k]);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = targets[k];
          }
        }
        pendingG = false;
        if (gTimeout) clearTimeout(gTimeout);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gTimeout) clearTimeout(gTimeout);
    };
  }, [toggle]);

  return (
    <ErrorBoundary fallbackTitle="Something went wrong">
      <Header
        name={profile.name}
        theme={theme}
        toggleTheme={toggle}
      />

      <main id="main" tabIndex={-1}>
        <ErrorBoundary fallbackTitle="Hero error">
          <Hero p={profile} />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="About error">
          <Background info={profile.background} />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Projects error">
          <Projects projects={profile.projects} />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Experience error">
          <Experience jobs={profile.experience} />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Stack error">
          <Stack p={profile} />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Education error">
          <EducationSection
            education={profile.education}
            certificates={profile.certificates}
          />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Contact error">
          <Contact p={profile} />
        </ErrorBoundary>
      </main>

      <footer className="site-footer">
        <span>© {CURRENT_YEAR} {profile.name} · {profile.title || "Full-Stack Developer"}</span>
        <a href="#top" className="footer-top-btn" aria-label="Scroll to top">
          <span>Top</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </a>
      </footer>
    </ErrorBoundary>
  );
}
