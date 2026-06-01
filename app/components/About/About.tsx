"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiCode, FiUsers, FiAward, FiTrendingUp, FiGlobe, FiLayers, FiTarget, FiStar, FiZap, FiShield } from "react-icons/fi";
import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/app/utils/fetchProjects";

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
    const [projectsCount, setProjectsCount] = useState(0);
    useEffect(() => {
      fetchProjects().then((projects) => {
        setProjectsCount(projects.length);
      });
    }, []);

  const stats = [
    { icon: <FiCode />, value: `${projectsCount}+`, label: "Projects Built", suffix: "", color: "from-[#FFFF80] to-[#FFD166]" },
    { icon: <FiUsers />, value: "10K+", label: "Community Members", suffix: "", color: "from-[#06D6A0] to-[#00B894]" },
    { icon: <FiAward />, value: "100%", label: "Success Rate", suffix: "", color: "from-[#EF476F] to-[#D43A5C]" },
    { icon: <FiTrendingUp />, value: "∞", label: "Learning Growth", suffix: "", color: "from-[#118AB2] to-[#0A6F9C]" },
  ];

  const coreValues = [
    {
      icon: <FiTarget />,
      title: "Mission Driven",
      description: "Empowering developers through practical, hands-on project experience.",
      gradient: "from-[#FFFF80]/20 to-[#FFD166]/20",
      borderColor: "border-[#FFFF80]/20"
    },
    {
      icon: <FiLayers />,
      title: "Progressive Learning",
      description: "Structured growth from fundamentals to advanced concepts.",
      gradient: "from-[#06D6A0]/20 to-[#00B894]/20",
      borderColor: "border-[#06D6A0]/20"
    },
    {
      icon: <FiShield />,
      title: "Quality Focus",
      description: "Production-ready code with best practices and optimization.",
      gradient: "from-[#EF476F]/20 to-[#D43A5C]/20",
      borderColor: "border-[#EF476F]/20"
    },
    {
      icon: <FiGlobe />,
      title: "Global Impact",
      description: "Open-source contributions that benefit the developer community.",
      gradient: "from-[#118AB2]/20 to-[#0A6F9C]/20",
      borderColor: "border-[#118AB2]/20"   
    }
  ];     

  const techStack = [
    { icon: <FaReact />, name: "React", color: "#61DAFB" },    
    { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" }, 
    { icon: <SiNextdotjs />, name: "Next.js", color: "#68A063" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "#38BDF8" },
    { icon: <FaGithub />, name: "GitHub", color: "#213448" },
  ];

  return (
    <section ref={containerRef} className="relative py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFFF80]/5 to-white" />
      
      {/* Animated Gradient Lines */}
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFFF80] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD166] to-transparent" />
       */}
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#FFFF80]/5 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#06D6A0]/5 to-transparent blur-3xl" />
      
      {/* Animated Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#FFFF80] to-[#FFD166]"
          initial={{ 
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0 
          }}
          animate={isInView ? { 
            y: [null, -20, 0],
            opacity: [0, 0.8, 0]
          } : {}}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 4
          }}
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + i * 10}%`
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            // className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFFF80]/20 to-[#FFD166]/20 mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 px-4 py-2 rounded-ful bg-[#213448]/5">
            <div className="w-2 h-2 rounded-full bg-[#FFFF80]" />
            <span className="text-sm font-medium text-[#213448]">About ProjectsHub</span>
            <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
          </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#213448] mb-8"
          >
            <span className="relative inline-block">
              Build. Learn.{" "}
              <span className="relative">
                Innovate
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-[#FFFF80]/50 via-[#FFD166]/50 to-[#EF476F]/50 -rotate-1 -z-0"
                />
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-xl text-[#213448]/80 max-w-4xl mx-auto leading-relaxed"
          >
            ProjectsHub is more than a portfolio—it's a living ecosystem where innovation meets execution. 
            Each project represents a story of problem-solving, creativity, and technical mastery in the 
            ever-evolving landscape of web development.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 border border-[#213448]/10 hover:border-[#213448]/20 transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-2xl">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 bg-gradient-to-br ${stat.color}`}>
                  <div className="text-2xl text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#213448] mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-[#FFFF80]">{stat.suffix}</span>}
                </div>
                <div className="text-[#213448]/70 text-sm">{stat.label}</div>
                
                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-0.5 mt-4 rounded-full bg-gradient-to-r from-transparent via-[#213448]/20 to-transparent"
                />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} blur-xl`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Core Values Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#213448] mb-4">Our Core Values</h3>
            <p className="text-[#213448]/70 max-w-2xl mx-auto">
              The principles that guide every project and interaction within our ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className={`h-full rounded-2xl p-8 border ${value.borderColor} bg-white hover:shadow-2xl transition-all duration-500`}>
                  <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br from-white to-white/80 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <div className="text-2xl text-[#213448]">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-[#213448] mb-3 group-hover:text-[#213448]/90 transition-colors">
                    {value.title}
                  </h4>
                  
                  <p className="text-[#213448]/70 leading-relaxed">
                    {value.description}
                  </p>
                  
                  {/* Value indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${value.gradient}`} />
                    <FiStar className="w-4 h-4 text-[#213448]/30" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="bg-gradient-to-r from-white to-white/90 rounded-3xl p-8 md:p-12 border border-[#213448]/10 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Tech Stack */}
            <div>
              <h3 className="text-3xl font-bold text-[#213448] mb-6">Built With Modern Stack</h3>
              <p className="text-[#213448]/70 mb-8">
                Leveraging cutting-edge technologies to create robust, scalable, and maintainable solutions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#213448]/10 hover:border-[#213448]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-2xl" style={{ color: tech.color }}>
                      {tech.icon}
                    </div>
                    <span className="text-[#213448] font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFFF80]/20 to-[#FFD166]/20 mb-6">
                <FiZap className="text-[#213448]" />
                <span className="text-[#213448] font-medium">Ready to Collaborate?</span>
              </div>
              
              <h4 className="text-2xl font-bold text-[#213448] mb-4">
                Let's Build Something Amazing Together
              </h4>
              
              <p className="text-[#213448]/70 mb-8">
                Whether you're looking to collaborate, contribute, or just explore, 
                ProjectsHub welcomes all passionate developers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <motion.a
                  href="/CategoryPage"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FFFF80] to-[#FFD166] text-[#213448] hover:shadow-xl transition-shadow"
                >
                  Explore Projects
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl font-semibold border-2 border-[#213448]/20 text-[#213448] hover:border-[#213448]/40 hover:bg-[#213448]/5 transition-all"
                >
                  Get in Touch
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final Quote */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center mt-24"
        >
          <div className="text-2xl md:text-3xl font-light text-[#213448]/60 italic max-w-3xl mx-auto leading-relaxed">
            "Code is not just instructions for computers—it's the language through which 
            we shape the digital world around us."
          </div>
          <div className="mt-6 text-[#213448]/40">— ProjectsHub Philosophy</div>
        </motion.div> */}
      </div>
    </section>
  );
}