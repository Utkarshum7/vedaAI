/**
 * Navbar Component (v0 Integration)
 * 
 * Top navigation bar with Figma-inspired design from v0.
 * Integrated with existing architecture.
 * 
 * Usage:
 * <Navbar title="Assignment" onMenuClick={() => {}} />
 */

"use client"

import { ArrowLeft, Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavbarProps {
  title?: string
  showBackButton?: boolean
  onBackClick?: () => void
  onMenuClick?: () => void
  className?: string
}

export function Navbar({
  title = "Assignment",
  showBackButton = true,
  onBackClick,
  onMenuClick,
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "flex h-14 items-center justify-between bg-white px-4",
        className
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
            className="hidden text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:flex"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}

        {/* Title with Icon */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-100">
            <span className="text-xs">📋</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{title}</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.png" alt="John Doe" />
            <AvatarFallback className="bg-amber-500 text-xs font-medium text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden items-center gap-1 lg:flex">
            <span className="text-sm font-medium text-gray-900">John Doe</span>
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

// Made with Bob
