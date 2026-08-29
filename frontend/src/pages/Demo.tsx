import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen bg-[#edf4f9] flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Demo Sticky Bar */}
      <header className="bg-white/85 backdrop-blur-md border-b border-slate-200/60 px-6 py-3.5 sticky top-0 z-50 flex items-center justify-between shadow-xs">
        <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-slate-950 font-medium text-sm transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>

        {/* Template switcher pill */}
        <div className="flex bg-slate-100/90 p-1 rounded-full border border-slate-200/80">
          <button 
            onClick={() => setTemplate('fresh-minimal')}
            className={`px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 ${template === 'fresh-minimal' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Fresh Minimal
          </button>
          <button 
            onClick={() => setTemplate('classic-professional')}
            className={`px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 ${template === 'classic-professional' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Classic Professional
          </button>
        </div>

        <Link
          to="/upload"
          className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-full font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Try with your resume</span>
          <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
        </Link>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8">
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden border border-slate-200/80">
          {template === 'fresh-minimal' ? (
            <FreshMinimalTemplate portfolio={{ ...mockPortfolio, templateId: template }} />
          ) : (
            <ClassicProfessionalTemplate portfolio={{ ...mockPortfolio, templateId: template }} />
          )}
        </div>
      </main>
    </div>
  )
}
