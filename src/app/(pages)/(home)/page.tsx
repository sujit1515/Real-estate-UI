import React from 'react';
import Banner from '@/components/Pages/Home/Banner';
import CuratedCollections from '@/components/Pages/Home/Curatedcollections';
import PhilosophySection from '@/components/Pages/Home/Philosophysection';
import PropertySpotlight from '@/components/Pages/Home/Propertyspotlight';
import PressTestimonial from '@/components/Pages/Home/Presstestimonial';
import JournalSection from '@/components/Pages/Home/Journalsection';


function page() {
  return (
    <div>
      <Banner/>
      <CuratedCollections/>
      <PhilosophySection/>
      <PropertySpotlight/>
      <PressTestimonial/>
      <JournalSection/> 
     
    </div>
  )
}

export default page
