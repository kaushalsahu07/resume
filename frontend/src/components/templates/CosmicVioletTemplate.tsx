import { useState } from 'react'
import type { Portfolio } from '../../types/portfolio'
import {
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Mail,
  Globe,
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Layers,
  Send,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

// Custom SVG Icons for brand socials
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export default function CosmicVioletTemplate({ portfolio }: { portfolio: Portfolio }) {
  const [activeNav, setActiveNav] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const name = portfolio.headline || 'Portfolio'
  const summary = portfolio.summary || 'A passionate software engineer & designer creating meaningful, high-impact digital products.'

  // Extract initials for logo monogram
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CV'

  // Helper to highlight words in narrative summary
  const renderStyledSummary = (text: string) => {
    const sentences = text.split('. ')
    if (sentences.length > 1) {
      return (
        <>
          <span className="text-white font-medium">{sentences[0]}.</span>{' '}
          <span className="text-purple-200/80">{sentences.slice(1).join('. ')}</span>
        </>
      )
    }
    return <span className="text-white/90">{text}</span>
  }

  // Group skills by category if available
  const groupedSkills = (portfolio.skills || []).reduce((acc, skill) => {
    const cat = skill.category || 'Core Technologies'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, typeof portfolio.skills>)

  const emailLink = (portfolio.links || []).find(l => l.url.startsWith('mailto:') || l.label.toLowerCase().includes('email'))
  const currentRole = portfolio.experience?.[0]

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    ...(portfolio.experience?.length ? [{ label: 'Experience', href: '#experience', id: 'experience' }] : []),
    ...(portfolio.projects?.length ? [{ label: 'Projects', href: '#projects', id: 'projects' }] : []),
    ...(portfolio.skills?.length ? [{ label: 'Skills', href: '#skills', id: 'skills' }] : []),
    ...(portfolio.education?.length || portfolio.achievements?.length ? [{ label: 'Education', href: '#education', id: 'education' }] : []),
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  const handleNavClick = (id: string) => {
    setActiveNav(id)
    setMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-[#110720] text-white font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden w-full">
      
      {/* ─── Ambient Cosmic Background Lights (Optimized for Mobile Performance) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[90vw] sm:w-[50vw] h-[90vw] sm:h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-transparent blur-[60px] sm:blur-[130px]" />
        <div className="absolute top-[30%] -right-[15%] w-[85vw] sm:w-[45vw] h-[85vw] sm:h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-bl from-fuchsia-900/25 via-purple-950/25 to-transparent blur-[70px] sm:blur-[140px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[75vw] sm:w-[40vw] h-[75vw] sm:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-purple-950/25 blur-[70px] sm:blur-[150px]" />

        {/* Faint ambient grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #8b5cf6 1px, transparent 1px),
              linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)
            `,
            backgroundSize: '2.5rem 2.5rem',
            maskImage: 'radial-gradient(circle at 50% 30%, black 50%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black 50%, transparent 95%)'
          }}
        />
      </div>

      {/* ─── Fixed Glassmorphism Navigation Bar ─── */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#110720]/90 backdrop-blur-xl border-b border-purple-500/20 transition-all">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 group text-decoration-none min-w-0"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-fuchsia-500 p-[1px] shadow-md shadow-purple-900/40 group-hover:shadow-purple-700/60 transition-all flex-shrink-0">
              <div className="w-full h-full bg-[#110720] rounded-[11px] flex items-center justify-center font-bold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-200">
                {initials}
              </div>
            </div>
            <span className="font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors truncate">
              {name.split(' ')[0]}<span className="text-purple-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 list-none m-0 p-0 text-sm font-medium">
            {navItems.map(item => (
              <li key={item.id} className="m-0 p-0">
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 relative text-xs sm:text-sm ${
                    activeNav === item.id 
                      ? 'text-purple-300 font-semibold' 
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeNav === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-900/40 border border-purple-500/40 text-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Let's Talk</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Slide-down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-purple-500/20 bg-[#110720]/98 backdrop-blur-2xl px-4 py-4 space-y-3 shadow-2xl transition-all">
            <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
              {navItems.map(item => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeNav === item.id
                        ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-inner'
                        : 'text-white/80 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeNav === item.id ? 'text-purple-300 translate-x-0.5' : 'text-white/30'}`} />
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-900/40"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Directly</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ─── Main Content Body ─── */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        {/* ─── Hero Section ─── */}
        <section id="home" className="pt-8 sm:pt-16 pb-12 sm:pb-20 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
              
              {/* Top Pill Badges Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {/* Greeting Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/90 via-purple-900/60 to-purple-950/90 border border-purple-500/40 backdrop-blur-md shadow-lg shadow-purple-950/50">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-purple-200 text-xs sm:text-sm font-semibold">
                    Hello, I'm <span className="text-white font-bold">{name}</span>
                  </span>
                  <span className="text-xs">✨</span>
                </div>

                {/* Live Availability Status */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>Available for Opportunities</span>
                </div>
              </div>

              {/* Catchy Punchline Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
                  Building{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 font-black">
                    high-impact
                  </span>{' '}
                  products with{' '}
                  <span className="inline-block relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-200 font-black">
                      cover & code
                    </span>
                    <span className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-purple-600/30 via-fuchsia-600/25 to-indigo-600/30 rounded-xl blur-sm -z-0" />
                  </span>
                  .
                </h1>
                
                <p className="text-xs sm:text-sm text-purple-300/80 font-medium italic">
                  "Because if the first impression does not captivate you, what else will?"
                </p>
              </div>

              {/* Current Role / Status Pill */}
              {currentRole && (
                <div className="flex flex-wrap items-center justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-purple-500/20 text-xs sm:text-sm text-purple-200/90 backdrop-blur-sm text-left">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>
                      Currently <span className="font-semibold text-white">{currentRole.role}</span> at <span className="font-semibold text-purple-300">{currentRole.company}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Professional Narrative Summary */}
              <div className="text-sm sm:text-base md:text-lg text-purple-100/85 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {renderStyledSummary(summary)}
              </div>

              {/* Hero Action CTA Buttons & Quick Socials */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  href="#projects"
                  onClick={() => handleNavClick('projects')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-900/50 hover:shadow-purple-700/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Explore Featured Works</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onClick={() => handleNavClick('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/30 text-purple-200 hover:text-white font-semibold text-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>Get in Touch</span>
                </a>

                {/* Quick Social Icons Row */}
                <div className="flex items-center gap-2 pt-1 sm:pt-0">
                  {portfolio.links && portfolio.links.length > 0 ? (
                    portfolio.links.slice(0, 3).map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-600/80 border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                        title={link.label}
                        aria-label={link.label}
                      >
                        {link.url.includes('github') ? (
                          <GithubIcon className="w-4 h-4" />
                        ) : link.url.includes('linkedin') ? (
                          <LinkedinIcon className="w-4 h-4" />
                        ) : (
                          <Globe className="w-4 h-4" />
                        )}
                      </a>
                    ))
                  ) : (
                    <>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-600/80 border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                        title="GitHub"
                        aria-label="GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-600/80 border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                        title="LinkedIn"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Profile Showcase Deck */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                
                {/* Multi-tone Cosmic Glow Aura */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-600/35 via-fuchsia-600/25 to-indigo-600/35 blur-2xl -z-10 transform scale-95" />

                {/* Main Card Shell */}
                <div className="rounded-3xl bg-gradient-to-b from-slate-900/95 via-purple-950/60 to-slate-950/95 border border-purple-500/40 p-4 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-4 sm:space-y-6 hover:border-purple-400/60 transition-all duration-300">
                  
                  {/* Top Bar with Window Controls & Status */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-purple-300/90 font-mono bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                      <Terminal className="w-3 h-3 text-purple-400" />
                      <span>engineer.dev</span>
                    </div>
                  </div>

                  {/* Profile Spotlight Header */}
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 p-[2px] shadow-lg shadow-purple-900/50">
                        <div className="w-full h-full bg-[#130826] rounded-[14px] flex items-center justify-center text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-purple-200 to-fuchsia-100">
                          {initials}
                        </div>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#130826] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-xl font-bold text-white truncate leading-tight">{name}</h3>
                      <p className="text-xs sm:text-sm text-purple-300 font-medium truncate mt-0.5">
                        {currentRole?.role || 'Digital Product Engineer'}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-purple-200/70 mt-1">
                        <Globe className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">Open for Global Remote</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Metrics Counters */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center hover:bg-purple-900/20 transition-all">
                      <div className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200">
                        {portfolio.projects?.length || 5}+
                      </div>
                      <div className="text-[11px] sm:text-xs text-purple-200/70 font-medium mt-1">Projects Built</div>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center hover:bg-purple-900/20 transition-all">
                      <div className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200">
                        {portfolio.experience?.length ? `${portfolio.experience.length * 2}+` : '3+'}
                      </div>
                      <div className="text-[11px] sm:text-xs text-purple-200/70 font-medium mt-1">Years Experience</div>
                    </div>
                  </div>

                  {/* Code Snippet / Stack Snapshot */}
                  <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-3 sm:p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-purple-300/70 border-b border-white/5 pb-1.5">
                      <span>stack.config.ts</span>
                      <span className="text-emerald-400">● ready</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {(portfolio.skills || []).slice(0, 6).map(skill => (
                        <span 
                          key={skill.id} 
                          className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-200 text-[11px] sm:text-xs font-medium shadow-xs hover:border-purple-400 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {(!portfolio.skills || portfolio.skills.length === 0) && (
                        <>
                          <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-medium">TypeScript</span>
                          <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-medium">React</span>
                          <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-medium">Node.js</span>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* ─── Tech Stack Highlights Ribbon ─── */}
          {portfolio.skills && portfolio.skills.length > 0 && (
            <div className="mt-12 sm:mt-16 pt-8 border-t border-purple-500/20">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-purple-300/60 mb-4">
                Core Technologies & Tools
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
                {portfolio.skills.slice(0, 8).map(skill => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-purple-500/20 text-purple-200 text-xs sm:text-sm font-medium hover:border-purple-400 hover:bg-purple-900/30 transition-all cursor-default shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ─── Work Experience Section ─── */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section id="experience" className="py-12 sm:py-20 border-t border-purple-500/20 scroll-mt-20">
            <div className="space-y-8 sm:space-y-12">
              
              {/* Section Header */}
              <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Career Journey</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Work Experience
                </h2>
                <p className="text-xs sm:text-sm text-purple-200/70">
                  Organizations and high-impact engineering roles where I have delivered real value.
                </p>
              </div>

              {/* 2-Column Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {portfolio.experience.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="group relative bg-gradient-to-b from-slate-950/90 via-purple-950/40 to-slate-950/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border-t-2 border-purple-500/80 border-x border-b border-purple-500/20 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-950/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Company & Role Header with Responsive Date Wrapping */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-200 font-bold text-base group-hover:scale-105 group-hover:border-purple-400 transition-all flex-shrink-0">
                            {exp.company ? exp.company[0].toUpperCase() : 'W'}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-tight truncate">
                              {exp.role}
                            </h3>
                            <p className="text-purple-400 text-xs sm:text-sm font-semibold truncate">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Date Badge */}
                        <div className="self-start sm:self-center">
                          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-purple-500/20 text-[11px] sm:text-xs text-purple-200/80 whitespace-nowrap font-medium">
                            {exp.startDate || '2022'} — {exp.endDate || 'Present'}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      {exp.description && (
                        <p className="text-purple-100/75 text-xs sm:text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>
                      )}
                    </div>

                    {/* Footer Info */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs text-purple-300/50 font-medium">Position #{idx + 1}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                        <span>LEARN MORE</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ─── Featured Projects Section ─── */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section id="projects" className="py-12 sm:py-20 border-t border-purple-500/20 scroll-mt-20">
            <div className="space-y-10 sm:space-y-16">
              
              {/* Section Header */}
              <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Portfolio Lab</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Featured Projects
                </h2>
                <p className="text-xs sm:text-sm text-purple-200/70">
                  Modern web applications, intelligent systems, and interactive digital products.
                </p>
              </div>

              {/* Projects Showcase Cards */}
              <div className="space-y-10 sm:space-y-16">
                {portfolio.projects.map((proj, idx) => {
                  const isEven = idx % 2 === 0
                  return (
                    <div
                      key={proj.id || idx}
                      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center ${
                        !isEven ? 'lg:grid-flow-dense' : ''
                      }`}
                    >
                      {/* Project Details */}
                      <div className={`lg:col-span-6 space-y-3 sm:space-y-4 ${!isEven ? 'lg:col-start-7' : ''}`}>
                        <div className="space-y-1">
                          <p className="text-purple-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                            Featured Project #{idx + 1}
                          </p>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                            {proj.title}
                          </h3>
                        </div>

                        {/* Description Box */}
                        <div className="relative z-10 bg-gradient-to-br from-white/10 via-purple-950/40 to-slate-950/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-purple-500/30 shadow-xl">
                          <p className="text-purple-100/90 text-xs sm:text-sm md:text-base leading-relaxed">
                            {proj.description || 'An advanced digital solution engineered to solve real-world problems with sleek UI design and resilient performance.'}
                          </p>
                        </div>

                        {/* Tech Stack Chips */}
                        {proj.techStack && proj.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                            {proj.techStack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-purple-950/80 border border-purple-500/40 text-purple-200 shadow-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Project Actions */}
                        <div className="pt-2">
                          {proj.link ? (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 sm:bg-white/10 hover:bg-purple-600 text-white font-semibold text-xs sm:text-sm border border-purple-500/40 hover:border-purple-600 transition-all shadow-md"
                            >
                              <span>Live Preview</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 text-xs text-purple-300/60 font-medium">
                              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                              <span>Production Architecture</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Preview Mockup Canvas */}
                      <div className={`lg:col-span-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        <div className="group relative rounded-2xl overflow-hidden bg-slate-950/90 border border-purple-500/30 shadow-xl p-2.5 sm:p-3.5 hover:border-purple-400/60 transition-all duration-300">
                          
                          {/* Inner Viewport Mockup */}
                          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950/70 to-slate-900 aspect-[16/10] sm:aspect-[16/9] min-h-[160px] sm:min-h-[200px] flex flex-col justify-between p-3.5 sm:p-5 relative border border-white/10">
                            
                            {/* Mockup Header Bar */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                              </div>
                              <span className="text-[10px] font-mono text-purple-300/50">app.preview.live</span>
                            </div>

                            {/* Centered Graphic Icon & Info */}
                            <div className="my-auto text-center space-y-2">
                              <div className="inline-flex p-3 rounded-2xl bg-purple-900/50 border border-purple-500/40 text-purple-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-700/50 transition-all duration-300">
                                <Layers className="w-6 h-6 sm:w-8 sm:h-8" />
                              </div>
                              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                                {proj.title}
                              </h4>
                              <p className="text-[11px] sm:text-xs text-purple-300/70 font-mono truncate max-w-xs mx-auto">
                                {proj.techStack?.join(' • ') || 'Modern Full-Stack Solution'}
                              </p>
                            </div>

                            {/* Bottom Status Bar */}
                            <div className="flex items-center justify-between text-[10px] text-purple-200/50 pt-1.5 border-t border-white/5">
                              <span>Interactive App</span>
                              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>
          </section>
        )}

        {/* ─── Skills & Expertise Section ─── */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section id="skills" className="py-12 sm:py-20 border-t border-purple-500/20 scroll-mt-20">
            <div className="space-y-8 sm:space-y-10">
              
              {/* Section Header */}
              <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Technical Arsenal</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Skills & Expertise
                </h2>
                <p className="text-xs sm:text-sm text-purple-200/70">
                  Languages, frameworks, developer toolchains, and design capabilities.
                </p>
              </div>

              {/* Categorized Skill Cloud */}
              <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
                {Object.entries(groupedSkills).map(([category, skills]) => (
                  <div 
                    key={category} 
                    className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950/90 via-purple-950/40 to-slate-950/90 border border-purple-500/20 backdrop-blur-md space-y-3"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {skills.map(skill => (
                        <div
                          key={skill.id}
                          className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 border border-purple-500/20 text-white/90 text-xs sm:text-sm font-medium hover:border-purple-400 hover:bg-purple-900/40 hover:text-purple-200 transition-all cursor-default flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ─── Education & Achievements Section ─── */}
        {((portfolio.education && portfolio.education.length > 0) || (portfolio.achievements && portfolio.achievements.length > 0)) && (
          <section id="education" className="py-12 sm:py-20 border-t border-purple-500/20 scroll-mt-20">
            <div className="space-y-8 sm:space-y-10">
              
              {/* Section Header */}
              <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Academic & Honors</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Education & Honors
                </h2>
              </div>

              {/* Education & Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
                
                {/* Education Items */}
                {portfolio.education?.map((edu, idx) => (
                  <div
                    key={edu.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950/90 to-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-9 h-9 rounded-xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-purple-200/70 font-mono">
                        {edu.startDate || ''} {edu.endDate ? `— ${edu.endDate}` : ''}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">{edu.degree}</h4>
                      <p className="text-xs sm:text-sm font-semibold text-purple-300">{edu.institution}</p>
                      {edu.field && (
                        <p className="text-xs text-white/70 mt-1">Field: {edu.field}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Achievement Items */}
                {portfolio.achievements?.map((ach, idx) => (
                  <div
                    key={ach.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950/90 to-fuchsia-950/40 border border-purple-500/20 hover:border-fuchsia-400/50 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-9 h-9 rounded-xl bg-fuchsia-900/40 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-300 flex-shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      {ach.date && (
                        <span className="text-[11px] sm:text-xs text-purple-200/70 font-mono">{ach.date}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">{ach.title}</h4>
                      {ach.description && (
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">{ach.description}</p>
                      )}
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </section>
        )}

        {/* ─── Contact & Social Footer Section ─── */}
        <footer id="contact" className="py-12 sm:py-20 border-t border-purple-500/20 text-center space-y-8 sm:space-y-10 scroll-mt-20">
          
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Let's Build Something Remarkable
            </h2>
            
            <p className="text-xs sm:text-base text-purple-200/75 leading-relaxed max-w-xl mx-auto">
              I'm open to full-time engineering roles, freelance partnerships, and innovative product collaborations.
            </p>

            {/* Main Email CTA Button */}
            <div className="pt-2 sm:pt-4">
              <a
                href={emailLink ? emailLink.url : `mailto:hello@example.com?subject=Hello%20${encodeURIComponent(name)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-900/60 hover:shadow-purple-700/80 hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Say Hello Directly</span>
              </a>
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-1">
            {portfolio.links && portfolio.links.length > 0 ? (
              portfolio.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-white/80 hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 active:scale-95"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.url.includes('github') ? (
                    <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : link.url.includes('linkedin') ? (
                    <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : link.url.startsWith('mailto:') ? (
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </a>
              ))
            ) : (
              <>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-white/80 hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 active:scale-95"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-white/80 hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 active:scale-95"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </>
            )}
          </div>

          {/* Copyright Signature */}
          <div className="pt-6 sm:pt-8 border-t border-purple-500/20 text-[11px] sm:text-xs text-purple-300/50">
            © {new Date().getFullYear()} {name}. Built with Passion & Modern Web Architecture.
          </div>

        </footer>

      </main>
    </div>
  )
}
