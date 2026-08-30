import { ArrowRight, Download, Mail, Sparkles, Star } from 'lucide-react'
import type { Portfolio } from '../../types/portfolio'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'DV'
}

export default function DevfolioTemplate({ portfolio }: { portfolio: Portfolio }) {
  const name = portfolio.headline || 'Your Name'
  const summary = portfolio.summary || 'A passionate developer crafting elegant, user-friendly digital experiences with modern web technologies.'
  const currentRole = portfolio.experience?.[0]

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    ...(portfolio.skills?.length ? [{ label: 'Skills', href: '#skills' }] : []),
    ...(portfolio.projects?.length ? [{ label: 'Projects', href: '#projects' }] : []),
    ...(portfolio.experience?.length ? [{ label: 'Experience', href: '#experience' }] : []),
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = (portfolio.links ?? []).filter(link => link.url)
  const emailLink = socialLinks.find(link => {
    const label = link.label.toLowerCase()
    return label.includes('email') || link.url.toLowerCase().startsWith('mailto:')
  })

  const heroProjects = ((portfolio.projects ?? []) as Array<Portfolio['projects'][number] & { imageUrl?: string }>).slice(0, 3)
  const topSkills = (portfolio.skills ?? []).slice(0, 8)

  return (
    <div className="min-h-screen w-full bg-[#eadff7] px-3 py-5 text-slate-900 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1200px] rounded-[30px] border border-[#e4d8f6] bg-[#f7f3fb] shadow-[0_20px_60px_rgba(108,92,167,0.12)]">
        <header className="px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
          <nav className="flex items-center justify-between gap-4 rounded-[20px] bg-[#f2eef8] px-4 py-3 sm:px-5 lg:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7e6af8] to-[#d5c5ff] text-sm font-bold text-white shadow-[0_12px_24px_rgba(124,108,244,0.25)]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900">{getInitials(name)}</div>
            </div>

            <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
              {navItems.map(item => (
                <a key={item.href} href={item.href} className="transition-colors hover:text-violet-600">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="hidden rounded-xl border border-violet-200 bg-white/60 p-2 text-slate-600 shadow-sm transition hover:border-violet-300 hover:text-violet-700 sm:inline-flex"
                aria-label="Theme toggle"
              >
                <Star className="h-4 w-4" />
              </button>
              <a
                href={emailLink ? emailLink.url : '#contact'}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#7a66f5] to-[#8a78f5] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(122,102,245,0.26)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_28px_rgba(122,102,245,0.32)]"
              >
                {emailLink ? 'Let\'s Connect' : 'Contact'}
              </a>
            </div>
          </nav>
        </header>

        <main className="px-4 pb-8 pt-4 sm:px-6 sm:pb-10 lg:px-10 lg:pb-12">
          <section id="home" className="grid items-center gap-10 rounded-[26px] px-3 py-4 sm:px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-4 lg:py-8">
            <div className="max-w-[620px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-violet-700 shadow-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
                Hi, I\'m a Developer
              </div>

              <h1 className="text-5xl font-extrabold leading-[0.9] tracking-[-0.06em] text-slate-900 sm:text-6xl lg:text-[6rem]">
                I build modern
                <span className="mt-2 block bg-gradient-to-r from-[#6a5af9] to-[#8d7df6] bg-clip-text text-transparent">
                  web experiences
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                {summary}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7363f5] to-[#8b73f5] px-6 py-3 text-base font-semibold text-white shadow-[0_16px_26px_rgba(118,99,245,0.26)] transition hover:translate-y-[-1px]"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={socialLinks[0]?.url || '#contact'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/50 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[320px] items-center justify-center">
              <div className="relative h-[260px] w-[310px] sm:h-[320px] sm:w-[360px]">
                <div className="absolute left-5 top-10 h-16 w-16 rounded-full bg-[#d7d0fb] opacity-80 blur-[2px]" />
                <div className="absolute right-8 top-14 h-12 w-12 rounded-full bg-[#e7dafd] opacity-80" />
                <div className="absolute bottom-0 right-10 h-20 w-20 rounded-full bg-[#d8d0ff] opacity-70 blur-[2px]" />

                <div className="absolute left-10 top-1/2 h-40 w-52 -translate-y-1/2 rotate-12 rounded-[28px] border border-white/40 bg-gradient-to-br from-[#f4f0ff] to-[#dfe3ff] shadow-[0_25px_40px_rgba(143,128,222,0.22)] backdrop-blur-sm" />
                <div className="absolute left-20 top-1/2 h-40 w-52 -translate-y-1/2 rotate-12 rounded-[28px] border border-violet-100 bg-white/30 shadow-inner" />
                <div className="absolute left-12 top-[52%] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-xl bg-[#f8f6ff] text-2xl font-bold text-violet-500 rotate-12 shadow-md">
                  {'</>'}
                </div>

                <div className="absolute right-0 top-14 h-28 w-36 rotate-12 rounded-[28px] border border-white/50 bg-gradient-to-br from-[#f8f5ff] to-[#efeafc] shadow-[0_18px_30px_rgba(146,136,202,0.18)]" />
                <div className="absolute right-10 top-20 h-20 w-24 rotate-12 rounded-[24px] bg-white/70 shadow-sm" />
              </div>
            </div>
          </section>

          <section id="projects" className="mt-8 px-3 pb-2 sm:px-4 lg:px-4">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured Projects</h2>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {(heroProjects.length ? heroProjects : [
                { id: 'p1', title: 'TaskFlow', description: 'A productivity web app for managing tasks and projects.', techStack: ['React', 'TypeScript', 'Firebase'], link: '#', imageUrl: '' },
                { id: 'p2', title: 'Momentum', description: 'A modern landing page for a startup platform.', techStack: ['Next.js', 'Framer Motion', 'Tailwind'], link: '#', imageUrl: '' },
                { id: 'p3', title: 'FitTrack', description: 'A fitness tracking mobile app with analytics dashboards.', techStack: ['React Native', 'Expo', 'Charts'], link: '#', imageUrl: '' },
              ] as Array<Portfolio['projects'][number] & { imageUrl?: string }>).map((project, index) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-[28px] border border-violet-100 bg-[#f3effa] p-4 shadow-[0_12px_28px_rgba(144,122,192,0.08)]"
                >
                  <div className="mb-4 rounded-[22px] border border-[#e8defb] bg-gradient-to-br from-[#f8f5ff] via-[#ece7ff] to-[#ebf5ff] p-3">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="h-44 w-full rounded-[16px] object-cover" />
                    ) : (
                      <div className="flex h-44 items-end rounded-[16px] bg-gradient-to-br from-[#f5f1ff] to-[#dfe7ff] p-3 shadow-inner">
                        <div className="w-full rounded-[12px] border border-white/70 bg-white/70 p-3 shadow-sm">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-600">
                              {index === 0 ? 'Web App' : index === 1 ? 'Landing Page' : 'Mobile App'}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500">{index === 0 ? 'Dashboard' : index === 1 ? 'Marketing' : 'Analytics'}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2.5 w-2/3 rounded-full bg-violet-200" />
                            <div className="h-2.5 w-5/6 rounded-full bg-slate-200" />
                            <div className="h-2.5 w-1/2 rounded-full bg-slate-200" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[1.15rem] font-bold text-slate-900">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {(project.techStack?.length ? project.techStack : ['React', 'TypeScript']).slice(0, 3).map(tech => (
                        <span key={tech} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="about" className="mt-12 grid gap-6 rounded-[30px] border border-violet-100 bg-white/40 p-5 sm:p-6 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">About</p>
              <h3 className="text-3xl font-bold text-slate-900">{name}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                {summary}
              </p>
              {currentRole && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 ring-1 ring-violet-100">
                  <span className="h-2 w-2 rounded-full bg-violet-500" />
                  {currentRole.role} at {currentRole.company}
                </div>
              )}
            </div>

            <div id="skills" className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Skills</p>
              <div className="flex flex-wrap gap-2">
                {topSkills.length ? topSkills.map(skill => (
                  <span key={skill.id} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
                    {skill.name}
                  </span>
                )) : ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'UX Design', 'API Architecture'].map(skill => (
                  <span key={skill} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id="experience" className="mt-12 rounded-[30px] border border-violet-100 bg-[#f9f6ff] p-5 sm:p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Experience</p>
            {(portfolio.experience ?? []).length ? (
              <div className="space-y-5">
                {portfolio.experience.map(exp => (
                  <div key={exp.id} className="rounded-2xl border border-violet-100 bg-white/80 p-4 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-sm font-medium text-slate-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-violet-600">{exp.company}</p>
                    {exp.description && <p className="mt-3 text-sm leading-relaxed text-slate-600">{exp.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-violet-200 bg-white/70 p-6 text-sm text-slate-500">
                Add your experience details to showcase your impact and career journey.
              </div>
            )}
          </section>

          <section id="contact" className="mt-12 rounded-[30px] bg-gradient-to-r from-[#7a67f7] to-[#9b82f8] p-6 text-white shadow-[0_18px_30px_rgba(123,103,247,0.28)] sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-100">Contact</p>
                <h3 className="text-3xl font-bold tracking-tight">Let\'s build something meaningful.</h3>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {socialLinks.length ? (
                  socialLinks.slice(0, 2).map(link => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                      <Mail className="h-4 w-4" />
                      {link.label}
                    </a>
                  ))
                ) : (
                  <a href="mailto:hello@example.com" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20">
                    <Mail className="h-4 w-4" />
                    hello@example.com
                  </a>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
