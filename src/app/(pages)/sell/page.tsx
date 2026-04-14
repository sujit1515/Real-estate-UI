// app/sell/page.tsx
"use client";

import SellHeroSection from "@/components/Pages/Sell/HeroSection";
import ListingForm from "@/components/Pages/Sell/ListingForm";
import ListingProcessSidebar from "@/components/Pages/Sell/ListingProcessSidebar";
import FreeValuationSection from "@/components/Pages/Sell/FreeValuationSection";

export default function SellPage() {
  return (
    <>
      <SellHeroSection />
      
      <section className="w-full bg-[#eeede9] py-16 md:py-24 px-4 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <ListingForm />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <ListingProcessSidebar />
            </div>
          </div>
        </div>
      </section>
      
      <FreeValuationSection />
    </>
  );
}