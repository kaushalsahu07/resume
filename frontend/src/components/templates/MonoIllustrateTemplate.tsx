import { useState } from 'react'
import type { Portfolio } from '../../types/portfolio'
import {
  GraduationCap,
  Award,
  ExternalLink,
  Mail,
  Globe,
  Code2,
  Menu,
  X,
  Terminal,
  Send
} from 'lucide-react'

// Custom SVG Icons for Brands & Socials
function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function TwitterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Minimalist Monochrome Character Vector Illustrations matching reference style
function DeveloperLaptopIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Floor Ellipse Shadow */}
      <ellipse cx="250" cy="390" rx="200" ry="14" fill="#E4E4E7" />
      <ellipse cx="250" cy="388" rx="140" ry="8" fill="#18181B" opacity="0.1" />

      {/* Legs sitting cross-legged (crisp line art) */}
      <path
        d="M130 365 C130 320, 190 300, 250 315 C310 300, 370 320, 370 365 C370 380, 130 380, 130 365 Z"
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Pants fold details */}
      <path d="M210 345 Q250 370 290 345" stroke="#09090B" strokeWidth="3" strokeLinecap="round" />
      <path d="M170 355 Q200 375 230 375" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M270 375 Q300 375 330 355" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Body / Dark Jacket with Texture Lines */}
      <path
        d="M185 240 C175 190, 205 160, 250 160 C295 160, 325 190, 315 240 L335 320 C335 335, 165 335, 165 320 Z"
        fill="#18181B"
        stroke="#09090B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Jacket contour white hatching */}
      <path d="M205 190 L195 290" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
      <path d="M225 180 L220 295" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
      <path d="M275 180 L280 295" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
      <path d="M295 190 L305 290" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />

      {/* Arms holding laptop */}
      <path
        d="M180 215 C160 260, 185 300, 220 300"
        stroke="#09090B"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M320 215 C340 260, 315 300, 280 300"
        stroke="#09090B"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Laptop Base & Open Lid */}
      <path
        d="M210 295 L290 295 L280 305 L220 305 Z"
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M225 245 L275 245 L285 295 L215 295 Z"
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Laptop Screen Graphic */}
      <path d="M232 255 L268 255 L276 288 L224 288 Z" fill="#18181B" />
      <circle cx="250" cy="271" r="5" fill="#FFFFFF" />

      {/* Hands on Keyboard */}
      <ellipse cx="225" cy="298" rx="8" ry="5" fill="#FFFFFF" stroke="#09090B" strokeWidth="2.5" />
      <ellipse cx="275" cy="298" rx="8" ry="5" fill="#FFFFFF" stroke="#09090B" strokeWidth="2.5" />

      {/* Neck */}
      <path d="M240 145 L240 165 L260 165 L260 145 Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="3" />

      {/* Head / Face */}
      <path
        d="M235 105 C235 90, 265 90, 265 105 C265 130, 258 145, 250 148 C242 145, 235 130, 235 105 Z"
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Hair (Distinctive Black Minimal Haircut) */}
      <path
        d="M233 105 C230 80, 260 65, 275 80 C280 95, 275 110, 268 115 C265 100, 250 95, 233 105 Z"
        fill="#09090B"
        stroke="#09090B"
        strokeWidth="2"
      />

      {/* Facial Features (Eyes, Eyebrows, Smile) */}
      <circle cx="244" cy="115" r="2.5" fill="#09090B" />
      <circle cx="258" cy="115" r="2.5" fill="#09090B" />
      <path d="M242 108 Q246 106 248 108" stroke="#09090B" strokeWidth="2" strokeLinecap="round" />
      <path d="M254 108 Q257 106 260 108" stroke="#09090B" strokeWidth="2" strokeLinecap="round" />
      <path d="M248 126 Q251 130 254 126" stroke="#09090B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M251 116 L249 121" stroke="#09090B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function AboutMePortraitIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circular frame outline */}
      <circle cx="200" cy="200" r="180" fill="#F4F4F5" stroke="#09090B" strokeWidth="3.5" />
      
      {/* Torso & Folded Arms (High Contrast Black Jacket) */}
      <path
        d="M100 380 C100 290, 140 240, 200 240 C260 240, 300 290, 300 380 Z"
        fill="#18181B"
        stroke="#09090B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Arms crossed pose */}
      <path
        d="M130 280 C150 330, 250 330, 270 280"
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M160 300 L240 300" stroke="#09090B" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="200" cy="305" rx="20" ry="10" fill="#18181B" />

      {/* Neck */}
      <path d="M185 200 L185 245 L215 245 L215 200 Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.5" />

      {/* Face */}
      <path
        d="M175 140 C175 115, 225 115, 225 140 C225 180, 215 205, 200 210 C185 205, 175 180, 175 140 Z"
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Hair (Sleek side-part black) */}
      <path
        d="M170 140 C165 95, 215 75, 235 95 C245 115, 240 145, 230 150 C225 130, 200 120, 170 140 Z"
        fill="#09090B"
        stroke="#09090B"
        strokeWidth="2"
      />

      {/* Eyebrows, Eyes, Smile */}
      <circle cx="188" cy="155" r="3.5" fill="#09090B" />
      <circle cx="212" cy="155" r="3.5" fill="#09090B" />
      <path d="M184 146 Q190 143 194 146" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M206 146 Q211 143 216 146" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M194 175 Q200 182 206 175" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function MonoIllustrateTemplate({ portfolio }: { portfolio: Portfolio }) {
  const [activeNav, setActiveNav] = useState('about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const name = portfolio.headline || 'Evren Shah'
  const summary = portfolio.summary || 'I am a passionate software engineer specializing in building modern web applications, scalable user interfaces, and delightful digital experiences.'

  // Extract roles and current company
  const currentRole = portfolio.experience?.[0]
  const roleTitle = currentRole?.role || 'Frontend Developer'
  const locationText = 'Based In India.'

  const emailLink = (portfolio.links || []).find(l => l.url.startsWith('mailto:') || l.label.toLowerCase().includes('email'))

  const navItems = [
    { label: 'About Me', href: '#about', id: 'about' },
    ...(portfolio.skills?.length ? [{ label: 'Skills', href: '#skills', id: 'skills' }] : []),
    ...(portfolio.experience?.length ? [{ label: 'Experience', href: '#experience', id: 'experience' }] : []),
    ...(portfolio.projects?.length ? [{ label: 'Projects', href: '#projects', id: 'projects' }] : []),
    { label: 'Contact Me', href: '#contact', id: 'contact' },
  ]

  const handleNavClick = (id: string) => {
    setActiveNav(id)
    setMobileMenuOpen(false)
  }

  // Pre-seed iconic skills grid if portfolio.skills has few
  const defaultSkills = [
    { name: 'Git', isDark: false },
    { name: 'JavaScript', isDark: true, badge: 'JS' },
    { name: 'Sass/Scss', isDark: false },
    { name: 'Nest.js', isDark: false },
    { name: 'Storybook', isDark: false, badge: 'S' },
    { name: 'Next.js', isDark: false },
    { name: 'TypeScript', isDark: true, badge: 'TS' },
    { name: 'React', isDark: false },
    { name: 'Socket.io', isDark: false },
    { name: 'Tailwind CSS', isDark: false }
  ]

  const displaySkills = portfolio.skills?.length
    ? portfolio.skills.map((s, idx) => ({
        name: s.name,
        isDark: idx % 4 === 1 || idx % 4 === 2,
        badge: s.name.length <= 3 ? s.name : s.name.substring(0, 2).toUpperCase()
      }))
    : defaultSkills

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white antialiased">
      
      {/* ─── Sticky Monochrome Navigation ─── */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-zinc-900 transition-all">
        <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Monogram */}
          <a
            href="#about"
            onClick={() => handleNavClick('about')}
            className="flex items-center gap-2 group text-decoration-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center font-extrabold text-base sm:text-lg group-hover:scale-105 transition-transform">
              P
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-black">
              Personal<span className="text-zinc-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 text-sm font-bold tracking-wide">
            {navItems.map(item => (
              <li key={item.id} className="m-0 p-0">
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 relative ${
                    activeNav === item.id 
                      ? 'text-black border-b-2 border-black font-extrabold' 
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Header Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-100 border border-zinc-300 text-zinc-900 hover:bg-zinc-200 transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b-2 border-zinc-900 bg-white px-4 py-6 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-xl">
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              {navItems.map(item => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      activeNav === item.id
                        ? 'bg-black text-white'
                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* ─── Hero Section ─── */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Catchy Dual-weight Title */}
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-zinc-800 tracking-tight">
                Hello I'am <span className="font-extrabold text-black">{name}.</span>
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.1] break-words">
                <span>{roleTitle.split(' ')[0] || 'Frontend'}</span>{' '}
                <span 
                  className="font-extrabold"
                  style={{
                    WebkitTextStroke: '2px #000000',
                    color: 'transparent'
                  }}
                >
                  {roleTitle.split(' ').slice(1).join(' ') || 'Developer'}
                </span>
                <br />
                <span>{locationText}</span>
              </h1>
            </div>

            {/* Narrative Summary */}
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
              {summary}
            </p>

            {/* High Contrast Social Square Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {portfolio.links && portfolio.links.length > 0 ? (
                portfolio.links.map(link => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                    aria-label={link.label}
                    title={link.label}
                  >
                    {link.url.includes('github') ? (
                      <GithubIcon className="w-5 h-5" />
                    ) : link.url.includes('linkedin') ? (
                      <LinkedinIcon className="w-5 h-5" />
                    ) : link.url.includes('twitter') || link.url.includes('x.com') ? (
                      <TwitterIcon className="w-5 h-5" />
                    ) : link.url.startsWith('mailto:') ? (
                      <Mail className="w-5 h-5" />
                    ) : (
                      <Globe className="w-5 h-5" />
                    )}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                    aria-label="Twitter / X"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={emailLink ? emailLink.url : `mailto:hello@example.com`}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>

          </div>

          {/* Right Vector Illustration Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-sm sm:max-w-md">
              <DeveloperLaptopIllustration className="w-full h-auto drop-shadow-sm" />
            </div>
          </div>

        </div>
      </section>

      {/* ─── My Skills Section ─── */}
      <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 border-t-2 border-zinc-900">
        <div className="space-y-10 sm:space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
              My Skills
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium">
              Languages, frameworks & developer tools I use daily.
            </p>
          </div>

          {/* 5x2 / 4x2 Responsive Square Skill Tile Grid */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3.5 sm:gap-5 max-w-4xl mx-auto">
            {displaySkills.map((skill, idx) => {
              const isDark = skill.isDark
              return (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    isDark 
                      ? 'bg-black text-white border-2 border-black' 
                      : 'bg-white text-black border-2 border-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  <div className="mb-2">
                    {skill.badge ? (
                      <span className={`text-xl sm:text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
                        {skill.badge}
                      </span>
                    ) : (
                      <Terminal className={`w-6 h-6 sm:w-8 sm:h-8 ${isDark ? 'text-white' : 'text-black'}`} />
                    )}
                  </div>
                  <span className="font-bold text-xs sm:text-sm tracking-tight truncate max-w-full">
                    {skill.name}
                  </span>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ─── My Experience Section (Deep Black Theme) ─── */}
      {portfolio.experience && portfolio.experience.length > 0 && (
        <section id="experience" className="bg-black text-white py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-14">
            
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                My Experience
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                Professional engineering positions and technical leadership.
              </p>
            </div>

            {/* Stack of Dark Experience Cards */}
            <div className="space-y-4 sm:space-y-6">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-7 hover:border-zinc-500 transition-all duration-200 space-y-3.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-black font-black text-base flex items-center justify-center flex-shrink-0">
                        {exp.company ? exp.company[0].toUpperCase() : 'G'}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
                          {exp.role} <span className="text-zinc-400 font-normal">at</span> <span className="font-bold text-white">{exp.company}</span>
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-zinc-400 self-start sm:self-auto bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                      {exp.startDate || '2021'} - {exp.endDate || 'Present'}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1 pl-0 sm:pl-13">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ─── About Me Section ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 border-t-2 border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-center">
          
          {/* Left Character Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm">
              <AboutMePortraitIllustration className="w-full h-auto drop-shadow-md" />
            </div>
          </div>

          {/* Right Narrative & Education */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
                About Me
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium uppercase tracking-wider">
                Crafting robust software with passion & precision
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              {summary}
            </p>

            {/* Academic & Achievements Minimal List */}
            {portfolio.education && portfolio.education.length > 0 && (
              <div className="pt-2 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-black" />
                  <span>Education & Academic Background</span>
                </h4>
                <div className="space-y-2">
                  {portfolio.education.map((edu, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border-2 border-zinc-900 bg-zinc-50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-black">{edu.degree}</p>
                        <p className="text-xs text-zinc-600 font-medium">{edu.institution} {edu.field ? `• ${edu.field}` : ''}</p>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">{edu.startDate} - {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Mini Badges */}
            {portfolio.achievements && portfolio.achievements.length > 0 && (
              <div className="pt-2 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-black" />
                  <span>Key Honors & Milestones</span>
                </h4>
                <div className="space-y-2">
                  {portfolio.achievements.map((ach, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-zinc-300 bg-white flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs text-black">{ach.title}</p>
                        {ach.description && <p className="text-[11px] text-zinc-600">{ach.description}</p>}
                      </div>
                      {ach.date && <span className="text-[11px] font-mono text-zinc-400">{ach.date}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ─── My Projects Section ─── */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section id="projects" className="bg-zinc-950 text-white py-16 sm:py-24 border-t-2 border-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
            
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                My Projects
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                Selected featured works and interactive applications.
              </p>
            </div>

            {/* Showcase Stack */}
            <div className="space-y-10 sm:space-y-14">
              {portfolio.projects.map((proj, idx) => {
                const isEven = idx % 2 === 0
                const numString = String(idx + 1).padStart(2, '0')
                return (
                  <div
                    key={proj.id || idx}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 transition-all duration-300"
                  >
                    {/* Project Preview Mockup */}
                    <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''}`}>
                      <div className="rounded-2xl bg-black border-2 border-zinc-800 p-3 shadow-xl">
                        <div className="rounded-xl bg-zinc-900 aspect-[16/10] min-h-[170px] sm:min-h-[220px] p-4 flex flex-col justify-between border border-zinc-800">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500">project.{numString}.app</span>
                          </div>

                          <div className="text-center space-y-2 my-auto">
                            <Code2 className="w-8 h-8 text-white mx-auto" />
                            <h4 className="font-extrabold text-base sm:text-lg text-white">{proj.title}</h4>
                          </div>

                          <div className="text-[10px] text-zinc-500 font-mono text-right">
                            Interactive Build
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className={`lg:col-span-6 space-y-4 ${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="text-3xl sm:text-4xl font-black text-zinc-600">
                        {numString}
                      </div>

                      <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                        {proj.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {proj.description || 'A complete software solution engineered to tackle complex challenges with optimal performance, responsive UI, and clean design.'}
                      </p>

                      {/* Tech Stack Pills */}
                      {proj.techStack && proj.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {proj.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-full text-xs font-bold bg-black border border-zinc-700 text-zinc-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Project Link */}
                      <div className="pt-2">
                        {proj.link ? (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-sm"
                          >
                            <span>Visit Live Application</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs text-zinc-500 font-medium">Production Application</span>
                        )}
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>

          </div>
        </section>
      )}

      {/* ─── Contact & Footer Section ─── */}
      <footer id="contact" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center space-y-10 sm:space-y-12">
        
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
            Let's Talk For Something Special
          </h2>
          <p className="text-xs sm:text-base text-zinc-600 leading-relaxed">
            I seek to push the limits of creativity to solve high-impact user experience and engineering problems.
          </p>

          <div className="pt-3">
            <a
              href={emailLink ? emailLink.url : `mailto:hello@example.com?subject=Hello%20${encodeURIComponent(name)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Say Hello Directly</span>
            </a>
          </div>
        </div>

        {/* Social Square Icons in Footer */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          {portfolio.links && portfolio.links.length > 0 ? (
            portfolio.links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                aria-label={link.label}
                title={link.label}
              >
                {link.url.includes('github') ? (
                  <GithubIcon className="w-5 h-5" />
                ) : link.url.includes('linkedin') ? (
                  <LinkedinIcon className="w-5 h-5" />
                ) : link.url.includes('twitter') || link.url.includes('x.com') ? (
                  <TwitterIcon className="w-5 h-5" />
                ) : link.url.startsWith('mailto:') ? (
                  <Mail className="w-5 h-5" />
                ) : (
                  <Globe className="w-5 h-5" />
                )}
              </a>
            ))
          ) : (
            <>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </>
          )}
        </div>

        {/* Copyright Signature */}
        <div className="pt-8 border-t border-zinc-200 text-xs sm:text-sm text-zinc-500 font-medium">
          © {new Date().getFullYear()} {name}. Built with Precision & Illustration Design.
        </div>

      </footer>

    </div>
  )
}
