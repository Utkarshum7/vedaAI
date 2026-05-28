/**
 * Empty State Component (v0 Integration)
 * 
 * Displays when there's no data to show with Figma-perfect design from v0.
 * Includes custom SVG illustration and action button.
 * 
 * Usage:
 * <EmptyState 
 *   title="No assignments yet" 
 *   onAction={() => router.push('/create')}
 * />
 */

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  title = "No assignments yet",
  description = "Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.",
  actionLabel = "Create Your First Assignment",
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-4 py-20 text-center",
        className
      )}
    >
      {/* Illustration Container */}
      <div className="relative mb-10 flex h-40 w-56 items-center justify-center">
        {/* Background Circles */}
        <div className="absolute left-0 top-2 h-28 w-28 rounded-full bg-orange-50/80" />
        <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-gray-100" />

        {/* Illustration */}
        <div className="relative z-10">
          <svg
            width="200"
            height="150"
            viewBox="0 0 200 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Back Document (Yellow) */}
            <rect
              x="25"
              y="15"
              width="85"
              height="110"
              rx="8"
              fill="#FEF3C7"
              stroke="#FCD34D"
              strokeWidth="1.5"
            />
            {/* Lines on back document */}
            <rect x="40" y="35" width="55" height="5" rx="2.5" fill="#FDE68A" />
            <rect x="40" y="48" width="40" height="5" rx="2.5" fill="#FDE68A" />

            {/* Front Document (White) */}
            <rect
              x="45"
              y="32"
              width="85"
              height="110"
              rx="8"
              fill="white"
              stroke="#E5E7EB"
              strokeWidth="1.5"
            />
            {/* Lines on front document */}
            <rect x="60" y="52" width="55" height="5" rx="2.5" fill="#F3F4F6" />
            <rect x="60" y="65" width="40" height="5" rx="2.5" fill="#F3F4F6" />
            <rect x="60" y="78" width="48" height="5" rx="2.5" fill="#F3F4F6" />

            {/* Magnifying Glass */}
            <circle
              cx="140"
              cy="60"
              r="28"
              fill="#F9FAFB"
              stroke="#D1D5DB"
              strokeWidth="3"
            />
            <line
              x1="160"
              y1="82"
              x2="178"
              y2="100"
              stroke="#9CA3AF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* X mark inside magnifying glass */}
            <path
              d="M130 50L150 70M150 50L130 70"
              stroke="#EF4444"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Checkmark circle */}
            <circle cx="22" cy="105" r="14" fill="#F3F4F6" />
            <path
              d="M16 105L20 109L28 101"
              stroke="#9CA3AF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
        {description}
      </p>

      {/* Action Button - Dark charcoal style */}
      {onAction && (
        <Button
          onClick={onAction}
          className="gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

/**
 * Backward Compatibility Exports
 * Keep existing variants for other parts of the app
 */

/**
 * No Assignments Empty State
 * Convenience wrapper for the main EmptyState
 */
export const NoAssignmentsState: React.FC<{
  onCreateClick?: () => void;
}> = ({ onCreateClick }) => {
  return (
    <EmptyState
      title="No assignments yet"
      description="Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading."
      actionLabel="Create Your First Assignment"
      onAction={onCreateClick}
    />
  );
};

/**
 * Search Empty State
 * For search results with no matches
 */
export const SearchEmptyState: React.FC<{
  searchQuery?: string;
}> = ({ searchQuery }) => {
  return (
    <EmptyState
      title="No results found"
      description={
        searchQuery
          ? `No assignments match "${searchQuery}". Try a different search term.`
          : 'Try adjusting your search or filters.'
      }
      actionLabel=""
    />
  );
};

/**
 * Error Empty State
 * For error conditions
 */
export const ErrorEmptyState: React.FC<{
  onRetry?: () => void;
}> = ({ onRetry }) => {
  return (
    <EmptyState
      title="Something went wrong"
      description="We couldn't load your assignments. Please try again."
      actionLabel="Try Again"
      onAction={onRetry}
    />
  );
};

export default EmptyState;

// Made with Bob
