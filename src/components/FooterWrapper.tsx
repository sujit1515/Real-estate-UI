"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Common/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Pages where footer should be hidden
  const hideFooterPaths = ["/checkout", "/payment" , "/buyerdetails", "/payment-success", "/profile", "/saved", "/settings", "/property"];
  const shouldHideFooter = hideFooterPaths.includes(pathname);
  
  return !shouldHideFooter ? <Footer /> : null;
}