
import Hero from "@/components/Pages/Buy/Hero";
import ArchitecturalIcons from "@/components/Pages/Buy/Architecturallcons";
import CoastalRetreats from "@/components/Pages/Buy/CoastalRetreats";
import UrbanLofts from "@/components/Pages/Buy/UrbanLofts";
import DesertSanctuaries from "@/components/Pages/Buy/DesertSanctuaries";
import Newsletter from "@/components/Pages/Buy/Newsletter";


export const metadata = {
  title: "Luxe Curator — Living as an Art Form",
  description:
    "Discover our meticulously gathered collections of properties that define the boundaries of modern living.",
};

export default function HomePage() {
  return (
    <div className="bg-[#f0f2f5] min-h-screen">
      
      <main>
        <Hero />
        <ArchitecturalIcons />
        <CoastalRetreats />
        <UrbanLofts />
        <DesertSanctuaries />
        <Newsletter />
      </main>
     
    </div>
  );
}
