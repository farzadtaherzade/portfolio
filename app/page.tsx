"use client";

import { useEffect, useMemo, useState } from "react";
import PixelCharacter from "@/components/PixelCharacter";
import PixelWorkshop from "@/components/PixelWorkshop";
import SoundToggle from "@/components/SoundToggle";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import CoffeePlatformer from "@/components/CoffeePlatformer";
import { projects, skills, githubUrl, timeline } from "@/lib/data";

const content = {
  en: {
    navAbout: "About",
    navProjects: "Projects",
    navSkills: "Skills",
    navActivity: "Activity",
    navContact: "Contact",
    heroTagline: "Turning caffeine and curiosity into fun little programs.",
    heroSubtitle: "Backend developer · Creative coder · Game dev enthusiast",
    heroCta: "Scroll to explore",
    aboutTitle: "ABOUT",
    aboutSubtitle: "Who is Farzad?",
    aboutP1: "I'm Farzad — a developer who loves building fun stuff and playing with new tech. My comfort zone is Node.js and TypeScript, I'm learning Rust and C++ because trying new things never gets old, and my real north star is making games.",
    aboutP2: "I started coding after watching Mr. Robot with a friend who said let's learn it. Before that, I was building parkour maps and puzzles in Fortnite's creative mode — that desire to build playful things carried straight into programming.",
    aboutP3: "Right now I use AI as a daily tool and build simple, fun, useful things for myself. Every project is curiosity-driven — if it's not fun to make, I'm probably not making it.",
    projectsTitle: "PROJECTS",
    projectsSubtitle: "Things I've built",
    skillsTitle: "TECH STACK",
    skillsSubtitle: "Tools I work with and learn",
    skillsWorking: "Working with",
    skillsLearning: "Currently learning",
    activityTitle: "GITHUB ACTIVITY",
    activitySubtitle: "Coding since 2020",
    contactTitle: "CONTACT",
    contactSubtitle: "Let's build something fun",
    contactText: "The best way to reach me is GitHub. Say hi, let's build something fun!",
    gameHint: "Psst... press the coffee cup to play a game",
    gameButton: "Play Coffee Quest",
    backToTop: "Back to top",
  },
  fa: {
    navAbout: "درباره",
    navProjects: "پروژه‌ها",
    navSkills: "مهارت‌ها",
    navActivity: "فعالیت",
    navContact: "تماس",
    heroTagline: "قهوه و کنجکاوی رو تبدیل به برنامه‌های کوچیک و جالب می‌کنم.",
    heroSubtitle: "توسعه‌دهنده بک‌اند · کدر خلاق · علاقه‌مند به توسعه بازی",
    heroCta: "برای کاوش اسکرول کنید",
    aboutTitle: "درباره",
    aboutSubtitle: "فرزاد کیه؟",
    aboutP1: "من فرزاد هستم — یه توسعه‌دهنده که عاشق ساختن چیزای جالب و بازی با تکنولوژی‌های جدیده. راحت‌ترین زبون‌ام Node.js و TypeScript هست، دارم Rust و C++ یاد می‌گیرم چون امتحان چیزای جدید همیشه جذابه، و ستاره قطبی من ساختن بازی‌هاست.",
    aboutP2: "بعد از دیدن سریال Mr. Robot با یه دوست که گفت بیا یاد بگیریم شروع کردم. قبلش تو حالت خلاق فورنایت مپ‌های پارکور و معمایی می‌ساختم — اون تمایل به ساختن چیزای بازی‌گوشه مستقیم وارد برنامه‌نویسی شد.",
    aboutP3: "الان از AI به عنوان یه ابزار روزمره استفاده می‌کنم و چیزای ساده، جالب و مفید برای خودم می‌سازم. هر پروژه‌ای با کنجکاوی شروع می‌شه — اگه ساختنش جالب نباشه، احتمالا نمی‌سازمش.",
    projectsTitle: "پروژه‌ها",
    projectsSubtitle: "چیزایی که ساختم",
    skillsTitle: "تکنولوژی‌ها",
    skillsSubtitle: "ابزارهایی که باهاشون کار می‌کنم و یاد می‌گیرم",
    skillsWorking: "در حال کار با",
    skillsLearning: "در حال یادگیری",
    activityTitle: "فعالیت گیت‌هاب",
    activitySubtitle: "کد زدن از ۲۰۲۰",
    contactTitle: "تماس",
    contactSubtitle: "بیاید چیزای جالب بسازیم",
    contactText: "بهترین راه برای ارتباط گیت‌هابه. سلام کنید، بیاید چیزای جالب بسازیم!",
    gameHint: "راستی... روی فنجون قهوه کلیک کن تا بازی کنی",
    gameButton: "بازی Coffee Quest",
    backToTop: "بازگشت به بالا",
  },
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const [showGame, setShowGame] = useState(false);
  const t = content[lang];
  const isRtl = lang === "fa";

  // Memoized so the Navbar's scroll-spy effect is not torn down/recreated
  // on every render of Home.
  const navItems = useMemo(
    () => [
      { id: "about", label: t.navAbout },
      { id: "projects", label: t.navProjects },
      { id: "skills", label: t.navSkills },
      { id: "activity", label: t.navActivity },
      { id: "contact", label: t.navContact },
    ],
    [t]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowGame(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="relative min-h-screen pb-24 md:pb-0">
      <div className="crt-overlay flicker" />
      <div className="scan-line" />

      <SoundToggle />
      <div className="fixed top-4 left-4 z-50">
        <LanguageToggle lang={lang} setLang={setLang} />
      </div>

      {/* Scroll progress + navigation (built by the two nav/scroll workstreams) */}
      <ScrollProgress />
      <Navbar items={navItems} lang={lang} />
      <BackToTop label={t.backToTop} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24">
        <div
          className="absolute w-[min(90vw,400px)] aspect-square"
          style={{
            background: "radial-gradient(circle, rgba(232,168,56,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex w-full flex-col items-center text-center max-w-4xl">
          <div className="mb-6 float">
            <PixelCharacter size={140} />
          </div>
          <h1
            className="font-pixel text-xl sm:text-2xl md:text-4xl text-text-bright mb-4 break-anywhere"
            style={{ textShadow: "0 0 20px rgba(232,168,56,0.3)" }}
          >
            {isRtl ? "فرزاد طاهرزاده" : "Farzad Taherzadeh"}
          </h1>
          <p className="font-mono text-lg sm:text-xl md:text-2xl text-accent-amber mb-2 max-w-2xl">
            {t.heroTagline}
          </p>
          <p className="font-mono text-base sm:text-lg text-text-secondary mb-8 max-w-xl">
            {t.heroSubtitle}
          </p>
          <button
            onClick={() => setShowGame(true)}
            className="group relative flex cursor-pointer flex-col items-center gap-2"
            aria-label="Play Coffee Quest game"
            title={t.gameHint}
          >
            {/* SVG is display:block via Tailwind preflight, so text-align will
                not center it — the button itself is the centering context. */}
            <svg
              width="32"
              height="36"
              viewBox="0 0 32 36"
              shapeRendering="crispEdges"
              className="float"
              aria-hidden="true"
            >
              <rect x="10" y="0" width="2" height="6" fill="#c4c0d8" opacity="0.3" />
              <rect x="18" y="2" width="2" height="6" fill="#c4c0d8" opacity="0.2" />
              <rect x="6" y="8" width="20" height="24" fill="#e06c75" />
              <rect x="8" y="10" width="16" height="3" fill="#1e1a35" />
              <rect x="10" y="11" width="12" height="1" fill="#b07d28" />
              <rect x="26" y="14" width="2" height="2" fill="#e06c75" />
              <rect x="28" y="16" width="2" height="6" fill="#e06c75" />
              <rect x="26" y="22" width="2" height="2" fill="#e06c75" />
            </svg>
            <span className="font-mono text-sm text-text-tertiary transition-colors duration-200 group-hover:text-accent-amber">
              {t.gameButton}
            </span>
          </button>
          <div className="mt-12 flex flex-col items-center gap-2">
            <span className="font-mono text-sm text-text-tertiary">{t.heroCta}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges" className="blink">
              <rect x="4" y="2" width="4" height="2" fill="#5e5b7a" />
              <rect x="3" y="4" width="6" height="2" fill="#5e5b7a" />
              <rect x="2" y="6" width="8" height="2" fill="#5e5b7a" />
              <rect x="1" y="8" width="10" height="2" fill="#5e5b7a" />
            </svg>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="section-title mb-2">{t.aboutTitle}</h2>
            <p className="section-subtitle">{t.aboutSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="font-mono text-lg text-text-primary leading-relaxed">{t.aboutP1}</p>
              <p className="font-mono text-lg text-text-secondary leading-relaxed">{t.aboutP2}</p>
              <p className="font-mono text-lg text-text-secondary leading-relaxed">{t.aboutP3}</p>
            </div>
            <div className="flex justify-center">
              <PixelWorkshop />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="section-title mb-2">{t.projectsTitle}</h2>
            <p className="section-subtitle">{t.projectsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-card p-6 block group cursor-pointer"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ background: "var(--bg-surface-light)", border: "1px solid var(--border-dim)" }}
                  >
                    <ProjectIcon name={project.icon} />
                  </div>
                  <h3 className="font-pixel text-xs text-text-bright group-hover:text-accent-amber transition-colors duration-200">
                    {project.name}
                  </h3>
                </div>
                <p className="font-mono text-base text-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="pixel-tag">{tech}</span>
                  ))}
                </div>
                <div className="mt-4 font-mono text-sm text-text-tertiary break-anywhere group-hover:text-accent-cyan transition-colors duration-200">
                  {"->"} github.com/farzadtaherzade/{project.name}
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-4 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="section-title mb-2">{t.skillsTitle}</h2>
            <p className="section-subtitle">{t.skillsSubtitle}</p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-xl text-accent-cyan mb-4">{"-> "}{t.skillsWorking}</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {skills.workingWith.map((skill) => (
                  <div key={skill.name} className="pixel-card p-4 flex flex-col items-center gap-2 cursor-pointer">
                    <TechIcon name={skill.icon} />
                    <span className="font-mono text-sm text-text-secondary">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-mono text-xl text-accent-magenta mb-4">{"-> "}{t.skillsLearning}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.learning.map((skill) => (
                  <div key={skill.name} className="pixel-card p-4 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200">
                    <TechIcon name={skill.icon} />
                    <span className="font-mono text-sm text-text-secondary">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Activity */}
      <section id="activity" className="py-20 px-4 max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="section-title mb-2">{t.activityTitle}</h2>
            <p className="section-subtitle">{t.activitySubtitle}</p>
          </div>
          <div className="relative">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5" style={{ background: "var(--border-mid)" }} />
            {timeline.map((item, i) => (
              <div key={item.year} className={`relative mb-6 flex items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-3 md:left-1/2 w-3 h-3 -translate-x-1/2" style={{ background: "var(--accent-amber)", boxShadow: "0 0 8px rgba(232,168,56,0.3)" }} />
                <div className={`ml-8 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <span className="font-pixel text-xs text-accent-amber">{item.year}</span>
                  <p className="font-mono text-base text-text-secondary mt-1">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 pixel-card px-6 py-3 hover:border-accent-amber/40 transition-colors duration-200 cursor-pointer">
              <GitHubIcon />
              <span className="font-mono text-base sm:text-lg text-text-bright break-anywhere">github.com/farzadtaherzade</span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="section-title mb-2">{t.contactTitle}</h2>
          <p className="section-subtitle mb-8">{t.contactSubtitle}</p>
          <p className="font-mono text-lg text-text-secondary mb-8">{t.contactText}</p>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 pixel-card px-8 py-4 glow-pulse cursor-pointer hover:border-accent-amber/50 transition-colors duration-200">
            <GitHubIcon />
            <span className="font-pixel text-sm text-accent-amber">GITHUB</span>
          </a>
        </ScrollReveal>
      </section>

      <footer className="py-8 px-4 text-center border-t" style={{ borderColor: "var(--border-dim)" }}>
        <p className="font-mono text-sm text-text-tertiary">{"< "}Built with curiosity, caffeine, and Next.js{" >"}</p>
        <p className="font-mono text-xs text-text-tertiary mt-2">(c) 2026 Farzad Taherzadeh</p>
      </footer>

      {showGame && <CoffeePlatformer onClose={() => setShowGame(false)} />}
    </div>
  );
}

function ProjectIcon({ name }: { name: string }) {
  const color = "#4ec9b0";
  const size = 20;
  switch (name) {
    case "tv":
      return <svg width={size} height={size} viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="2" y="4" width="16" height="12" fill="none" stroke={color} strokeWidth="1.5" /><rect x="4" y="6" width="12" height="8" fill={color} opacity="0.2" /><rect x="7" y="18" width="6" height="2" fill={color} opacity="0.5" /></svg>;
    case "gun":
      return <svg width={size} height={size} viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="2" y="8" width="14" height="3" fill={color} opacity="0.7" /><rect x="6" y="11" width="3" height="5" fill={color} opacity="0.5" /><rect x="16" y="8" width="2" height="2" fill="#e8a838" /></svg>;
    case "flask":
      return <svg width={size} height={size} viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="8" y="2" width="4" height="2" fill={color} opacity="0.6" /><path d="M7 4 L13 4 L12 12 L8 12 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" /><rect x="8" y="12" width="4" height="4" fill={color} opacity="0.2" stroke={color} strokeWidth="1" /></svg>;
    case "box":
      return <svg width={size} height={size} viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="3" y="6" width="14" height="11" fill="none" stroke={color} strokeWidth="1.5" /><rect x="3" y="3" width="14" height="3" fill={color} opacity="0.3" /><rect x="9" y="6" width="2" height="11" fill={color} opacity="0.2" /></svg>;
    case "book":
      return <svg width={size} height={size} viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="4" y="3" width="12" height="14" fill="none" stroke={color} strokeWidth="1.5" /><rect x="6" y="5" width="8" height="2" fill={color} opacity="0.3" /><rect x="6" y="9" width="8" height="1" fill={color} opacity="0.2" /><rect x="6" y="12" width="6" height="1" fill={color} opacity="0.2" /></svg>;
    default:
      return null;
  }
}

function TechIcon({ name }: { name: string }) {
  const size = 28;
  switch (name) {
    case "node":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="4" y="6" width="8" height="2" fill="#4ec9b0" /><rect x="16" y="6" width="8" height="2" fill="#4ec9b0" /><rect x="4" y="8" width="2" height="12" fill="#4ec9b0" /><rect x="14" y="8" width="2" height="2" fill="#4ec9b0" /><rect x="10" y="12" width="4" height="2" fill="#4ec9b0" /><rect x="14" y="14" width="2" height="6" fill="#4ec9b0" /><rect x="6" y="20" width="6" height="2" fill="#4ec9b0" /><rect x="16" y="20" width="6" height="2" fill="#4ec9b0" /></svg>;
    case "ts":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="2" y="2" width="24" height="24" fill="#2a2444" stroke="#3178c6" strokeWidth="1" /><rect x="6" y="10" width="8" height="2" fill="#3178c6" /><rect x="6" y="14" width="16" height="2" fill="#3178c6" /><rect x="6" y="18" width="6" height="2" fill="#3178c6" /><rect x="18" y="18" width="4" height="2" fill="#3178c6" /></svg>;
    case "csharp":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="4" y="8" width="4" height="12" fill="#9b4f96" opacity="0.7" /><rect x="10" y="8" width="4" height="12" fill="#9b4f96" opacity="0.7" /><rect x="6" y="6" width="10" height="2" fill="#9b4f96" opacity="0.5" /><rect x="6" y="20" width="10" height="2" fill="#9b4f96" opacity="0.5" /><rect x="18" y="8" width="6" height="2" fill="#e8a838" /><rect x="20" y="6" width="2" height="2" fill="#e8a838" /><rect x="20" y="10" width="2" height="2" fill="#e8a838" /></svg>;
    case "js":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="2" y="2" width="24" height="24" fill="#2a2444" stroke="#f7df1e" strokeWidth="1" /><rect x="8" y="10" width="4" height="10" fill="#f7df1e" opacity="0.8" /><rect x="8" y="20" width="2" height="2" fill="#f7df1e" /><rect x="14" y="10" width="4" height="2" fill="#f7df1e" opacity="0.8" /><rect x="14" y="14" width="4" height="6" fill="#f7df1e" opacity="0.6" /><rect x="16" y="20" width="4" height="2" fill="#f7df1e" opacity="0.8" /></svg>;
    case "nest":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="6" y="4" width="4" height="4" fill="#e0234e" opacity="0.7" /><rect x="10" y="8" width="4" height="4" fill="#e0234e" opacity="0.7" /><rect x="14" y="12" width="4" height="4" fill="#e0234e" opacity="0.7" /><rect x="10" y="16" width="4" height="4" fill="#e0234e" opacity="0.5" /><rect x="6" y="20" width="4" height="4" fill="#e0234e" opacity="0.5" /></svg>;
    case "three":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="12" y="4" width="4" height="4" fill="#ffffff" opacity="0.8" /><rect x="6" y="14" width="4" height="4" fill="#ffffff" opacity="0.6" /><rect x="18" y="14" width="4" height="4" fill="#ffffff" opacity="0.6" /><rect x="12" y="20" width="4" height="4" fill="#ffffff" opacity="0.4" /><rect x="12" y="14" width="4" height="4" fill="#ffffff" opacity="0.3" /></svg>;
    case "cpp":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="2" y="2" width="24" height="24" fill="#2a2444" stroke="#00599c" strokeWidth="1" /><rect x="8" y="12" width="4" height="2" fill="#00599c" /><rect x="6" y="14" width="2" height="2" fill="#00599c" /><rect x="8" y="16" width="4" height="2" fill="#00599c" /><rect x="16" y="12" width="2" height="2" fill="#00599c" /><rect x="16" y="16" width="2" height="2" fill="#00599c" /><rect x="18" y="10" width="2" height="8" fill="#00599c" opacity="0.6" /><rect x="20" y="12" width="2" height="2" fill="#00599c" /><rect x="20" y="16" width="2" height="2" fill="#00599c" /></svg>;
    case "rust":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="10" y="4" width="8" height="2" fill="#dea584" /><rect x="6" y="8" width="2" height="2" fill="#dea584" /><rect x="10" y="6" width="8" height="2" fill="#dea584" /><rect x="20" y="8" width="2" height="2" fill="#dea584" /><rect x="4" y="12" width="2" height="4" fill="#dea584" /><rect x="22" y="12" width="2" height="4" fill="#dea584" /><rect x="6" y="18" width="2" height="2" fill="#dea584" /><rect x="10" y="22" width="8" height="2" fill="#dea584" /><rect x="20" y="18" width="2" height="2" fill="#dea584" /><rect x="12" y="10" width="4" height="8" fill="#dea584" opacity="0.4" /></svg>;
    case "godot":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="6" y="8" width="16" height="12" fill="#478cbf" opacity="0.7" /><rect x="10" y="12" width="2" height="2" fill="#fff" /><rect x="16" y="12" width="2" height="2" fill="#fff" /><rect x="12" y="16" width="4" height="2" fill="#fff" opacity="0.5" /></svg>;
    case "unity":
      return <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges"><rect x="12" y="4" width="4" height="4" fill="#fff" opacity="0.7" /><rect x="6" y="12" width="4" height="4" fill="#fff" opacity="0.7" /><rect x="18" y="12" width="4" height="4" fill="#fff" opacity="0.7" /><rect x="12" y="20" width="4" height="4" fill="#fff" opacity="0.7" /><rect x="12" y="12" width="4" height="4" fill="#fff" opacity="0.4" /></svg>;
    default:
      return null;
  }
}

function GitHubIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      <rect x="8" y="4" width="8" height="2" fill="#c4c0d8" />
      <rect x="6" y="6" width="12" height="2" fill="#c4c0d8" />
      <rect x="4" y="8" width="16" height="2" fill="#c4c0d8" />
      <rect x="4" y="10" width="4" height="4" fill="#c4c0d8" />
      <rect x="16" y="10" width="4" height="4" fill="#c4c0d8" />
      <rect x="8" y="10" width="8" height="6" fill="#c4c0d8" />
      <rect x="6" y="14" width="2" height="4" fill="#c4c0d8" />
      <rect x="16" y="14" width="2" height="4" fill="#c4c0d8" />
      <rect x="4" y="16" width="2" height="2" fill="#c4c0d8" />
      <rect x="18" y="16" width="2" height="2" fill="#c4c0d8" />
      <rect x="4" y="18" width="2" height="2" fill="#c4c0d8" opacity="0.6" />
      <rect x="18" y="18" width="2" height="2" fill="#c4c0d8" opacity="0.6" />
    </svg>
  );
}
