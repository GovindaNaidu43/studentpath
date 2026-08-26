import { supabase } from "@/lib/supabase";
import { updateExam } from "../../actions";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditExamPage({ params }: PageProps) {
  const { id } = await params;

  const { data: exam, error } = await supabase
    .from("exams")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-white">
        Exam not found.
      </div>
    );
  }

  return (
    <section className="relative p-4 md:p-8 lg:p-12">
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 mb-10">
        <Link
          href="/admin/exams"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-8 text-sm"
        >
          ← Back to Exams
        </Link>

        <p className="uppercase tracking-[0.4em] text-cyan-400 text-xs mb-4">
          Exam Editor
        </p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight">
          {exam.title}
        </h1>
      </div>

      {/* FORM */}
      <form action={updateExam} className="relative z-10 max-w-4xl space-y-8">
        <input type="hidden" name="id" value={exam.id} />

        {/* CORE DETAILS */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
          <div className="relative z-10">
            <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-2">
              Core Details
            </p>
            <p className="text-zinc-400 mb-8 text-sm">
              Basic information shown on the public exam card.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              {[
                { label: "Exam Title", name: "title", defaultValue: exam.title },
                { label: "Slug (URL key)", name: "slug", defaultValue: exam.slug },
                { label: "Category", name: "category", defaultValue: exam.category },
                { label: "Difficulty", name: "difficulty", defaultValue: exam.difficulty },
                { label: "Exam Date", name: "exam_date", defaultValue: exam.exam_date },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block mb-3 text-zinc-400 text-sm">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    defaultValue={field.defaultValue || ""}
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-cyan-500 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-2">
              Description
            </p>
            <p className="text-zinc-400 mb-6 text-sm">
              A clear summary of the exam shown to students.
            </p>
            <textarea
              name="description"
              defaultValue={exam.description || ""}
              rows={6}
              className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-6 py-5 outline-none focus:border-cyan-500 transition leading-relaxed"
            />
          </div>
        </div>

        {/* LINKS */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-2">
              Links & Resources
            </p>
            <p className="text-zinc-400 mb-8 text-sm">
              Provide official links students can use to register or learn more.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  label: "Official Website",
                  name: "official_website",
                  defaultValue: exam.official_website,
                },
                {
                  label: "Registration Link",
                  name: "registration_link",
                  defaultValue: exam.registration_link,
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block mb-3 text-zinc-400 text-sm">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    defaultValue={field.defaultValue || ""}
                    placeholder="https://..."
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-cyan-500 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ELIGIBILITY */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-2">
              Eligibility Criteria
            </p>
            <p className="text-zinc-400 mb-6 text-sm">
              Who can apply? Describe age, education, or other criteria.
            </p>
            <textarea
              name="eligibility"
              defaultValue={exam.eligibility || ""}
              rows={5}
              className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-6 py-5 outline-none focus:border-cyan-500 transition leading-relaxed"
            />
          </div>
        </div>

        {/* SAVE BAR */}
        <div className="sticky bottom-6 flex justify-end">
          <div className="flex items-center gap-4 rounded-[28px] border border-white/10 bg-black/80 backdrop-blur-2xl p-4 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <Link
              href="/admin/exams"
              className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 transition-all duration-300 font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.35)]"
            >
              Save Exam
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
