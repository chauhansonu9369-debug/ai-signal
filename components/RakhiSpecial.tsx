"use client";

export default function RakhiSpecial() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-pink-300/30 bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 p-6 sm:p-10 text-center shadow-2xl">

      {/* Floating lights */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute left-[8%] top-[20%] text-2xl animate-pulse">✨</span>
        <span className="absolute right-[10%] top-[15%] text-2xl animate-bounce">🌸</span>
        <span className="absolute left-[15%] bottom-[15%] text-xl animate-pulse">💖</span>
        <span className="absolute right-[18%] bottom-[20%] text-xl animate-bounce">✨</span>
      </div>

      <div className="relative z-10">

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
          AI-SIGNAL SPECIAL
        </p>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
          🥮 Happy Raksha Bandhan
        </h2>

        <h3 className="mt-2 text-2xl sm:text-4xl font-bold text-pink-300">
          Behno ❤️
        </h3>

        {/* 3D Rakhi */}
        <div className="mx-auto my-8 flex h-48 w-48 items-center justify-center [perspective:800px]">

          <div className="relative h-36 w-36 [transform-style:preserve-3d] animate-[spin_7s_linear_infinite]">

            {/* Thread */}
            <div className="absolute left-[-75px] top-[61px] h-3 w-[285px] rounded-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent shadow-[0_0_18px_rgba(253,224,71,0.9)]">
            </div>

            {/* Rakhi outer */}
            <div className="absolute inset-0 rounded-full border-[10px] border-yellow-300 bg-gradient-to-br from-pink-400 via-red-500 to-purple-700 shadow-[0_0_30px_rgba(244,114,182,0.9),inset_0_0_25px_rgba(255,255,255,0.5)]">

              {/* Inner */}
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-yellow-200 bg-gradient-to-br from-yellow-200 via-orange-400 to-red-600 shadow-[0_0_20px_rgba(253,224,71,0.9)]">

                <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-md bg-white shadow-[0_0_15px_white]">
                </div>

              </div>

              {/* Decorative gems */}
              <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 rounded-sm bg-pink-200 shadow-[0_0_10px_white]"></span>

              <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 rounded-sm bg-pink-200 shadow-[0_0_10px_white]"></span>

              <span className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-pink-200 shadow-[0_0_10px_white]"></span>

              <span className="absolute bottom-3 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-pink-200 shadow-[0_0_10px_white]"></span>

            </div>
          </div>
        </div>

        <p className="mx-auto max-w-2xl text-base leading-7 text-pink-100 sm:text-lg">
          Meri pyari behno, aap sab hamesha khush raho,
          muskurate raho aur apni zindagi mein bahut aage badho. 🌸
        </p>

        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
          <p className="text-lg font-semibold text-yellow-200">
            ❤️ Bhai ki taraf se dher saara pyaar ❤️
          </p>

          <p className="mt-2 text-sm text-pink-100">
            AI-SIGNAL ke saath market dekho,
            aur Raksha Bandhan ki khushiyan manao. ✨📈
          </p>
        </div>

      </div>
    </section>
  );
}
