export interface Portfolio {
  id: string;
  slug: string;
  templateId: 'fresh-minimal' | 'classic-professional';
  headline: string | null;
  summary: string | null;
  isPublished: boolean;
  viewCount: number;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  links: Link[];
}

export interface Education { id: string; institution: string; degree: string; field?: string; startDate?: string; endDate?: string; order: number; }
export interface Experience { id: string; company: string; role: string; startDate?: string; endDate?: string; description?: string; order: number; }
export interface Project { id: string; title: string; description?: string; techStack: string[]; link?: string; order: number; }
export interface Skill { id: string; name: string; category?: string; }
export interface Achievement { id: string; title: string; description?: string; date?: string; }
export interface Link { id: string; label: string; url: string; }
