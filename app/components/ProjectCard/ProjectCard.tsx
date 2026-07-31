"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";
import { colors } from "@/app/constants/colors";
import { Project } from "@/app/utils/fetchProjects";

interface Props {
  project: Project;
  index?: number;
  showViewAll?: boolean;
}

export default function ProjectCard({
  project,
  index = 0,
  showViewAll = false,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group"
      >
        <div
          className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg"
          style={{
            background: colors.background,
            borderColor: colors.border,
          }}
        >
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute left-3 top-3 z-20 rounded-full bg-white/80 p-2 shadow-md"
          >
            <FiStar
              className="text-base"
              style={{
                color: isLiked ? "#F59E0B" : colors.color,
                fill: isLiked ? "#F59E0B" : "none",
                opacity: isLiked ? 1 : 0.5,
              }}
            />
          </button>

          {/* Image */}
          <div
            className="relative h-56 overflow-hidden"
            style={{ background: colors.border }}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-300" />
            )}

            <img
              src={
                project.image ||
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop"
              }
              alt={project.title}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop";
              }}
              className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3
                className="text-lg font-bold"
                style={{ color: colors.color }}
              >
                {project.title}
              </h3>

              <FiExternalLink
                className="mt-1 opacity-40 transition-opacity group-hover:opacity-100"
                style={{ color: colors.primary }}
              />
            </div>

            <p
              className="mb-5 line-clamp-3 text-sm opacity-70"
              style={{ color: colors.color }}
            >
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: colors.border,
                    color: colors.color,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
                  style={{
                    background: colors.primary,
                    color: colors.background,
                  }}
                >
                  <FiExternalLink />
                  Demo
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium"
                  style={{
                    borderColor: colors.border,
                    color: colors.color,
                  }}
                >
                  <FiGithub />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {showViewAll && index === 5 && (
        <div className="col-span-full mt-10 flex justify-center">
          <a
            href="/projects"
            className="group flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition"
            style={{
              borderColor: colors.border,
              color: colors.color,
            }}
          >
            Explore All Projects

            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}