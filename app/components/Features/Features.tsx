"use client";

import { FiCode, FiLayers, FiGithub, FiTrendingUp, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
// import { useState } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/app/utils/fetchProjects";

const features = [
  {
    icon: <FiCode />,
    title: "Clean & Scalable Code",
    description: "All projects are written with clean, readable, and scalable code following modern best practices.",
    details: ["Modular Architecture", "TypeScript Integration", "Performance Optimized", "Best Practices"],
    color: "from-[#FFD166] to-[#FFB74D]",
    accentColor: "#FFB74D"
  },
  {
    icon: <FiLayers />,
    title: "Real-World Projects",
    description: "Each project solves practical problems and reflects real-world development experience.",
    details: ["Industry Standards", "Production Ready", "User-Centric Design", "Problem Solving"],
    color: "from-[#06D6A0] to-[#00B894]",
    accentColor: "#06D6A0"
  },
  {
    icon: <FiGithub />,
    title: "Open Source Code",
    description: "Every project includes a GitHub repository so you can explore the full source code.",
    details: ["MIT License", "Documentation", "Contributions Welcome", "Code Reviews"],
    color: "from-[#118AB2] to-[#0A6F9C]",
    accentColor: "#118AB2"
  },
  {
    icon: <FiTrendingUp />,
    title: "Continuous Growth",
    description: "ProjectsHub represents my continuous learning journey and improvement as a developer.",
    details: ["Weekly Updates", "Skill Progression", "Latest Tech", "Community Feedback"],
    color: "from-[#EF476F] to-[#D43A5C]",
    accentColor: "#EF476F"
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [projectsCount, setProjectsCount] = useState(0);
  useEffect(() => {
    fetchProjects().then((projects) => {
      setProjectsCount(projects.length);
    });
  }, []);

  return (
    <section className="relative py-30 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-[#213448]/[0.03] overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFFF80] via-[#FFD166] to-[#EF476F]" /> */}

      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FFFF80]/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#06D6A0]/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#213448]/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFFF80]" />
            <span className="text-sm font-medium text-[#213448]/70">Why Choose ProjectsHub</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#213448] mb-6">
            Beyond Just <span className="relative inline-block">
              <span className="relative z-10">Projects</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-2 left-0 h-3 bg-[#FFFF80]/50 -rotate-1 -z-0"
              />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#213448]/70 max-w-3xl mx-auto leading-relaxed">
            ProjectsHub is a living portfolio that evolves with technology — showcasing not just what I build,
            but <span className="font-semibold text-[#213448]">how</span> I build it.
          </p>
        </motion.div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative"
            >
              <div className={`relative bg-white rounded-3xl p-8 border-2 border-transparent transition-all duration-500 ${activeIndex === index
                  ? 'border-opacity-100 shadow-2xl'
                  : 'hover:border-opacity-30 shadow-lg hover:shadow-2xl'
                }`}
                style={{
                  borderColor: activeIndex === index ? feature.accentColor : 'transparent'
                }}>

                {/* Gradient Corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${feature.color} opacity-10 rounded-tr-3xl rounded-bl-3xl transition-opacity duration-500 group-hover:opacity-20`} />

                {/* Animated Icon */}
                <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-4 text-white shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <div className="relative z-10 text-2xl">
                    {feature.icon}
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md" />
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-[#213448] mb-3 group-hover:text-[#213448]/90 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#213448]/70 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Expandable Details */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeIndex === index ? "auto" : 0,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 border-t border-[#213448]/10"
                  >
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[#213448]/70">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Animated Indicator */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: feature.accentColor }}>
                  <span>Learn more</span>
                  <FiChevronRight className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute -z-10 inset-0 overflow-hidden rounded-3xl">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}
                    initial={{
                      x: Math.random() * 100,
                      y: Math.random() * 100,
                      opacity: 0
                    }}
                    animate={{
                      y: [null, -20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#213448] via-[#213448]/95 to-[#213448]/90 rounded-2xl p-8 md:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: `${projectsCount}+`, label: "Projects Built" },
              { value: "100%", label: "Open Source" },
              { value: "24/7", label: "Code Updates" },
              { value: "∞", label: "Learning Curve" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 relative inline-block">
                  {stat.value}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#FFFF80] to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#213448]/70 mb-8 max-w-2xl mx-auto">
            Ready to dive deeper? Explore the code, contribute, or get inspired for your next project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-[#213448] to-[#1a2938] hover:shadow-xl"
            >
              <Link href="/projects">Explore All Projects</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300 bg-white hover:bg-[#FFFF80]/10"
              style={{ borderColor: '#213448', color: '#213448' }}
            >
              <Link href="https://github.com/Bilal742" target="blank">View GitHub Profile</Link>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}