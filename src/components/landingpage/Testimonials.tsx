"use client";

import { motion } from "framer-motion";
import { Star } from "./Icons";

const testimonials = [
  {
    quote:
      "I went from panicking about college applications to actually excited about studying environmental engineering. The roadmap literally told me what to do next step by step.",
    name: "Maya R.",
    role: "12th Grade, California",
    grad: "from-fuchsia-500 to-pink-500",
    border: "border-fuchsia-200 hover:border-fuchsia-400 hover:shadow-[0_10px_35px_rgba(217,70,239,0.2)]",
  },
  {
    quote:
      "The career matches were scary accurate! I discovered UX design existed and now I'm already building my first portfolio in high school.",
    name: "Daniel K.",
    role: "11th Grade, Texas",
    grad: "from-cyan-500 to-blue-600",
    border: "border-cyan-200 hover:border-cyan-400 hover:shadow-[0_10px_35px_rgba(34,211,238,0.2)]",
  },
  {
    quote:
      "As a first-gen student I had no one to ask. StudentPath's AI coach answered every question at 2am without judging me. Total game changer.",
    name: "Priya S.",
    role: "10th Grade, New Jersey",
    grad: "from-pink-500 to-rose-600",
    border: "border-pink-200 hover:border-pink-400 hover:shadow-[0_10px_35px_rgba(244,114,182,0.2)]",
  },
  {
    quote:
      "My daughter finally has direction and confidence. Worth every penny — she talks about her ‘path’ at dinner every single night now.",
    name: "Elena M.",
    role: "Parent",
    grad: "from-amber-400 to-orange-500",
    border: "border-amber-200 hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(251,191,36,0.2)]",
  },
  {
    quote:
      "We rolled it out to our whole junior class. Engagement in career counseling tripled overnight!",
    name: "Mr. Owens",
    role: "High School Counselor",
    grad: "from-emerald-500 to-teal-600",
    border: "border-emerald-200 hover:border-emerald-400 hover:shadow-[0_10px_35px_rgba(52,211,153,0.2)]",
  },
  {
    quote:
      "I thought I wanted medicine. Turns out biomedical research fits me way better. So glad I explored before committing.",
    name: "Jordan T.",
    role: "1st Year University",
    grad: "from-violet-500 to-purple-600",
    border: "border-violet-200 hover:border-violet-400 hover:shadow-[0_10px_35px_rgba(167,139,250,0.2)]",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-50">
      {/* LIGHT GLOWS */}
      <div className="pointer-events-none absolute left-1/3 top-20 w-[600px] h-[600px] rounded-full bg-purple-200/50 blur-[180px]" />
      <div className="pointer-events-none absolute right-10 bottom-20 w-[500px] h-[500px] rounded-full bg-fuchsia-200/50 blur-[180px]" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-800 shadow-xs">
            ⭐ 4.9/5 Rating From 120k+ Students
          </span>

          <h2 className="mt-5 font-display text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
            Real stories from students{" "}
            <span className="bg-gradient-to-r from-amber-500 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
              finding their spark.
            </span>
          </h2>
        </motion.div>

        {/* TESTIMONIALS CARDS */}
        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`break-inside-avoid rounded-3xl border bg-white/90 p-7 shadow-md backdrop-blur-xl transition-all duration-300 ${t.border}`}
            >
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4" />
                ))}
              </div>

              <blockquote className="mt-4 text-base leading-relaxed text-slate-700 font-medium">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3.5">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.grad} text-base font-black text-white shadow-md`}>
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-base font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs font-semibold text-slate-500">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
