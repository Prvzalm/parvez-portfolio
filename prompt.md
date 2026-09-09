You are a senior creative developer, product designer, UX engineer and frontend architect.

Build a highly polished, memorable personal portfolio website for **Parvez Alam**, a Full-Stack MERN / JavaScript developer with 3+ years of professional development experience.

The goal is NOT to create another generic developer portfolio.

The website should feel like a **digital playground + personal identity + professional portfolio**: playful, modern, technically impressive, visually sophisticated, highly interactive, but still extremely usable and professional.

The visitor should finish the site thinking:

> “This developer clearly knows how to build things — and he has personality.”

---

# 1. TECH STACK

Use:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP only where Framer Motion is insufficient
- Lenis for smooth scrolling if useful
- Lucide React for icons
- next/image
- next/font

Use React Three Fiber / Three.js ONLY if a lightweight 3D element genuinely improves the experience.

Do NOT build an unnecessarily heavy WebGL portfolio.

The website must remain fast, responsive and accessible.

Use semantic HTML.

Use reusable components.

Keep content/data separate from presentation wherever practical.

Create a clean architecture that makes it easy to add projects, experience and skills later.

---

# 2. DESIGN DIRECTION

Do NOT create:

- generic dark developer portfolio
- generic black background + neon green text
- generic glassmorphism everywhere
- excessive gradients
- huge meaningless 3D objects
- excessive particle effects
- template-looking sections
- boring centered hero with “Hi, I'm Parvez”
- excessive rounded cards
- animation on every element

Instead create something that feels:

- playful
- editorial
- modern
- slightly experimental
- warm
- intelligent
- human
- technically sophisticated
- memorable

Take inspiration from the philosophy behind exceptional interactive portfolios such as:

- Bruno Simon — interaction as identity
- Rauno Freiberg — extreme attention to interaction details
- Josh Comeau — playful but thoughtful
- Lynn Fisher — personality and experimentation
- Cassie Evans — playful motion
- Unseen Studio — strong art direction and transitions
- Lusion / Active Theory — immersive interaction used purposefully

Do NOT copy their layouts, assets, branding or visual designs.

Extract principles, not designs.

The site should feel original.

---

# 3. VISUAL LANGUAGE

Use a sophisticated but playful color system.

Prefer an off-white / warm neutral base with carefully chosen accent colors rather than an entirely dark UI.

Possible direction:

- warm off-white / paper background
- near-black typography
- one strong electric accent
- one warm playful accent
- occasional gradient/highlight

Colors should feel intentional and editorial.

Typography should be a major visual element.

Use a modern font pairing such as:

- Geist / Geist Mono
  OR
- Inter / Geist Mono
  OR another excellent modern typeface if you find a better combination.

Use oversized typography selectively.

Mix:

- very large headlines
- small monospace metadata
- editorial labels
- technical details

Create visual hierarchy instead of relying on cards.

---

# 4. HERO — MAKE THIS MEMORABLE

The hero should immediately communicate:

**Parvez Alam**
**Full-Stack Developer**
**I build products, systems and experiences for the web.**

But don't simply display this as static text.

Create an interactive hero where the typography subtly reacts to:

- cursor movement
- hover
- scroll
- velocity

Possible visual idea:

A large statement such as:

“BUILDING THINGS
THAT PEOPLE
ACTUALLY USE.”

with smaller metadata around it.

Introduce Parvez naturally.

Example supporting copy:

“Full-stack developer crafting products with React, Next.js, Node.js, PostgreSQL and the occasional unnecessarily ambitious side project.”

Make this copy professional but human.

Add a small status indicator:

● Available for opportunities

Do not make the hero visually noisy.

---

# 5. INTERACTIVE CURSOR

Implement a custom cursor only on devices that support pointer interaction.

The cursor should have contextual behavior:

- normal → small dot
- hovering links → expand
- hovering project → show “VIEW”
- hovering GitHub → show GitHub indicator
- draggable elements → show “DRAG”
- interactive drawing area → change appropriately

Keep it subtle.

Disable/reduce it on touch devices.

Respect:

prefers-reduced-motion.

---

# 6. “YOU ARE HERE” / DIGITAL GUESTBOOK EASTER EGG

This is an important unique feature.

Create a section or hidden interactive experience called something like:

**“Leave a trace.”**

or

**“You were here.”**

The visitor should be able to:

1. Draw with their mouse/finger
2. Write a small signature
3. Optionally enter their name
4. Submit it

After submission, their contribution should become part of a visual “wall of visitors”.

Imagine a digital sketchbook / collective canvas.

Example:

┌──────────────────────────────┐
│ │
│ doodles │
│ signatures │
│ tiny messages │
│ │
│ “Parvez was here” │
│ │
└──────────────────────────────┘

Make this playful and visually beautiful.

Do NOT expose personal information.

Allow visitors to optionally remain anonymous.

For the first implementation, create the frontend interaction with a clean abstraction so persistence can later be connected to Supabase.

If backend persistence is implemented, use Supabase.

Add basic abuse protection / validation.

Potential microcopy:

“Leave something behind.”

“Draw something. Sign your name. Make your mark.”

After submission:

“Nice. Now you're part of the site.”

This should feel like an Easter egg rather than a boring guestbook.

---

# 7. “THE STACK” SECTION

Do not simply make a grid of technology logos.

Instead create an interactive visual representation of Parvez's toolbox.

Core technologies:

Frontend:

- React
- Next.js
- JavaScript
- TypeScript
- HTML
- CSS
- Tailwind CSS
- Redux Toolkit

Backend:

- Node.js
- Express
- REST APIs
- PostgreSQL
- MongoDB
- Prisma

Tools / Infrastructure:

- Git
- GitHub
- Docker
- PM2
- Vercel
- AWS/S3

Additional:

- Telegram bots
- Authentication / authorization
- RBAC
- PDF/DOCX processing
- AI-assisted document/data extraction
- Web scraping / automation

Show proficiency through interaction rather than fake percentage bars.

DO NOT display things like:

React 97%
Node 94%

Those numbers are meaningless.

---

# 8. EXPERIENCE

Create a visually strong timeline.

Professional experience:

### Zestify

Full Stack Developer
Apr 2022 – Nov 2023

### HailGro

Full Stack Developer
Nov 2023 – Nov 2025

### VLink

Backend Developer — Contract
Feb 2026 – Aug 2026

Emphasize actual engineering work rather than job-description fluff.

For VLink particularly highlight:

- backend architecture
- PDF/DOCX parsing
- document data-extraction pipelines
- AI-assisted extraction of required information
- Node.js/npm based scraping
- authentication
- authorization
- users / roles / permissions
- RBAC

Experience should feel like a journey:

“Learning → Building → Scaling → Exploring AI”

Do not fabricate achievements, metrics or responsibilities.

---

# 9. PROJECT SHOWCASE — THE MOST IMPORTANT SECTION

Projects should be the centerpiece of the website.

Do NOT make a boring grid of 12 identical cards.

Use large editorial project presentations.

Each project should have:

- project name
- short one-line description
- role
- technology
- problem solved
- important technical challenge
- GitHub link
- live/demo link if available
- visual preview
- year/status

Include projects such as:

### Realtime Whiteboard

Real-time collaborative whiteboard application.

GitHub:
https://github.com/Prvzalm/realtime-whiteboard

### LMS System

Learning management system.

GitHub:
https://github.com/Prvzalm/LMS_system

### Main Website

Personal/main web project.

GitHub:
https://github.com/Prvzalm/MainWebSite

### Algorooms Dashboard

Dashboard/application project.

GitHub:
https://github.com/Prvzalm/Algorooms-Dashboard

Also leave a clean data structure for adding:

- Copartner.in
- Telegram Gatekeeper Bot
- Strategy Builder
- Resume Analyzer
- AdminPoster
- Animachi
- other professional/client projects

Only show projects that have enough information/assets.

Do not invent screenshots.

---

# 10. PROJECT INTERACTION

Make project browsing itself memorable.

Possible interaction:

As the visitor scrolls:

PROJECT 01
REALTIME WHITEBOARD

The project preview expands/reveals.

On hover:

VIEW PROJECT →
GITHUB →

Use subtle image transformations.

Possible behavior:

- project image follows cursor slightly
- typography shifts
- project number animates
- metadata appears progressively

Transitions should be fast and elegant.

No excessive parallax.

---

# 11. GITHUB AS PROOF

Create a dedicated GitHub section.

Do not simply write:

“Check out my GitHub.”

Instead create something like:

**OPEN SOURCE / EXPERIMENTS / THINGS I BUILT**

Show selected repositories.

Link directly to GitHub.

Potential GitHub profile:

https://github.com/Prvzalm

Include:

- selected repositories
- language
- stars/forks if available
- recent activity if implemented efficiently

Avoid making a live GitHub API dependency necessary for the initial page render.

---

# 12. “HOW I BUILD” SECTION

Create a section showing Parvez's engineering philosophy.

Example:

01 — Understand
02 — Design
03 — Build
04 — Break
05 — Improve
06 — Ship

Use playful animation.

The point is to communicate that Parvez thinks beyond writing code.

---

# 13. SMALL HUMAN SECTION

Do not make the entire website about technology.

Add a subtle personal section.

Mention interests such as:

- chess
- piano
- learning new technologies
- experimenting with side projects

Make this feel like discovering the person behind the code.

Potential visual:

“Outside the terminal”

♟ Chess
🎹 Piano
🧠 Learning
⚙ Building

Make it playful, not childish.

---

# 14. EASTER EGGS

Add 2–4 subtle Easter eggs throughout the website.

Examples:

- pressing a keyboard shortcut reveals a secret message
- clicking the logo several times changes the visual mode
- a tiny hidden “developer console” message
- an unusual interaction on the footer
- Konami-code style secret
- one hidden project/experiment
- a tiny chess-related interaction

Do not make Easter eggs required for navigation.

The website must remain understandable without finding them.

---

# 15. FOOTER

Make the footer memorable.

Instead of:

© 2026 Parvez Alam

create something like:

“Still scrolling?”

“Looks like you made it to the bottom.”

Then:

LET'S BUILD SOMETHING.

Links:

GitHub
LinkedIn
Email
Resume

GitHub:
https://github.com/Prvzalm

LinkedIn:
https://www.linkedin.com/in/parvez013

Also include a small playful status:

“Built with curiosity, caffeine and questionable amounts of debugging.”

---

# 16. MOTION SYSTEM

Animation must have hierarchy.

Use:

### Level 1 — Micro interactions

Very fast:

- hover
- button
- cursor
- icon
- link

### Level 2 — Section transitions

Medium:

- fade
- slide
- reveal
- typography movement

### Level 3 — Hero / major moments

Occasional:

- dramatic typography
- scroll choreography
- image transformation

Never animate everything simultaneously.

Avoid:

- infinite floating elements everywhere
- excessive bouncing
- slow page transitions
- giant loading animations
- unnecessary 3D
- animations that delay content

The website should feel **alive, not busy**.

---

# 17. PAGE STRUCTURE

Suggested structure:

/
├── Hero
├── About / Introduction
├── Selected Work
├── Experience
├── Engineering / Stack
├── How I Build
├── GitHub / Open Source
├── Outside the Terminal
├── You Were Here / Guestbook
├── Contact
└── Footer

You may change the ordering if a better narrative emerges.

The site should feel like a story rather than a resume.

---

# 18. NAVIGATION

Use a minimal sticky navigation.

Possible:

PARVEZ ALAM

WORK
EXPERIENCE
STACK
ABOUT
CONTACT

Add a small animated menu indicator.

On mobile use a beautifully animated fullscreen menu.

Navigation should never obscure content.

---

# 19. RESPONSIVENESS

Desktop must feel spectacular.

But mobile must NOT feel like a reduced version.

Design intentionally for:

- desktop
- tablet
- mobile

Disable or simplify:

- custom cursor
- heavy WebGL
- expensive parallax
- complex hover-only interactions

on mobile/touch devices.

Touch interactions should remain intuitive.

---

# 20. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- ARIA labels where necessary
- sufficient color contrast
- reduced-motion support
- no interaction that depends exclusively on hover
- canvas/drawing feature should remain optional

---

# 21. PERFORMANCE

This is extremely important.

Target:

- fast initial load
- excellent Core Web Vitals
- minimal JavaScript where possible
- lazy-load heavy components
- lazy-load images
- dynamic import Three.js/WebGL components
- do not block initial rendering with animations
- avoid unnecessary client components
- use Server Components where appropriate
- use CSS transforms instead of layout-triggering animation
- avoid huge image files
- optimize all media

The portfolio itself should demonstrate engineering quality.

---

# 22. SEO

Implement:

- metadata
- Open Graph
- Twitter/X metadata
- canonical URL placeholder
- sitemap
- robots.txt
- structured data for Person / WebSite where appropriate
- meaningful page title
- meaningful descriptions

Use:

Title:
“Parvez Alam — Full-Stack Developer”

Description should communicate that Parvez builds modern web products and full-stack systems.

---

# 23. CONTENT PRINCIPLES

Do not invent:

- companies
- metrics
- clients
- awards
- testimonials
- revenue
- performance numbers
- fake achievements

If information is missing, create a clearly marked placeholder/data field instead of hallucinating.

The portfolio must be credible.

---

# 24. IMPORTANT DESIGN RULE

The site should answer these questions within the first 30–60 seconds:

1. Who is Parvez?
2. What does he build?
3. What technologies does he use?
4. What professional experience does he have?
5. What projects has he actually built?
6. Where can I inspect his code?
7. How can I contact him?

The creative interactions must NEVER make these answers harder to find.

---

# 25. CREATIVE DIRECTION

Think:

**“A developer's portfolio designed like a small interactive magazine.”**

Not:

**“A developer portfolio template with animations.”**

Use visual storytelling.

Let typography, whitespace, project previews and motion create the identity.

Make visitors curious enough to explore.

Every section should contain at least one small delightful detail.

---

# 26. IMPLEMENTATION REQUIREMENTS

Before writing code:

1. Establish a clear design system.
2. Create reusable animation primitives.
3. Create reusable project/experience data structures.
4. Create responsive layout primitives.
5. Create accessible interactive components.
6. Keep client-side JavaScript limited.
7. Separate experimental interactions from core content.

Use clean TypeScript.

Avoid giant components.

Prefer composition.

Use meaningful filenames.

Keep animation logic maintainable.

---

# 27. FINAL QUALITY BAR

Before considering the implementation complete, review the site as if you were:

1. A recruiter spending 20 seconds on it.
2. A senior engineer inspecting the work.
3. A creative director judging the visual quality.
4. A mobile user.
5. Someone with reduced motion enabled.
6. Someone on a slow connection.

The result should feel:

**Professional enough to get hired.**
**Creative enough to be remembered.**
**Technical enough to demonstrate skill.**
**Playful enough to feel human.**

Do not stop at a basic functional implementation.

Polish typography, spacing, transitions, hover states, responsive behavior and micro-interactions until the whole experience feels intentional.

Most importantly:

**DO NOT make the website look like an AI-generated portfolio template.**

It should feel like a real developer with a distinct personality built it himself.
