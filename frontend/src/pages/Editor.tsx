import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { 
  ArrowLeft, Send, Eye, Edit3, ArrowUp, ArrowDown, Plus, Trash2, 
  Bot, Sparkles, Check, ExternalLink, 
  Monitor, Smartphone, ChevronDown, ChevronUp, Wand2
} from 'lucide-react'
import type { Portfolio } from '../types/portfolio'
import { apiClient } from '../lib/apiClient'
import { templates, getTemplateById } from '../components/templates'

export default function Editor() {
  const { portfolioId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  // Chat & Editor State
  const [editorMode, setEditorMode] = useState<'chat' | 'manual'>('chat')
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
  const [remainingRequests, setRemainingRequests] = useState(1000)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [newSkillInput, setNewSkillInput] = useState('')

  // Accordion open states
  const [openSections, setOpenSections] = useState({
    theme: true,
    header: true,
    experience: true,
    projects: true,
    education: true,
    skills: true
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  useEffect(() => {
    if (location.state?.portfolio) {
      setPortfolio(location.state.portfolio)
      return
    }

    if (portfolioId) {
      apiClient.request<Portfolio>(`/portfolios/${portfolioId}`)
        .then(data => {
          setPortfolio(data)
        })
        .catch(err => {
          console.error("Failed to load portfolio:", err)
        })
    }
  }, [portfolioId, location.state])

  // Debounced auto-save for root fields
  useEffect(() => {
    if (!portfolio || !portfolioId) return
    const timer = setTimeout(() => {
      apiClient.request(`/portfolios/${portfolioId}`, {
        method: 'PUT',
        body: JSON.stringify({
          headline: portfolio.headline,
          summary: portfolio.summary,
          templateId: portfolio.templateId,
          slug: portfolio.slug
        })
      }).catch(err => console.error("Auto-save failed", err))
    }, 1000)
    return () => clearTimeout(timer)
  }, [portfolio?.headline, portfolio?.summary, portfolio?.templateId, portfolio?.slug])

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf4f9] text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-slate-900 animate-spin" />
          <span>Loading Studio Editor...</span>
        </div>
      </div>
    )
  }

  const handleUpdate = (updates: Partial<Portfolio>) => {
    setPortfolio(prev => (prev ? { ...prev, ...updates } : prev))
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

  const deleteItem = (arrayName: 'experience' | 'projects' | 'education', index: number) => {
    const newArray = portfolio[arrayName].filter((_, i) => i !== index)
    handleUpdate({ [arrayName]: newArray })
  }

  const addExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      company: 'Company Name',
      role: 'Role Title',
      startDate: '2023',
      endDate: 'Present',
      description: 'Describe your key contributions, achievements, and technical impact.',
      order: portfolio.experience.length
    }
    handleUpdate({ experience: [...portfolio.experience, newExp] })
  }

  const addProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: 'New Project Title',
      description: 'Brief overview of the project and key challenges solved.',
      techStack: ['React', 'TypeScript'],
      link: 'https://github.com',
      order: portfolio.projects.length
    }
    handleUpdate({ projects: [...portfolio.projects, newProj] })
  }

  const addEducation = () => {
    const newEdu = {
      id: 'edu-' + Date.now(),
      institution: 'University / Institute',
      degree: 'B.S. in Computer Science',
      startDate: '2019',
      endDate: '2023',
      order: portfolio.education.length
    }
    handleUpdate({ education: [...portfolio.education, newEdu] })
  }

  const addSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return
    if (!newSkillInput.trim()) return
    const newSkill = {
      id: 'skill-' + Date.now(),
      name: newSkillInput.trim()
    }
    handleUpdate({ skills: [...portfolio.skills, newSkill] })
    setNewSkillInput('')
  }

  const removeSkill = (skillId: string) => {
    handleUpdate({ skills: portfolio.skills.filter(s => s.id !== skillId) })
  }

  const handlePublish = async () => {
    if (!portfolio.slug) {
      alert("Please enter a custom URL slug before publishing.")
      return
    }
    try {
      await apiClient.request(`/portfolios/${portfolioId}/publish`, { method: 'POST' })
      handleUpdate({ isPublished: true })
      navigator.clipboard.writeText(`http://localhost:5173/p/${portfolio.slug}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err: any) {
      alert(err.message || 'Failed to publish')
    }
  }

  const sendChatMessage = async (msg: string) => {
    if (!msg.trim() || remainingRequests <= 0 || isChatLoading) return

    setChatInput('')
    setChatHistory(prev => [...prev, { role: 'user', content: msg }])
    setIsChatLoading(true)

    try {
      const res = await apiClient.request<{ reply: string; updatedPortfolio: Portfolio; remainingRequests: number }>(
        `/portfolios/${portfolioId}/chat`,
        {
          method: 'POST',
          body: JSON.stringify({ message: msg, currentPortfolio: portfolio })
        }
      )

      setChatHistory(prev => [...prev, { role: 'ai', content: res.reply }])
      setPortfolio(res.updatedPortfolio)
      setRemainingRequests(res.remainingRequests)
    } catch {
      setChatHistory(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an issue updating your portfolio. Please try again.' }])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendChatMessage(chatInput)
  }

  const promptSuggestions = [
    "🪄 Rewrite summary to sound more impactful",
    "🎨 Switch to Dark Grid theme",
    "🎨 Switch to Fresh Minimal theme",
    "💼 Polish experience bullet points with metrics",
    "➕ Add Python and AWS to skills"
  ]

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col md:flex-row bg-[#edf4f9]">
      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-slate-200 bg-white shrink-0">
        <button
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 ${
            activeTab === 'edit' ? 'border-b-2 border-slate-950 text-slate-950 bg-slate-50' : 'text-slate-500'
          }`}
          onClick={() => setActiveTab('edit')}
        >
          <Edit3 className="w-4 h-4" /> Edit & AI Chat
        </button>
        <button
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 ${
            activeTab === 'preview' ? 'border-b-2 border-slate-950 text-slate-950 bg-slate-50' : 'text-slate-500'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye className="w-4 h-4" /> Live Preview
        </button>
      </div>

      {/* Editor / Chat Sidebar Pane */}
      <div
        className={`flex-1 flex flex-col bg-white border-r border-slate-200/80 overflow-hidden ${
          activeTab === 'preview' ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Editor Top Navigation */}
        <div className="p-3 sm:p-4 border-b border-slate-200/70 flex justify-between items-center bg-slate-50/70 shrink-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors p-1.5 rounded-lg hover:bg-slate-200/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex bg-slate-200/70 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setEditorMode('chat')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                editorMode === 'chat'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              AI Copilot
            </button>
            <button
              onClick={() => setEditorMode('manual')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                editorMode === 'manual'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Manual Form
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline">Auto-saved</span>
          </div>
        </div>

        {/* AI Chat Mode */}
        {editorMode === 'chat' ? (
          <div className="flex-1 flex flex-col bg-slate-50/40 overflow-hidden">
            {/* AI Assistant Banner */}
            <div className="p-3 border-b border-slate-200/60 bg-white flex justify-between items-center shrink-0">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Ask AI to modify any part of your portfolio
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-semibold border border-slate-200">
                {remainingRequests} requests left
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-md">
                    <Wand2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">PortfoliAI Copilot</h4>
                    <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                      I can rewrite your summary, change templates, format work experience, or add skills in real time.
                    </p>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="w-full max-w-sm pt-2 space-y-2 text-left">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Quick Suggestions:
                    </span>
                    {promptSuggestions.map((prompt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => sendChatMessage(prompt)}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-2xs"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-950 text-white rounded-tr-sm shadow-xs'
                        : 'bg-white shadow-xs border border-slate-200/80 rounded-tl-sm text-slate-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3.5 rounded-2xl text-xs bg-white shadow-xs border border-slate-200/80 rounded-tl-sm flex items-center gap-2 text-slate-500 font-medium">
                    <span className="w-2 h-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-slate-900 rounded-full animate-bounce"></span>
                    <span className="ml-1">Updating portfolio...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input & Suggestions Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200/70 shrink-0">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder={remainingRequests > 0 ? "E.g. Make headline punchier or switch theme..." : "Limit reached"}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  disabled={remainingRequests <= 0 || isChatLoading}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || remainingRequests <= 0 || isChatLoading}
                  className="bg-slate-950 hover:bg-slate-800 text-white p-2.5 sm:px-4 rounded-xl disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Manual Edit Mode */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Theme Selector Section */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
              <div
                onClick={() => toggleSection('theme')}
                className="flex justify-between items-center cursor-pointer select-none"
              >
                <h3 className="font-bold text-sm text-slate-900">Portfolio Theme</h3>
                {openSections.theme ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>
              {openSections.theme && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {templates.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleUpdate({ templateId: t.id as any })}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        portfolio.templateId === t.id
                          ? 'border-slate-950 bg-white shadow-xs text-slate-950 ring-1 ring-slate-950'
                          : 'border-slate-200 bg-white/60 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Info Section */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
              <div
                onClick={() => toggleSection('header')}
                className="flex justify-between items-center cursor-pointer select-none"
              >
                <h3 className="font-bold text-sm text-slate-900">Profile & Summary</h3>
                {openSections.header ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>
              {openSections.header && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name / Headline</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                      value={portfolio.headline || ''}
                      onChange={e => handleUpdate({ headline: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Professional Summary</label>
                    <textarea
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm h-24 focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed"
                      value={portfolio.summary || ''}
                      onChange={e => handleUpdate({ summary: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
              <div className="flex justify-between items-center select-none">
                <div
                  onClick={() => toggleSection('experience')}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <h3 className="font-bold text-sm text-slate-900">Work Experience ({portfolio.experience?.length || 0})</h3>
                  {openSections.experience ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
                <button
                  type="button"
                  onClick={addExperience}
                  className="text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {openSections.experience && (
                <div className="mt-4 space-y-4">
                  {portfolio.experience?.map((exp, idx) => (
                    <div key={exp.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500">Position #{idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveItem('experience', idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-20"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveItem('experience', idx, 'down')}
                            disabled={idx === portfolio.experience.length - 1}
                            className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-20"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('experience', idx)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Company"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                        value={exp.company}
                        onChange={e => {
                          const newExp = [...portfolio.experience]
                          newExp[idx].company = e.target.value
                          handleUpdate({ experience: newExp })
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                        value={exp.role}
                        onChange={e => {
                          const newExp = [...portfolio.experience]
                          newExp[idx].role = e.target.value
                          handleUpdate({ experience: newExp })
                        }}
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Start Date"
                          className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                          value={exp.startDate || ''}
                          onChange={e => {
                            const newExp = [...portfolio.experience]
                            newExp[idx].startDate = e.target.value
                            handleUpdate({ experience: newExp })
                          }}
                        />
                        <input
                          type="text"
                          placeholder="End Date (or Present)"
                          className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                          value={exp.endDate || ''}
                          onChange={e => {
                            const newExp = [...portfolio.experience]
                            newExp[idx].endDate = e.target.value
                            handleUpdate({ experience: newExp })
                          }}
                        />
                      </div>
                      <textarea
                        placeholder="Description / Key Achievements"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg h-16 leading-relaxed"
                        value={exp.description || ''}
                        onChange={e => {
                          const newExp = [...portfolio.experience]
                          newExp[idx].description = e.target.value
                          handleUpdate({ experience: newExp })
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Projects Section */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
              <div className="flex justify-between items-center select-none">
                <div
                  onClick={() => toggleSection('projects')}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <h3 className="font-bold text-sm text-slate-900">Projects ({portfolio.projects?.length || 0})</h3>
                  {openSections.projects ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
                <button
                  type="button"
                  onClick={addProject}
                  className="text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {openSections.projects && (
                <div className="mt-4 space-y-4">
                  {portfolio.projects?.map((proj, idx) => (
                    <div key={proj.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500">Project #{idx + 1}</span>
                        <button
                          onClick={() => deleteItem('projects', idx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Project Title"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg font-semibold"
                        value={proj.title}
                        onChange={e => {
                          const newProj = [...portfolio.projects]
                          newProj[idx].title = e.target.value
                          handleUpdate({ projects: newProj })
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Project Link (e.g. https://github.com/your/repo)"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                        value={proj.link || ''}
                        onChange={e => {
                          const newProj = [...portfolio.projects]
                          newProj[idx].link = e.target.value
                          handleUpdate({ projects: newProj })
                        }}
                      />
                      <textarea
                        placeholder="Project Description"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg h-16 leading-relaxed"
                        value={proj.description || ''}
                        onChange={e => {
                          const newProj = [...portfolio.projects]
                          newProj[idx].description = e.target.value
                          handleUpdate({ projects: newProj })
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
              <div className="flex justify-between items-center select-none">
                <div
                  onClick={() => toggleSection('education')}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <h3 className="font-bold text-sm text-slate-900">Education ({portfolio.education?.length || 0})</h3>
                  {openSections.education ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {openSections.education && (
                <div className="mt-4 space-y-4">
                  {portfolio.education?.map((edu, idx) => (
                    <div key={edu.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500">Education #{idx + 1}</span>
                        <button
                          onClick={() => deleteItem('education', idx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Institution / University"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                        value={edu.institution}
                        onChange={e => {
                          const newEdu = [...portfolio.education]
                          newEdu[idx].institution = e.target.value
                          handleUpdate({ education: newEdu })
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Degree / Certificate"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                        value={edu.degree}
                        onChange={e => {
                          const newEdu = [...portfolio.education]
                          newEdu[idx].degree = e.target.value
                          handleUpdate({ education: newEdu })
                        }}
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Start Year"
                          className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                          value={edu.startDate || ''}
                          onChange={e => {
                            const newEdu = [...portfolio.education]
                            newEdu[idx].startDate = e.target.value
                            handleUpdate({ education: newEdu })
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Graduation Year"
                          className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                          value={edu.endDate || ''}
                          onChange={e => {
                            const newEdu = [...portfolio.education]
                            newEdu[idx].endDate = e.target.value
                            handleUpdate({ education: newEdu })
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
              <div
                onClick={() => toggleSection('skills')}
                className="flex justify-between items-center cursor-pointer select-none"
              >
                <h3 className="font-bold text-sm text-slate-900">Skills ({portfolio.skills?.length || 0})</h3>
                {openSections.skills ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>

              {openSections.skills && (
                <div className="mt-3 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new skill (e.g. TypeScript, AWS)..."
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                      value={newSkillInput}
                      onChange={e => setNewSkillInput(e.target.value)}
                      onKeyDown={addSkill}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-3 py-1.5 bg-slate-950 text-white rounded-lg text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {portfolio.skills?.map(skill => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 shadow-2xs"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill.id)}
                          className="hover:text-red-600 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Live Preview Pane */}
      <div
        className={`flex-1 md:flex-[1.4] overflow-y-auto bg-[#edf4f9] ${
          activeTab === 'edit' ? 'hidden md:block' : 'block'
        }`}
      >
        {/* Preview Top Toolbar */}
        <div className="p-3 sm:px-6 flex justify-between items-center sticky top-0 bg-[#edf4f9]/90 backdrop-blur-md border-b border-slate-200/70 z-20">
          {/* Viewport switcher */}
          <div className="flex items-center gap-1 bg-white/80 p-1 rounded-full border border-slate-200 shadow-2xs">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-full transition-all ${
                viewport === 'desktop' ? 'bg-slate-950 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-full transition-all ${
                viewport === 'mobile' ? 'bg-slate-950 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Custom Domain Slug input */}
          <div className="flex items-center gap-1 bg-white/90 border border-slate-200 rounded-full px-3 py-1 text-xs shadow-2xs">
            <span className="text-slate-400 font-medium">https://</span>
            <input
              type="text"
              className="bg-transparent text-slate-900 font-bold outline-none w-[90px] sm:w-[130px] text-xs"
              value={portfolio.slug || ''}
              onChange={e => handleUpdate({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
              placeholder="yourname"
            />
            <span className="text-slate-500 font-medium">.portfolio.me</span>
          </div>

          {/* Publish & Share button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePublish}
              className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link!' : portfolio.isPublished ? 'Update & Copy' : 'Publish Live'}</span>
            </button>
            {portfolio.isPublished && (
              <a
                href={`/p/${portfolio.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-black hover:bg-slate-50 transition-colors shadow-2xs"
                title="Open live portfolio"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Live Template Container */}
        <div className="p-4 sm:p-8 flex justify-center">
          <div
            className={`transition-all duration-300 shadow-2xl shadow-slate-300/60 rounded-3xl overflow-hidden border border-slate-200/80 bg-white min-h-[750px] ${
              viewport === 'mobile' ? 'w-[390px] max-w-full ring-8 ring-slate-900/10' : 'w-full max-w-4xl'
            }`}
          >
            {(() => {
              const Template = getTemplateById(portfolio.templateId).component
              return <Template portfolio={portfolio} />
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}


