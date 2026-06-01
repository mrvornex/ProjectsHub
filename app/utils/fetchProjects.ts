export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  live?: string;
  github: string;
  techStack: string[];
  features: string[];
  category: string;
  date?: string;
  views?: number;
  tags?: string[];
}

export const fetchProjects = async (): Promise<Project[]> => {
  const categories = ["beginners", "navbar", "cards", "advanced"];
  const allProjects: Project[] = [];

  for (const category of categories) {
    try {
      const res = await fetch(`https://api.github.com/repos/Bilal742/JavaScript-projects/contents/projects/${category}`);
      const data = await res.json();

      for (const item of data) {
        if (item.type !== "dir") continue;

        let meta: any = {};
        try {
          const metaRes = await fetch(`https://raw.githubusercontent.com/Bilal742/JavaScript-projects/main/projects/${category}/${item.name}/meta.json`);
          if (metaRes.ok) meta = await metaRes.json();
        } catch { }

        const image = meta.image
          ? meta.image.startsWith("http")
            ? meta.image
            : `https://raw.githubusercontent.com/Bilal742/JavaScript-projects/main/projects/${category}/${item.name}/${meta.image.replace("./", "")}`
          : `https://opengraph.githubassets.com/1/Bilal742/${item.name}`;

        allProjects.push({
          slug: item.name,
          category,
          title: meta.title ?? item.name.replace(/-/g, " "),
          description: meta.description ?? "No description available",
          image,
          github: item.html_url,
          live: `https://bilal742.github.io/JavaScript-projects/projects/${category}/${item.name}/index.html`,
          techStack: meta.techStack ?? [],
          features: meta.features ?? [],
        });
      }
    } catch (error) {
      console.error(`Error fetching ${category} projects:`, error);
    }
  }

  return allProjects;
};
