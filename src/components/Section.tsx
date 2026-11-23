import type { ReactNode } from "react";

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="section-title">
        {title}
      </h2>
      {children}
    </section>
  );
}
