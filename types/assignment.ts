/**
 * Assignment Type Definitions
 * 
 * Core types for the VedaAI assignment generation system.
 * Defines the structure for assignment forms, job statuses, and generated papers.
 */

/**
 * Job Status Enum
 * Represents the current state of an assignment generation job
 */
export type JobStatus = 'idle' | 'queued' | 'generating' | 'completed' | 'failed';

/**
 * Question Type Options
 * Different types of questions that can be generated
 */
export type QuestionType = 
  | 'multiple-choice'
  | 'short-answer'
  | 'long-answer'
  | 'true-false'
  | 'fill-in-blank'
  | 'mixed';

/**
 * Difficulty Level
 * Question difficulty classification
 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/**
 * Assignment Form Data
 * Structure for creating a new assignment
 */
export interface AssignmentForm {
  uploadedFile: File | null;
  dueDate: Date | null;
  questionType: QuestionType;
  questionCount: number;
  marks: number;
  instructions: string;
}

/**
 * Question Structure
 * Individual question in a generated paper
 */
export interface Question {
  id: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer?: string;
  marks: number;
  section?: string;
}

/**
 * Paper Section
 * Groups questions by section
 */
export interface PaperSection {
  id: string;
  title: string;
  instructions?: string;
  questions: Question[];
  totalMarks: number;
}

/**
 * Student Information
 * Metadata for the student taking the assignment
 */
export interface StudentInfo {
  name?: string;
  rollNumber?: string;
  class?: string;
  date?: Date;
}

/**
 * Paper Metadata
 * Additional information about the generated paper
 */
export interface PaperMetadata {
  title: string;
  subject?: string;
  totalMarks: number;
  duration?: number; // in minutes
  instructions: string;
  createdAt: Date;
  dueDate: Date | null;
}

/**
 * Generated Paper
 * Complete structure of a generated assignment paper
 */
export interface GeneratedPaper {
  id: string;
  metadata: PaperMetadata;
  sections: PaperSection[];
  studentInfo?: StudentInfo;
  generatedAt: Date;
}

/**
 * Assignment Record
 * Stored assignment with status tracking
 */
export interface Assignment {
  id: string;
  form: AssignmentForm;
  status: JobStatus;
  paper?: GeneratedPaper;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
  queuePosition?: number;
}

/**
 * Job Progress
 * Real-time progress information during generation
 */
export interface JobProgress {
  jobId: string;
  status: JobStatus;
  progress: number; // 0-100
  message: string;
  queuePosition?: number;
  estimatedTime?: number; // in seconds
}

// Made with Bob
