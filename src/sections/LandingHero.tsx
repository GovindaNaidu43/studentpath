"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingHero() {

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

    const checkMobile = () => {

      setIsMobile(
        window.innerWidth < 768
      );

    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkMobile
      );

  }, []);

  const { scrollY } = useScroll();

  const textY = useTransform(
    scrollY,
    [0, 1000],
    [0, isMobile ? 0 : 260]
  );

  return (

    <section
      className="
      relative
      min-h-screen
      overflow-hidden
      flex
      items-start
      justify-start
      pt-24
      "
    >

      {/* DESKTOP VIDEO */}

      {!isMobile && (

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          "
        >

          <source
            src="/videos/landing-hero.mp4"
            type="video/mp4"
          />

        </video>

      )}

      {/* MOBILE IMAGE */}

      {isMobile && (

        <div
          className="
          absolute
          inset-0
          "
        >

          <img
            src="/images/landing-mobile.webp.webp"
            alt="Future Background"
            className="
            w-full
            h-full
            object-cover
            "
          />

        </div>

      )}

      {/* DARK OVERLAY */}

      <div
        className="
        absolute
        inset-0
        bg-black/55
        "
      />

      {/* CINEMATIC GRADIENT */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-b
        from-black/10
        via-black/40
        to-black
        "
      />

      {/* HERO CONTENT */}

      <motion.div
        style={{ y: textY }}
        className="
        relative
        z-20
        w-full
        px-6
        sm:px-8
        md:px-16
        lg:px-24
        pt-12
        "
      >

        {/* LABEL */}

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
          uppercase
          tracking-[0.35em]
          text-fuchsia-400
          text-[10px]
          sm:text-[11px]
          md:text-xs
          mb-8
          sm:mb-10
          ml-1
          "
        >

          The Future Of Career Discovery

        </motion.p>

        {/* TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="
          text-left
          font-black
          leading-[0.9]
          tracking-[-0.06em]
          max-w-5xl
          "
        >

          {/* LINE 1 */}

          <div
            className="
            text-white
            text-[2.7rem]
            sm:text-5xl
            md:text-6xl
            lg:text-[5.5rem]
            "
          >

            The Future

          </div>

          {/* LINE 2 */}

          <div
            className="
            text-white
            text-[3.1rem]
            sm:text-6xl
            md:text-7xl
            lg:text-[6.1rem]
            "
          >

            Is Bigger

          </div>

          {/* LINE 3 */}

          <div
            className="
            bg-gradient-to-r
            from-fuchsia-400
            via-purple-400
            to-cyan-400
            bg-clip-text
            text-transparent
            text-[3.1rem]
            sm:text-6xl
            md:text-7xl
            lg:text-[6.3rem]
            "
          >

            Than You Think

          </div>

          <div
            className="
            text-white
            text-[1rem]
            sm:text-4xl
            md:text-2xl
            lg:text-[1.1rem]
            "
          >

            ~ 𝙶𝚘𝚟𝚒𝚗𝚍𝚊 𝙽𝚊𝚒𝚍𝚞
          </div>

        </motion.h1>

        {/* SUBTEXT */}

        <motion.p
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="
          mt-8
          md:mt-10
          text-base
          sm:text-lg
          md:text-2xl
          text-zinc-300
          max-w-3xl
          leading-relaxed
          "
        >

          Discover hidden careers,
          future opportunities,
          and AI-guided paths
          designed to unlock
          your true potential.

        </motion.p>

{/* MOBILE CTA BUTTON */}

<motion.div
  initial={{
    opacity: 0,
    y: 40,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 1,
    delay: 0.7,
  }}
  className="
  mt-10
  flex
  items-center
  md:hidden
  "
>

  <Link
    href="/explore"
    className="
    group
    relative
    overflow-hidden

    rounded-full

    border
    border-white/15

    bg-white/[0.08]
    backdrop-blur-xl

    px-8
    py-4

    text-white
    font-semibold
    tracking-wide

    shadow-[0_0_40px_rgba(217,70,239,0.18)]

    transition-all
    duration-500

    hover:bg-white/[0.12]
    hover:scale-[1.03]

    active:scale-[0.98]
    "
  >

    {/* BUTTON GLOW */}

    <div
      className="
      absolute
      inset-0

      opacity-0
      group-hover:opacity-100

      transition
      duration-700

      bg-gradient-to-r
      from-fuchsia-500/20
      via-purple-500/10
      to-cyan-500/20
      "
    />

    <div
      className="
      relative
      z-10

      flex
      items-center
      gap-3
      "
    >

      <span>
        Explore
      </span>

      <span
        className="
        text-fuchsia-300
        text-lg
        "
      >
        ✦
      </span>

    </div>

  </Link>

</motion.div>

      </motion.div>

      {/* BOTTOM TRANSITION */}

      <div
        className="
        absolute
        bottom-0
        left-0
        w-full
        h-[220px]
        md:h-[320px]
        pointer-events-none
        "
      >

        {/* Fade */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-black/40
          to-black
          "
        />

        {/* SCROLL INDICATOR */}

        {!isMobile && (

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.2,
              duration: 1,
            }}
            className="
            absolute
            bottom-24
            left-1/2
            -translate-x-1/2
            text-center
            "
          >

            {/* <p
              className="
              text-zinc-400
              uppercase
              tracking-[0.4em]
              text-xs
              mb-5
              "
            >

              Explore Hidden Futures

            </p> */}

            {/* <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="
              flex
              justify-center
              "
            >

              <div
                className="
                w-8
                h-14
                rounded-full
                border
                border-white/20
                flex
                justify-center
                p-2
                "
              >

                <div
                  className="
                  w-2
                  h-2
                  rounded-full
                  bg-white
                  "
                />

              </div>

            </motion.div> */}

          </motion.div>

        )}

      </div>

    </section>

  );

}