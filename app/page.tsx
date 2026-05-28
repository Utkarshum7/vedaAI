/**
 * Dashboard Page (Root Route) - v0 Integration
 * 
 * Main dashboard displaying all assignments.
 * Shows assignment list or empty state.
 * 
 * v0 Integration Notes:
 * - Simple, clean structure
 * - Centered empty state
 * - Ready to display assignments when available
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import { EmptyState } from '@/components/dashboard';
import { AssignmentCard } from '@/components/dashboard';
import { useAssignments } from '@/store/assignmentStore';
import { ROUTES } from '@/lib/constants';

/**
 * Dashboard Page Component (v0)
 */
export default function Page() {
  const router = useRouter();
  const assignments = useAssignments();

  // Show empty state when no assignments
  if (assignments.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <EmptyState
            title="No assignments yet"
            description="Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading."
            actionLabel="Create Your First Assignment"
            onAction={() => router.push(ROUTES.CREATE)}
          />
        </div>
      </DashboardLayout>
    );
  }

  // Show assignments grid when assignments exist
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and view all your AI-generated assignments
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onDelete={(id) => console.log('Delete:', id)}
              onDownload={(id) => console.log('Download:', id)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// Made with Bob
