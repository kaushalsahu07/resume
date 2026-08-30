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

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
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
  const summary = portfolio.summary || 'Full-stack developer focused on building polished digital experiences, resilient product systems, and thoughtful interfaces customers actually enjoy using.'
  const currentRole = portfolio.experience?.[0]
  const emailLink = (portfolio.links || []).find((link) => link.url.startsWith('mailto:') || link.label.toLowerCase().includes('email'))

  const groupedSkills = (portfolio.skills || []).reduce((acc, skill) => {
    const category = skill.category || 'Core Technologies'
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {} as Record<string, typeof portfolio.skills>)

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    ...(portfolio.projects?.length ? [{ label: 'Projects', href: '#projects', id: 'projects' }] : []),
    ...(portfolio.experience?.length ? [{ label: 'Experience', href: '#experience', id: 'experience' }] : []),
    ...(portfolio.skills?.length ? [{ label: 'Skills', href: '#skills', id: 'skills' }] : []),
    ...(portfolio.education?.length ? [{ label: 'Education', href: '#education', id: 'education' }] : []),
    { label: 'Contact', href: '#contact', id: 'contact' }
  ]

  const handleNavClick = (id: string) => {
    setActiveNav(id)
    setMobileMenuOpen(false)
  }

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
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
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
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    className={`block rounded-xl border px-3 py-2 text-sm transition ${activeNav === item.id ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200' : 'border-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-white'}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

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
            </div>
          </section>
        )}

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
            </div>
          </section>
        )}

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
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {portfolio.links && portfolio.links.length > 0 ? (
              portfolio.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-[#091512] text-zinc-300 transition hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#041b14]"
                >
                  {link.url.includes('github') ? <GithubIcon className="h-4 w-4" /> : link.url.includes('linkedin') ? <LinkedinIcon className="h-4 w-4" /> : link.url.startsWith('mailto:') ? <Mail className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                </a>
              ))
            ) : (
              <>
                <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-[#091512] text-zinc-300 transition hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#041b14]">
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-[#091512] text-zinc-300 transition hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#041b14]">
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </>
            )}
          </div>

          <div className="mt-10 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            © {new Date().getFullYear()} {name}
          </div>
        </footer>
      </main>
    </div>
  )
}
