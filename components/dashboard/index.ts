/**
 * Dashboard Components Barrel Export
 *
 * Centralized export for all dashboard-related components.
 */

export {
  EmptyState,
  NoAssignmentsState,
  SearchEmptyState,
  ErrorEmptyState,
} from './EmptyState';

export {
  AssignmentCard,
  AssignmentCardSkeleton,
} from './AssignmentCard';

// Screen 2 Components
export { AssignmentCard as AssignmentCardV2, type Assignment } from './assignment-card';
export { AssignmentsGrid } from './assignments-grid';
export { AssignmentsHeader } from './assignments-header';
export { FloatingActionButton } from './floating-action-button';

// Screen 3 Components (Create Assignment Form)
export { StepIndicator } from './step-indicator';
export { FileUpload } from './file-upload';
export { DatePickerField } from './date-picker-field';
export { NumberStepper } from './number-stepper';
export { QuestionTypeRow, type QuestionType } from './question-type-row';
export { QuestionTypeBuilder } from './question-type-builder';
export { FormNavigation } from './form-navigation';
export { FormSection } from './form-section';

// Screen 4 Components (AI Question Paper Preview)
export { AIResponseBanner } from './ai-response-banner';
export { QuestionPaperPreview, type QuestionPaperData, type QuestionItem, type AnswerItem } from './question-paper-preview';

// Made with Bob
