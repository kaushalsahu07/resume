import type { Portfolio } from '../../types/portfolio'

export default function AlexEditorialTemplate({ portfolio }: { portfolio: Portfolio }) {
  const name = portfolio.headline || 'Alex Chen'
  const summary = portfolio.summary || 'Full stack developer specializing in React, Node.js, and TypeScript. Fast, accessible, and built to scale.'
  const links = portfolio.links || []
  const socialLinks = links.filter((link) => /github|linkedin|twitter|x|dribbble|mail/i.test(link.url + ' ' + link.label))
  const primaryEmail = links.find((link) => link.url.startsWith('mailto:'))?.url || 'mailto:hello@example.com'
  const currentRole = portfolio.experience?.[0]

  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#stack' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0e0a] text-white antialiased" style={{ fontFamily: 'Menlo, Monaco, Courier New, monospace' }}>
      <div className="relative">
        {/* Grid background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #00ff41 1px, transparent 1px), linear-gradient(to bottom, #00ff41 1px, transparent 1px)`,
              backgroundSize: '4rem 4rem'
            }}
          />
        </div>

        {/* Glowing orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00ff41]/10 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#00ff41]/5 blur-[120px]" />
        </div>

        {/* Header */}
        <header className="relative z-10 sticky top-0 backdrop-blur-md bg-[#0a0e0a]/80 border-b border-[#00ff41]/20">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-[#00ff41] flex items-center justify-center text-[#00ff41] text-sm font-bold">
                AC
              </div>
              <span className="text-[#00ff41] font-mono text-sm">
                {name.toLowerCase().split(' ')[0]}.dev
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-gray-400 hover:text-[#00ff41] transition">
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href={primaryEmail}
              className="px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-[#0a0e0a] transition text-xs font-mono uppercase tracking-widest"
            >
              Let's Talk
            </a>
          </nav>
        </header>

        {/* Main content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
              {/* Left side - Text */}
              <div className="space-y-8">
                <div>
                  <div className="text-[#00ff41] text-sm font-mono uppercase tracking-widest mb-2">
                    ▸ available for work • 2024
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight text-white">
                    Building apps
                    <br />
                    people actually
                    <br />
                    use.
                  </h1>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
                  {summary}
                </p>

                {currentRole && (
                  <div className="text-xs font-mono text-[#00ff41] uppercase tracking-widest">
                    {currentRole.role} • {currentRole.company}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href="#projects"
                    className="px-6 py-3 bg-[#00ff41] text-[#0a0e0a] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00cc33] transition"
                  >
                    View projects →
                  </a>
                  <a
                    href={primaryEmail}
                    className="px-6 py-3 border border-[#00ff41] text-[#00ff41] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00ff41]/10 transition"
                  >
                    Download CV
                  </a>
                </div>
              </div>

              {/* Right side - Code block display */}
              <div className="relative">
                <div className="rounded border border-[#00ff41]/40 bg-[#051a05]/60 backdrop-blur p-6 font-mono text-sm">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#00ff41]/20">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
                      <div className="w-3 h-3 rounded-full bg-[#00ff41]/50" />
                      <div className="w-3 h-3 rounded-full bg-[#00ff41]/30" />
                    </div>
                    <span className="text-[#00ff41]/60 text-xs ml-auto">portfolio</span>
                  </div>

                  {/* Code */}
                  <div className="space-y-3 text-[#00ff41]">
                    <div>
                      <span className="text-gray-500"># const</span> profile = {'{'}
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-500">role:</span> <span className="text-[#00ff41]/70">'Full-Stack Dev'</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-500">expertise:</span> {'{'}
                    </div>
                    <div className="pl-8">
                      <span className="text-gray-500">frontend:</span> [<span className="text-[#00ff41]/70">'React'</span>, <span className="text-[#00ff41]/70">'TypeScript'</span>, <span className="text-[#00ff41]/70">'Tailwind'</span>],
                    </div>
                    <div className="pl-8">
                      <span className="text-gray-500">backend:</span> [<span className="text-[#00ff41]/70">'Node.js'</span>, <span className="text-[#00ff41]/70">'PostgreSQL'</span>],
                    </div>
                    <div className="pl-4">
                      {'}'},
                    </div>
                    <div>
                      {'}'}
                    </div>
                  </div>
                </div>

                {/* Accent decoration */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#00ff41]/30" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#00ff41]/30" />
              </div>
            </div>
          </section>

          {/* Projects Section */}
          {portfolio.projects && portfolio.projects.length > 0 && (
            <section id="projects" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#00ff41]/20">
              <div className="mb-12">
                <div className="text-[#00ff41] text-sm font-mono uppercase tracking-widest mb-4">▸ 01</div>
                <h2 className="text-4xl sm:text-5xl font-black leading-tight">
                  Featured Projects
                </h2>
              </div>

              <div className="grid gap-8">
                {portfolio.projects.slice(0, 4).map((project, index) => (
                  <article key={project.id || index} className="group border border-[#00ff41]/20 hover:border-[#00ff41]/50 transition p-6 sm:p-8 bg-[#051a05]/40 hover:bg-[#051a05]/60">
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-12 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[#00ff41] text-xs font-mono uppercase tracking-widest">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {project.techStack?.length ? (
                            <div className="flex gap-2">
                              {project.techStack.slice(0, 3).map((tech) => (
                                <span key={tech} className="text-[10px] font-mono text-[#00ff41]/60 uppercase">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#00ff41] transition">
                          {project.title}
                        </h3>

                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                          {project.description || 'A carefully crafted digital product designed for clarity, performance, and user delight.'}
                        </p>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-[#00ff41] text-xs font-mono uppercase tracking-widest hover:gap-3 transition"
                          >
                            View project →
                          </a>
                        )}
                      </div>

                      {project.imageUrl ? (
                        <div className="h-64 sm:h-80 overflow-hidden rounded border border-[#00ff41]/20">
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-64 sm:h-80 rounded border border-[#00ff41]/20 bg-gradient-to-br from-[#00ff41]/10 to-[#00ff41]/5 flex items-center justify-center">
                          <span className="text-[#00ff41]/40 font-mono text-sm">[ {project.title.slice(0, 2).toUpperCase()} ]</span>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Stack Section */}
          {portfolio.skills && portfolio.skills.length > 0 && (
            <section id="stack" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#00ff41]/20">
              <div className="mb-12">
                <div className="text-[#00ff41] text-sm font-mono uppercase tracking-widest mb-4">▸ 02</div>
                <h2 className="text-4xl sm:text-5xl font-black leading-tight">
                  Tech Stack
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolio.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border border-[#00ff41]/20 hover:border-[#00ff41]/50 bg-[#051a05]/40 hover:bg-[#051a05]/60 p-4 text-center transition"
                  >
                    <span className="text-[#00ff41] font-mono text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {portfolio.experience && portfolio.experience.length > 0 && (
            <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#00ff41]/20">
              <div className="mb-12">
                <div className="text-[#00ff41] text-sm font-mono uppercase tracking-widest mb-4">▸ 03</div>
                <h2 className="text-4xl sm:text-5xl font-black leading-tight">
                  Experience
                </h2>
              </div>

              <div className="space-y-6">
                {portfolio.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#00ff41]/30 hover:border-[#00ff41] pl-6 py-2 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        {exp.startDate || '2021'} — {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-[#00ff41] text-sm font-mono uppercase tracking-widest mb-3">{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {portfolio.education && portfolio.education.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#00ff41]/20">
              <div className="mb-12">
                <div className="text-[#00ff41] text-sm font-mono uppercase tracking-widest mb-4">▸ 04</div>
                <h2 className="text-4xl sm:text-5xl font-black leading-tight">
                  Education
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {portfolio.education.map((edu) => (
                  <div key={edu.id} className="border border-[#00ff41]/20 bg-[#051a05]/40 p-6">
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                      {edu.startDate || '2018'} — {edu.endDate || '2022'}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{edu.degree}</h3>
                    <p className="text-[#00ff41] text-sm mt-1">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer / Contact */}
          <footer id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#00ff41]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="text-[#00ff41] text-sm font-mono uppercase tracking-widest mb-4">▸ Let's Talk</div>
                <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
                  Have a project in mind?
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  I'm always interested in hearing about new projects and opportunities. Reach out and let's create something great together.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={primaryEmail}
                    className="px-6 py-3 bg-[#00ff41] text-[#0a0e0a] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00cc33] transition"
                  >
                    Send Email
                  </a>
                  {socialLinks.length > 0 && (
                    <div className="flex gap-4">
                      {socialLinks.slice(0, 3).map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-3 border border-[#00ff41] text-[#00ff41] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00ff41]/10 transition"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="rounded border border-[#00ff41]/40 bg-[#051a05]/60 backdrop-blur p-8 font-mono text-sm">
                  <div className="text-[#00ff41] space-y-2">
                    <div>const contact = {'{'}</div>
                    <div className="pl-4">
                      <span className="text-gray-500">email:</span> <span className="text-[#00ff41]/70">{primaryEmail.replace('mailto:', '')}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-500">availability:</span> <span className="text-[#00ff41]/70">'Open'</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-500">response_time:</span> <span className="text-[#00ff41]/70">'24 hours'</span>
                    </div>
                    <div>{'}'}{'}'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer bottom */}
            <div className="mt-16 pt-8 border-t border-[#00ff41]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-widest">
              <span>© 2024 {name}. All rights reserved.</span>
              <span>Built with React & TypeScript</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
