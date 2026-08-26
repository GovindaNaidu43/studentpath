"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Stanford", color: "from-red-600 to-rose-700" },
  { name: "MIT", color: "from-red-700 to-pink-700" },
  { name: "Coursera", color: "from-blue-600 to-cyan-600" },
  { name: "Khan Academy", color: "from-emerald-600 to-teal-700" },
  { name: "UNICEF", color: "from-cyan-600 to-sky-700" },
  { name: "Y Combinator", color: "from-amber-600 to-orange-700" },
  { name: "TeachFirst", color: "from-purple-600 to-fuchsia-700" },
  { name: "Common App", color: "from-indigo-600 to-purple-700" },
  { name: "Duolingo", color: "from-green-600 to-emerald-700" },
];

export default function SocialProof() {
  return (
    <section className="relative border-y border-purple-100 py-16 overflow-hidden bg-gradient-to-r from-slate-100 via-fuchsia-50 to-cyan-50">
      {/* VIBRANT LIGHT BLOBS */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-300/30 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300/30 blur-[100px] rounded-full" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-white/80 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-purple-700 shadow-md backdrop-blur-md">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-500 animate-ping" />
            Trusted By Learners & Leading Institutions
          </span>
        </motion.div>

        <div className="relative mt-6 overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-slate-100 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-cyan-50 to-transparent" />

          <div className="flex w-max animate-marquee items-center gap-10">
            {[...logos, ...logos, ...logos].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.12, y: -2 }}
                className="group relative cursor-pointer px-6 py-3.5 rounded-2xl border border-purple-200/80 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-200"
              >
                <span className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-display text-lg font-black`}>
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
