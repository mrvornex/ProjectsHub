"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp, FiCode, FiCoffee, FiEye, FiCheck } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [visitCount, setVisitCount] = useState(() => {
    return Math.floor(Math.random() * 1000) + 100;
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }

    // Here you would typically send the email to your backend
    console.log('Subscribed email:', email);

    // Show success message
    alert(`Thank you for subscribing with: ${email}`);

    // Mark as subscribed
    setIsSubscribed(true);

    // Clear the email input
    setEmail("");
  };

  const socialLinks = [
    {
      icon: <FiGithub />,
      label: "GitHub",
      href: "https://github.com/Bilal742",
      color: "hover:bg-white hover:text-[#213448]",
      tooltip: "View my code"
    },
    {
      icon: <FiLinkedin />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhaammad-bilal/",
      color: "hover:bg-[#0A66C2] hover:text-white",
      tooltip: "Connect professionally"
    },
    {
      icon: <FiTwitter />,
      label: "Twitter",
      href: "https://twitter.com/",
      color: "hover:bg-[#1DA1F2] hover:text-white",
      tooltip: "Follow updates"
    },
    {
      icon: <FiMail />,
      label: "Email",
      href: "mailto:bilalusman1291@gmail.com",
      color: "hover:bg-[#FFFF80] hover:text-[#213448]",
      tooltip: "Send email"
    }
  ];

  const quickLinks = [
    { label: "Projects", href: "/CategoryPage" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" }
  ];

  const techStack = [
    { icon: <FaReact />, label: "React", color: "text-[#61DAFB]" },
    { icon: <SiNextdotjs />, label: "Next.js", color: "text-black dark:text-white" },
    { icon: <FiCode />, label: "TypeScript", color: "text-[#3178C6]" },
    { icon: <SiTailwindcss />, label: "Tailwind CSS", color: "text-sky-400" }
  ];

  return (
    <>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-gradient-to-br from-[#213448] to-[#1a2938] text-white shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="relative bg-gradient-to-b from-[#213448] to-[#1a2938] text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFFF80] via-[#FFD166] to-[#EF476F]" />

        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#FFFF80]/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#06D6A0]/5 blur-3xl" />

        {/* Animated Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-[#FFFF80] to-transparent"
            initial={{
              y: Math.random() * 100,
              x: Math.random() * 100,
              opacity: 0
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 4
            }}
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${20 + i * 5}%`
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 z-10">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#FFFF80] to-[#FFD166]">
                  <FiCode className="w-6 h-6 text-[#213448]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">ProjectsHub</h2>
                  <div className="h-1 w-12 mt-2 rounded-full bg-gradient-to-r from-[#FFFF80] to-[#FFD166]" />
                </div>
              </div>

              <p className="text-white/80 leading-relaxed">
                Transforming ideas into reality through code. Building innovative solutions
                that make a difference, one project at a time.
              </p>

              {/* Visit Counter */}
              {/* <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#FFFF80] to-[#FFD166]">
                  <FiEye className="w-4 h-4 text-[#213448]" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Live Visits</div>
                  <div className="text-xl font-bold text-white">
                    {visitCount.toLocaleString()}
                  </div>
                </div>
              </div> */}
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-[#FFFF80]">#</span> Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFFF80] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                      <FiArrowUp className="w-3 h-3 rotate-45 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-[#06D6A0]">{"</>"}</span> Tech Stack
              </h3>
              <div className="space-y-3">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className={`text-2xl ${tech.color}`}>
                      {tech.icon}
                    </div>
                    <span className="text-white/80">{tech.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Connect Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-[#EF476F]">@</span> Let's Connect
              </h3>
              <p className="text-white/80">
                Interested in collaboration or have a project in mind?
                Reach out through any platform.
              </p>

              {/* Social Links with Tooltips */}
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center"
                  >
                    <div className={`text-2xl mb-2 transition-colors ${social.color.split(' ')[0]}`}>
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium">{social.label}</span>

                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#213448] to-[#1a2938] text-xs whitespace-nowrap shadow-xl">
                        {social.tooltip}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="flex items-center gap-2 text-white/60">
                <FiCoffee className="w-4 h-4" />
                <span>
                  &copy; {currentYear} ProjectsHub. Crafted with
                  <FiHeart className="inline mx-1 w-3 h-3 text-[#EF476F] fill-[#EF476F]" />
                  by Bilal.
                </span>
              </div>
              <p className="text-sm text-white/40 mt-2">
                All projects are open source and available for learning.
              </p>
            </motion.div>

            {/* Newsletter Signup - Show only if not subscribed */}
            {!isSubscribed ? (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-2"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFFF80] min-w-[200px]"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFFF80] to-[#FFD166] text-[#213448] font-semibold hover:shadow-lg transition-shadow"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            ) : (
              // Show success message when subscribed
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#06D6A0]/20 to-[#06D6A0]/10 border border-[#06D6A0]/30"
              >
                <div className="p-2 rounded-full bg-[#06D6A0]">
                  <FiCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#06D6A0]">Subscribed!</div>
                  <div className="text-sm text-white/70">Thank you for joining our newsletter</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#213448] to-[#1a2938] border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFFF80]/10 to-[#FFD166]/10">
              <div className="w-2 h-2 rounded-full bg-[#FFFF80] animate-pulse" />
              <span className="text-sm">
                🚀 Ready to collaborate? <a href="mailto:bilalusman1291@gmail.com" className="font-semibold text-[#FFFF80] hover:underline">Let's build something amazing!</a>
              </span>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  );
}