// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
// import { fetchProjects, Project } from "@/app/utils/fetchProjects";
// import { motion } from "framer-motion";

// export default function CategoryPage() {
//     const params = useParams();
//     const category = params.category as string;
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

//     useEffect(() => {
//         fetchProjects()
//             .then(all => {
//                 const filtered = all.filter(p => p.category === category);
//                 setProjects(filtered);
//                 setFilteredProjects(filtered);
//             })
//             .finally(() => setLoading(false));
//     }, [category]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//                 <div className="relative">
//                     <div className="h-16 w-16 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="h-8 w-8 rounded-full bg-blue-500 animate-pulse"></div>
//                     </div>
//                 </div>
//                 <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
//                     Loading {category} projects...
//                 </p>
//             </div>
//         );
//     }

//     if (projects.length === 0) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//                 <div className="text-center max-w-md">
//                     <div className="text-7xl mb-4">📂</div>
//                     <h1 className="text-3xl font-bold text-gray-800 mb-3">
//                         No Projects Found
//                     </h1>
//                     <p className="text-gray-600 mb-8">
//                         No projects found in the <span className="font-semibold text-blue-600 capitalize">{category}</span> category
//                     </p>
//                     <button
//                         onClick={() => window.history.back()}
//                         className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                     >
//                         ← Go Back
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-6 shadow-lg">
//                 <div className="max-w-7xl mx-auto">
//                     <motion.div
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
//                             {category} Projects
//                         </h1>
//                         <p className="text-lg text-blue-100 mb-2">
//                             Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
//                         </p>
//                         <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mt-4"></div>
//                     </motion.div>
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 {/* Filters/Stats */}
//                 <div className="mb-10 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                         <div className="flex items-center space-x-4">
//                             <div className="p-3 bg-blue-50 rounded-xl">
//                                 <span className="text-2xl">🎯</span>
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Category Details</h3>
//                                 <p className="text-sm text-gray-600">Browse through curated {category} projects</p>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap gap-4">
//                             <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
//                                 <span className="text-sm text-gray-600">Total</span>
//                                 <p className="text-xl font-bold text-green-700">{projects.length}</p>
//                             </div>
//                             <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
//                                 <span className="text-sm text-gray-600">Filtered</span>
//                                 <p className="text-xl font-bold text-blue-700">{filteredProjects.length}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Projects Grid */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//                 >
//                     {filteredProjects.map((project, index) => (
//                         <motion.div
//                             key={project.slug}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.4, delay: index * 0.1 }}
//                             whileHover={{ y: -8, transition: { duration: 0.2 } }}
//                         >
//                             <ProjectCard 
//                                 project={project} 
//                                 index={index}
//                             />
//                         </motion.div>
//                     ))}
//                 </motion.div>

//                 {/* Footer Note */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.8 }}
//                     className="mt-12 text-center"
//                 >
//                     <div className="inline-flex items-center space-x-2 text-gray-600 bg-white/50 backdrop-blur-sm px-6 py-4 rounded-xl border border-gray-200">
//                         <span className="text-xl">💡</span>
//                         <p className="text-sm">
//                             Found {filteredProjects.length} amazing {category} projects
//                         </p>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// }