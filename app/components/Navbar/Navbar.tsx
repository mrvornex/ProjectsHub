"use client";

import { colors } from "@/app/constants/colors";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const goToProjects = () => {
    setIsMenuOpen(false);
    router.push("/CategoryPage");
  };

  return (
    <>
      <nav
        style={{ color: colors.color, background: colors.background }}
        className="px-4 md:px-8 lg:px-16 xl:px-40 py-4 md:py-5 flex justify-between items-center z-40 shadow-md fixed w-full border-b"
      >
        <Link href="/" className="text-xl md:text-2xl font-bold" style={{ color: colors.primary }}>
         JSProjectForge
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-base lg:text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:opacity-70 transition-opacity">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <button
          onClick={goToProjects}
          style={{ background: colors.primary }}
          className="hidden md:block px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
        >
          All Projects
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{ color: colors.color }}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            style={{ background: colors.background, color: colors.color }}
            className="absolute top-0 right-0 w-3/4 max-w-sm h-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center space-y-6 py-20 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl font-medium hover:opacity-70 transition-opacity w-full text-center py-3 border-b"
                  style={{ borderColor: colors.border }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="https://github.com/Bilal742"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium hover:opacity-70 transition-opacity w-full text-center py-3 border-b"
                style={{ borderColor: colors.border }}
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>

              <button
                onClick={goToProjects}
                style={{ background: colors.primary }}
                className="mt-6 px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              >
                All Projects
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}