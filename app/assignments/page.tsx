/**
 * Assignments Page (Screen 2 - Filled State)
 * 
 * Displays list of assignments with filter and search functionality.
 * 
 * Features:
 * - Header with green indicator
 * - Filter dropdown
 * - Search input
 * - 2-column grid of assignment cards
 * - Floating action button (mobile + desktop)
 * - Reuses DashboardLayout from Screen 1
 */

"use client"

import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout"
import {
  AssignmentsHeader,
  AssignmentsGrid,
  FloatingActionButton,
  type Assignment,
} from "@/components/dashboard"
import { ROUTES } from "@/lib/constants"

// Sample data matching Figma design
const sampleAssignments: Assignment[] = [
  {
    id: "1",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "2",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "3",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "4",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "5",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "6",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "7",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "8",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "9",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
  {
    id: "10",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
]

export default function AssignmentsPage() {
  const router = useRouter()

  const handleViewAssignment = (id: string) => {
    console.log("View assignment:", id)
    // TODO: Navigate to assignment detail page
  }

  const handleDeleteAssignment = (id: string) => {
    console.log("Delete assignment:", id)
    // TODO: Implement delete functionality
  }

  const handleCreateAssignment = () => {
    router.push(ROUTES.CREATE)
  }

  const handleSearch = (query: string) => {
    console.log("Search:", query)
    // TODO: Implement search functionality
  }

  const handleFilterChange = (filter: string) => {
    console.log("Filter:", filter)
    // TODO: Implement filter functionality
  }

  return (
    <DashboardLayout>
      <div className="flex h-full flex-col">
        {/* Header with filters */}
        <div className="border-b border-gray-100 bg-white px-4 py-4 md:px-6">
          <AssignmentsHeader
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Assignments Grid */}
        <div className="flex-1 overflow-auto px-4 py-4 pb-24 md:px-6 md:pb-4">
          <AssignmentsGrid
            assignments={sampleAssignments}
            onViewAssignment={handleViewAssignment}
            onDeleteAssignment={handleDeleteAssignment}
          />

          {/* Desktop Create Button */}
          <div className="hidden pt-6 md:flex md:justify-center">
            <FloatingActionButton
              label="Create Assignment"
              onClick={handleCreateAssignment}
            />
          </div>
        </div>

        {/* Mobile Floating Button */}
        <div className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 md:hidden">
          <FloatingActionButton
            label="Create Assignment"
            onClick={handleCreateAssignment}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

// Made with Bob