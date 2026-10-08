"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import QuickLinks from "./QuickLinks";
import ProfileCard from "./ProfileCard";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/awards", label: "Awards" },
  { href: "/teaching", label: "Teaching" },
  { href: "/education", label: "Education" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 min-h-screen bg-white border-r border-bark/10 fixed top-0 left-0 z-30">
      <div className="p-6 flex flex-col h-full">
        <ProfileCard />
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`py-2 px-3 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-moss/15 text-forest border-l-2 border-moss -ml-px pl-3"
                    : "text-bark hover:bg-bark/5 hover:text-forest"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 mt-4 border-t border-bark/10">
          <QuickLinks />
        </div>
      </div>
    </aside>
  );
}
