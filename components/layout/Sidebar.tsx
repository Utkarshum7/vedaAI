/**
 * Sidebar Component (v0 Integration)
 * 
 * Main navigation sidebar with Figma-inspired design from v0.
 * Integrated with existing Zustand store and routing structure.
 * 
 * Usage:
 * <Sidebar className="..." />
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Users,
  FileText,
  Sparkles,
  Library,
  Settings,
  Plus,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: "Home", href: ROUTES.DASHBOARD, icon: <Home className="h-4 w-4" /> },
    { label: "My Groups", href: "/groups", icon: <Users className="h-4 w-4" /> },
    {
      label: "Assignments",
      href: ROUTES.DASHBOARD,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "AI Teacher's Toolkit",
      href: "/ai-toolkit",
      icon: <Sparkles className="h-4 w-4" />,
    },
  ]

  const secondaryItems: NavItem[] = [
    {
      label: "My Library",
      href: "/library",
      icon: <Library className="h-4 w-4" />,
    },
  ]

  return (
    <aside
      className={cn(
        "flex h-full w-[240px] flex-col bg-white p-3",
        className
      )}
    >
      {/* Sidebar Card Container */}
      <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50/50 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500">
            <span className="text-xs font-bold text-white">V</span>
          </div>
          <span className="text-base font-semibold text-gray-900">VedaAI</span>
        </div>

        {/* Create Assignment Button */}
        <div className="px-4 pb-2">
          <Link href={ROUTES.CREATE}>
            <Button className="w-full justify-center gap-2 rounded-lg border-2 border-orange-400 bg-transparent text-sm font-medium text-orange-600 shadow-none hover:bg-orange-50">
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Create Assignment
            </Button>
          </Link>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 px-3 py-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100/70 hover:text-gray-900"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Divider */}
          <div className="my-3 border-t border-dashed border-gray-200" />

          {/* Secondary Navigation */}
          <ul className="space-y-0.5">
            {secondaryItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100/70 hover:text-gray-900"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto">
          {/* Settings */}
          <div className="px-3 pb-2">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100/70 hover:text-gray-900"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>

          {/* User Profile */}
          <div className="border-t border-gray-100 px-3 py-3">
            <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-100/70">
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src="/placeholder-school.png" alt="School" />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-violet-400 to-indigo-500 text-xs font-medium text-white">
                  DPS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-gray-900">
                  Delhi Public School
                </p>
                <p className="truncate text-xs text-gray-500">
                  Bokaro Steel City
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

// Made with Bob
