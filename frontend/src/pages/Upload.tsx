import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Upload as UploadIcon, FileText, CheckCircle2, Loader2, X, Sparkles, 
  Wand2, ArrowRight, ArrowLeft, Check
} from 'lucide-react'
import { templates } from '../components/templates'
import { apiClient } from '../lib/apiClient'
import type { Portfolio } from '../types/portfolio'

type UploadState = 'idle' | 'uploading' | 'extracting' | 'structuring' | 'done' | 'error'

const SAMPLE_PERSONAS: Record<string, Portfolio> = {
  engineer: {
    id: 'sample-engineer-' + Date.now(),
    slug: 'alex-engineer',
    templateId: 'dark-grid',
    headline: 'Alex Morgan',
    summary: 'Senior Full Stack Engineer with 6+ years of experience architecting high-throughput distributed systems and delightful React interfaces. Passionate about developer tooling, performance optimization, and AI applications.',
    isPublished: false,
    viewCount: 0,
    education: [
      { id: 'e1', institution: 'University of California, Berkeley', degree: 'B.S. Computer Science', startDate: '2015', endDate: '2019', order: 0 }
    ],
    experience: [
      { id: 'x1', company: 'CloudScale Technologies', role: 'Senior Staff Engineer', startDate: '2022', description: 'Architected real-time streaming telemetry platform reducing query latency by 55%. Mentored 8 junior engineers and spearheaded TypeScript migration.', order: 0 },
      { id: 'x2', company: 'NextGen Apps', role: 'Software Engineer', startDate: '2019', endDate: '2022', description: 'Engineered responsive client web apps, design systems, and resilient REST/GraphQL microservices.', order: 1 }
    ],
    projects: [
      { id: 'p1', title: 'PortfoliAI Studio', description: 'AI-driven resume parsing and instant portfolio website generation platform.', techStack: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI'], link: 'https://github.com', order: 0 },
      { id: 'p2', title: 'DataFlow Orchestrator', description: 'Distributed workflow manager for streaming ETL workloads with live metrics.', techStack: ['Node.js', 'PostgreSQL', 'Docker', 'Redis'], order: 1 }
    ],
    skills: [
      { id: 's1', name: 'TypeScript' },
      { id: 's2', name: 'React' },
      { id: 's3', name: 'Next.js' },
      { id: 's4', name: 'Node.js' },
      { id: 's5', name: 'PostgreSQL' },
      { id: 's6', name: 'Tailwind CSS' },
      { id: 's7', name: 'Docker' },
      { id: 's8', name: 'AWS' }
    ],
    achievements: [],
    links: [
      { id: 'l1', label: 'GitHub', url: 'https://github.com' },
      { id: 'l2', label: 'LinkedIn', url: 'https://linkedin.com' }
    ]
  },
  designer: {
    id: 'sample-designer-' + Date.now(),
    slug: 'elena-design',
    templateId: 'cosmic-violet',
    headline: 'Elena Vance',
    summary: 'Lead Product Designer & Design Systems Architect with 7+ years shaping intuitive user experiences for fintech and enterprise SaaS products. Focused on accessibility, micro-interactions, and visual storytelling.',
    isPublished: false,
    viewCount: 0,
    education: [
      { id: 'e1', institution: 'Rhode Island School of Design', degree: 'B.F.A. Industrial Design & HCI', startDate: '2014', endDate: '2018', order: 0 }
    ],
    experience: [
      { id: 'x1', company: 'Apex Design Lab', role: 'Staff Product Designer', startDate: '2021', description: 'Led end-to-end design for core mobile payments flow, elevating 30-day user retention by 38%. Established unified design token system.', order: 0 },
      { id: 'x2', company: 'Nova Creative', role: 'UI/UX Designer', startDate: '2018', endDate: '2021', description: 'Crafted multi-brand design systems, interactive prototypes, and conducted usability testing sessions.', order: 1 }
    ],
    projects: [
      { id: 'p1', title: 'Aura Design System', description: 'Open-source accessible component library with automated Figma tokens integration.', techStack: ['Figma', 'React', 'Storybook', 'Tailwind'], link: 'https://github.com', order: 0 },
      { id: 'p2', title: 'FinFlow Mobile App', description: 'Zero-fee international remittance experience designed for intuitive mobile banking.', techStack: ['UI/UX', 'Figma', 'Prototyping'], order: 1 }
    ],
    skills: [
      { id: 's1', name: 'Figma' },
      { id: 's2', name: 'UI/UX Design' },
      { id: 's3', name: 'Design Systems' },
      { id: 's4', name: 'Prototyping' },
      { id: 's5', name: 'User Research' },
      { id: 's6', name: 'Tailwind CSS' },
      { id: 's7', name: 'Accessibility (WCAG)' }
    ],
    achievements: [],
    links: [
      { id: 'l1', label: 'Dribbble', url: 'https://dribbble.com' },
      { id: 'l2', label: 'LinkedIn', url: 'https://linkedin.com' }
    ]
  },
  ai: {
    id: 'sample-ai-' + Date.now(),
    slug: 'marcus-ai',
    templateId: 'fresh-minimal',
    headline: 'Dr. Marcus Chen',
    summary: 'Machine Learning Research Engineer specializing in Large Language Models, Retrieval-Augmented Generation (RAG), and efficient inference pipelines. Author of 4 top-tier conference publications.',
    isPublished: false,
    viewCount: 0,
    education: [
      { id: 'e1', institution: 'Stanford University', degree: 'Ph.D. in Computer Science & AI', startDate: '2018', endDate: '2022', order: 0 }
    ],
    experience: [
      { id: 'x1', company: 'Cortex AI Labs', role: 'Senior AI Research Scientist', startDate: '2022', description: 'Engineered specialized quantization techniques achieving 4x throughput increase on edge devices.', order: 0 },
      { id: 'x2', company: 'DeepScale AI', role: 'ML Engineer', startDate: '2020', endDate: '2022', description: 'Trained multi-modal computer vision and transformer models for autonomous robotics.', order: 1 }
    ],
    projects: [
      { id: 'p1', title: 'FastRAG Engine', description: 'Sub-millisecond hybrid vector and keyword search retrieval engine for enterprise LLM agents.', techStack: ['Python', 'PyTorch', 'Rust', 'Qdrant'], link: 'https://github.com', order: 0 }
    ],
    skills: [
      { id: 's1', name: 'Python' },
      { id: 's2', name: 'PyTorch' },
      { id: 's3', name: 'Transformers' },
      { id: 's4', name: 'CUDA / C++' },
      { id: 's5', name: 'LangChain' },
      { id: 's6', name: 'Vector DBs' }
    ],
    achievements: [],
    links: [
      { id: 'l1', label: 'GitHub', url: 'https://github.com' },
      { id: 'l2', label: 'Google Scholar', url: 'https://scholar.google.com' }
    ]
  }
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<UploadState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('dark-grid')
  const [isDragging, setIsDragging] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [progressPercent, setProgressPercent] = useState(0)

  useEffect(() => {
    if (templates.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(templates[0].id)
    }
  }, [selectedTemplateId])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const validateAndSetFile = (selected: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const isDocx = selected.name.endsWith('.docx') || selected.name.endsWith('.pdf')
    
    if (!validTypes.includes(selected.type) && !isDocx) {
      setErrorMsg("Couldn't read that file — please upload a PDF or DOCX file under 10MB")
      return
    }
    if (selected.size > 10 * 1024 * 1024) {
      setErrorMsg('File is too large — please upload a file under 10MB')
      return
    }

    setFile(selected)
    setErrorMsg('')
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    validateAndSetFile(selected)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      validateAndSetFile(droppedFile)
    }
  }

  const handleTryPersona = (personaKey: 'engineer' | 'designer' | 'ai') => {
    const targetPortfolio = SAMPLE_PERSONAS[personaKey]
    setState('uploading')
    setLoadingStep(1)
    setProgressPercent(25)

    setTimeout(() => {
      setLoadingStep(2)
      setProgressPercent(60)
      setTimeout(() => {
        setLoadingStep(3)
        setProgressPercent(95)
        setTimeout(() => {
          setState('done')
          setProgressPercent(100)
          navigate(`/editor/${targetPortfolio.id}`, {
            state: { templateId: selectedTemplateId, portfolio: { ...targetPortfolio, templateId: selectedTemplateId } }
          })
        }, 500)
      }, 600)
    }, 600)
  }

  const processUpload = async () => {
    if (!file) return
    setState('uploading')
    setLoadingStep(1)
    setProgressPercent(20)

    const loadingStates = ['uploading', 'extracting', 'structuring'] as const
    let currentStateIndex = 0
    const interval = setInterval(() => {
      if (currentStateIndex < loadingStates.length - 1) {
        currentStateIndex++
        setState(loadingStates[currentStateIndex])
        setLoadingStep(currentStateIndex + 1)
        setProgressPercent((currentStateIndex + 1) * 32)
      }
    }, 1800)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const portfolio = await apiClient.request<Portfolio>('/resume/upload', {
        method: 'POST',
        body: formData
      })

      clearInterval(interval)
      setState('done')
      setLoadingStep(3)
      setProgressPercent(100)

      setTimeout(() => {
        navigate(`/editor/${portfolio.id}`, { 
          state: { 
            templateId: selectedTemplateId, 
            portfolio: { ...portfolio, templateId: selectedTemplateId } 
          } 
        })
      }, 500)
    } catch (err: any) {
      clearInterval(interval)
      setState('error')
      setErrorMsg(err.message || 'Failed to process resume. Try uploading again or use a sample persona.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 sm:p-6 py-12 relative">
      <div className="w-full max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-4 px-3 py-1 rounded-full hover:bg-white/80"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto mt-2 leading-relaxed">
            We'll extract your career history and generate your interactive portfolio website in seconds.
          </p>
        </div>

        {/* Studio Card Container */}
        <div className="glass-card bg-white/85 rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl shadow-slate-300/60 transition-all">
          {state === 'idle' || state === 'error' ? (
            <div className="flex flex-col items-center">
              {errorMsg && (
                <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 flex justify-between items-center text-sm font-semibold animate-in fade-in">
                  <span>{errorMsg}</span>
                  <button onClick={() => setErrorMsg('')} className="p-1 hover:bg-red-100 rounded-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Drop Zone Area with Laser Scanline Effect */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  isDragging
                    ? 'border-slate-950 bg-slate-100 scale-[1.01] shadow-lg'
                    : file
                    ? 'border-slate-950 bg-slate-50/90 shadow-inner'
                    : 'border-slate-300 hover:border-slate-950/70 hover:bg-slate-50/80 hover:shadow-md'
                }`}
              >
                {/* Laser scan line when dragging */}
                {isDragging && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scanline pointer-events-none opacity-80" />
                )}

                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />

                <div className="w-16 h-16 bg-slate-100 group-hover:bg-slate-950 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-700 transition-all duration-300 group-hover:scale-110 shadow-xs">
                  {file ? (
                    <FileText className="w-8 h-8 text-slate-950 group-hover:text-white" />
                  ) : (
                    <UploadIcon className="w-8 h-8" />
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                  {file ? file.name : isDragging ? 'Drop your resume here now!' : 'Click to browse or drag & drop'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready for AI extraction`
                    : 'Supports PDF and Word DOCX (up to 10MB)'}
                </p>

                {file && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>File loaded & verified</span>
                  </div>
                )}
              </div>

              {/* Sample Persona Quick Buttons */}
              {!file && (
                <div className="mt-6 w-full p-4 sm:p-5 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Or Test 1-Click with Sample Profiles:
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleTryPersona('engineer')}
                      className="p-3 bg-white hover:bg-slate-950 hover:text-white rounded-xl border border-slate-200 text-left text-xs font-bold text-slate-800 transition-all hover:scale-[1.02] shadow-2xs group flex items-center justify-between"
                    >
                      <span>🧑‍💻 Senior Engineer</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTryPersona('designer')}
                      className="p-3 bg-white hover:bg-slate-950 hover:text-white rounded-xl border border-slate-200 text-left text-xs font-bold text-slate-800 transition-all hover:scale-[1.02] shadow-2xs group flex items-center justify-between"
                    >
                      <span>🎨 Product Designer</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTryPersona('ai')}
                      className="p-3 bg-white hover:bg-slate-950 hover:text-white rounded-xl border border-slate-200 text-left text-xs font-bold text-slate-800 transition-all hover:scale-[1.02] shadow-2xs group flex items-center justify-between"
                    >
                      <span>📊 AI & ML Researcher</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              )}

              {/* Template Chooser with Visual Cards */}
              <div className="w-full mt-8 text-left">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="block text-base font-extrabold text-slate-900">Select Starting Theme</label>
                    <span className="text-xs text-slate-500 font-medium">You can switch or tweak anytime in the studio</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
                    {templates.length} Themes Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplateId(t.id)}
                      className={`cursor-pointer rounded-2xl border-2 transition-all duration-200 overflow-hidden flex flex-col bg-white group ${
                        selectedTemplateId === t.id
                          ? 'border-slate-950 shadow-xl ring-2 ring-slate-950/10 scale-[1.02]'
                          : 'border-slate-200 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex-1 bg-slate-50 p-3.5 flex items-center justify-center min-h-[140px] relative overflow-hidden">
                        {t.thumbnail ? (
                          <img
                            src={t.thumbnail}
                            alt={t.name}
                            className="w-full h-full object-cover rounded-xl border border-slate-200/60 shadow-xs group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-bold">
                            Live Theme
                          </div>
                        )}
                        {selectedTemplateId === t.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="p-3.5 border-t border-slate-100 bg-white flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                            {t.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Generate Button */}
              <button
                className="mt-8 w-full bg-slate-950 hover:bg-slate-800 text-white py-4 rounded-full font-bold text-base shadow-xl hover:shadow-2xl hover:shadow-slate-950/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2.5 group"
                disabled={!file}
                onClick={processUpload}
              >
                <Wand2 className="w-5 h-5" />
                <span>Generate Portfolio Magic ✨</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          ) : (
            /* Multi-step AI Extraction Progress View */
            <div className="py-12 flex flex-col items-center max-w-md mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white flex items-center justify-center mb-6 shadow-2xl animate-bounce">
                <Sparkles className="w-8 h-8 text-blue-400" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mb-2">
                Working AI Magic...
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Extracting and organizing your experience into interactive components
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8 border border-slate-200">
                <div
                  className="bg-slate-950 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Steps Checklist */}
              <div className="w-full space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-left">
                <StatusStep
                  label="Uploading file securely"
                  isActive={state === 'uploading' || loadingStep === 1}
                  isDone={['extracting', 'structuring', 'done'].includes(state) || loadingStep > 1}
                />
                <StatusStep
                  label="Deep parsing career history & accomplishments"
                  isActive={state === 'extracting' || loadingStep === 2}
                  isDone={['structuring', 'done'].includes(state) || loadingStep > 2}
                />
                <StatusStep
                  label="Generating interactive portfolio & themes"
                  isActive={state === 'structuring' || loadingStep === 3}
                  isDone={state === 'done' || loadingStep >= 3}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusStep({ label, isActive, isDone }: { label: string; isActive: boolean; isDone: boolean }) {
  return (
    <div className={`flex items-center gap-3.5 transition-opacity ${isActive || isDone ? 'opacity-100' : 'opacity-40'}`}>
      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
        {isDone ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        ) : isActive ? (
          <Loader2 className="w-5 h-5 text-slate-950 animate-spin" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        )}
      </div>
      <span className={`text-sm font-semibold ${isActive ? 'text-slate-950 font-bold' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  )
}

