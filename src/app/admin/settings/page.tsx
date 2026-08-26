import AdminTopbar from "@/components/AdminTopbar";
import { supabase } from "@/lib/supabase";
import { saveSettings } from "../actions";

export default async function AdminSettingsPage() {

  /* Try to load settings — table may not exist yet */
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <main className="min-h-screen text-white">
      <AdminTopbar
        title="Settings"
        subtitle="Configure your platform."
      />

      <div className="p-4 md:p-8 lg:p-12 max-w-4xl">

        {/* SQL notice if settings table doesn't exist */}
        {!settings && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 mb-8 text-amber-300 text-sm">
            <p className="font-semibold mb-2">⚠️ Settings table not found</p>
            <p className="mb-3">
              Run this SQL in your Supabase dashboard to enable settings:
            </p>
            <pre className="bg-black/40 rounded-xl p-4 text-xs overflow-x-auto">
{`create table site_settings (
  id bigint generated always as identity primary key,
  site_name text default 'StudentPath',
  admin_name text default 'Admin',
  contact_email text default '',
  tagline text default '',
  updated_at timestamptz default now()
);

-- Insert default row:
insert into site_settings (id, site_name) overriding system value values (1, 'StudentPath');`}
            </pre>
          </div>
        )}

        <form action={saveSettings} className="space-y-8">

          {/* SITE IDENTITY */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />
            <div className="relative z-10">
              <p className="uppercase tracking-[0.35em] text-fuchsia-400 text-xs mb-2">
                Site Identity
              </p>
              <p className="text-zinc-400 text-sm mb-8">
                Public-facing identity of your platform.
              </p>

              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  {
                    label: "Site Name",
                    name: "site_name",
                    value: settings?.site_name ?? "StudentPath",
                    placeholder: "StudentPath",
                  },
                  {
                    label: "Tagline",
                    name: "tagline",
                    value: settings?.tagline ?? "",
                    placeholder: "Explore your future career",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block mb-3 text-zinc-400 text-sm">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ADMIN PROFILE */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
            <div className="relative z-10">
              <p className="uppercase tracking-[0.35em] text-fuchsia-400 text-xs mb-2">
                Admin Profile
              </p>
              <p className="text-zinc-400 text-sm mb-8">
                Your admin account information.
              </p>

              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  {
                    label: "Admin Name",
                    name: "admin_name",
                    value: settings?.admin_name ?? "",
                    placeholder: "Your name",
                  },
                  {
                    label: "Contact Email",
                    name: "contact_email",
                    value: settings?.contact_email ?? "",
                    placeholder: "admin@studentpath.com",
                    type: "email",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block mb-3 text-zinc-400 text-sm">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type ?? "text"}
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ENV CONFIG (read-only display) */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10">
            <div className="relative z-10">
              <p className="uppercase tracking-[0.35em] text-fuchsia-400 text-xs mb-2">
                Environment Config
              </p>
              <p className="text-zinc-400 text-sm mb-8">
                These are set in your <code className="text-fuchsia-400 bg-white/10 px-2 py-0.5 rounded text-xs">.env.local</code> file.
                Edit that file directly to change them.
              </p>

              <div className="space-y-4">
                {[
                  {
                    label: "SUPABASE_URL",
                    value: "hiattulermsyqejkgloo.supabase.co",
                    status: "connected",
                  },
                  {
                    label: "SUPABASE_ANON_KEY",
                    value: "eyJhbGci••••••••••••",
                    status: "connected",
                  },
                  {
                    label: "GEMINI_API_KEY",
                    value: "AQ.Ab8RN•••••••••",
                    status: "configured",
                  },
                ].map((env) => (
                  <div
                    key={env.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                  >
                    <div>
                      <p className="font-mono text-sm text-zinc-300">
                        {env.label}
                      </p>
                      <p className="font-mono text-xs text-zinc-600 mt-0.5">
                        {env.value}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full border font-semibold ${
                        env.status === "connected"
                          ? "text-green-400 border-green-500/30 bg-green-500/10"
                          : "text-amber-400 border-amber-500/30 bg-amber-500/10"
                      }`}
                    >
                      {env.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SAVE BAR */}
          <div className="sticky bottom-6 flex justify-end">
            <div className="flex items-center gap-4 rounded-[28px] border border-white/10 bg-black/80 backdrop-blur-2xl p-4 shadow-[0_0_50px_rgba(217,70,239,0.25)]">
              <button
                type="submit"
                className="
                  px-8 py-4 rounded-2xl
                  bg-fuchsia-600 hover:bg-fuchsia-500
                  transition-all duration-300
                  font-semibold text-lg
                  shadow-[0_0_30px_rgba(217,70,239,0.4)]
                "
              >
                Save Settings
              </button>
            </div>
          </div>

        </form>
      </div>
    </main>
  );
}
