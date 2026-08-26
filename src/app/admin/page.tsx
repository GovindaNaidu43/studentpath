import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminPage() {

  /* ── Live stats from Supabase ─────────────────── */

  const [
    { count: careerCount },
    { count: examCount },
  ] = await Promise.all([
    supabase.from("careers").select("*", { count: "exact", head: true }),
    supabase.from("exams").select("*", { count: "exact", head: true }),
  ]);

  /* Media count from storage bucket */
  const { data: mediaFiles } = await supabase.storage
    .from("career-media")
    .list("", { limit: 1000 });

  const mediaCount = mediaFiles?.length ?? 0;

  /* Recent careers */
  const { data: recentCareers } = await supabase
    .from("careers")
    .select("id, title, category, slug")
    .order("id", { ascending: false })
    .limit(5);

  const stats = [
    {
      title: "Total Careers",
      value: careerCount ?? 0,
      icon: "🚀",
      href: "/admin/careers",
      color: "from-fuchsia-500/20 to-fuchsia-500/5",
      border: "border-fuchsia-500/20",
    },
    {
      title: "Total Exams",
      value: examCount ?? 0,
      icon: "📝",
      href: "/admin/exams",
      color: "from-cyan-500/20 to-cyan-500/5",
      border: "border-cyan-500/20",
    },
    {
      title: "Media Files",
      value: mediaCount,
      icon: "🎬",
      href: "/admin/media",
      color: "from-violet-500/20 to-violet-500/5",
      border: "border-violet-500/20",
    },
    {
      title: "AI Engine",
      value: "Active",
      icon: "🤖",
      href: "/admin/ai",
      color: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/20",
    },
  ];

  const sections = [
    {
      title: "Careers",
      desc: "Manage career pages, media, and all content sections.",
      href: "/admin/careers",
      icon: "🚀",
    },
    {
      title: "Exams",
      desc: "Add, edit and remove exam listings across all categories.",
      href: "/admin/exams",
      icon: "📝",
    },
    {
      title: "Media Studio",
      desc: "Browse, upload and manage all images and videos.",
      href: "/admin/media",
      icon: "🎬",
    },
    {
      title: "AI Engine",
      desc: "Test the Gemini AI integration and monitor prompts.",
      href: "/admin/ai",
      icon: "🤖",
    },
    {
      title: "Settings",
      desc: "Configure site name, admin profile, and global settings.",
      href: "/admin/settings",
      icon: "⚙️",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">

      {/* HEADER */}
      <div className="mb-10">
        <p className="text-fuchsia-400 uppercase tracking-[0.3em] text-xs mb-3">
          StudentPath
        </p>
        <h1 className="text-3xl md:text-5xl font-black">
          Admin Dashboard
        </h1>
        <p className="text-zinc-500 mt-3 text-lg">
          Welcome back. Your platform is live and running.
        </p>
      </div>

      {/* LIVE STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`
              group relative overflow-hidden
              rounded-3xl border ${item.border}
              bg-gradient-to-br ${item.color}
              backdrop-blur-2xl p-5
              hover:-translate-y-1 transition-all duration-300
            `}
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <p className="text-zinc-400 text-sm mb-1">{item.title}</p>
            <h2 className="text-3xl md:text-4xl font-black">
              {item.value}
            </h2>
            <div className="absolute top-4 right-4 text-zinc-600 group-hover:translate-x-1 transition">
              →
            </div>
          </Link>
        ))}
      </div>

      {/* TWO-COL LAYOUT */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">

        {/* SECTIONS GRID */}
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                group relative overflow-hidden
                rounded-3xl border border-white/10
                bg-white/[0.04] backdrop-blur-2xl
                p-6 hover:border-fuchsia-500/40
                hover:-translate-y-1 transition-all duration-500
              "
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />
              <div className="relative z-10">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 text-fuchsia-400 text-sm group-hover:translate-x-1 transition inline-block">
                  Open →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* RECENT ACTIVITY */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6">
          <p className="uppercase tracking-[0.25em] text-fuchsia-400 text-xs mb-5">
            Recent Careers
          </p>
          <div className="space-y-3">
            {recentCareers?.map((career) => (
              <Link
                key={career.id}
                href={`/admin/careers/${career.id}`}
                className="
                  flex items-center justify-between
                  rounded-2xl border border-white/10
                  bg-white/[0.03] p-4
                  hover:border-white/20 hover:bg-white/[0.06]
                  transition group
                "
              >
                <div>
                  <p className="font-semibold text-sm">{career.title}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    {career.category}
                  </p>
                </div>
                <span className="text-fuchsia-400 text-xs group-hover:translate-x-1 transition">
                  Edit →
                </span>
              </Link>
            ))}

            {(!recentCareers || recentCareers.length === 0) && (
              <p className="text-zinc-600 text-sm text-center py-8">
                No careers yet.
              </p>
            )}
          </div>

          <Link
            href="/admin/careers"
            className="
              mt-4 block text-center
              py-3 rounded-2xl
              border border-white/10 bg-white/5
              hover:bg-white/10 transition text-sm
            "
          >
            View All Careers
          </Link>
        </div>
      </div>

    </section>
  );
}