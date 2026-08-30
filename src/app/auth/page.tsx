"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabaseAuth } from "@/lib/auth";

export default function AuthPage() {
  /*
   * Controls whether the page shows:
   * - login form
   * - signup form
   */
  const [mode, setMode] = useState<"login" | "signup">("login");

  /*
   * Prevents multiple clicks while authentication is running.
   */
  const [loading, setLoading] = useState(false);

  /*
   * Stores authentication errors and messages.
   */
  const [error, setError] = useState("");

  /*
   * Stores all form values.
   */
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  /*
   * Handles BOTH login and signup.
   */
  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      /* =====================================================
         LOGIN
         ===================================================== */

      if (mode === "login") {
        /*
         * Step 1:
         * Supabase verifies email and password.
         */
        const { error: loginError } =
          await supabaseAuth.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

        if (loginError) {
          setError(loginError.message);
          return;
        }

        /*
         * Step 2:
         * Get the currently authenticated user.
         */
        const {
          data: { user },
          error: userError,
        } = await supabaseAuth.auth.getUser();

        if (userError || !user) {
          setError(
            "Login succeeded, but we could not get your user information."
          );
          return;
        }

        /*
         * Step 3:
         * Check the user's role from the profiles table.
         *
         * role = admin   → Admin Dashboard
         * role = student → Explore Page
         */
        const {
          data: profile,
          error: profileError,
        } = await supabaseAuth
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError) {
          setError(
            "Unable to load your profile. Please contact the administrator."
          );
          return;
        }

        /*
         * Step 4:
         * Redirect based on database role.
         */
        if (profile?.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/explore";
        }

        return;
      }

      /* =====================================================
         SIGNUP
         ===================================================== */

      /*
       * IMPORTANT:
       *
       * We DO NOT manually insert into the profiles table here.
       *
       * Your Supabase database trigger:
       * on_auth_user_created
       *
       * automatically creates the profile when a new auth user
       * is created.
       *
       * Manually inserting again caused duplicate profile errors.
       */

      const {
        data,
        error: signupError,
      } = await supabaseAuth.auth.signUp({
        email: formData.email,

        password: formData.password,

        options: {
          /*
           * Sends full_name to Supabase Auth metadata.
           *
           * Your database trigger can read this value and
           * automatically store it in profiles.full_name.
           */
          data: {
            full_name: formData.full_name,
          },

          /*
           * Email verification redirect URL.
           */
          emailRedirectTo:
            `${window.location.origin}/auth/callback`,
        },
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      if (!data.user) {
        setError(
          "Unable to create your account. Please try again."
        );
        return;
      }

      /*
       * Switch back to login after successful signup.
       */
      setMode("login");

      setError(
        "Account created successfully. Please verify your email if required, then login."
      );
    } catch (err) {
      console.error("Authentication error:", err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     GOOGLE AUTH
     ===================================================== */

  async function handleGoogleAuth() {
    try {
      setLoading(true);
      setError("");

      const { error } =
        await supabaseAuth.auth.signInWithOAuth({
          provider: "google",

          options: {
            /*
             * After Google authentication,
             * the user returns to Explore.
             */
            redirectTo:
              `${window.location.origin}/explore`,
          },
        });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      console.error("Google authentication error:", err);

      setError(
        "Unable to continue with Google."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
      relative

      min-h-screen

      overflow-hidden

      bg-[#030014]

      text-white
      "
    >
      {/* BACKGROUND */}

      <div
        className="
        absolute inset-0

        bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_35%)]
        "
      />

      <div
        className="
        absolute

        top-[-200px]
        right-[-120px]

        w-[500px]
        h-[500px]

        rounded-full

        bg-fuchsia-500/20

        blur-[160px]
        "
      />

      <div
        className="
        absolute

        bottom-[-200px]
        left-[-120px]

        w-[500px]
        h-[500px]

        rounded-full

        bg-cyan-500/20

        blur-[160px]
        "
      />

      {/* GRID */}

      <div
        className="
        absolute inset-0

        opacity-[0.05]

        bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]

        bg-[size:80px_80px]
        "
      />

      {/* MAIN CONTAINER */}

      <div
        className="
        relative
        z-10

        flex
        items-center
        justify-center

        min-h-screen

        px-4
        md:px-8
        "
      >
        <div
          className="
          relative

          w-full
          max-w-[1400px]

          h-[92vh]
          overflow-hidden

          rounded-[42px]

          border border-white/10

          bg-white/[0.04]

          backdrop-blur-3xl

          shadow-[0_0_120px_rgba(139,92,246,0.18)]
          "
        >
          {/* FORMS CONTAINER */}

          <div
            className="
            absolute inset-0

            flex
            "
          >
            {/* =====================================================
                LOGIN PANEL
                ===================================================== */}

            <motion.div
              animate={{
                x:
                  mode === "signup"
                    ? "100%"
                    : "0%",
                opacity:
                  mode === "signup"
                    ? 0
                    : 1,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="
              w-full
              lg:w-1/2

              flex
              items-center
              justify-center

              px-8
              lg:px-20

              py-10
              lg:py-16
              "
            >
              <form
                onSubmit={handleAuth}
                className="
                w-full
                max-w-[460px]
                "
              >
                <p
                  className="
                  uppercase

                  tracking-[0.4em]

                  text-fuchsia-400

                  text-xs

                  mb-5
                  "
                >
                  StudentPath Access
                </p>

                <h1
                  className="
                  text-5xl
                  lg:text-6xl

                  font-black

                  leading-[0.9]

                  tracking-[-0.06em]
                  "
                >
                  Welcome
                  <br />
                  Back
                </h1>

                {error && mode === "login" && (
                  <div
                    className="
                    mt-8

                    rounded-2xl

                    border border-red-500/20

                    bg-red-500/10

                    px-5 py-4

                    text-red-300
                    "
                  >
                    {error}
                  </div>
                )}

                {/* EMAIL */}

                <div className="mt-5">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email you used to sign up"
                    className="
                    w-full

                    h-16

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    px-6

                    outline-none

                    transition-all

                    focus:border-fuchsia-500

                    focus:bg-white/[0.08]

                    shadow-[0_0_40px_rgba(139,92,246,0.08)]
                    "
                  />
                </div>

                {/* PASSWORD */}

                <div className="mt-6">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                    className="
                    w-full

                    h-16

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    px-6

                    outline-none

                    transition-all

                    focus:border-fuchsia-500

                    focus:bg-white/[0.08]

                    shadow-[0_0_40px_rgba(139,92,246,0.08)]
                    "
                  />
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                  mt-8

                  w-full

                  h-16

                  rounded-2xl

                  bg-gradient-to-r
                  from-fuchsia-600
                  via-purple-600
                  to-blue-600

                  font-semibold
                  text-lg

                  transition-all
                  duration-300

                  hover:scale-[1.02]

                  shadow-[0_0_60px_rgba(139,92,246,0.45)]
                  "
                >
                  {loading
                    ? "Signing In..."
                    : "Login"}
                </button>

                {/* GOOGLE LOGIN */}

                <div className="mt-5">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />

                    <p className="text-sm text-zinc-500">
                      or continue with
                    </p>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleGoogleAuth}
                    className="
                    mt-5

                    w-full

                    h-14

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.04]

                    hover:bg-white/[0.08]

                    transition-all
                    duration-300

                    flex
                    items-center
                    justify-center
                    gap-3
                    "
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />

                    Continue with Google
                  </button>
                </div>

                {/* SWITCH TO SIGNUP */}

                <p
                  className="
                  mt-8

                  text-zinc-500

                  text-sm
                  "
                >
                  Don’t have an account?

                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setMode("signup");
                    }}
                    className="
                    ml-2

                    text-fuchsia-400

                    hover:text-fuchsia-300
                    "
                  >
                    Create one
                  </button>
                </p>
              </form>
            </motion.div>

            {/* =====================================================
                SIGNUP PANEL
                ===================================================== */}

            <motion.div
              animate={{
                x:
                  mode === "signup"
                    ? "0%"
                    : "100%",
                opacity:
                  mode === "signup"
                    ? 1
                    : 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="
              absolute
              right-0
              top-0

              w-full
              lg:w-1/2

              h-full

              flex
              items-center
              justify-center

              px-8
              lg:px-20

              py-10
              lg:py-16
              "
            >
              <form
                onSubmit={handleAuth}
                className="
                w-full
                max-w-[460px]
                "
              >
                <p
                  className="
                  uppercase

                  tracking-[0.4em]

                  text-cyan-400

                  text-xs

                  mb-5
                  "
                >
                  Future Identity
                </p>

                <h1
                  className="
                  text-5xl
                  lg:text-6xl

                  font-black

                  leading-[0.9]

                  tracking-[-0.06em]
                  "
                >
                  Create Account
                </h1>

                {error && mode === "signup" && (
                  <div
                    className="
                    mt-6

                    rounded-2xl

                    border border-red-500/20

                    bg-red-500/10

                    px-5 py-4

                    text-red-300
                    "
                  >
                    {error}
                  </div>
                )}

                {/* FULL NAME */}

                <div className="mt-5">
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        full_name: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="
                    w-full

                    h-14
                    lg:h-16

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    px-6

                    outline-none

                    transition-all

                    focus:border-cyan-500

                    focus:bg-white/[0.08]
                    "
                  />
                </div>

                {/* EMAIL */}

                <div className="mt-5">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email you used to sign up"
                    className="
                    w-full

                    h-16

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    px-6

                    outline-none

                    transition-all

                    focus:border-cyan-500

                    focus:bg-white/[0.08]
                    "
                  />
                </div>

                {/* PASSWORD */}

                <div className="mt-5">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Create secure password"
                    className="
                    w-full

                    h-16

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    px-6

                    outline-none

                    transition-all

                    focus:border-cyan-500

                    focus:bg-white/[0.08]
                    "
                  />
                </div>

                {/* SIGNUP BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                  mt-7

                  w-full

                  h-16

                  rounded-2xl

                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-600
                  to-purple-600

                  font-semibold
                  text-lg

                  transition-all
                  duration-300

                  hover:scale-[1.02]

                  shadow-[0_0_60px_rgba(59,130,246,0.4)]
                  "
                >
                  {loading
                    ? "Creating Account..."
                    : "Start Journey"}
                </button>

                {/* GOOGLE SIGNUP */}

                <div className="mt-5">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />

                    <p className="text-sm text-zinc-500">
                      or continue with
                    </p>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleGoogleAuth}
                    className="
                    mt-5

                    w-full

                    h-14

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.04]

                    hover:bg-white/[0.08]

                    transition-all
                    duration-300

                    flex
                    items-center
                    justify-center
                    gap-3
                    "
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />

                    Continue with Google
                  </button>
                </div>

                {/* SWITCH TO LOGIN */}

                <p
                  className="
                  mt-8

                  text-zinc-500

                  text-sm
                  "
                >
                  Already have an account?

                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setMode("login");
                    }}
                    className="
                    ml-2

                    text-cyan-400

                    hover:text-cyan-300
                    "
                  >
                    Login
                  </button>
                </p>
              </form>
            </motion.div>
          </div>

          {/* =====================================================
              OVERLAY PANEL
              DESIGN AND ANIMATION UNCHANGED
              ===================================================== */}

          <motion.div
            animate={{
              x:
                mode === "signup"
                  ? "-100%"
                  : "0%",
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="
            absolute
            top-0
            right-0

            hidden lg:flex

            w-1/2
            h-full

            items-center
            justify-center

            overflow-hidden
            "
          >
            {/* DIAGONAL */}

            <div
              className="
              absolute inset-0

              bg-gradient-to-br
              from-fuchsia-600
              via-purple-700
              to-blue-700

              [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]
              "
            />

            {/* GLOW */}

            <div
              className="
              absolute

              w-[700px]
              h-[700px]

              rounded-full

              bg-white/10

              blur-[140px]
              "
            />

            {/* ROTATING RING */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
              absolute

              w-[520px]
              h-[520px]

              rounded-full

              border border-white/10
              "
            />

            {/* CONTENT */}

            <div
              className="
              relative
              z-10

              max-w-[420px]

              px-12
              "
            >
              <p
                className="
                uppercase

                tracking-[0.4em]

                text-white/70

                text-xs

                mb-6
                "
              >
                StudentPath Portal
              </p>

              <h2
                className="
                text-7xl

                font-black

                leading-[0.88]

                tracking-[-0.08em]
                "
              >
                Your
                <br />
                Future
                <br />
                Starts
                <br />
                Here.
              </h2>

              <p
                className="
                mt-8

                text-white/70

                text-lg

                leading-relaxed
                "
              >
                Explore intelligent careers,
                futuristic opportunities,
                and next-generation paths.
              </p>

              <br />

              <Link
                href="/"
                className="
                inline-flex

                mt-

                items-center
                justify-center

                px-7 py-4

                rounded-full

                border border-white/20

                bg-white/10

                backdrop-blur-xl

                hover:bg-white/15

                transition-all
                duration-300
                "
              >
                Return Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}