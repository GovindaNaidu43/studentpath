import Link from "next/link";
import AdminTopbar from "@/components/AdminTopbar";
import DeleteCareerButton from "@/components/DeleteCareerButton";
import { supabase } from "@/lib/supabase";
import { createCareer } from "../actions";

export default async function AdminCareersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let query = supabase.from("careers").select("*").order("id");

  if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  const { data: careers, error } = await query;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-white">
        Failed to load careers.
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white">

      {/* TOPBAR */}
      <AdminTopbar
        title="Careers"
        subtitle="Manage futuristic careers, media systems, and public experiences."
        createAction={createCareer}
        createLabel="New Career"
      />

      {/* CONTENT */}
      <div className="p-4 md:p-8 lg:p-12">

        {/* SEARCH + STATS ROW */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">

          {/* Stats */}
          <div className="px-5 py-4 rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
            <p className="text-zinc-500 text-sm mb-2">Total Careers</p>
            <h2 className="text-4xl font-black">{careers?.length ?? 0}</h2>
          </div>

          {/* Search */}
          <form method="GET" className="w-full md:w-[400px]">
            <div className="flex items-center gap-3 h-[54px] px-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search careers..."
                className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-500"
              />
              {q && (
                <Link href="/admin/careers" className="text-zinc-500 hover:text-white transition text-xs">
                  Clear ✕
                </Link>
              )}
            </div>
          </form>
        </div>

        {q && (
          <p className="text-zinc-500 text-sm mb-6">
            Showing {careers?.length ?? 0} result{careers?.length !== 1 ? "s" : ""} for &quot;{q}&quot;
          </p>
        )}

        {/* GRID */}
        {careers && careers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 md:gap-8">
            {careers.map((career) => (
              <div
                key={career.id}
                className="
                  group relative overflow-hidden
                  rounded-[24px] md:rounded-[36px]
                  border border-white/10
                  bg-white/[0.04] backdrop-blur-2xl
                  hover:-translate-y-2 transition-all duration-500
                "
              >
                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />

                {/* IMAGE */}
                <div className="relative h-[120px] md:h-[160px] overflow-hidden">
                  {career.hero_image ? (
                    <img
                      src={career.hero_image}
                      alt={career.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(135deg, ${career.primary_color || "#d946ef"}, ${career.secondary_color || "#9333ea"})`,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black" />

                  {/* CATEGORY BADGE */}
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-xs uppercase tracking-[0.25em] text-fuchsia-400">
                    {career.category || "Future Career"}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative z-10 p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-black leading-tight mb-4">
                    {career.title}
                  </h2>

                  <p className="hidden md:block text-zinc-400 leading-relaxed line-clamp-2 mb-6 text-sm">
                    {career.description}
                  </p>

                  {/* META */}
                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-zinc-500 text-xs uppercase mb-1">Demand</p>
                      <p className="font-semibold text-sm">{career.demand || "—"}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs uppercase mb-1">Salary</p>
                      <p className="font-semibold text-sm">{career.salary || "—"}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs uppercase mb-1">Difficulty</p>
                      <p className="font-semibold text-sm">{career.difficulty || "—"}</p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col md:flex-row gap-3">
                    <Link
                      href={`/career/${career.slug}`}
                      target="_blank"
                      className="flex-1 text-center py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
                    >
                      Preview ↗
                    </Link>

                    <Link
                      href={`/admin/careers/${career.id}`}
                      className="flex-1 text-center py-3 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 transition font-semibold text-sm"
                    >
                      Edit System
                    </Link>

                    {/* DELETE — client component handles onClick + confirm */}
                    <DeleteCareerButton
                      id={String(career.id)}
                      title={career.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-2xl font-black mb-3">
              {q ? "No careers found" : "No careers yet"}
            </h3>
            <p className="text-zinc-500 mb-8">
              {q ? `No careers match "${q}"` : "Create your first career to get started."}
            </p>
            <form action={createCareer}>
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 transition font-semibold"
              >
                + Create First Career
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}