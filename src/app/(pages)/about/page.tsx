import React from 'react';
import AboutHero from '@/components/Pages/About/AboutHero';
import FounderSection from '@/components/Pages/About/FounderSection';
import OurPurpose from '@/components/Pages/About/OurPurpose';
import TeamSection from '@/components/Pages/About/TeamSection';
import ValuesSection from '@/components/Pages/About/ValuesSection';
import CTASection from '@/components/Pages/About/CTASection';


export default function page() {
  return (
    <div>  
      <AboutHero/>
      <FounderSection/>
      <OurPurpose/>
      <TeamSection/>
      <ValuesSection/> 
      <CTASection/>
    </div>
  )
}
