/**
 * Section Block Component
 * 
 * Groups questions by section with section header and instructions.
 * Displays total marks and question count for the section.
 * 
 * Usage:
 * <SectionBlock section={sectionData} startIndex={1} />
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { PaperSection } from '@/types';
import { QuestionItem } from './QuestionItem';

interface SectionBlockProps {
  /**
   * Section data
   */
  section: PaperSection;
  
  /**
   * Starting question number
   */
  startIndex: number;
  
  /**
   * Show difficulty badges
   */
  showDifficulty?: boolean;
  
  /**
   * Show marks
   */
  showMarks?: boolean;
  
  /**
   * Show answers (for answer key)
   */
  showAnswers?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Section Block Component
 */
export const SectionBlock: React.FC<SectionBlockProps> = ({
  section,
  startIndex,
  showDifficulty = true,
  showMarks = true,
  showAnswers = false,
  className,
}) => {
  const { title, instructions, questions, totalMarks } = section;

  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden',
        className
      )}
    >
      {/* Section Header */}
      <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              {title}
            </h2>
            {instructions && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {instructions}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}
            </div>
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {totalMarks} Marks
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="p-6 space-y-4">
        {questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            question={question}
            index={startIndex + index}
            showDifficulty={showDifficulty}
            showMarks={showMarks}
            showAnswer={showAnswers}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Section Summary
 * Compact section overview for table of contents
 */
export const SectionSummary: React.FC<{
  section: PaperSection;
  sectionNumber: number;
  className?: string;
}> = ({ section, sectionNumber, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold">
          {sectionNumber}
        </span>
        <div>
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
            {section.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {section.questions.length} questions
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {section.totalMarks}
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          marks
        </div>
      </div>
    </div>
  );
};

export default SectionBlock;

// Made with Bob
