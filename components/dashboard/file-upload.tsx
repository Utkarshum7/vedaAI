"use client"

import { useState, useCallback } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  maxSize?: string
  onFileSelect?: (files: FileList | null) => void
  className?: string
}

export function FileUpload({
  accept = "image/jpeg, image/png",
  maxSize = "10MB",
  onFileSelect,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      onFileSelect?.(e.dataTransfer.files)
    },
    [onFileSelect]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileSelect?.(e.target.files)
    },
    [onFileSelect]
  )

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors",
          isDragging
            ? "border-gray-400 bg-gray-50"
            : "border-gray-200 bg-white"
        )}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
          <Upload className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mb-1 text-sm font-medium text-gray-700">
          Choose a file or drag & drop it here
        </p>
        <p className="mb-4 text-xs text-gray-500">
          JPEG, PNG, upto {maxSize}
        </p>
        <label>
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="sr-only"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="pointer-events-none"
          >
            Browse Files
          </Button>
        </label>
      </div>
      <p className="text-center text-xs text-gray-500">
        Upload images of your preferred document/image
      </p>
    </div>
  )
}

// Made with Bob
