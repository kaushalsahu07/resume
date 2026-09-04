import type { Portfolio } from '../../types/portfolio'

export default function ClassicProfessionalTemplate({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans selection:bg-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <header className="border-b-2 border-slate-900 pb-6 sm:pb-8 mb-8 text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 uppercase tracking-tight">{portfolio.headline || 'Your Name'}</h1>
          {portfolio.summary && (
            <p className="text-muted-foreground max-w-2xl text-xs sm:text-sm leading-relaxed">
              {portfolio.summary}
            </p>
          )}
        </div>
        {portfolio.links?.length > 0 && (
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-medium">
            {portfolio.links.map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-10">
          {portfolio.experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-border pb-2 mb-6">Experience</h2>
              <div className="space-y-8">
                {portfolio.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg">{exp.role}</h3>
                      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <div className="text-primary font-medium text-sm mb-3">{exp.company}</div>
                    {exp.description && <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-border pb-2 mb-6">Projects</h2>
              <div className="space-y-8">
                {portfolio.projects.map(proj => (
                  <div key={proj.id} className="flex flex-col sm:flex-row gap-4">
                    {proj.imageUrl && (
                      <div className="w-full sm:w-32 flex-shrink-0">
                        <div className="aspect-square w-full rounded-md overflow-hidden bg-muted border border-border">
                          <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {proj.link ? <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline">{proj.title}</a> : proj.title}
                      </h3>
                      {proj.description && <p className="text-sm text-muted-foreground leading-relaxed mb-3 whitespace-pre-wrap">{proj.description}</p>}
                      {proj.techStack?.length > 0 && (
                        <p className="text-xs font-medium text-muted-foreground">
                          <span className="text-foreground">Tech:</span> {proj.techStack.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-10">
          {portfolio.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-border pb-2 mb-6">Education</h2>
              <div className="space-y-6">
                {portfolio.education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold">{edu.degree}</h3>
                    {edu.field && <div className="text-sm font-medium mb-1">{edu.field}</div>}
                    <div className="text-sm text-muted-foreground">{edu.institution}</div>
                    <div className="text-xs text-muted-foreground mt-1">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-border pb-2 mb-6">Skills</h2>
              <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                {portfolio.skills.map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
