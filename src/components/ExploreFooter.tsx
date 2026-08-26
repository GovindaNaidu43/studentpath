import link from "next/link";
export default function ExploreFooter() {
  return (
    <footer className="relative mt-28 border-t border-white/10 bg-gradient-to-b from-[#06060d] via-[#09031a] to-black text-white">
      {/* VIBRANT TOP GLOW LINE */}
      <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_20px_rgba(217,70,239,0.6)]" />

      <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">
              StudentPath<span className="text-fuchsia-400">✦</span>
            </h2>

            <p className="text-zinc-300 max-w-md text-base leading-relaxed mb-6">
              Discover careers, exams, colleges, and skills with AI-powered guidance built for students to explore their highest potential.
            </p>

            <div className="flex items-center gap-3">
              {[
                { label: "50K+ Active Students", color: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300" },
                { label: "500+ Career Maps", color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300" },
              ].map((b) => (
                <span key={b.label} className={`rounded-full border px-3.5 py-1 text-xs font-bold ${b.color}`}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-lg text-white mb-5 uppercase tracking-wider text-fuchsia-300 text-xs">
              Company
            </h3>
            <ul className="space-y-3.5">
              {["About Us", "Careers", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 hover:text-fuchsia-300 transition-all duration-300 text-sm font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="font-bold text-lg text-white mb-5 uppercase tracking-wider text-cyan-300 text-xs">
              Explore
            </h3>
            <ul className="space-y-3.5">
              {["Careers", "Exams", "Colleges", "Skills"].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase()}`} className="text-zinc-400 hover:text-cyan-300 transition-all duration-300 text-sm font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

         {/* COMMUNITY */}
<div>
  <h3 className="font-bold text-white mb-5 uppercase tracking-wider text-pink-300 text-xs">
    Connect
  </h3>

  <ul className="space-y-3.5">
    {[
      {
        name: "Instagram",
        href: "https://www.instagram.com/studentpath.in?igsi=bDZyN2xkdnRsN3dl",
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/company/YOUR_COMPANY",
      },
      {
        name: "Discord",
        href: "https://discord.gg/YOUR_INVITE",
      },
      {
        name: "YouTube",
        href: "https://youtube.com/@YOUR_CHANNEL",
      },
    ].map((item) => (
      <li key={item.name}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-pink-300 transition-all duration-300 text-sm font-medium"
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
</div>
</div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-400">
          <p>© 2026 StudentPath Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <span className="text-fuchsia-400">♥</span> for the next generation of students.
          </p>
        </div>
      </div>
    </footer>
  );
}