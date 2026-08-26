"use client";

import { motion } from "framer-motion";
import { Check } from "./Icons";

const steps = [
  {
    step: "01",
    title: "Discover What Drives You",
    desc: "Answer thoughtful, adaptive questions. No pressure, no wrong answers — just deep insight into how you think and what energizes your mind.",
    points: ["Adaptive interest & aptitude assessment", "Personality & values profile", "Instant self-discovery report"],
    img: "/images/dashboard.png",
    alt: "Interest discovery assessment dashboard",
    accent: "from-fuchsia-500 to-pink-500",
    badge: "border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-300",
  },
  {
    step: "02",
    title: "See Your Career Universe",
    desc: "Explore a personalized map of careers ranked by fit. Dive into real salary outlooks, high growth fields, and day-in-the-life snapshots.",
    points: ["Ranked matches with fit scores", "Day-in-the-life & salary data", "Compare paths side by side"],
    img: "/images/roadmap.png",
    alt: "Personalized career roadmap visualization with branching paths",
    accent: "from-cyan-400 to-blue-600",
    badge: "border-cyan-400 bg-cyan-500/20 text-cyan-300",
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0a051d] via-[#12072e] to-[#0d0722] text-white">
      {/* VIBRANT NEON ORBS */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-purple-600/25 blur-[180px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 w-[600px] h-[600px] rounded-full bg-fuchsia-600/25 blur-[180px]" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/50 bg-fuchsia-500/10 px-5 py-2 text-xs font-black uppercase tracking-wider text-fuchsia-300 shadow-[0_0_25px_rgba(217,70,239,0.35)]">
            🚀 Simple 3-Step Journey
          </span>
          <h2 className="mt-5 font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
            Your path, in three{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              intuitive steps.
            </span>
          </h2>
        </motion.div>

        {/* STEPS LIST */}
        <div className="mt-20 space-y-24 sm:space-y-36">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <span className={`inline-block rounded-full border px-4 py-1 text-xs font-extrabold uppercase tracking-widest ${s.badge} mb-4 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                  Step {s.step}
                </span>

                <h3 className="font-display text-3xl font-black text-white sm:text-4xl leading-tight">
                  {s.title}
                </h3>

                <p className="mt-4 text-lg leading-relaxed text-zinc-300">
                  {s.desc}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3.5 text-zinc-200 text-base">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <Check className="h-4 w-4" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                {/* VIBRANT GLOW BEHIND IMAGE */}
                <div className={`absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r ${s.accent} opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90`} />
                <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/60 p-2.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className="w-full rounded-xl border border-white/10 transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* STEP 3 & STATS */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <span className="inline-block rounded-full border border-emerald-400 bg-emerald-500/20 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-300 mb-4 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                Step 03
              </span>

              <h3 className="font-display text-3xl font-black text-white sm:text-4xl leading-tight">
                Follow the Roadmap, One Win at a Time
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-zinc-300">
                Every career becomes an actionable plan. Complete milestones, unlock real skills, and watch your readiness score grow — with an AI coach in your corner.
              </p>

              <ul className="mt-7 space-y-3.5">
                {["Bite-sized weekly milestones", "Skill-building projects & resources", "Celebrate progress with streaks & badges"].map((p) => (
                  <li key={p} className="flex items-center gap-3.5 text-zinc-200 text-base">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                      <Check className="h-4 w-4" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* BRIGHT STAT GRID */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { k: "500+", v: "Career Paths Mapped", border: "border-fuchsia-500/40 hover:border-fuchsia-400 hover:shadow-[0_0_30px_rgba(217,70,239,0.4)]", grad: "from-fuchsia-400 to-pink-400" },
                { k: "8 Min", v: "To First Fit Report", border: "border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]", grad: "from-cyan-300 to-blue-400" },
                { k: "3x", v: "More Confident Decisions", border: "border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]", grad: "from-amber-300 to-orange-400" },
                { k: "92%", v: "Found A Loved Direction", border: "border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]", grad: "from-emerald-300 to-teal-400" },
              ].map((stat) => (
                <motion.div
                  key={stat.v}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`rounded-3xl border ${stat.border} bg-white/[0.05] p-7 text-center backdrop-blur-xl transition-all duration-300`}
                >
                  <div className={`font-display text-4xl font-black bg-gradient-to-r ${stat.grad} bg-clip-text text-transparent`}>
                    {stat.k}
                  </div>
                  <div className="mt-2 text-xs font-extrabold uppercase tracking-wider text-zinc-300">
                    {stat.v}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
