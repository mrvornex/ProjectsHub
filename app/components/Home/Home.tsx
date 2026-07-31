"use client";

import Link from "next/link";
import { colors } from "@/app/constants/colors";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/app/utils/fetchProjects";
import { FiArrowRight } from "react-icons/fi";

const categories = [
  {
    name: "beginners",
    description: "Perfect starting point for newcomers",
  },
  {
    name: "advanced",
    description: "Advanced projects for experienced developers",
  },
];

export default function Home() {
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    fetchProjects().then((projects) => {
      setProjectsCount(projects.length);
    });
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-24" style={{ background: colors.background }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.color }}>
            Project Categories
          </h1>
          <p className="text-lg max-w-xl mx-auto opacity-70" style={{ color: colors.color }}>
            Explore curated collections of projects to enhance your development skills
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/projects/${cat.name}`} className="group block">
                <div
                  className="rounded-xl p-8 border hover:shadow-md transition-shadow h-full"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold capitalize" style={{ color: colors.color }}>
                      {cat.name}
                    </h3>
                    <FiArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      style={{ color: colors.primary }}
                    />
                  </div>

                  <p className="mb-6 opacity-70" style={{ color: colors.color }}>
                    {cat.description}
                  </p>

                  <span
                    className="inline-flex items-center text-sm font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Explore Projects
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center"
        >
          <div
            className="inline-flex items-center gap-8 rounded-xl p-6 md:p-8 border"
            style={{ borderColor: colors.border }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: colors.color }}>
                {categories.length}
              </div>
              <div className="text-sm opacity-70" style={{ color: colors.color }}>
                Categories
              </div>
            </div>

            <div className="h-10 w-px" style={{ background: colors.border }} />

            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: colors.color }}>
                {projectsCount}
              </div>
              <div className="text-sm opacity-70" style={{ color: colors.color }}>
                Projects
              </div>
            </div>

            <div className="h-10 w-px" style={{ background: colors.border }} />

            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: colors.color }}>
                Free
              </div>
              <div className="text-sm opacity-70" style={{ color: colors.color }}>
                All Resources
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}