import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch { /* storage unavailable */ }
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }

    // Synchronize browser mobile status bar with active theme
    const themeColor = theme === "dark" ? "#09090b" : "#ffffff";
    const metaTags = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
    metaTags.forEach((meta) => meta.setAttribute("content", themeColor));
  }, [theme]);

  // Listen for OS color scheme changes and cross-tab storage changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const osHandler = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem("theme");
        if (!saved) {
          setTheme(e.matches ? "dark" : "light");
        }
      } catch {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    const storageHandler = (e: StorageEvent) => {
      if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setTheme(e.newValue);
      }
    };

    mq.addEventListener("change", osHandler);
    window.addEventListener("storage", storageHandler);

    return () => {
      mq.removeEventListener("change", osHandler);
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}
