"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project } from "../data/projects";
import { Reveal } from "./motion/Primitives";

interface ProjectListProps {
  projects: Project[];
  onCursorMode: (mode: string) => void;
}

export default function ProjectList({ projects, onCursorMode }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <Reveal key={project.number}>
          <a
            className={`project project-${project.accent}`}
            href={project.githubUrl.startsWith("http") ? project.githubUrl : undefined}
            target={project.githubUrl.startsWith("http") ? "_blank" : undefined}
            rel={project.githubUrl.startsWith("http") ? "noreferrer" : undefined}
            aria-label={`${project.title} on GitHub`}
            onMouseEnter={() => onCursorMode("VIEW")}
            onMouseLeave={() => onCursorMode("")}
          >
            <div className="project-index">{project.number}</div>
            <div className="project-info">
              <span className="project-label">{project.category} / {project.year}</span>
              <h3>{project.title}</h3>
              <p>{project.shortDescription}</p>
              <span className="project-stack">
                {project.technologies.join(" · ")}
              </span>
              <span className="project-status">{project.status === "TODO" ? "DETAILS TODO" : project.status}</span>
            </div>
            <div className="project-art" aria-hidden="true">
              {project.image ? (
                <Image src={project.image} alt={project.imageAlt ?? `${project.title} preview`} fill sizes="230px" style={{ objectFit: "cover" }} />
              ) : (
                <>
                  <div className="art-window"><span /><span /><span /><div className="art-lines" /></div>
                  <div className="art-caption">ABSTRACT PLACEHOLDER</div>
                </>
              )}
            </div>
            <ArrowUpRight className="project-arrow" size={27} aria-hidden="true" />
          </a>
        </Reveal>
      ))}
    </div>
  );
}
