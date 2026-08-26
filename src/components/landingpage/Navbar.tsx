"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Compass, Arrow } from "./Icons";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#showcase" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6",
          scrolled ? "glass-strong shadow-lg shadow-black/30" : "bg-transparent"
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Compass className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-700 tracking-tight text-white">
            Student<span className="text-brand-400">path</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm font-500 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#"
            className="rounded-lg px-3.5 py-2 text-sm font-600 text-white/80 transition-colors hover:text-white"
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-600 text-ink-900 shadow-lg shadow-black/20 transition-all hover:shadow-brand-500/30"
          >
            Start free
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
        >
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-6 bg-current transition-all", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-current transition-all", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-current transition-all", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden px-2 transition-all duration-500 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-strong rounded-2xl p-3 shadow-xl shadow-black/40">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-500 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-3 text-center text-sm font-600 text-white"
          >
            Start free
          </a>
        </div>
      </div>
    </header>
  );
}
