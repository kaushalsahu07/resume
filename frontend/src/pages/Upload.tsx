import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileText, CheckCircle2, Loader2, X } from 'lucide-react'
import { templates } from '../components/templates'
import { apiClient } from '../lib/apiClient'
import type { Portfolio } from '../types/portfolio'

type UploadState = 'idle' | 'uploading' | 'extracting' | 'structuring' | 'done' | 'error'

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<UploadState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')

  useEffect(() => {
    if (templates.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(templates[0].id)
    }
  }, [selectedTemplateId])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    // Limit to one resume at a time logic is implicitly handled by input type="file" without multiple attribute
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(selected.type)) {
      setErrorMsg('Couldn\'t read that file — try a PDF or DOCX under 10MB')
      return
    }
    if (selected.size > 10 * 1024 * 1024) {
      setErrorMsg('File is too large — please upload a file under 10MB')
      return
    }

    setFile(selected)
    setErrorMsg('')
  }

  const processUpload = async () => {
    if (!file) return;
    
    setState('uploading')
    
    // We don't have granular progress from the fetch API easily, so we simulate the 
    // visual loading states while waiting for the single API request to finish.
    const loadingStates = ['uploading', 'extracting', 'structuring'] as const;
    let currentStateIndex = 0;
    const interval = setInterval(() => {
      if (currentStateIndex < loadingStates.length - 1) {
        currentStateIndex++;
        setState(loadingStates[currentStateIndex]);
      }
    }, 2000);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const portfolio = await apiClient.request<Portfolio>('/resume/upload', {
        method: 'POST',
        body: formData
      });
      
      clearInterval(interval);
      setState('done');
      
      // Briefly show done state
      setTimeout(() => {
        navigate(`/editor/${portfolio.id}`, { state: { templateId: selectedTemplateId, portfolio } })
      }, 500);
      
    } catch (err: any) {
      clearInterval(interval);
      setState('error');
      setErrorMsg(err.message || 'Failed to process resume');
    }
  }

  const handleUpload = () => {
    if (!file) return
    processUpload()
  }

  return (
    <div className="max-w-3xl mx-auto p-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Upload Your Resume</h1>
        <p className="text-muted-foreground">We'll extract your history and generate your portfolio structure automatically.</p>
      </div>

      <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
        {state === 'idle' || state === 'error' ? (
          <div className="flex flex-col items-center">
            {errorMsg && (
              <div className="w-full bg-red-50 text-red-600 p-4 rounded-md mb-6 flex justify-between items-center">
                <span className="text-sm font-medium">{errorMsg}</span>
                <button onClick={() => setErrorMsg('')}><X className="w-4 h-4" /></button>
              </div>
            )}
            
            <div 
              className={`w-full border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.docx" 
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                {file ? <FileText className="w-8 h-8 text-primary" /> : <UploadIcon className="w-8 h-8 text-muted-foreground" />}
              </div>
              
              <h3 className="text-lg font-medium mb-1">
                {file ? file.name : 'Click to upload or drag and drop'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF or DOCX (max 10MB)'}
              </p>
            </div>

            {file && (
              <div className="w-full mt-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label className="block text-sm font-semibold mb-4 text-foreground">Choose a Starting Template</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {templates.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => setSelectedTemplateId(t.id)}
                      className={`cursor-pointer rounded-2xl border-2 transition-all overflow-hidden flex flex-col bg-background ${
                        selectedTemplateId === t.id 
                          ? 'border-primary shadow-md ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex-1 bg-muted/30 p-4 flex items-center justify-center min-h-[200px]">
                        {t.thumbnail ? (
                          <img src={t.thumbnail} alt={t.name} className="w-full h-full object-cover rounded-md border border-border/50 shadow-sm" />
                        ) : (
                          <div className="w-full h-full border-2 border-dashed border-border/50 rounded-md flex items-center justify-center text-muted-foreground text-sm font-medium">
                            Preview not available
                          </div>
                        )}
                      </div>
                      <div className="p-4 border-t border-border/50 bg-background">
                        <h4 className="font-bold text-lg">{t.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              className="mt-8 w-full bg-primary text-primary-foreground py-3 rounded-md font-medium text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!file}
              onClick={handleUpload}
            >
              Generate Portfolio Magic ✨
            </button>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center max-w-sm mx-auto">
            <h3 className="text-xl font-display font-semibold mb-8 text-center">Working AI Magic...</h3>
            
            <div className="w-full space-y-6">
              <StatusStep 
                label="Uploading file securely" 
                isActive={state === 'uploading'} 
                isDone={['extracting', 'structuring', 'done'].includes(state)} 
              />
              <StatusStep 
                label="Extracting raw text" 
                isActive={state === 'extracting'} 
                isDone={['structuring', 'done'].includes(state)} 
              />
              <StatusStep 
                label="Structuring data with AI" 
                isActive={state === 'structuring'} 
                isDone={['done'].includes(state)} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusStep({ label, isActive, isDone }: { label: string, isActive: boolean, isDone: boolean }) {
  return (
    <div className={`flex items-center gap-4 transition-opacity ${isActive || isDone ? 'opacity-100' : 'opacity-40'}`}>
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
        {isDone ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : isActive ? (
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-muted-foreground" />
        )}
      </div>
      <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  )
}
