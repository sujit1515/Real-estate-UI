// SectionHeader.tsx
import Link from "next/link";

export default function SectionHeader({ title, description, viewAllHref }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h2 className="font-serif text-[clamp(22px,3vw,30px)] font-bold text-white mb-1.5">
          {title}
        </h2>
        <p className="text-[13px] text-gray-400 max-w-[340px] leading-[1.65]">
          {description}
        </p>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-[11px] font-semibold tracking-[0.1em] uppercase text-purple-400 flex items-center gap-1.5 whitespace-nowrap hover:text-purple-300 transition-colors duration-300 shrink-0"
        >
          View Entire Collection <span className="text-[13px]">→</span>
        </Link>
      )}
    </div>
  );
}