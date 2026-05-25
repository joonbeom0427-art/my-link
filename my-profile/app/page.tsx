"use client";

import { useState } from "react";

const links = [
  {
    title: "✨ Portfolio Website",
    description: "Check out my latest creative designs, live production applications, and interactive web layouts.",
    url: "https://github.com/joonbeom0427-art",
    colorClass: "neo-box-pink",
    icon: (
      <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: "💻 GitHub Repository",
    description: "Explore my open-source repositories, system architectures, core algorithms, and templates.",
    url: "https://github.com/joonbeom0427-art",
    colorClass: "neo-box-yellow",
    icon: (
      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    title: "✍️ Technical Dev Blog",
    description: "Read my insights, structured guides, and code walkthroughs on cutting-edge frontend engineering.",
    url: "https://github.com/joonbeom0427-art/my-link",
    colorClass: "neo-box-lime",
    icon: (
      <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2m2 2v10a2 2 0 01-2 2h-2" />
      </svg>
    )
  },
  {
    title: "✉️ Direct Contact",
    description: "Got an interesting project, job opportunity, or just want to say hi? Hit me up via email directly.",
    url: "mailto:joonbeom0427@gmail.com",
    colorClass: "neo-box-cyan",
    icon: (
      <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const skills = [
  { name: "Next.js 15/16", color: "bg-neo-yellow", rotate: "rotate-1" },
  { name: "React 19", color: "bg-neo-pink", rotate: "-rotate-2" },
  { name: "TypeScript", color: "bg-neo-cyan", rotate: "rotate-2" },
  { name: "Tailwind CSS v4", color: "bg-neo-lime", rotate: "-rotate-1" },
  { name: "SEO Optimization", color: "bg-neo-orange", rotate: "rotate-3" },
  { name: "UI/UX Architecture", color: "bg-neo-violet", rotate: "-rotate-2" },
  { name: "REST/GraphQL APIs", color: "bg-white", rotate: "rotate-1" },
  { name: "Responsive Layouts", color: "bg-neo-yellow", rotate: "-rotate-3" },
  { name: "Git Workflow", color: "bg-neo-pink", rotate: "rotate-2" }
];

const philosophies = [
  {
    title: "🚀 Brutal Speed",
    desc: "Zero bloated features, maximum efficiency. Using Next.js Server Components and strict caching for ultra-fast digital experiences.",
    color: "neo-box-cyan"
  },
  {
    title: "🎨 Heavy Geometry",
    desc: "Brutalist asymmetric layouts that break boring template grids. Leveraging thick lines, bold colors, and dynamic physical interactions.",
    color: "neo-box-pink"
  },
  {
    title: "🔍 Extreme SEO & A11y",
    desc: "Clean semantic HTML5 tags and descriptive JSON-LD metadata ensuring 100/100 search indexing and absolute screen-reader compatibility.",
    color: "neo-box-lime"
  }
];

const experiences = [
  {
    period: "2024 - PRESENT",
    role: "Lead Interactive Engineer",
    company: "my-link Project",
    desc: "Spearheaded advanced responsive architectures, custom canvas templates, and interactive component libraries for high-end web landing platforms."
  },
  {
    period: "2022 - 2024",
    role: "Creative Frontend Developer",
    company: "Freelance & Agency Studios",
    desc: "Designed and engineered gorgeous digital web systems, applying strict SEO structures, bespoke styling patterns, and optimized load paradigms."
  }
];

export default function Home() {
  const [messages, setMessages] = useState<{ name: string; content: string }[]>([
    { name: "Alice", content: "This Neobrutalism design looks absolutely staggering! Solid colors!" },
    { name: "Brad", content: "No avatar profile is such a bold, awesome choice. True Brutalist vibe." }
  ]);
  const [formName, setFormName] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMsg) return;
    setMessages((prev) => [...prev, { name: formName, content: formMsg }]);
    setFormName("");
    setFormMsg("");
    setSubmitStatus(true);
    setTimeout(() => setSubmitStatus(false), 3000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F4F3EE] bg-dots-pattern text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 w-full bg-[#F4F3EE] border-b-4 border-black px-4 sm:px-8 py-4 flex items-center justify-between">
        <a 
          href="#" 
          className="neo-btn bg-neo-yellow font-heading font-extrabold text-lg sm:text-xl md:text-2xl px-4 py-2 uppercase tracking-tighter"
        >
          ⚡ JOONBEOM.ART
        </a>
        <nav className="hidden md:flex items-center gap-6 font-heading font-bold text-sm uppercase">
          <a href="#about" className="hover:underline decoration-4 underline-offset-4 decoration-neo-pink transition-all">About</a>
          <a href="#skills" className="hover:underline decoration-4 underline-offset-4 decoration-neo-lime transition-all">Skills</a>
          <a href="#links" className="hover:underline decoration-4 underline-offset-4 decoration-neo-cyan transition-all">Works</a>
          <a href="#guestbook" className="hover:underline decoration-4 underline-offset-4 decoration-neo-yellow transition-all">Guestbook</a>
        </nav>
        <div>
          <a 
            href="mailto:joonbeom0427@gmail.com" 
            className="neo-btn bg-neo-lime font-heading font-bold text-xs sm:text-sm px-4 py-2 uppercase tracking-wide inline-block"
          >
            LET'S TALK!
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Hero Copy (Left side on Desktop, 7 cols) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 text-left">
          
          <div className="inline-flex flex-wrap gap-2">
            <span className="neo-badge bg-neo-pink font-heading font-bold text-xs sm:text-sm px-3.5 py-1.5 uppercase tracking-wide -rotate-1">
              🚀 Frontend Architect
            </span>
            <span className="neo-badge bg-neo-cyan font-heading font-bold text-xs sm:text-sm px-3.5 py-1.5 uppercase tracking-wide rotate-2">
              🎨 UI/UX Innovator
            </span>
            <span className="neo-badge bg-neo-yellow font-heading font-bold text-xs sm:text-sm px-3.5 py-1.5 uppercase tracking-wide -rotate-2">
              ⚡ Next.js Expert
            </span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter uppercase">
            HI, I'M <span className="bg-neo-yellow px-2 border-3 border-black inline-block transform rotate-1">JOONBEOM</span>.<br className="hidden sm:inline" />
            CRAFTING <span className="bg-neo-lime px-2 border-3 border-black inline-block transform -rotate-1">RAW</span> WEBSITES.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-bold max-w-3xl leading-relaxed text-[#3A3A3A]">
            Designing outside the grid. Coding with uncompromising precision. Creating full-scale Neobrutalist layouts that load instantly and leave a lasting impression.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#links" 
              className="neo-btn bg-neo-pink font-heading font-bold text-base sm:text-lg px-8 py-4 uppercase tracking-wider text-center flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              EXPLORE WORKS
              <svg className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="https://github.com/joonbeom0427-art" 
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-white font-heading font-bold text-base sm:text-lg px-8 py-4 uppercase tracking-wider text-center w-full sm:w-auto hover:bg-[#F2F0E5]"
            >
              VIEW ON GITHUB
            </a>
          </div>
        </div>

        {/* Hero Interactive Billboard (Right side on Desktop, 4 cols) */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="neo-box-yellow p-8 space-y-6 transform rotate-1">
            <div className="flex items-center justify-between border-b-3 border-black pb-4">
              <span className="font-heading font-black text-xl tracking-wide">STATUS BOARD</span>
              <span className="w-3.5 h-3.5 bg-neo-lime rounded-full border-2 border-black animate-pulse"></span>
            </div>
            <div className="space-y-4 font-bold text-sm sm:text-base">
              <div className="p-3 bg-white border-2 border-black flex justify-between">
                <span>📍 CURRENT LOCATION</span>
                <span className="font-extrabold uppercase">Seoul, Korea</span>
              </div>
              <div className="p-3 bg-white border-2 border-black flex justify-between">
                <span>💼 WORK INQUIRIES</span>
                <span className="font-extrabold uppercase text-neo-pink">AVAILABLE</span>
              </div>
              <div className="p-3 bg-white border-2 border-black flex justify-between">
                <span>🛠️ ACTIVE PROJECTS</span>
                <span className="font-extrabold uppercase">5 RUNNING</span>
              </div>
            </div>
            <div className="bg-[#1A1A1A] text-white p-4 border-2 border-black font-mono text-xs">
              <p className="text-[#A3E635]">$ npm init joonbeom-art</p>
              <p className="mt-1 text-zinc-400">&gt; Loading profile credentials...</p>
              <p className="text-neo-pink">&gt; Brutalism redesign applied successfully! [100% OK]</p>
            </div>
          </div>
        </div>

      </section>

      {/* Decorative Divider */}
      <div className="w-full bg-[#1A1A1A] text-white py-4 overflow-hidden border-y-4 border-black font-heading font-black uppercase text-sm sm:text-base tracking-widest pointer-events-none select-none">
        <div className="flex gap-8 animate-[infinite-scroll_12s_linear_infinite] whitespace-nowrap">
          <span>⚡ NEOBRUTALISM IS BACK</span>
          <span>✦</span>
          <span>⚡ NEXT.JS ENGINE RUNNING</span>
          <span>✦</span>
          <span>⚡ RESPONSIVE IN EVERY ASPECT</span>
          <span>✦</span>
          <span>⚡ AESTHETIC VISUAL EXCELLENCE</span>
          <span>✦</span>
          <span>⚡ NO IMAGE NEEDED</span>
          <span>✦</span>
          <span>⚡ NEOBRUTALISM IS BACK</span>
          <span>✦</span>
          <span>⚡ NEXT.JS ENGINE RUNNING</span>
        </div>
      </div>

      {/* About & Philosophy Grid */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-12">
        <div className="text-left space-y-4">
          <span className="neo-badge bg-neo-cyan font-heading font-bold text-xs uppercase px-3 py-1">CORE FOUNDATION</span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight">
            MY DESIGN & ENGINE PHILOSOPHY
          </h2>
        </div>

        {/* 3-Column Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophies.map((philo, idx) => (
            <div 
              key={idx} 
              className={`${philo.color} neo-box-hover p-8 flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-4">
                <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-wide">
                  {philo.title}
                </h3>
                <p className="font-bold text-sm sm:text-base leading-relaxed text-[#1A1A1A]">
                  {philo.desc}
                </p>
              </div>
              <div className="flex items-center justify-between border-t-2 border-black pt-4">
                <span className="font-mono text-xs font-bold text-zinc-700">METHODOLOGY // 0{idx + 1}</span>
                <span className="font-heading font-black text-lg">✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Left panel: Info */}
          <div className="lg:col-span-5 neo-box-yellow p-8 flex flex-col justify-between space-y-8 transform -rotate-1">
            <div className="space-y-4">
              <h3 className="font-heading font-black text-3xl uppercase tracking-tighter">
                BUILDING SOLID<br />PRODUCTS SINCE 2022
              </h3>
              <p className="font-bold text-sm sm:text-base leading-relaxed">
                By removing conventional layouts and boring styling grids, I focus heavily on performance-oriented code block constructs and visually high-impact layout designs.
              </p>
            </div>
            <div className="bg-white border-2 border-black p-4 font-heading font-bold text-sm space-y-2">
              <p className="text-neo-pink">✓ 100% Tailored Layout Customization</p>
              <p className="text-neo-violet">✓ High-precision React Rendering Engine</p>
              <p className="text-black">✓ Highly Semantic and SEO Audited Markups</p>
            </div>
          </div>

          {/* Right panel: Timeline List */}
          <div className="lg:col-span-7 space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="neo-box-white neo-box-hover p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-start">
                <div className="space-y-2">
                  <span className="neo-badge bg-[#F4F3EE] font-mono text-xs font-bold px-2.5 py-1">
                    {exp.period}
                  </span>
                  <h4 className="font-heading font-black text-xl sm:text-2xl uppercase mt-2">
                    {exp.role}
                  </h4>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                    {exp.company}
                  </p>
                  <p className="font-bold text-xs sm:text-sm text-zinc-700 leading-relaxed mt-2 max-w-xl">
                    {exp.desc}
                  </p>
                </div>
                <div className="self-end sm:self-center">
                  <span className="text-3xl sm:text-4xl text-neo-pink font-heading font-black">
                    /0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Skills Grid */}
      <section id="skills" className="w-full bg-[#1A1A1A] text-white py-20 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-left space-y-4">
            <span className="neo-badge bg-neo-yellow text-black font-heading font-bold text-xs uppercase px-3 py-1">
              ENGINE POWER
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              CORE TECHNOLOGICAL ENGINE
            </h2>
            <p className="text-zinc-400 font-semibold text-sm sm:text-base max-w-2xl leading-relaxed">
              Equipped with cutting-edge tools to construct fully fluid frameworks and extremely interactive client-side interfaces.
            </p>
          </div>

          {/* Sticker Board */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-start items-center pt-4">
            {skills.map((skill, idx) => (
              <div 
                key={idx} 
                className={`neo-badge ${skill.color} text-black font-heading font-black text-base sm:text-xl md:text-2xl px-5 sm:px-7 py-3 uppercase tracking-tight transform ${skill.rotate} hover:scale-105 hover:-rotate-1 active:scale-95 transition-all duration-150 cursor-default`}
              >
                {skill.name}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Main Links Dashboard Section */}
      <section id="links" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-12">
        <div className="text-left space-y-4">
          <span className="neo-badge bg-neo-pink font-heading font-bold text-xs uppercase px-3 py-1">DASHBOARD</span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight">
            CONNECT TO MY CHANNELS
          </h2>
          <p className="font-bold text-sm sm:text-base text-zinc-600 max-w-xl">
            Choose any portal to explore my interactive portfolios, access public code repositories, read technical articles, or write emails.
          </p>
        </div>

        {/* 2x2 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {links.map((link) => (
            <a 
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.colorClass} neo-box-hover p-6 sm:p-8 flex flex-col justify-between h-[220px] sm:h-[260px] cursor-pointer group`}
            >
              <div className="flex justify-between items-start">
                <div className="p-3.5 bg-white border-2 border-black">
                  {link.icon}
                </div>
                <div className="neo-badge-sm bg-white p-2 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-200">
                  <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-wide text-black">
                  {link.title}
                </h3>
                <p className="font-bold text-xs sm:text-sm text-zinc-800 leading-relaxed max-w-md">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Guestbook / Interactive Contact Form */}
      <section id="guestbook" className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <div className="neo-box-white p-6 sm:p-10 space-y-8 bg-white">
          <div className="border-b-3 border-black pb-6">
            <span className="neo-badge bg-neo-lime font-heading font-bold text-xs uppercase px-2.5 py-1 mb-3 inline-block">GUESTBOOK</span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight">
              LEAVE A PROTO-MESSAGE!
            </h2>
            <p className="font-bold text-xs sm:text-sm text-zinc-500 mt-2">
              Send me a message in real-time. Your post will instantly appear in the layout guestbook board below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-heading font-bold text-xs sm:text-sm uppercase block">Name / Handle</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Alice"
                  className="w-full font-bold text-sm p-3.5 bg-[#F4F3EE] border-3 border-black focus:outline-none focus:bg-neo-yellow focus:ring-0 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-heading font-bold text-xs sm:text-sm uppercase block">Short Message</label>
                <input 
                  type="text" 
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="e.g. Clean design! Cheers."
                  className="w-full font-bold text-sm p-3.5 bg-[#F4F3EE] border-3 border-black focus:outline-none focus:bg-neo-yellow focus:ring-0 transition-colors"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="neo-btn bg-neo-yellow w-full font-heading font-black text-sm sm:text-base py-4 uppercase tracking-wider text-center"
            >
              POST MESSAGE 🚀
            </button>
          </form>

          {/* Success Banner */}
          {submitStatus && (
            <div className="neo-badge bg-neo-lime text-black font-heading font-bold text-center py-3 text-sm uppercase animate-bounce">
              ✓ MESSAGE POSTED SUCCESSFULLY! CHECK THE LOG BELOW.
            </div>
          )}

          {/* Board Messages list */}
          <div className="space-y-4 border-t-3 border-black pt-6">
            <h3 className="font-heading font-black text-lg uppercase tracking-wide">LIVE MESSAGES ({messages.length})</h3>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className="p-4 bg-[#F4F3EE] border-2 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="font-bold text-xs sm:text-sm">
                    <span className="bg-neo-pink text-white px-2 py-0.5 border-1.5 border-black uppercase text-[10px] mr-2">
                      {msg.name}
                    </span>
                    <span className="text-[#1A1A1A]">{msg.content}</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">POSTED ✓</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#1A1A1A] text-white border-t-4 border-black py-12 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-2">
            <span className="font-heading font-black text-2xl tracking-tighter uppercase text-neo-yellow">
              JOONBEOM.ART
            </span>
            <p className="text-xs font-mono text-zinc-400">
              CRAFTED EXCLUSIVELY WITH PASSION & NEOBRUTALISM SYSTEM.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-heading font-bold uppercase tracking-wider">
            <a href="#about" className="hover:text-neo-pink transition-colors">About</a>
            <a href="#skills" className="hover:text-neo-lime transition-colors">Skills</a>
            <a href="#links" className="hover:text-neo-cyan transition-colors">Works</a>
            <a href="mailto:joonbeom0427@gmail.com" className="hover:text-neo-yellow transition-colors">Contact</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-zinc-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-500 gap-4">
          <p>© 2026 Joonbeom Art. All rights reserved.</p>
          <p className="hover:text-neo-lime transition-colors cursor-pointer uppercase font-semibold">
            POWERED BY MY-LINK ENGINE
          </p>
        </div>
      </footer>

    </div>
  );
}
