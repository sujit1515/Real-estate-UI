
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Common/Navbar";
// import Footer from "@/components/Common/Footer";
// import Preloader from "@/components/Preloader";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: 'Real Estate Website',
//   description: 'Buy, rent, or sell properties with ease',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Preloader />
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// } 
 

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
// import Preloader from "@/components/Preloader";
import FooterWrapper from "@/components/FooterWrapper";
import WhatsAppChat from "@/components/WhatsAppChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Real Estate Website',
  description: 'Buy, rent, or sell properties with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Preloader /> */}
        <Navbar />
        {children}
        <FooterWrapper />
        <WhatsAppChat />
      </body>
    </html>
  );
}