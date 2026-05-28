/**
 * Type Definitions Barrel Export
 * 
 * Central export point for all TypeScript types.
 * Import types from this file throughout the application.
 * 
 * Usage:
 * import { Assignment, JobStatus, ApiResponse } from '@/types';
 */

// Assignment types
export type {
  JobStatus,
  QuestionType,
  DifficultyLevel,
  AssignmentForm,
  Question,
  PaperSection,
  StudentInfo,
  PaperMetadata,
  GeneratedPaper,
  Assignment,
  JobProgress,
} from './assignment';

// API types
export type {
  ApiResponse,
  ApiError,
  PaginationParams,
  PaginatedResponse,
  CreateAssignmentRequest,
  CreateAssignmentResponse,
  GetAssignmentResponse,
  ListAssignmentsResponse,
  JobStatusResponse,
  DeleteAssignmentResponse,
  FileUploadResponse,
  HealthCheckResponse,
  SocketEventPayloads,
  ApiEndpoints,
} from './api';

// Made with Bob
