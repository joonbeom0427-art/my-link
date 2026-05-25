import Image from "next/image";

const links = [
  {
    title: "✨ Portfolio",
    description: "Check out my latest projects and creative designs.",
    url: "https://github.com/joonbeom0427-art",
    icon: (
      <svg className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: "💻 GitHub",
    description: "Explore my open-source repositories and contributions.",
    url: "https://github.com/joonbeom0427-art",
    icon: (
      <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    title: "✍️ Tech Blog",
    description: "Read my insights and tutorials on modern web development.",
    url: "https://github.com/joonbeom0427-art/my-link",
    icon: (
      <svg className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2m2 2v10a2 2 0 01-2 2h-2" />
      </svg>
    )
  },
  {
    title: "✉️ Email Me",
    description: "Feel free to reach out for projects or collaborations.",
    url: "mailto:joonbeom0427@gmail.com",
    icon: (
      <svg className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 overflow-hidden bg-slate-950 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background Glowing Circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Glassmorphic Profile Card */}
      <main className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/5 hover:border-slate-700/60">
        
        {/* Profile Info Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative group mb-5">
            {/* Pulsing Outer Gradient Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-spin" style={{ animationDuration: '8s' }}></div>
            
            {/* Profile Avatar Image */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-slate-900 bg-slate-800">
              <Image
                src="/profile_avatar.png"
                alt="Joonbeom Art Profile"
                fill
                sizes="112px"
                className="object-cover object-center transform transition duration-500 hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Name & Identity */}
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2 bg-gradient-to-r from-indigo-200 via-white to-purple-200 bg-clip-text text-transparent">
            Joonbeom Art
          </h1>
          <p className="text-sm font-medium text-indigo-400 tracking-wide uppercase mb-3">
            @joonbeom0427-art
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Creative Frontend Developer & Designer crafting beautiful, interactive digital experiences.
          </p>

          {/* Technical Tags */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["Next.js", "React 19", "TypeScript", "Tailwind v4"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-zinc-300 bg-slate-800/60 border border-slate-700/50 rounded-full px-3 py-1 tracking-wider shadow-inner"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 transition-all duration-300 hover:bg-slate-800/40 hover:border-slate-700 hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/5"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 group-hover:border-slate-700 transition-colors">
                {link.icon}
              </div>

              {/* Title & Description */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {link.title}
                  </h3>
                  <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-normal">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-[11px] text-zinc-600 tracking-wider">
          <p>© 2026 Joonbeom Art. All rights reserved.</p>
          <p className="mt-1 text-zinc-500 font-semibold hover:text-indigo-400 transition-colors cursor-default">
            Powered by my-link
          </p>
        </footer>

      </main>
    </div>
  );
}
