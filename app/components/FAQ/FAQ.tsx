"use client";

import { useState, useRef } from "react";
import { FiChevronDown, FiHelpCircle, FiMail, FiMessageSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "What is ProjectsHub?",
    answer: "ProjectsHub is a personal portfolio platform where I showcase my real-world projects built using JavaScript, HTML, CSS, React, and modern web technologies.",
    category: "General",
    icon: <FiHelpCircle />
  },
  {
    question: "Are these projects real and functional?",
    answer: "Yes. All projects are fully functional and created as part of hands-on learning, practice, and real-world problem-solving experience. Each project is deployed and accessible online.",
    category: "Projects",
    icon: <FiMessageSquare />
  },
  {
    question: "Can I view the source code of these projects?",
    answer: "Absolutely. Each project includes a GitHub link where you can explore the complete source code and understand the implementation. All repositories are public and include detailed README files.",
    category: "Code",
    icon: <FiHelpCircle />
  },
  {
    question: "Can I use these projects for learning purposes?",
    answer: "Yes, you are welcome to explore and learn from these projects. However, direct copying for commercial use is not recommended. Most projects are MIT licensed - check individual repositories for details.",
    category: "Usage",
    icon: <FiMessageSquare />
  },
  {
    question: "Which technologies are mostly used?",
    answer: "The primary technologies include JavaScript, TypeScript, HTML, CSS, React, Next.js, Tailwind CSS, Node.js, and modern tooling like Git, GitHub, and various APIs.",
    category: "Tech",
    icon: <FiHelpCircle />
  },
  {
    question: "How often are new projects added?",
    answer: "I add new projects regularly as I learn and build. Typically, 1-2 new projects are added every month. You can follow my GitHub for real-time updates.",
    category: "Updates",
    icon: <FiMessageSquare />
  },
  {
    question: "Can I contribute to these projects?",
    answer: "Absolutely! All open-source projects welcome contributions. Check the GitHub repository for contribution guidelines and feel free to submit issues or pull requests.",
    category: "Community",
    icon: <FiHelpCircle />
  },
  {
    question: "Are the projects mobile responsive?",
    answer: "Yes, every project is designed with mobile-first approach and tested across various screen sizes. Responsive design is a core focus in all my web projects.",
    category: "Design",
    icon: <FiMessageSquare />
  },
];

const categories = ["All", "General", "Projects", "Code", "Usage", "Tech", "Updates", "Community", "Design"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative py-30 px-4 md:px-8 lg:px-16 overflow-hidden" ref={containerRef}>
      {/* Decorative Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFFF80] to-transparent" /> */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#FFD166]/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#06D6A0]/10 blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 px-4 py-2 rounded-ful bg-[#213448]/5">
            <div className="w-2 h-2 rounded-full bg-[#FFFF80]" />
            <span className="text-sm font-medium text-[#213448]">Got Questions?</span>
            <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#213448] mb-6">
            Find Your <span className="relative inline-block">
              Answers
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                // className="absolute bottom-2 left-0 h-3 bg-[#FFFF80]/40 -rotate-1 -z-0"
              />
            </span>
          </h2>
          
          <p className="text-lg text-[#213448]/70 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about ProjectsHub, my projects, and how you can get involved.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213448]/40">
              <FiHelpCircle />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#213448]/10 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#FFFF80] focus:shadow-lg transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#213448]/30 hover:text-[#213448] transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#213448] text-white shadow-lg"
                    : "bg-white/50 text-[#213448]/70 border border-[#213448]/10 hover:border-[#213448]/30"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className={`relative h-full rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
                  isOpen 
                    ? 'border-[#FFFF80] bg-gradient-to-br from-white to-[#FFFF80]/10 shadow-xl' 
                    : 'border-[#213448]/10 hover:border-[#213448]/30 bg-white/80 hover:shadow-lg'
                }`}>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      faq.category === "General" ? "bg-[#FFFF80]/20 text-[#213448]" :
                      faq.category === "Projects" ? "bg-[#06D6A0]/20 text-[#213448]" :
                      faq.category === "Code" ? "bg-[#118AB2]/20 text-[#213448]" :
                      "bg-[#EF476F]/20 text-[#213448]"
                    }`}>
                      {faq.category}
                    </span>
                  </div>

                  {/* Question */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-start gap-4 p-6 text-left"
                  >
                    <div className={`p-3 rounded-xl mt-1 transition-all duration-300 ${
                      isOpen 
                        ? 'bg-gradient-to-br from-[#FFFF80] to-[#FFD166] text-[#213448]' 
                        : 'bg-[#213448]/5 text-[#213448]/50 group-hover:bg-[#213448]/10'
                    }`}>
                      {faq.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-[#213448] mb-2 group-hover:text-[#213448]/90 transition-colors">
                        {faq.question}
                      </h3>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[#213448]/70 leading-relaxed pb-2">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Animated Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-2 rounded-lg mt-1 transition-colors ${
                        isOpen 
                          ? 'bg-[#213448] text-white' 
                          : 'bg-transparent text-[#213448]/30 group-hover:text-[#213448]'
                      }`}
                    >
                      <FiChevronDown className="text-xl" />
                    </motion.div>
                  </button>

                  {/* Progress Indicator */}
                  {isOpen && (
                    <div className="absolute bottom-0 left-0 right-0 h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-[#FFFF80] via-[#FFD166] to-[#FFB74D]"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFFF80] to-[#FFD166] text-[#213448] text-3xl">
              <FiHelpCircle />
            </div>
            <h3 className="text-2xl font-bold text-[#213448] mb-3">No results found</h3>
            <p className="text-[#213448]/70 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#213448] via-[#213448]/95 to-[#213448]/90 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10">
                  <FiMail className="text-xl" />
                </div>
                <h3 className="text-2xl font-bold">Still have questions?</h3>
              </div>
              <p className="text-white/80 max-w-2xl">
                Can't find the answer you're looking for? I'd be happy to help with any specific questions about projects, code, or collaborations.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FFFF80] to-[#FFD166] text-[#213448] shadow-lg hover:shadow-xl transition-all duration-300"
            >
             <Link href="/contact">Contact Me</Link> 
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 pt-8 border-t border-[#213448]/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: faqs.length, label: "Questions Answered", suffix: "+" },
              { value: "2", label: "Categories", suffix: "" },
              { value: "24/7", label: "Support Available", suffix: "" },
              { value: "100%", label: "Satisfaction Rate", suffix: "" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl font-bold text-[#213448] mb-2 relative inline-block">
                  {stat.value}
                  {stat.suffix && <span className="text-[#FFFF80]">{stat.suffix}</span>}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#FFFF80] to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="text-sm text-[#213448]/70 group-hover:text-[#213448]/90 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}