"use client";

import Link from "next/link";


import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Bookmark,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import { supabaseAuth } from "@/lib/auth";

export default function DashboardNavbar({
  careers = [],
  exams = [],
}: any) {

  const searchItems = [

  ...careers.map((career: any) => ({
    id: career.id,
    title: career.title,
    type: "career",
    slug: career.slug,
  })),

  ...exams.map((exam: any) => ({
    id: exam.id,
    title: exam.title,
    type: "exam",
    slug: exam.slug,
  })),

];

  const [scrolled, setScrolled] =
  useState(false);
  useEffect(() => {

  const handleScroll = () => {

    setScrolled(
      window.scrollY > 500
    );

  };

  window.addEventListener(
    "scroll",
    handleScroll
  );

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );

}, []);

  const [
    openProfile,
    setOpenProfile,
  ] = useState(false);

  const [user, setUser] =
    useState<any>(null);
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


    const [search, setSearch] =
  useState("");

const [openSearch, setOpenSearch] =
  useState(false);

  const filteredResults =
  searchItems.filter((item: any) =>
    item.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );


  return (

  <header
  className={`
  fixed
  top-0
  left-0
  right-0

  z-[9999]

  transition-all
  duration-500

  bg-transparent

  ${
    scrolled
      ? `
        md:bg-[#030014]/85
        md:backdrop-blur-xl
        md:border-b
        md:border-white/10
      `
      : `
        md:bg-transparent
        md:border-transparent
      `
  }
  `}
>

      {/* DESKTOP NAVBAR */}

      <div
        className="
        hidden
        md:flex

        items-center
        justify-between

        px-8
        py-5

        border-b
        border-white/0
        "
      >

        {/* LEFT */}

        <div
          className="
          flex
          items-center
          gap-12
          "
        >

          {/* LOGO */}

          <Link
            href="/"
            className="
            text-3xl
            font-black
            tracking-tight
            "
          >

            StudentPath

            <span className="text-fuchsia-500">
              
            </span>

          </Link>

          {/* NAVIGATION */}

          <nav
            className="
            flex
            items-center
            gap-8

            text-sm
            font-medium

            text-zinc-300
            "
          >

            <Link
              href="/explore"
              className="
              hover:text-white
              transition
              "
            >
              HOME
            </Link>

            <Link
              href="/explore/guide-path"
              className="
              hover:text-white
              transition
              "
            >
              GUIDE PATH
            </Link>

            <Link
              href="/explore/mentor"
              className="
              hover:text-white
              transition

              flex
              items-center
              gap-2
              "
            >

              <Sparkles size={16} />

              AI MENTOR

            </Link>

          </nav>

        </div>

        {/* RIGHT */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >


{/* SEARCH */}

<div className="relative">

  <div
    className="
    flex
    items-center
    gap-3

    w-[420px]
    xl:w-[650px]

    px-5
    py-3

    rounded-full

   border
border-fuchsia-500/50

shadow-[0_0_20px_rgba(217,70,239,0.35)]



    bg-white/[0.01]

    backdrop-blur-xl
    "
  >

    <Search
      size={18}
      className="text-zinc-400"
    />

    <input
      type="text"
      placeholder="Search careers, exams..."

      value={search}

      onFocus={() =>
        setOpenSearch(true)
      }

      onChange={(e) =>
        setSearch(e.target.value)
      }

      className="
      w-full

      bg-transparent

      outline-none

      text-white

      text-sm

      placeholder:text-zinc-500
      "
    />

  </div>

  {openSearch &&
    search.length > 0 && (

      <div
        className="
        absolute

        top-[70px]
        left-0

        w-[650px]
        max-w-[90vw]

        max-h-[350px]

        overflow-y-auto

        rounded-3xl

        border border-white/10

        bg-[#0b1020]/95

        backdrop-blur-2xl

        shadow-[0_0_40px_rgba(0,0,0,0.5)]

        z-[9999]
        "
      >

        {filteredResults.length > 0 ? (

          filteredResults
            .slice(0, 6)
            .map((item: any) => (

              <Link
                key={`${item.type}-${item.id}`}
                href={
                  item.type === "career"
                    ? `/career/${item.slug}`
                    : `/exam/${item.slug}`
                }
                onClick={() => {
                  setSearch("");
                  setOpenSearch(false);
                }}
                className="
                block

                px-5
                py-4

                border-b
                border-white/5

                hover:bg-fuchsia-500/10

                transition-all
                duration-300
                "
              >

                <p
                  className="
                  text-white
                  font-semibold
                  text-lg
                  "
                >
                  {item.type === "career"
                    ? "💼 "
                    : "🎓 "}

                  {item.title}
                </p>

                <p
                  className="
                  text-xs

                  text-fuchsia-400

                  uppercase

                  tracking-widest

                  mt-1
                  "
                >
                  {item.type}
                </p>

              </Link>

            ))

        ) : (

          <div
            className="
            py-10

            text-center

            text-zinc-500
            "
          >

            <div className="text-3xl mb-2">
              🔍
            </div>

            No careers or exams found

          </div>

        )}

      </div>

    )}

</div>
          {/* PROFILE */}

          <Link
  href="/profile"
  className="
  w-12
  h-12

  rounded-full

  bg-gradient-to-r
  from-fuchsia-600
  to-purple-600

  flex
  items-center
  justify-center

  font-bold

  hover:scale-110

  transition

  shadow-[0_0_25px_rgba(217,70,239,0.6)]
  "
>

  {user?.email
    ?.charAt(0)
    ?.toUpperCase() || "G"}

</Link>

        </div>

      </div>

      {/* MOBILE NAVBAR */}

<div
  className="
  md:hidden
  px-4
  pt-4
  pb-4
  "
>

  <div
    className="
    flex
    items-center
    gap-3
    "
  >

    {/* PROFILE */}

    <Link
      href="/profile"
      className="
      w-14
      h-14
      rounded-full
      border
      border-fuchsia-500/30
      bg-[#0d1324]
      flex
      items-center
      justify-center
      shrink-0
      "
    >

      <span className="font-bold text-lg">

        {user?.email
          ?.charAt(0)
          ?.toUpperCase() || "G"}

      </span>

    </Link>

    {/* SEARCH */}

{/* MOBILE SEARCH */}

<div className="relative flex-1">

 <div
  className="
  flex-1
  h-[56px]

  rounded-full

  border
  border-fuchsia-500/50

  bg-[#0d1324]

  shadow-[0_0_20px_rgba(217,70,239,0.35)]

  px-5

  flex
  items-center

  text-zinc-400

  transition-all
  duration-300
  "
>

    <Search
      size={22}
      className="text-zinc-400"
    />

    <input
      type="text"

      placeholder="Search..."

      value={search}

      onFocus={() =>
        setOpenSearch(true)
      }

      onChange={(e) =>
        setSearch(e.target.value)
      }

      className="
      w-full

      bg-transparent

      outline-none

      text-white

      text-sm

      placeholder:text-zinc-500
      "
    />

  </div>

  {openSearch &&
    search.length > 0 && (

      <div
        className="
        absolute

        top-[65px]
        left-0
        right-0

        max-h-[350px]

        overflow-y-auto

        rounded-3xl

        border
        border-white/10

        bg-[#0b1020]/95

        backdrop-blur-xl

        z-[9999]
        "
      >

        {filteredResults.length > 0 ? (

          filteredResults
            .slice(0, 8)
            .map((item: any) => (

              <Link
                key={`${item.type}-${item.id}`}
                href={
                  item.type === "career"
                    ? `/career/${item.slug}`
                    : `/exam/${item.slug}`
                }
                onClick={() => {
                  setSearch("");
                  setOpenSearch(false);
                }}
                className="
                block

                px-5
                py-4

                border-b
                border-white/5

                hover:bg-fuchsia-500/10
                "
              >

                <p className="font-medium">

                  {item.type === "career"
                    ? "💼 "
                    : "🎓 "}

                  {item.title}

                </p>

                <p
                  className="
                  text-xs

                  text-fuchsia-400

                  uppercase

                  mt-1
                  "
                >

                  {item.type}

                </p>

              </Link>

            ))

        ) : (

          <div
            className="
            py-6

            text-center

            text-zinc-500
            "
          >
            No results found
          </div>

        )}

      </div>

    )}

</div>

    {/* SAVE */}

    <button
      className="
      w-14
      h-14
      rounded-full
      border
      border-white/10
      bg-[#0d1324]
      flex
      items-center
      justify-center
      shrink-0
      "
    >

      <Bookmark
        size={22}
        className="text-white"
      />

    </button>

  </div>


      </div>

    </header>

  );

}
