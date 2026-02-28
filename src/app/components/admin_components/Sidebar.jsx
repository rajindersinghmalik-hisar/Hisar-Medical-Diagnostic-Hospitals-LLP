"use client";

import { Menu, X, BarChart2 } from "lucide-react";
import Image from "next/image";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded bg-primary p-2 text-white md:hidden"
      >
        <Menu size={24} />
      </button>

         <aside
      className={`fixed z-40 h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white transition-transform
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Header */}
      <div className="relative border-b border-white/20 p-6">
        <div className="flex flex-col items-center gap-3">
          {/* Logo */}
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white/15 p-3 shadow-md">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-sm font-semibold tracking-wide">
              HISAR MEDICAL
            </h2>
            <p className="mt-1 text-xs text-white/80">
              Diagnostic & Hospitals LLP
            </p>
          </div>
        </div>

        {/* Close button (mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 md:hidden"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <a
          href="/dashboard"
          className="flex items-center gap-3 bg-white/10 px-6 py-4 hover:bg-white/20 transition"
        >
          <BarChart2 size={20} />
          Dashboard
        </a>
      </nav>
    </aside>
    </>
  );
}
