"use client";

import { motion } from "framer-motion";
import { Compass, Target, Route, Users, Chart, Chat } from "./Icons";

const features = [
  {
    icon: Compass,
    title: "Interest & Strengths Quiz",
    desc: "A 10-minute science-backed assessment maps your personality, values, and skills to real-world careers.",
    cardGlow: "from-fuchsia-100/80 via-purple-50/50 to-transparent",
    borderGlow: "border-fuchsia-200 hover:border-fuchsia-400 hover:shadow-[0_10px_35px_rgba(217,70,239,0.2)]",
    badgeColor: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-fuchsia-300",
  },
  {
    icon: Target,
    title: "Precision Career Matches",
    desc: "Get ranked matches with a fit score, salary outlook, and day-in-the-life snapshots for each path.",
    cardGlow: "from-cyan-100/80 via-blue-50/50 to-transparent",
    borderGlow: "border-cyan-200 hover:border-cyan-400 hover:shadow-[0_10px_35px_rgba(34,211,238,0.2)]",
    badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-300",
    iconBg: "bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-cyan-300",
  },
  {
    icon: Route,
    title: "Personalized Roadmaps",
    desc: "Turn any career into a step-by-step plan — courses, projects, and milestones tailored to your grade level.",
    cardGlow: "from-pink-100/80 via-rose-50/50 to-transparent",
    borderGlow: "border-pink-200 hover:border-pink-400 hover:shadow-[0_10px_35px_rgba(244,114,182,0.2)]",
    badgeColor: "bg-pink-100 text-pink-700 border-pink-300",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-pink-300",
  },
  {
    icon: Users,
    title: "Mentors & Communities",
    desc: "Connect with students and professionals already walking the path you're curious about.",
    cardGlow: "from-amber-100/80 via-orange-50/50 to-transparent",
    borderGlow: "border-amber-200 hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(251,191,36,0.2)]",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-300",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-amber-300",
  },
  {
    icon: Chart,
    title: "Progress Tracking",
    desc: "Watch your readiness score climb as you complete milestones, unlock skills, and hit new goals.",
    cardGlow: "from-emerald-100/80 via-teal-50/50 to-transparent",
    borderGlow: "border-emerald-200 hover:border-emerald-400 hover:shadow-[0_10px_35px_rgba(52,211,153,0.2)]",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-emerald-300",
  },
  {
    icon: Chat,
    title: "24/7 AI Career Coach",
    desc: "Ask anything — from ‘what can I do with biology?’ to essay help — and get instant, grounded guidance.",
    cardGlow: "from-violet-100/80 via-indigo-50/50 to-transparent",
    borderGlow: "border-violet-200 hover:border-violet-400 hover:shadow-[0_10px_35px_rgba(167,139,250,0.2)]",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-300",
    iconBg: "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-violet-300",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36 overflow-hidden bg-slate-50">
      {/* VIBRANT LIGHT BACKGROUND ORBS */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-fuchsia-200/50 blur-[160px]" />
      <div className="pointer-events-none absolute right-10 top-1/2 w-[500px] h-[500px] rounded-full bg-cyan-200/50 blur-[160px]" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-cyan-800 shadow-sm">
            ✨ Supercharged Tools
          </span>

          <h2 className="mt-5 font-display text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
            One platform to explore, plan, and{" "}
            <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              succeed.
            </span>
          </h2>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
            From ‘I have no idea’ to a clear, confident direction — StudentPath gives you the superpowers traditional guidance never could.
          </p>
        </motion.div>

        {/* FEATURE CARDS GRID */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-3xl border bg-white/90 p-8 shadow-md backdrop-blur-xl transition-all duration-500 ${f.borderGlow}`}
            >
              {/* BACKDROP GLOW ON HOVER */}
              <div className={`absolute inset-0 bg-gradient-to-b ${f.cardGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* ICON */}
              <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${f.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <f.icon className="h-7 w-7" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 mt-6">
                <span className={`inline-block rounded-full border px-3.5 py-0.5 text-[11px] font-black uppercase tracking-wider ${f.badgeColor} mb-3 shadow-xs`}>
                  Feature {i + 1}
                </span>

                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-fuchsia-700 transition-colors">
                  {f.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
