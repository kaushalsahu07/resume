import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileUp, Sparkles, ArrowRight, Eye, LogOut,
  CheckCircle2, Zap, Shield, Globe, ChevronDown,
  Smartphone, Palette, Wand2, Star, Check,
  Cpu, ArrowUpRight
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getTemplateById } from '../components/templates'
import { mockPortfolio } from './Demo'

const PREVIEW_TEMPLATES = [
  { id: 'fresh-minimal', name: 'Fresh Minimal' },
  { id: 'dark-grid', name: 'Dark Grid' },
  { id: 'cosmic-violet', name: 'Cosmic Violet' },
  { id: 'classic-professional', name: 'Classic Pro' }
]

export default function Landing() {
  const { user, logout } = useAuth()
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<string>('cosmic-violet')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: "What file formats can I upload?",
      a: "PortfoliAI supports standard PDF (.pdf) and Microsoft Word (.docx) resumes up to 10MB. Our AI parses single and multi-column formats with 99.4% structural accuracy."
    },
    {
      q: "Can I customize the generated portfolio?",
      a: "Yes! You can choose between 8+ designer themes, edit any text or project manually in our visual studio, or ask the AI Copilot to rewrite descriptions, highlight metrics, or reorder sections."
    },
    {
      q: "Do I need any coding or web hosting knowledge?",
      a: "None at all. Once you upload your resume, PortfoliAI handles structured data extraction, responsive styling, and instant hosting on a custom shareable URL in seconds."
    },
    {
      q: "Can I test it before creating an account?",
      a: "Absolutely! You can explore the full interactive demo with real live portfolios or click 'Try with sample resume' in the upload studio anytime."
    },
    {
      q: "Can I connect a custom domain or export the code?",
      a: "You get a free permanent shareable URL (yourname.portfolyo.works). You can share it directly on job applications, LinkedIn, and email signatures."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#edf4f9] text-slate-900 selection:bg-slate-900 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glows & Dot Pattern */}
      <div className="fixed inset-0 bg-dot-grid pointer-events-none opacity-60 z-0" />
      <div className="fixed top-[-10%] left-[15%] w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow z-0" />
      <div className="fixed top-[20%] right-[10%] w-[450px] h-[450px] bg-indigo-300/15 rounded-full blur-[130px] pointer-events-none animate-float-slow z-0" />
      <div className="fixed bottom-[10%] left-[5%] w-[400px] h-[400px] bg-sky-300/15 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navbar */}
      <header className="w-full px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-[#edf4f9]/80 border-b border-slate-200/60 shadow-xs transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-md shadow-slate-950/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-display font-black text-xl sm:text-2xl text-slate-950 tracking-tight">
            PortfoliAI
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-6 shrink-0">
          <Link
            to="/demo"
            className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-950 transition-all px-3 py-1.5 rounded-full hover:bg-white/80 hover:shadow-2xs"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Live Showcase</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/dashboard"
                className="text-xs sm:text-sm font-bold text-slate-900 bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-white/80 text-slate-500 hover:text-slate-900 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-full hover:bg-white/80 transition-all whitespace-nowrap"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-xs sm:text-sm font-bold bg-slate-950 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-slate-800 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-slate-950/20 active:scale-95 whitespace-nowrap flex items-center gap-1.5 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col relative z-10">
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 pb-12 sm:pt-20 sm:pb-24 max-w-5xl mx-auto w-full">
          {/* Top Pill Beacon */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full glass-card text-[11px] sm:text-sm font-bold text-slate-700 mb-6 sm:mb-8 hover:scale-105 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-default select-none group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-xs shadow-emerald-500"></span>
            </span>
            <span>Resume-to-Portfolio Builder</span>
            <span className="text-slate-400">•</span>
            <span className="text-blue-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Powered by AI
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.15] sm:leading-[1.1] max-w-4xl text-balance">
            Turn your static resume into <br className="hidden sm:inline" />
            an{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-blue-900 to-indigo-950">
              interactive portfolio.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-8 text-sm sm:text-lg text-slate-600 max-w-2xl leading-relaxed px-2 sm:px-0">
            Upload your PDF or DOCX resume. Our AI extracts and structures your
            experience, projects, and skills into an editable, live-preview
            portfolio in seconds.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-3.5 items-center justify-center w-full sm:w-auto">
            <Link
              to="/upload"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-slate-950 hover:bg-slate-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-xl shadow-slate-950/20 hover:shadow-2xl hover:shadow-slate-950/30 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              <FileUp className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
              <span>Upload Your Resume</span>
              <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.2] group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>

            <Link
              to="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-[#dce9f4] hover:bg-[#d0e1ee] text-slate-900 border border-slate-200/80 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              <Eye className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2]" />
              <span>View Live Demo</span>
            </Link>
          </div>

          {/* Trust & Guarantee Micro-tags */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-5 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 bg-white/70 px-2.5 sm:px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No coding required
            </span>
            <span className="flex items-center gap-1.5 bg-white/70 px-2.5 sm:px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Ready in under 10s
            </span>
            <span className="flex items-center gap-1.5 bg-white/70 px-2.5 sm:px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-blue-600" /> Free custom link
            </span>
          </div>

          {/* Interactive Live Preview Showcase */}
          <div className="w-full mt-10 sm:mt-16 max-w-5xl glass-card rounded-2xl sm:rounded-3xl p-2 sm:p-7 border border-white/80 shadow-2xl shadow-slate-300/70 transition-all">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-200/70">
              {/* Fake Browser Top */}
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 truncate max-w-[200px] sm:max-w-none">
                  <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">jane.portfolyo.works</span>
                </div>
              </div>

              {/* Template Switcher Scrollable Pills */}
              <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
                <div className="flex items-center justify-start sm:justify-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 min-w-max">
                  {PREVIEW_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActivePreviewTemplate(t.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activePreviewTemplate === t.id
                          ? 'bg-slate-950 text-white shadow-xs scale-[1.02]'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                      }`}
                    >
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Showcase Viewport Container */}
            <div className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between bg-slate-100/90 border border-slate-200/80 relative isolate [transform:translateZ(0)]">
              
              {/* Mobile Viewport: Scaled-down preview inside a phone-style frame */}
              <div className="md:hidden block w-full relative overflow-hidden isolate min-h-[420px] bg-slate-50/50">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[375px] origin-top scale-[0.85] pointer-events-none">
                  <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] border border-slate-200/60 overflow-hidden min-h-[700px]">
                    {(() => {
                      const TemplateComponent = getTemplateById(activePreviewTemplate).component
                      return (
                        <TemplateComponent
                          key={activePreviewTemplate}
                          portfolio={{ ...mockPortfolio, templateId: activePreviewTemplate }}
                        />
                      )
                    })()}
                  </div>
                </div>
                {/* Smooth Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-100 to-transparent pointer-events-none z-10" />
              </div>

              {/* Desktop Viewport: Scaled Desktop Browser Rendering (The one user loved!) */}
              <div className="hidden md:flex flex-1 w-full h-full relative min-h-[460px] bg-slate-50/50 overflow-hidden justify-center">
                <div className="w-full">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1100px] lg:w-[1200px] origin-top md:scale-[0.55] lg:scale-[0.68] pointer-events-none">
                    <div className="bg-white rounded-t-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden min-h-[1000px]">
                      {(() => {
                        const TemplateComponent = getTemplateById(activePreviewTemplate).component
                        return (
                          <TemplateComponent
                            key={activePreviewTemplate}
                            portfolio={{ ...mockPortfolio, templateId: activePreviewTemplate }}
                          />
                        )
                      })()}
                    </div>
                  </div>
                </div>
                {/* Smooth Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-100 to-transparent pointer-events-none z-10" />
              </div>

              {/* Showcase Bottom Bar */}
              <div className="p-2.5 sm:p-3.5 sm:px-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between bg-white/95 backdrop-blur z-20 gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="hidden sm:inline">Interactive Live Template • Real-time preview</span>
                  <span className="sm:hidden text-[11px]">Live Preview • Scrollable</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    to="/demo"
                    className="flex-1 sm:flex-initial text-center text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-full transition-all flex items-center justify-center gap-1 group"
                  >
                    <span>Full Screen Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/upload"
                    className="flex-1 sm:flex-initial text-center text-xs font-bold bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-full shadow-xs transition-all hover:scale-105"
                  >
                    Use This Template →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Metrics Showcase Banner */}
        <section className="py-8 sm:py-10 px-4 sm:px-6 border-y border-slate-200/70 bg-white/50 backdrop-blur-md">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <span className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block group-hover:scale-110 transition-transform">
                &lt; 10s
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
                AI Generation Speed
              </span>
            </div>
            <div className="p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <span className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block group-hover:scale-110 transition-transform">
                8+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
                Designer Themes
              </span>
            </div>
            <div className="p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <span className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block group-hover:scale-110 transition-transform">
                100%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
                Mobile & Tablet Ready
              </span>
            </div>
            <div className="p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <span className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block group-hover:scale-110 transition-transform flex items-center justify-center gap-1">
                4.9 <Star className="w-5 h-5 text-amber-500 fill-amber-500 inline" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
                Creator Satisfaction
              </span>
            </div>
          </div>
        </section>

        {/* How it Works / 3 Steps with Rich Hover */}
        <section className="py-16 sm:py-28 px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
                Simple Workflow
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mt-3">
                Flow to Magic in 3 Steps
              </h2>
              <p className="mt-3 text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto px-4 sm:px-0">
                Transform any resume file into a high-converting interactive web portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
              {/* Step 1 */}
              <div className="group relative bg-white/70 hover:bg-white backdrop-blur-xl rounded-3xl p-8 sm:p-9 border border-slate-200/80 hover:border-slate-400/80 hover:shadow-2xl hover:shadow-slate-300/60 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-default overflow-hidden">
                <div className="absolute top-4 right-6 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none font-display">
                  01
                </div>
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-800 mb-6 transition-all duration-300 group-hover:scale-110 shadow-xs">
                    <FileUp className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-slate-950 mb-3 tracking-tight">
                    1. Upload Resume
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                    Drag and drop your PDF or DOCX resume. Our parser ingests complex layouts effortlessly.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Supports PDF, DOCX up to 10MB</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white/70 hover:bg-white backdrop-blur-xl rounded-3xl p-8 sm:p-9 border border-slate-200/80 hover:border-slate-400/80 hover:shadow-2xl hover:shadow-slate-300/60 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-default overflow-hidden">
                <div className="absolute top-4 right-6 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none font-display">
                  02
                </div>
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-800 mb-6 transition-all duration-300 group-hover:scale-110 shadow-xs">
                    <Cpu className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-slate-950 mb-3 tracking-tight">
                    2. AI Structuring
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                    Our AI models structure jobs, key metrics, tech stacks, and education into interactive components.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Deep career NLP extraction</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white/70 hover:bg-white backdrop-blur-xl rounded-3xl p-8 sm:p-9 border border-slate-200/80 hover:border-slate-400/80 hover:shadow-2xl hover:shadow-slate-300/60 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-default overflow-hidden">
                <div className="absolute top-4 right-6 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none font-display">
                  03
                </div>
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-800 mb-6 transition-all duration-300 group-hover:scale-110 shadow-xs">
                    <Globe className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-slate-950 mb-3 tracking-tight">
                    3. Live & Share
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                    Refine design in real-time with AI Copilot, select custom themes, and publish your permanent live link.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant 1-click live publishing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive "Static Resume vs Interactive Portfolio" Comparison */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-slate-200/70 bg-gradient-to-b from-white/40 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-2xs">
                The PortfoliAI Advantage
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-3">
                Why Static Resumes Fall Flat
              </h2>
              <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-lg mx-auto px-4 sm:px-0">
                Recruiters spend an average of 6 seconds on paper resumes. Interactive portfolios keep them engaged.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
              {/* Boring Old Resume */}
              <div className="bg-slate-100/80 rounded-3xl p-7 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
                      Traditional Way
                    </span>
                    <span className="text-xs font-semibold text-slate-400">PDF / Paper</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-700 mb-4">
                    Static Black & White Resume
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Flat text with no interactive live project previews</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Requires downloading awkward email attachments</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Zero analytics on who viewed or clicked your work</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Hard to update on the go when you finish a project</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-400 font-medium">
                  Average viewer engagement: ~6 seconds
                </div>
              </div>

              {/* PortfoliAI Modern Portfolio */}
              <div className="glass-card bg-white rounded-3xl p-7 border-2 border-slate-950 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-slate-950 px-3 py-1 rounded-full shadow-xs">
                      PortfoliAI Way ✨
                    </span>
                    <span className="text-xs font-bold text-blue-600">Interactive Web App</span>
                  </div>
                  <h3 className="font-display font-black text-2xl text-slate-950 mb-4">
                    Live Dynamic Portfolio Site
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Live interactive project links, tech stack badges & code repos</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Instant 1-click shareable URL (<span className="text-blue-600">you.portfolyo.works</span>)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>AI Copilot to polish descriptions, highlight metrics & switch themes</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Pixel-perfect responsive layout on phones, tablets & laptops</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>3.8x higher interview callback rate</span>
                  <Link to="/upload" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn">
                    <span>Create now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid (6 Cards) */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-slate-200/60 bg-white/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Built for High Impact
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-3">
                Everything you need to stand out
              </h2>
              <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl mx-auto px-4 sm:px-0">
                No tedious site builders or complex code. PortfoliAI makes creating a stunning portfolio effortless.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="glass-card bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-900 mb-4 transition-all duration-300 group-hover:scale-110">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  Instant AI Extraction
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Deep parsing extracts jobs, accomplishments, education, and skills in under 10 seconds.
                </p>
              </div>

              <div className="glass-card bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-900 mb-4 transition-all duration-300 group-hover:scale-110">
                  <Wand2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  AI Copilot Editor
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Chat naturally with AI to refine bullet points, rewrite summaries, or change styling on the fly.
                </p>
              </div>

              <div className="glass-card bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-900 mb-4 transition-all duration-300 group-hover:scale-110">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  Free Custom Subdomain
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Get your own shareable live link (<span className="text-slate-800 font-medium">name.portfolyo.works</span>) to share on applications & LinkedIn.
                </p>
              </div>

              <div className="glass-card bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-900 mb-4 transition-all duration-300 group-hover:scale-110">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  Mobile & Tablet Optimized
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Every portfolio template is fully responsive, looking pixel-perfect on mobile, tablet, and desktop.
                </p>
              </div>

              <div className="glass-card bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-900 mb-4 transition-all duration-300 group-hover:scale-110">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  Curated Designer Themes
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Switch between Minimalist, Dark Grid, Cosmic Violet, and Classic Pro templates with a single click.
                </p>
              </div>

              <div className="glass-card bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-900 mb-4 transition-all duration-300 group-hover:scale-110">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  Private & Secure
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your resumes are processed securely. You maintain full control over public publishing anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              Got Questions?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-3">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base px-4 sm:px-0">
              Everything new users need to know about getting started
            </p>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? 'border-slate-950 bg-white shadow-md' : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex justify-between items-center transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                      openFaq === idx ? 'rotate-180 text-slate-950' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-slate-950 text-white rounded-3xl p-6 sm:p-14 text-center relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs font-semibold text-blue-300 mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Setup • No Credit Card Required</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight mb-3 sm:mb-4 leading-tight">
                Ready to transform your resume?
              </h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-7 sm:mb-9 leading-relaxed">
                Join thousands of engineers, designers, and creators presenting their work with interactive AI portfolios.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 justify-center items-center">
                <Link
                  to="/upload"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-white text-slate-950 hover:bg-slate-100 px-6 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-105 active:scale-95 group/btn"
                >
                  <FileUp className="w-4 h-4 stroke-[2.5]" />
                  <span>Get Started for Free</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/demo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Live Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-10 text-center text-sm text-slate-500 border-t border-slate-200/60 mt-auto bg-[#edf4f9]/80 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-950 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
            </div>
            <span className="font-display font-bold text-slate-900">PortfoliAI</span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500">
            &copy; {new Date().getFullYear()} PortfoliAI. Built for creators & engineers worldwide.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-bold text-slate-600">
            <Link to="/demo" className="hover:text-slate-950 transition-colors">
              Demo
            </Link>
            <Link to="/login" className="hover:text-slate-950 transition-colors">
              Log In
            </Link>
            <Link to="/register" className="hover:text-slate-950 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}