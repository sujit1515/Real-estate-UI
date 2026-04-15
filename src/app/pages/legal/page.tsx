// app/legal/page.tsx
"use client";

import LegalHero from "@/components/Our-Services/Legal/LegalHero";
import LegalServices from "@/components/Our-Services/Legal/LegalServices";
import LegalProcess from "@/components/Our-Services/Legal/LegalProcess";
import LegalTeam from "@/components/Our-Services/Legal/LegalTeam";
import LegalFAQ from "@/components/Our-Services/Legal/LegalFAQ";
import LegalCTA from "@/components/Our-Services/Legal/LegalCTA";

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