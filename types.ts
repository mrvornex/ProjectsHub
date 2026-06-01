export interface Project {
  slug: string;
  title: string;
  description: string;
  live: string;
  github: string;
  image?: string;
  project: Project;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string; 
  // live?: string;
  // github?: string;
  featured?: boolean;
  stats?: {
    stars?: number;
    forks?: number;
  };
  progress?: number;
  tags?: string[];
  createdAt?: Date;
  techStack: string[];
   date?: string;   // 👈 add this
  views?: number; 
}

export interface Project {
  id: string;       
  slug: string;       
  title: string;
  description: string;
  techStack: string[];
   date?: string;   // 👈 add this
  views?: number; 
}

export interface Testimonial {
  id?: string;
  name: string;
  message: string;
  createdAt: any;
}
