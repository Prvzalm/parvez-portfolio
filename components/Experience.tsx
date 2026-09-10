"use client";

import { Reveal } from "./motion/Primitives";
import type { Experience as ExperienceItem } from "../data/experience";

export default function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="experience-list">
      {items.map((item, index) => (
        <Reveal key={item.company}>
          <article className="experience-row">
            <span className="experience-year">{item.year}</span>
            <div className="experience-company"><h3>{item.company}</h3><p>{item.role}</p></div>
            <div className="experience-copy">
              <span>{item.date}</span>
              {item.responsibilities?.length ? <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul> : null}
              {item.technologies?.length ? <p className="experience-tech">{item.technologies.join(" · ")}</p> : null}
            </div>
            <span className="experience-count">0{index + 1}</span>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
