"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface AIResponseBannerProps {
  message: string
  onDownload?: () => void
  downloadLabel?: string
}

export function AIResponseBanner({
  message,
  onDownload,
  downloadLabel = "Download as PDF",
}: AIResponseBannerProps) {
  return (
    <div className="space-y-4">
      {/* Dark banner with AI message */}
      <div className="rounded-xl bg-gray-900 px-5 py-4">
        <p className="text-sm leading-relaxed text-white">{message}</p>
      </div>

      {/* Download button */}
      {onDownload && (
        <Button
          variant="outline"
          onClick={onDownload}
          className="gap-2 rounded-full border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          {downloadLabel}
        </Button>
      )}
    </div>
  )
}

// Made with Bob
