import { useState } from 'react'
import type { Portfolio } from '../../types/portfolio'
import {
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Mail,
  Globe,
  ArrowRight,
  Terminal,
  Layers,
  Code2,
  Send,
  Menu,
  X,
  Sparkles
} from 'lucide-react'

<<<<<<< HEAD
// Custom SVG Icons for Brands
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
=======
function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
>>>>>>> origin/master
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

<<<<<<< HEAD
function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
=======
function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
>>>>>>> origin/master
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export default function DarkGridTemplate({ portfolio }: { portfolio: Portfolio }) {
  const [activeNav, setActiveNav] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const name = portfolio.headline || 'Developer'
<<<<<<< HEAD
  const summary = portfolio.summary || 'Full-stack software architect specializing in building modern distributed applications, resilient cloud systems, and delightful digital user experiences.'

  const currentRole = portfolio.experience?.[0]
  const emailLink = (portfolio.links || []).find(l => l.url.startsWith('mailto:') || l.label.toLowerCase().includes('email'))

  // Group skills by category
  const groupedSkills = (portfolio.skills || []).reduce((acc, skill) => {
    const cat = skill.category || 'Core Technologies'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
=======
  const summary = portfolio.summary || 'Full-stack developer focused on building polished digital experiences, resilient product systems, and thoughtful interfaces customers actually enjoy using.'
  const currentRole = portfolio.experience?.[0]
  const emailLink = (portfolio.links || []).find((link) => link.url.startsWith('mailto:') || link.label.toLowerCase().includes('email'))

  const groupedSkills = (portfolio.skills || []).reduce((acc, skill) => {
    const category = skill.category || 'Core Technologies'
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
>>>>>>> origin/master
    return acc
  }, {} as Record<string, typeof portfolio.skills>)

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    ...(portfolio.projects?.length ? [{ label: 'Projects', href: '#projects', id: 'projects' }] : []),
    ...(portfolio.experience?.length ? [{ label: 'Experience', href: '#experience', id: 'experience' }] : []),
    ...(portfolio.skills?.length ? [{ label: 'Skills', href: '#skills', id: 'skills' }] : []),
    ...(portfolio.education?.length ? [{ label: 'Education', href: '#education', id: 'education' }] : []),
<<<<<<< HEAD
    { label: 'Contact', href: '#contact', id: 'contact' },
=======
    { label: 'Contact', href: '#contact', id: 'contact' }
>>>>>>> origin/master
  ]

  const handleNavClick = (id: string) => {
    setActiveNav(id)
    setMobileMenuOpen(false)
  }

<<<<<<< HEAD
  // Initials for Monogram
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'DG'

  return (
    <div className="relative min-h-screen bg-[#07080c] text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden antialiased">
      
      {/* ─── High-Tech Cyber Grid Background ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Ambient Nebula Glows */}
        <div className="absolute -top-[15%] left-[20%] w-[60vw] h-[60vw] max-w-[650px] max-h-[650px] rounded-full bg-cyan-600/15 blur-[140px]" />
        <div className="absolute top-[35%] -left-[10%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute -bottom-[10%] right-[10%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full bg-sky-600/15 blur-[150px]" />

        {/* Matrix Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00f0ff 1px, transparent 1px),
              linear-gradient(to bottom, #00f0ff 1px, transparent 1px)
            `,
            backgroundSize: '3.5rem 3.5rem',
            maskImage: 'radial-gradient(circle at 50% 35%, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 35%, black 40%, transparent 85%)'
          }}
        />

        {/* Top Scanline Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      </div>

      {/* ─── Floating Glassmorphism Navbar ─── */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#07080c]/85 backdrop-blur-xl border-b border-cyan-500/20 transition-all">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-decoration-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-950/60 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#090b10] rounded-[11px] flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                &lt;{initials}/&gt;
              </div>
            </div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {name.split(' ')[0]}<span className="text-cyan-400 font-mono">.dev</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0 text-sm font-medium">
            {navItems.map(item => (
              <li key={item.id} className="m-0 p-0">
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 relative text-xs sm:text-sm font-mono ${
                    activeNav === item.id 
                      ? 'text-cyan-400 font-bold' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeNav === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full" />
                  )}
=======
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'DG'

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050b09] text-white antialiased selection:bg-emerald-500 selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-600/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(52,211,153,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(52,211,153,0.6) 1px, transparent 1px)`,
            backgroundSize: '3.5rem 3.5rem',
            maskImage: 'radial-gradient(circle at 50% 30%, black 35%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black 35%, transparent 80%)'
          }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-emerald-500/20 bg-[#050b09]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#home" onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/40 bg-[#0a1713] text-[10px] font-bold text-emerald-300 shadow-lg shadow-emerald-950/50">
              {initials}
            </div>
            <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
              {name.split(' ')[0]}<span className="text-emerald-400">.dev</span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-xs font-medium transition-colors sm:text-sm ${activeNav === item.id ? 'text-emerald-300' : 'text-zinc-400 hover:text-white'}`}
                >
                  {item.label}
                  {activeNav === item.id && <span className="absolute -bottom-2 left-0 right-0 h-px bg-emerald-400" />}
>>>>>>> origin/master
                </a>
              </li>
            ))}
          </ul>

<<<<<<< HEAD
          {/* Header Action Button & Mobile Menu Toggle */}
=======
>>>>>>> origin/master
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
<<<<<<< HEAD
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Connect</span>
            </a>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-cyan-500/20 bg-[#07080c]/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
            <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
              {navItems.map(item => (
=======
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-[#02110d]"
            >
              <Terminal className="h-3.5 w-3.5" />
              Contact
            </a>
            <button
              type="button"
              aria-label="Toggle Navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-zinc-800 bg-[#0b1512] p-1.5 text-zinc-300 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-emerald-300" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-emerald-500/20 bg-[#050b09]/95 px-4 py-4 md:hidden">
            <ul className="space-y-2">
              {navItems.map((item) => (
>>>>>>> origin/master
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
<<<<<<< HEAD
                    className={`block px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                      activeNav === item.id
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    // {item.label}
=======
                    className={`block rounded-xl border px-3 py-2 text-sm transition ${activeNav === item.id ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200' : 'border-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-white'}`}
                  >
                    {item.label}
>>>>>>> origin/master
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

<<<<<<< HEAD
      {/* ─── Main Content Body ─── */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        {/* ─── Hero Section ─── */}
        <section id="home" className="pt-8 sm:pt-16 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              
              {/* Online Status Beacon */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-cyan-950/40">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 -ml-4" />
                <span>System Online • Ready for High-Impact Projects</span>
              </div>

              {/* Catchy Dual-Tone Title */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base font-mono text-zinc-400">
                  // Hello World, I'm <span className="text-white font-bold">{name}</span>
                </p>
                
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] break-words">
                  Engineering Resilient <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                    Digital Systems
                  </span>
                  & Experiences.
                </h1>

                <p className="text-xs sm:text-sm text-cyan-400/80 font-mono pt-1">
                  {currentRole ? `Currently ${currentRole.role} @ ${currentRole.company}` : 'Full-Stack Software Engineer & Architect'}
                </p>
              </div>

              {/* Narrative Summary */}
              <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                {summary}
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href="#projects"
                  onClick={() => handleNavClick('projects')}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all font-mono"
                >
                  <span>Explore Systems</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onClick={() => handleNavClick('contact')}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-cyan-500/50 text-zinc-200 font-medium text-xs sm:text-sm transition-all font-mono"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Get In Touch</span>
                </a>
              </div>

            </div>

            {/* Right Terminal / Developer Matrix Card */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* Radiant Glow Behind Card */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-indigo-500/20 blur-2xl -z-10 transform scale-95" />

                {/* Cyber Matrix Glass Box */}
                <div className="rounded-2xl sm:rounded-3xl bg-[#090c14]/90 border border-cyan-500/30 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4 font-mono">
                  
                  {/* Top Bar with Window Controls */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-cyan-300/70">developer@node:~$</span>
                  </div>

                  {/* Terminal Code Snippet */}
                  <div className="space-y-1.5 text-xs sm:text-[13px] text-zinc-300">
                    <div className="text-cyan-400">
                      <span className="text-zinc-500">&gt;</span> const engineer = &#123;
                    </div>
                    <div className="pl-4">
                      name: <span className="text-emerald-400">"{name}"</span>,
                    </div>
                    <div className="pl-4">
                      role: <span className="text-emerald-400">"{currentRole?.role || 'Full-Stack Engineer'}"</span>,
                    </div>
                    <div className="pl-4">
                      status: <span className="text-amber-400">"available_for_hire"</span>,
                    </div>
                    <div className="pl-4">
                      focus: [<span className="text-sky-300">"Cloud"</span>, <span className="text-sky-300">"React"</span>, <span className="text-sky-300">"Architecture"</span>],
                    </div>
                    <div className="text-cyan-400">&#125;</div>
                  </div>

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-center">
                      <div className="text-lg sm:text-xl font-bold text-cyan-300">
                        {portfolio.projects?.length || 5}+
                      </div>
                      <div className="text-[10px] text-zinc-400 font-sans">Projects Built</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-center">
                      <div className="text-lg sm:text-xl font-bold text-cyan-300">
                        {portfolio.experience?.length ? `${portfolio.experience.length * 2}+` : '3+'}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-sans">Years Experience</div>
                    </div>
                  </div>

                  {/* Terminal Status Footer */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Ready to Deploy</span>
                    </span>
                    <span className="text-cyan-400">v2.4.0</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Featured Projects Section (Bento Cyber Cards) ─── */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section id="projects" className="py-14 sm:py-20 border-t border-cyan-500/20">
            <div className="space-y-10 sm:space-y-14">
              
              {/* Section Header */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>// Portfolio Showcase</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Featured Projects
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Scalable web platforms, microservices, and creative developer tools.
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
                {portfolio.projects.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    className="group relative rounded-2xl bg-gradient-to-b from-[#0d101b] to-[#080a10] border border-cyan-500/20 hover:border-cyan-400/60 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/60 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-mono font-bold text-xs">
                            0{idx + 1}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-400">BUILD ACTIVE</span>
                        </div>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500 hover:text-black text-zinc-400 transition-colors"
                            title="Live Project Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Thumbnail or Mockup Canvas */}
                      {proj.imageUrl ? (
                        <div className="rounded-xl border border-cyan-500/30 overflow-hidden mb-4 aspect-square w-full bg-[#06080e]">
                          <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      ) : (
                        <div className="rounded-xl bg-[#06080e] border border-white/10 p-4 mb-4 aspect-[16/10] min-h-[150px] flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                            <span>node://{proj.title.toLowerCase().replace(/\s+/g, '-')}.app</span>
                            <span className="text-emerald-400">● 200 OK</span>
                          </div>
                          <div className="my-auto text-center space-y-1">
                            <Layers className="w-6 h-6 text-cyan-400 mx-auto group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-base text-white tracking-tight">{proj.title}</h4>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 text-right">
                            Prod Ready
                          </div>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                        {proj.description || 'An advanced digital solution engineered with scalable architecture, responsive UI components, and high throughput backend APIs.'}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {proj.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ─── Work Experience Section ─── */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section id="experience" className="py-14 sm:py-20 border-t border-cyan-500/20">
            <div className="space-y-10 sm:space-y-14">
              
              {/* Section Header */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>// Career Trajectory</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Work Experience
                </h2>
              </div>

              {/* Timeline Grid */}
              <div className="space-y-4 max-w-4xl mx-auto">
                {portfolio.experience.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0d101b] to-[#080a10] border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-base flex-shrink-0">
                          {exp.company ? exp.company[0].toUpperCase() : 'E'}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-cyan-400 font-mono">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-zinc-400 bg-black/50 border border-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
                        {exp.startDate || '2021'} - {exp.endDate || 'Present'}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-0 sm:pl-13">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ─── Skills & Expertise Matrix ─── */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section id="skills" className="py-14 sm:py-20 border-t border-cyan-500/20">
            <div className="space-y-10 sm:space-y-14">
              
              {/* Section Header */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>// Tech Matrix</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Skills & Capabilities
                </h2>
              </div>

              {/* Categorized Matrix Cards */}
              <div className="space-y-5 max-w-4xl mx-auto">
                {Object.entries(groupedSkills).map(([category, skills]) => (
                  <div
                    key={category}
                    className="p-5 sm:p-6 rounded-2xl bg-[#090c14]/90 border border-cyan-500/20 backdrop-blur-md space-y-3"
                  >
                    <h3 className="text-xs sm:text-sm font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <div
                          key={skill.id}
                          className="px-3.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-zinc-200 text-xs font-mono hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-default flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-cyan-400" />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

=======
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section id="home" className="pb-16 pt-8 sm:pb-24 sm:pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Available for work</span>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-400 sm:text-base">
                  Hello, I’m <span className="font-semibold text-white">{name}</span>
                </p>
                <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                  Building <span className="text-emerald-400">clean, fast</span>
                  <br />
                  digital products.
                </h1>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80 sm:text-sm">
                  {currentRole ? `${currentRole.role} • ${currentRole.company}` : 'Product Engineer • UI Systems'}
                </p>
              </div>

              <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-300 lg:mx-0 lg:text-base">
                {summary}
              </p>

              <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row lg:justify-start">
                <a
                  href="#projects"
                  onClick={() => handleNavClick('projects')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-[#062019] shadow-lg shadow-emerald-900/40 transition hover:translate-y-[-1px] hover:bg-emerald-300 sm:w-auto"
                >
                  <span>View work</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  onClick={() => handleNavClick('contact')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 bg-[#0b1512] px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-emerald-400 hover:text-emerald-200 sm:w-auto"
                >
                  <Mail className="h-4 w-4 text-emerald-300" />
                  <span>Get in touch</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 -z-10 rounded-[2rem] bg-emerald-500/10 blur-2xl" />
                <div className="rounded-[28px] border border-emerald-500/25 bg-[#0a1713]/95 p-5 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl sm:p-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">portfolio</span>
                  </div>

                  <div className="mt-5 space-y-2 font-mono text-xs text-zinc-300 sm:text-sm">
                    <div className="text-emerald-300">const profile = {'{'}</div>
                    <div className="pl-4">name: <span className="text-emerald-200">"{name}"</span>,</div>
                    <div className="pl-4">role: <span className="text-emerald-200">"{currentRole?.role || 'Senior Product Engineer'}"</span>,</div>
                    <div className="pl-4">status: <span className="text-amber-300">"open to opportunities"</span>,</div>
                    <div className="pl-4">stack: [<span className="text-lime-300">"React"</span>, <span className="text-lime-300">"TypeScript"</span>, <span className="text-lime-300">"UX"</span>],</div>
                    <div className="text-emerald-300">{'}'}</div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/25 p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-300">{portfolio.projects?.length || 5}+</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">Projects</div>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/25 p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-300">{portfolio.experience?.length ? portfolio.experience.length * 2 : 6}+</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {portfolio.projects && portfolio.projects.length > 0 && (
          <section id="projects" className="border-t border-emerald-500/20 py-14 sm:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                <Code2 className="h-3.5 w-3.5" />
                Featured work
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Selected Projects</h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {portfolio.projects.map((project, index) => (
                <article
                  key={project.id || index}
                  className="group rounded-[26px] border border-emerald-500/20 bg-[#091512]/85 p-4 shadow-lg shadow-black/20 transition hover:border-emerald-400/50 hover:shadow-emerald-950/30 sm:p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/50 text-[10px] font-bold text-emerald-200">0{index + 1}</span>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="rounded-lg border border-zinc-800 bg-[#0b1512] p-2 text-zinc-300 transition hover:border-emerald-400 hover:text-emerald-200">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {project.imageUrl ? (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#040907]">
                      <img src={project.imageUrl} alt={project.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                  ) : (
                    <div className="mb-4 flex aspect-[16/10] flex-col justify-between rounded-2xl border border-emerald-500/20 bg-[#040907] p-4">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                        <span>{project.title.toLowerCase().replace(/\s+/g, '-')}.app</span>
                        <span className="text-emerald-300">live</span>
                      </div>
                      <div className="mx-auto text-center">
                        <Layers className="mx-auto mb-2 h-7 w-7 text-emerald-300" />
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      </div>
                      <div className="text-right text-[10px] uppercase tracking-[0.18em] text-zinc-500">prod ready</div>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.description || 'A polished digital experience designed around clarity, business impact, and a smooth user journey.'}</p>

                  {project.techStack?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="rounded-full border border-emerald-500/20 bg-emerald-950/25 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
>>>>>>> origin/master
            </div>
          </section>
        )}

<<<<<<< HEAD
        {/* ─── Education & Achievements Section ─── */}
        {((portfolio.education && portfolio.education.length > 0) || (portfolio.achievements && portfolio.achievements.length > 0)) && (
          <section id="education" className="py-14 sm:py-20 border-t border-cyan-500/20">
            <div className="space-y-10 sm:space-y-14">
              
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>// Credentials</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Education & Honors
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {portfolio.education?.map((edu, idx) => (
                  <div
                    key={edu.id || idx}
                    className="p-5 rounded-2xl bg-[#090c14]/90 border border-white/10 hover:border-cyan-400/50 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">{edu.degree}</h4>
                      <p className="text-xs text-cyan-400 font-mono">{edu.institution}</p>
                    </div>
                  </div>
                ))}

                {portfolio.achievements?.map((ach, idx) => (
                  <div
                    key={ach.id || idx}
                    className="p-5 rounded-2xl bg-[#090c14]/90 border border-white/10 hover:border-cyan-400/50 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                        <Award className="w-4 h-4" />
                      </div>
                      {ach.date && <span className="text-[10px] font-mono text-zinc-400">{ach.date}</span>}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">{ach.title}</h4>
                      {ach.description && <p className="text-xs text-zinc-400">{ach.description}</p>}
                    </div>
                  </div>
                ))}
              </div>

=======
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section id="experience" className="border-t border-emerald-500/20 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                <Briefcase className="h-3.5 w-3.5" />
                Experience
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Career highlights</h2>
            </div>

            <div className="mx-auto mt-10 max-w-4xl space-y-4">
              {portfolio.experience.map((item, index) => (
                <div key={item.id || index} className="rounded-[24px] border border-emerald-500/20 bg-[#091512]/90 p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-sm font-bold text-emerald-200">
                        {item.company?.[0]?.toUpperCase() || 'E'}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.role}</h3>
                        <p className="text-sm text-emerald-300">{item.company}</p>
                      </div>
                    </div>
                    <span className="inline-flex rounded-full border border-zinc-800 bg-[#0b1512] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                      {item.startDate || '2021'} — {item.endDate || 'Present'}
                    </span>
                  </div>
                  {item.description && <p className="mt-4 text-sm leading-relaxed text-zinc-300">{item.description}</p>}
                </div>
              ))}
>>>>>>> origin/master
            </div>
          </section>
        )}

<<<<<<< HEAD
        {/* ─── Contact & Social Footer ─── */}
        <footer id="contact" className="py-16 sm:py-24 border-t border-cyan-500/20 text-center space-y-10">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// Initialize Collaboration</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Let's Build Something Exceptional
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Available for full-time engineering roles, technical advisory, and high-impact software projects.
            </p>

            <div className="pt-2">
              <a
                href={emailLink ? emailLink.url : `mailto:hello@example.com?subject=Hello%20${encodeURIComponent(name)}`}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-mono font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Direct Message</span>
=======
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section id="skills" className="border-t border-emerald-500/20 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                <Terminal className="h-3.5 w-3.5" />
                Toolset
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Skills & capabilities</h2>
            </div>

            <div className="mx-auto mt-10 max-w-4xl space-y-5">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category} className="rounded-[24px] border border-emerald-500/20 bg-[#091512]/90 p-5 sm:p-6">
                  <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill.id} className="rounded-full border border-emerald-500/20 bg-emerald-950/25 px-3 py-1.5 text-xs text-zinc-200">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {((portfolio.education && portfolio.education.length > 0) || (portfolio.achievements && portfolio.achievements.length > 0)) && (
          <section id="education" className="border-t border-emerald-500/20 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                <GraduationCap className="h-3.5 w-3.5" />
                Education
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Credentials & honors</h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
              {portfolio.education?.map((item, index) => (
                <div key={item.id || index} className="rounded-[22px] border border-emerald-500/20 bg-[#091512]/90 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-950/40 text-emerald-200">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{item.startDate} — {item.endDate}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{item.degree}</h3>
                  <p className="mt-1 text-sm text-emerald-300">{item.institution}</p>
                </div>
              ))}

              {portfolio.achievements?.map((item, index) => (
                <div key={item.id || index} className="rounded-[22px] border border-emerald-500/20 bg-[#091512]/90 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-950/40 text-emerald-200">
                      <Award className="h-4 w-4" />
                    </div>
                    {item.date && <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{item.date}</span>}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                  {item.description && <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <footer id="contact" className="border-t border-emerald-500/20 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              Let’s connect
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Let’s build something memorable.</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">Open to product, engineering, and design collaborations that value craft, clarity, and measurable outcomes.</p>
            <div className="mt-8 flex justify-center">
              <a
                href={emailLink ? emailLink.url : `mailto:hello@example.com?subject=Hello%20${encodeURIComponent(name)}`}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-[#041b14] transition hover:bg-emerald-300"
              >
                <Send className="h-4 w-4" />
                Contact me
>>>>>>> origin/master
              </a>
            </div>
          </div>

<<<<<<< HEAD
          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            {portfolio.links && portfolio.links.length > 0 ? (
              portfolio.links.map(link => (
=======
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {portfolio.links && portfolio.links.length > 0 ? (
              portfolio.links.map((link) => (
>>>>>>> origin/master
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
<<<<<<< HEAD
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-cyan-950/50 hover:bg-cyan-500 border border-cyan-500/30 hover:border-cyan-400 text-zinc-300 hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.url.includes('github') ? (
                    <GithubIcon className="w-4 h-4" />
                  ) : link.url.includes('linkedin') ? (
                    <LinkedinIcon className="w-4 h-4" />
                  ) : link.url.startsWith('mailto:') ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
=======
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-[#091512] text-zinc-300 transition hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#041b14]"
                >
                  {link.url.includes('github') ? <GithubIcon className="h-4 w-4" /> : link.url.includes('linkedin') ? <LinkedinIcon className="h-4 w-4" /> : link.url.startsWith('mailto:') ? <Mail className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
>>>>>>> origin/master
                </a>
              ))
            ) : (
              <>
<<<<<<< HEAD
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-cyan-950/50 hover:bg-cyan-500 border border-cyan-500/30 hover:border-cyan-400 text-zinc-300 hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-cyan-950/50 hover:bg-cyan-500 border border-cyan-500/30 hover:border-cyan-400 text-zinc-300 hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
=======
                <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-[#091512] text-zinc-300 transition hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#041b14]">
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-[#091512] text-zinc-300 transition hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#041b14]">
                  <LinkedinIcon className="h-4 w-4" />
>>>>>>> origin/master
                </a>
              </>
            )}
          </div>

<<<<<<< HEAD
          {/* Copyright Signature */}
          <div className="pt-8 border-t border-cyan-500/20 text-[11px] font-mono text-zinc-500">
            © {new Date().getFullYear()} {name}. Developed with Dark Grid Architecture.
          </div>

        </footer>

=======
          <div className="mt-10 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            © {new Date().getFullYear()} {name}
          </div>
        </footer>
>>>>>>> origin/master
      </main>
    </div>
  )
}
