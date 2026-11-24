import type { Job } from "../types";
import { Section } from "./Section";

export function Experience({ jobs }: { jobs?: Job[] }) {
  const safeJobs = Array.isArray(jobs) ? jobs : [];
  if (safeJobs.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      <ul className="timeline" role="list">
        {safeJobs.map((j, idx) => {
          const points = Array.isArray(j.points) ? j.points : [];
          return (
            <li key={(j.org || "") + idx} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-org">{j.org}</span>
                {j.period && <span className="timeline-period">{j.period}</span>}
              </div>
              <div className="timeline-role">
                {j.role}
                {j.location && <span className="timeline-location"> · {j.location}</span>}
              </div>
              {points.length > 0 && (
                <ul className="timeline-points">
                  {points.map((point, pIdx) => (
                    <li key={point.slice(0, 32) + pIdx}>{point}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
