"use client"

import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function StepIndicator({
  currentStep,
  totalSteps,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            index < currentStep ? "bg-gray-900" : "bg-gray-200"
          )}
        />
      ))}
    </div>
  )
}

// Made with Bob
