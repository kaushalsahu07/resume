-- 1. Create tables in the public schema
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT DEFAULT 'fresh-minimal',
  headline TEXT,
  summary TEXT,
  is_published BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  institution TEXT, 
  degree TEXT, 
  field TEXT,
  start_date TEXT, 
  end_date TEXT, 
  "order" INT DEFAULT 0
);

CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  company TEXT, 
  role TEXT, 
  start_date TEXT, 
  end_date TEXT,
  description TEXT, 
  "order" INT DEFAULT 0
);

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  title TEXT, 
  description TEXT, 
  tech_stack TEXT[], 
  link TEXT, 
  image_url TEXT,
  "order" INT DEFAULT 0
);

CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  name TEXT, 
  category TEXT
);

CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  title TEXT, 
  description TEXT, 
  date TEXT
);

CREATE TABLE public.links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  label TEXT, 
  url TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Profiles: Users can read/write their own profile
CREATE POLICY "Users can manage their own profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);

-- Portfolios: Users can manage their own portfolios
CREATE POLICY "Users can manage their own portfolios" 
ON public.portfolios FOR ALL USING (auth.uid() = user_id);

-- Portfolios: Anyone can read published portfolios
CREATE POLICY "Anyone can view published portfolios"
ON public.portfolios FOR SELECT USING (is_published = true);

-- Child tables: Users can manage rows if they own the parent portfolio
CREATE POLICY "Users can manage education for their portfolios"
ON public.education FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id)
);

CREATE POLICY "Users can manage experience for their portfolios"
ON public.experience FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id)
);

CREATE POLICY "Users can manage projects for their portfolios"
ON public.projects FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id)
);

CREATE POLICY "Users can manage skills for their portfolios"
ON public.skills FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id)
);

CREATE POLICY "Users can manage achievements for their portfolios"
ON public.achievements FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id)
);

CREATE POLICY "Users can manage links for their portfolios"
ON public.links FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id)
);

-- Child tables: Anyone can read rows of published portfolios
CREATE POLICY "Anyone can view education of published portfolios"
ON public.education FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE is_published = true)
);

CREATE POLICY "Anyone can view experience of published portfolios"
ON public.experience FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE is_published = true)
);

CREATE POLICY "Anyone can view projects of published portfolios"
ON public.projects FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE is_published = true)
);

CREATE POLICY "Anyone can view skills of published portfolios"
ON public.skills FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE is_published = true)
);

CREATE POLICY "Anyone can view achievements of published portfolios"
ON public.achievements FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE is_published = true)
);

CREATE POLICY "Anyone can view links of published portfolios"
ON public.links FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE is_published = true)
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
