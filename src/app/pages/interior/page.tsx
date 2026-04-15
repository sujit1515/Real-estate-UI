// app/interior/page.tsx
"use client";

import InteriorHero from "@/components/Our-Services/Interior/InteriorHero";
import InteriorStyles from "@/components/Our-Services/Interior/InteriorStyles";
import InteriorServices from "@/components/Our-Services/Interior/InteriorServices";
import InteriorPortfolio from "@/components/Our-Services/Interior/InteriorPortfolio";
import InteriorProcess from "@/components/Our-Services/Interior/InteriorProcess";
import InteriorCTA from "@/components/Our-Services/Interior/InteriorCTA";

export default function InteriorPage() {
  return (
    <>
      <InteriorHero />
      <InteriorStyles />
      <InteriorServices />
      <InteriorPortfolio />
      <InteriorProcess />
      <InteriorCTA />
    </>
  );
}