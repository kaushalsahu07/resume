import os
import re

template_dir = r'd:\codingspace\Code\resume\resume\frontend\src\components\templates'

for filename in os.listdir(template_dir):
    if not filename.endswith('Template.tsx'): continue
    filepath = os.path.join(template_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'getProfilePicUrl' in content: continue

    # Add import
    import_statement = "import { getProfilePicUrl } from '../../lib/portfolioUrl'\n"
    content = import_statement + content
    
    img_html = """
          <div className="w-24 h-24 mb-6 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200/50">
            <img 
              src={getProfilePicUrl(portfolio.id)} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.parentElement) target.parentElement.style.display = 'none';
              }}
            />
          </div>
"""
    
    # regex to find the first <h1
    match = re.search(r'(\s*)<h1', content)
    if match:
        idx = match.start()
        # insert the img_html before the <h1
        content = content[:idx] + img_html + content[idx:]
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print('Updated templates!')
