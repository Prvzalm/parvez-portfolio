"use client";

import { useState } from "react";
import { skillGroups } from "../data/skills";
import { Reveal } from "./motion/Primitives";

export default function Stack() {
  const [activeStack, setActiveStack] = useState(0);
  const activeGroup = skillGroups[activeStack];
  return (
    <>
      <div className="stack-tabs" role="tablist" aria-label="Technology groups">
        {skillGroups.map((group, index) => (
          <button
            key={group.label}
            className={activeStack === index ? "active" : ""}
            role="tab"
            aria-selected={activeStack === index}
            aria-controls="stack-items"
            onClick={() => setActiveStack(index)}
          >
            <span>0{index + 1}</span>{group.label}
          </button>
        ))}
      </div>
      <div className="stack-cloud" id="stack-items" role="tabpanel" aria-live="polite">
        {activeGroup.items.map((item, index) => <Reveal key={item}><span className="skill-chip" style={{ transform: `rotate(${index % 2 ? 1 : -1}deg)` }}>{item}</span></Reveal>)}
      </div>
    </>
  );
}
