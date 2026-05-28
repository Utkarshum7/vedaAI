/**
 * Assignment Store (Zustand)
 * 
 * Global state management for the VedaAI assignment generation system.
 * Manages assignment forms, job status, generated papers, and assignment list.
 * 
 * Usage:
 * import { useAssignmentStore } from '@/store/assignmentStore';
 * 
 * const { assignments, setAssignmentForm } = useAssignmentStore();
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  Assignment,
  AssignmentForm,
  GeneratedPaper,
  JobProgress,
  JobStatus,
} from '@/types';

/**
 * Assignment Store State
 */
interface AssignmentState {
  // Current assignment form data
  assignmentForm: AssignmentForm;
  
  // Current job status
  jobStatus: JobStatus;
  
  // Current job progress information
  jobProgress: JobProgress | null;
  
  // Generated paper output
  generatedPaper: GeneratedPaper | null;
  
  // List of all assignments
  assignments: Assignment[];
  
  // Currently selected assignment ID
  selectedAssignmentId: string | null;
  
  // Loading states
  isLoading: boolean;
  isSubmitting: boolean;
  
  // Error state
  error: string | null;
}

/**
 * Assignment Store Actions
 */
interface AssignmentActions {
  // Form actions
  setAssignmentForm: (form: Partial<AssignmentForm>) => void;
  resetAssignmentForm: () => void;
  
  // Job status actions
  setJobStatus: (status: JobStatus) => void;
  setJobProgress: (progress: JobProgress | null) => void;
  
  // Generated paper actions
  setGeneratedPaper: (paper: GeneratedPaper | null) => void;
  
  // Assignment list actions
  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  
  // Selection actions
  setSelectedAssignmentId: (id: string | null) => void;
  getSelectedAssignment: () => Assignment | null;
  
  // Loading actions
  setIsLoading: (isLoading: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  
  // Error actions
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Reset actions
  resetStore: () => void;
}

/**
 * Combined Store Type
 */
type AssignmentStore = AssignmentState & AssignmentActions;

/**
 * Initial Form State
 */
const initialFormState: AssignmentForm = {
  uploadedFile: null,
  dueDate: null,
  questionType: 'mixed',
  questionCount: 10,
  marks: 100,
  instructions: '',
};

/**
 * Initial Store State
 */
const initialState: AssignmentState = {
  assignmentForm: initialFormState,
  jobStatus: 'idle',
  jobProgress: null,
  generatedPaper: null,
  assignments: [],
  selectedAssignmentId: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
};

/**
 * Assignment Store Hook
 * 
 * Features:
 * - Persists assignment list to localStorage
 * - DevTools integration for debugging
 * - Type-safe state and actions
 */
export const useAssignmentStore = create<AssignmentStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        ...initialState,

        // Form actions
        setAssignmentForm: (form) =>
          set(
            (state) => ({
              assignmentForm: { ...state.assignmentForm, ...form },
            }),
            false,
            'setAssignmentForm'
          ),

        resetAssignmentForm: () =>
          set(
            { assignmentForm: initialFormState },
            false,
            'resetAssignmentForm'
          ),

        // Job status actions
        setJobStatus: (status) =>
          set({ jobStatus: status }, false, 'setJobStatus'),

        setJobProgress: (progress) =>
          set({ jobProgress: progress }, false, 'setJobProgress'),

        // Generated paper actions
        setGeneratedPaper: (paper) =>
          set({ generatedPaper: paper }, false, 'setGeneratedPaper'),

        // Assignment list actions
        setAssignments: (assignments) =>
          set({ assignments }, false, 'setAssignments'),

        addAssignment: (assignment) =>
          set(
            (state) => ({
              assignments: [assignment, ...state.assignments],
            }),
            false,
            'addAssignment'
          ),

        updateAssignment: (id, updates) =>
          set(
            (state) => ({
              assignments: state.assignments.map((assignment) =>
                assignment.id === id
                  ? { ...assignment, ...updates, updatedAt: new Date() }
                  : assignment
              ),
            }),
            false,
            'updateAssignment'
          ),

        deleteAssignment: (id) =>
          set(
            (state) => ({
              assignments: state.assignments.filter(
                (assignment) => assignment.id !== id
              ),
              selectedAssignmentId:
                state.selectedAssignmentId === id
                  ? null
                  : state.selectedAssignmentId,
            }),
            false,
            'deleteAssignment'
          ),

        // Selection actions
        setSelectedAssignmentId: (id) =>
          set({ selectedAssignmentId: id }, false, 'setSelectedAssignmentId'),

        getSelectedAssignment: () => {
          const state = get();
          if (!state.selectedAssignmentId) return null;
          return (
            state.assignments.find(
              (assignment) => assignment.id === state.selectedAssignmentId
            ) || null
          );
        },

        // Loading actions
        setIsLoading: (isLoading) =>
          set({ isLoading }, false, 'setIsLoading'),

        setIsSubmitting: (isSubmitting) =>
          set({ isSubmitting }, false, 'setIsSubmitting'),

        // Error actions
        setError: (error) => set({ error }, false, 'setError'),

        clearError: () => set({ error: null }, false, 'clearError'),

        // Reset actions
        resetStore: () =>
          set(
            {
              ...initialState,
              assignments: get().assignments, // Keep assignments
            },
            false,
            'resetStore'
          ),
      }),
      {
        name: 'vedaai-assignment-storage',
        // Only persist assignments list
        partialize: (state) => ({
          assignments: state.assignments,
        }),
      }
    ),
    {
      name: 'AssignmentStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

/**
 * Selector Hooks
 * Optimized selectors for specific state slices
 */

// Get assignment form
export const useAssignmentForm = () =>
  useAssignmentStore((state) => state.assignmentForm);

// Get job status
export const useJobStatus = () =>
  useAssignmentStore((state) => state.jobStatus);

// Get job progress
export const useJobProgress = () =>
  useAssignmentStore((state) => state.jobProgress);

// Get generated paper
export const useGeneratedPaper = () =>
  useAssignmentStore((state) => state.generatedPaper);

// Get assignments list
export const useAssignments = () =>
  useAssignmentStore((state) => state.assignments);

// Get selected assignment
export const useSelectedAssignment = () =>
  useAssignmentStore((state) => state.getSelectedAssignment());

// Get loading states
export const useLoadingStates = () =>
  useAssignmentStore((state) => ({
    isLoading: state.isLoading,
    isSubmitting: state.isSubmitting,
  }));

// Get error state
export const useError = () => useAssignmentStore((state) => state.error);

// Made with Bob
