import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AdminCareerForm from "@/components/AdminCareerForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerPage({ params }: PageProps) {
  const { id } = await params;

  /* FETCH CAREER */
  const { data: career, error } = await supabase
    .from("careers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !career) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-white">
        Career not found.
      </div>
    );
  }

  /* FETCH ALL RELATED DATA IN PARALLEL */
  const [
    { data: insights },
    { data: whyExists },
    { data: scenes },
    { data: pathSteps },
    { data: futureRoles },
  ] = await Promise.all([
    supabase
      .from("career_insights")
      .select("*")
      .eq("career_slug", career.slug)
      .order("card_order", { ascending: true }),
    supabase
      .from("career_why_exists")
      .select("*")
      .eq("career_slug", career.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_scenes")
      .select("*")
      .eq("career_slug", career.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_path_steps")
      .select("*")
      .eq("career_slug", career.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_future_roles")
      .select("*")
      .eq("career_slug", career.slug),
  ]);

  /* MERGE DATA — note: future_roles key must match what AdminCareerForm reads */
  const careerWithData = {
    ...career,
    career_insights: insights || [],
    career_why_exists: whyExists || [],
    career_scenes: scenes || [],
    career_path_steps: pathSteps || [],
    future_roles: futureRoles || [], // correct key
  };

  return (
    <section className="relative p-4 md:p-8 lg:p-12 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full bg-fuchsia-500/10 blur-[160px] pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-10 mb-12">

        <div>
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-white transition mb-8 text-sm"
          >
            ← Back to Careers
          </Link>

          <p className="uppercase tracking-[0.4em] text-fuchsia-400 text-xs mb-5">
            Career Editing System
          </p>

          <h1 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em]">
            {career.title}
          </h1>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Shape the cinematic identity, future pathways, and intelligence
            systems behind this career experience.
          </p>
        </div>

        {/* STATUS PANEL */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 min-w-[300px]">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />
          <div className="relative z-10">
            <p className="uppercase tracking-[0.3em] text-fuchsia-400 text-xs mb-4">
              System Status
            </p>
            <h3 className="text-2xl font-black mb-6">Editing Active</h3>
            <div className="space-y-4 text-sm">
              {[
                { label: "Career ID", value: `#${career.id}` },
                { label: "Category", value: career.category },
                {
                  label: "Status",
                  value: "Live",
                  className: "text-green-400",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-zinc-400">{row.label}</span>
                  <span
                    className={`font-semibold ${row.className ?? ""}`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="relative z-10">
        <AdminCareerForm career={careerWithData} />
      </div>

    </section>
  );
}