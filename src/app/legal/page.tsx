// app/legal/page.tsx
"use client";

import LegalHero from "@/components/Legal/LegalHero";
import LegalServices from "@/components/Legal/LegalServices";
import LegalProcess from "@/components/Legal/LegalProcess";
import LegalTeam from "@/components/Legal/LegalTeam";
import LegalFAQ from "@/components/Legal/LegalFAQ";
import LegalCTA from "@/components/Legal/LegalCTA";

export default function LegalPage() {
  return (
    <>
      <LegalHero />
      <LegalServices />
      <LegalProcess />
      <LegalTeam />
      <LegalFAQ />
      <LegalCTA />
    </>
  );
}