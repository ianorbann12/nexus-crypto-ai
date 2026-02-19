export type ContentCategory = 'basics' | 'trading' | 'defi' | 'security' | 'technical_analysis' | 'ai_ml';
export type ContentDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface EducationContent {
  id: string;
  title: string;
  slug: string;
  category: ContentCategory;
  difficulty: ContentDifficulty;
  body: string;
  estimatedMinutes: number;
  order: number;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  contentId: string;
  completed: boolean;
  completedAt: Date | null;
  quizScore: number | null;
}
