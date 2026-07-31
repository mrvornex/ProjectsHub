"use client";

import { colors } from "@/app/constants/colors";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiCode } from "react-icons/fi";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/app/utils/fetchProjects";

export default function HeroSection() {
    const [projectsCount, setProjectsCount] = useState(0);

    useEffect(() => {
        fetchProjects().then((projects) => {
            setProjectsCount(projects.length);
        });
    }, []);

    const stats = [
        { number: `${projectsCount}+`, label: "Projects" },
        { number: "100K+", label: "Lines of Code" },
        { number: "500+", label: "GitHub Stars" },
    ];

    return (
        <section
            className="min-h-screen flex items-center justify-center px-4 py-32"
            style={{
                backgroundImage: `url('/hero-bg.svg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: colors.background,
            }}
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border text-sm font-medium"
                    style={{ borderColor: colors.primary, color: colors.primary, background: `${colors.background}CC` }}
                >
                    <FiCode size={14} />
                    {projectsCount}+ Open Source Projects
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
                    style={{ color: colors.color }}
                >
                    Build, Learn & Innovate
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-80"
                    style={{ color: colors.color }}
                >
                    A curated collection of interactive JavaScript projects.
                    Explore code, contribute, and master modern web development.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                >
                 <a   
                        href="/CategoryPage"
                        className="px-7 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        style={{ background: colors.primary, color: colors.background }}
                    >
                        Explore Projects
                        <FiArrowRight />
                    </a>

                    <a
                        href="https://github.com/mrvornex"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border hover:bg-gray-50 transition-colors"
                        style={{ borderColor: colors.border, color: colors.color, background: `${colors.background}CC` }}
                    >
                        <FiGithub />
                        View GitHub
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex flex-wrap justify-center gap-10"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.primary }}>
                                {stat.number}
                            </div>
                            <div className="text-sm opacity-70" style={{ color: colors.color }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}