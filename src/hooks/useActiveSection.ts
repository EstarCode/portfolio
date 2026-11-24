import { useEffect, useRef, useState } from "react";

/** Returns the id of the section currently crossing the upper part of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  // Stabilise the ids reference — only reconnect observer when the list actually changes
  const idsRef = useRef(ids);
  const idKey = ids.join(",");
  if (idsRef.current.join(",") !== idKey) {
    idsRef.current = ids;
  }

  useEffect(() => {
    const list = idKey.split(",").filter(Boolean);
    const els = list
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => e !== null);

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // When scrolled to the very top (Hero region), clear active navigation state
        if (window.scrollY < 120) {
          setActive("");
          return;
        }
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -50% 0px" }
    );

    els.forEach((e) => io.observe(e));

    // Throttled scroll listener: clears active section at top and catches bottom-of-page
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY < 120) {
            setActive("");
          } else if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 60
          ) {
            const lastId = list[list.length - 1];
            if (lastId) setActive(lastId);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [idKey]);

  return active;
}
