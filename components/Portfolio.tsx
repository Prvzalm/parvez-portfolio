"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Palette,
  Send,
  X
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Realtime Whiteboard",
    label: "COLLABORATION / 2024",
    description: "A shared canvas for teams to think out loud, together.",
    detail: "Real-time collaborative whiteboard application.",
    stack: "React · Node.js · WebSockets",
    accent: "blue",
    href: "https://github.com/Prvzalm/realtime-whiteboard"
  },
  {
    number: "02",
    title: "LMS System",
    label: "EDUCATION / 2023",
    description: "The operational layer behind a better way to learn.",
    detail: "A learning management system for structured online learning.",
    stack: "React · Express · MongoDB",
    accent: "orange",
    href: "https://github.com/Prvzalm/LMS_system"
  },
  {
    number: "03",
    title: "Main Website",
    label: "IDENTITY / 2024",
    description: "A personal web project built as a living design lab.",
    detail: "Personal / main web project.",
    stack: "Next.js · TypeScript · CSS",
    accent: "lime",
    href: "https://github.com/Prvzalm/MainWebSite"
  },
  {
    number: "04",
    title: "Algorooms Dashboard",
    label: "PRODUCT / 2023",
    description: "A clear command centre for a complicated product.",
    detail: "Dashboard and application project.",
    stack: "React · Redux Toolkit · REST",
    accent: "purple",
    href: "https://github.com/Prvzalm/Algorooms-Dashboard"
  }
];

const experience = [
  {
    year: "2026",
    company: "VLink",
    role: "Backend Developer · Contract",
    date: "FEB 2026 — AUG 2026",
    copy: "Backend architecture, document processing and AI-assisted extraction pipelines. Built around Node.js, npm-based scraping, authentication and role-aware systems."
  },
  {
    year: "2023",
    company: "HailGro",
    role: "Full Stack Developer",
    date: "NOV 2023 — NOV 2025",
    copy: "Building product features end-to-end: from thoughtful interfaces to dependable APIs, data models and the systems that connect them."
  },
  {
    year: "2022",
    company: "Zestify",
    role: "Full Stack Developer",
    date: "APR 2022 — NOV 2023",
    copy: "The beginning of the professional chapter: learning quickly, shipping real work and growing a practical instinct for the details users feel."
  }
];

const stackGroups = [
  ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Redux Toolkit"],
  ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB", "Prisma"],
  ["Git", "GitHub", "Docker", "PM2", "Vercel", "AWS / S3"],
  ["RBAC", "PDF / DOCX", "AI extraction", "Web scraping", "Telegram bots"]
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span>✳</span>{children}</p>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false, mode: "" });
  const [activeStack, setActiveStack] = useState(0);
  const [signature, setSignature] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const move = (event: MouseEvent) =>
      setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY, visible: true }));
    const leave = () => setCursor((current) => ({ ...current, visible: false }));
    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, []);

  const setCursorMode = (mode: string) => setCursor((current) => ({ ...current, mode }));
  const canvasPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
  };
  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = canvasPoint(event);
    const canvas = canvasRef.current;
    if (!point || !canvas) return;
    drawing.current = true;
    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext("2d");
    if (context) {
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.strokeStyle = "#171717";
      context.lineWidth = 3;
      context.lineCap = "round";
    }
  };
  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const point = canvasPoint(event);
    const context = canvasRef.current?.getContext("2d");
    if (point && context) {
      context.lineTo(point.x, point.y);
      context.stroke();
    }
  };
  const stopDrawing = () => { drawing.current = false; };
  const submitTrace = (event: FormEvent) => {
    event.preventDefault();
    if (signature.trim()) setSubmitted(true);
  };

  return (
    <main>
      <div className={`custom-cursor ${cursor.visible ? "is-visible" : ""} ${cursor.mode ? "is-active" : ""}`} style={{ left: cursor.x, top: cursor.y }}>
        <span>{cursor.mode || "·"}</span>
      </div>
      <nav className="nav">
        <a className="wordmark" href="#top" onMouseEnter={() => setCursorMode("TOP")} onMouseLeave={() => setCursorMode("")}>PA<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a><a href="#experience">Experience</a><a href="#stack">Stack</a><a href="#contact">Contact</a>
        </div>
        <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />} <span>MENU</span>
        </button>
      </nav>
      {menuOpen && <div className="mobile-menu"><a href="#work" onClick={() => setMenuOpen(false)}>Work <ArrowUpRight size={18} /></a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience <ArrowUpRight size={18} /></a><a href="#stack" onClick={() => setMenuOpen(false)}>Stack <ArrowUpRight size={18} /></a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact <ArrowUpRight size={18} /></a></div>}

      <section className="hero" id="top">
        <div className="hero-meta"><span>09.09.2026</span><span className="available"><i /> Available for opportunities</span></div>
        <div className="hero-title-wrap">
          <p className="eyebrow">FULL-STACK DEVELOPER <span>BASED IN INDIA</span></p>
          <h1>Building things<br /><em>people</em> actually use<span className="dot">.</span></h1>
          <div className="hero-bottom"><p>Parvez Alam builds products, systems<br />and experiences for the web.</p><a className="circle-link" href="#work" aria-label="Scroll to selected work"><ArrowDownRight size={25} /></a></div>
        </div>
        <div className="hero-scribble" aria-hidden="true"><span>curious by default</span><svg viewBox="0 0 160 50"><path d="M4 25c35-27 85-24 148 4M130 16l25 13-28 10" /></svg></div>
        <div className="scroll-note"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="intro section-shell">
        <SectionLabel>A LITTLE CONTEXT</SectionLabel>
        <div className="intro-grid"><h2>Not just code.<br /><span>A point of view.</span></h2><div><p className="large-copy">I like making the complicated feel obvious. Interfaces with a pulse, backends you can trust, and side projects that are probably a little too ambitious.</p><p className="muted-copy">Three-plus years moving between the browser and the server has taught me that the best products are equal parts engineering, empathy and a willingness to look at the problem one more time.</p></div></div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-head"><SectionLabel>SELECTED WORK</SectionLabel><span className="side-note">04 PROJECTS / 2022—NOW</span></div>
        <div className="project-list">
          {projects.map((project) => <a className={`project project-${project.accent}`} href={project.href} target="_blank" rel="noreferrer" key={project.number} onMouseEnter={() => setCursorMode("VIEW")} onMouseLeave={() => setCursorMode("")}>
            <div className="project-index">{project.number}</div><div className="project-info"><span className="project-label">{project.label}</span><h3>{project.title}</h3><p>{project.description}</p><span className="project-stack">{project.stack}</span></div><div className="project-art" aria-hidden="true"><div className="art-window"><span /><span /><span /><div className="art-lines" /></div><div className="art-caption">{project.number} / 04</div></div><ArrowUpRight className="project-arrow" size={27} />
          </a>)}
        </div>
        <p className="under-note">More experiments are always in the works. <a href="https://github.com/Prvzalm" target="_blank" rel="noreferrer">See the lab <ArrowUpRight size={15} /></a></p>
      </section>

      <section className="experience section-shell" id="experience">
        <div className="section-head"><SectionLabel>THE JOURNEY</SectionLabel><span className="side-note">LEARNING → BUILDING → SCALING</span></div>
        <div className="experience-list">{experience.map((item, index) => <article className="experience-row" key={item.company}><span className="experience-year">{item.year}</span><div className="experience-company"><h3>{item.company}</h3><p>{item.role}</p></div><div className="experience-copy"><span>{item.date}</span><p>{item.copy}</p></div><span className="experience-count">0{index + 1}</span></article>)}</div>
      </section>

      <section className="stack section-shell" id="stack">
        <SectionLabel>THE TOOLBOX</SectionLabel>
        <div className="stack-intro"><h2>A practical<br /><span>stack.</span></h2><p>Tools are only interesting when they help an idea travel further. Here&apos;s what I reach for when it&apos;s time to make something real.</p></div>
        <div className="stack-tabs">{["Frontend", "Backend", "Infrastructure", "Special interests"].map((label, index) => <button className={activeStack === index ? "active" : ""} onClick={() => setActiveStack(index)} key={label}><span>0{index + 1}</span>{label}</button>)}</div>
        <div className="stack-cloud">{stackGroups[activeStack].map((item, index) => <span key={item} style={{ transform: `rotate(${index % 2 ? 1 : -1}deg)` }}>{item}</span>)}</div>
      </section>

      <section className="build section-shell"><div className="build-copy"><SectionLabel>HOW I BUILD</SectionLabel><h2>Understand.<br />Design.<br /><span>Build.</span></h2></div><div className="build-steps">{["Understand", "Design", "Build", "Break", "Improve", "Ship"].map((step, index) => <div key={step}><b>0{index + 1}</b><span>{step}</span></div>)}</div></section>

      <section className="trace section-shell">
        <div className="trace-copy"><SectionLabel>YOU WERE HERE</SectionLabel><h2>Leave<br /><em>a trace.</em></h2><p>Draw a tiny something. Sign your name. Become part of the site.</p><span className="trace-hint"><Palette size={16} /> no pressure, just vibes</span></div>
        <div className="trace-board"><div className="board-top"><span>THE WALL OF VISITORS</span><span>✳ 001 — 999</span></div><canvas ref={canvasRef} width={600} height={260} onPointerDown={startDrawing} onPointerMove={draw} onPointerUp={stopDrawing} onPointerLeave={stopDrawing} aria-label="Optional drawing canvas" /><form onSubmit={submitTrace}><input value={signature} onChange={(event) => setSignature(event.target.value)} placeholder="Your name, alias or a tiny thought..." maxLength={40} aria-label="Your name or alias" /><button type="submit">{submitted ? <><Check size={17} /> Added to the wall</> : <><Send size={16} /> Leave it here</>}</button></form></div>
      </section>

      <section className="outside section-shell"><div><SectionLabel>OUTSIDE THE TERMINAL</SectionLabel><h2>The person<br />behind the <span>build.</span></h2></div><div className="outside-grid"><p>When I&apos;m not translating ideas into interfaces, I&apos;m usually finding a new opening in chess, playing a few piano keys, or learning a technology just to see what it can do.</p><div className="interest-list"><span>♟ Chess</span><span>♫ Piano</span><span>◌ Learning</span><span>⌘ Side projects</span></div></div></section>

      <section className="github section-shell"><div className="github-mark"><Github size={44} strokeWidth={1.5} /></div><div><SectionLabel>OPEN SOURCE / EXPERIMENTS</SectionLabel><h2>Code is better<br />when it&apos;s <span>shared.</span></h2><p>A living collection of experiments, useful things and the occasional rabbit hole.</p><a className="text-link" href="https://github.com/Prvzalm" target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={17} /></a></div><div className="github-stamp">PRVZALM<br /><span>BUILD IN PUBLIC</span></div></section>

      <footer className="footer section-shell" id="contact"><div className="footer-top"><SectionLabel>STILL SCROLLING?</SectionLabel><h2>Let&apos;s build<br /><em>something.</em></h2><a className="footer-email" href="mailto:hello@parvezalam.dev">hello@parvezalam.dev <ArrowUpRight /></a></div><div className="footer-bottom"><div className="footer-links"><a href="https://github.com/Prvzalm" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a href="https://www.linkedin.com/in/parvez013" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href="mailto:hello@parvezalam.dev"><Mail size={17} /> Email</a></div><p>Built with curiosity, caffeine<br />and questionable amounts of debugging.</p><span>© 2026 PARVEZ ALAM</span></div></footer>
    </main>
  );
}
