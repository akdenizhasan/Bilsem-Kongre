
export enum AppView {
  HOME = 'HOME',
  ABSTRACT_SUBMISSION = 'ABSTRACT_SUBMISSION',
  AI_ASSISTANT = 'AI_ASSISTANT',
  DATES = 'DATES',
  COMMITTEE = 'COMMITTEE',
  SCHEDULE = 'SCHEDULE',
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER'
}

export type ImageSize = '1K' | '2K' | '4K';

export interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
  isThinking?: boolean;
}

export interface AssistantConfig {
  mode: 'fast' | 'thinking' | 'image';
  imageSize?: ImageSize;
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