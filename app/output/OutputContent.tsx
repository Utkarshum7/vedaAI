'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, Printer, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout, ContentContainer, PageHeader } from '@/components/layout';
import { StudentInfo, SectionBlock } from '@/components/output';
import { LoadingSkeleton } from '@/components/status';
import { useGeneratedPaper } from '@/store/assignmentStore';
import { ROUTES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

/**
 * Output Content Component
 * Contains useSearchParams logic - must be wrapped in Suspense
 */
export function OutputContent() {
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get('id');
  const generatedPaper = useGeneratedPaper();
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading (replace with actual API call)
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [assignmentId]);

  /**
   * Handle download
   */
  const handleDownload = () => {
    // TODO: Implement PDF download
    console.log('Download assignment');
  };

  /**
   * Handle print
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * Handle share
   */
  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share assignment');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <ContentContainer className="max-w-5xl">
          <LoadingSkeleton variant="card" count={3} />
        </ContentContainer>
      </DashboardLayout>
    );
  }

  if (!generatedPaper) {
    return (
      <DashboardLayout>
        <ContentContainer className="max-w-5xl">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              No Assignment Found
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              The assignment you're looking for doesn't exist or hasn't been generated yet.
            </p>
            <Link
              href={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
        </ContentContainer>
      </DashboardLayout>
    );
  }

  const { metadata, sections, studentInfo } = generatedPaper;
  let questionIndex = 1;

  return (
    <DashboardLayout>
      <ContentContainer className="max-w-5xl">
        {/* Page Header */}
        <PageHeader
          title="Generated Assignment"
          description={`Created on ${formatDate(metadata.createdAt)}`}
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                aria-label="Print"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          }
        />

        {/* Assignment Paper */}
        <div className="space-y-6 print:space-y-8">
          {/* Paper Header */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-8 print:border-0">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {metadata.title}
              </h1>
              {metadata.subject && (
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  {metadata.subject}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              <div>
                <span className="font-medium">Total Marks:</span> {metadata.totalMarks}
              </div>
              {metadata.duration && (
                <div>
                  <span className="font-medium">Duration:</span> {metadata.duration} minutes
                </div>
              )}
              {metadata.dueDate && (
                <div>
                  <span className="font-medium">Due Date:</span> {formatDate(metadata.dueDate)}
                </div>
              )}
            </div>

            {/* Instructions */}
            {metadata.instructions && (
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Instructions:
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                  {metadata.instructions}
                </p>
              </div>
            )}
          </div>

          {/* Student Information */}
          <StudentInfo studentInfo={studentInfo} editable={true} />

          {/* Sections */}
          {sections.map((section) => {
            const startIndex = questionIndex;
            questionIndex += section.questions.length;
            
            return (
              <SectionBlock
                key={section.id}
                section={section}
                startIndex={startIndex}
                showDifficulty={true}
                showMarks={true}
              />
            );
          })}

          {/* Footer */}
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-6 print:hidden">
            <p>Generated by VedaAI • AI-Powered Assignment Generation</p>
          </div>
        </div>
      </ContentContainer>
    </DashboardLayout>
  );
}

// Made with Bob
