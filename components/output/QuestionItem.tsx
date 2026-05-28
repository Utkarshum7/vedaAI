/**
 * Question Item Component
 * 
 * Displays a single question with options, marks, and difficulty.
 * Supports different question types (MCQ, short answer, etc.).
 * 
 * Usage:
 * <QuestionItem question={questionData} index={1} />
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { Question } from '@/types';
import { DifficultyBadge } from './DifficultyBadge';

interface QuestionItemProps {
  /**
   * Question data
   */
  question: Question;
  
  /**
   * Question number/index
   */
  index: number;
  
  /**
   * Show difficulty badge
   */
  showDifficulty?: boolean;
  
  /**
   * Show marks
   */
  showMarks?: boolean;
  
  /**
   * Show correct answer (for answer key)
   */
  showAnswer?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Question Item Component
 */
export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  showDifficulty = true,
  showMarks = true,
  showAnswer = false,
  className,
}) => {
  const { type, difficulty, question: questionText, options, correctAnswer, marks } = question;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900',
        className
      )}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold">
              {index}
            </span>
            {showDifficulty && (
              <DifficultyBadge difficulty={difficulty} size="sm" />
            )}
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
              {type.replace('-', ' ')}
            </span>
          </div>
        </div>
        {showMarks && (
          <div className="flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <span>{marks}</span>
            <span className="text-neutral-500 dark:text-neutral-400">
              {marks === 1 ? 'mark' : 'marks'}
            </span>
          </div>
        )}
      </div>

      {/* Question Text */}
      <div className="mb-4">
        <p className="text-base text-neutral-900 dark:text-neutral-100 leading-relaxed">
          {questionText}
        </p>
      </div>

      {/* Options (for MCQ) */}
      {options && options.length > 0 && (
        <div className="space-y-2 mb-4">
          {options.map((option, optionIndex) => {
            const optionLabel = String.fromCharCode(65 + optionIndex); // A, B, C, D
            const isCorrect = showAnswer && option === correctAnswer;

            return (
              <div
                key={optionIndex}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                  isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900'
                )}
              >
                <span
                  className={cn(
                    'flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium flex-shrink-0',
                    isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                  )}
                >
                  {optionLabel}
                </span>
                <span
                  className={cn(
                    'text-sm flex-1',
                    isCorrect
                      ? 'text-green-900 dark:text-green-100 font-medium'
                      : 'text-neutral-700 dark:text-neutral-300'
                  )}
                >
                  {option}
                </span>
                {isCorrect && (
                  <span className="text-xs font-medium text-green-700 dark:text-green-300">
                    Correct
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Answer Space (for non-MCQ) */}
      {!options && type !== 'multiple-choice' && (
        <div className="mt-4 p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">
            {type === 'short-answer' && 'Write your answer here (2-3 lines)'}
            {type === 'long-answer' && 'Write your detailed answer here'}
            {type === 'true-false' && 'Circle: True / False'}
            {type === 'fill-in-blank' && 'Fill in the blank'}
          </p>
        </div>
      )}

      {/* Correct Answer (if shown) */}
      {showAnswer && correctAnswer && !options && (
        <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm">
            <span className="font-medium text-green-900 dark:text-green-100">
              Answer:
            </span>{' '}
            <span className="text-green-800 dark:text-green-200">
              {correctAnswer}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;

// Made with Bob
