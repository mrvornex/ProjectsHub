"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { colors } from "@/app/constants/colors";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import { fetchProjects, Project } from "@/app/utils/fetchProjects";

type SortOption = "newest" | "oldest" | "popular" | "alphabetical";

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const category = params?.category as string;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!category) return;

    const loadProjects = async () => {
      setLoading(true);
      try {
        const allProjects = await fetchProjects();
        const filtered = allProjects.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );
        setProjects(filtered);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [category]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) => p.tags?.includes(tag))
      );
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime());
        break;
      case "alphabetical":
        result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "popular":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }

    return result;
  }, [projects, searchQuery, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: colors.background }}
      >
        <div
          className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{
            borderColor: colors.border,
            borderTopColor: colors.primary,
          }}
        />
        <p className="text-sm opacity-70 capitalize" style={{ color: colors.color }}>
          Loading {category} projects...
        </p>
      </div>
    );
  }
  if (!category || projects.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center p-6"
        style={{ background: colors.background }}
      >
        <h1 className="text-3xl font-bold mb-3" style={{ color: colors.color }}>
          {!category ? "Category Not Found" : "No Projects Yet"}
        </h1>
        <p className="opacity-70 mb-6" style={{ color: colors.color }}>
          {!category
            ? "The requested category could not be found."
            : `The ${category} category is empty right now.`}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-lg border hover:bg-gray-50 transition-colors"
            style={{ borderColor: colors.border, color: colors.color }}
          >
            Go Back
          </button>
          <button
            onClick={() => router.push("/CategoryPage")}
            className="px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
            style={{ background: colors.primary, color: colors.background }}
          >
            Explore All Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24" style={{ background: colors.background }}>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold capitalize mb-2" style={{ color: colors.color }}>
          {category}
        </h1>
        <p className="opacity-70" style={{ color: colors.color }}>
          {projects.length} projects found
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2.5 rounded-lg border focus:outline-none transition-colors"
          style={{ borderColor: colors.border, color: colors.color }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-2.5 rounded-lg border focus:outline-none transition-colors"
          style={{ borderColor: colors.border, color: colors.color }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
          <option value="alphabetical">A to Z</option>
        </select>
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1.5 rounded-full text-sm border transition-colors"
                style={
                  isActive
                    ? { background: colors.primary, color: colors.background, borderColor: colors.primary }
                    : { color: colors.color, borderColor: colors.border }
                }
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="px-3 py-1.5 rounded-full text-sm opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: colors.color }}
            >
              Clear tags
            </button>
          )}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <p className="opacity-70 mb-4" style={{ color: colors.color }}>
            No projects match your search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTags([]);
            }}
            className="px-5 py-2.5 rounded-lg border hover:bg-gray-50 transition-colors"
            style={{ borderColor: colors.border, color: colors.color }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}