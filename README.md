# VedaAI Frontend - Hiring Assignment

> AI-Powered Assignment Generation Platform - Frontend Application

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Project Overview

This is the frontend application for VedaAI's AI-powered assignment generation system. It provides an intuitive interface for educators to upload study materials and generate customized assignments with AI.

### Key Features

- ✅ **Dashboard**: View and manage all generated assignments
- ✅ **Assignment Creation**: Upload files and configure assignment parameters
- ✅ **Real-time Status**: Track generation progress with live updates
- ✅ **Question Paper View**: Display and export generated assignments
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile
- ✅ **Type-Safe**: Full TypeScript implementation with strict mode

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.6 | React framework with App Router |
| TypeScript | 5.x | Type-safe development |
| TailwindCSS | 4.x | Utility-first styling |
| Zustand | 5.x | State management |
| React Hook Form | 7.x | Form handling |
| Zod | 4.x | Schema validation |
| Axios | 1.x | HTTP client |
| Socket.io Client | 4.x | Real-time communication |
| Lucide React | 1.x | Icon library |

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── layout/            # Layout components
│   ├── dashboard/         # Dashboard components
│   ├── forms/             # Form components
│   ├── output/            # Output/paper components
│   └── status/            # Status/loading components
├── store/                 # Zustand state management
├── lib/                   # Utilities and configurations
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 🎯 Core Components

### Layout Components
- **Sidebar**: Navigation with Figma-inspired design
- **Navbar**: Top navigation bar with actions
- **DashboardLayout**: Main layout wrapper

### Dashboard Components
- **AssignmentCard**: Assignment list item with status
- **EmptyState**: Placeholder for empty lists

### Form Components
- **AssignmentForm**: Assignment creation with validation
  - File upload (PDF, DOCX, TXT)
  - Due date selection
  - Question type configuration
  - Question count and marks
  - Custom instructions

### Output Components
- **StudentInfo**: Student information section
- **SectionBlock**: Question section wrapper
- **QuestionItem**: Individual question display
- **DifficultyBadge**: Difficulty level indicator

### Status Components
- **GenerationStatus**: Real-time generation progress
- **QueueIndicator**: Queue position display
- **LoadingSkeleton**: Loading placeholders

## 🔄 State Management

### Zustand Store

```typescript
// Global state structure
{
  assignmentForm: AssignmentForm,
  jobStatus: JobStatus,
  jobProgress: JobProgress | null,
  generatedPaper: GeneratedPaper | null,
  assignments: Assignment[],
  selectedAssignmentId: string | null,
  isLoading: boolean,
  isSubmitting: boolean,
  error: string | null
}
```

### Usage Example

```typescript
import { useAssignmentStore } from '@/store/assignmentStore';

function MyComponent() {
  const { assignments, setAssignmentForm } = useAssignmentStore();
  // Use state and actions
}
```

## 🌐 API Integration

### HTTP Client (Axios)

```typescript
import { api } from '@/lib/api';

// Create assignment
const response = await api.assignments.create(formData);

// Get assignments
const assignments = await api.assignments.list();
```

### WebSocket Client (Socket.io)

```typescript
import { socketManager } from '@/lib/socket';

// Connect
socketManager.connect();

// Listen for updates
socketManager.onJobStatus((progress) => {
  console.log('Progress:', progress);
});

// Disconnect
socketManager.disconnect();
```

## 🎨 Styling

### TailwindCSS Configuration

The project uses TailwindCSS v4 with custom theme tokens defined in `lib/theme.ts`.

### Design System

- **Colors**: Custom palette with primary, accent, and semantic colors
- **Typography**: Geist Sans and Geist Mono fonts
- **Spacing**: 4px base unit with consistent scale
- **Components**: Reusable design tokens for buttons, cards, etc.

### Dark Mode

Dark mode is supported via Tailwind's `dark:` variant:

```tsx
<div className="bg-white dark:bg-neutral-900">
  Content
</div>
```

## 📝 Form Validation

Forms use React Hook Form with Zod schema validation:

```typescript
const schema = z.object({
  uploadedFile: z.instanceof(File),
  dueDate: z.date(),
  questionCount: z.number().min(1).max(100),
  // ... more fields
});
```

## 🔌 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚦 Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard (assignment list) |
| `/create` | Create new assignment |
| `/output` | View generated assignment |

## 🧪 Development

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Formatting**: Consistent code style

### Component Guidelines

1. Use functional components with TypeScript
2. Define prop interfaces
3. Add JSDoc comments
4. Handle loading and error states
5. Make components responsive
6. Use semantic HTML

### Example Component

```typescript
/**
 * My Component
 * 
 * Description of what this component does.
 * 
 * Usage:
 * <MyComponent title="Hello" onAction={handleAction} />
 */

interface MyComponentProps {
  title: string;
  onAction: () => void;
  optional?: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onAction,
  optional = false,
}) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

## 📦 Build & Deploy

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Build Output

- Static pages are pre-rendered
- Dynamic routes use server-side rendering
- Optimized assets in `.next/` directory

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - TailwindCSS configuration (v4 uses CSS)
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

## 📚 Key Concepts

### Server vs Client Components

- **Server Components**: Default in App Router (no 'use client')
- **Client Components**: Use 'use client' directive for interactivity

### Data Fetching

- Use React Server Components for initial data
- Use Zustand for client-side state
- Use Socket.io for real-time updates

### Type Safety

All components, functions, and API calls are fully typed:

```typescript
// Type-safe API call
const response: ApiResponse<Assignment> = await api.assignments.getById(id);

// Type-safe component props
const MyComponent: React.FC<MyComponentProps> = (props) => { ... }

// Type-safe store
const assignments: Assignment[] = useAssignments();
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Module not found errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue**: TypeScript errors
```bash
# Solution: Restart TypeScript server in VS Code
# Command Palette > TypeScript: Restart TS Server
```

**Issue**: Styles not applying
```bash
# Solution: Restart dev server
# TailwindCSS v4 may need restart for config changes
```

## 🤝 Contributing

### Development Workflow

1. Create feature branch
2. Make changes following guidelines
3. Test thoroughly
4. Update documentation
5. Submit pull request

### Code Review Checklist

- [ ] TypeScript types defined
- [ ] Components are responsive
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Accessibility considered
- [ ] Documentation updated

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## 📄 License

This project is part of the VedaAI Hiring Assignment.

## 👥 Team

**VedaAI Development Team**

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-28

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).
