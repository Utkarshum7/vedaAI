"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  className,
}: NumberStepperProps) {
  const decrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const increment = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-gray-200 bg-white",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none rounded-l-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        onClick={decrement}
        disabled={value <= min}
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-gray-900">
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none rounded-r-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        onClick={increment}
        disabled={value >= max}
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

// Made with Bob
