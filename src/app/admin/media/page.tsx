"use client";

import { useState, useRef } from "react";
import AdminTopbar from "@/components/AdminTopbar";
import { supabase } from "@/lib/supabase";
import {
  Upload,
  Trash2,
  Copy,
  ImageIcon,
  Video,
  Check,
  Loader2,
} from "lucide-react";

type MediaFile = {
  name: string;
  updated_at: string;
  metadata?: { size?: number; mimetype?: string };
};

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "images" | "videos">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadFiles() {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("career-media")
      .list("", {
        limit: 200,
        sortBy: { column: "updated_at", order: "desc" },
      });

    if (!error && data) {
      setFiles(data as MediaFile[]);
    }
    setLoading(false);
    setLoaded(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("career-media")
      .upload(fileName, file);

    if (!error) {
      await loadFiles();
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDelete(fileName: string) {
    const { error } = await supabase.storage
      .from("career-media")
      .remove([fileName]);

    if (!error) {
      setFiles((prev) => prev.filter((f) => f.name !== fileName));
    }
    setDeleteConfirm(null);
  }

  function getPublicUrl(fileName: string) {
    const { data } = supabase.storage
      .from("career-media")
      .getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function copyUrl(fileName: string) {
    const url = getPublicUrl(fileName);
    await navigator.clipboard.writeText(url);
    setCopiedName(fileName);
    setTimeout(() => setCopiedName(null), 2000);
  }

  function isVideo(fileName: string) {
    return /\.(mp4|webm|mov|avi)$/i.test(fileName);
  }

  function formatSize(bytes?: number) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  const filteredFiles = files.filter((f) => {
    if (filter === "images") return !isVideo(f.name);
    if (filter === "videos") return isVideo(f.name);
    return true;
  });

  return (
    <main className="min-h-screen text-white">
      <AdminTopbar title="Media Studio" subtitle="Manage all uploaded images and videos." />

      <div className="p-4 md:p-8 lg:p-12">

        {/* TOP ACTIONS */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">

          {/* Stats row */}
          <div className="flex items-center gap-4">
            <div className="px-5 py-4 rounded-[24px] border border-white/10 bg-white/[0.04]">
              <p className="text-zinc-500 text-sm mb-1">Total Files</p>
              <h2 className="text-3xl font-black">{files.length}</h2>
            </div>
            <div className="px-5 py-4 rounded-[24px] border border-white/10 bg-white/[0.04]">
              <p className="text-zinc-500 text-sm mb-1">Images</p>
              <h2 className="text-3xl font-black">
                {files.filter((f) => !isVideo(f.name)).length}
              </h2>
            </div>
            <div className="px-5 py-4 rounded-[24px] border border-white/10 bg-white/[0.04]">
              <p className="text-zinc-500 text-sm mb-1">Videos</p>
              <h2 className="text-3xl font-black">
                {files.filter((f) => isVideo(f.name)).length}
              </h2>
            </div>
          </div>

          {/* Upload button */}
          <label className="
            relative flex items-center gap-3
            px-6 py-4 rounded-2xl
            bg-fuchsia-600 hover:bg-fuchsia-500
            transition-all duration-300
            font-semibold cursor-pointer
            shadow-[0_0_30px_rgba(217,70,239,0.35)]
          ">
            {uploading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Upload size={18} />
            )}
            {uploading ? "Uploading..." : "Upload File"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* LOAD FILES BUTTON (lazy load to avoid SSR issues) */}
        {!loaded && (
          <div className="text-center py-20">
            <button
              onClick={loadFiles}
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition font-semibold flex items-center gap-3 mx-auto"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ImageIcon size={18} />
              )}
              {loading ? "Loading..." : "Load Media Files"}
            </button>
          </div>
        )}

        {loaded && (
          <>
            {/* FILTER TABS */}
            <div className="flex gap-3 mb-6">
              {(["all", "images", "videos"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`
                    px-5 py-2 rounded-full text-sm font-semibold transition capitalize
                    ${
                      filter === tab
                        ? "bg-fuchsia-600 text-white"
                        : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* GRID */}
            {filteredFiles.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredFiles.map((file) => {
                  const publicUrl = getPublicUrl(file.name);
                  const video = isVideo(file.name);

                  return (
                    <div
                      key={file.name}
                      className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] aspect-square"
                    >
                      {/* PREVIEW */}
                      {video ? (
                        <video
                          src={publicUrl}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={publicUrl}
                          alt={file.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}

                      {/* TYPE BADGE */}
                      <div className="absolute top-2 left-2">
                        <div className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur flex items-center justify-center">
                          {video ? (
                            <Video size={12} className="text-cyan-400" />
                          ) : (
                            <ImageIcon size={12} className="text-fuchsia-400" />
                          )}
                        </div>
                      </div>

                      {/* HOVER OVERLAY */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-3">
                        <p className="text-white text-xs text-center font-medium line-clamp-2 leading-snug">
                          {file.name.split("-").slice(1).join("-") || file.name}
                        </p>
                        <p className="text-zinc-400 text-xs">
                          {formatSize(file.metadata?.size)}
                        </p>

                        <div className="flex gap-2">
                          {/* Copy URL */}
                          <button
                            onClick={() => copyUrl(file.name)}
                            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                            title="Copy URL"
                          >
                            {copiedName === file.name ? (
                              <Check size={14} className="text-green-400" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>

                          {/* Delete */}
                          {deleteConfirm === file.name ? (
                            <button
                              onClick={() => handleDelete(file.name)}
                              className="h-9 px-3 rounded-xl bg-red-500 hover:bg-red-400 text-xs font-semibold transition"
                            >
                              Confirm
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(file.name)}
                              className="w-9 h-9 rounded-xl bg-red-500/30 hover:bg-red-500/50 flex items-center justify-center transition"
                              title="Delete"
                            >
                              <Trash2 size={14} className="text-red-400" />
                            </button>
                          )}
                        </div>

                        {/* Open in new tab */}
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-400 hover:text-white transition"
                        >
                          Open ↗
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-5xl mb-6">🎬</div>
                <h3 className="text-2xl font-black mb-3">No media files</h3>
                <p className="text-zinc-500">
                  Upload images or videos to get started.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
