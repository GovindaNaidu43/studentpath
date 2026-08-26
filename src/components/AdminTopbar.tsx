"use client";

import { Search, Bell, Plus, Loader2 } from "lucide-react";
import { useTransition } from "react";

type Props = {
  title: string;
  subtitle?: string;
  createAction?: () => Promise<void>;
  createLabel?: string;
};

export default function AdminTopbar({
  title,
  createAction,
  createLabel = "Create",
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    if (!createAction) return;
    startTransition(async () => {
      await createAction();
    });
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-white/10">
      <div className="px-4 md:px-8 py-4 md:py-5 flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="min-w-0 flex-1">
          <p className="hidden md:block uppercase tracking-[0.25em] text-fuchsia-400 text-xs mb-2">
            StudentPath Control Center
          </p>
          <h1 className="text-xl md:text-3xl font-black tracking-[-0.04em] truncate">
            {title}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* CREATE BUTTON */}
          {createAction && (
            <form action={createAction}>
              <button
                type="submit"
                disabled={isPending}
                className="
                  h-[44px] md:h-[54px]
                  w-[44px] md:w-auto
                  px-0 md:px-6
                  rounded-xl md:rounded-2xl
                  bg-fuchsia-600 hover:bg-fuchsia-500
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-300
                  font-semibold
                  flex items-center justify-center gap-3
                  shadow-[0_0_30px_rgba(217,70,239,0.35)]
                "
              >
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Plus size={18} />
                )}
                <span className="hidden md:inline">
                  {isPending ? "Creating..." : createLabel}
                </span>
              </button>
            </form>
          )}

          {/* NOTIFICATION */}
          <button className="hidden md:flex relative w-[54px] h-[54px] rounded-2xl border border-white/10 bg-white/[0.04] items-center justify-center hover:bg-white/[0.08] transition">
            <Bell size={20} />
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-fuchsia-500" />
          </button>

          {/* PROFILE AVATAR */}
          <div className="hidden md:flex relative w-[54px] h-[54px] rounded-2xl overflow-hidden border border-white/10 items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-cyan-400" />
            <span className="relative z-10 text-white font-black text-sm">SP</span>
          </div>
        </div>

      </div>
    </header>
  );
}