/**
 * Generation Status Component
 * 
 * Displays real-time status of assignment generation process.
 * Shows progress bar, status message, and estimated time.
 * 
 * Usage:
 * <GenerationStatus 
 *   status="generating" 
 *   progress={45} 
 *   message="Generating questions..." 
 * />
 */

'use client';

import React from 'react';
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Circle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { JobStatus } from '@/types';
import { JOB_STATUS_CONFIG } from '@/lib/constants';

interface GenerationStatusProps {
  /**
   * Current job status
   */
  status: JobStatus;
  
  /**
   * Progress percentage (0-100)
   */
  progress?: number;
  
  /**
   * Status message
   */
  message?: string;
  
  /**
   * Estimated time remaining (in seconds)
   */
  estimatedTime?: number;
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Show progress bar
   */
  showProgress?: boolean;
  
  /**
   * Compact mode (smaller size)
   */
  compact?: boolean;
}

/**
 * Get status icon based on job status
 */
const getStatusIcon = (status: JobStatus) => {
  const iconProps = { className: 'w-5 h-5' };
  
  switch (status) {
    case 'idle':
      return <Circle {...iconProps} />;
    case 'queued':
      return <Clock {...iconProps} />;
    case 'generating':
      return <Loader2 {...iconProps} className="w-5 h-5 animate-spin" />;
    case 'completed':
      return <CheckCircle2 {...iconProps} />;
    case 'failed':
      return <XCircle {...iconProps} />;
    default:
      return <Circle {...iconProps} />;
  }
};

/**
 * Format time in seconds to readable string
 */
const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Generation Status Component
 */
export const GenerationStatus: React.FC<GenerationStatusProps> = ({
  status,
  progress = 0,
  message,
  estimatedTime,
  className,
  showProgress = true,
  compact = false,
}) => {
  const statusConfig = JOB_STATUS_CONFIG[status];
  const isActive = status === 'generating' || status === 'queued';

  return (
    <div
      className={cn(
        'rounded-lg border bg-white dark:bg-neutral-900',
        compact ? 'p-3' : 'p-4',
        className
      )}
    >
      {/* Status Header */}
      <div className="flex items-center gap-3">
        {/* Status Icon */}
        <div
          className={cn(
            'flex items-center justify-center rounded-full',
            compact ? 'w-8 h-8' : 'w-10 h-10',
            statusConfig.color
          )}
        >
          {getStatusIcon(status)}
        </div>

        {/* Status Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                'font-semibold text-neutral-900 dark:text-neutral-100',
                compact ? 'text-sm' : 'text-base'
              )}
            >
              {statusConfig.label}
            </h3>
            
            {/* Progress Percentage */}
            {isActive && showProgress && (
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {progress}%
              </span>
            )}
          </div>

          {/* Status Message */}
          {message && (
            <p
              className={cn(
                'text-neutral-600 dark:text-neutral-400 truncate',
                compact ? 'text-xs' : 'text-sm'
              )}
            >
              {message}
            </p>
          )}
        </div>

        {/* Estimated Time */}
        {estimatedTime && isActive && (
          <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4" />
            <span>{formatTime(estimatedTime)}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && isActive && !compact && (
        <div className="mt-3">
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300 ease-out',
                status === 'generating'
                  ? 'bg-purple-600'
                  : 'bg-blue-600'
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Inline Status Badge
 * Compact status indicator for use in lists/cards
 */
export const StatusBadge: React.FC<{
  status: JobStatus;
  className?: string;
}> = ({ status, className }) => {
  const statusConfig = JOB_STATUS_CONFIG[status];
  const Icon = getStatusIcon(status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        statusConfig.color,
        className
      )}
    >
      {Icon}
      {statusConfig.label}
    </span>
  );
};

/**
 * Status Timeline
 * Shows progression through different statuses
 */
export const StatusTimeline: React.FC<{
  currentStatus: JobStatus;
  className?: string;
}> = ({ currentStatus, className }) => {
  const statuses: JobStatus[] = ['idle', 'queued', 'generating', 'completed'];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {statuses.map((status, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        const statusConfig = JOB_STATUS_CONFIG[status];

        return (
          <React.Fragment key={status}>
            {/* Status Step */}
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors',
                isActive && statusConfig.color,
                isCompleted && 'bg-green-100 text-green-700',
                !isActive && !isCompleted && 'bg-neutral-100 text-neutral-400'
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Connector Line */}
            {index < statuses.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 transition-colors',
                  isCompleted ? 'bg-green-600' : 'bg-neutral-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default GenerationStatus;

// Made with Bob
