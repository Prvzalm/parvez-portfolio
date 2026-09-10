"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { buildSteps } from "../data/skills";
import { experience } from "../data/experience";
import { featuredProjects } from "../data/projects";
import { repositories } from "../data/github";
import { site } from "../data/site";
import ProjectList from "./ProjectList";
import Experience from "./Experience";
import Stack from "./Stack";
import Guestbook from "./Guestbook";
import { Reveal } from "./motion/Primitives";
import EasterEggs from "./EasterEggs";

let easterEggShown = false;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span>✳</span>{children}</p>;
}

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorMode, setCursorMode] = useState("");
  const [heroDate, setHeroDate] = useState("TODAY");
  const [currentYear, setCurrentYear] = useState("YEAR");
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroDate(new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date()).replaceAll("/", "."));
    setCurrentYear(String(new Date().getFullYear()));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduced || touch) return;
    let frame = 0;
    let x = -100;
    let y = -100;
    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      cursorRef.current?.classList.add("is-visible");
      if (!frame) {
        frame = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${x}px`;
            cursorRef.current.style.top = `${y}px`;
          }
          frame = 0;
        });
      }
    };
    const leave = () => cursorRef.current?.classList.remove("is-visible");
    const enter = () => cursorRef.current?.classList.add("is-visible");
    window.addEventListener("mousemove", move, { passive: true });
    document.body.addEventListener("mouseleave", leave);
    document.body.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
      document.body.removeEventListener("mouseenter", enter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // One intentionally quiet console easter egg; future hidden interactions can live here.
    if (typeof window !== "undefined" && !easterEggShown) {
      easterEggShown = true;
      console.info("You found the quiet corner. Keep building curious things.");
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const safeEmail = site.email !== "TODO" ? site.email : null;

  return (
    <main>
      <div ref={cursorRef} className={`custom-cursor ${cursorMode ? "is-active" : ""}`} aria-hidden="true"><span>{cursorMode || "·"}</span></div>
      <nav className="nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" onMouseEnter={() => setCursorMode("TOP")} onMouseLeave={() => setCursorMode("")}>PA<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a><a href="#experience">Experience</a><a href="#stack">Stack</a><a href="#contact">Contact</a>
        </div>
        <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />} <span>MENU</span>
        </button>
      </nav>
      {menuOpen ? <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
        {[["work", "Work"], ["experience", "Experience"], ["stack", "Stack"], ["contact", "Contact"]].map(([id, label]) => <a href={`#${id}`} onClick={closeMenu} key={id}>{label} <ArrowUpRight size={18} /></a>)}
      </div> : null}

      <section className="hero" id="top">
        <div className="hero-meta"><span>{heroDate}</span><span className="available"><i /> Available for opportunities</span></div>
        <div className="hero-title-wrap">
          <p className="eyebrow">FULL-STACK DEVELOPER <span>{site.location === "TODO" ? "LOCATION TODO" : site.location}</span></p>
          <h1>Building things<br /><em>people</em> actually use<span className="dot">.</span></h1>
          <div className="hero-bottom"><p>Parvez Alam builds products, systems<br />and experiences for the web.</p><a className="circle-link" href="#work" aria-label="Scroll to selected work"><ArrowDownRight size={25} /></a></div>
        </div>
        <div className="hero-scribble" aria-hidden="true"><span>curious by default</span><svg viewBox="0 0 160 50"><path d="M4 25c35-27 85-24 148 4M130 16l25 13-28 10" /></svg></div>
        <div className="scroll-note"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="intro section-shell">
        <SectionLabel>A LITTLE CONTEXT</SectionLabel>
        <div className="intro-grid"><h2>Not just code.<br /><span>A point of view.</span></h2><div><p className="large-copy">I like making the complicated feel obvious. Interfaces with a pulse, backends you can trust, and side projects that are probably a little too ambitious.</p><p className="muted-copy">Four-plus years moving between the browser and the server has taught me that the best products are equal parts engineering, empathy and a willingness to look at the problem one more time.</p></div></div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-head"><SectionLabel>FEATURED WORK</SectionLabel><span className="side-note">{featuredProjects.length} PROJECTS / VERIFIED LINKS</span></div>
        <ProjectList projects={featuredProjects} onCursorMode={setCursorMode} />
        <p className="under-note">More experiments are always in the works. <ExternalLink href={site.githubUrl}>See the lab <ArrowUpRight size={15} /></ExternalLink></p>
      </section>

      <section className="experience section-shell" id="experience">
        <div className="section-head"><SectionLabel>THE JOURNEY</SectionLabel><span className="side-note">LEARNING → BUILDING → SCALING</span></div>
        <Experience items={experience} />
      </section>

      <section className="stack section-shell" id="stack">
        <SectionLabel>THE TOOLBOX</SectionLabel>
        <div className="stack-intro"><h2>A practical<br /><span>stack.</span></h2><p>Tools are only interesting when they help an idea travel further. Here&apos;s what I reach for when it&apos;s time to make something real.</p></div>
        <Stack />
      </section>

      <section className="build section-shell"><div className="build-copy"><SectionLabel>HOW I BUILD</SectionLabel><h2>Understand.<br />Design.<br /><span>Build.</span></h2></div><div className="build-steps">{buildSteps.map((step, index) => <Reveal key={step}><div><b>0{index + 1}</b><span>{step}</span></div></Reveal>)}</div></section>

      <Guestbook />

      <section className="outside section-shell"><div><SectionLabel>OUTSIDE THE TERMINAL</SectionLabel><h2>The person<br />behind the <span>build.</span></h2></div><div className="outside-grid"><p>When I&apos;m not translating ideas into interfaces, I&apos;m usually finding a new opening in chess, playing a few piano keys, or learning a technology just to see what it can do.</p><div className="interest-list"><span>◌ Learning</span><span>⌘ Side projects</span><EasterEggs /></div></div></section>

      <section className="github section-shell" id="github">
        <div className="github-mark"><Github size={44} strokeWidth={1.5} /></div>
        <div><SectionLabel>OPEN SOURCE / ENGINEERING EVIDENCE</SectionLabel><h2>Code is better<br />when it&apos;s <span>shared.</span></h2><p>A curated set of repositories to inspect — no live API required for the first render.</p><div className="repository-list">{repositories.map((repository) => <ExternalLink key={repository.name} href={repository.url}><span>{repository.name}</span><small>{repository.language}</small><ArrowUpRight size={15} /></ExternalLink>)}</div><a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={17} /></a></div>
        <div className="github-stamp">PRVZALM<br /><span>BUILD IN PUBLIC</span></div>
      </section>

      <footer className="footer section-shell" id="contact">
        <div className="footer-top"><SectionLabel>STILL SCROLLING?</SectionLabel><h2>Let&apos;s build<br /><em>something.</em></h2>{safeEmail ? <a className="footer-email" href={`mailto:${safeEmail}`}>{safeEmail} <ArrowUpRight /></a> : <p className="footer-todo">Email link coming soon — contact details are TODO.</p>}</div>
        <div className="footer-bottom"><div className="footer-links"><ExternalLink href={site.githubUrl}><Github size={17} /> GitHub</ExternalLink><ExternalLink href={site.linkedInUrl}><Linkedin size={17} /> LinkedIn</ExternalLink>{site.resumeUrl !== "TODO" ? <a href={site.resumeUrl} target="_blank" rel="noreferrer">Resume</a> : null}</div><p>Built with curiosity, caffeine<br />and questionable amounts of debugging.</p><span>© {currentYear} PARVEZ ALAM</span></div>
      </footer>
    </main>
  );
}
