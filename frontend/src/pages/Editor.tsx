import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Send, Eye, Edit3, ArrowUp, ArrowDown, Plus, Trash2, MessageSquare, X, Bot } from 'lucide-react'
import type { Portfolio, Experience, Project, Education, Skill } from '../types/portfolio'
import { apiClient } from '../lib/apiClient'

import { templates, getTemplateById } from '../components/templates'
// initialPortfolio is no longer needed as we fetch from API


export default function Editor() {
  const { portfolioId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  // Chat & Editor State
  const [editorMode, setEditorMode] = useState<'manual' | 'chat'>('chat')
  const [chatInput, setChatInput] = useState('')

  const [chatHistory, setChatHistory] = useState<{role: 'user'|'ai', content: string}[]>([])
  const [remainingRequests, setRemainingRequests] = useState(1000)
  const [isChatLoading, setIsChatLoading] = useState(false)

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

  // Simple debounced save for root fields (headline, summary, templateId)
  useEffect(() => {
    if (!portfolio || !portfolioId) return;
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
    }, 1000);
    return () => clearTimeout(timer);
  }, [portfolio?.headline, portfolio?.summary, portfolio?.templateId, portfolio?.slug])

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
    if (!portfolio.slug) {
      alert("Please enter a custom URL slug before publishing.");
      return;
    }
    if (confirm(`Are you sure you want to publish your portfolio to ${portfolio.slug}.portfolio.me?`)) {
      try {
        await apiClient.request(`/portfolios/${portfolioId}/publish`, { method: 'POST' })
        handleUpdate({ isPublished: true })
        alert(`Published! URL: http://localhost:5173/p/${portfolio.slug}`)
      } catch (err: any) {
        alert(err.message || 'Failed to publish')
      }
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || remainingRequests <= 0) return

    const userMsg = chatInput.trim()
    setChatInput('')
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }])
    setIsChatLoading(true)

    try {
      const res = await apiClient.request<{reply: string, updatedPortfolio: Portfolio, remainingRequests: number}>(`/portfolios/${portfolioId}/chat`, {
        method: 'POST',
        body: JSON.stringify({ message: userMsg, currentPortfolio: portfolio })
      })

      setChatHistory(prev => [...prev, { role: 'ai', content: res.reply }])
      setPortfolio(res.updatedPortfolio)
      setRemainingRequests(res.remainingRequests)
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error.' }])
    } finally {
      setIsChatLoading(false)
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
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          
          <div className="flex bg-muted/50 p-1 rounded-lg">
            <button 
              onClick={() => setEditorMode('manual')} 
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${editorMode === 'manual' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Manual Edit
            </button>
            <button 
              onClick={() => setEditorMode('chat')} 
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${editorMode === 'chat' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Bot className="w-4 h-4" />
              AI Chat
            </button>
          </div>
          <div className="w-16"></div> {/* Spacer to balance Dashboard button */}
        </div>
        
        {editorMode === 'manual' ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section>
              <h3 className="font-bold text-lg mb-4">Template</h3>
              <select 
                className="w-full p-2 border border-border rounded-md bg-background"
                value={portfolio.templateId}
                onChange={(e) => handleUpdate({ templateId: e.target.value as any })}
              >
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
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
        ) : (
          <div className="flex-1 flex flex-col bg-muted/10 overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-background/50 flex justify-between items-center shrink-0">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Let AI update your portfolio
              </span>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {remainingRequests} requests left
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                  <Bot className="w-12 h-12 text-primary" />
                  <div>
                    <p className="font-medium">I'm your Portfolio AI</p>
                    <p className="text-sm text-muted-foreground">Ask me to change your template, rewrite your summary, or add new skills!</p>
                  </div>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-background shadow-sm border border-border rounded-tl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-xl text-sm bg-background shadow-sm border border-border rounded-tl-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-background border-t border-border shrink-0">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={remainingRequests > 0 ? "E.g. Change template to classic professional..." : "Limit reached"} 
                  className="flex-1 p-3 border border-border rounded-lg text-sm bg-muted/30 focus:bg-background transition-colors outline-none focus:ring-2 focus:ring-primary/20"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  disabled={remainingRequests <= 0 || isChatLoading}
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || remainingRequests <= 0 || isChatLoading}
                  className="bg-primary text-primary-foreground p-3 rounded-lg disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>


      {/* Preview Pane */}
      <div className={`flex-1 md:flex-[1.5] overflow-y-auto bg-muted/30 ${activeTab === 'edit' ? 'hidden md:block' : 'block'}`}>
        <div className="p-3 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/50 z-10">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground w-32 shrink-0">
            <Eye className="w-4 h-4" /> Preview
          </div>
          
          <div className="flex justify-center flex-1">
            <div className="flex items-center gap-1.5">
              <input 
                type="text" 
                className="bg-muted/30 border border-border rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground font-medium w-[120px] sm:w-[160px]"
                value={portfolio.slug || ''} 
                onChange={e => handleUpdate({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                placeholder="yourname"
              />
              <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">.portfolio.me</span>
            </div>
          </div>

          <div className="w-32 flex justify-end shrink-0">
            <button onClick={handlePublish} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Publish</span>
            </button>
          </div>
        </div>
        <div className="p-4 md:p-8">
          <div className="bg-background shadow-lg rounded-xl overflow-hidden border border-border/50 min-h-[800px]">
            {(() => {
              const Template = getTemplateById(portfolio.templateId).component;
              return <Template portfolio={portfolio} />;
            })()}
          </div>
        </div>
      </div>

    </div>
  )
}

