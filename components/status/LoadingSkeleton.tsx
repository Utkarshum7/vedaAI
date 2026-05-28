/**
 * Loading Skeleton Component
 * 
 * Displays animated loading placeholders while content is being fetched.
 * Provides visual feedback during data loading states.
 * 
 * Usage:
 * <LoadingSkeleton variant="card" count={3} />
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  /**
   * Skeleton variant/type
   */
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'input' | 'custom';
  
  /**
   * Number of skeleton items to render
   */
  count?: number;
  
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Custom width (for custom variant)
   */
  width?: string;
  
  /**
   * Custom height (for custom variant)
   */
  height?: string;
}

/**
 * Base skeleton element with animation
 */
const SkeletonBase: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => (
  <div
    className={cn(
      'animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded',
      className
    )}
    style={style}
  />
);

/**
 * Text skeleton (single line)
 */
const TextSkeleton: React.FC = () => (
  <div className="space-y-2">
    <SkeletonBase className="h-4 w-full" />
  </div>
);

/**
 * Card skeleton (assignment card placeholder)
 */
const CardSkeleton: React.FC = () => (
  <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 space-y-4">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <SkeletonBase className="h-6 w-3/4" />
        <SkeletonBase className="h-4 w-1/2" />
      </div>
      <SkeletonBase className="h-8 w-20" />
    </div>
    
    {/* Content */}
    <div className="space-y-2">
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-5/6" />
    </div>
    
    {/* Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <SkeletonBase className="h-4 w-32" />
      <div className="flex gap-2">
        <SkeletonBase className="h-8 w-8 rounded-full" />
        <SkeletonBase className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

/**
 * Avatar skeleton (circular)
 */
const AvatarSkeleton: React.FC = () => (
  <SkeletonBase className="h-10 w-10 rounded-full" />
);

/**
 * Button skeleton
 */
const ButtonSkeleton: React.FC = () => (
  <SkeletonBase className="h-10 w-24 rounded-md" />
);

/**
 * Input skeleton
 */
const InputSkeleton: React.FC = () => (
  <div className="space-y-2">
    <SkeletonBase className="h-4 w-24" />
    <SkeletonBase className="h-10 w-full rounded-md" />
  </div>
);

/**
 * Main Loading Skeleton Component
 */
export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'card',
  count = 1,
  className,
  width,
  height,
}) => {
  // Render custom skeleton
  if (variant === 'custom') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonBase
            key={index}
            className={className}
            style={{ width, height }}
          />
        ))}
      </div>
    );
  }

  // Render variant-specific skeletons
  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return <TextSkeleton />;
      case 'card':
        return <CardSkeleton />;
      case 'avatar':
        return <AvatarSkeleton />;
      case 'button':
        return <ButtonSkeleton />;
      case 'input':
        return <InputSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

/**
 * Specialized skeleton components for common use cases
 */

/**
 * Dashboard skeleton (multiple cards)
 */
export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <SkeletonBase className="h-8 w-48" />
      <SkeletonBase className="h-10 w-32 rounded-md" />
    </div>
    <LoadingSkeleton variant="card" count={3} />
  </div>
);

/**
 * Form skeleton
 */
export const FormSkeleton: React.FC = () => (
  <div className="space-y-6">
    <SkeletonBase className="h-8 w-64" />
    <LoadingSkeleton variant="input" count={5} />
    <div className="flex gap-4">
      <SkeletonBase className="h-10 w-24 rounded-md" />
      <SkeletonBase className="h-10 w-24 rounded-md" />
    </div>
  </div>
);

/**
 * Table skeleton
 */
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-2">
    {/* Header */}
    <div className="flex gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
      <SkeletonBase className="h-4 w-1/4" />
      <SkeletonBase className="h-4 w-1/4" />
      <SkeletonBase className="h-4 w-1/4" />
      <SkeletonBase className="h-4 w-1/4" />
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex gap-4 py-3">
        <SkeletonBase className="h-4 w-1/4" />
        <SkeletonBase className="h-4 w-1/4" />
        <SkeletonBase className="h-4 w-1/4" />
        <SkeletonBase className="h-4 w-1/4" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;

// Made with Bob
