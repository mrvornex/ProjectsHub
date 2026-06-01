"use client";

import { colors } from "@/constants/colors";
import Link from "next/link";
import "./Navbar.css";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav
        style={{ color: colors.color, background: colors.background }}
        className="px-4 md:px-8 lg:px-16 xl:px-40 py-4 md:py-6 lg:py-5 flex justify-between items-center z-40 shadow-xl fixed w-full"
      >
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold">
          ProjectsHub
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4 lg:gap-6 text-base lg:text-lg font-medium">
          <li>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:opacity-80 transition-opacity">
              About
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:opacity-80 transition-opacity">
              FAQ 
            </Link>
          </li>
          <li>
            <Link href="/testimonials" className="hover:opacity-80 transition-opacity">
               Testimonials
            </Link>
          </li>
          <li>
            {/* <a
              href="https://github.com/Bilal742"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              GitHub
            </a> */}
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Desktop Button - Always visible on desktop */}
        <div className="hidden md:block">
          {/* <button
          onClick={() => router.push('/projects')}
            className="cursor-pointer relative w-[10em] lg:w-[11em] h-[3.5em] lg:h-[4em] outline-none transition-all duration-100 bg-transparent border-0 text-[11px] md:text-[12px] lg:text-[13px] font-bold overflow-visible"
          >
            All Projects
            <div id="clip" className="absolute top-0 w-full h-full overflow-hidden border-[4px] md:border-[5px] border-double shadow-[inset_0_0_15px_#195480]">
              <div id="leftTop" className="corner"></div>
              <div id="rightTop" className="corner"></div>
              <div id="rightBottom" className="corner"></div>
              <div id="leftBottom" className="corner"></div>
            </div>
            <span id="leftArrow" className="arrow absolute top-[35%] w-[11%] h-[30%]"></span>
            <span id="rightArrow" className="arrow absolute top-[35%] w-[11%] h-[30%]"></span>
          </button> */}
          <button onClick={() => {
            setIsMenuOpen(false);
            router.push("/CategoryPage");
          }}
            className="learn-more">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">All Projects</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-30 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Background Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        {/* Menu Content */}
        <div
          style={{ background: colors.background }}
          className={`absolute top-0 right-0 w-3/4 max-w-sm h-full transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center space-y-8 py-20 px-6 h-full overflow-y-auto">
            <Link
              href="/"
              className="text-2xl font-medium hover:opacity-80 transition-opacity w-full text-center py-3 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-2xl font-medium hover:opacity-80 transition-opacity w-full text-center py-3 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

             <Link
              href="/faq"
              className="text-2xl font-medium hover:opacity-80 transition-opacity w-full text-center py-3 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>

             <Link
              href="/testimonials"
              className="text-2xl font-medium hover:opacity-80 transition-opacity w-full text-center py-3 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)} 
            >
              Testimonials
            </Link>
            
            <a
              href="https://github.com/Bilal742"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-medium hover:opacity-80 transition-opacity w-full text-center py-3 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>

            {/* Mobile Button - Now clearly visible */}
            <div className="mt-12 w-full flex justify-center">
              <button onClick={() => {
                setIsMenuOpen(false);
                router.push("/CategoryPage");
              }}
                className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">All Projects</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}