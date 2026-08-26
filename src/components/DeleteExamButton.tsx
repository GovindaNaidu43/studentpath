"use client";

import { useTransition } from "react";
import { deleteExam } from "@/app/admin/actions";

export default function DeleteExamButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"?`)) return;
    startTransition(async () => {
      await deleteExam(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="
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
