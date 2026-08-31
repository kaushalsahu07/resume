import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileText, CheckCircle2, Loader2, X, Sparkles, Wand2, ArrowRight, Lightbulb } from 'lucide-react'
import { templates } from '../components/templates'
import { apiClient } from '../lib/apiClient'
import type { Portfolio } from '../types/portfolio'

type UploadState = 'idle' | 'uploading' | 'extracting' | 'structuring' | 'done' | 'error'

const samplePortfolio: Portfolio = {
  id: 'sample-' + Date.now(),
  slug: 'sample-alex',
  templateId: 'dark-grid',
  headline: 'Alex Morgan',
  summary: 'Senior Software Engineer with 6+ years of experience designing fault-tolerant cloud architectures and high-performance frontend interfaces. Passionate about developer tooling and AI workflows.',
  isPublished: false,
  viewCount: 0,
  education: [
    { id: 'e1', institution: 'University of California, Berkeley', degree: 'B.S. Computer Science', startDate: '2015', endDate: '2019', order: 0 }
  ],
  experience: [
    { id: 'x1', company: 'CloudScale Technologies', role: 'Senior Full Stack Engineer', startDate: '2022', description: 'Architected real-time analytics pipeline reducing query latency by 55%. Mentored 6 junior engineers and drove React 19 migration.', order: 0 },
    { id: 'x2', company: 'NextGen Apps', role: 'Software Engineer', startDate: '2019', endDate: '2022', description: 'Built responsive client web applications and internal dashboard tooling with Next.js and TypeScript.', order: 1 }
  ],
  projects: [
    { id: 'p1', title: 'PortfoliAI Studio', description: 'AI-driven resume parsing and instant portfolio website generation platform.', techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'], link: 'https://github.com', order: 0 },
    { id: 'p2', title: 'DataFlow Orchestrator', description: 'Distributed workflow manager for streaming ETL workloads.', techStack: ['Node.js', 'PostgreSQL', 'Docker', 'Redis'], order: 1 }
  ],
  skills: [
    { id: 's1', name: 'TypeScript' },
    { id: 's2', name: 'React' },
    { id: 's3', name: 'Next.js' },
    { id: 's4', name: 'Node.js' },
    { id: 's5', name: 'PostgreSQL' },
    { id: 's6', name: 'Tailwind CSS' },
    { id: 's7', name: 'Docker' }
  ],
  achievements: [],
  links: [
    { id: 'l1', label: 'GitHub', url: 'https://github.com' },
    { id: 'l2', label: 'LinkedIn', url: 'https://linkedin.com' }
  ]
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<UploadState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('dark-grid')
  const [isDragging, setIsDragging] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)

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

  const handleTrySample = () => {
    setState('uploading')
    setLoadingStep(1)
    setTimeout(() => {
      setLoadingStep(2)
      setTimeout(() => {
        setLoadingStep(3)
        setTimeout(() => {
          setState('done')
          navigate(`/editor/${samplePortfolio.id}`, {
            state: { templateId: selectedTemplateId, portfolio: { ...samplePortfolio, templateId: selectedTemplateId } }
          })
        }, 600)
      }, 700)
    }, 700)
  }

  const processUpload = async () => {
    if (!file) return
    setState('uploading')
    setLoadingStep(1)

    const loadingStates = ['uploading', 'extracting', 'structuring'] as const
    let currentStateIndex = 0
    const interval = setInterval(() => {
      if (currentStateIndex < loadingStates.length - 1) {
        currentStateIndex++
        setState(loadingStates[currentStateIndex])
        setLoadingStep(currentStateIndex + 1)
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
      setErrorMsg(err.message || 'Failed to process resume. Try uploading again or use the sample resume.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mb-3 tracking-tight">
          Upload Your Resume
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          We'll extract your career history and generate your interactive portfolio website in seconds.
        </p>
      </div>

      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 transition-all">
        {state === 'idle' || state === 'error' ? (
          <div className="flex flex-col items-center">
            {errorMsg && (
              <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 flex justify-between items-center text-sm font-medium">
                <span>{errorMsg}</span>
                <button onClick={() => setErrorMsg('')} className="p-1 hover:bg-red-100 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-3xl p-10 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? 'border-slate-950 bg-slate-100 scale-[1.01]'
                  : file
                  ? 'border-slate-950 bg-slate-50 shadow-inner'
                  : 'border-slate-300 hover:border-slate-900/50 hover:bg-slate-50/70'
              }`}
            >
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />

              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-700 transition-transform duration-300 hover:scale-105">
                {file ? (
                  <FileText className="w-8 h-8 text-slate-950" />
                ) : (
                  <UploadIcon className="w-8 h-8 text-slate-600" />
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {file ? file.name : isDragging ? 'Drop your resume file here' : 'Click to upload or drag & drop'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready for AI extraction` : 'Supports PDF and DOCX (up to 10MB)'}
              </p>
            </div>

            {/* Sample Resume Quick Button for First-Time Users */}
            {!file && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 text-xs sm:text-sm text-slate-600 gap-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Don't have your resume file right now?</span>
                </div>
                <button
                  type="button"
                  onClick={handleTrySample}
                  className="font-bold text-slate-900 hover:text-black flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Try with a sample resume</span>
                </button>
              </div>
            )}

            {/* Template Chooser */}
            <div className="w-full mt-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-slate-900">Choose Starting Theme</label>
                <span className="text-xs text-slate-500 font-medium">You can switch anytime in the editor</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {templates.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTemplateId(t.id)}
                    className={`cursor-pointer rounded-2xl border-2 transition-all overflow-hidden flex flex-col bg-white ${
                      selectedTemplateId === t.id
                        ? 'border-slate-950 shadow-lg ring-2 ring-slate-950/10 scale-[1.01]'
                        : 'border-slate-200 hover:border-slate-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex-1 bg-slate-50 p-4 flex items-center justify-center min-h-[150px]">
                      {t.thumbnail ? (
                        <img
                          src={t.thumbnail}
                          alt={t.name}
                          className="w-full h-full object-cover rounded-xl border border-slate-200/60 shadow-xs"
                        />
                      ) : (
                        <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-semibold">
                          Live Interactive Template
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{t.name}</h4>
                        <span className="text-xs text-slate-400 font-medium">
                          {t.id === 'fresh-minimal' 
                            ? 'Clean & modern typography' 
                            : t.id === 'cosmic-violet'
                            ? 'Cosmic violet single-page showcase'
                            : t.id === 'mono-illustrate'
                            ? 'Monochrome illustration portfolio'
                            : t.id === 'classic-professional'
                            ? 'Corporate & executive style'
                            : 'High contrast dark grid'}
                        </span>
                      </div>
                      {selectedTemplateId === t.id && (
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-950"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              className="mt-8 w-full bg-slate-950 hover:bg-slate-800 text-white py-4 rounded-full font-bold text-base shadow-sm hover:shadow-xl hover:shadow-slate-900/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
              disabled={!file}
              onClick={processUpload}
            >
              <Wand2 className="w-5 h-5" />
              <span>Generate Portfolio Magic ✨</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="py-10 flex flex-col items-center max-w-md mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center mb-6 shadow-lg animate-bounce">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
              Working AI Magic...
            </h3>
            <p className="text-slate-500 text-sm mb-8">
              Structuring your experience, projects, and skills into a live site
            </p>

            <div className="w-full space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200/70 text-left">
              <StatusStep
                label="Uploading file securely"
                isActive={state === 'uploading' || loadingStep === 1}
                isDone={['extracting', 'structuring', 'done'].includes(state) || loadingStep > 1}
              />
              <StatusStep
                label="Extracting work history & achievements"
                isActive={state === 'extracting' || loadingStep === 2}
                isDone={['structuring', 'done'].includes(state) || loadingStep > 2}
              />
              <StatusStep
                label="Structuring data with AI into live template"
                isActive={state === 'structuring' || loadingStep === 3}
                isDone={state === 'done' || loadingStep >= 3}
              />
            </div>
          </div>
        )}
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

