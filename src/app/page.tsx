import { redirect } from "next/navigation";
import { supabaseAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import ExploreFooter from "@/components/ExploreFooter";
import LandingHero from "@/sections/LandingHero";
import SmoothScroll from "@/components/SmoothScroll";
import SocialProof from "@/components/landingpage/SocialProof";
import Features from "@/components/landingpage/Features";
import Showcase from "@/components/landingpage/Showcase";
import Benefits from "@/components/landingpage/Benefits";
import Testimonials from "@/components/landingpage/Testimonials";
import Pricing from "@/components/landingpage/Pricing";
import CTA from "@/components/landingpage/CTA";

export default async function Home() {
  const {
    data: { session },
  } = await supabaseAuth.auth.getSession();

  if (session) {
    redirect("/explore");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* SMOOTH SCROLL */}
      <SmoothScroll />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO (UNTOUCHED DARK CINEMATIC HERO) */}
      <LandingHero />

      {/* SPACER FOR CLEAN BREATHING ROOM AFTER HERO */}
      <div className="h-16 sm:h-24 md:h-32 w-full bg-black pointer-events-none" />

      {/* VISION STATEMENT (DARK DEEP PURPLE WITH HIGH CONTRAST WHITE TEXT) */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-black via-[#0e0728] to-[#180a38] pt-20 pb-36 text-white">
        {/* VIBRANT ATMOSPHERIC GLOWS */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-fuchsia-600/30 blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full bg-cyan-500/25 blur-[180px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-600/25 blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/50 bg-fuchsia-500/20 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-fuchsia-300 shadow-[0_0_30px_rgba(217,70,239,0.4)] mb-8 backdrop-blur-md">
            ✨ Built For The Next Generation
          </span>

          {/* HIGH CONTRAST BRIGHT WHITE + GLOWING GRADIENT HEADLINE */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-white max-w-4xl mx-auto drop-shadow-md">
            Career discovery should feel like{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
              exploring the future.
            </span>
          </h2>

          {/* HIGH CONTRAST LIGHT ZINC TEXT */}
          <p className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl text-zinc-200 leading-relaxed font-medium drop-shadow-sm">
            StudentPath combines cinematic storytelling, AI-guided exploration, and futuristic design to help students discover careers beyond traditional expectations.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "🚀 500+ Career Paths", color: "border-fuchsia-400/50 bg-fuchsia-500/20 text-fuchsia-200 shadow-[0_0_20px_rgba(217,70,239,0.3)]" },
              { label: "🤖 24/7 AI Mentor", color: "border-cyan-400/50 bg-cyan-500/20 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)]" },
              { label: "⚡ Live Salary & Demand Insights", color: "border-amber-400/50 bg-amber-500/20 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.3)]" },
              { label: "🎯 Personalized Skill Roadmaps", color: "border-emerald-400/50 bg-emerald-500/20 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.3)]" },
            ].map((stat) => (
              <span
                key={stat.label}
                className={`rounded-full border px-6 py-3 text-xs font-black uppercase tracking-wider backdrop-blur-xl transition-all duration-300 hover:scale-105 ${stat.color}`}
              >
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: BRIGHT VIBRANT MARQUEE WITH SMOOTH GRADIENT TOP TRANSITION */}
      <SocialProof />

      {/* SECTION 2: CLEAN BRIGHT FEATURES GRID */}
      <Features />

      {/* SECTION 3: DEEP VIBRANT SHOWCASE (DARK CONTRAST SECTION) */}
      <Showcase />

      {/* SECTION 4: BRIGHT CYAN/PASTEL BENEFITS */}
      <Benefits />

      {/* SECTION 5: VIBRANT PASTEL TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 6: SLEEK NEON PRICING */}
      <Pricing />

      {/* SECTION 7: HIGH ENERGY GLOWING CTA */}
      <CTA />

      {/* FOOTER */}
      <ExploreFooter />
    </main>
  );
}