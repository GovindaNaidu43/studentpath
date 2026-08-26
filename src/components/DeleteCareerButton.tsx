"use client";

import { useTransition } from "react";
import { deleteCareer } from "@/app/admin/actions";

export default function DeleteCareerButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteCareer(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="
        w-full md:w-auto
        px-5 py-3
        rounded-2xl
        border border-red-500/30
        bg-red-500/10
        hover:bg-red-500/20
        text-red-400 text-sm
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
