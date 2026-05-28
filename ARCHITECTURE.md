# VedaAI Frontend Architecture Documentation

## 📋 Overview

This document describes the frontend architecture for the VedaAI Hiring Assignment application. The frontend is built with Next.js 16, TypeScript, TailwindCSS, and follows modern React best practices.

## 🏗️ Technology Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: TailwindCSS 4
- **State Management**: Zustand 5
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Icons**: Lucide React

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Dashboard (home page)
│   ├── globals.css              # Global styles
│   ├── create/
│   │   └── page.tsx            # Assignment creation page
│   └── output/
│       └── page.tsx            # Generated paper view page
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── DashboardLayout.tsx # Main layout wrapper
│   │   └── index.ts            # Barrel export
│   │
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── AssignmentCard.tsx  # Assignment list item
│   │   ├── EmptyState.tsx      # Empty state displays
│   │   └── index.ts
│   │
│   ├── forms/                   # Form components
│   │   ├── AssignmentForm.tsx  # Assignment creation form
│   │   └── index.ts
│   │
│   ├── output/                  # Output/paper components
│   │   ├── StudentInfo.tsx     # Student information section
│   │   ├── SectionBlock.tsx    # Question section wrapper
│   │   ├── QuestionItem.tsx    # Individual question display
│   │   ├── DifficultyBadge.tsx # Difficulty indicator
│   │   └── index.ts
│   │
│   └── status/                  # Status/loading components
│       ├── GenerationStatus.tsx # Generation progress display
│       ├── QueueIndicator.tsx   # Queue position indicator
│       ├── LoadingSkeleton.tsx  # Loading placeholders
│       └── index.ts
│
├── store/                        # Zustand state management
│   └── assignmentStore.ts       # Assignment state & actions
│
├── lib/                          # Utilities and configurations
│   ├── api.ts                   # Axios API client
│   ├── socket.ts                # Socket.io connection
│   ├── constants.ts             # App constants
│   ├── theme.ts                 # Design tokens
│   └── utils.ts                 # Utility functions
│
├── types/                        # TypeScript type definitions
│   ├── assignment.ts            # Assignment-related types
│   ├── api.ts                   # API types
│   └── index.ts                 # Type exports
│
└── public/                       # Static assets
    └── [images, icons, etc.]
```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Pure presentational logic
- **Store**: State management and business logic
- **Lib**: Utilities, API clients, and configurations
- **Types**: Centralized type definitions

### 2. **Component Organization**
- **Layout Components**: Reusable layout structures (Sidebar, Navbar, etc.)
- **Feature Components**: Domain-specific components (Dashboard, Forms, Output)
- **Status Components**: Loading states and progress indicators
- **Atomic Design**: Components are composable and reusable

### 3. **Type Safety**
- Strict TypeScript mode enabled
- All components are fully typed
- API responses have defined interfaces
- Zustand store is type-safe

### 4. **State Management Strategy**
- **Zustand** for global state (assignments, job status, generated papers)
- **React Hook Form** for form state
- **URL Search Params** for shareable state (assignment ID)
- **Local Storage** for persistence (via Zustand middleware)

### 5. **Code Organization**
- Barrel exports (`index.ts`) for clean imports
- Consistent file naming (PascalCase for components)
- Co-located types and utilities
- Clear separation between client and server components

## 🔄 Data Flow

### Assignment Creation Flow
```
User Input (Form)
    ↓
React Hook Form + Zod Validation
    ↓
Zustand Store (setAssignmentForm)
    ↓
API Client (Axios POST)
    ↓
Backend Processing
    ↓
Socket.io Real-time Updates
    ↓
Zustand Store (setJobStatus, setGeneratedPaper)
    ↓
UI Update (Status Components)
```

### State Management Flow
```
Component
    ↓
Zustand Hook (useAssignmentStore)
    ↓
Store Actions (setters)
    ↓
Store State Update
    ↓
Component Re-render (via subscription)
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (blue-50 to blue-900)
- **Accent**: Purple shades (purple-50 to purple-900)
- **Success**: Green-600
- **Warning**: Yellow-600
- **Error**: Red-600
- **Neutral**: Gray scale (neutral-50 to neutral-950)

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Scale**: xs (12px) to 5xl (48px)
- **Weights**: normal (400), medium (500), semibold (600), bold (700)

### Spacing
- **Base Unit**: 4px
- **Scale**: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24

### Components
- **Border Radius**: sm (2px) to 3xl (24px)
- **Shadows**: sm to 2xl elevation levels
- **Transitions**: 150ms (fast), 200ms (base), 300ms (slow)

## 🔌 API Integration

### Axios Client (`lib/api.ts`)
- Base URL configuration
- Request/response interceptors
- Error handling
- Type-safe API methods
- Authentication token management

### Socket.io Client (`lib/socket.ts`)
- Singleton connection pattern
- Event listeners for job updates
- Reconnection logic
- Room-based subscriptions
- React hooks for easy integration

## 📦 State Management

### Zustand Store Structure
```typescript
{
  // Form data
  assignmentForm: AssignmentForm
  
  // Job tracking
  jobStatus: JobStatus
  jobProgress: JobProgress | null
  
  // Generated output
  generatedPaper: GeneratedPaper | null
  
  // Assignment list
  assignments: Assignment[]
  selectedAssignmentId: string | null
  
  // UI state
  isLoading: boolean
  isSubmitting: boolean
  error: string | null
}
```

### Store Features
- **Persistence**: Assignments persisted to localStorage
- **DevTools**: Redux DevTools integration (development only)
- **Selectors**: Optimized selector hooks for performance
- **Actions**: Type-safe action methods

## 🧩 Component Patterns

### Layout Pattern
```tsx
<DashboardLayout>
  <ContentContainer>
    <PageHeader title="..." description="..." actions={...} />
    {/* Page content */}
  </ContentContainer>
</DashboardLayout>
```

### Form Pattern
```tsx
<AssignmentForm
  onSubmit={handleSubmit}
  defaultValues={initialData}
  isLoading={isSubmitting}
/>
```

### Status Display Pattern
```tsx
<GenerationStatus
  status={jobStatus}
  progress={progress}
  message={message}
/>
```

## 🎭 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Responsive navigation (drawer on mobile, fixed on desktop)

## 🚀 Performance Optimizations

### Code Splitting
- Next.js automatic code splitting
- Dynamic imports for heavy components
- Route-based splitting

### State Optimization
- Zustand selector hooks prevent unnecessary re-renders
- React Hook Form reduces form re-renders
- Memoization where appropriate

### Loading States
- Skeleton loaders for better perceived performance
- Progressive loading of content
- Optimistic UI updates

## 🔒 Type Safety

### Type Organization
- **Domain Types**: `types/assignment.ts`
- **API Types**: `types/api.ts`
- **Component Props**: Inline or co-located
- **Utility Types**: TypeScript built-ins

### Type Patterns
```typescript
// Strict typing for all props
interface ComponentProps {
  required: string;
  optional?: number;
  callback: (data: Type) => void;
}

// Type-safe API responses
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: ApiError;
}
```

## 🧪 Development Workflow

### File Creation Checklist
1. Create component file with JSDoc comments
2. Define TypeScript interfaces
3. Implement component logic
4. Add to barrel export (`index.ts`)
5. Test in isolation
6. Integrate with parent components

### Naming Conventions
- **Components**: PascalCase (`AssignmentCard.tsx`)
- **Utilities**: camelCase (`formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Types**: PascalCase (`AssignmentForm`)

## 🔮 Future Enhancements

### Ready for Backend Integration
- API client configured and ready
- Socket.io connection prepared
- Type definitions match expected backend structure
- Error handling in place

### Extensibility Points
- Theme system for easy customization
- Component variants for different use cases
- Pluggable authentication system
- Modular feature structure

## 📚 Key Files Reference

### Entry Points
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Dashboard page
- `store/assignmentStore.ts` - Global state

### Core Utilities
- `lib/api.ts` - HTTP client
- `lib/socket.ts` - WebSocket client
- `lib/utils.ts` - Helper functions
- `lib/constants.ts` - Configuration

### Type Definitions
- `types/assignment.ts` - Domain types
- `types/api.ts` - API types
- `types/index.ts` - Type exports

## 🎓 Best Practices

1. **Always use TypeScript strict mode**
2. **Prefer composition over inheritance**
3. **Keep components small and focused**
4. **Use barrel exports for clean imports**
5. **Document complex logic with comments**
6. **Handle loading and error states**
7. **Make components responsive by default**
8. **Use semantic HTML elements**
9. **Implement proper accessibility**
10. **Follow the established patterns**

## 📞 Component Communication

### Parent to Child
- Props (typed interfaces)
- Render props for flexibility
- Context for deep trees (if needed)

### Child to Parent
- Callback props
- Event handlers
- State lifting

### Sibling Components
- Zustand store for shared state
- URL params for shareable state
- Context for feature-specific state

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-28  
**Maintainer**: VedaAI Team