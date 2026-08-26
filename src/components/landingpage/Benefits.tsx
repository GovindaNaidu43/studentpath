"use client";

import { motion } from "framer-motion";
import { Bolt, Shield, Globe, Sparkle } from "./Icons";

const benefits = [
  {
    icon: Bolt,
    title: "Clarity, Faster",
    desc: "Stop guessing about your future. Get a confident direction in minutes, not years of trial and error.",
    glow: "border-amber-200 hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(251,191,36,0.25)]",
    iconGrad: "from-amber-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Zero Pressure, All Support",
    desc: "Explore freely and change your mind anytime. There are no wrong turns — only exciting new paths to discover.",
    glow: "border-fuchsia-200 hover:border-fuchsia-400 hover:shadow-[0_10px_35px_rgba(217,70,239,0.25)]",
    iconGrad: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Globe,
    title: "Built For The Real World",
    desc: "Grounded in live labor-market data so you're exploring careers that are actively growing and in high demand.",
    glow: "border-cyan-200 hover:border-cyan-400 hover:shadow-[0_10px_35px_rgba(34,211,238,0.25)]",
    iconGrad: "from-cyan-400 to-blue-500",
  },
  {
    icon: Sparkle,
    title: "Made Just For You",
    desc: "Every recommendation adapts to your interests, grade level, and goals — no generic template advice ever.",
    glow: "border-purple-200 hover:border-purple-400 hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)]",
    iconGrad: "from-purple-500 to-indigo-500",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-fuchsia-50">
      {/* BACKGROUND ORBS */}
      <div className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-200/50 blur-[160px]" />
      <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-fuchsia-200/50 blur-[160px]" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-300 bg-pink-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-pink-800 shadow-xs">
              💎 Why Students Choose Us
            </span>

            <h2 className="mt-5 font-display text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Trade uncertainty for a plan you're{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                genuinely excited about.
              </span>
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-slate-600 font-medium">
              Choosing a direction shouldn't feel overwhelming. StudentPath turns career discovery from a stressful exam into exploring the most inspiring future version of yourself.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "⚡ No credit card required", color: "border-fuchsia-300 bg-fuchsia-100/80 text-fuchsia-800" },
                { label: "✨ Free forever plan", color: "border-cyan-300 bg-cyan-100/80 text-cyan-800" },
                { label: "🔒 Privacy first", color: "border-emerald-300 bg-emerald-100/80 text-emerald-800" },
                { label: "🎯 100% Student-centric", color: "border-amber-300 bg-amber-100/80 text-amber-800" },
              ].map((pill) => (
                <span
                  key={pill.label}
                  className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wider shadow-xs ${pill.color}`}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`group rounded-3xl border bg-white/90 p-7 shadow-md backdrop-blur-xl transition-all duration-300 ${b.glow}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${b.iconGrad} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900 group-hover:text-fuchsia-700 transition-colors">
                  {b.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 font-medium">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
