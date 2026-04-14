 
import HeroSection from "@/components/Pages/Buy/Herosection";
import CollectionSection from "@/components/Pages/Buy/CollectionSection";
import ResidencesSection from "@/components/Pages/Buy/ResidencesSection";
import EarlyAccessSection from "@/components/Pages/Buy/EarlyAccessSection";


export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <CollectionSection />
      <ResidencesSection />
      <EarlyAccessSection />
      
    </main>
  );
}
