"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  steps: any[];
};

export default function CareerJourneyRoad({
  steps,
}: Props) {

  const [activeIndex, setActiveIndex] =
    useState(0);

  if (!steps?.length) return null;

  const activeStep =
    steps[activeIndex];

  return (

    <section
      className="
      relative
      py-40
      px-6
      overflow-hidden
      "
    >

      {/* BACKGROUND */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-b
        from-black
        via-black
        to-black
        "
      />

      <div
        className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[1000px]
        h-[1000px]

        rounded-full

        bg-cyan-500/10

        blur-[220px]
        "
      />

      <div
        className="
        relative
        z-10

        max-w-7xl
        mx-auto
        "
      >

        {/* HEADER */}

        <div
          className="
          text-center
          mb-24
          "
        >

          <p
            className="
            uppercase
            tracking-[0.4em]
            text-fuchsia-400
            text-sm
            mb-6
            "
          >
            CAREER JOURNEY
          </p>

          <h2
            className="
            text-5xl
            md:text-7xl
            font-black
            leading-[0.95]
            "
          >
            How To Become
            <br />
            This Career
          </h2>

        </div>

        {/* DESKTOP */}

        <div className="hidden lg:block">

          {/* JOURNEY BAR */}

          <div
            className="
            relative
            mb-28
            "
          >

            {/* LINE */}

            <div
              className="
              absolute
              left-0
              right-0
              top-1/2

              h-[4px]

              bg-white/10
              "
            />

            <div
              className="
              flex
              justify-between
              items-center
              relative
              z-10
              "
            >

              {steps.map(
                (
                  step,
                  index
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      setActiveIndex(
                        index
                      )
                    }
                    className="
                    flex
                    flex-col
                    items-center
                    gap-4
                    "
                  >

                    <motion.div

  animate={{
    scale:
      activeIndex === index
        ? 1.15
        : 1,
  }}

  className="relative"
>

  {/* OUTER GLOW */}

  <div
    className="
    absolute
    inset-0

    rounded-full

    blur-xl

    bg-cyan-400/40
    "
  />

  {/* GLASS RING */}

  <div
    className="
    relative

    w-24
    h-24

    rounded-full

    p-[4px]

    bg-[linear-gradient(
90deg,
#00E5FF,
#00FFAA,
#FFE600,
#FF5C8A,
#B366FF,
#00E5FF
)]

    shadow-[0_0_40px_rgba(34,211,238,0.8)]
    "
  >

    {/* REFLECTION */}

    <div
      className="
      absolute

      top-2
      left-2

      w-5
      h-5

      rounded-full

      bg-white/80

      blur-md
      "
    />

    {/* INNER CIRCLE */}

    <div
      className="
      w-full
      h-full

      rounded-full

      bg-black

      flex
      items-center
      justify-center

      font-black
      text-xl
      "
    >
      {step.percentage}%
    </div>

  </div>

</motion.div>

                    <span
                      className={`
                      text-sm
                      font-semibold

                      ${
                        activeIndex ===
                        index
                          ? "text-white"
                          : "text-zinc-500"
                      }
                      `}
                    >
                      {step.heading}
                    </span>

                  </button>

                )
              )}

            </div>

          </div>

          {/* DETAILS */}

          <motion.div

            key={activeIndex}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
            rounded-[40px]

            border
            border-white/10

            bg-white/[0.04]

            backdrop-blur-2xl

            p-12

            text-center
            "
          >

            <p
              className="
              text-8xl
              font-black

              bg-gradient-to-r
              from-fuchsia-400
              to-cyan-400

              bg-clip-text
              text-transparent

              mb-6
              "
            >
              {activeStep.percentage}%
            </p>

            <h3
              className="
              text-5xl
              font-black
              mb-6
              "
            >
              {activeStep.heading}
            </h3>

            <p
              className="
              text-zinc-400
              text-xl
              max-w-3xl
              mx-auto
              leading-relaxed
              "
            >
              {
                activeStep.short_description
              }
            </p>

          </motion.div>

        </div>

        {/* MOBILE */}

        <div className="lg:hidden">

          <div
            className="
            flex
            gap-4

            overflow-x-auto

            pb-4
            "
          >

            {steps.map(
              (
                step,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setActiveIndex(
                      index
                    )
                  }
                  className={`
                  min-w-[100px]

                  rounded-full

                  px-5
                  py-3

                  font-black

                  ${
                    activeIndex ===
                    index
                      ? `
                      bg-gradient-to-r
                      from-fuchsia-500
                      to-cyan-400
                      `
                      : `
                      bg-white/5
                      `
                  }
                  `}
                >
                  {step.percentage}%
                </button>

              )
            )}

          </div>

          <div
            className="
            mt-10

            rounded-[32px]

            border
            border-white/10

            bg-white/[0.04]

            p-8
            "
          >

            <h3
              className="
              text-3xl
              font-black
              mb-4
              "
            >
              {activeStep.heading}
            </h3>

            <p
              className="
              text-zinc-400
              "
            >
              {
                activeStep.short_description
              }
            </p>

          </div>

        </div>

        {/* CTA */}

        <div className="text-center mt-20">

          <a
            href="/explore/guide-path"
            className="
            inline-flex

            items-center
            justify-center

            px-10
            py-5

            rounded-full

            bg-gradient-to-r
            from-fuchsia-600
            to-cyan-500

            font-bold

            shadow-[0_0_50px_rgba(34,211,238,0.35)]

            hover:scale-105

            transition-all
            duration-300
            "
          >
            Guide My Path →
          </a>

        </div>

      </div>

    </section>

  );

}
