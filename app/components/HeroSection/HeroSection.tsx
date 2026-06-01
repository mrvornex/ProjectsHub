"use client";

import { colors } from "@/constants/colors";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiStar, FiCode } from "react-icons/fi";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/app/utils/fetchProjects";

export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [projectsCount, setProjectsCount] = useState(0);
    useEffect(() => {
        fetchProjects().then((projects) => {
            setProjectsCount(projects.length);
        });
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const gradientX = windowSize.width ? (mousePosition.x / windowSize.width) * 100 : 50;
    const gradientY = windowSize.height ? (mousePosition.y / windowSize.height) * 100 : 50;
    const [particles, setParticles] = useState<{ left: number, top: number }[]>([]);

    useEffect(() => {
        // Generate random positions only on client
        const generated = [...Array(20)].map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
        }));
        setParticles(generated);

        // Capture window size for gradient
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);



    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-40">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Background */}
                <div
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                        background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, 
              rgba(${parseInt(colors.color.slice(1, 3), 16)}, 
              ${parseInt(colors.color.slice(3, 5), 16)}, 
              ${parseInt(colors.color.slice(5, 7), 16)}, 0.1) 0%, 
              rgba(${parseInt(colors.background.slice(1, 3), 16)}, 
              ${parseInt(colors.background.slice(3, 5), 16)}, 
              ${parseInt(colors.background.slice(5, 7), 16)}, 0.95) 100%)`,
                    }}
                />

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.color} 1px, transparent 1px),
                               linear-gradient(to bottom, ${colors.color} 1px, transparent 1px)`,
                            backgroundSize: '50px 50px',
                        }}
                    />
                </div>
                {/* Floating Particles */}
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            background: colors.color,
                            opacity: 0.3,
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, Math.sin(i) * 10, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}

            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
                    style={{
                        borderColor: colors.color,
                        background: `${colors.background}80`,
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <FiStar className="animate-pulse" />
                    <span className="text-sm font-medium">{projectsCount}+ Open Source Projects</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                    style={{ color: colors.color }}
                >
                    <span className="block">Build, Learn &</span>
                    <span className="block relative">
                        <span className="relative z-10">Innovate</span>
                        <motion.span
                            className="absolute inset-0 opacity-20 blur-xl"
                            animate={{
                                background: [`linear-gradient(90deg, ${colors.color}, transparent)`,
                                `linear-gradient(270deg, ${colors.color}, transparent)`]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90"
                    style={{ color: colors.color }}
                >
                    Dive into a curated collection of interactive JavaScript projects.
                    <span className="block mt-2 text-lg opacity-80">
                        Explore code, contribute, and master modern web development.
                    </span>
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-8 mb-12"
                >
                    {[
                        { number: `${projectsCount}+`, label: "Projects", icon: <FiCode /> },
                        { number: "100K+", label: "Lines of Code", icon: <FiCode /> },
                        { number: "500+", label: "GitHub Stars", icon: <FiStar /> },
                        { number: "24/7", label: "Active", icon: <FiStar /> },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center px-6 py-4 rounded-2xl"
                            style={{
                                background: `${colors.background}40`,
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${colors.color}20`,
                            }}
                        >
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="text-2xl font-bold" style={{ color: colors.color }}>
                                    {stat.number}
                                </span>
                                <span style={{ color: colors.color }}>{stat.icon}</span>
                            </div>
                            <div className="text-sm opacity-80" style={{ color: colors.color }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    <motion.a
                        href="/CategoryPage"
                        className="group relative px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 overflow-hidden"
                        style={{
                            background: colors.color,
                            color: colors.background,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <span className="relative z-10">Explore Projects</span>
                        <motion.span
                            animate={{ x: isHovered ? 5 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <FiArrowRight />
                        </motion.span>
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: [`linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                                    `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.a>

                    <motion.a
                        href="https://github.com/Bilal742"
                        target="_blank"
                        className="group relative px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 border-2"
                        style={{
                            borderColor: colors.color,
                            color: colors.color,
                            background: `${colors.background}80`,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <FiGithub />
                            View GitHub
                        </span>
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-full"
                            style={{ background: `${colors.color}10` }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.a>
                </motion.div>

                {/* Preview Image/Video */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-5xl border-4"
                    style={{ borderColor: `${colors.color}20` }}
                >
                    {/* Glass Effect Overlay */}
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background: `linear-gradient(to bottom, transparent 0%, ${colors.background}80 100%)`,
                        }}
                    />

                    {/* Code Preview */}
                    <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-left font-mono text-sm">
                            <div className="text-green-400">// Interactive Projects</div>
                            <div className="text-blue-400">const</div>
                            <div className="text-pink-400">innovation</div>
                            <div className="text-white">=</div>
                            <div className="text-yellow-300">await</div>
                            <div className="text-green-400">ProjectsHub</div>
                            <div className="text-white">();</div>
                        </div>
                    </div>

                    <img
                        src="/bg.png"
                        alt="Developer workspace with code preview"
                        className="w-full h-[400px] md:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                    />

                    {/* Floating Elements */}
                    <div className="absolute bottom-6 right-6 z-20">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-black/70 backdrop-blur-sm rounded-xl p-4 border"
                            style={{ borderColor: colors.color }}
                        >
                            <div className="text-sm font-mono text-white">
                                Live Preview
                            </div>
                            <div className="text-xs opacity-70 text-white">
                                {projectsCount}+ Projects Active
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-bold  text-black">
                            Scroll to explore
                        </span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 rounded-full border-2 flex justify-center border-black"
                        >
                            <div className="w-1 h-3 rounded-full mt-2 bg-black"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}