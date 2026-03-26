// UrbanLofts.tsx
import SectionHeader from "./SectionHeader";

const FEATURED = {
  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  city: "New York City, NY",
  name: "The Tribeca Penthouse",
  price: "$38,000",
};

const MINI_PROPS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1527515545081-5db817172677?w=600&q=80",
    location: "Shibuya, Tokyo",
    name: "Neon Zen Duplex",
    price: "$22,000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    location: "Mayfair, London",
    name: "The Ironworks Suite",
    price: "$29,500",
  },
];

export default function UrbanLofts() {
  return (
    <section className="py-14 border-t border-purple-900/30 bg-[#1a1a2e]" id="urban-lofts">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Urban Lofts"
          description="High-altitude living for the global citizen. Industrial heritage meets ultra-modern luxury in the world's major capitals."
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Featured */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group">
            <img
              src={FEATURED.image}
              alt={FEATURED.name}
              className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-300 mb-1.5">
                {FEATURED.city}
              </p>
              <h3 className="font-serif text-[26px] font-bold mb-3">{FEATURED.name}</h3>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 tracking-[0.1em] uppercase mb-0.5">Monthly</p>
                  <p className="text-[22px] font-bold text-white">{FEATURED.price}</p>
                </div>
                <button className="bg-purple-600 text-white rounded-lg px-5 py-2.5 text-[13px] font-semibold hover:bg-purple-700 transition-colors duration-300">
                  Explore Residence
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex lg:flex-col sm:flex-row flex-col gap-4">
            {MINI_PROPS.map((prop) => (
              <MiniCard key={prop.id} {...prop} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCard({ image, location, name, price }) {
  return (
    <div className="bg-[#252544] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 border border-purple-900/30 hover:border-purple-500/50 hover:-translate-y-1">
      <div className="h-[140px] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="px-3.5 py-3">
        <p className="text-[9px] font-semibold tracking-[0.12em] uppercase text-purple-400 mb-1">
          {location}
        </p>
        <h4 className="font-serif text-[16px] font-bold text-white mb-1.5">{name}</h4>
        <p className="text-[16px] font-bold text-purple-400">{price}</p>
      </div>
    </div>
  );
}