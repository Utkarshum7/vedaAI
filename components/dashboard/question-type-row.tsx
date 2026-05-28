"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NumberStepper } from "./number-stepper"
import { cn } from "@/lib/utils"

export interface QuestionType {
  id: string
  type: string
  numQuestions: number
  marks: number
}

const questionTypes = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True/False Questions",
  "Fill in the Blanks",
]

interface QuestionTypeRowProps {
  data: QuestionType
  onChange: (data: QuestionType) => void
  onRemove: () => void
  className?: string
}

export function QuestionTypeRow({
  data,
  onChange,
  onRemove,
  className,
}: QuestionTypeRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3 sm:flex-row sm:items-center",
        className
      )}
    >
      {/* Question Type Select */}
      <div className="flex-1">
        <Select
          value={data.type}
          onValueChange={(value) => onChange({ ...data, type: value })}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            {questionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Number of Questions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs text-gray-500 sm:hidden">Questions:</span>
        <NumberStepper
          value={data.numQuestions}
          onChange={(value) => onChange({ ...data, numQuestions: value })}
          min={1}
        />
      </div>

      {/* Marks */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs text-gray-500 sm:hidden">Marks:</span>
        <NumberStepper
          value={data.marks}
          onChange={(value) => onChange({ ...data, marks: value })}
          min={1}
        />
      </div>

      {/* Remove Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Made with Bob
