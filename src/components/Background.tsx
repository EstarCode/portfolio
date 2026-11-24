import type { BackgroundInfo } from "../types";
import { Section } from "./Section";

interface BackgroundProps {
  info?: BackgroundInfo;
}

export function Background({ info }: BackgroundProps) {
  if (!info) return null;
  const paragraphs = Array.isArray(info.paragraphs) ? info.paragraphs : [];
  if (paragraphs.length === 0) return null;

  return (
    <Section id="about" title={info.headline || "About"}>
      <div className="background-prose-container">
        {paragraphs.map((para, idx) => (
          <p
            key={para.slice(0, 32)}
            className={idx === 0 ? "background-lead-prose" : "background-body-prose"}
          >
            {para}
          </p>
        ))}
      </div>
    </Section>
  );
}
