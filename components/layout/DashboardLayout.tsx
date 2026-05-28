/**
 * Dashboard Layout Component (v0 Integration)
 * 
 * Main layout wrapper that combines v0 Sidebar, Navbar, and MobileNav.
 * Integrated from v0 with existing architecture.
 * 
 * Features:
 * - Desktop sidebar (hidden on mobile)
 * - Mobile sidebar overlay with backdrop
 * - Top navbar with menu toggle
 * - Bottom mobile navigation
 * - Off-white background for content area
 * - Responsive design
 * 
 * Usage:
 * <DashboardLayout>
 *   <YourPageContent />
 * </DashboardLayout>
 */

"use client"

import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"
import { MobileNav } from "./MobileNav"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
  title?: string
  showBackButton?: boolean
  defaultActiveItem?: string
}

/**
 * Dashboard Layout Component (v0)
 *
 * Provides the main layout structure with sidebar, navbar, and mobile navigation.
 *
 * @param title - Optional page title to display in navbar
 * @param showBackButton - Whether to show back button in navbar
 * @param defaultActiveItem - Override active sidebar item (useful for nested routes)
 */
export function DashboardLayout({
  children,
  className,
  title,
  showBackButton = false,
  defaultActiveItem,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" defaultActiveItem={defaultActiveItem} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] transform bg-white transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar className="h-full w-full" defaultActiveItem={defaultActiveItem} />
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onBackClick={showBackButton ? () => window.history.back() : undefined}
          title={title}
        />

        {/* Content with off-white background */}
        <main
          className={cn(
            "flex-1 overflow-y-auto bg-gray-50/50 pb-20 lg:pb-0",
            className
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}

/**
 * Simple Content Container
 * Provides consistent padding and max-width for content
 * 
 * Usage:
 * <ContentContainer>
 *   <YourContent />
 * </ContentContainer>
 */
export const ContentContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-4 lg:px-6', className)}>
      {children}
    </div>
  );
};

/**
 * Page Header
 * Consistent page header with title and actions
 * 
 * Usage:
 * <PageHeader 
 *   title="Dashboard" 
 *   description="Manage your assignments"
 *   actions={<Button>Create New</Button>}
 * />
 */
export const PageHeader: React.FC<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}> = ({ title, description, actions, className }) => {
  return (
    <div className={cn('mb-6', className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;

// Made with Bob
