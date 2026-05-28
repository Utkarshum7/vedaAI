/**
 * Assignments Grid Component (Screen 2)
 * 
 * Grid layout wrapper for displaying assignment cards.
 * 
 * Features:
 * - Responsive 2-column grid (1 col on mobile)
 * - Maps through assignments array
 * - Passes callbacks to cards
 */

"use client"

import { AssignmentCard, type Assignment } from "./assignment-card"

interface AssignmentsGridProps {
  assignments: Assignment[]
  onViewAssignment?: (id: string) => void
  onDeleteAssignment?: (id: string) => void
}

export function AssignmentsGrid({
  assignments,
  onViewAssignment,
  onDeleteAssignment,
}: AssignmentsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onView={onViewAssignment}
          onDelete={onDeleteAssignment}
        />
      ))}
    </div>
  )
}

export default AssignmentsGrid

// Made with Bob