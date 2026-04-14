
import RenovationHero from "@/components/Renovation/RenovationHero";
import RenovationServices from "@/components/Renovation/RenovationServices";
import RenovationProcess from "@/components/Renovation/RenovationProcess";
import RenovationGallery from "@/components/Renovation/RenovationGallery";
import RenovationBenefits from "@/components/Renovation/RenovationBenefits";
import RenovationCTA from "@/components/Renovation/RenovationCTA";

export default function RenovationPage() {
  return (
    <>
      <RenovationHero />
      <RenovationServices />
      <RenovationProcess />
      <RenovationGallery />
      <RenovationBenefits />
      <RenovationCTA />
    </>
  );
}