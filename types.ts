
export enum AppView {
  HOME = 'HOME',
  ABSTRACT_SUBMISSION = 'ABSTRACT_SUBMISSION',
  DATES = 'DATES',
  COMMITTEE = 'COMMITTEE',
  SCHEDULE = 'SCHEDULE',
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER'
}

export enum AssignmentStatus {
  UNASSIGNED = 'UNASSIGNED',
  ASSIGNED = 'ASSIGNED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface Reviewer {
  id: string;
  name: string;
  expertise: string;
}

export interface SubmissionReview {
  id: string;
  title: string;
  author: string;
  reviewerId?: string;
  assignmentStatus: AssignmentStatus;
  scores: {
    originality: number;
    methodology: number;
    relevance: number;
    scientificQuality: number;
  };
  comments: string;
}

// Fix: Add ImageSize type to support Gemini image generation configuration
export type ImageSize = '1K' | '2K' | '4K';

// Fix: Add Message interface for AI Assistant conversation history
export interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
  isThinking?: boolean;
}

// Fix: Add AssistantConfig interface for managing AI Assistant settings
export interface AssistantConfig {
  mode: 'fast' | 'thinking' | 'image';
  imageSize?: ImageSize;
}
