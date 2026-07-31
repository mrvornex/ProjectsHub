"use client";

import { colors } from "@/app/constants/colors";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiCode, FiFolder, FiLayers, FiCheckCircle } from "react-icons/fi";
import { FaReact, FaGithub } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiJavascript } from "react-icons/si";
import { fetchProjects } from "@/app/utils/fetchProjects";

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [projectsCount, setProjectsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    fetchProjects().then((projects) => {
      setProjectsCount(projects.length);
      const uniqueCategories = new Set(projects.map((p: any) => p.category));
      setCategoriesCount(uniqueCategories.size);
    });
  }, []);

  // Real info: what visitors actually get
  const whatYouGet = [
    {
      icon: <FiCode />,
      title: "Full Source Code",
      description: "Every project comes with complete HTML, CSS, and JavaScript — copy, run, and modify freely.",
    },
    {
      icon: <FiLayers />,
      title: "Beginner to Advanced",
      description: "Projects range from simple UI components to complex apps, so you can grow at your own pace.",
    },
    {
      icon: <FiFolder />,
      title: "Organized by Category",
      description: `Projects are grouped into ${categoriesCount || "multiple"} categories, making it easy to find what you want to learn.`,
    },
    {
      icon: <FiCheckCircle />,
      title: "No Sign-Up Needed",
      description: "Browse, view code, and download projects instantly — no account or payment required.",
    },
  ];

  const techStack = [
    // { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
  ];

  return (
    <section ref={containerRef} className="py-0 px-4 md:px-8 lg:px-16" style={{ background: colors.background }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border text-sm font-medium"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            About JSProjectForge
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: colors.color }}
          >
            Learn JavaScript by Building
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto opacity-80"
            style={{ color: colors.color }}
          >
            JSProjectForge is a free collection of {projectsCount || "many"}+ ready-made HTML, CSS,
            and JavaScript projects — built to help you learn by reading and running real code,
            not just tutorials.
          </motion.p>
        </div>

        {/* What You Get - real, useful info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
        >
          {whatYouGet.map((item, index) => (
            <div
              key={index}
              className="rounded-xl p-6 border hover:shadow-md transition-shadow"
              style={{ borderColor: colors.border }}
            >
              <div className="text-xl mb-4" style={{ color: colors.primary }}>
                {item.icon}
              </div>
              <h4 className="font-bold mb-2" style={{ color: colors.color }}>
                {item.title}
              </h4>
              <p className="text-sm opacity-70" style={{ color: colors.color }}>
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Tech Stack & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl p-8 md:p-12 border"
          style={{ borderColor: colors.border }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Tech Stack */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.color }}>
                Technologies Covered
              </h3>
              <p className="opacity-70 mb-6" style={{ color: colors.color }}>
              JSProjectForge are built using these core web technologies — the same ones
                used in real-world development.
              </p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium"
                    style={{ borderColor: colors.border, color: colors.color }}
                  >
                    <span className="text-lg" style={{ color: colors.primary }}>{tech.icon}</span>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-right">
              <h4 className="text-xl font-bold mb-3" style={{ color: colors.color }}>
                Ready to Start Learning?
              </h4>
              <p className="opacity-70 mb-6" style={{ color: colors.color }}>
                Browse all {projectsCount || ""}+ projects, pick one that matches your level,
                and start exploring the code.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
                <a
                  href="/CategoryPage"
                  className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: colors.primary, color: colors.background }}
                >
                  Browse Projects
                </a>
                <a
                  href="https://github.com/mrvornex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg font-semibold border hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  style={{ borderColor: colors.border, color: colors.color }}
                >
                  <FaGithub />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}