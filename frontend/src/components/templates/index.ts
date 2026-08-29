import { ComponentType } from 'react';
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

export const getTemplateById = (id: string): TemplateDefinition => {
  return templates.find(t => t.id === id) || templates[0];
};
