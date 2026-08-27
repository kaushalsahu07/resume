import { useState } from 'react'
import FreshMinimalTemplate from '../components/templates/FreshMinimalTemplate'
import ClassicProfessionalTemplate from '../components/templates/ClassicProfessionalTemplate'
import type { Portfolio } from '../types/portfolio'

const mockPortfolio: Portfolio = {
  id: 'demo-1',
  slug: 'demo',
  templateId: 'fresh-minimal',
  headline: 'Jane Doe',
  summary: 'A passionate software engineer with 5+ years of experience building scalable web applications and intuitive user interfaces. Dedicated to clean code and continuous learning.',
  isPublished: true,
  viewCount: 42,
  education: [
    { id: 'e1', institution: 'University of Technology', degree: 'B.S. Computer Science', startDate: '2015', endDate: '2019', order: 0 }
  ],
  experience: [
    { id: 'x1', company: 'Tech Innovators Inc', role: 'Senior Frontend Engineer', startDate: '2021', description: 'Led the migration to a modern React stack. Improved web performance by 40%.', order: 0 },
    { id: 'x2', company: 'Web Solutions LLC', role: 'Web Developer', startDate: '2019', endDate: '2021', description: 'Developed responsive client websites and internal tooling using React and Node.js.', order: 1 }
  ],
  projects: [
    { id: 'p1', title: 'PortfoliAI', description: 'An AI-powered resume to portfolio generator.', techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'], link: 'https://github.com', order: 0 },
    { id: 'p2', title: 'E-commerce Dashboard', description: 'A real-time analytics dashboard for merchants.', techStack: ['Vue', 'D3.js', 'Firebase'], order: 1 }
  ],
  skills: [
    { id: 's1', name: 'JavaScript' },
    { id: 's2', name: 'TypeScript' },
    { id: 's3', name: 'React' },
    { id: 's4', name: 'Tailwind CSS' },
    { id: 's5', name: 'Node.js' }
  ],
  achievements: [],
  links: [
    { id: 'l1', label: 'GitHub', url: 'https://github.com' },
    { id: 'l2', label: 'LinkedIn', url: 'https://linkedin.com' }
  ]
}

export default function Demo() {
  const [template, setTemplate] = useState<'fresh-minimal' | 'classic-professional'>('fresh-minimal')

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="bg-background border-b border-border p-4 sticky top-0 z-50 flex justify-center gap-4 shadow-sm">
        <button 
          onClick={() => setTemplate('fresh-minimal')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${template === 'fresh-minimal' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
        >
          Fresh Minimal
        </button>
        <button 
          onClick={() => setTemplate('classic-professional')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${template === 'classic-professional' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
        >
          Classic Professional
        </button>
      </div>

      <div className="py-8">
        {template === 'fresh-minimal' ? (
          <FreshMinimalTemplate portfolio={{ ...mockPortfolio, templateId: template }} />
        ) : (
          <ClassicProfessionalTemplate portfolio={{ ...mockPortfolio, templateId: template }} />
        )}
      </div>
    </div>
  )
}
