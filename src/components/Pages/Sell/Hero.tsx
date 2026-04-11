"use client";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-16 md:py-20 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-300 mb-5">
              Premier Listing Portal
            </p>
            <h1 className="font-serif text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.08] text-white mb-5">
              Unlock the True Value<br />of Your Architecture.
            </h1>
            <p className="text-[14px] text-gray-300 leading-[1.72] max-w-[380px]">
              Transition from homeowner to seller with our bespoke concierge service.
              Provide the architectural details of your estate to receive an elite-market valuation.
            </p>
          </div>

          {/* Right — property image card */}
          <div className="flex-shrink-0 relative w-full md:w-[380px]">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=760&q=85"
                alt="Modern estate"
                className="w-full h-[260px] md:h-[300px] object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-[-16px] left-4 bg-white rounded-xl shadow-lg px-4 py-3 min-w-[220px]">
              <span className="inline-block bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full mb-2">
                Verified Status
              </span>
              <p className="text-[13px] font-bold text-[#111118]">Market Intelligence v4.2</p>
              <p className="text-[11px] text-[#6b6f7a] mt-0.5">Real-time data synchronization enabled.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}