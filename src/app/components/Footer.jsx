import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/Gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/Contact" },
  ];

  const services = [
    "Digital X-Ray",
    "Ultrasound Scanning",
    "Cancer Screening",
    "Women's Health",
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      href: "https://youtube.com",
      label: "YouTube",
    },
  ];

  return (
    <footer className="font-sans bg-blue-950 text-white">
      {/* Decorative Top Border */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

      <div className="container mx-auto px-4 py-12 md:py-7">
      
        {/* COMPANY INFO SECTION - CENTERED */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold font-sans mb-4 text-white">
            HISAR MEDICAL DIAGNOSTIC & HOSPITALS LLP
          </h2>
          
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
            Your trusted partner in diagnostic imaging and healthcare services in Hisar and surrounding areas. 
            Delivering exceptional medical care with advanced technology and experienced professionals.
          </p>
          
          {/* Awards & 24/7 Badges */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 mb-10">
            <div className="bg-blue-900/50 px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="bg-blue-900 p-3 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold font-sans text-lg text-white">40+ Years</p>
                <p className="text-white font-sans text-sm">Medical Experience</p>
              </div>
            </div>
            
            <div className="bg-blue-900/50 px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="bg-blue-900 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold font-sans text-lg text-white">24/7</p>
                <p className="text-white text-sm">Emergency Services</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 MAIN COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {/* COLUMN 1: QUICK LINKS */}
          <div className="flex">
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl w-full h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Quick Links
              </h2>
              <ul className="space-y-4 text-sm flex-1">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white hover:pl-2 transition-all duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMN 2: OUR SERVICES */}
          <div className="flex">
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl w-full h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Our Services
              </h2>
              <ul className="grid grid-cols-1 gap-3 text-sm flex-1">
                {services.map((service, index) => (
                  <li
                    key={index}
                    className="text-white hover:pl-2 transition-all duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMN 3: CONTACT US */}
          <div className="flex">
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl w-full h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Contact Us
              </h2>
              <ul className="space-y-4 text-sm flex-1">
                <li className="flex items-center gap-3">
                  <div className="bg-blue-900 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white">
                    9812166286
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-900 p-2 rounded-lg">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white break-all">
                    rajindersinghmalik@gmail.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-900 p-2 rounded-lg mt-1">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white leading-relaxed">
                    Hisar Medical Diagnostic Center, <br />
                    SCF 79 Red Square Market Hisar-125001 
                  </span>
                </li>
              </ul>

              <div className="flex gap-3 mt-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      bg-blue-900 hover:bg-blue-800
                      p-2 rounded-full
                      transition-all duration-300
                      hover:scale-110
                    "
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white text-sm text-center md:text-left order-2 md:order-1">
              © {new Date().getFullYear()} HISAR MEDICAL DIAGNOSTIC & HOSPITALS LLP. 
              All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 order-1 md:order-2 mb-4 md:mb-0">
              {/* <Link 
                href="/privacy-policy" 
                className="text-white hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link> */}
              {/* <Link 
                href="/terms" 
                className="text-white hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link> */}
              {/* <Link 
                href="/sitemap" 
                className="text-white hover:text-white text-sm transition-colors duration-300"
              >
                Sitemap
              </Link> */}
              {/* <Link 
                href="/disclaimer" 
                className="text-white hover:text-white text-sm transition-colors duration-300"
              >
                Disclaimer
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;