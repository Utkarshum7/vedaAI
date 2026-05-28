/**
 * API Client (Axios)
 * 
 * Centralized HTTP client for all API interactions.
 * Includes request/response interceptors, error handling, and type-safe methods.
 * 
 * Usage:
 * import { assignmentApi } from '@/lib/api';
 * const response = await assignmentApi.create(formData);
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  ApiResponse,
  CreateAssignmentRequest,
  CreateAssignmentResponse,
  GetAssignmentResponse,
  ListAssignmentsResponse,
  JobStatusResponse,
  DeleteAssignmentResponse,
  FileUploadResponse,
  HealthCheckResponse,
  PaginationParams,
} from '@/types';
import { ENV, API_CONFIG, API_ENDPOINTS } from './constants';
import { parseErrorMessage } from './utils';

/**
 * Create Axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: ENV.API_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add authentication token if available
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (ENV.NODE_ENV === 'development') {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
      }

      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // Log response in development
      if (ENV.NODE_ENV === 'development') {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError) => {
      // Log error in development
      if (ENV.NODE_ENV === 'development') {
        console.error('❌ API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        });
      }

      // Handle specific error cases
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;

        switch (status) {
          case 401:
            // Unauthorized - clear auth and redirect to login
            if (typeof window !== 'undefined') {
              clearAuthToken();
              window.location.href = '/login';
            }
            break;

          case 403:
            // Forbidden
            console.error('Access forbidden');
            break;

          case 404:
            // Not found
            console.error('Resource not found');
            break;

          case 500:
            // Server error
            console.error('Server error');
            break;

          default:
            console.error('API error:', status);
        }
      } else if (error.request) {
        // Request made but no response received
        console.error('No response from server');
      } else {
        // Error in request setup
        console.error('Request setup error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * API Client Instance
 */
export const apiClient = createApiClient();

/**
 * Authentication Token Management
 * (Placeholder - implement based on your auth strategy)
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || null;
}

function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

/**
 * Generic API Request Handler
 * Wraps axios calls with consistent error handling
 */
async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.request(config);
    return response.data;
  } catch (error) {
    const message = parseErrorMessage(error);
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message,
        statusCode: (error as AxiosError).response?.status,
      },
    };
  }
}

/**
 * Assignment API Methods
 */
export const assignmentApi = {
  /**
   * Create a new assignment
   */
  create: async (data: CreateAssignmentRequest): Promise<ApiResponse<CreateAssignmentResponse>> => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('dueDate', data.dueDate);
    formData.append('questionType', data.questionType);
    formData.append('questionCount', data.questionCount.toString());
    formData.append('marks', data.marks.toString());
    formData.append('instructions', data.instructions);

    return apiRequest<CreateAssignmentResponse>({
      method: 'POST',
      url: API_ENDPOINTS.assignments.create,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Get all assignments with pagination
   */
  list: async (params?: PaginationParams): Promise<ApiResponse<ListAssignmentsResponse>> => {
    return apiRequest<ListAssignmentsResponse>({
      method: 'GET',
      url: API_ENDPOINTS.assignments.list,
      params,
    });
  },

  /**
   * Get assignment by ID
   */
  getById: async (id: string): Promise<ApiResponse<GetAssignmentResponse>> => {
    return apiRequest<GetAssignmentResponse>({
      method: 'GET',
      url: API_ENDPOINTS.assignments.getById(id),
    });
  },

  /**
   * Delete assignment by ID
   */
  delete: async (id: string): Promise<ApiResponse<DeleteAssignmentResponse>> => {
    return apiRequest<DeleteAssignmentResponse>({
      method: 'DELETE',
      url: API_ENDPOINTS.assignments.delete(id),
    });
  },
};

/**
 * Job API Methods
 */
export const jobApi = {
  /**
   * Get job status
   */
  getStatus: async (jobId: string): Promise<ApiResponse<JobStatusResponse>> => {
    return apiRequest<JobStatusResponse>({
      method: 'GET',
      url: API_ENDPOINTS.jobs.status(jobId),
    });
  },

  /**
   * Cancel job
   */
  cancel: async (jobId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiRequest<{ success: boolean }>({
      method: 'POST',
      url: API_ENDPOINTS.jobs.cancel(jobId),
    });
  },
};

/**
 * File API Methods
 */
export const fileApi = {
  /**
   * Upload file
   */
  upload: async (file: File): Promise<ApiResponse<FileUploadResponse>> => {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest<FileUploadResponse>({
      method: 'POST',
      url: API_ENDPOINTS.files.upload,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Download file
   */
  download: async (fileId: string): Promise<Blob | null> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.files.download(fileId), {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('File download error:', error);
      return null;
    }
  },
};

/**
 * Health Check API
 */
export const healthApi = {
  /**
   * Check API health
   */
  check: async (): Promise<ApiResponse<HealthCheckResponse>> => {
    return apiRequest<HealthCheckResponse>({
      method: 'GET',
      url: API_ENDPOINTS.health,
    });
  },
};

/**
 * Export all API methods
 */
export const api = {
  assignments: assignmentApi,
  jobs: jobApi,
  files: fileApi,
  health: healthApi,
};

/**
 * Export default API client
 */
export default api;

// Made with Bob
