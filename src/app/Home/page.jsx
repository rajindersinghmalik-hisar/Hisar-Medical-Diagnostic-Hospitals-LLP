// app/page.jsx

import React from "react";
import Hero from "../components/Home/Herosection";
import AboutSection from "../components/Home/About";
import WhyChooseUs from "../components/Home/Why";
import ServicesPage from "../components/Home/Service";
import HorizontalLocationBanner from "../components/Home/Locationbanner";
import ClientTestimonials from "../components/Home/Clientreview";

/* SEO Metadata */
export const metadata = {
  title: "Best Diagnostic Center in Hisar | Advanced Healthcare & Imaging",
  description:
    "Trusted diagnostic center in Hisar providing MRI, CT Scan, Ultrasound and complete healthcare diagnostics with modern technology and expert doctors.",
  keywords: [
    "diagnostic center in Hisar",
    "MRI scan Hisar",
    "CT scan Hisar",
    "ultrasound Hisar",
    "health checkup Hisar",
    "best diagnostic lab Hisar",
  ],

  openGraph: {
    title: "Advanced Diagnostic Center in Hisar",
    description:
      "Accurate diagnostic imaging and healthcare services with modern technology and experienced doctors.",
    url: "https://drmalikdiagnostic.com/",
    siteName: "Your Diagnostic Center",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/favlogo.jpg",
        width: 1200,
        height: 630,
        alt: "Diagnostic Center in Hisar",
      },
    ],
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "Best Diagnostic Center in Hisar",
  //   description:
  //     "MRI, CT Scan, Ultrasound and advanced diagnostic services available in Hisar.",
  //   images: ["/seo-image.jpg"],
  // },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <WhyChooseUs />
      <ServicesPage />
      <HorizontalLocationBanner />
      <ClientTestimonials />
    </main>
  );
}