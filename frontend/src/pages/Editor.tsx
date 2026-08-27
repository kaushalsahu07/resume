import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Eye, Edit3, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react'
import type { Portfolio, Experience, Project, Education, Skill } from '../types/portfolio'
import FreshMinimalTemplate from '../components/templates/FreshMinimalTemplate'
import ClassicProfessionalTemplate from '../components/templates/ClassicProfessionalTemplate'

// Mock initial data for editor
const initialPortfolio: Portfolio = {
  id: 'mock-portfolio-id',
  slug: 'my-portfolio',
  templateId: 'fresh-minimal',
  headline: 'John Doe',
  summary: 'Software Developer',
  isPublished: false,
  viewCount: 0,
  education: [],
  experience: [
    { id: 'exp-1', company: 'Acme Corp', role: 'Developer', startDate: '2020', order: 0 }
  ],
  projects: [],
  skills: [{ id: 'sk-1', name: 'React' }],
  achievements: [],
  links: []
}

export default function Editor() {
  const { portfolioId } = useParams()
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  useEffect(() => {
    // In a real app, fetch by portfolioId. Mocking it here.
    setTimeout(() => setPortfolio(initialPortfolio), 300)
  }, [portfolioId])

  if (!portfolio) {
    return <div className="p-8">Loading editor...</div>
  }

  const handleUpdate = (updates: Partial<Portfolio>) => {
    setPortfolio(prev => prev ? { ...prev, ...updates } : prev)
  }

  const moveItem = (arrayName: 'experience' | 'projects' | 'education', index: number, direction: 'up' | 'down') => {
    const newArray = [...portfolio[arrayName]]
    if (direction === 'up' && index > 0) {
      ;[newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]]
    } else if (direction === 'down' && index < newArray.length - 1) {
      ;[newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]]
    }
    handleUpdate({ [arrayName]: newArray })
  }

  const handlePublish = async () => {
    if (confirm('Are you sure you want to publish your portfolio?')) {
      handleUpdate({ isPublished: true, slug: 'john-doe-' + Math.floor(Math.random()*1000) })
      alert(`Published! URL: /p/${portfolio.slug}`)
    }
  }

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col md:flex-row bg-muted/20">
      {/* Mobile Tabs */}
      <div className="md:hidden flex border-b border-border bg-background shrink-0">
        <button 
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('edit')}
        >
          <Edit3 className="w-4 h-4" /> Edit
        </button>
        <button 
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye className="w-4 h-4" /> Preview
        </button>
      </div>

      {/* Editor Pane */}
      <div className={`flex-1 flex flex-col bg-background border-r border-border overflow-hidden ${activeTab === 'preview' ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-border flex justify-between items-center shrink-0">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>
          <button onClick={handlePublish} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            <Send className="w-4 h-4" /> Publish
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section>
            <h3 className="font-bold text-lg mb-4">Template</h3>
            <select 
              className="w-full p-2 border border-border rounded-md bg-background"
              value={portfolio.templateId}
              onChange={(e) => handleUpdate({ templateId: e.target.value as any })}
            >
              <option value="fresh-minimal">Fresh Minimal</option>
              <option value="classic-professional">Classic Professional</option>
            </select>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-4">Header</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1 font-medium">Headline / Name</label>
                <input 
                  type="text" className="w-full p-2 border border-border rounded-md" 
                  value={portfolio.headline || ''} onChange={e => handleUpdate({ headline: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">Summary</label>
                <textarea 
                  className="w-full p-2 border border-border rounded-md h-24" 
                  value={portfolio.summary || ''} onChange={e => handleUpdate({ summary: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-4 flex justify-between items-center">
              Experience
              <button className="text-primary text-sm font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add
              </button>
            </h3>
            <div className="space-y-4">
              {portfolio.experience.map((exp, idx) => (
                <div key={exp.id} className="border border-border rounded-md p-4 space-y-3 bg-muted/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm text-muted-foreground">Item {idx + 1}</span>
                    <div className="flex gap-1">
                      <button onClick={() => moveItem('experience', idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => moveItem('experience', idx, 'down')} disabled={idx === portfolio.experience.length - 1} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                      <button className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <input type="text" placeholder="Company" className="w-full p-2 text-sm border border-border rounded-md" value={exp.company} 
                    onChange={e => {
                      const newExp = [...portfolio.experience]
                      newExp[idx].company = e.target.value
                      handleUpdate({ experience: newExp })
                    }}
                  />
                  <input type="text" placeholder="Role" className="w-full p-2 text-sm border border-border rounded-md" value={exp.role} 
                    onChange={e => {
                      const newExp = [...portfolio.experience]
                      newExp[idx].role = e.target.value
                      handleUpdate({ experience: newExp })
                    }}
                  />
                  <div className="flex gap-2">
                    <input type="text" placeholder="Start Date" className="w-1/2 p-2 text-sm border border-border rounded-md" value={exp.startDate || ''} />
                    <input type="text" placeholder="End Date" className="w-1/2 p-2 text-sm border border-border rounded-md" value={exp.endDate || ''} />
                  </div>
                  <textarea placeholder="Description" className="w-full p-2 text-sm border border-border rounded-md h-20" value={exp.description || ''} 
                    onChange={e => {
                      const newExp = [...portfolio.experience]
                      newExp[idx].description = e.target.value
                      handleUpdate({ experience: newExp })
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Preview Pane */}
      <div className={`flex-1 md:flex-[1.5] overflow-y-auto bg-muted/30 ${activeTab === 'edit' ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 flex justify-center sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/50 z-10">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Eye className="w-4 h-4" /> Live Preview
          </span>
        </div>
        <div className="p-4 md:p-8">
          <div className="bg-background shadow-lg rounded-xl overflow-hidden border border-border/50 min-h-[800px]">
            {portfolio.templateId === 'classic-professional' ? (
              <ClassicProfessionalTemplate portfolio={portfolio} />
            ) : (
              <FreshMinimalTemplate portfolio={portfolio} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
