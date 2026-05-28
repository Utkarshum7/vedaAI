/**
 * Difficulty Badge Component
 * 
 * Displays difficulty level with appropriate styling.
 * Used in question items and paper sections.
 * 
 * Usage:
 * <DifficultyBadge difficulty="medium" />
 */

import React from 'react';
import { cn, getDifficultyColor } from '@/lib/utils';
import type { DifficultyLevel } from '@/types';
import { DIFFICULTY_LEVELS } from '@/lib/constants';

interface DifficultyBadgeProps {
  /**
   * Difficulty level
   */
  difficulty: DifficultyLevel;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Show icon
   */
  showIcon?: boolean;
}

/**
 * Difficulty Badge Component
 */
export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  size = 'md',
  className,
  showIcon = false,
}) => {
  const config = DIFFICULTY_LEVELS.find((d) => d.value === difficulty);
  const label = config?.label || difficulty;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        getDifficultyColor(difficulty),
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
      )}
      {label}
    </span>
  );
};

export default DifficultyBadge;

// Made with Bob
