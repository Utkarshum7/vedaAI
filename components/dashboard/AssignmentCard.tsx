/**
 * Assignment Card Component
 * 
 * Displays assignment information in a card format.
 * Shows status, metadata, and action buttons.
 * 
 * Usage:
 * <AssignmentCard assignment={assignmentData} />
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Eye, 
  Download, 
  Trash2, 
  MoreVertical,
  Calendar,
  FileText,
  Hash,
} from 'lucide-react';
import { cn, formatDate, formatRelativeTime } from '@/lib/utils';
import type { Assignment } from '@/types';
import { StatusBadge } from '@/components/status';
import { ROUTES } from '@/lib/constants';

interface AssignmentCardProps {
  /**
   * Assignment data
   */
  assignment: Assignment;
  
  /**
   * View handler
   */
  onView?: (id: string) => void;
  
  /**
   * Download handler
   */
  onDownload?: (id: string) => void;
  
  /**
   * Delete handler
   */
  onDelete?: (id: string) => void;
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Assignment Card Component
 */
export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onView,
  onDownload,
  onDelete,
  className,
}) => {
  const { id, form, status, paper, createdAt } = assignment;
  const isCompleted = status === 'completed';
  const canView = isCompleted && paper;

  return (
    <div
      className={cn(
        'group relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 transition-all hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1 truncate">
            Assignment #{id.slice(0, 8)}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Created {formatRelativeTime(createdAt)}
          </p>
        </div>
        
        {/* Status Badge */}
        <StatusBadge status={status} />
      </div>

      {/* Metadata */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <FileText className="w-4 h-4" />
          <span>{form.questionType.replace('-', ' ')}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <Hash className="w-4 h-4" />
          <span>{form.questionCount} questions</span>
          <span className="text-neutral-400">•</span>
          <span>{form.marks} marks</span>
        </div>
        
        {form.dueDate && (
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar className="w-4 h-4" />
            <span>Due: {formatDate(form.dueDate)}</span>
          </div>
        )}
      </div>

      {/* Instructions Preview */}
      {form.instructions && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
          {form.instructions}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        {/* View Button */}
        {canView ? (
          <Link
            href={`${ROUTES.OUTPUT}?id=${id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Paper
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            <Eye className="w-4 h-4" />
            View Paper
          </button>
        )}

        {/* Download Button */}
        {canView && onDownload && (
          <button
            onClick={() => onDownload(id)}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            aria-label="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        )}

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-colors ml-auto"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {/* More Options */}
        <button
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/**
 * Assignment Card Skeleton
 * Loading placeholder for assignment cards
 */
export const AssignmentCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
      <div className="animate-pulse space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
          </div>
          <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex-1" />
          <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;

// Made with Bob
