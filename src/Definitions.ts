// Type Definitions.
export type Tool = 'save' | 'add' | 'color_lens' | 'text_format' | 'delete' | 'folder_open';
export type DrawerIconType = 'chevron_left' | 'chevron_right';

// Interface Definitions.
export interface WorkType {
  title: string;
  content: string;
  color: string;
}
