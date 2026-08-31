import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileUp, Sparkles, LayoutTemplate, ArrowRight, Eye, LogOut,
  CheckCircle2, Zap, Shield, Globe, ChevronDown,
  Smartphone, Palette, Wand2
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import freshSvg from '../components/templates/fresh-minimal.svg'
import darkSvg from '../components/templates/dark-grid.svg'
import classicSvg from '../components/templates/classic-professional.svg'
import alexSvg from '../components/templates/alex-editorial.svg'

export default function Landing() {
  const { user, logout } = useAuth()
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<'fresh' | 'dark' | 'classic' | 'alex'>('fresh')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: "What file formats can I upload?",
      a: "PortfoliAI supports standard PDF (.pdf) and Microsoft Word (.docx) resumes up to 10MB. Our AI accurately parses both simple and multi-column formats."
    },
    {
      q: "Can I customize the generated portfolio?",
      a: "Yes! You can choose between multiple designer themes, edit any text or project manually with our visual editor, or use the AI Copilot to rewrite descriptions and polish your resume tone."
    },
    {
      q: "Do I need any coding or web hosting knowledge?",
      a: "None at all. Once you upload your resume, PortfoliAI handles everything from structured data extraction to responsive hosting on a custom shareable URL in seconds."
    },
    {
      q: "Can I test it before creating an account?",
      a: "Absolutely! You can explore the full interactive demo with real portfolios or click 'Try with sample resume' in the upload studio anytime."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#edf4f9] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Navbar */}
      <header className="w-full px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-[#edf4f9]/85 border-b border-slate-200/50 transition-all duration-300 overflow-x-hidden">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white" />
          </div>
          <span className="font-display font-bold text-lg sm:text-2xl text-slate-900 tracking-tight">
            PortfoliAI
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-6 shrink-0">
          <Link
            to="/demo"
            className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors group px-2 py-1 rounded-md hover:bg-slate-200/40"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-slate-950 transition-colors" />
            <span>Demo</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-slate-600 hidden sm:inline">
                Hi, {user.name}
              </span>
              <Link
                to="/dashboard"
                className="text-xs sm:text-sm font-semibold bg-slate-950 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs whitespace-nowrap"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-xs sm:text-sm font-medium text-slate-600 hover:text-red-600 p-1.5 sm:p-2 rounded-full hover:bg-slate-200/50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-4">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-slate-200/40 transition-all whitespace-nowrap"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-xs sm:text-sm font-semibold bg-slate-950 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-slate-800 transition-all duration-200 hover:scale-[1.03] hover:shadow-md active:scale-[0.98] whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 max-w-5xl mx-auto">
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-slate-200/80 shadow-xs backdrop-blur-sm text-xs sm:text-sm font-medium text-slate-600 mb-8 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-300 cursor-default select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Resume-to-Portfolio Builder
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-[68px] font-extrabold tracking-tight text-slate-950 leading-[1.12] max-w-4xl">
            Turn your static resume into
            <br />
            an
            <br />
            <span className="text-slate-950">interactive portfolio.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Upload your PDF or DOCX resume. Our AI extracts and structures your
            experience, projects, and skills into an editable, live-preview
            portfolio in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link
              to="/upload"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white px-7 py-3.5 rounded-full font-semibold text-base shadow-sm hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              <FileUp className="w-4 h-4 stroke-[2.2]" />
              <span>Upload Your Resume</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              to="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dce9f4] hover:bg-[#d0e1ee] text-slate-800 border border-slate-200/60 px-6 py-3.5 rounded-full font-semibold text-base shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              <Eye className="w-4 h-4 stroke-[2.2]" />
              <span>View Demo</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No coding required</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free instant preview</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PDF & DOCX ready</span>
          </div>

          {/* Interactive Live Preview Showcase for New Users */}
          <div className="w-full mt-16 max-w-4xl bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-2xl shadow-slate-300/60 transition-all">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-xs font-semibold text-slate-500 ml-2">alex-dev.portfolio.me</span>
              </div>

              {/* Template Switcher Tabs */}
              <div className="flex flex-wrap justify-center sm:flex-nowrap gap-1 sm:gap-0 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
                <button
                  onClick={() => setActivePreviewTemplate('fresh')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activePreviewTemplate === 'fresh' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Fresh Minimal
                </button>
                <button
                  onClick={() => setActivePreviewTemplate('dark')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activePreviewTemplate === 'dark' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Dark Grid
                </button>
                <button
                  onClick={() => setActivePreviewTemplate('classic')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activePreviewTemplate === 'classic' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Classic Pro
                </button>
                <button
                  onClick={() => setActivePreviewTemplate('alex')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activePreviewTemplate === 'alex' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Alex Editorial
                </button>
              </div>
            </div>

            {/* Showcase Viewport */}
            <div className="rounded-2xl overflow-hidden transition-all duration-300 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between bg-slate-100 border border-slate-200 relative">
              <div className="flex-1 w-full h-full relative min-h-[280px]">
                {activePreviewTemplate === 'fresh' && <img src={freshSvg} alt="Fresh Minimal" className="absolute inset-0 w-full h-full object-cover" />}
                {activePreviewTemplate === 'dark' && <img src={darkSvg} alt="Dark Grid" className="absolute inset-0 w-full h-full object-cover" />}
                {activePreviewTemplate === 'classic' && <img src={classicSvg} alt="Classic Pro" className="absolute inset-0 w-full h-full object-cover" />}
                {activePreviewTemplate === 'alex' && <img src={alexSvg} alt="Alex Editorial" className="absolute inset-0 w-full h-full object-cover" />}
              </div>
              <div className="pt-4 px-6 pb-6 border-t border-slate-200/40 flex items-center justify-between bg-white/90 backdrop-blur z-10">
                <span className="text-xs font-medium text-slate-400">Interactive live template sample</span>
                <Link
                  to="/demo"
                  className="text-xs font-bold text-slate-900 hover:text-black flex items-center gap-1 group"
                >
                  <span>Explore full demo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works / 3 Steps */}
        <section className="py-20 sm:py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Flow to Magic in 3 Steps
              </h2>
              <p className="mt-3 text-slate-500 text-sm sm:text-base font-normal">
                Simple three-step workflow from file to published site
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1 */}
              <div className="group relative bg-white/55 hover:bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-slate-200/80 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/70 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-start cursor-default">
                <div className="w-12 h-12 rounded-xl bg-slate-200/70 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-800 mb-6 transition-all duration-300 group-hover:scale-105 shadow-xs">
                  <FileUp className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
                  1. Upload
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Upload your standard PDF or DOCX resume. We keep the layout, you bring the data.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-white/55 hover:bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-slate-200/80 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/70 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-start cursor-default">
                <div className="w-12 h-12 rounded-xl bg-slate-200/70 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-800 mb-6 transition-all duration-300 group-hover:scale-105 shadow-xs">
                  <Sparkles className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
                  2. AI Extraction
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Our AI intelligently extracts your experience, projects, and skills into a structured format.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-white/55 hover:bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-slate-200/80 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/70 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-start cursor-default">
                <div className="w-12 h-12 rounded-xl bg-slate-200/70 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center text-slate-800 mb-6 transition-all duration-300 group-hover:scale-105 shadow-xs">
                  <LayoutTemplate className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
                  3. Edit & Publish
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Tweak the design in our live-preview editor, pick a template, and go live instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-20 px-6 border-t border-slate-200/60 bg-white/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Built for High Impact
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-3">
                Everything you need to stand out
              </h2>
              <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
                No tedious site builders or complex code. PortfoliAI makes creating a stunning portfolio effortless.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/70 rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5">Instant AI Extraction</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Deep parsing extracts jobs, accomplishments, education, and skills in under 10 seconds.
                </p>
              </div>

              <div className="bg-white/70 rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
                  <Wand2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5">AI Copilot Editor</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Chat naturally with AI to refine bullet points, rewrite summaries, or change styling on the fly.
                </p>
              </div>

              <div className="bg-white/70 rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5">Free Custom URL</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Get your own shareable live link (<span className="text-slate-800 font-medium">name.portfolio.me</span>) to share on applications & LinkedIn.
                </p>
              </div>

              <div className="bg-white/70 rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5">Mobile Optimized</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Every portfolio template is fully responsive, looking pixel-perfect on mobile, tablet, and desktop.
                </p>
              </div>

              <div className="bg-white/70 rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5">Curated Themes</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Switch between Minimalist, Dark Grid, and Classic Professional templates with a single click.
                </p>
              </div>

              <div className="bg-white/70 rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1.5">Private & Secure</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your resumes are processed securely. You maintain full control over public publishing anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">
              Everything new users need to know about getting started
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/70 border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-slate-900' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Ready to transform your resume?
              </h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                Join thousands of engineers, designers, and creators presenting their work with interactive AI portfolios.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  to="/upload"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-950 hover:bg-slate-100 px-8 py-3.5 rounded-full font-bold text-base shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileUp className="w-4 h-4 stroke-[2.5]" />
                  <span>Get Started for Free</span>
                </Link>
                <Link
                  to="/demo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 px-6 py-3.5 rounded-full font-semibold text-base transition-all"
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
      <footer className="py-10 text-center text-sm text-slate-500 border-t border-slate-200/60 mt-auto bg-[#edf4f9]/50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
            </div>
            <span className="font-display font-bold text-slate-800">PortfoliAI</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} PortfoliAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <Link to="/demo" className="hover:text-slate-900 transition-colors">
              Demo
            </Link>
            <Link to="/login" className="hover:text-slate-900 transition-colors">
              Log In
            </Link>
            <Link to="/register" className="hover:text-slate-900 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
