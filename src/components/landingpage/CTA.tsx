"use client";

import { motion } from "framer-motion";
import { Arrow, Sparkle } from "./Icons";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-slate-100">
      <div className="mx-auto max-w-5xl px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-fuchsia-600 via-purple-600 via-pink-600 to-cyan-500 px-8 py-20 text-center sm:px-20 sm:py-24 shadow-[0_20px_60px_rgba(217,70,239,0.35)]"
        >
          {/* HIGH ENERGY NEON ORBS */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-[90px] animate-pulse" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-[90px] animate-pulse" />

          {/* PATTERN OVERLAY */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-xs font-black uppercase tracking-widest text-white shadow-md backdrop-blur-md">
              <Sparkle className="h-4 w-4 text-cyan-200 animate-spin" />
              Your Future Starts With 1 Assessment
            </span>

            <h2 className="mx-auto mt-8 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Discover the career that's been waiting for you.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-purple-100 leading-relaxed font-medium">
              Join 120,000+ students who traded ‘I don't know’ for a plan they're genuinely excited about. Free to start — no credit card required.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/explore"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-9 py-4 text-base font-black text-purple-900 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-100 sm:w-auto"
              >
                Explore Careers Free Now
                <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/mentor"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:scale-105 sm:w-auto"
              >
                🤖 Chat With AI Mentor
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
