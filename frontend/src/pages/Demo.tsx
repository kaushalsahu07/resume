import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'
import { templates, getTemplateById } from '../components/templates'
import type { Portfolio } from '../types/portfolio'

const mockPortfolio: Portfolio = {
  id: 'demo-1',
  slug: 'demo',
  templateId: 'dark-grid',
  headline: 'Jane Doe',
  summary: 'A passionate software engineer & UI/UX designer with 5+ years of experience building scalable web applications and intuitive user interfaces. Dedicated to clean code, accessible design, and delightful digital products.',
  isPublished: true,
  viewCount: 42,
  education: [
    { id: 'e1', institution: 'University of Technology', degree: 'B.S. Computer Science', field: 'Software Systems', startDate: '2015', endDate: '2019', order: 0 }
  ],
  experience: [
    { id: 'x1', company: 'Tech Innovators Inc', role: 'Senior Frontend Engineer', startDate: '2021', endDate: 'Present', description: 'Led the migration to a modern React & Next.js stack. Improved Core Web Vitals and page performance by 40%.', order: 0 },
    { id: 'x2', company: 'Web Solutions LLC', role: 'Full Stack Developer', startDate: '2019', endDate: '2021', description: 'Developed responsive client web apps, design systems, and cloud APIs using React, Node.js, and TypeScript.', order: 1 }
  ],
  projects: [
    { id: 'p1', title: 'PortfoliAI Platform', description: 'An AI-powered resume to dynamic single-page portfolio generator with multi-provider failover.', techStack: ['React', 'TypeScript', 'FastAPI', 'Tailwind CSS'], link: 'https://github.com', order: 0 },
    { id: 'p2', title: 'E-commerce Analytics Hub', description: 'A real-time metrics and analytics dashboard for global merchants with live chart telemetry.', techStack: ['React', 'D3.js', 'PostgreSQL', 'Tailwind CSS'], link: 'https://github.com', order: 1 }
  ],
  skills: [
    { id: 's1', name: 'TypeScript', category: 'Languages' },
    { id: 's2', name: 'React', category: 'Frontend' },
    { id: 's3', name: 'Next.js', category: 'Frontend' },
    { id: 's4', name: 'Tailwind CSS', category: 'Frontend' },
    { id: 's5', name: 'Node.js', category: 'Backend' },
    { id: 's6', name: 'FastAPI', category: 'Backend' },
    { id: 's7', name: 'UI/UX Design', category: 'Design' },
    { id: 's8', name: 'Figma', category: 'Design' }
  ],
  achievements: [
    { id: 'a1', title: 'Best Design Innovation Award', description: 'Awarded 1st place in national UI/UX hackathon.', date: '2023' }
  ],
  links: [
    { id: 'l1', label: 'GitHub', url: 'https://github.com' },
    { id: 'l2', label: 'LinkedIn', url: 'https://linkedin.com' },
    { id: 'l3', label: 'Email', url: 'mailto:jane@example.com' }
  ]
}

export default function Demo() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('dark-grid')

  const ActiveTemplateComponent = getTemplateById(selectedTemplateId).component

  return (
    <div className="min-h-screen bg-[#edf4f9] flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Demo Sticky Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2.5 sm:py-3.5 sticky top-0 z-50 flex items-center justify-between gap-2 shadow-sm">
        <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-xs sm:text-sm transition-colors group flex-shrink-0">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden md:inline">Back</span>
        </Link>

        {/* Template switcher pill */}
        <div className="flex bg-slate-100/80 p-1 rounded-full border border-slate-200/80 overflow-x-auto max-w-[55vw] sm:max-w-none shadow-inner">
          {templates.map((t) => (
            <button 
              key={t.id}
              onClick={() => setSelectedTemplateId(t.id)}
              className={`px-3 sm:px-5 py-1.5 rounded-full font-bold text-[11px] sm:text-xs md:text-sm transition-all duration-300 whitespace-nowrap ${
                selectedTemplateId === t.id 
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <Link
          to="/upload"
          className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Try with your resume</span>
          <span className="sm:hidden">Create</span>
          <ArrowRight className="w-4 h-4 hidden md:inline" />
        </Link>
      </header>

      <main className="flex-1 w-full mx-auto">
        <div className="w-full">
          <ActiveTemplateComponent portfolio={{ ...mockPortfolio, templateId: selectedTemplateId }} />
        </div>
      </main>
    </div>
  )
}

