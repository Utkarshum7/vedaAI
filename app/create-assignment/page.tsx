"use client"

import { useState } from "react"
import { Mic } from "lucide-react"
import { DashboardLayout } from "@/components/layout"
import { StepIndicator } from "@/components/dashboard/step-indicator"
import { FormSection } from "@/components/dashboard/form-section"
import { FileUpload } from "@/components/dashboard/file-upload"
import { DatePickerField } from "@/components/dashboard/date-picker-field"
import { QuestionTypeBuilder } from "@/components/dashboard/question-type-builder"
import { FormNavigation } from "@/components/dashboard/form-navigation"
import { Textarea } from "@/components/ui/textarea"
import { type QuestionType } from "@/components/dashboard/question-type-row"

export default function CreateAssignmentPage() {
  const [dueDate, setDueDate] = useState<Date>()
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [questions, setQuestions] = useState<QuestionType[]>([
    {
      id: "1",
      type: "Multiple Choice Questions",
      numQuestions: 4,
      marks: 1,
    },
    {
      id: "2",
      type: "Short Questions",
      numQuestions: 3,
      marks: 2,
    },
    {
      id: "3",
      type: "Diagram/Graph-Based Questions",
      numQuestions: 5,
      marks: 5,
    },
    {
      id: "4",
      type: "Numerical Problems",
      numQuestions: 5,
      marks: 5,
    },
  ])

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log("Selected files:", files)
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <h1 className="text-xl font-semibold text-gray-900">
              Create Assignment
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Set up a new assignment for your students
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={2} totalSteps={3} className="mb-8" />

        {/* Form Content */}
        <div className="space-y-6">
          {/* Assignment Details Section */}
          <FormSection
            title="Assignment Details"
            description="Basic information about your assignment"
          >
            <div className="space-y-6">
              {/* File Upload */}
              <FileUpload onFileSelect={handleFileSelect} />

              {/* Due Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Due Date
                </label>
                <DatePickerField
                  date={dueDate}
                  onDateChange={setDueDate}
                  placeholder="Select due date"
                />
              </div>

              {/* Question Types */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Question Type
                </label>
                <QuestionTypeBuilder
                  questions={questions}
                  onChange={setQuestions}
                />
              </div>
            </div>
          </FormSection>

          {/* Additional Information */}
          <FormSection title="Additional Information (For better output)">
            <div className="relative">
              <Textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="e.g Generate a question paper for 3 hour exam duration..."
                className="min-h-[100px] resize-none pr-10"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </FormSection>

          {/* Navigation */}
          <FormNavigation
            onPrevious={() => console.log("Previous")}
            onNext={() => console.log("Next")}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

// Made with Bob
