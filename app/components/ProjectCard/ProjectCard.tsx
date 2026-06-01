"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiStar, FiEye, FiCode, FiCalendar, FiUsers } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Project } from "@/app/utils/fetchProjects";

interface Props {
  project: Project;
  index?: number;
  isFeatured?: boolean;
  viewMode?: 'grid' | 'list';
  showViewAll?: boolean;
}

export default function ProjectCard({ project, index = 0, isFeatured = true, showViewAll = false }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [daysAgo, setDaysAgo] = useState<number>(0);
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const randomDays = Math.floor(Math.random() * 90) + 1;
    setDaysAgo(randomDays);
    const baseViews = Math.floor(Math.random() * 500) + 100;
    const bonusViews = Math.floor(randomDays * 15);
    setViewCount(baseViews + bonusViews);
  }, []);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'advanced': return 'from-[#EF476F] to-[#D43A5C]';
      case 'intermediate': return 'from-[#FFD166] to-[#FFB74D]';
      case 'beginner': return 'from-[#06D6A0] to-[#00B894]';
      default: return 'from-[#118AB2] to-[#0A6F9C]';
    }
  };

  // const formatDaysAgo = (days: number) => {
  //   if (days === 0) return 'Today';
  //   if (days === 1) return 'Yesterday';
  //   if (days < 7) return `${days} days ago`;
  //   if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  //   if (days < 365) return `${Math.floor(days / 30)} months ago`;
  //   return `${Math.floor(days / 365)} years ago`;
  // };

  // const formatViewCount = (views: number) => {
  //   if (views < 1000) return views.toString();
  //   if (views < 1000000) return `${(views / 1000).toFixed(1)}K`;
  //   return `${(views / 1000000).toFixed(1)}M`;
  // };

  return (
    <>
      {/* {isFeatured && index === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="col-span-full mb-16 text-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-gradient-to-r from-[#FFFF80]/20 via-transparent to-[#FFD166]/20 blur-3xl -z-10" />
          
          <div className="bg-[#213448]/5 px-4 py-2 rounded-full inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#F4F5F6]/20 to-[#F4F5F6]/20 mb-6">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#FFFF80]" />
              <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
              <div className="w-2 h-2 rounded-full bg-[#EF476F]" />
            </div>
            <span className="text-sm font-medium text-[#213448] ">Featured Collection</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#213448] mb-6 relative">
            <span className="relative inline-block">
              Projects Showcase
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            </span>
          </h1>
          
          <p className="text-lg text-[#213448]/70 max-w-3xl mx-auto leading-relaxed">
            A curated collection of innovative solutions blending cutting-edge technology with elegant design. 
            Each project tells a story of problem-solving, creativity, and technical excellence.
          </p>
        </motion.div>
      )} */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100 
        }}
        whileHover={{ y: -8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative"
      >
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#213448]/10 bg-gradient-to-b from-white to-white/80 backdrop-blur-sm transition-all duration-500 group-hover:shadow-xl">
          
          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4 z-20">
            {/* <div className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg bg-gradient-to-r ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty || 'Intermediate'}
            </div> */}
          </div>

          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FiStar className={`text-lg ${isLiked ? 'fill-[#FFD166] text-[#FFD166]' : 'text-[#213448]/40'}`} />
          </button>

          {/* Image Section */}
          <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-[#213448]/5 to-[#213448]/10">
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-[#213448]/10 via-[#213448]/5 to-[#213448]/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </motion.div>
            )}

            {/* Project Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop";
              }}
              className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Stats Overlay - Always visible at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#213448]/90 to-transparent">
              <div className="flex items-center justify-between text-white">
                {/* Views */}
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                    {/* <FiEye className="w-3.5 h-3.5" /> */}
                  </div>
                  <div>
                    {/* <div className="text-xs text-white/70">Views</div>
                    <div className="text-sm font-semibold">{formatViewCount(viewCount)}</div> */}
                  </div>
                </div>

                
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                    {/* <FiCalendar className="w-3.5 h-3.5" /> */}
                  </div>
                  <div>
                    {/* <div className="text-xs text-white/70">Added</div>
                    <div className="text-sm font-semibold">{formatDaysAgo(daysAgo)}</div> */}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                    {/* <FiUsers className="w-3.5 h-3.5" /> */}
                  </div>
                  <div>
                    {/* <div className="text-xs text-white/70">Seen by</div> */}
                    <div className="text-sm font-semibold">
                      {/* {Math.floor(viewCount / 10).toLocaleString()}+ */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Enhancement Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#213448]/40 via-transparent to-transparent"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Title and Underline */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-[#213448] flex-1 group-hover:text-[#213448]/90 transition-colors">
                  {project.title}
                </h3>
                <motion.div
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-2 rounded-lg bg-[#213448]/5 text-[#213448]/30 group-hover:text-[#213448] group-hover:bg-[#FFFF80]/20"
                >
                  <FiExternalLink className="w-4 h-4" />
                </motion.div>
              </div>
              <motion.div
                initial={{ width: 32 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
                className="h-1 rounded-full bg-gradient-to-r from-[#FFFF80] via-[#FFD166] to-[#FFB74D]"
              />
            </div>

            {/* Description */}
            <p className="text-[#213448]/70 leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(project.techStack || []).map((tech, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -2, backgroundColor: '#FFFF80' }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-[#213448]/10 bg-gradient-to-r from-white to-white/50 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300"
                  style={{ color: '#213448' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #213448 0%, #1a2938 100%)',
                    color: 'white',
                  }}
                >
                  <FiExternalLink className="w-4 h-4" />
                  Demo
                </motion.a>
              )}

              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 rounded-xl font-medium border-2 flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: '#213448',
                    color: '#213448',
                    background: 'linear-gradient(135deg, rgba(255, 255, 128, 0.1) 0%, rgba(255, 209, 102, 0.1) 100%)',
                  }}
                >
                  <FiGithub className="w-4 h-4" />
                   Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Enhanced Hover Effect - Subtle background gradient */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[#FFFF80]/10 via-transparent to-[#FFD166]/5"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Floating Particles Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-20 overflow-hidden rounded-3xl pointer-events-none"
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-[#FFFF80] to-[#FFD166]"
                  initial={{
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    opacity: 0
                  }}
                  animate={{
                    y: [null, -8, 0],
                    x: [null, Math.random() * 6 - 3, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  style={{
                    left: `${15 + i * 20}%`,
                    top: `${30 + i * 12}%`
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* View All Projects Button */}
      {showViewAll && index === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-full flex justify-center mt-12"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-2xl font-semibold border-2 transition-all duration-300 hover:shadow-2xl flex items-center gap-3"
            style={{
              borderColor: '#213448',
              color: '#213448',
              background: 'linear-gradient(135deg, rgba(255, 255, 128, 0.1) 0%, rgba(255, 209, 102, 0.1) 100%)',
            }}
          >
            <span>Explore All Projects</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </>
  );
}