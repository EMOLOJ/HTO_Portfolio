"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/awards", label: "Awards" },
  { href: "/teaching", label: "Teaching" },
  { href: "/education", label: "Education" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="md:hidden w-full bg-white border-b border-bark/10 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-forest">
          Academic Portfolio
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="p-2 rounded text-forest hover:bg-bark/5"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-bark/10 bg-cream/50">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-md text-forest hover:bg-moss/15 font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
