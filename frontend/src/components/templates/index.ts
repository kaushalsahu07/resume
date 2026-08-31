import type { ComponentType } from 'react';
import type { Portfolio } from '../../types/portfolio';

// Eagerly load all templates in this directory ending with 'Template.tsx'
const templateModules = import.meta.glob('./*Template.tsx', { eager: true });
const thumbnailModules = import.meta.glob('./*.{png,jpg,jpeg,svg}', { eager: true });

export interface TemplateDefinition {
  id: string;
  name: string;
  thumbnail?: string;
  component: ComponentType<{ portfolio: Portfolio }>;
}

export const templates: TemplateDefinition[] = Object.entries(templateModules).map(
  ([path, module]: [string, any]) => {
    // Extract filename without extension and path
    const fileName = path.split('/').pop()?.replace('.tsx', '') || '';
    
    // Remove "Template" suffix if present
    const nameWithoutTemplate = fileName.replace('Template', '');
    
    // Convert PascalCase to separate words (e.g., "FreshMinimal" -> "Fresh Minimal")
    const displayName = nameWithoutTemplate.replace(/([A-Z])/g, ' $1').trim();
    
    // Convert to kebab-case for the ID (e.g., "FreshMinimal" -> "fresh-minimal")
    const id = nameWithoutTemplate.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    // Find a matching thumbnail
    const thumbnailPath = Object.keys(thumbnailModules).find(
      key => key.includes(fileName) || key.includes(id)
    );
    const thumbnail = thumbnailPath ? (thumbnailModules[thumbnailPath] as any).default : undefined;

    return {
      id,
      name: displayName,
      thumbnail,
      // Default export is expected to be the component
      component: module.default,
    };
  }
);

export const getTemplateById = (id?: string): TemplateDefinition => {
  if (!id) return templates[0];
  const normalizedId = id.toLowerCase().trim();

  // 1. Exact ID match (e.g. 'fresh-minimal', 'dark-grid')
  const exactMatch = templates.find(t => t.id.toLowerCase() === normalizedId);
  if (exactMatch) return exactMatch;

  // 2. Exact Name match (e.g. 'Fresh Minimal', 'Dark Grid')
  const nameMatch = templates.find(t => t.name.toLowerCase() === normalizedId);
  if (nameMatch) return nameMatch;

  // 3. Normalized / alias match (e.g. 'fresh', 'dark', 'classic', 'alex', 'dark_grid')
  const cleanTarget = normalizedId.replace(/[^a-z0-9]/g, '');
  const fuzzyMatch = templates.find(t => {
    const cleanTId = t.id.replace(/[^a-z0-9]/g, '');
    const cleanTName = t.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanTId === cleanTarget ||
           cleanTId.startsWith(cleanTarget) ||
           cleanTarget.startsWith(cleanTId) ||
           cleanTName.startsWith(cleanTarget);
  });
  if (fuzzyMatch) return fuzzyMatch;

  return templates[0];
};
