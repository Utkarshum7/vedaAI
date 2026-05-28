"use client"

import { cn } from "@/lib/utils"

// Types
export interface QuestionItem {
  id: number
  difficulty: "Easy" | "Moderate" | "Challenging"
  text: string
  marks: number
}

export interface AnswerItem {
  id: number
  text: string
}

export interface QuestionPaperData {
  schoolName: string
  schoolAddress?: string
  subject: string
  className: string
  timeAllowed: string
  maximumMarks: number
  instructions?: string
  sections: {
    title: string
    subtitle?: string
    instruction?: string
    questions: QuestionItem[]
  }[]
  answerKey?: AnswerItem[]
}

interface QuestionPaperPreviewProps {
  data: QuestionPaperData
  className?: string
}

// Difficulty badge component
function DifficultyBadge({
  difficulty,
}: {
  difficulty: "Easy" | "Moderate" | "Challenging"
}) {
  return (
    <span className="font-medium text-gray-600">[{difficulty}]</span>
  )
}

export function QuestionPaperPreview({
  data,
  className,
}: QuestionPaperPreviewProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:p-12",
        className
      )}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
          {data.schoolName}
          {data.schoolAddress && `, ${data.schoolAddress}`}
        </h1>
        <div className="mt-2 flex flex-col items-center justify-center gap-1 text-sm text-gray-600 md:flex-row md:gap-4">
          <span>Subject: {data.subject}</span>
          <span className="hidden md:inline">|</span>
          <span>Class: {data.className}</span>
        </div>
      </div>

      {/* Time and Marks */}
      <div className="mb-4 flex items-center justify-between text-sm text-gray-700">
        <span>Time Allowed: {data.timeAllowed}</span>
        <span>Maximum Marks: {data.maximumMarks}</span>
      </div>

      {/* Instructions */}
      {data.instructions && (
        <p className="mb-6 text-sm text-gray-700">{data.instructions}</p>
      )}

      {/* Student Info Fields */}
      <div className="mb-8 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>Name:</span>
          <span className="inline-block w-48 border-b border-gray-300" />
        </div>
        <div className="flex items-center gap-2">
          <span>Roll Number:</span>
          <span className="inline-block w-32 border-b border-gray-300" />
        </div>
        <div className="flex items-center gap-2">
          <span>Class: {data.className} Section:</span>
          <span className="inline-block w-24 border-b border-gray-300" />
        </div>
      </div>

      {/* Sections */}
      {data.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          {/* Section Title */}
          <h2 className="mb-4 text-center text-base font-semibold text-gray-900">
            {section.title}
          </h2>

          {/* Section Subtitle */}
          {section.subtitle && (
            <h3 className="mb-1 text-sm font-semibold text-gray-900">
              {section.subtitle}
            </h3>
          )}

          {/* Section Instruction */}
          {section.instruction && (
            <p className="mb-4 text-sm italic text-gray-600">
              {section.instruction}
            </p>
          )}

          {/* Questions */}
          <ol className="space-y-3 text-sm text-gray-700">
            {section.questions.map((question) => (
              <li key={question.id} className="flex gap-2">
                <span className="flex-shrink-0">{question.id}.</span>
                <span className="flex-1">
                  <DifficultyBadge difficulty={question.difficulty} />{" "}
                  {question.text} [{question.marks} Marks]
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}

      {/* End of Question Paper */}
      <p className="mb-8 text-center text-sm font-semibold text-gray-900">
        End of Question Paper
      </p>

      {/* Answer Key */}
      {data.answerKey && data.answerKey.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Answer Key:
          </h3>
          <ol className="space-y-3 text-sm text-gray-700">
            {data.answerKey.map((answer) => (
              <li key={answer.id} className="flex gap-2">
                <span className="flex-shrink-0">{answer.id}.</span>
                <span className="flex-1">{answer.text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

// Made with Bob
