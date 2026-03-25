// DesertSanctuaries.tsx
import SectionHeader from "./SectionHeader";

const PROPERTIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505916349660-8d91a99f8090?w=700&q=80",
    name: "Canyon Echo House",
    location: "Sedona, Arizona",
    price: "$19,000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=700&q=80",
    name: "Atlas Mirage Villa",
    location: "Marrakech, Morocco",
    price: "$16,500",
  },
];

export default function DesertSanctuaries() {
  return (
    <section className="py-14 border-t border-[#2a2a3a]" id="desert-sanctuaries">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Desert Sanctuaries"
          description="Solitude reimagined. Earth-toned retreats that blend into arid landscapes, offering absolute privacy and celestial views."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROPERTIES.map((prop) => (
            <DesertCard key={prop.id} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesertCard({ image, name, location, price }) {
  return (
    <div className="bg-[#1f1f2a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-[#2a2a3a]">
      <div className="aspect-video overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="px-4 py-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-[19px] font-bold text-white">{name}</h3>
          <p className="text-[11px] text-[#b0b0c0] mt-0.5">{location}</p>
        </div>
        <p className="text-[18px] font-bold text-purple-400 shrink-0">
          {price}<span className="text-[11px] font-normal text-[#a0a0b0]">/mo</span>
        </p>
      </div>
    </div>
  );
}