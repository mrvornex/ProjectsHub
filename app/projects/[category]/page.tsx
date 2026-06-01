"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import { fetchProjects, Project } from "@/app/utils/fetchProjects";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Grid3x3, 
  List, 
  TrendingUp, 
  Calendar,
  ArrowLeft,
  Star,
  Zap,
  ChevronDown,
  X
} from "lucide-react";

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'popular' | 'alphabetical';

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const category = params?.category as string;
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [animateHeader, setAnimateHeader] = useState(false);

  // Fetch projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const allProjects = await fetchProjects();
        const filtered = allProjects.filter(p => 
          p.category?.toLowerCase() === category?.toLowerCase()
        );
        setProjects(filtered);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (category) {
      loadProjects();
    }
  }, [category]);

  // Collect all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags?.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags);
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project =>
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter(project =>
        selectedTags.every(tag => project.tags?.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'oldest':
        result.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case 'alphabetical':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'popular':
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }

    return result;
  }, [projects, searchQuery, selectedTags, sortBy]);

  // Header animation
  useEffect(() => {
    if (category) {
      setAnimateHeader(true);
      const timer = setTimeout(() => setAnimateHeader(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [category]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center p-6">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-20 w-20 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8 space-y-2 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            Loading {category} Projects
          </h3>
          <p className="text-gray-600">Crafting your visual experience...</p>
        </motion.div>
      </div>
    );
  }

  if (!category || projects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="relative mb-6">
            <div className="text-8xl mb-2">🚀</div>
            <div className="absolute -top-2 -right-2">
              <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {!category ? "Category Not Found" : "Category Empty"}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {!category 
              ? "The requested category could not be found."
              : `The ${category} category is waiting for its first masterpiece. Be the pioneer!`
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all flex items-center justify-center gap-2 border border-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/CategoryPage')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Explore All Projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-[1px] h-[100px] bg-gradient-to-b from-blue-500/10 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={animateHeader ? { scale: [1, 1.1, 1] } : {}}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-gray-200 mb-8"
            >
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-blue-500"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-purple-500"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-pink-500"
                />
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Exclusive Collection
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent capitalize">
                {category}
              </span>
              <br />
              {/* <span className="text-4xl md:text-6xl text-gray-700">Projects</span> */}
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Dive into a curated universe of innovation where each project pushes 
              the boundaries of what's possible. Experience the future, today.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{projects.length}</div>
                <div className="text-sm text-gray-500">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {Math.max(...projects.map(p => p.views || 0)).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Peak Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {new Set(projects.flatMap(p => p.tags || [])).size}
                </div>
                <div className="text-sm text-gray-500">Unique Technologies</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="sticky top-0 z-40 mb-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects, technologies, features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </motion.button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="alphabetical">A to Z</option>
                </select>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-500 mb-4">Filter by Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <motion.button
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-lg transition-all ${selectedTags.includes(tag)
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {tag}
                        </motion.button>
                      ))}
                    </div>
                    
                    {selectedTags.length > 0 && (
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
                        </span>
                        <button
                          onClick={() => setSelectedTags([])}
                          className="text-sm text-red-500 hover:text-red-600 transition-colors"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Projects Found
                </h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all border border-gray-300"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                  : "space-y-6"
                }
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <ProjectCard 
                        project={project} 
                        index={index}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Info */}
          {filteredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200 shadow-sm">
                <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                <p className="text-gray-600">
                  Displaying <span className="font-bold text-gray-800">{filteredProjects.length}</span> of{" "}
                  <span className="font-bold text-gray-800">{projects.length}</span> projects
                  {selectedTags.length > 0 && (
                    <span className="text-blue-600"> • {selectedTags.length} filter{selectedTags.length !== 1 ? 's' : ''} active</span>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl z-50"
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.button>
    </div>
  );
}