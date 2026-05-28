/**
 * Assignment Form Component
 * 
 * Form for creating new assignments with file upload, validation, and submission.
 * Uses React Hook Form with Zod validation.
 * 
 * Usage:
 * <AssignmentForm onSubmit={handleSubmit} />
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Upload, 
  Calendar, 
  Hash, 
  FileText, 
  Award,
  X,
  AlertCircle,
} from 'lucide-react';
import { cn, formatFileSize, validateFileType, validateFileSize } from '@/lib/utils';
import type { AssignmentForm as AssignmentFormType } from '@/types';
import { QUESTION_TYPES, VALIDATION_RULES } from '@/lib/constants';

/**
 * Form validation schema
 */
const assignmentSchema = z.object({
  uploadedFile: z
    .instanceof(File, { message: 'Please upload a file' })
    .refine(
      (file) => validateFileSize(file, VALIDATION_RULES.FILE.MAX_SIZE),
      `File size must be less than ${formatFileSize(VALIDATION_RULES.FILE.MAX_SIZE)}`
    )
    .refine(
      (file) => validateFileType(file, [...VALIDATION_RULES.FILE.ALLOWED_TYPES]),
      'Only PDF, DOCX, and TXT files are allowed'
    ),
  dueDate: z.date({ message: 'Due date is required' }),
  questionType: z.string().min(1, 'Question type is required'),
  questionCount: z
    .number()
    .min(VALIDATION_RULES.QUESTION_COUNT.MIN, `Minimum ${VALIDATION_RULES.QUESTION_COUNT.MIN} question`)
    .max(VALIDATION_RULES.QUESTION_COUNT.MAX, `Maximum ${VALIDATION_RULES.QUESTION_COUNT.MAX} questions`),
  marks: z
    .number()
    .min(VALIDATION_RULES.MARKS.MIN, `Minimum ${VALIDATION_RULES.MARKS.MIN} mark`)
    .max(VALIDATION_RULES.MARKS.MAX, `Maximum ${VALIDATION_RULES.MARKS.MAX} marks`),
  instructions: z
    .string()
    .max(VALIDATION_RULES.INSTRUCTIONS.MAX_LENGTH, `Maximum ${VALIDATION_RULES.INSTRUCTIONS.MAX_LENGTH} characters`),
});

type FormData = z.infer<typeof assignmentSchema>;

interface AssignmentFormProps {
  /**
   * Form submission handler
   */
  onSubmit: (data: AssignmentFormType) => void | Promise<void>;
  
  /**
   * Initial form values
   */
  defaultValues?: Partial<AssignmentFormType>;
  
  /**
   * Loading state
   */
  isLoading?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Assignment Form Component
 */
export const AssignmentForm: React.FC<AssignmentFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading = false,
  className,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(defaultValues?.uploadedFile || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      questionType: defaultValues?.questionType || 'mixed',
      questionCount: defaultValues?.questionCount || VALIDATION_RULES.QUESTION_COUNT.DEFAULT,
      marks: defaultValues?.marks || VALIDATION_RULES.MARKS.DEFAULT,
      instructions: defaultValues?.instructions || '',
    },
  });

  const questionCount = watch('questionCount');
  const marks = watch('marks');

  /**
   * Handle file selection
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('uploadedFile', file, { shouldValidate: true });
    }
  };

  /**
   * Remove selected file
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue('uploadedFile', null as any);
  };

  /**
   * Handle form submission
   */
  const handleFormSubmit = async (data: FormData) => {
    await onSubmit({
      uploadedFile: data.uploadedFile,
      dueDate: data.dueDate,
      questionType: data.questionType as any,
      questionCount: data.questionCount,
      marks: data.marks,
      instructions: data.instructions,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('space-y-6', className)}
    >
      {/* File Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Upload Study Material
          <span className="text-red-500 ml-1">*</span>
        </label>
        
        {!selectedFile ? (
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="sr-only"
              id="file-upload"
              disabled={isLoading}
            />
            <label
              htmlFor="file-upload"
              className={cn(
                'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
                errors.uploadedFile
                  ? 'border-red-300 bg-red-50 dark:bg-red-950'
                  : 'border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900',
                isLoading && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Upload className="w-8 h-8 text-neutral-400 mb-2" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                PDF, DOCX, or TXT (max {formatFileSize(VALIDATION_RULES.FILE.MAX_SIZE)})
              </p>
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900">
            <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              disabled={isLoading}
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {errors.uploadedFile && (
          <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            {errors.uploadedFile.message}
          </p>
        )}
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <label htmlFor="dueDate" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Due Date
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="date"
            id="dueDate"
            {...register('dueDate', { valueAsDate: true })}
            disabled={isLoading}
            className={cn(
              'w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.dueDate
                ? 'border-red-300 dark:border-red-700'
                : 'border-neutral-300 dark:border-neutral-700'
            )}
          />
        </div>
        {errors.dueDate && (
          <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            {errors.dueDate.message}
          </p>
        )}
      </div>

      {/* Question Type */}
      <div className="space-y-2">
        <label htmlFor="questionType" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Question Type
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="questionType"
          {...register('questionType')}
          disabled={isLoading}
          className={cn(
            'w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            errors.questionType
              ? 'border-red-300 dark:border-red-700'
              : 'border-neutral-300 dark:border-neutral-700'
          )}
        >
          {QUESTION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.questionType && (
          <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            {errors.questionType.message}
          </p>
        )}
      </div>

      {/* Question Count & Marks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Question Count */}
        <div className="space-y-2">
          <label htmlFor="questionCount" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Number of Questions
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="number"
              id="questionCount"
              {...register('questionCount', { valueAsNumber: true })}
              disabled={isLoading}
              min={VALIDATION_RULES.QUESTION_COUNT.MIN}
              max={VALIDATION_RULES.QUESTION_COUNT.MAX}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                errors.questionCount
                  ? 'border-red-300 dark:border-red-700'
                  : 'border-neutral-300 dark:border-neutral-700'
              )}
            />
          </div>
          {errors.questionCount && (
            <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              {errors.questionCount.message}
            </p>
          )}
        </div>

        {/* Total Marks */}
        <div className="space-y-2">
          <label htmlFor="marks" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Total Marks
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="number"
              id="marks"
              {...register('marks', { valueAsNumber: true })}
              disabled={isLoading}
              min={VALIDATION_RULES.MARKS.MIN}
              max={VALIDATION_RULES.MARKS.MAX}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                errors.marks
                  ? 'border-red-300 dark:border-red-700'
                  : 'border-neutral-300 dark:border-neutral-700'
              )}
            />
          </div>
          {errors.marks && (
            <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              {errors.marks.message}
            </p>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <label htmlFor="instructions" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          {...register('instructions')}
          disabled={isLoading}
          rows={4}
          placeholder="Enter any special instructions for the assignment..."
          className={cn(
            'w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none',
            errors.instructions
              ? 'border-red-300 dark:border-red-700'
              : 'border-neutral-300 dark:border-neutral-700'
          )}
        />
        {errors.instructions && (
          <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            {errors.instructions.message}
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          Assignment Summary
        </h4>
        <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <p>• {questionCount} questions will be generated</p>
          <p>• Total marks: {marks}</p>
          <p>• Marks per question: ~{(marks / questionCount).toFixed(1)}</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors',
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isLoading ? 'Generating...' : 'Generate Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;

// Made with Bob
