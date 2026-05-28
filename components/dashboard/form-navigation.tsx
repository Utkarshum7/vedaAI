"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FormNavigationProps {
  onPrevious?: () => void
  onNext?: () => void
  previousLabel?: string
  nextLabel?: string
  showPrevious?: boolean
  showNext?: boolean
  className?: string
}

export function FormNavigation({
  onPrevious,
  onNext,
  previousLabel = "Previous",
  nextLabel = "Next",
  showPrevious = true,
  showNext = true,
  className,
}: FormNavigationProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-gray-100 pt-6",
        className
      )}
    >
      {showPrevious ? (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {previousLabel}
        </Button>
      ) : (
        <div />
      )}

      {showNext && (
        <Button
          type="button"
          onClick={onNext}
          className="gap-2 bg-gray-900 hover:bg-gray-800"
        >
          {nextLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

// Made with Bob
