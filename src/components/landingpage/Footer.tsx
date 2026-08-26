import { Compass } from "./Icons";

const groups = [
  {
    title: "Product",
    links: ["Features", "How it works", "Pricing", "For schools", "Mobile app"],
  },
  {
    title: "Resources",
    links: ["Career library", "Blog", "Guides", "Help center", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact", "Partners"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie policy", "Accessibility"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30">
                <Compass className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-700 tracking-tight text-white">
                Student<span className="text-brand-400">path</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              The career discovery platform that helps students explore, plan, and
              pursue a future they're excited about.
            </p>
            <div className="mt-6 flex gap-3">
              {["𝕏", "in", "IG", "▶"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label="social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-white/70 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-sm font-700 text-white">{g.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/50 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">© {new Date().getFullYear()} Studentpath, Inc. All rights reserved.</p>
          <p className="text-sm text-white/40">Made with care for curious minds 🚀</p>
        </div>
      </div>
    </footer>
  );
}
