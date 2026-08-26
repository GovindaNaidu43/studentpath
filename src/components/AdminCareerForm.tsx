"use client";

import { useState, useTransition } from "react";
import ImageUpload from "@/components/ImageUpload";
import { updateCareer } from "@/app/admin/actions";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Props = {
  career: any;
};

export default function AdminCareerForm({ career }: Props) {
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    title: career.title || "",
    slug: career.slug || "",
    category: career.category || "",
    salary: career.salary || "",
    demand: career.demand || "",
    difficulty: career.difficulty || "",
    description: career.description || "",
    primary_color: career.primary_color || "#d946ef",
    secondary_color: career.secondary_color || "#9333ea",
    hero_image: career.hero_image || "",
    hero_video: career.hero_video || "",
    insights: career.career_insights || [],
    whyExists: career.career_why_exists || [],
    scenes: career.career_scenes || [],
    pathSteps: career.career_path_steps || [],
    // Fixed: was career.career_future_roles (wrong key)
    future_roles: career.future_roles || [],
  });

  /* ─── Field helpers ─────────────────────── */

  function updateField(key: string, value: string) {
    setFormData({ ...formData, [key]: value });
  }

  /* ─── Insights ─────────────────────────── */

  function updateInsight(index: number, key: string, value: string) {
    const updated = [...formData.insights];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, insights: updated });
  }

  function addInsight() {
    setFormData({
      ...formData,
      insights: [
        ...formData.insights,
        {
          small_heading: "",
          title: "",
          short_description: "",
          deep_details: "",
          card_order: formData.insights.length + 1,
        },
      ],
    });
  }

  function removeInsight(index: number) {
    setFormData({
      ...formData,
      insights: formData.insights.filter(
        (_: any, i: number) => i !== index
      ),
    });
  }

  /* ─── Why Exists ────────────────────────── */

  function updateWhyBlock(index: number, key: string, value: string) {
    const updated = [...formData.whyExists];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, whyExists: updated });
  }

  function addWhyBlock() {
    setFormData({
      ...formData,
      whyExists: [
        ...formData.whyExists,
        {
          heading: "",
          content: "",
          display_order: formData.whyExists.length + 1,
        },
      ],
    });
  }

  function removeWhyBlock(index: number) {
    setFormData({
      ...formData,
      whyExists: formData.whyExists.filter(
        (_: any, i: number) => i !== index
      ),
    });
  }

  /* ─── Scenes ────────────────────────────── */

  function updateScene(index: number, key: string, value: string) {
    const updated = [...formData.scenes];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, scenes: updated });
  }

  function addScene() {
    setFormData({
      ...formData,
      scenes: [
        ...formData.scenes,
        {
          title: "",
          description: "",
          image_url: "",
          display_order: formData.scenes.length + 1,
        },
      ],
    });
  }

  function removeScene(index: number) {
    setFormData({
      ...formData,
      scenes: formData.scenes.filter(
        (_: any, i: number) => i !== index
      ),
    });
  }

  /* ─── Path Steps ────────────────────────── */

  function updatePathStep(index: number, key: string, value: any) {
    const updated = [...formData.pathSteps];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, pathSteps: updated });
  }

  function addPathStep() {
    setFormData({
      ...formData,
      pathSteps: [
        ...formData.pathSteps,
        {
          heading: "",
          percentage: 0,
          short_description: "",
          display_order: formData.pathSteps.length + 1,
        },
      ],
    });
  }

  function removePathStep(index: number) {
    setFormData({
      ...formData,
      pathSteps: formData.pathSteps.filter(
        (_: any, i: number) => i !== index
      ),
    });
  }

  /* ─── Future Roles ──────────────────────── */

  function updateFutureRole(index: number, key: string, value: string) {
    const updated = [...formData.future_roles];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, future_roles: updated });
  }

  function addFutureRole() {
    setFormData({
      ...formData,
      future_roles: [
        ...formData.future_roles,
        { role_name: "", short_description: "", image_url: "" },
      ],
    });
  }

  function removeFutureRole(index: number) {
    setFormData({
      ...formData,
      future_roles: formData.future_roles.filter(
        (_: any, i: number) => i !== index
      ),
    });
  }

  /* ─── Sub-components ────────────────────── */

  function SectionTitle({
    title,
    desc,
  }: {
    title: string;
    desc: string;
  }) {
    return (
      <div className="mb-8">
        <p className="uppercase tracking-[0.35em] text-fuchsia-400 text-xs mb-3">
          {title}
        </p>
        <p className="text-zinc-400 max-w-2xl">{desc}</p>
      </div>
    );
  }

  function Field({
    label,
    name,
    value,
  }: {
    label: string;
    name: string;
    value: string;
  }) {
    return (
      <div>
        <label className="block mb-3 text-zinc-400 text-sm">
          {label}
        </label>
        <input
          name={name}
          value={value}
          onChange={(e) => updateField(name, e.target.value)}
          className="
            w-full rounded-2xl
            bg-white/[0.04] border border-white/10
            px-5 py-4 outline-none
            focus:border-fuchsia-500 transition
          "
        />
      </div>
    );
  }

  /* ─── Form submit handler ───────────────── */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaveStatus("idle");

    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await updateCareer(fd);
        setSaveStatus("success");
      } catch {
        setSaveStatus("error");
      }
    });
  }

  /* ─── Render ────────────────────────────── */

  return (
    <div className="grid xl:grid-cols-[1fr_620px] gap-10 items-start">

      {/* ══════════════════════════════════════
          MAIN FORM — everything must be inside
          this single <form> element
      ══════════════════════════════════════ */}

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ── HIDDEN FIELDS ─────────────────── */}
        <input type="hidden" name="id" value={career.id} />
        <input
          type="hidden"
          name="insights"
          value={JSON.stringify(formData.insights)}
        />
        <input
          type="hidden"
          name="whyExists"
          value={JSON.stringify(formData.whyExists)}
        />
        <input
          type="hidden"
          name="scenes"
          value={JSON.stringify(formData.scenes)}
        />
        <input
          type="hidden"
          name="pathSteps"
          value={JSON.stringify(formData.pathSteps)}
        />
        <input
          type="hidden"
          name="future_roles"
          value={JSON.stringify(formData.future_roles)}
        />

        {/* ── 1. CAREER IDENTITY ──────────────── */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />
          <div className="relative z-10">
            <SectionTitle
              title="Career Identity"
              desc="Core metadata defining the public identity of this career system."
            />
            <div className="grid lg:grid-cols-2 gap-6">
              <Field label="Career Title" name="title" value={formData.title} />
              <Field label="Slug" name="slug" value={formData.slug} />
              <Field label="Category" name="category" value={formData.category} />
              <Field label="Salary Range" name="salary" value={formData.salary} />
              <Field label="Industry Demand" name="demand" value={formData.demand} />
              <Field label="Difficulty" name="difficulty" value={formData.difficulty} />
            </div>
          </div>
        </section>

        {/* ── 2. VISUAL SYSTEM ────────────────── */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <SectionTitle
              title="Visual System"
              desc="Control cinematic visuals, gradients, hero media, and brand atmosphere."
            />

            {/* Colour pickers */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block mb-3 text-zinc-400 text-sm">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={(e) =>
                      updateField("primary_color", e.target.value)
                    }
                    className="h-12 w-16 rounded-xl border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    value={formData.primary_color}
                    onChange={(e) =>
                      updateField("primary_color", e.target.value)
                    }
                    className="flex-1 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3 text-zinc-400 text-sm">
                  Secondary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={(e) =>
                      updateField("secondary_color", e.target.value)
                    }
                    className="h-12 w-16 rounded-xl border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    value={formData.secondary_color}
                    onChange={(e) =>
                      updateField("secondary_color", e.target.value)
                    }
                    className="flex-1 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-10">
              <label className="block mb-4 text-zinc-400 text-lg">
                Hero Image
              </label>
              <input
                type="hidden"
                name="hero_image"
                value={formData.hero_image}
              />
              <ImageUpload
                value={formData.hero_image}
                onUpload={(url) =>
                  setFormData({ ...formData, hero_image: url })
                }
                type="image"
              />
            </div>

            {/* Hero Video */}
            <div>
              <label className="block mb-4 text-zinc-400 text-lg">
                Hero Video
              </label>
              <input
                type="hidden"
                name="hero_video"
                value={formData.hero_video}
              />
              <ImageUpload
                value={formData.hero_video}
                onUpload={(url) =>
                  setFormData({ ...formData, hero_video: url })
                }
                type="video"
              />
            </div>
          </div>
        </section>

        {/* ── 3. NARRATIVE ────────────────────── */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <SectionTitle
              title="Narrative & Story"
              desc="Describe the emotional vision, mission, and future potential of this career."
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              rows={8}
              className="
                w-full rounded-2xl
                bg-white/[0.04] border border-white/10
                px-6 py-5 outline-none
                focus:border-fuchsia-500 transition leading-relaxed
              "
            />
          </div>
        </section>

        {/* ── 4. CAREER INSIGHTS ──────────────── */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <SectionTitle
              title="Career Insights"
              desc="Manage premium insight cards shown inside the public career experience."
            />
            <div className="space-y-8">
              {formData.insights.map((insight: any, index: number) => (
                <div
                  key={index}
                  className="rounded-[28px] border border-white/10 bg-black/30 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black">
                      Insight {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeInsight(index)}
                      className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-3 text-zinc-400 text-sm">
                        Small Heading
                      </label>
                      <input
                        value={insight.small_heading || ""}
                        onChange={(e) =>
                          updateInsight(index, "small_heading", e.target.value)
                        }
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block mb-3 text-zinc-400 text-sm">
                        Main Title
                      </label>
                      <input
                        value={insight.title || ""}
                        onChange={(e) =>
                          updateInsight(index, "title", e.target.value)
                        }
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block mb-3 text-zinc-400 text-sm">
                      Short Description
                    </label>
                    <textarea
                      value={insight.short_description || ""}
                      onChange={(e) =>
                        updateInsight(
                          index,
                          "short_description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block mb-3 text-zinc-400 text-sm">
                      Deep Details
                    </label>
                    <textarea
                      value={insight.deep_details || ""}
                      onChange={(e) =>
                        updateInsight(index, "deep_details", e.target.value)
                      }
                      rows={6}
                      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition leading-relaxed"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addInsight}
                className="w-full py-5 rounded-[28px] border border-dashed border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/15 transition-all text-lg font-semibold"
              >
                + Add Insight
              </button>
            </div>
          </div>
        </section>

        {/* ── 5. WHY THIS CAREER EXISTS ───────── */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <SectionTitle
              title="Why This Career Exists"
              desc="Educational content explaining the origin and purpose of this career."
            />
            <div className="space-y-8">
              {formData.whyExists?.map(
                (block: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-[28px] border border-white/10 bg-black/30 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-black">
                        Section {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeWhyBlock(index)}
                        className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      <label className="block mb-3 text-zinc-400 text-sm">
                        Heading
                      </label>
                      <input
                        value={block.heading || ""}
                        onChange={(e) =>
                          updateWhyBlock(index, "heading", e.target.value)
                        }
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block mb-3 text-zinc-400 text-sm">
                        Content
                      </label>
                      <textarea
                        value={block.content || ""}
                        onChange={(e) =>
                          updateWhyBlock(index, "content", e.target.value)
                        }
                        rows={6}
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition leading-relaxed"
                      />
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addWhyBlock}
                className="w-full py-5 rounded-[28px] border border-dashed border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/15 transition-all text-lg font-semibold"
              >
                + Add Section
              </button>
            </div>
          </div>
        </section>

        {/* ── 6. CAREER SCENES ────────────────── */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <SectionTitle
              title="Career Scenes"
              desc="Real-world moments students experience inside this career."
            />
            <div className="space-y-8">
              {formData.scenes?.map(
                (scene: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-[28px] border border-white/10 bg-black/30 p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black">
                        Scene {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeScene(index)}
                        className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-6">
                      <input
                        value={scene.title || ""}
                        onChange={(e) =>
                          updateScene(index, "title", e.target.value)
                        }
                        placeholder="Scene Title"
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                      <textarea
                        value={scene.description || ""}
                        onChange={(e) =>
                          updateScene(index, "description", e.target.value)
                        }
                        placeholder="Scene Description"
                        rows={4}
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                      <ImageUpload
                        value={scene.image_url || ""}
                        type="image"
                        onUpload={(url) =>
                          updateScene(index, "image_url", url)
                        }
                      />
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addScene}
                className="w-full py-5 rounded-[28px] border border-dashed border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/15 transition-all text-lg font-semibold"
              >
                + Add Scene
              </button>
            </div>
          </div>
        </section>

        {/* ── 7. CAREER JOURNEY ROADMAP ───────── */}
        {/* NOTE: Was previously OUTSIDE the form — now correctly inside */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <SectionTitle
              title="Career Journey Roadmap"
              desc="Define the journey students follow to become this professional."
            />
            <div className="space-y-6">
              {formData.pathSteps?.map(
                (step: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-white/10 bg-black/30 p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black">
                        Step {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removePathStep(index)}
                        className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <input
                        placeholder="Heading"
                        value={step.heading || ""}
                        onChange={(e) =>
                          updatePathStep(index, "heading", e.target.value)
                        }
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                      <div className="flex items-center gap-4">
                        <label className="text-zinc-400 text-sm whitespace-nowrap">
                          Completion %
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          placeholder="e.g. 60"
                          value={step.percentage ?? 0}
                          onChange={(e) =>
                            updatePathStep(
                              index,
                              "percentage",
                              Number(e.target.value)
                            )
                          }
                          className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                        />
                      </div>
                      <textarea
                        placeholder="Short Description"
                        value={step.short_description || ""}
                        onChange={(e) =>
                          updatePathStep(
                            index,
                            "short_description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addPathStep}
                className="w-full py-5 rounded-[28px] border border-dashed border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/15 transition-all text-lg font-semibold"
              >
                + Add Step
              </button>
            </div>
          </div>
        </section>

        {/* ── 8. FUTURE CAREER OPPORTUNITIES ─── */}
        {/* NOTE: Was previously OUTSIDE the form — now correctly inside */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
          <div className="relative z-10">
            <SectionTitle
              title="Future Career Opportunities"
              desc="Show students where this career can take them in the future."
            />
            <div className="space-y-6">
              {formData.future_roles?.map(
                (role: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-white/10 bg-black/30 p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black">
                        Role {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeFutureRole(index)}
                        className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <input
                        placeholder="Job / Role Name"
                        value={role.role_name || ""}
                        onChange={(e) =>
                          updateFutureRole(index, "role_name", e.target.value)
                        }
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                      <textarea
                        placeholder="Short Description"
                        value={role.short_description || ""}
                        onChange={(e) =>
                          updateFutureRole(
                            index,
                            "short_description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                      />
                      <ImageUpload
                        value={role.image_url || ""}
                        type="image"
                        onUpload={(url) =>
                          updateFutureRole(index, "image_url", url)
                        }
                      />
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addFutureRole}
                className="w-full py-5 rounded-[28px] border border-dashed border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/15 transition-all text-lg font-semibold"
              >
                + Add Future Role
              </button>
            </div>
          </div>
        </section>

        {/* ── STICKY SAVE BAR ─────────────────── */}
        <div className="sticky bottom-6 z-50 flex justify-end">
          <div className="flex items-center gap-4 rounded-[28px] border border-white/10 bg-black/80 backdrop-blur-2xl p-4 shadow-[0_0_50px_rgba(217,70,239,0.25)]">

            {/* Status indicator */}
            {saveStatus === "success" && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                <span>Saved successfully</span>
              </div>
            )}
            {saveStatus === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>Save failed — check console</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="
                flex items-center gap-3
                px-8 py-4
                rounded-2xl
                bg-fuchsia-600 hover:bg-fuchsia-500
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-300
                font-semibold text-lg
                shadow-[0_0_30px_rgba(217,70,239,0.4)]
              "
            >
              {isPending && <Loader2 size={18} className="animate-spin" />}
              {isPending ? "Saving..." : "Save Career System"}
            </button>
          </div>
        </div>

      </form>

      {/* ── RIGHT COLUMN: Live Preview (optional sidebar) ── */}
      <div className="hidden xl:block sticky top-28 space-y-6">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />
          <div className="relative z-10">
            <p className="uppercase tracking-[0.3em] text-fuchsia-400 text-xs mb-4">
              Quick Stats
            </p>
            <div className="space-y-4 text-sm">
              {[
                {
                  label: "Insights",
                  value: formData.insights.length,
                },
                {
                  label: "Why Sections",
                  value: formData.whyExists.length,
                },
                {
                  label: "Scenes",
                  value: formData.scenes.length,
                },
                {
                  label: "Roadmap Steps",
                  value: formData.pathSteps.length,
                },
                {
                  label: "Future Roles",
                  value: formData.future_roles.length,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="font-bold text-lg tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
          <div className="relative z-10">
            <p className="uppercase tracking-[0.3em] text-fuchsia-400 text-xs mb-4">
              Color Preview
            </p>
            <div
              className="h-24 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${formData.primary_color}, ${formData.secondary_color})`,
              }}
            />
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-500">
              <div>
                <p className="mb-1">Primary</p>
                <p className="font-mono text-white">
                  {formData.primary_color}
                </p>
              </div>
              <div>
                <p className="mb-1">Secondary</p>
                <p className="font-mono text-white">
                  {formData.secondary_color}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}