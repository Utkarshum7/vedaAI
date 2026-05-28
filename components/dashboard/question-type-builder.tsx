"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionTypeRow, type QuestionType } from "./question-type-row"
import { cn } from "@/lib/utils"

interface QuestionTypeBuilderProps {
  questions: QuestionType[]
  onChange: (questions: QuestionType[]) => void
  className?: string
}

export function QuestionTypeBuilder({
  questions,
  onChange,
  className,
}: QuestionTypeBuilderProps) {
  const addQuestion = () => {
    const newQuestion: QuestionType = {
      id: crypto.randomUUID(),
      type: "Multiple Choice Questions",
      numQuestions: 1,
      marks: 1,
    }
    onChange([...questions, newQuestion])
  }

  const updateQuestion = (index: number, data: QuestionType) => {
    const updated = [...questions]
    updated[index] = data
    onChange(updated)
  }

  const removeQuestion = (index: number) => {
    onChange(questions.filter((_, i) => i !== index))
  }

  const totalQuestions = questions.reduce((sum, q) => sum + q.numQuestions, 0)
  const totalMarks = questions.reduce(
    (sum, q) => sum + q.numQuestions * q.marks,
    0
  )

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header - Hidden on mobile, visible on larger screens */}
      <div className="hidden grid-cols-[1fr_auto_auto_32px] items-center gap-3 px-3 sm:grid">
        <span className="text-sm font-medium text-gray-700">Question Type</span>
        <span className="w-[108px] text-center text-sm font-medium text-gray-700">
          No. of Questions
        </span>
        <span className="w-[108px] text-center text-sm font-medium text-gray-700">
          Marks
        </span>
        <span className="w-8" />
      </div>

      {/* Question Rows */}
      <div className="space-y-2">
        {questions.map((question, index) => (
          <QuestionTypeRow
            key={question.id}
            data={question}
            onChange={(data) => updateQuestion(index, data)}
            onRemove={() => removeQuestion(index)}
          />
        ))}
      </div>

      {/* Add Button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="gap-2 text-gray-600 hover:text-gray-900"
        onClick={addQuestion}
      >
        <Plus className="h-4 w-4" />
        Add Question Type
      </Button>

      {/* Summary */}
      <div className="flex flex-col items-end gap-1 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600">
          Total Questions:{" "}
          <span className="font-semibold text-gray-900">{totalQuestions}</span>
        </p>
        <p className="text-sm text-gray-600">
          Total Marks:{" "}
          <span className="font-semibold text-gray-900">{totalMarks}</span>
        </p>
      </div>
    </div>
  )
}

// Made with Bob
