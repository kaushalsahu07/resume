import type { Portfolio } from '../../types/portfolio'

export default function FreshMinimalTemplate({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 font-sans text-foreground">
      <header className="mb-20">
        <h1 className="text-5xl font-display font-bold tracking-tight mb-4">{portfolio.headline || 'Your Name'}</h1>
        {portfolio.summary && (
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {portfolio.summary}
          </p>
        )}
      </header>

      {portfolio.experience?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Experience</h2>
          <div className="space-y-12">
            {portfolio.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <span className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <div className="text-primary font-medium mb-4">{exp.company}</div>
                {exp.description && <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {portfolio.projects?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Projects</h2>
          <div className="space-y-12">
            {portfolio.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-xl font-semibold mb-2">
                  {proj.link ? <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline">{proj.title}</a> : proj.title}
                </h3>
                {proj.description && <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-wrap">{proj.description}</p>}
                {proj.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack.map(tech => (
                      <span key={tech} className="bg-muted px-3 py-1 rounded-full text-xs font-medium">{tech}</span>
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
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Education</h2>
          <div className="space-y-8">
            {portfolio.education.map(edu => (
              <div key={edu.id}>
                <h3 className="text-lg font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <div className="text-muted-foreground">{edu.institution}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {portfolio.skills?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {portfolio.skills.map(skill => (
              <span key={skill.id} className="border border-border px-4 py-2 rounded-md text-sm">{skill.name}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
