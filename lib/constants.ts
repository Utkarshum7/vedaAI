/**
 * Application Constants
 * 
 * Centralized configuration values, API endpoints, and application constants.
 * Update these values based on environment and deployment configuration.
 */

import type { ApiEndpoints, QuestionType, DifficultyLevel } from '@/types';

/**
 * Environment Configuration
 */
export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * API Endpoints
 * Type-safe endpoint definitions
 */
export const API_ENDPOINTS: ApiEndpoints = {
  assignments: {
    create: '/api/assignments',
    list: '/api/assignments',
    getById: (id: string) => `/api/assignments/${id}`,
    delete: (id: string) => `/api/assignments/${id}`,
  },
  jobs: {
    status: (jobId: string) => `/api/jobs/${jobId}/status`,
    cancel: (jobId: string) => `/api/jobs/${jobId}/cancel`,
  },
  files: {
    upload: '/api/files/upload',
    download: (fileId: string) => `/api/files/${fileId}/download`,
  },
  health: '/api/health',
} as const;

/**
 * Socket.io Events
 */
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  JOB_STATUS: 'job:status',
  JOB_COMPLETED: 'job:completed',
  JOB_FAILED: 'job:failed',
  QUEUE_UPDATE: 'queue:update',
} as const;

/**
 * Application Routes
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  CREATE: '/create',
  OUTPUT: '/output',
} as const;

/**
 * Navigation Items
 * Sidebar navigation structure (aligned with Figma)
 */
export const NAVIGATION_ITEMS = [
  {
    name: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    name: 'Create Assignment',
    href: ROUTES.CREATE,
    icon: 'FilePlus',
  },
  {
    name: 'View Output',
    href: ROUTES.OUTPUT,
    icon: 'FileText',
  },
] as const;

/**
 * Question Type Options
 */
export const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'short-answer', label: 'Short Answer' },
  { value: 'long-answer', label: 'Long Answer' },
  { value: 'true-false', label: 'True/False' },
  { value: 'fill-in-blank', label: 'Fill in the Blank' },
  { value: 'mixed', label: 'Mixed (All Types)' },
] as const;

/**
 * Difficulty Levels
 */
export const DIFFICULTY_LEVELS: { value: DifficultyLevel; label: string; color: string }[] = [
  { value: 'easy', label: 'Easy', color: 'text-green-600 bg-green-50' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
  { value: 'hard', label: 'Hard', color: 'text-red-600 bg-red-50' },
] as const;

/**
 * Job Status Configuration
 */
export const JOB_STATUS_CONFIG = {
  idle: {
    label: 'Idle',
    color: 'text-neutral-600 bg-neutral-50',
    icon: 'Circle',
  },
  queued: {
    label: 'Queued',
    color: 'text-blue-600 bg-blue-50',
    icon: 'Clock',
  },
  generating: {
    label: 'Generating',
    color: 'text-purple-600 bg-purple-50',
    icon: 'Loader2',
  },
  completed: {
    label: 'Completed',
    color: 'text-green-600 bg-green-50',
    icon: 'CheckCircle2',
  },
  failed: {
    label: 'Failed',
    color: 'text-red-600 bg-red-50',
    icon: 'XCircle',
  },
} as const;

/**
 * Form Validation Rules
 */
export const VALIDATION_RULES = {
  QUESTION_COUNT: {
    MIN: 1,
    MAX: 100,
    DEFAULT: 10,
  },
  MARKS: {
    MIN: 1,
    MAX: 1000,
    DEFAULT: 100,
  },
  INSTRUCTIONS: {
    MAX_LENGTH: 1000,
  },
  FILE: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
    ALLOWED_EXTENSIONS: ['.pdf', '.docx', '.txt'],
  },
} as const;

/**
 * UI Constants
 */
export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 300, // milliseconds
  TOAST_DURATION: 3000, // milliseconds
  SKELETON_COUNT: 3,
  ITEMS_PER_PAGE: 10,
  MAX_MOBILE_WIDTH: 768, // pixels
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  THEME: 'vedaai_theme',
  SIDEBAR_COLLAPSED: 'vedaai_sidebar_collapsed',
  RECENT_ASSIGNMENTS: 'vedaai_recent_assignments',
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a PDF, DOCX, or TXT file.',
  GENERATION_FAILED: 'Failed to generate assignment. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  ASSIGNMENT_CREATED: 'Assignment created successfully!',
  ASSIGNMENT_DELETED: 'Assignment deleted successfully!',
  FILE_UPLOADED: 'File uploaded successfully!',
  GENERATION_STARTED: 'Assignment generation started!',
  GENERATION_COMPLETED: 'Assignment generated successfully!',
} as const;

/**
 * Application Metadata
 */
export const APP_METADATA = {
  NAME: 'VedaAI',
  DESCRIPTION: 'AI-Powered Assignment Generation Platform',
  VERSION: '1.0.0',
  AUTHOR: 'VedaAI Team',
} as const;

// Made with Bob
