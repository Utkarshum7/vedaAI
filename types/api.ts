/**
 * API Type Definitions
 * 
 * Types for API requests, responses, and error handling.
 * Ensures type safety across all API interactions.
 */

import { Assignment, AssignmentForm, GeneratedPaper, JobProgress, JobStatus } from './assignment';

/**
 * Standard API Response Wrapper
 * Generic response structure for all API endpoints
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

/**
 * API Error Structure
 * Standardized error format
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

/**
 * Pagination Parameters
 * For paginated list requests
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated Response
 * Response structure for paginated data
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Assignment Creation Request
 * Payload for creating a new assignment
 */
export interface CreateAssignmentRequest {
  file: File;
  dueDate: string; // ISO date string
  questionType: string;
  questionCount: number;
  marks: number;
  instructions: string;
}

/**
 * Assignment Creation Response
 * Response after creating an assignment
 */
export interface CreateAssignmentResponse {
  assignmentId: string;
  jobId: string;
  status: JobStatus;
  message: string;
}

/**
 * Get Assignment Response
 * Response for fetching a single assignment
 */
export interface GetAssignmentResponse {
  assignment: Assignment;
}

/**
 * List Assignments Response
 * Response for fetching all assignments
 */
export interface ListAssignmentsResponse extends PaginatedResponse<Assignment> {}

/**
 * Job Status Response
 * Response for checking job status
 */
export interface JobStatusResponse {
  jobId: string;
  status: JobStatus;
  progress: JobProgress;
  paper?: GeneratedPaper;
}

/**
 * Delete Assignment Response
 * Response after deleting an assignment
 */
export interface DeleteAssignmentResponse {
  success: boolean;
  message: string;
}

/**
 * File Upload Response
 * Response after uploading a file
 */
export interface FileUploadResponse {
  fileId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

/**
 * Health Check Response
 * API health status
 */
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
}

/**
 * Socket Event Payloads
 * Types for Socket.io event data
 */
export interface SocketEventPayloads {
  'job:status': JobProgress;
  'job:completed': {
    jobId: string;
    paper: GeneratedPaper;
  };
  'job:failed': {
    jobId: string;
    error: string;
  };
  'queue:update': {
    position: number;
    estimatedTime: number;
  };
}

/**
 * API Endpoint Configuration
 * Type-safe endpoint definitions
 */
export interface ApiEndpoints {
  assignments: {
    create: string;
    list: string;
    getById: (id: string) => string;
    delete: (id: string) => string;
  };
  jobs: {
    status: (jobId: string) => string;
    cancel: (jobId: string) => string;
  };
  files: {
    upload: string;
    download: (fileId: string) => string;
  };
  health: string;
}

// Made with Bob
