"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/Services" },
    { name: "Gallery", href: "/Gallery" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        {/* MAIN ROW */}
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-11 w-11">
              <Image
                src="/logo.png"
                alt="HISAR MEDICAL DIAGNOSTIC & HOSPITALS LLP"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* CENTER TITLE – DESKTOP */}
          <h1 className="hidden md:block text-center font-bold text-blue-950 text-lg absolute left-1/2 transform -translate-x-1/2">
            HISAR MEDICAL DIAGNOSTIC & HOSPITALS LLP
          </h1>

          {/* MOBILE TITLE - Positioned in center for mobile */}
          <h1 className="md:hidden text-sm font-semibold font-sans text-blue-950 leading-tight absolute left-1/2 transform -translate-x-1/2 max-w-[200px] text-center">
            HISAR MEDICAL DIAGNOSTIC & HOSPITALS LLP
          </h1>

          {/* MENU BUTTON - Moved back to right end */}
          <button
            className="md:hidden p-2 ml-auto text-blue-950"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-blue-950  font-sans font-semibold transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-40 mt-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-4 border-t pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
