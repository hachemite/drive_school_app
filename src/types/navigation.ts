// src/types/navigation.ts
export interface PathItem {
    name: string;
    id: string;
  }
  
// src/types/navigation.ts
export type BreadcrumbItem = 
  | { name: string; path: string }  // For path-based navigation
  | { name: string; id: string };   // For ID-based navigation