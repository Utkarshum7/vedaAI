/**
 * Assignment Card Component (Screen 2 - Simplified Version)
 * 
 * Simplified card for displaying assignment information.
 * 
 * Features:
 * - Title display
 * - Assigned on and Due date
 * - Dropdown menu (View, Delete)
 * - Clean, minimal design
 */

"use client"

import { useState } from "react"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export interface Assignment {
  id: string
  title: string
  assignedOn: string
  dueDate: string
}

interface AssignmentCardProps {
  assignment: Assignment
  onView?: (id: string) => void
  onDelete?: (id: string) => void
}

export function AssignmentCard({
  assignment,
  onView,
  onDelete,
}: AssignmentCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-900">
          {assignment.title}
        </h3>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => onView?.(assignment.id)}
              className="cursor-pointer"
            >
              View Assignment
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(assignment.id)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-900">Assigned on</span>
          <span className="text-gray-500">: {assignment.assignedOn}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-orange-600">Due</span>
          <span className="text-gray-500">: {assignment.dueDate}</span>
        </div>
      </div>
    </div>
  )
}

export default AssignmentCard

// Made with Bob