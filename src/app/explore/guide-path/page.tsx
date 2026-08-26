import DashboardNavbar from "@/components/DashboardNavbar";
import MobileBottomNav from "@/components/MobileBottomNav";
export default function GuidePathPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <DashboardNavbar />
      <div className="px-12 py-12">
        {/* <h1 className="text-4xl font-black mb-6">Guide Path</h1> */}
        {/* <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl mb-8">
          Welcome to the Guide Path page! Here, you can explore personalized learning paths, career milestones, exam preparation strategies, and future planning tools powered by AI. Start your journey towards achieving your goals and unlocking your full potential.
        </p> */}
      </div>

      <div className="px-8 py-8">

        {/* Hero */}
        <section className="
        relative overflow-hidden
        rounded-[40px]
        border border-white/10
        bg-gradient-to-br
        from-[#0b1020]
        via-[#111827]
        to-[#1a1040]
        p-10
        ">

          {/* Glow */}
          <div className="
          absolute top-[-100px] right-[-100px]
          w-[320px] h-[320px]
          bg-fuchsia-500/20
          blur-[120px]
          " />

          <div className="
          absolute bottom-[-100px] left-[-100px]
          w-[260px] h-[260px]
          bg-blue-500/20
          blur-[120px]
          " />

          {/* Content */}
          <div className="relative z-10 max-w-4xl">

            <div className="
            inline-flex
            px-5 py-2
            rounded-full
            bg-fuchsia-500/10
            border border-fuchsia-500/20
            text-fuchsia-300
            mb-6
            ">
              ✦ Personalized Guide Path
            </div>

            <h1 className="text-6xl font-black leading-tight">

              Build Your{" "}
              <span className="
              bg-gradient-to-r
              from-fuchsia-400
              to-purple-500
              bg-clip-text
              text-transparent
              ">
                Future Roadmap
              </span>

            </h1>

            <p className="
            mt-6 text-zinc-300
            text-xl leading-relaxed
            max-w-3xl
            ">

              Generate personalized learning paths,
              career milestones, exam preparation,
              and future strategies powered by AI.

            </p>

          </div>

        </section>

        {/* Input Section */}
        <section className="mt-10">

          <div className="
          border border-white/10
          rounded-[32px]
          bg-white/[0.03]
          p-8
          ">

            <h2 className="text-3xl font-black mb-8">
              Tell Us About Yourself
            </h2>

            {/* Grid */}
            <div className="
            grid grid-cols-1
            md:grid-cols-2
            gap-6
            ">

              {/* Interests */}
              <div>

                <label className="text-zinc-300 block mb-3">
                  Interests
                </label>

                <input
                  type="text"
                  placeholder="AI, Space, Coding..."
                  className="
                  w-full
                  px-5 py-4
                  rounded-2xl
                  bg-white/[0.04]
                  border border-white/10
                  outline-none
                  "
                />

              </div>

              {/* Goal */}
              <div>

                <label className="text-zinc-300 block mb-3">
                  Dream Career
                </label>

                <input
                  type="text"
                  placeholder="AI Engineer..."
                  className="
                  w-full
                  px-5 py-4
                  rounded-2xl
                  bg-white/[0.04]
                  border border-white/10
                  outline-none
                  "
                />

              </div>

              {/* Stream */}
              <div>

                <label className="text-zinc-300 block mb-3">
                  Current Stream
                </label>

                <input
                  type="text"
                  placeholder="Science / Commerce..."
                  className="
                  w-full
                  px-5 py-4
                  rounded-2xl
                  bg-white/[0.04]
                  border border-white/10
                  outline-none
                  "
                />

              </div>

              {/* Skills */}
              <div>

                <label className="text-zinc-300 block mb-3">
                  Existing Skills
                </label>

                <input
                  type="text"
                  placeholder="Python, Design..."
                  className="
                  w-full
                  px-5 py-4
                  rounded-2xl
                  bg-white/[0.04]
                  border border-white/10
                  outline-none
                  "
                />

              </div>

            </div>

            {/* Button */}
            <button className="
            mt-10
            px-8 py-4
            rounded-full
            bg-gradient-to-r
            from-fuchsia-600
            to-purple-600
            font-semibold
            hover:scale-105
            transition
            ">
              Generate My Path ✨
            </button>

          </div>

        </section>

        {/* Sample Roadmap */}
        <section className="mt-14">

          <h2 className="text-3xl font-black mb-8">
            Sample AI Roadmap
          </h2>

          <div className="
          grid grid-cols-1
          md:grid-cols-3
          gap-6
          ">

            {[
              "Learn Python & Programming",
              "Master AI & Machine Learning",
              "Build Real-World Projects",
            ].map((step, index) => (

              <div
                key={index}
                className="
                p-8
                rounded-[30px]
                border border-white/10
                bg-white/[0.03]
                "
              >

                <div className="
                w-12 h-12
                rounded-full
                bg-gradient-to-r
                from-fuchsia-600
                to-purple-600
                flex items-center justify-center
                font-bold text-lg
                mb-6
                ">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-bold">
                  {step}
                </h3>

              </div>

            ))}

          </div>

        </section>

      </div>

      <MobileBottomNav />

    </main>
  );
}