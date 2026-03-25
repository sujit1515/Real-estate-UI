// Hero.tsx
export default function Hero() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#a0a0b0] mb-4">
          Curation 2024
        </p>
        <h1 className="font-serif text-[clamp(38px,5.5vw,68px)] font-bold leading-[1.1] text-white mb-5">
          Living as an{" "}
          <em className="italic text-purple-400">Art Form.</em>
        </h1>
        <p className="text-[15px] text-[#b0b0c0] max-w-[440px] leading-[1.7]">
          Discover our meticulously gathered collections of properties that define the
          boundaries of modern living, coastal serenity, and urban sophistication.
        </p>
      </div>
    </section>
  );
}