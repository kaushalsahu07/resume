from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import List, Optional

class BaseCamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

# --- Item Schemas ---

class EducationItem(BaseCamelModel):
    id: Optional[str] = None
    institution: str
    degree: str
    field: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    order: int = 0

class ExperienceItem(BaseCamelModel):
    id: Optional[str] = None
    company: str
    role: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    order: int = 0

class ProjectItem(BaseCamelModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    tech_stack: List[str] = []
    link: Optional[str] = None
    image_url: Optional[str] = None
    order: int = 0

class SkillItem(BaseCamelModel):
    id: Optional[str] = None
    name: str
    category: Optional[str] = None

class AchievementItem(BaseCamelModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    date: Optional[str] = None

class LinkItem(BaseCamelModel):
    id: Optional[str] = None
    label: str
    url: str

# --- Portfolio Schemas ---

class ExtractedPortfolio(BaseCamelModel):
    headline: Optional[str] = None
    summary: Optional[str] = None
    education: List[EducationItem] = []
    experience: List[ExperienceItem] = []
    projects: List[ProjectItem] = []
    skills: List[SkillItem] = []
    achievements: List[AchievementItem] = []
    links: List[LinkItem] = []

class PortfolioUpdate(BaseCamelModel):
    headline: Optional[str] = None
    summary: Optional[str] = None
    template_id: Optional[str] = None
    slug: Optional[str] = None

class Portfolio(BaseCamelModel):
    id: str
    slug: str
    template_id: str
    headline: Optional[str] = None
    summary: Optional[str] = None
    is_published: bool = False
    view_count: int = 0
    education: List[EducationItem] = []
    experience: List[ExperienceItem] = []
    projects: List[ProjectItem] = []
    skills: List[SkillItem] = []
    achievements: List[AchievementItem] = []
    links: List[LinkItem] = []

class ReorderRequest(BaseCamelModel):
    section: str
    ordered_ids: List[str]
