"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Calendar, Plus, User, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: <Calendar size={18} /> },
  { name: "My Events", href: "/my-events", icon: <User size={18} /> },
  { name: "Create Event", href: "/events/create", icon: <Plus size={18} /> },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 backdrop-blur-md border-b border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600/80 rounded-2xl flex items-center justify-center">
              <Calendar size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-indigo-400">Eventify</span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-1.5 border border-transparent rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-indigo-600/80 text-slate-200 border-indigo-600"
                    : "text-gray-200 hover:text-white hover:bg-indigo-600/50"
                }`}
              >
                <span className="mr-2 text-slate-200">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-200 hover:text-white cursor-pointer hover:bg-gray-800 rounded-md transition"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-1 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-indigo-600/80 text-slate-200"
                    : "text-gray-200 hover:text-white hover:bg-indigo-600/50"
                }`}
              >
                <span className="mr-2 text-slate-200">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
