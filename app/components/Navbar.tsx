"use client";
import { Link } from "react-scroll";
import { useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "team", label: "TeamStats" },
  { id: "events", label: "Events" },
  { id: "sponsors", label: "Sponsors" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 shadow-2xl border-b border-red-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={600}
                offset={-70}
                className="relative group cursor-pointer text-white font-semibold tracking-wide uppercase text-sm lg:text-base transition-all duration-300 hover:text-red-400"
              >
                <span className="relative z-10">{item.label}</span>
                {/* Racing stripe effect on hover */}
                <div className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-red-600/0 via-red-500/20 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
                {/* Bottom border effect */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-red-500/20 rounded blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-red-400 focus:outline-none focus:text-red-400 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md border-t border-red-500/30">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={600}
                offset={-70}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-white font-semibold uppercase tracking-wide hover:bg-red-600/20 hover:text-red-400 transition-all duration-300 rounded-md border-l-2 border-transparent hover:border-red-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Racing stripe decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
    </nav>
  );
}
