import type { Portfolio } from '../../types/portfolio'

export default function EmeraldEditorialTemplate({ portfolio }: { portfolio: Portfolio }) {
  const name = portfolio.headline || 'Rosie'
  const summary = portfolio.summary || 'I design beautiful, user-friendly digital experiences that help brands grow.'
  const links = portfolio.links || []
  const socialLinks = links.filter((link) => /github|linkedin|dribbble|behance|instagram|x|twitter|mail/i.test(link.url + ' ' + link.label))
  const primaryEmail = links.find((link) => link.url.startsWith('mailto:'))?.url || 'mailto:hello@example.com'

  const navItems = [
    { label: 'Home', href: '#home' },
    ...(portfolio.projects?.length ? [{ label: 'Projects', href: '#projects' }] : []),
    ...(portfolio.experience?.length ? [{ label: 'Experience', href: '#experience' }] : []),
    ...(portfolio.skills?.length ? [{ label: 'Skills', href: '#skills' }] : []),
    ...(portfolio.education?.length ? [{ label: 'Education', href: '#education' }] : []),
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <div className="min-h-screen w-full bg-[#f4e7ea] text-[#1b1b1b] antialiased" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div className="mx-auto max-w-[1440px] px-3 py-3 sm:px-6 lg:px-8">
        <header className="rounded-t-[26px] bg-[#f8ebee] px-4 py-4 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#ff4d92] text-[9px] font-black text-white">r</div>
              <span className="text-[1.6rem] font-black leading-none tracking-[-0.08em] text-[#1b1b1b] sm:text-[2rem]">{name.toLowerCase()}</span>
            </div>

            <nav className="hidden items-center gap-6 text-[10px] font-medium uppercase tracking-[0.14em] text-[#2c2c2c] md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-[#ff4d92]">
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={primaryEmail}
              className="inline-flex items-center justify-center rounded-full bg-[#ff4d92] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_20px_rgba(255,77,146,0.22)]"
            >
              Let&apos;s Talk
            </a>
          </div>
        </header>

        <main className="overflow-hidden rounded-b-[26px] bg-[#f8ebee] px-3 pb-3 sm:px-8 lg:px-12">
          <section id="home" className="relative overflow-hidden rounded-[28px] bg-[#f3dfe5] px-4 pb-5 pt-6 sm:px-8 lg:px-10 lg:pb-8 lg:pt-10">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-r from-[#f8e0e7] via-[#f6dfe5] to-[#f5e7eb]" />
            <div className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-[#f7dce7] blur-[90px]" />
            <div className="absolute -right-10 top-0 h-60 w-60 rounded-full bg-[#f1c7d8] blur-[100px]" />

            <div className="relative grid items-center gap-6 md:gap-8 lg:grid-cols-[1.05fr_1.2fr]">
              <div className="pt-3 text-left">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2d2d2d] sm:text-[11px]">
                  Hello, I&apos;m {name}
                </p>
                <h1 className="max-w-[420px] text-[2.5rem] font-black leading-[0.92] tracking-[-0.08em] text-[#1b1b1b] sm:text-[3.2rem] md:text-[3.5rem] lg:text-[4.5rem]">
                  Creative UI/UX
                  <span className="block">Designer</span>
                </h1>

                <p className="mt-5 max-w-[360px] text-[0.96rem] leading-[1.7] text-[#3a3a3a] sm:text-[1.05rem] lg:text-[1.1rem]">
                  {summary}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                  <a href="#projects" className="inline-flex w-full items-center justify-center rounded-full bg-[#ff4d92] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_25px_rgba(255,77,146,0.28)] sm:w-auto sm:px-6">
                    View My Work
                  </a>
                  <a href={primaryEmail} className="inline-flex w-full items-center justify-center rounded-full border border-[#1b1b1b]/20 bg-white/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1b1b1b] sm:w-auto sm:px-6">
                    Download CV
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[#1b1b1b] sm:mt-10">
                  <span className="text-[1.2rem] font-black sm:text-[1.7rem]">Be</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1b1b1b]/20 bg-white/25 text-[11px] sm:h-9 sm:w-9 sm:text-[12px]">in</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1b1b1b] text-[11px] text-white sm:h-8 sm:w-8 sm:text-[12px]">◎</span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[620px] pt-2">
                <div className="relative flex min-h-[280px] items-center justify-center overflow-visible sm:min-h-[340px] lg:min-h-[420px]">
                  <div className="absolute right-2 top-0 h-16 w-16 rounded-full bg-[#f4c7d6]/80 blur-2xl sm:right-6 sm:h-20 sm:w-20" />

                  <div className="relative z-10 w-full max-w-[560px] rounded-[22px] border border-white/60 bg-white/20 p-3 shadow-[0_40px_60px_rgba(217,154,175,0.16)] backdrop-blur-[2px] sm:rounded-[28px] sm:p-4">
                    <div className="rounded-[20px] bg-[#efe3e6] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] sm:rounded-[24px] sm:p-4">
                      <div className="mb-4 flex items-center justify-between rounded-[18px] bg-[#f7f1f2] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] sm:mb-5">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-[#f66a9d]" />
                          <span className="h-3 w-3 rounded-full bg-[#edc9c5]" />
                          <span className="h-3 w-3 rounded-full bg-[#cfc2d7]" />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3d3d3d]">Dashboard</span>
                      </div>

                      <div className="grid gap-3 sm:gap-4 md:grid-cols-[1.12fr_0.88fr]">
                        <div className="rounded-[18px] bg-[#f5f2f4] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] sm:rounded-[22px] sm:p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.14em] text-[#7a686d]">Product</div>
                              <div className="mt-1 text-[1.1rem] font-semibold text-[#171717]">Dashboard</div>
                            </div>
                            <div className="rounded-full bg-white p-2 text-[#ff4d92]">↗</div>
                          </div>

                          <div className="mt-4 h-20 rounded-[16px] bg-gradient-to-br from-[#f5f2f4] via-[#f9eff3] to-[#f8d7e5] p-3 sm:mt-5 sm:h-24 sm:rounded-[20px]">
                            <div className="flex h-full items-end gap-2">
                              {[18, 28, 14, 42, 30, 52, 62].map((value, idx) => (
                                <div key={idx} className="w-full rounded-t-[10px] bg-[#ff4d92] opacity-80" style={{ height: `${value}%` }} />
                              ))}
                            </div>
                          </div>

                          <div className="mt-5 flex items-end justify-between">
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.14em] text-[#7b6d71]">Total</div>
                              <div className="mt-1 text-[1.6rem] font-bold tracking-[-0.06em] text-[#1d1d1d] sm:text-[1.8rem]">$24,780</div>
                            </div>
                            <div className="rounded-full bg-[#ffeff5] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#ff4d92]">+12.4%</div>
                          </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <div className="rounded-[18px] bg-[#f7f0f3] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] sm:rounded-[22px] sm:p-4">
                            <div className="mb-3 text-[10px] uppercase tracking-[0.14em] text-[#7a686d]">Mobile App</div>
                            <div className="mx-auto h-28 w-16 rounded-[20px] bg-[#1d1d1d] p-1.5 shadow-[0_20px_35px_rgba(0,0,0,0.18)] sm:h-36 sm:w-20 sm:rounded-[24px] sm:p-2">
                              <div className="h-full rounded-[18px] bg-gradient-to-b from-[#f7d6e3] via-[#f1f0f4] to-[#f9e9ef] p-3">
                                <div className="mx-auto mt-2 h-1.5 w-8 rounded-full bg-[#111111]" />
                                <div className="mt-4 h-16 rounded-[16px] bg-white/80 p-2">
                                  <div className="flex items-center justify-between text-[8px] font-bold text-[#f95da0]">
                                    <span>12:45</span>
                                    <span>UI</span>
                                  </div>
                                  <div className="mt-3 flex h-8 items-end gap-1">
                                    {[24, 35, 18, 44, 30, 54].map((bar, idx) => (
                                      <div key={idx} className="w-full rounded-t-[6px] bg-[#ff4d92]" style={{ height: `${bar}%` }} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {portfolio.projects && portfolio.projects.length > 0 && (
            <section id="projects" className="border-t border-[#f5c8d5] py-12 sm:py-16">
              <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-black tracking-[-0.06em] text-[#1b1b1b] sm:text-4xl">Featured Work</h2>
                  <a href="#contact" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff4d92]">View All →</a>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {portfolio.projects.map((project, index) => (
                    <article key={project.id || index} className="overflow-hidden rounded-[24px] border border-[#f0c9d8] bg-white/40 shadow-[0_18px_36px_rgba(255,77,146,0.08)]">
                      {project.imageUrl ? (
                        <div className="h-48 overflow-hidden bg-[#f7edf0]">
                          <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#f8dfe7] to-[#fbeaf1] text-xl font-black text-[#1b1b1b]">
                          {project.title.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff4d92]">Project {index + 1}</span>
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="text-[#1b1b1b] hover:text-[#ff4d92]">↗</a>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-[#1b1b1b]">{project.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#4a4a4a]">{project.description || 'A polished, user-focused digital product built with attention to clarity and conversion.'}</p>
                        {project.techStack?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.techStack.slice(0, 3).map((tech) => (
                              <span key={tech} className="rounded-full bg-[#fff0f6] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#ff4d92]">
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {portfolio.experience && portfolio.experience.length > 0 && (
            <section id="experience" className="border-t border-[#f5c8d5] py-12 sm:py-16">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-2xl font-black tracking-[-0.06em] text-[#1b1b1b] sm:text-4xl">Experience</h2>
                <div className="space-y-4">
                  {portfolio.experience.map((exp, index) => (
                    <div key={exp.id || index} className="rounded-[22px] border border-[#f0c9d8] bg-white/35 p-4 sm:p-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff4d92]">{exp.company}</div>
                          <h3 className="mt-1 text-xl font-bold text-[#1b1b1b]">{exp.role}</h3>
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4a4a4a]">
                          {exp.startDate || '2021'} — {exp.endDate || 'Present'}
                        </span>
                      </div>
                      {exp.description && <p className="mt-3 text-sm leading-relaxed text-[#4a4a4a]">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {portfolio.skills && portfolio.skills.length > 0 && (
            <section id="skills" className="border-t border-[#f5c8d5] py-12 sm:py-16">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-2xl font-black tracking-[-0.06em] text-[#1b1b1b] sm:text-4xl">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {portfolio.skills.map((skill) => (
                    <span key={skill.id} className="rounded-full border border-[#f0c9d8] bg-[#fff5f8] px-3 py-2 text-sm font-medium text-[#1b1b1b]">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {portfolio.education && portfolio.education.length > 0 && (
            <section id="education" className="border-t border-[#f5c8d5] py-12 sm:py-16">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-2xl font-black tracking-[-0.06em] text-[#1b1b1b] sm:text-4xl">Education</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {portfolio.education.map((edu, index) => (
                    <div key={edu.id || index} className="rounded-[20px] border border-[#f0c9d8] bg-white/35 p-4 sm:p-5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff4d92]">{edu.startDate || '2018'} — {edu.endDate || '2022'}</div>
                      <h3 className="mt-2 text-xl font-bold text-[#1b1b1b]">{edu.degree}</h3>
                      <p className="mt-1 text-sm text-[#4a4a4a]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <footer id="contact" className="border-t border-[#f5c8d5] py-12 sm:py-16">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff4d92]">Contact</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.06em] text-[#1b1b1b] sm:text-4xl">Let&apos;s build something memorable.</h2>
                </div>
                <a href={primaryEmail} className="inline-flex items-center justify-center rounded-full bg-[#ff4d92] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(255,77,146,0.22)]">
                  Contact me
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {socialLinks.length > 0 ? (
                  socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-[#f0c9d8] bg-white/50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1b1b1b]"
                    >
                      {link.label}
                    </a>
                  ))
                ) : (
                  <>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-[#f0c9d8] bg-white/50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1b1b1b]">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-[#f0c9d8] bg-white/50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1b1b1b]">LinkedIn</a>
                  </>
                )}
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
