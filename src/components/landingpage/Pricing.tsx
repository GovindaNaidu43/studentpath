"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Check, Arrow } from "./Icons";

const plans = [
  {
    name: "Explorer",
    tagline: "Start discovering, free forever.",
    monthly: 0,
    annual: 0,
    features: [
      "Interest & strengths assessment",
      "Top 5 career matches",
      "Basic career profiles & salaries",
      "Community forum access",
    ],
    cta: "Get Started Free",
    highlight: false,
    badgeColor: "text-cyan-300 border-cyan-500/40 bg-cyan-500/10",
  },
  {
    name: "Pathfinder",
    tagline: "Everything to go from curious to committed.",
    monthly: 9,
    annual: 7,
    features: [
      "Unlimited career matches & insights",
      "Personalized step-by-step roadmaps",
      "24/7 AI career coach assistant",
      "Progress tracking & streak rewards",
      "Real-time market & demand data",
    ],
    cta: "Start 7-Day Free Trial ✦",
    highlight: true,
    badgeColor: "text-fuchsia-300 border-fuchsia-500/40 bg-fuchsia-500/10",
  },
  {
    name: "Scholar+",
    tagline: "For families & serious academic planners.",
    monthly: 19,
    annual: 15,
    features: [
      "Everything in Pathfinder",
      "1:1 verified mentor matching",
      "College & major planning guide",
      "Parent progress dashboard",
      "Priority AI coach responses",
    ],
    cta: "Choose Scholar+",
    highlight: false,
    badgeColor: "text-amber-300 border-amber-500/40 bg-amber-500/10",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0a051d] via-[#140833] to-[#080214] text-white">
      {/* VIBRANT BACKGROUND LIGHTS */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[180px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[180px]" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            💎 Simple & Transparent Pricing
          </span>

          <h2 className="mt-5 font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
            Invest in the clearest decision{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              you'll ever make.
            </span>
          </h2>

          <p className="mt-4 text-lg text-zinc-300 font-medium">
            Start 100% free. Upgrade whenever you're ready. Cancel anytime with 1-click.
          </p>

          {/* TOGGLE */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 p-1.5 backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300",
                !annual ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)]" : "text-zinc-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300",
                annual ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)]" : "text-zinc-400 hover:text-white"
              )}
            >
              Annual
              <span className="rounded-full bg-cyan-400/30 border border-cyan-300/60 px-2 py-0.5 text-[10px] font-black text-cyan-200 shadow-md">
                SAVE 22%
              </span>
            </button>
          </div>
        </motion.div>

        {/* PRICING CARDS */}
        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = annual ? p.annual : p.monthly;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, scale: p.highlight ? 1.05 : 1.03 }}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8 backdrop-blur-2xl transition-all duration-500",
                  p.highlight
                    ? "border-fuchsia-400/80 bg-gradient-to-b from-fuchsia-950/40 via-[#0e0326]/90 to-cyan-950/40 shadow-[0_0_60px_rgba(217,70,239,0.35)] ring-2 ring-fuchsia-400/50 lg:scale-[1.04]"
                    : "border-white/15 bg-white/[0.04] hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                )}
              >
                {p.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-5 py-1 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_25px_rgba(217,70,239,0.6)]">
                    ⚡ Most Popular Choice
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-black text-white">{p.name}</h3>
                  <span className={`rounded-full border px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${p.badgeColor}`}>
                    Tier {i + 1}
                  </span>
                </div>

                <p className="mt-2 text-sm text-zinc-300 min-h-[40px] font-medium">{p.tagline}</p>

                <div className="mt-6 flex items-end gap-1.5">
                  <span className="font-display text-5xl font-black text-white">${price}</span>
                  <span className="mb-1.5 text-sm font-semibold text-zinc-400">/month</span>
                </div>

                {annual && price > 0 && (
                  <p className="mt-1 text-xs font-semibold text-cyan-300">Billed annually (${price * 12}/yr)</p>
                )}
                {price === 0 && <p className="mt-1 text-xs font-semibold text-fuchsia-300">No credit card required</p>}

                <a
                  href="/explore"
                  className={cn(
                    "group mt-8 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold tracking-wide transition-all duration-300",
                    p.highlight
                      ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:shadow-[0_0_40px_rgba(217,70,239,0.7)] hover:scale-[1.02]"
                      : "border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02]"
                  )}
                >
                  {p.cta}
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <ul className="mt-8 space-y-4 border-t border-white/10 pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3.5 text-sm font-medium text-zinc-200">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300 ring-1 ring-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
