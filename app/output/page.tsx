/**
 * Output Page
 * 
 * Displays the generated assignment/question paper.
 * Shows student info, sections, questions, and export options.
 */

import { Suspense } from 'react';
import { OutputContent } from './OutputContent';
import { DashboardLayout, ContentContainer } from '@/components/layout';
import { LoadingSkeleton } from '@/components/status';

/**
 * Loading fallback component
 */
function OutputLoading() {
  return (
    <DashboardLayout>
      <ContentContainer className="max-w-5xl">
        <LoadingSkeleton variant="card" count={3} />
      </ContentContainer>
    </DashboardLayout>
  );
}

/**
 * Output Page Component
 * Wraps OutputContent in Suspense boundary for useSearchParams
 */
export default function OutputPage() {
  return (
    <Suspense fallback={<OutputLoading />}>
      <OutputContent />
    </Suspense>
  );
}

// Made with Bob
