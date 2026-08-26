import AdminTopbar from "@/components/AdminTopbar";
import DeleteExamButton from "@/components/DeleteExamButton";
import { supabase } from "@/lib/supabase";
import { createExam } from "../actions";
import Link from "next/link";

export default async function AdminExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let query = supabase.from("exams").select("*").order("id");
  if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  const { data: exams, error } = await query;

  const categoryColors: Record<string, string> = {
    Competitive: "text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10",
    Engineering: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    Medical: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    Management: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    Government: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  };

  return (
    <main className="min-h-screen text-white">

      <AdminTopbar
        title="Exams"
        subtitle="Manage exam listings, dates, and eligibility."
        createAction={createExam}
        createLabel="New Exam"
      />

      <div className="p-4 md:p-8 lg:p-12">

        {/* SEARCH + STATS */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="px-5 py-4 rounded-[24px] border border-white/10 bg-white/[0.04]">
            <p className="text-zinc-500 text-sm mb-2">Total Exams</p>
            <h2 className="text-4xl font-black">{exams?.length ?? 0}</h2>
          </div>

          <form method="GET" className="w-full md:w-[400px]">
            <div className="flex items-center gap-3 h-[54px] px-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search exams..."
                className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-500"
              />
              {q && (
                <Link href="/admin/exams" className="text-zinc-500 hover:text-white transition text-xs">
                  Clear ✕
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* SQL SETUP NOTICE */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 mb-8 text-red-300">
            <p className="font-semibold mb-1">Database Error</p>
            <p className="text-sm mb-3">
              The <code className="bg-black/40 px-1.5 py-0.5 rounded">exams</code> table may not exist yet. Run this in your Supabase SQL Editor:
            </p>
            <pre className="text-xs bg-black/40 rounded-xl p-4 overflow-x-auto text-zinc-300">
{`create table exams (
  id bigint generated always as identity primary key,
  title text not null default 'New Exam',
  slug text not null unique,
  category text default 'Competitive',
  description text default '',
  exam_date text default '',
  registration_link text default '',
  official_website text default '',
  eligibility text default '',
  difficulty text default 'Medium',
  created_at timestamptz default now()
);`}
            </pre>
          </div>
        )}

        {/* GRID */}
        {exams && exams.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {exams.map((exam) => {
              const colorClass =
                categoryColors[exam.category] ??
                "text-zinc-400 border-white/10 bg-white/5";
              return (
                <div
                  key={exam.id}
                  className="
                    group relative overflow-hidden
                    rounded-[28px] border border-white/10
                    bg-white/[0.04] backdrop-blur-2xl
                    hover:-translate-y-1 transition-all duration-300
                  "
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />

                  <div className="relative z-10 p-6 md:p-8">
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs uppercase tracking-[0.2em] mb-4 ${colorClass}`}>
                      {exam.category || "General"}
                    </span>

                    <h2 className="text-xl md:text-2xl font-black mb-3">{exam.title}</h2>

                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6">
                      {exam.description || "No description added yet."}
                    </p>

                    <div className="flex flex-wrap gap-6 mb-6 text-sm">
                      {exam.exam_date && (
                        <div>
                          <p className="text-zinc-500 text-xs uppercase mb-1">Date</p>
                          <p className="font-semibold">{exam.exam_date}</p>
                        </div>
                      )}
                      {exam.difficulty && (
                        <div>
                          <p className="text-zinc-500 text-xs uppercase mb-1">Level</p>
                          <p className="font-semibold">{exam.difficulty}</p>
                        </div>
                      )}
                    </div>

                    {/* ACTIONS — no onClick in server component */}
                    <div className="flex gap-3 flex-wrap">
                      <Link
                        href={`/admin/exams/${exam.id}`}
                        className="flex-1 min-w-[80px] text-center py-3 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 transition font-semibold text-sm"
                      >
                        Edit
                      </Link>

                      {exam.official_website && (
                        <Link
                          href={exam.official_website}
                          target="_blank"
                          className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
                        >
                          Visit ↗
                        </Link>
                      )}

                      {/* DELETE — client component handles onClick + confirm */}
                      <DeleteExamButton
                        id={String(exam.id)}
                        title={exam.title}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !error ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-5xl mb-6">📝</div>
            <h3 className="text-2xl font-black mb-3">
              {q ? "No exams found" : "No exams yet"}
            </h3>
            <p className="text-zinc-500 mb-8">
              {q ? `No exams match "${q}"` : "Create your first exam listing."}
            </p>
            <form action={createExam}>
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 transition font-semibold"
              >
                + Create First Exam
              </button>
            </form>
          </div>
        ) : null}

      </div>
    </main>
  );
}
