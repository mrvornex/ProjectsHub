"use client";

import { colors } from "@/app/constants/colors";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp, FiCode } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FiGithub />, label: "GitHub", href: "https://github.com/mrvornex" },
    { icon: <FiLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/mrvornex/" },
    { icon: <FiTwitter />, label: "Twitter", href: "https://twitter.com/mrvornex" },
    { icon: <FiMail />, label: "Email", href: "mailto:bilalali.office.pk@gmail.com" },
  ];

  const quickLinks = [
    { label: "Projects", href: "/CategoryPage" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ];

  const techStack = [
    { icon: <FaReact />, label: "React" },
    { icon: <SiNextdotjs />, label: "Next.js" },
    { icon: <SiTypescript />, label: "TypeScript" },
    { icon: <SiTailwindcss />, label: "Tailwind CSS" },
  ];

  return (
    <>
      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: colors.primary, color: colors.background }}
          >
            <FiArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer style={{ background: colors.primary, color: colors.background }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-16">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiCode className="w-6 h-6" />
                <h2 className="text-2xl font-bold">JSProjectForge</h2>
              </div>
              <p className="opacity-70 text-sm leading-relaxed">
                A free collection of hands-on JavaScript projects — built to help
                developers learn by reading and running real code.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="opacity-70 hover:opacity-100 transition-opacity text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Tech Stack</h3>
              <ul className="space-y-2">
                {techStack.map((tech, index) => (
                  <li key={index} className="flex items-center gap-2 opacity-70 text-sm">
                    {tech.icon}
                    {tech.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Let's Connect</h3>
              <p className="opacity-70 text-sm">
                Interested in collaboration or have a project in mind? Reach out.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-lg"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/15 mb-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <div className="flex items-center gap-1.5 text-center md:text-left">
              &copy; {currentYear} JSProjectForge. Built with
              <FiHeart className="inline w-3 h-3 fill-current" />
              by Bilal.
            </div>
            <a href="mailto:bilalusman1291@gmail.com" className="hover:opacity-100 hover:underline">
              Ready to collaborate? Let's talk.
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}