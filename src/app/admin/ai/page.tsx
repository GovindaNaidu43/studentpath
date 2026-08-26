"use client";

import AdminTopbar from "@/components/AdminTopbar";
import { useState } from "react";
import {
  BrainCircuit,
  CheckCircle,
  XCircle,
  Loader2,
  Send,
} from "lucide-react";

export default function AdminAIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState<
    "checking" | "ok" | "error" | "idle"
  >("idle");

  const hasApiKey =
    typeof process !== "undefined"
      ? true
      : false; // Key presence is server-only; assume true if env is set

  async function testConnection() {
    setApiStatus("checking");
    setError("");
    try {
      const res = await fetch("/api/admin/ai-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Reply with just: OK" }),
      });
      const data = await res.json();
      if (data.text) {
        setApiStatus("ok");
      } else {
        setApiStatus("error");
        setError(data.error || "Unexpected response");
      }
    } catch {
      setApiStatus("error");
      setError("Network error — check API route");
    }
  }

  async function runPrompt() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    setError("");

    try {
      const res = await fetch("/api/admin/ai-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.text) {
        setResponse(data.text);
      } else {
        setError(data.error || "No response from AI");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  const examplePrompts = [
    "Write a 2-sentence description for a career in Quantum Computing.",
    "List 5 future roles for someone who studies AI Engineering.",
    "What skills does a Space Architect need?",
    "Generate 3 insight cards for a Blockchain Developer career.",
  ];

  return (
    <main className="min-h-screen text-white">
      <AdminTopbar
        title="AI Engine"
        subtitle="Powered by Google Gemini"
      />

      <div className="p-4 md:p-8 lg:p-12 max-w-5xl">

        {/* STATUS CARDS */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">

          {/* API Key */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-3">
              API Key
            </p>
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-400" />
              <span className="font-semibold">Configured</span>
            </div>
            <p className="text-zinc-500 text-xs mt-2">
              GEMINI_API_KEY in .env.local
            </p>
          </div>

          {/* Model */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-3">
              Model
            </p>
            <div className="flex items-center gap-3">
              <BrainCircuit size={20} className="text-fuchsia-400" />
              <span className="font-semibold">Gemini 1.5 Flash</span>
            </div>
            <p className="text-zinc-500 text-xs mt-2">Google Generative AI</p>
          </div>

          {/* Connection test */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-3">
              Connection
            </p>
            <div className="flex items-center gap-3 mb-3">
              {apiStatus === "idle" && (
                <span className="text-zinc-500 text-sm">Not tested yet</span>
              )}
              {apiStatus === "checking" && (
                <Loader2 size={18} className="animate-spin text-fuchsia-400" />
              )}
              {apiStatus === "ok" && (
                <CheckCircle size={20} className="text-green-400" />
              )}
              {apiStatus === "error" && (
                <XCircle size={20} className="text-red-400" />
              )}
              {apiStatus === "ok" && (
                <span className="font-semibold text-green-400">Connected</span>
              )}
              {apiStatus === "error" && (
                <span className="font-semibold text-red-400">Failed</span>
              )}
            </div>
            <button
              onClick={testConnection}
              disabled={apiStatus === "checking"}
              className="text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition disabled:opacity-50"
            >
              {apiStatus === "checking" ? "Testing..." : "Test Connection"}
            </button>
          </div>
        </div>

        {/* PROMPT TESTER */}
        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-cyan-500/5 rounded-[36px]" />

          <p className="uppercase tracking-[0.35em] text-fuchsia-400 text-xs mb-2">
            AI Prompt Tester
          </p>
          <p className="text-zinc-400 text-sm mb-8">
            Test the Gemini API directly from here. Use this to verify the AI
            works before wiring it into career content generation.
          </p>

          {/* Example prompts */}
          <div className="mb-6">
            <p className="text-zinc-500 text-xs mb-3">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-zinc-300 text-left"
                >
                  {ex.length > 50 ? ex.slice(0, 50) + "…" : ex}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              rows={5}
              className="
                w-full rounded-2xl
                bg-white/[0.04] border border-white/10
                px-6 py-5 outline-none
                focus:border-fuchsia-500 transition leading-relaxed
                pr-16 resize-none
              "
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  runPrompt();
                }
              }}
            />
            <button
              onClick={runPrompt}
              disabled={loading || !prompt.trim()}
              className="
                absolute bottom-4 right-4
                w-10 h-10 rounded-xl
                bg-fuchsia-600 hover:bg-fuchsia-500
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center
                transition
              "
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>

          <p className="text-zinc-600 text-xs mt-2">
            Press Ctrl+Enter to run
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 mb-6 text-red-300 text-sm">
            <p className="font-semibold mb-1">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* RESPONSE */}
        {response && (
          <div className="rounded-[36px] border border-fuchsia-500/20 bg-fuchsia-500/5 backdrop-blur-2xl p-8">
            <p className="uppercase tracking-[0.35em] text-fuchsia-400 text-xs mb-4">
              AI Response
            </p>
            <div className="text-zinc-200 leading-relaxed whitespace-pre-wrap text-sm">
              {response}
            </div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(response)
              }
              className="mt-6 text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
            >
              Copy Response
            </button>
          </div>
        )}

        {/* INFO BOX */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-zinc-500">
          <p className="font-semibold text-zinc-300 mb-2">
            💡 How to use the AI in career pages
          </p>
          <p>
            The AI API route is at{" "}
            <code className="text-fuchsia-400 bg-white/10 px-2 py-0.5 rounded text-xs">
              /api/admin/ai-test
            </code>
            . You can extend it to auto-generate career descriptions, insights,
            or roadmap steps. Your Gemini API key lives in{" "}
            <code className="text-fuchsia-400 bg-white/10 px-2 py-0.5 rounded text-xs">
              .env.local
            </code>
            .
          </p>
        </div>

      </div>
    </main>
  );
}
