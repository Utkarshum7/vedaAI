/**
 * Create Assignment Page
 * 
 * Page for creating new AI-generated assignments.
 * Contains the assignment form with validation and submission.
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout, ContentContainer, PageHeader } from '@/components/layout';
import { AssignmentForm } from '@/components/forms';
import { GenerationStatus, QueueIndicator } from '@/components/status';
import { useAssignmentStore } from '@/store/assignmentStore';
import type { AssignmentForm as AssignmentFormType } from '@/types';
import { ROUTES } from '@/lib/constants';

/**
 * Create Assignment Page Component
 */
export default function CreateAssignmentPage() {
  const router = useRouter();
  const {
    setAssignmentForm,
    setJobStatus,
    setIsSubmitting,
    isSubmitting,
    jobStatus,
    jobProgress,
  } = useAssignmentStore();

  const [showStatus, setShowStatus] = React.useState(false);

  /**
   * Handle form submission
   */
  const handleSubmit = async (data: AssignmentFormType) => {
    try {
      setIsSubmitting(true);
      setAssignmentForm(data);
      setShowStatus(true);

      // TODO: Replace with actual API call
      console.log('Submitting assignment:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update status
      setJobStatus('queued');

      // TODO: Connect to Socket.io for real-time updates
      // For now, simulate status progression
      setTimeout(() => setJobStatus('generating'), 3000);
      setTimeout(() => {
        setJobStatus('completed');
        setIsSubmitting(false);
        // Redirect to output page after completion
        setTimeout(() => router.push(ROUTES.OUTPUT), 1000);
      }, 8000);

    } catch (error) {
      console.error('Error creating assignment:', error);
      setJobStatus('failed');
      setIsSubmitting(false);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <DashboardLayout>
      <ContentContainer className="max-w-4xl">
        {/* Page Header */}
        <PageHeader
          title="Create Assignment"
          description="Upload your study material and let AI generate a customized assignment"
        />

        {/* Form or Status Display */}
        {!showStatus ? (
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <AssignmentForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Generation Status */}
            <GenerationStatus
              status={jobStatus}
              progress={jobProgress?.progress || 0}
              message={jobProgress?.message || 'Processing your request...'}
              estimatedTime={jobProgress?.estimatedTime}
            />

            {/* Queue Indicator */}
            {jobStatus === 'queued' && jobProgress?.queuePosition && (
              <QueueIndicator
                position={jobProgress.queuePosition}
                estimatedTime={jobProgress.estimatedTime}
                totalInQueue={jobProgress.queuePosition + 5}
              />
            )}

            {/* Info Card */}
            <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What's happening?
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>• Analyzing your study material</li>
                <li>• Identifying key concepts and topics</li>
                <li>• Generating questions based on difficulty level</li>
                <li>• Creating a well-structured assignment</li>
              </ul>
            </div>

            {/* Cancel Button */}
            {jobStatus !== 'completed' && jobStatus !== 'failed' && (
              <div className="flex justify-center">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Cancel and Go Back
                </button>
              </div>
            )}

            {/* Error State */}
            {jobStatus === 'failed' && (
              <div className="p-6 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                  Generation Failed
                </h3>
                <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                  We encountered an error while generating your assignment. Please try again.
                </p>
                <button
                  onClick={() => {
                    setShowStatus(false);
                    setJobStatus('idle');
                  }}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </ContentContainer>
    </DashboardLayout>
  );
}

// Made with Bob
