const STEPS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Geospatial Data",
    desc: "Mapping your property against local market indices.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Structural Details",
    desc: "Defining the architectural footprint of your estate.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: "Visual Asset Suite",
    desc: "High-fidelity imagery for editorial presentation.",
  },
];

export default function ListingSidebar() {
  return (
    <aside className="flex flex-col gap-5">
      <h3 className="text-[13px] font-semibold text-[#111118]">The Listing Process</h3>

      <div className="flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f0f2f5] flex items-center justify-center text-[#6b6f7a] shrink-0 mt-0.5">
              {step.icon}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#111118]">{step.title}</p>
              <p className="text-[12px] text-[#6b6f7a] leading-relaxed mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Secure Valuation box */}
      <div className="bg-[#f5f6f8] rounded-xl p-4 mt-2">
        <div className="w-8 h-8 rounded-full bg-[#111118] flex items-center justify-center mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <p className="text-[13px] font-bold text-[#111118] mb-1.5">Secure Valuation</p>
        <p className="text-[12px] text-[#6b6f7a] leading-relaxed">
          Our valuation engine uses proprietary algorithms and verified neighborhood comps
          to ensure your asking price reflects true architectural value.
        </p>
      </div>
    </aside>
  );
}
