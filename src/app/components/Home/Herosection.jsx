"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone, Award, Clock, Shield, CheckCircle, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      word: "Diagnostic",
      image: "/image22.png",
      subtitle: "Advanced diagnostic imaging for accurate health insights",
    },
    {
      word: "Healthcare",
      image: "/bed.png",
      subtitle: "Comprehensive healthcare solutions for your family",
    },
    {
      word: "Wellness",
      image: "/m.png",
      subtitle: "Your partner in preventive care and wellness",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[80vh] md:h-[95vh] flex items-center overflow-hidden">
      {/* Desktop Background Images - Full Screen (unchanged) */}
      <div className="absolute inset-0 hidden md:block">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              alt={slide.word}
              quality={90}
            />
            {/* Gradient overlay - darker on left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Mobile Background - Full screen machine.png with optimized opacity layers */}
      <div className="absolute inset-0 md:hidden">
        {/* Main background image - full screen */}
        <Image
          src="/machine.png"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          alt="Medical equipment"
          quality={90}
        />
        
        {/* Multi-layer opacity overlay for perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/75"></div>
        
        {/* Additional soft gradient overlay to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
      </div>

      {/* Content Container - Full width on mobile */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="w-full md:w-1/2 flex items-center">
            <div className="max-w-[500px] w-full">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-900/70 border border-emerald-700/50 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
                <Award className="text-emerald-300" size={16} />
                <span className="text-emerald-100 font-medium text-sm">
                  40+ Years of Trusted Healthcare
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Comprehensive
                <span className="block mt-2 relative min-h-[1.2em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={slides[currentSlide].word}
                      initial={{ 
                        opacity: 0, 
                        y: 20,
                        filter: "blur(3px)"
                      }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        filter: "blur(0px)"
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -20,
                        filter: "blur(3px)"
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.4 },
                        filter: { duration: 0.4 }
                      }}
                      className="text-emerald-400 inline-block font-bold drop-shadow-lg"
                    >
                      {slides[currentSlide].word}
                    </motion.span>
                  </AnimatePresence>
                  
                  {/* Animated Underline */}
                  <motion.div
                    key={`line-${currentSlide}`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="absolute -bottom-1 left-0 w-1/2 h-1 bg-emerald-500 origin-left rounded-full shadow-lg shadow-emerald-500/50"
                  />
                </span>
                <span className="block mt-3 text-white text-xl md:text-2xl drop-shadow-lg">
                  Services in Hisar
                </span>
              </h1>

              {/* Tagline - Enhanced readability on mobile */}
              <p className="text-white/95 text-sm md:text-base mb-8 leading-relaxed drop-shadow-md">
                <span className="text-emerald-300 font-semibold">Early detection saves lives</span> – 
                Our advanced diagnostic & imaging services use the latest technology to provide 
                accurate results for better healthcare decisions.
              </p>

              {/* CTA Buttons - Enhanced backdrop for mobile */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  href="/Contact"
                  className="group bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm md:text-base shadow-lg hover:shadow-emerald-600/40"
                >
                  <Sparkles size={16} />
                  Book Appointment
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <a
                  href="tel:9812166286"
                  className="group bg-white/15 hover:bg-white/25 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm md:text-base backdrop-blur-md shadow-lg"
                >
                  <Phone size={16} className="group-hover:text-red-400 transition-colors" />
                  Emergency Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;