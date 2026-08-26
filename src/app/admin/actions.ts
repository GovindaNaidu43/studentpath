"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* ─────────────────────────────────────────
   CAREERS
───────────────────────────────────────── */

export async function createCareer() {
  const { data, error } = await supabase
    .from("careers")
    .insert({
      title: "New Career",
      slug: "new-career-" + Date.now(),
      category: "Future Careers",
      description: "New career description",
      salary: "₹5L - ₹20L",
      demand: "Growing",
      difficulty: "Medium",
      future_scope: "Excellent",
      hero_image: "/images/default.jpg",
      hero_video: "/videos/default.mp4",
      primary_color: "#d946ef",
      secondary_color: "#9333ea",
      universe_nodes: [],
      paths: [],
    })
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create career: " + error.message);
  }

  revalidatePath("/admin/careers");
  redirect(`/admin/careers/${data.id}`);
}

export async function updateCareer(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const salary = formData.get("salary") as string;
  const demand = formData.get("demand") as string;
  const difficulty = formData.get("difficulty") as string;
  const description = formData.get("description") as string;
  const hero_image = formData.get("hero_image") as string;
  const hero_video = formData.get("hero_video") as string;
  const primary_color = formData.get("primary_color") as string;
  const secondary_color = formData.get("secondary_color") as string;

  const insights = JSON.parse(
    (formData.get("insights") as string) || "[]"
  );
  const whyExists = JSON.parse(
    (formData.get("whyExists") as string) || "[]"
  );
  const scenes = JSON.parse(
    (formData.get("scenes") as string) || "[]"
  );
  const pathSteps = JSON.parse(
    (formData.get("pathSteps") as string) || "[]"
  );
  const futureRoles = JSON.parse(
    (formData.get("future_roles") as string) || "[]"
  );

  /* UPDATE CORE CAREER ROW */
  const { error } = await supabase
    .from("careers")
    .update({
      title,
      slug,
      category,
      salary,
      demand,
      difficulty,
      description,
      hero_image,
      hero_video,
      primary_color,
      secondary_color,
    })
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update career: " + error.message);
  }

  /* ── INSIGHTS ─────────────────────── */
  await supabase
    .from("career_insights")
    .delete()
    .eq("career_slug", slug);

  if (insights.length > 0) {
    const formattedInsights = insights.map(
      (insight: any, index: number) => ({
        career_slug: slug,
        small_heading: insight.small_heading,
        title: insight.title,
        short_description: insight.short_description,
        deep_details: insight.deep_details,
        card_order: index + 1,
      })
    );

    await supabase.from("career_insights").insert(formattedInsights);
  }

  /* ── WHY EXISTS ───────────────────── */
  await supabase
    .from("career_why_exists")
    .delete()
    .eq("career_slug", slug);

  if (whyExists.length > 0) {
    const formattedWhyExists = whyExists.map(
      (block: any, index: number) => ({
        career_slug: slug,
        heading: block.heading,
        content: block.content,
        display_order: index + 1,
      })
    );

    await supabase.from("career_why_exists").insert(formattedWhyExists);
  }

  /* ── SCENES ───────────────────────── */
  await supabase
    .from("career_scenes")
    .delete()
    .eq("career_slug", slug);

  if (scenes.length > 0) {
    const formattedScenes = scenes.map(
      (scene: any, index: number) => ({
        career_slug: slug,
        title: scene.title,
        description: scene.description,
        image_url: scene.image_url,
        display_order: index + 1,
      })
    );

    await supabase.from("career_scenes").insert(formattedScenes);
  }

  /* ── PATH STEPS ───────────────────── */
  await supabase
    .from("career_path_steps")
    .delete()
    .eq("career_slug", slug);

  if (pathSteps.length > 0) {
    const formattedSteps = pathSteps.map(
      (step: any, index: number) => ({
        career_slug: slug,
        heading: step.heading,
        percentage: step.percentage,
        short_description: step.short_description,
        display_order: index + 1,
      })
    );

    await supabase.from("career_path_steps").insert(formattedSteps);
  }

  /* ── FUTURE ROLES ─────────────────── */
  await supabase
    .from("career_future_roles")
    .delete()
    .eq("career_slug", slug);

  if (futureRoles.length > 0) {
    const formattedRoles = futureRoles.map((role: any) => ({
      career_slug: slug,
      role_name: role.role_name,
      short_description: role.short_description,
      image_url: role.image_url,
    }));

    await supabase.from("career_future_roles").insert(formattedRoles);
  }

  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath(`/career/${slug}`);
  revalidatePath("/admin/careers");

  redirect("/admin/careers");
}

export async function deleteCareer(id: string) {
  /* First fetch the slug so we can delete related rows */
  const { data: career } = await supabase
    .from("careers")
    .select("slug")
    .eq("id", id)
    .single();

  if (career?.slug) {
    const slug = career.slug;

    await Promise.all([
      supabase.from("career_insights").delete().eq("career_slug", slug),
      supabase.from("career_why_exists").delete().eq("career_slug", slug),
      supabase.from("career_scenes").delete().eq("career_slug", slug),
      supabase.from("career_path_steps").delete().eq("career_slug", slug),
      supabase.from("career_future_roles").delete().eq("career_slug", slug),
    ]);
  }

  const { error } = await supabase
    .from("careers")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Failed to delete career: " + error.message);
  }

  revalidatePath("/admin/careers");
  revalidatePath("/");
  revalidatePath("/explore");

  redirect("/admin/careers");
}

/* ─────────────────────────────────────────
   EXAMS
   
   Required Supabase SQL (run if table doesn't exist):
   
   create table exams (
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
   );
───────────────────────────────────────── */

export async function createExam() {
  const { data, error } = await supabase
    .from("exams")
    .insert({
      title: "New Exam",
      slug: "new-exam-" + Date.now(),
      category: "Competitive",
      description: "Exam description",
      difficulty: "Medium",
    })
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create exam: " + error.message);
  }

  revalidatePath("/admin/exams");
  redirect(`/admin/exams/${data.id}`);
}

export async function updateExam(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const exam_date = formData.get("exam_date") as string;
  const registration_link = formData.get("registration_link") as string;
  const official_website = formData.get("official_website") as string;
  const eligibility = formData.get("eligibility") as string;
  const difficulty = formData.get("difficulty") as string;

  const { error } = await supabase
    .from("exams")
    .update({
      title,
      slug,
      category,
      description,
      exam_date,
      registration_link,
      official_website,
      eligibility,
      difficulty,
    })
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update exam: " + error.message);
  }

  revalidatePath("/admin/exams");
  redirect("/admin/exams");
}

export async function deleteExam(id: string) {
  const { error } = await supabase
    .from("exams")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Failed to delete exam: " + error.message);
  }

  revalidatePath("/admin/exams");
  redirect("/admin/exams");
}

/* ─────────────────────────────────────────
   SITE SETTINGS
   
   Required Supabase SQL (run if table doesn't exist):
   
   create table site_settings (
     id bigint generated always as identity primary key,
     site_name text default 'StudentPath',
     admin_name text default 'Admin',
     contact_email text default '',
     tagline text default '',
     maintenance_mode boolean default false,
     updated_at timestamptz default now()
   );
   
   -- Insert default row:
   insert into site_settings (site_name) values ('StudentPath');
───────────────────────────────────────── */

export async function saveSettings(formData: FormData) {
  const site_name = formData.get("site_name") as string;
  const admin_name = formData.get("admin_name") as string;
  const contact_email = formData.get("contact_email") as string;
  const tagline = formData.get("tagline") as string;

  /* Upsert — if no row exists, insert; otherwise update row 1 */
  const { error } = await supabase
    .from("site_settings")
    .upsert({
      id: 1,
      site_name,
      admin_name,
      contact_email,
      tagline,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error("Failed to save settings: " + error.message);
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}