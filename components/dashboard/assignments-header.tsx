/**
 * Assignments Header Component (Screen 2)
 * 
 * Header section with title, filter dropdown, and search functionality.
 * 
 * Features:
 * - Green status indicator
 * - Filter dropdown (All, Upcoming, Past Due)
 * - Search input
 * - Responsive layout
 */

"use client"

import { useState } from "react"
import { Filter, Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AssignmentsHeaderProps {
  title?: string
  subtitle?: string
  onSearch?: (query: string) => void
  onFilterChange?: (filter: string) => void
}

export function AssignmentsHeader({
  title = "Assignments",
  subtitle = "Manage and create assignments for your classes.",
  onSearch,
  onFilterChange,
}: AssignmentsHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter)
    onFilterChange?.(filter)
  }

  return (
    <div className="space-y-4">
      {/* Title Section */}
      <div className="flex items-start gap-2">
        <div className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 justify-start gap-2 px-3 text-sm font-normal text-gray-600 hover:bg-gray-100"
            >
              <Filter className="h-4 w-4" />
              Filter By
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuItem
              onClick={() => handleFilterSelect("all")}
              className="cursor-pointer"
            >
              All Assignments
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilterSelect("upcoming")}
              className="cursor-pointer"
            >
              Upcoming
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilterSelect("past")}
              className="cursor-pointer"
            >
              Past Due
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Assignment"
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-9 border-gray-200 bg-white pl-9 text-sm placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  )
}

export default AssignmentsHeader

// Made with Bob