/**
 * Student Info Component
 * 
 * Displays student information section on the question paper.
 * Includes fields for name, roll number, class, and date.
 * 
 * Usage:
 * <StudentInfo studentInfo={studentData} />
 */

import React from 'react';
import { cn, formatDate } from '@/lib/utils';
import type { StudentInfo as StudentInfoType } from '@/types';
import { User, Hash, GraduationCap, Calendar } from 'lucide-react';

interface StudentInfoProps {
  /**
   * Student information (optional - can be blank for filling)
   */
  studentInfo?: StudentInfoType;
  
  /**
   * Show as editable fields
   */
  editable?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Student Info Component
 */
export const StudentInfo: React.FC<StudentInfoProps> = ({
  studentInfo,
  editable = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-6',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Student Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <User className="w-4 h-4" />
            Name
          </label>
          {editable ? (
            <div className="border-b-2 border-neutral-400 dark:border-neutral-600 pb-1">
              <input
                type="text"
                defaultValue={studentInfo?.name || ''}
                placeholder="Enter your name"
                className="w-full bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          ) : (
            <p className="text-neutral-900 dark:text-neutral-100">
              {studentInfo?.name || 'N/A'}
            </p>
          )}
        </div>

        {/* Roll Number */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Hash className="w-4 h-4" />
            Roll Number
          </label>
          {editable ? (
            <div className="border-b-2 border-neutral-400 dark:border-neutral-600 pb-1">
              <input
                type="text"
                defaultValue={studentInfo?.rollNumber || ''}
                placeholder="Enter roll number"
                className="w-full bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          ) : (
            <p className="text-neutral-900 dark:text-neutral-100">
              {studentInfo?.rollNumber || 'N/A'}
            </p>
          )}
        </div>

        {/* Class */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <GraduationCap className="w-4 h-4" />
            Class
          </label>
          {editable ? (
            <div className="border-b-2 border-neutral-400 dark:border-neutral-600 pb-1">
              <input
                type="text"
                defaultValue={studentInfo?.class || ''}
                placeholder="Enter class"
                className="w-full bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          ) : (
            <p className="text-neutral-900 dark:text-neutral-100">
              {studentInfo?.class || 'N/A'}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          {editable ? (
            <div className="border-b-2 border-neutral-400 dark:border-neutral-600 pb-1">
              <input
                type="text"
                defaultValue={studentInfo?.date ? formatDate(studentInfo.date) : ''}
                placeholder="Enter date"
                className="w-full bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          ) : (
            <p className="text-neutral-900 dark:text-neutral-100">
              {studentInfo?.date ? formatDate(studentInfo.date) : 'N/A'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Compact Student Info
 * Minimal student info display for headers
 */
export const CompactStudentInfo: React.FC<{
  studentInfo?: StudentInfoType;
  className?: string;
}> = ({ studentInfo, className }) => {
  if (!studentInfo) return null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400',
        className
      )}
    >
      {studentInfo.name && (
        <div className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          <span>{studentInfo.name}</span>
        </div>
      )}
      {studentInfo.rollNumber && (
        <div className="flex items-center gap-1.5">
          <Hash className="w-4 h-4" />
          <span>{studentInfo.rollNumber}</span>
        </div>
      )}
      {studentInfo.class && (
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4" />
          <span>{studentInfo.class}</span>
        </div>
      )}
      {studentInfo.date && (
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(studentInfo.date)}</span>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;

// Made with Bob
