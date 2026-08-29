import type { Portfolio } from '../../types/portfolio'
import { Send } from 'lucide-react'

export default function DarkGridTemplate({ portfolio }: { portfolio: Portfolio }) {
  // Helper to highlight the last few words of the summary to match the premium aesthetic
  const renderSummary = (summary?: string) => {
    if (!summary) return null;
    const words = summary.split(' ');
    if (words.length <= 3) return summary;
    const lastTwo = words.slice(-2).join(' ');
    const rest = words.slice(0, -2).join(' ');
    return <>{rest} <span className="text-blue-500">{lastTwo}</span></>;
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      />

      {/* Subtle Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-800/30 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex justify-center mb-32">
          <div className="flex items-center gap-8 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center -mt-20">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-300 mb-4">
            Hello! I'm {portfolio.headline || 'Kaushal'},
          </h1>
          
          <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mb-12">
            {portfolio.summary ? (
              renderSummary(portfolio.summary)
            ) : (
              <>
                Web Developer Enthusiastic about<br/>
                Creating Seamless <span className="text-blue-500">Digital Experiences.</span>
              </>
            )}
          </h2>

          <a 
            href="#projects"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-black border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-sm font-medium"
          >
            Show my work 
            <Send className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </a>
        </main>

        {/* Additional Sections (Projects, Experience, etc.) could be added here below the fold */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section id="projects" className="py-32">
            <h3 className="text-2xl font-bold mb-12 text-center">Featured Projects</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {portfolio.projects.map(proj => (
                <div key={proj.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-xl font-bold mb-2">{proj.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{proj.description}</p>
                  {proj.techStack && (
                    <div className="flex gap-2 flex-wrap">
                      {proj.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
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

        {portfolio.experience && portfolio.experience.length > 0 && (
          <section id="about" className="py-20">
             <h3 className="text-2xl font-bold mb-12 text-center">Experience</h3>
             <div className="space-y-6 max-w-3xl mx-auto">
               {portfolio.experience.map(exp => (
                 <div key={exp.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between gap-4">
                   <div>
                     <h4 className="font-bold text-lg">{exp.role}</h4>
                     <div className="text-blue-400 text-sm font-medium">{exp.company}</div>
                   </div>
                   <div className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate || 'Present'}</div>
                 </div>
               ))}
             </div>
          </section>
        )}

        {portfolio.education && portfolio.education.length > 0 && (
          <section className="py-20 max-w-3xl mx-auto w-full">
            <h3 className="text-2xl font-bold mb-12 text-center text-gray-200">Education</h3>
            <div className="space-y-6">
              {portfolio.education.map(edu => (
                <div key={edu.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-lg">{edu.degree}</h4>
                    <div className="text-blue-400 text-sm font-medium">{edu.institution} {edu.field && `• ${edu.field}`}</div>
                  </div>
                  <div className="text-gray-500 text-sm whitespace-nowrap">{edu.startDate} - {edu.endDate || 'Present'}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="py-20 max-w-4xl mx-auto w-full">
            <h3 className="text-2xl font-bold mb-12 text-center text-gray-200">Skills & Expertise</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {portfolio.skills.map(skill => (
                <div key={skill.id} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-default shadow-sm hover:shadow-blue-500/10">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact & Footer */}
        <footer id="contact" className="py-32 text-center flex flex-col items-center">
          <div className="w-24 h-1 bg-blue-500/30 rounded-full mb-12" />
          <h3 className="text-3xl font-bold mb-8">Let's Work Together</h3>
          {portfolio.links && portfolio.links.length > 0 ? (
            <div className="flex gap-6 mb-12">
              {portfolio.links.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
             <p className="text-gray-500 mb-12 max-w-md">I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          )}
          
          <a href="mailto:hello@example.com" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors mb-16">
            Say Hello
          </a>

          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} {portfolio.headline || 'Portfolio'}. Crafted with passion.
          </div>
        </footer>
      </div>
    </div>
  )
}
