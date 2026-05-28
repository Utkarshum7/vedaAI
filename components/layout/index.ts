/**
 * Layout Components Barrel Export
 *
 * Centralized export for all layout-related components.
 *
 * Note: EmptyState is re-exported from dashboard for v0 compatibility.
 * v0 expects: import { EmptyState } from "@/components/layout"
 * Our architecture has it in: @/components/dashboard
 * This re-export maintains both import paths.
 */

export { Sidebar } from './Sidebar';
export { Navbar } from './Navbar';
export { MobileNav } from './MobileNav';
export {
  DashboardLayout,
  ContentContainer,
  PageHeader,
} from './DashboardLayout';

// Re-export EmptyState from dashboard for v0 compatibility
export { EmptyState } from '../dashboard/EmptyState';

// Made with Bob
