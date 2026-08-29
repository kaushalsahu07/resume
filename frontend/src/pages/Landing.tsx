import { Link } from 'react-router-dom'
import { FileUp, Sparkles, LayoutTemplate, ArrowRight, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Landing() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav className="p-6 flex items-center justify-between border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="font-display font-bold text-2xl tracking-tighter">PortfoliAI</div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm font-medium text-muted-foreground">Hi, {user.name}</span>
              <Link to="/dashboard" className="text-sm font-medium hover:text-muted-foreground transition-colors">Dashboard</Link>
              <button onClick={logout} className="text-sm font-medium bg-muted text-foreground px-4 py-2 rounded-full hover:bg-muted/80 transition-opacity flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-muted-foreground transition-colors">Log in</Link>
              <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted via-background to-background"></div>
        <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tighter max-w-4xl leading-tight">
          Turn your resume into a <br className="hidden sm:block"/>
          <span className="text-muted-foreground">living portfolio.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl">
          Upload your static CV. Let our AI extract and structure your career history. 
          Edit in a beautiful live-preview interface and publish to a shareable link in seconds.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link to="/upload" className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95">
            <FileUp className="w-5 h-5" />
            Upload Your Resume
          </Link>
          <Link to="/demo" className="flex items-center gap-2 bg-muted text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-muted/80 transition-all">
            View Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-muted/30 border-y border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight">Flow to Magic in 3 Steps</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FileUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">1. Upload</h3>
              <p className="text-muted-foreground">Upload your standard PDF or DOCX resume. We keep the layout, you bring the data.</p>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm relative">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">2. AI Extraction</h3>
              <p className="text-muted-foreground">Our AI intelligently extracts your experience, projects, and skills into a structured format.</p>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <LayoutTemplate className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">3. Edit & Publish</h3>
              <p className="text-muted-foreground">Tweak the design in our live-preview editor, pick a template, and go live instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-auto">
        &copy; {new Date().getFullYear()} PortfoliAI. All rights reserved.
      </footer>
    </div>
  )
}
