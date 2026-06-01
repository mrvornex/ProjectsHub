"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/app/utils/fetchProjects";

const categories = [
  {
    name: "beginners",
    image:
      "https://placehold.co/800x600/667eea/ffffff?text=Beginners&font=montserrat",
    description: "Perfect starting point for newcomers",
  },
  {
    name: "advanced",
    image:
      "https://placehold.co/800x600/43e97b/ffffff?text=Advanced&font=montserrat",
    description: "Advanced projects for experienced developers",
  },
  // {
  //   name: "navbar",
  //   image:
  //     "https://placehold.co/800x600/f093fb/ffffff?text=Navbar&font=montserrat",
  //   description: "Navigation components and patterns",
  // },
  // {
  //   name: "cards",
  //   image:
  //     "https://placehold.co/800x600/4facfe/ffffff?text=Cards&font=montserrat",
  //   description: "Card layouts and UI components",
  // },
];

export default function Home() {
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    fetchProjects().then((projects) => {
      setProjectsCount(projects.length);
    });
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-30">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Project Categories
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Explore curated collections of projects to enhance your development
            skills
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${cat.name}`} className="group block h-full">
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full bg-white">
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full capitalize">
                        {cat.name === "pro" ? "Advanced" : cat.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">
                        {cat.name}
                      </h3>
                      <motion.span
                        className="text-gray-400 group-hover:text-blue-500 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                      {cat.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center text-blue-600 font-medium text-sm md:text-base group-hover:text-blue-700 transition-colors">
                        Explore Projects
                        <svg
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 text-gray-600 bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                {categories.length}
              </div>
              <div className="text-sm md:text-base">Categories</div>
            </div>

            <div className="h-12 w-px bg-gray-300" />

            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                {projectsCount}
              </div>
              <div className="text-sm md:text-base">Projects</div>
            </div>

            <div className="h-12 w-px bg-gray-300" />

            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                Free
              </div>
              <div className="text-sm md:text-base">All Resources</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
