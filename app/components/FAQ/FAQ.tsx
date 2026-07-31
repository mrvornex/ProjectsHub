"use client";

import { useState, useRef } from "react";
import { colors } from "@/app/constants/colors";
import { FiChevronDown, FiHelpCircle, FiMail } from "react-icons/fi";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "What is JSProjectForge?",
    answer: "JSProjectForge is a personal portfolio platform where I showcase real-world projects built using JavaScript, HTML, CSS, React, and modern web technologies.",
    category: "General",
  },
  {
    question: "Are these projects real and functional?",
    answer: "Yes. All projects are fully functional and created as part of hands-on learning and real-world problem-solving. Each project is deployed and accessible online.",
    category: "Projects",
  },
  {
    question: "Can I view the source code of these projects?",
    answer: "Absolutely. Each project includes a GitHub link where you can explore the complete source code. All repositories are public and include detailed README files.",
    category: "Code",
  },
  {
    question: "Can I use these projects for learning purposes?",
    answer: "Yes, you are welcome to explore and learn from these projects. Direct copying for commercial use is not recommended. Most projects are MIT licensed — check individual repositories for details.",
    category: "Usage",
  },
  {
    question: "Which technologies are mostly used?",
    answer: "The primary technologies include JavaScript, TypeScript, HTML, CSS, React, Next.js, Tailwind CSS, and Node.js.",
    category: "Tech",
  },
  {
    question: "How often are new projects added?",
    answer: "New projects are added regularly, typically 1–2 per month. Follow the GitHub for real-time updates.",
    category: "Updates",
  },
  {
    question: "Can I contribute to these projects?",
    answer: "Absolutely! All open-source projects welcome contributions. Check the GitHub repository for contribution guidelines.",
    category: "Community",
  },
  {
    question: "Are the projects mobile responsive?",
    answer: "Yes, every project is designed with a mobile-first approach and tested across various screen sizes.",
    category: "Design",
  },
];

const categories = ["All", "General", "Projects", "Code", "Usage", "Tech", "Updates", "Community", "Design"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-10 px-4 md:px-8 lg:px-16" style={{ background: colors.background }} ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border text-sm font-medium"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            Got Questions?
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: colors.color }}>
            Find Your Answers
          </h2>

          <p className="text-lg max-w-xl mx-auto opacity-70" style={{ color: colors.color }}>
            Everything you need to know about JSProjectForge and how you can get involved.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border transition-shadow hover:shadow-md"
                style={{ borderColor: isOpen ? colors.primary : colors.border }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                >
                  <div className="flex-1">
                    <span
                      className="inline-block text-xs font-medium mb-2 px-2 py-0.5 rounded"
                      style={{ background: colors.border, color: colors.color }}
                    >
                      {faq.category}
                    </span>
                    <h3 className="font-semibold" style={{ color: colors.color }}>
                      {faq.question}
                    </h3>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm opacity-70 pt-3" style={{ color: colors.color }}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 flex-shrink-0"
                    style={{ color: isOpen ? colors.primary : colors.color }}
                  >
                    <FiChevronDown />
                  </motion.div>
                </button>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-16">
            <div
              className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full text-2xl"
              style={{ background: colors.border, color: colors.color }}
            >
              <FiHelpCircle />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: colors.color }}>
              No results found
            </h3>
            <p className="opacity-70 max-w-sm mx-auto" style={{ color: colors.color }}>
              Try adjusting your search or filter.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-14 p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: colors.border }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FiMail style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold" style={{ color: colors.color }}>
                Still have questions?
              </h3>
            </div>
            <p className="opacity-70 max-w-lg" style={{ color: colors.color }}>
              Can't find what you're looking for? Reach out for any questions about projects, code, or collaboration.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ background: colors.primary, color: colors.background }}
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}