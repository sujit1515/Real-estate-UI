// CoastalRetreats.tsx
import SectionHeader from "./SectionHeader";

const PROPERTIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=700&q=80",
    location: "Turks & Caicos",
    name: "Azure Reach",
    beds: "5 Beds",
    amenity: "Infinity Pool",
    price: "$45,000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80",
    location: "Mykonos, Greece",
    name: "The Helios Nook",
    beds: "3 Beds",
    amenity: "Terrace",
    price: "$28,000",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=700&q=80",
    location: "Bali, Indonesia",
    name: "Sandalwood Haven",
    beds: "4 Beds",
    amenity: "Garden Spa",
    price: "$15,500",
  },
];

export default function CoastalRetreats() {
  return (
    <section className="py-14 border-t border-[#2a2a3a]" id="coastal-retreats">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Coastal Retreats"
          description="Where the horizon becomes your back garden. Experience the rhythmic peace of high-design beachfront living."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((prop) => (
            <CoastalCard key={prop.id} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CoastalCard({ image, location, name, beds, amenity, price }) {
  return (
    <div className="bg-[#1f1f2a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-[#2a2a3a]">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="px-4 py-4">
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-purple-400 mb-1.5">
          {location}
        </p>
        <h3 className="font-serif text-[20px] font-bold italic text-white mb-2.5">
          {name}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-[#b0b0c0] font-medium">
          <span className="flex items-center gap-1">
            <BedIcon /> {beds}
          </span>
          <span className="flex items-center gap-1">
            <StarIcon /> {amenity}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[18px] font-bold text-purple-400">
            {price}<span className="text-[11px] font-normal text-[#a0a0b0]">/mo</span>
          </p>
          <button className="text-[11px] font-semibold text-white border border-[#2a2a3a] rounded-md px-4 py-1.5 hover:border-purple-500 hover:text-purple-400 transition-all">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function BedIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}