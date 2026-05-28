/**
 * Mobile Navigation Component (v0 Integration)
 * 
 * Bottom navigation bar for mobile devices with FAB button.
 * Integrated from v0 with existing architecture.
 * 
 * Features:
 * - Fixed bottom navigation
 * - Icon-based navigation with labels
 * - Active state indication with underline
 * - Floating Action Button (FAB) for creating assignments
 * - Only visible on mobile (< lg breakpoint)
 * - Connected to existing routes
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, FileText, Library, Sparkles, Plus } from "lucide-react"
import { ROUTES } from "@/lib/constants"

interface MobileNavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface MobileNavProps {
  className?: string
}

/**
 * Mobile Bottom Navigation (v0)
 * 
 * Provides bottom navigation with FAB button for mobile devices.
 * Uses Next.js usePathname() for active state detection.
 */
export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname()

  const navItems: MobileNavItem[] = [
    { 
      label: "Home", 
      href: ROUTES.DASHBOARD, 
      icon: <Home className="h-5 w-5" /> 
    },
    {
      label: "Assignments",
      href: ROUTES.DASHBOARD, // Using dashboard as assignments page
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "Library",
      href: "/library", // Future route
      icon: <Library className="h-5 w-5" />,
    },
    {
      label: "AI Toolkit",
      href: "/ai-toolkit", // Future route
      icon: <Sparkles className="h-5 w-5" />,
    },
  ]

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white lg:hidden",
        className
      )}
    >
      {/* FAB Button - Create Assignment */}
      <div className="absolute -top-7 right-4">
        <Link
          href={ROUTES.CREATE}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Create Assignment</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-gray-900"
                  : "text-gray-400"
              )}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="h-0.5 w-8 rounded-full bg-gray-900" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNav

// Made with Bob