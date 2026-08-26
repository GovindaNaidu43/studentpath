import { Sparkle, Arrow, Play, Star } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px] animate-float-slow" />
        <div className="absolute right-[8%] top-40 h-72 w-72 rounded-full bg-accent-500/20 blur-[100px] animate-float-slower" />
        <div className="absolute left-[6%] bottom-0 h-72 w-72 rounded-full bg-brand-400/15 blur-[100px] animate-float-slow" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-500 text-white/80 backdrop-blur">
            <Sparkle className="h-3.5 w-3.5 text-accent-400" />
            AI-guided career discovery for students
          </div>

          <h1 className="reveal mt-6 font-display text-4xl font-800 leading-[1.05] tracking-tight text-white sm:text-6xl" style={{ transitionDelay: "80ms" }}>
            Find the career that
            <br className="hidden sm:block" /> actually{" "}
            <span className="text-gradient">fits you.</span>
          </h1>

          <p className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60" style={{ transitionDelay: "160ms" }}>
            Studentpath turns your interests, strengths, and curiosity into a
            personalized map of careers to explore — with real roadmaps, mentors,
            and next steps built just for you.
          </p>

          <div className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ transitionDelay: "240ms" }}>
            <a
              href="#pricing"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3.5 text-base font-600 text-white shadow-xl shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-500/40 sm:w-auto"
            >
              Explore careers free
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#showcase"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-600 text-white backdrop-blur transition-all hover:bg-white/10 sm:w-auto"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <Play className="h-3 w-3" />
              </span>
              Watch how it works
            </a>
          </div>

          <div className="reveal mt-7 flex flex-col items-center justify-center gap-3 text-sm text-white/50 sm:flex-row sm:gap-6" style={{ transitionDelay: "320ms" }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["from-brand-400 to-brand-600", "from-accent-400 to-accent-500", "from-pink-400 to-rose-500", "from-amber-300 to-orange-500"].map((g, i) => (
                  <span key={i} className={`h-7 w-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#06060d]`} />
                ))}
              </div>
              <span>Loved by 120k+ students</span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 sm:block" />
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </div>
              <span>4.9/5 average rating</span>
            </div>
          </div>
        </div>

        {/* Product preview */}
        <div className="reveal mt-16 sm:mt-20" style={{ transitionDelay: "200ms" }}>
          <div className="group relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-brand-500/30 via-accent-500/20 to-brand-400/30 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/50 backdrop-blur">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/40">app.studentpath.io/discover</span>
              </div>
              <img
                src="/images/dashboard.png"
                alt="Studentpath career discovery dashboard showing career matches, interest analysis and skill roadmap"
                className="w-full rounded-xl border border-white/5"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
