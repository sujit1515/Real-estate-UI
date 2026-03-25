
import Hero from "@/components/Pages/Sell/Hero";
import ListingSidebar from "@/components/Pages/Sell/ListingSidebar";
import ListingForm from "@/components/Pages/Sell/ListingForm";


export const metadata = {
  title: "Estate Concierge — List Your Property",
  description: "Unlock the true value of your architecture with our premier listing portal.",
};

export default function SellPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* <Navbar /> */}
      <Hero />

      {/* Main content: sidebar + form */}
      <div className="max-w-[1100px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 items-start">
          <ListingSidebar />
          <ListingForm />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
