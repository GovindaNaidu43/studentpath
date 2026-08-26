"use client";

import Link from "next/link";

import {
  useState,
  useEffect,
} from "react";

import {
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

import { motion, AnimatePresence }
from "framer-motion";

import { supabaseAuth }
from "@/lib/auth";

export default function Navbar() {

  const [scrolled, setScrolled] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  const [open, setOpen] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 40
      );

    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } =
        await supabaseAuth.auth
          .getUser();

      setUser(user);

    }

    getUser();

  }, []);

  async function handleLogout() {

    await supabaseAuth.auth
      .signOut();

    window.location.href = "/";

  }

  return (

    <>

      {/* NAVBAR */}

      <header
        className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-500
        ease-out

        ${
          scrolled
            ? `
            bg-black/40
            backdrop-blur-lg
            border-b
            border-white/[0.06]
            shadow-[0_4px_50px_rgba(0,0,0,0.35)]
            `
            : `
            bg-transparent
            border-b
            border-transparent
            `
        }
        `}
      >

        <nav
          className="
          w-full
          px-5
          sm:px-6
          md:px-10
          lg:px-12
          py-4
          flex
          items-center
          justify-between
          "
        >

          {/* LOGO */}

          <Link
            href="/"
            className="
            text-[1.65rem]
            sm:text-3xl
            font-black
            text-white
            tracking-tight
            relative
            z-50
            "
          >

            StudentPath

            <span
              className="
              text-fuchsia-500
              ml-1
              "
            >
              ✦
            </span>

          </Link>

          {/* DESKTOP NAV */}

          <div
            className="
            hidden
            lg:flex
            items-center
            gap-10
            "
          >

            <Link
              href="/about"
              className="
              text-zinc-300
              hover:text-white
              transition
              duration-300
              "
            >
              About
            </Link>

            <Link
              href="/explore"
              className="
              text-zinc-300
              hover:text-white
              transition
              duration-300
              "
            >
              Careers
            </Link>

            <Link
              href="/mentor"
              className="
              text-zinc-300
              hover:text-white
              transition
              duration-300
              "
            >
              AI Mentor
            </Link>

            <Link
              href="/future"
              className="
              text-zinc-300
              hover:text-white
              transition
              duration-300
              "
            >
              Future
            </Link>

          </div>

          {/* RIGHT SIDE */}

          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            {/* DESKTOP CTA */}

            {!user && (

              <Link
                href="/explore"
                className="
                hidden
                md:flex
                px-6
                py-3
                rounded-full
                bg-gradient-to-r
                from-fuchsia-600
                to-purple-600
                text-white
                font-medium
                hover:scale-105
                transition
                duration-300
                shadow-[0_0_30px_rgba(217,70,239,0.25)]
                "
              >
                Explore
              </Link>

            )}

            {/* USER */}

            {user && (

              <div className="relative">

                <button
                  onClick={() =>
                    setOpen(!open)
                  }
                  className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  backdrop-blur-lg
                  flex
                  items-center
                  justify-center
                  hover:bg-white/[0.08]
                  transition
                  "
                >

                  <User size={18} />

                </button>

                {/* USER DROPDOWN */}

                {open && (

                  <div
                    className="
                    absolute
                    right-0
                    mt-4
                    w-[260px]
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/10
                    bg-black/80
                    backdrop-blur-2xl
                    shadow-[0_0_60px_rgba(0,0,0,0.45)]
                    "
                  >

                    <div
                      className="
                      p-5
                      border-b
                      border-white/10
                      "
                    >

                      <p
                        className="
                        text-zinc-500
                        text-sm
                        mb-2
                        "
                      >
                        Signed in as
                      </p>

                      <p
                        className="
                        text-white
                        break-all
                        "
                      >
                        {user.email}
                      </p>

                    </div>

                    <div className="p-3">

                      <Link
                        href="/explore"
                        className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-white/[0.06]
                        transition
                        "
                      >

                        <LayoutDashboard
                          size={18}
                        />

                        Explore

                      </Link>

                      <button
                        onClick={
                          handleLogout
                        }
                        className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-red-500/10
                        text-red-400
                        transition
                        "
                      >

                        <LogOut
                          size={18}
                        />

                        Logout

                      </button>

                    </div>

                  </div>

                )}

              </div>

            )}

            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="
              lg:hidden
              w-11
              h-11
              rounded-full
              border
              border-white/10
              bg-white/[0.05]
              backdrop-blur-lg
              flex
              items-center
              justify-center
              text-white
              relative
              z-50
              "
            >

              {mobileMenu ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}

            </button>

          </div>

        </nav>

      </header>

      {/* MOBILE MENU OVERLAY */}

      <AnimatePresence>

        {mobileMenu && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
            fixed
            inset-0
            z-40
            bg-black/90
            backdrop-blur-xl
            flex
            flex-col
            items-center
            justify-center
            px-8
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 40,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className="
              flex
              flex-col
              items-center
              gap-8
              text-center
              "
            >

              <Link
                href="/about"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="
                text-3xl
                font-bold
                text-white
                "
              >
                About
              </Link>

              <Link
                href="/explore"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="
                text-3xl
                font-bold
                text-white
                "
              >
                Careers
              </Link>

              <Link
                href="/mentor"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="
                text-3xl
                font-bold
                text-white
                "
              >
                AI Mentor
              </Link>

              <Link
                href="/future"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="
                text-3xl
                font-bold
                text-white
                "
              >
                Future
              </Link>

              {!user && (

                <Link
                  href="/auth"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="
                  mt-6
                  px-8
                  py-4
                  rounded-full
                  bg-gradient-to-r
                  from-fuchsia-600
                  to-purple-600
                  text-white
                  font-semibold
                  text-lg
                  shadow-[0_0_40px_rgba(217,70,239,0.35)]
                  "
                >
                  Get Started
                </Link>

              )}

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  );

}