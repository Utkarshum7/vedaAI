/**
 * Floating Action Button Component (Screen 2)
 * 
 * Responsive FAB button that appears:
 * - Fixed at bottom on mobile
 * - Static centered button on desktop
 * 
 * Features:
 * - Plus icon
 * - Rounded full on mobile, rounded-lg on desktop
 * - Dark gray background
 * - Shadow on mobile
 */

"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FloatingActionButtonProps {
  label: string
  onClick?: () => void
  className?: string
}

export function FloatingActionButton({
  label,
  onClick,
  className,
}: FloatingActionButtonProps) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-30 -translate-x-1/2 md:left-auto md:right-1/2 md:translate-x-1/2 lg:bottom-8",
        "md:static md:flex md:justify-center md:pt-4",
        className
      )}
    >
      <Button
        onClick={onClick}
        className="gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-gray-800 md:rounded-lg md:shadow-none"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        {label}
      </Button>
    </div>
  )
}

export default FloatingActionButton

// Made with Bob