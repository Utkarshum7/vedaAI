/**
 * Queue Indicator Component
 * 
 * Displays the current position in the generation queue.
 * Shows queue position, estimated wait time, and queue status.
 * 
 * Usage:
 * <QueueIndicator position={3} estimatedTime={120} />
 */

'use client';

import React from 'react';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QueueIndicatorProps {
  /**
   * Current position in queue (1-based)
   */
  position: number;
  
  /**
   * Estimated wait time in seconds
   */
  estimatedTime?: number;
  
  /**
   * Total queue size
   */
  totalInQueue?: number;
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Compact mode
   */
  compact?: boolean;
  
  /**
   * Show detailed info
   */
  showDetails?: boolean;
}

/**
 * Format time in seconds to readable string
 */
const formatWaitTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds} seconds`;
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

/**
 * Get queue status color based on position
 */
const getQueueColor = (position: number): string => {
  if (position === 1) return 'text-green-600 bg-green-50 border-green-200';
  if (position <= 3) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (position <= 10) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-orange-600 bg-orange-50 border-orange-200';
};

/**
 * Queue Indicator Component
 */
export const QueueIndicator: React.FC<QueueIndicatorProps> = ({
  position,
  estimatedTime,
  totalInQueue,
  className,
  compact = false,
  showDetails = true,
}) => {
  const queueColor = getQueueColor(position);
  const isNextInLine = position === 1;

  return (
    <div
      className={cn(
        'rounded-lg border bg-white dark:bg-neutral-900',
        queueColor,
        compact ? 'p-3' : 'p-4',
        className
      )}
    >
      {/* Main Queue Info */}
      <div className="flex items-center gap-3">
        {/* Queue Icon */}
        <div
          className={cn(
            'flex items-center justify-center rounded-full',
            compact ? 'w-10 h-10' : 'w-12 h-12',
            queueColor
          )}
        >
          <Users className={compact ? 'w-5 h-5' : 'w-6 h-6'} />
        </div>

        {/* Queue Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h3
              className={cn(
                'font-bold text-neutral-900 dark:text-neutral-100',
                compact ? 'text-lg' : 'text-2xl'
              )}
            >
              #{position}
            </h3>
            <span
              className={cn(
                'text-neutral-600 dark:text-neutral-400',
                compact ? 'text-xs' : 'text-sm'
              )}
            >
              in queue
            </span>
          </div>

          {isNextInLine && (
            <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-0.5">
              You're next! 🎉
            </p>
          )}
        </div>

        {/* Estimated Time Badge */}
        {estimatedTime && (
          <div
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border',
              compact ? 'text-xs' : 'text-sm'
            )}
          >
            <Clock className="w-4 h-4" />
            <span className="font-medium">{formatWaitTime(estimatedTime)}</span>
          </div>
        )}
      </div>

      {/* Additional Details */}
      {showDetails && !compact && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-2 gap-4">
            {/* Total in Queue */}
            {totalInQueue && (
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  {totalInQueue} total in queue
                </span>
              </div>
            )}

            {/* Progress Indicator */}
            {totalInQueue && (
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.max(
                        10,
                        ((totalInQueue - position + 1) / totalInQueue) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Compact Queue Badge
 * Minimal queue indicator for use in headers/cards
 */
export const QueueBadge: React.FC<{
  position: number;
  className?: string;
}> = ({ position, className }) => {
  const queueColor = getQueueColor(position);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        queueColor,
        className
      )}
    >
      <Users className="w-3.5 h-3.5" />
      <span>#{position} in queue</span>
    </span>
  );
};

/**
 * Queue Status Message
 * Informational message about queue status
 */
export const QueueStatusMessage: React.FC<{
  position: number;
  estimatedTime?: number;
  className?: string;
}> = ({ position, estimatedTime, className }) => {
  const getMessage = () => {
    if (position === 1) {
      return 'Your assignment is being processed now!';
    }
    if (position <= 3) {
      return 'Your assignment will be processed soon.';
    }
    if (position <= 10) {
      return 'Your assignment is in the queue.';
    }
    return 'Your assignment is queued. Please wait.';
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800',
        className
      )}
    >
      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {getMessage()}
        </p>
        {estimatedTime && (
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Estimated wait time: {formatWaitTime(estimatedTime)}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Queue Animation
 * Animated queue visualization
 */
export const QueueAnimation: React.FC<{
  position: number;
  className?: string;
}> = ({ position, className }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: Math.min(position, 5) }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-3 h-3 rounded-full transition-all duration-300',
            index === 0
              ? 'bg-blue-600 animate-pulse'
              : 'bg-neutral-300 dark:bg-neutral-700'
          )}
          style={{
            animationDelay: `${index * 200}ms`,
          }}
        />
      ))}
      {position > 5 && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          +{position - 5} more
        </span>
      )}
    </div>
  );
};

export default QueueIndicator;

// Made with Bob
