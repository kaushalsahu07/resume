import type { Portfolio } from '../../types/portfolio'
import { ExternalLink } from 'lucide-react'

export default function FreshMinimalTemplate({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 font-sans selection:bg-slate-200">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-20">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight mb-4 text-slate-950">
            {portfolio.headline || 'Your Name'}
          </h1>
          {portfolio.summary && (
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              {portfolio.summary}
            </p>
          )}

          {portfolio.links?.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-6">
              {portfolio.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-950 hover:text-white transition-all duration-200"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </header>

        {portfolio.experience?.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xs font-extrabold tracking-widest uppercase text-slate-400 mb-8">
              Experience
            </h2>
            <div className="space-y-10">
              {portfolio.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 -mx-5 rounded-2xl transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-100 group"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs sm:text-sm font-semibold text-slate-400">
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="text-slate-800 font-semibold mb-3 text-sm">{exp.company}</div>
                  {exp.description && (
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.projects?.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xs font-extrabold tracking-widest uppercase text-slate-400 mb-8">
              Featured Projects
            </h2>
            <div className="space-y-8">
              {portfolio.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group p-6 -mx-6 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-slate-50/80 transition-all duration-300 hover:shadow-xs"
                >
                  {proj.imageUrl && (
                    <div className="w-full aspect-video mb-5 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {proj.link ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-900 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                      >
                        <span>{proj.title}</span>
                        <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </a>
                    ) : (
                      <span className="text-slate-900">{proj.title}</span>
                    )}
                  </h3>
                  {proj.description && (
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 whitespace-pre-wrap">
                      {proj.description}
                    </p>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-100 group-hover:bg-white text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200/60 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.education?.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xs font-extrabold tracking-widest uppercase text-slate-400 mb-8">
              Education
            </h2>
            <div className="space-y-6">
              {portfolio.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 -mx-4 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <div className="text-sm text-slate-500 font-medium">{edu.institution}</div>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-xs text-slate-400 mt-1">
                      {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xs font-extrabold tracking-widest uppercase text-slate-400 mb-8">
              Skills & Proficiencies
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {portfolio.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="border border-slate-200 bg-white hover:border-slate-950 hover:bg-slate-950 hover:text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 transition-all duration-200 hover:scale-105 shadow-2xs"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

