// app/interior/page.tsx
"use client";

import InteriorHero from "@/components/Interior/InteriorHero";
import InteriorStyles from "@/components/Interior/InteriorStyles";
import InteriorServices from "@/components/Interior/InteriorServices";
import InteriorPortfolio from "@/components/Interior/InteriorPortfolio";
import InteriorProcess from "@/components/Interior/InteriorProcess";
import InteriorCTA from "@/components/Interior/InteriorCTA";

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