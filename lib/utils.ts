import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  const d = new Date(date)

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatRelativeTime(date: string | Date) {
  const d = new Date(date)
  const now = new Date()

  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "1 day ago"
  if (diffDays < 7) return `${diffDays} days ago`

  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks === 1) return "1 week ago"

  return `${diffWeeks} weeks ago`
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function validateFileSize(
  file: File,
  maxSizeMB: number = 10
) {
  return file.size <= maxSizeMB * 1024 * 1024
}

export function validateFileType(
  file: File,
  allowedTypes: string[] = [
    "application/pdf",
    "text/plain",
  ]
) {
  return allowedTypes.includes(file.type)
}

export function getDifficultyColor(
  difficulty: string
) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-700"
    case "moderate":
    case "medium":
      return "bg-yellow-100 text-yellow-700"
    case "hard":
    case "challenging":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

/**
 * Parse error message from unknown error type
 * Safely extracts error message for API error handling
 */
export function parseErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    return String((error as { message?: unknown }).message)
  }

  return "Something went wrong"
}