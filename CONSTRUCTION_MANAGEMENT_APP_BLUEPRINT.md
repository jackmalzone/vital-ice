# Construction Management App - Optimized Blueprint

_Based on lessons learned from Vital Ice project and senior engineering best practices_

## 🎯 **Project Overview**

A modern, scalable construction management application built with enterprise-grade architecture, comprehensive testing, and optimal developer experience.

## 🛠️ **Production-Ready Tech Stack**

### **Frontend (Web & Mobile UX)**

- **Framework**: Next.js (App Router) + React + TypeScript
- **Styling**: CSS Modules (colocated with components, BEM conventions)
- **UI Design**: Glassmorphism + real photographic backgrounds, responsive layouts
- **Animations/UX**: Framer Motion (subtle transitions), Intersection Observer for scroll effects
- **State Management**: React Context + custom hooks (useUserRole, useModal, etc.)
- **Offline-first (future)**: Replicache or local DB sync for mobile crews

### **Backend / API**

- **Primary DB**: PostgreSQL (Supabase/Neon managed)
  - JSONB for flexible custom fields
  - Row-Level Security (multi-tenant, role-based)
  - Extensions: pgvector (semantic search), ltree (hierarchical tasks/budgets)
- **API Layer**:
  - MVP: REST (NestJS/Express + Prisma) with composite endpoints & include= filters
  - Upgrade path: GraphQL (Hasura or Apollo Server) for complex cross-references
- **Auth & Identity**: Supabase Auth or Clerk; JWT/RLS enforcement
- **File Storage**: S3-compatible (AWS S3 or Cloudflare R2), metadata in PostgreSQL
- **Search/Discovery**: Meilisearch or Typesense, linked to Postgres events

### **Background Tasks (Daemon)**

- **MVP**: Graphile Worker (Postgres-native jobs)
- **Optional**: BullMQ + Redis (if higher throughput needed)
- **Upgrade path**: Temporal for long-running workflows (permits, inspections, CO approvals)
- **Event Bus**: Outbox pattern (append-only events in DB → daemon/queue consumers)

### **Intelligence / Data Science (Future Layers)**

- **Dashboards & Rollups**: SQL views + warehouse sync (DuckDB/BigQuery/Parquet)
- **Anomaly Detection**: XGBoost/Prophet models (schedule risk, cost overruns)
- **OCR & Parsing**: AWS Textract/Tesseract → normalize invoices, permits, COs
- **Photo Classification**: Pre-trained CV models (PyTorch) for site progress checks
- **AI Summaries**: LLM-assisted weekly client reports from logs/photos

### **Infrastructure / DevOps**

- **Hosting**:
  - Frontend: Vercel (Next.js SSR)
  - API/Workers: Fly.io or Render (Dockerized Node services)
  - DB: Supabase/Neon (managed Postgres)
- **CI/CD**: GitHub Actions → deploy to Vercel/Fly.io
- **Cron/Schedulers**: Cloudflare Cron or Vercel cron → enqueue jobs
- **Observability**:
  - Logs: OpenTelemetry + Grafana/Loki
  - Errors: Sentry (frontend + backend)
  - Metrics: Grafana/Prometheus or hosted APM
- **Security**: TLS everywhere, RBAC, Postgres RLS, secrets in Vault or environment

## 📁 **Modular Project Structure**

```
construction-app/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── e2e.yml
│       └── deploy.yml
├── .kiro/
│   ├── settings/
│   └── steering/
├── docs/                 # Markdown docs + renderer
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── development/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── app/              # Next.js routing & layouts
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   ├── team/
│   │   │   └── reports/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── projects/
│   │   │   └── graphile/  # Graphile Worker endpoints
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/       # UI components (with .module.css colocated)
│   │   ├── ui/           # Reusable UI primitives
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   └── features/     # Feature-specific components
│   ├── modules/          # Feature domains
│   │   ├── timeline/     # Project timeline management
│   │   ├── timeclock/    # Time tracking
│   │   ├── estimates/    # Cost estimation
│   │   ├── budgets/      # Budget management
│   │   ├── materials/    # Material tracking
│   │   ├── permits/      # Permit management
│   │   └── inspections/  # Inspection workflows
│   ├── contexts/         # React contexts
│   │   ├── RoleContext.tsx      # useUserRole
│   │   ├── ModalContext.tsx     # useModal
│   │   ├── OnboardingContext.tsx # useOnboarding
│   │   └── OfflineContext.tsx   # Offline sync state
│   ├── types/            # Global TypeScript types
│   │   ├── database.ts   # Prisma/Supabase types
│   │   ├── api.ts        # API response types
│   │   └── css-modules.d.ts
│   ├── utils/            # Helpers
│   │   ├── validation.ts # Zod schemas
│   │   ├── formatting.ts # Date/currency formatting
│   │   ├── api-client.ts # HTTP client
│   │   └── offline-sync.ts # Replicache integration
│   └── styles/           # Global styles and design tokens
│       ├── globals.css
│       └── tokens.css
├── daemon/               # Background workers
│   ├── jobs/             # Graphile Worker tasks
│   │   ├── email-notifications.ts
│   │   ├── report-generation.ts
│   │   ├── data-sync.ts
│   │   └── ocr-processing.ts
│   ├── handlers/         # Job handlers
│   └── worker.ts         # Main worker process
├── tests/
│   ├── __mocks__/
│   ├── e2e/
│   ├── integration/
│   └── unit/
├── .env.example
├── .env.local
├── postcss.config.js
├── .stylelintrc.json
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

## 🏗️ **Modular Construction Ledger Architecture**

### **Core Philosophy → Product**

- **Data Model**: Fluid, relational, modular (like a graph, not silos)
- **UI**: Modular dashboards, context-aware, progressive disclosure
- **Core Product**: A modular cross-referenced construction ledger (estimates, budgets, schedules, logs, invoices, materials, subs — all interwoven)

### **Feature Modules**

```typescript
// Feature domains with cross-references
src/modules/
├── timeline/         # Project scheduling & milestones
│   ├── components/   # Timeline UI components
│   ├── hooks/        # useTimeline, useSchedule
│   ├── types.ts      # Timeline-specific types
│   └── utils.ts      # Schedule calculations
├── timeclock/        # Time tracking & labor
│   ├── components/   # Clock in/out, timesheet views
│   ├── hooks/        # useTimeclock, useTimesheet
│   └── integrations/ # Payroll system connections
├── estimates/        # Cost estimation & bidding
│   ├── components/   # Estimate builder, line items
│   ├── templates/    # Estimate templates
│   └── calculations/ # Cost calculation engine
├── budgets/          # Budget management & tracking
│   ├── components/   # Budget dashboard, variance reports
│   ├── hooks/        # useBudget, useVariance
│   └── analytics/    # Budget analysis tools
├── materials/        # Material tracking & procurement
│   ├── components/   # Inventory, purchase orders
│   ├── suppliers/    # Supplier management
│   └── tracking/     # Delivery & usage tracking
├── permits/          # Permit management & compliance
│   ├── components/   # Permit dashboard, applications
│   ├── workflows/    # Approval workflows
│   └── compliance/   # Regulatory compliance checks
├── inspections/      # Inspection workflows
│   ├── components/   # Inspection forms, checklists
│   ├── scheduling/   # Inspector scheduling
│   └── reports/      # Inspection reports
├── invoicing/        # Billing & invoicing
│   ├── components/   # Invoice builder, payment tracking
│   ├── templates/    # Invoice templates
│   └── integrations/ # Accounting system connections
└── reporting/        # Analytics & business intelligence
    ├── dashboards/   # Executive dashboards
    ├── analytics/    # Data analysis tools
    └── exports/      # Report generation
```

### **Context-Based State Management**

```typescript
// src/contexts/RoleContext.tsx
interface UserRole {
  id: string;
  role: 'admin' | 'project_manager' | 'contractor' | 'client' | 'crew_member';
  permissions: string[];
  projects: string[];
}

interface RoleContextType {
  userRole: UserRole | null;
  hasPermission: (permission: string) => boolean;
  canAccessProject: (projectId: string) => boolean;
  switchRole: (roleId: string) => Promise<void>;
}

export const useUserRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within RoleProvider');
  }
  return context;
};

// src/contexts/ModalContext.tsx
interface ModalContextType {
  modals: Map<string, ModalConfig>;
  openModal: (id: string, config: ModalConfig) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

// src/contexts/OfflineContext.tsx
interface OfflineContextType {
  isOnline: boolean;
  syncStatus: 'idle' | 'syncing' | 'error';
  pendingChanges: number;
  lastSync: Date | null;
  forcSync: () => Promise<void>;
}

export const useOfflineSync = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOfflineSync must be used within OfflineProvider');
  }
  return context;
};

// Custom hooks for domain-specific state
// src/modules/timeline/hooks/useTimeline.ts
export const useTimeline = (projectId: string) => {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const addMilestone = useCallback(
    async (milestone: Milestone) => {
      // Add milestone logic with optimistic updates
      setTimeline(prev => [...prev, milestone]);
      try {
        await api.timeline.addMilestone(projectId, milestone);
      } catch (error) {
        // Rollback on error
        setTimeline(prev => prev.filter(m => m.id !== milestone.id));
        throw error;
      }
    },
    [projectId]
  );

  return {
    timeline,
    loading,
    addMilestone,
    updateMilestone,
    deleteMilestone,
  };
};
```

## 🎨 **Design System Implementation**

### **Glassmorphism Design System with BEM**

```css
/* src/styles/tokens.css */
:root {
  /* Construction industry color palette */
  --color-primary-50: #f0f9ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  --color-construction-orange: #f97316;
  --color-construction-yellow: #eab308;
  --color-construction-green: #22c55e;
  --color-construction-red: #ef4444;

  --color-status-pending: #f59e0b;
  --color-status-progress: #3b82f6;
  --color-status-completed: #10b981;
  --color-status-overdue: #ef4444;

  /* Glassmorphism properties */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-bg-dark: rgba(0, 0, 0, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  --glass-backdrop: blur(8px);
  --glass-backdrop-strong: blur(16px);

  /* Typography */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  /* Spacing (BEM-friendly) */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;

  /* Glassmorphism shadows */
  --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  --shadow-glass-strong: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
  --shadow-inset: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);

  /* Animations */
  --transition-fast: 150ms ease-out;
  --transition-normal: 200ms ease-out;
  --transition-slow: 300ms ease-out;
  --transition-glass: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Background images for construction sites */
.bg-construction {
  background-image:
    linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%),
    url('/images/construction-site-1.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.bg-construction--blueprint {
  background-image:
    linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%),
    url('/images/blueprints.jpg');
}

.bg-construction--tools {
  background-image:
    linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%),
    url('/images/construction-tools.jpg');
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --glass-bg: rgba(0, 0, 0, 0.2);
    --glass-bg-dark: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
  }
}
```

### **Global Styles**

```css
/* src/styles/globals.css */
@import './tokens.css';

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: var(--font-family-sans);
  line-height: 1.6;
  color: #1f2937;
  background-color: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* Utility classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-lg);
  }
}
```

### **Advanced UI Components**

#### **SmartPanel Component (CSS Modules)**

```typescript
// src/components/ui/SmartPanel/SmartPanel.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './SmartPanel.module.css';

interface SmartPanelProps {
  isVisible: boolean;
  title: string;
  accentColor?: string;
  children: React.ReactNode;
  anchorSelector?: string;
  panelSide?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClose?: () => void;
}

export const SmartPanel: React.FC<SmartPanelProps> = ({
  isVisible,
  title,
  accentColor = 'var(--color-primary-500)',
  children,
  anchorSelector,
  panelSide = 'right',
  size = 'md',
  onClose,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  useEffect(() => {
    if (!isVisible || !anchorSelector) {
      setIsPositioned(false);
      return;
    }

    setIsPositioned(false);

    const timeoutId = setTimeout(() => {
      const anchorElement = document.querySelector(anchorSelector) as HTMLElement;
      if (!anchorElement) return;

      const anchorRect = anchorElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const anchorCenterX = anchorRect.left + anchorRect.width / 2;
      const anchorCenterY = anchorRect.top + anchorRect.height / 2;

      const panelWidth = size === 'sm' ? 280 : size === 'lg' ? 400 : size === 'xl' ? 500 : 320;
      const panelHeight = 200;
      const offset = 60;

      let x: number;
      let y = anchorCenterY - panelHeight / 2;

      if (panelSide === 'right') {
        x = anchorCenterX + offset;
        if (x + panelWidth > viewportWidth - 20) {
          x = anchorCenterX - panelWidth - offset;
        }
      } else {
        x = anchorCenterX - panelWidth - offset;
        if (x < 20) {
          x = anchorCenterX + offset;
        }
      }

      x = Math.max(20, Math.min(x, viewportWidth - panelWidth - 20));
      y = Math.max(20, Math.min(y, viewportHeight - panelHeight - 20));

      setPosition({ x, y });

      setTimeout(() => {
        setIsPositioned(true);
      }, 20);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [anchorSelector, isVisible, panelSide, size]);

  if (!isVisible) return null;

  return (
    <div
      ref={panelRef}
      className={`${styles.smartPanel} ${styles[size]}`}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        '--accent-color': accentColor,
        zIndex: 1000,
        opacity: isVisible && isPositioned ? 1 : 0,
        pointerEvents: isVisible && isPositioned ? 'auto' : 'none',
      } as React.CSSProperties}
    >
      <div className={styles.panelHeader}>
        <div className={styles.panelStatus}>
          <span className={styles.panelDot} />
          <span className={styles.panelStatusText}>{title.toUpperCase()}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className={styles.closeButton}>
            <X size={16} />
          </button>
        )}
      </div>
      <div className={styles.panelContent}>{children}</div>
    </div>
  );
};

```

```css
/* src/components/ui/SmartPanel/SmartPanel.module.css */
/* BEM naming convention with glassmorphism */
.smart-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop-strong);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-glass);
  border: 1px solid var(--glass-border);
  transition: var(--transition-glass);
  transform: translateZ(0);
  will-change: transform, opacity;
  position: relative;
  overflow: hidden;
}

.smart-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--glass-border);
  box-shadow: var(--shadow-inset);
}

.smart-panel--size-sm {
  width: 280px;
  max-height: 300px;
}

.smart-panel--size-md {
  width: 320px;
  max-height: 400px;
}

.smart-panel--size-lg {
  width: 400px;
  max-height: 500px;
}

.smart-panel--size-xl {
  width: 500px;
  max-height: 600px;
}

.smartPanel.sm {
  width: 280px;
  max-height: 300px;
}

.smartPanel.md {
  width: 320px;
  max-height: 400px;
}

.smartPanel.lg {
  width: 400px;
  max-height: 500px;
}

.smartPanel.xl {
  width: 500px;
  max-height: 600px;
}

.panelHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.panelStatus {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.panelDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent-color);
  animation: pulse 2s infinite;
}

.panelStatusText {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.05em;
}

.closeButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  color: #6b7280;
  transition: all var(--transition-fast);
}

.closeButton:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #374151;
}

.panelContent {
  padding: var(--spacing-md);
  overflow-y: auto;
  max-height: calc(100% - 60px);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .smartPanel {
    background: rgba(31, 41, 55, 0.95);
    border-color: rgba(75, 85, 99, 0.3);
  }

  .panelHeader {
    border-bottom-color: rgba(75, 85, 99, 0.3);
  }

  .panelStatusText {
    color: #9ca3af;
  }

  .closeButton {
    color: #9ca3af;
  }

  .closeButton:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #d1d5db;
  }
}
```

#### **Enhanced Button Component (CSS Modules)**

```typescript
// src/components/ui/Button/Button.tsx
import React, { forwardRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'construction';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading,
    leftIcon,
    rightIcon,
    children,
    className,
    fullWidth,
    ...props
  }, ref) => {
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <span className={styles.spinner} />}
        {leftIcon && !loading && <span className={styles.leftIcon}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

```css
/* src/components/ui/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  font-weight: 500;
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-500);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background-color: var(--color-primary-500);
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.danger {
  background-color: var(--color-construction-red);
  color: white;
}

.danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.ghost {
  background-color: transparent;
  color: #374151;
}

.ghost:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.construction {
  background-color: var(--color-construction-orange);
  color: white;
}

.construction:hover:not(:disabled) {
  background-color: #ea580c;
}

/* Sizes */
.sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.875rem;
  min-height: 32px;
}

.md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.875rem;
  min-height: 40px;
}

.lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1rem;
  min-height: 48px;
}

/* Modifiers */
.fullWidth {
  width: 100%;
}

.loading {
  pointer-events: none;
}

/* Icons */
.leftIcon {
  margin-right: var(--spacing-sm);
  display: flex;
  align-items: center;
}

.rightIcon {
  margin-left: var(--spacing-sm);
  display: flex;
  align-items: center;
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--spacing-sm);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .button {
    min-height: 44px; /* Better touch targets on mobile */
  }
}
```

## 🔐 **Authentication & Authorization**

### **NextAuth.js Configuration**

```typescript
// src/lib/auth/config.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await verifyUser(credentials.email, credentials.password);
        return user
          ? {
              id: user.id,
              email: user.email,
              role: user.role,
              permissions: user.permissions,
            }
          : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.permissions = token.permissions;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
};
```

### **RBAC Implementation**

```typescript
// src/lib/auth/permissions.ts
export enum Role {
  ADMIN = 'admin',
  PROJECT_MANAGER = 'project_manager',
  CONTRACTOR = 'contractor',
  CLIENT = 'client',
}

export enum Permission {
  CREATE_PROJECT = 'create_project',
  EDIT_PROJECT = 'edit_project',
  DELETE_PROJECT = 'delete_project',
  VIEW_REPORTS = 'view_reports',
  MANAGE_TEAM = 'manage_team',
}

export const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.PROJECT_MANAGER]: [
    Permission.CREATE_PROJECT,
    Permission.EDIT_PROJECT,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_TEAM,
  ],
  [Role.CONTRACTOR]: [Permission.EDIT_PROJECT, Permission.VIEW_REPORTS],
  [Role.CLIENT]: [Permission.VIEW_REPORTS],
};

// Permission checking hook
export const usePermissions = () => {
  const { data: session } = useSession();

  const hasPermission = (permission: Permission): boolean => {
    if (!session?.user?.role) return false;
    return rolePermissions[session.user.role as Role]?.includes(permission) ?? false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  return { hasPermission, hasAnyPermission };
};
```

## 🗄️ **PostgreSQL Schema with Advanced Features**

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "ltree";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Core schema with JSONB for flexible custom fields
-- Row-Level Security (RLS) for multi-tenant, role-based access

-- Users table with role-based permissions
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'contractor',
  permissions JSONB DEFAULT '[]'::jsonb,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Projects with hierarchical structure using ltree
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  address TEXT,
  hierarchy LTREE, -- For project/subproject relationships
  custom_fields JSONB DEFAULT '{}'::jsonb,
  search_vector TSVECTOR, -- Full-text search
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX projects_hierarchy_idx ON projects USING GIST (hierarchy);
CREATE INDEX projects_search_idx ON projects USING GIN (search_vector);
CREATE INDEX projects_custom_fields_idx ON projects USING GIN (custom_fields);

-- Tasks with hierarchical structure
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',
  priority VARCHAR(20) DEFAULT 'medium',
  hierarchy LTREE, -- For task/subtask relationships
  due_date TIMESTAMP WITH TIME ZONE,
  estimated_hours INTEGER,
  actual_hours INTEGER,
  assignee_id UUID REFERENCES users(id),
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Estimates with line items
CREATE TABLE estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  version INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'draft',
  total_amount DECIMAL(15,2),
  markup_percentage DECIMAL(5,2) DEFAULT 0,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE estimate_line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE,
  category VARCHAR(100),
  description TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit VARCHAR(50),
  unit_cost DECIMAL(10,2),
  total_cost DECIMAL(15,2),
  hierarchy LTREE, -- For nested line items
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Materials tracking
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  supplier VARCHAR(255),
  unit VARCHAR(50),
  unit_cost DECIMAL(10,2),
  quantity_ordered DECIMAL(10,2),
  quantity_delivered DECIMAL(10,2),
  quantity_used DECIMAL(10,2),
  delivery_date DATE,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time tracking
CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  description TEXT,
  hourly_rate DECIMAL(8,2),
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Permits and inspections
CREATE TABLE permits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  permit_type VARCHAR(100) NOT NULL,
  permit_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  application_date DATE,
  approval_date DATE,
  expiration_date DATE,
  inspector_name VARCHAR(255),
  notes TEXT,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File storage metadata
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size BIGINT,
  mime_type VARCHAR(100),
  category VARCHAR(100),
  uploaded_by UUID REFERENCES users(id),
  ocr_text TEXT, -- For searchable documents
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event sourcing for audit trail
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aggregate_type VARCHAR(100) NOT NULL,
  aggregate_id UUID NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB NOT NULL,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Background job queue (Graphile Worker compatible)
CREATE TABLE job_queue (
  id SERIAL PRIMARY KEY,
  queue_name VARCHAR(128),
  task_identifier VARCHAR(128) NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  priority INTEGER DEFAULT 0,
  run_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 25,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies
CREATE POLICY users_policy ON users
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY projects_policy ON projects
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = projects.id
      AND user_id = auth.uid()
    )
  );

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

````

## 📊 **Advanced Features Implementation**

### **Real-time Dashboard with Smart Panels**

```typescript
// src/app/(dashboard)/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SmartPanel } from '@/components/ui/SmartPanel';
import { ProjectOverview } from '@/components/features/dashboard/ProjectOverview';
import { TaskSummary } from '@/components/features/dashboard/TaskSummary';
import { TeamActivity } from '@/components/features/dashboard/TeamActivity';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.dashboard.getOverview(),
  });

  return (
    <div className={styles.dashboard}>
      <div className="container">
        <div className={styles.dashboardGrid}>
          {/* Project Cards with Smart Panel Integration */}
          <div className={styles.projectSection}>
            {dashboardData?.projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={() => setActivePanel(`project-${project.id}`)}
              />
            ))}
          </div>

          {/* Task Overview */}
          <TaskSummary tasks={dashboardData?.tasks} />

          {/* Team Activity */}
          <TeamActivity activities={dashboardData?.activities} />
        </div>

        {/* Smart Panels for Detailed Views */}
        {activePanel?.startsWith('project-') && (
          <SmartPanel
            isVisible={true}
            title="Project Details"
            size="lg"
            anchorSelector={`[data-project-id="${activePanel.replace('project-', '')}"]`}
            onClose={() => setActivePanel(null)}
          >
            <ProjectOverview
              projectId={activePanel.replace('project-', '')}
            />
          </SmartPanel>
        )}
      </div>
    </div>
  );
}
````

```css
/* src/app/(dashboard)/DashboardPage.module.css */
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
  padding: var(--spacing-lg) 0;
}

.dashboardGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .dashboardGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .dashboardGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.projectSection {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
```

### **Responsive Layout System**

```typescript
// src/components/layout/ResponsiveLayout.tsx
interface ResponsiveLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {sidebar && (
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300',
            isMobile
              ? sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              : 'translate-x-0'
          )}
        >
          {sidebar}
        </aside>
      )}

      {/* Main content */}
      <div className={cn('flex flex-col', sidebar && !isMobile && 'ml-64')}>
        {/* Header */}
        {header && (
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              {isMobile && sidebar && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              {header}
            </div>
          </header>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        {footer && (
          <footer className="bg-white border-t border-gray-200">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};
```

### **Advanced Form System**

```typescript
// src/components/forms/ProjectForm.tsx
interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: CreateProjectInput) => Promise<void>;
  onCancel?: () => void;
}

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  budget: z.number().positive().optional(),
  address: z.string().optional(),
  teamMembers: z.array(z.string()).min(1, 'At least one team member required'),
});

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData,
  });

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      toast.success('Project created successfully');
      form.reset();
    },
    onError: (error) => {
      toast.error('Failed to create project');
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => createProject(data))} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Project description..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Select start date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Select end date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" loading={isLoading} variant="construction">
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
};
```

## 🔄 **Documentation Automation System**

### **Auto-Documentation Scripts**

```typescript
// scripts/update-project-status.js
const fs = require('fs').promises;
const path = require('path');

async function updateProjectStatus() {
  try {
    const componentsDir = path.join(__dirname, '../src/components');
    const files = await getAllFiles(componentsDir, '.tsx');

    const totalComponents = files.length;
    const migratedComponents = files.filter(
      file => file.includes('use client') || file.includes('forwardRef')
    ).length;

    const completionPercentage = Math.round((migratedComponents / totalComponents) * 100);

    const statusUpdate = `
# Construction Management App - Development Status

**Last Updated:** ${new Date().toISOString().split('T')[0]}

## Component Migration Progress
- **Total Components:** ${totalComponents}
- **Migrated Components:** ${migratedComponents}
- **Completion:** ${completionPercentage}%

## Recent Updates
- Smart Panel system implemented
- Responsive layout system completed
- Advanced form validation added
- Real-time dashboard features integrated

## Next Steps
- [ ] Complete remaining component migrations
- [ ] Implement advanced reporting features
- [ ] Add real-time notifications
- [ ] Optimize performance and bundle size
    `;

    await fs.writeFile(path.join(__dirname, '../docs/PROJECT_STATUS.md'), statusUpdate);

    console.log(`✅ Project status updated: ${completionPercentage}% complete`);
  } catch (error) {
    console.error('❌ Failed to update project status:', error);
  }
}

async function getAllFiles(dir, extension) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...(await getAllFiles(fullPath, extension)));
    } else if (item.name.endsWith(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

updateProjectStatus();
```

### **Component Documentation Generator**

```typescript
// scripts/generate-component-docs.js
const fs = require('fs').promises;
const path = require('path');

async function generateComponentDocs() {
  const componentsDir = path.join(__dirname, '../src/components/ui');
  const components = await fs.readdir(componentsDir);

  let docsContent = `# UI Components Documentation

This document provides an overview of all available UI components in the Construction Management App.

## Components Overview

`;

  for (const component of components) {
    const componentPath = path.join(componentsDir, component);
    const stat = await fs.stat(componentPath);

    if (stat.isDirectory()) {
      const indexFile = path.join(componentPath, `${component}.tsx`);

      try {
        const content = await fs.readFile(indexFile, 'utf-8');
        const interfaceMatch = content.match(/interface\s+(\w+Props)\s*{([^}]+)}/);

        if (interfaceMatch) {
          docsContent += `### ${component}

**Props Interface:** \`${interfaceMatch[1]}\`

\`\`\`typescript
interface ${interfaceMatch[1]} {${interfaceMatch[2]}}
\`\`\`

**Usage Example:**
\`\`\`tsx
import { ${component} } from '@/components/ui/${component}';

<${component} 
  // Add your props here
/>
\`\`\`

---

`;
        }
      } catch (error) {
        console.warn(`⚠️  Could not process ${component}:`, error.message);
      }
    }
  }

  await fs.writeFile(path.join(__dirname, '../docs/COMPONENTS.md'), docsContent);

  console.log('✅ Component documentation generated successfully');
}

generateComponentDocs();
```

## 🚀 **Performance Optimization**

### **Bundle Optimization**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // CSS Modules configuration
  cssModules: true,
  webpack: (config, { dev, isServer }) => {
    // CSS Modules optimization
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: dev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            },
          },
        },
      ],
    });

    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

### **Database Query Optimization**

```typescript
// src/lib/api/projects.ts
export const projectQueries = {
  // Optimized query with proper relations and pagination
  getProjects: async (params: GetProjectsParams) => {
    const { page = 1, limit = 10, status, search } = params;

    return await prisma.project.findMany({
      where: {
        ...(status && { status }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true },
            },
          },
        },
        tasks: {
          select: { id: true, status: true, priority: true },
        },
        _count: {
          select: { tasks: true, documents: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  },

  // Optimized single project query
  getProject: async (id: string) => {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        tasks: {
          include: {
            assignee: {
              select: { id: true, name: true, email: true },
            },
            comments: {
              include: {
                author: {
                  select: { id: true, name: true },
                },
              },
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
          },
          orderBy: { updatedAt: 'desc' },
        },
        timeline: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  },
};
```

```

```

## 🧪 **Testing Strategy**

### **Component Testing with Testing Library**

```typescript
// tests/components/SmartPanel.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SmartPanel } from '@/components/ui/SmartPanel';

describe('SmartPanel', () => {
  it('renders with title and children', () => {
    render(
      <SmartPanel title="Test Panel">
        <div>Panel content</div>
      </SmartPanel>
    );

    expect(screen.getByText('Test Panel')).toBeInTheDocument();
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <SmartPanel title="Test Panel" onClose={onClose}>
        <div>Content</div>
      </SmartPanel>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies correct position classes', () => {
    const { container } = render(
      <SmartPanel position="top-right">
        <div>Content</div>
      </SmartPanel>
    );

    expect(container.firstChild?.firstChild).toHaveClass('top-4', 'right-4');
  });
});
```

### **E2E Testing with Playwright**

```typescript
// tests/e2e/project-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Project Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid=email]', 'admin@construction.com');
    await page.fill('[data-testid=password]', 'password');
    await page.click('[data-testid=login-button]');
    await page.waitForURL('/dashboard');
  });

  test('should create a new project', async ({ page }) => {
    await page.click('[data-testid=new-project-button]');

    await page.fill('[data-testid=project-name]', 'Test Construction Project');
    await page.fill('[data-testid=project-description]', 'A test project for e2e testing');
    await page.fill('[data-testid=project-budget]', '100000');

    await page.click('[data-testid=create-project-submit]');

    await expect(page.locator('[data-testid=success-toast]')).toBeVisible();
    await expect(page.locator('text=Test Construction Project')).toBeVisible();
  });

  test('should open project details in smart panel', async ({ page }) => {
    await page.click('[data-testid=project-card]:first-child');

    await expect(page.locator('[data-testid=smart-panel]')).toBeVisible();
    await expect(page.locator('text=Project Details')).toBeVisible();

    // Test panel positioning
    const panel = page.locator('[data-testid=smart-panel]');
    await expect(panel).toHaveClass(/center/);
  });
});
```

### **API Testing with MSW**

```typescript
// tests/mocks/handlers.ts
import { rest } from 'msw';
import { mockProjects, mockTasks, mockUsers } from './data';

export const handlers = [
  rest.get('/api/projects', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const limit = req.url.searchParams.get('limit') || '10';

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);

    return res(
      ctx.json({
        projects: mockProjects.slice(startIndex, endIndex),
        total: mockProjects.length,
        page: parseInt(page),
        limit: parseInt(limit),
      })
    );
  }),

  rest.post('/api/projects', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 'new-project-id',
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
  }),

  rest.get('/api/projects/:id', (req, res, ctx) => {
    const { id } = req.params;
    const project = mockProjects.find(p => p.id === id);

    if (!project) {
      return res(ctx.status(404), ctx.json({ error: 'Project not found' }));
    }

    return res(ctx.json(project));
  }),
];
```

## 📱 **Mobile Optimization**

### **Progressive Web App Configuration**

```typescript
// next.config.js (PWA section)
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
  ],
});

module.exports = withPWA(nextConfig);
```

### **Mobile-First Responsive Components**

```typescript
// src/components/layout/MobileNavigation.tsx
export const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/projects', label: 'Projects', icon: Building },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/team', label: 'Team', icon: Users },
    { href: '/reports', label: 'Reports', icon: BarChart },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 text-xs transition-colors',
                pathname === href
                  ? 'text-construction-orange bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Header with Menu */}
      <header className="sticky top-0 bg-white border-b border-gray-200 md:hidden z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">
            Construction Manager
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={setIsOpen} className="relative z-50 md:hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center justify-between">
                    <span className="text-lg font-semibold">Menu</span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="flex flex-1 flex-col">
                    <ul className="space-y-2">
                      {navigationItems.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              'flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                              pathname === href
                                ? 'bg-construction-orange text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            )}
                          >
                            <Icon className="w-5 h-5" />
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
```

## 🔧 **Development Workflow**

### **Git Hooks and Automation**

```json
// package.json
{
  "name": "construction-management-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:coverage": "vitest --coverage",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "docs:update": "node scripts/update-project-status.js",
    "docs:generate": "node scripts/generate-component-docs.js",
    "docs:validate": "node scripts/validate-docs.js",
    "css:lint": "stylelint '**/*.css' --fix",
    "prepare": "husky install"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "@tanstack/react-query": "^5.0.0",
    "@trpc/client": "^11.0.0",
    "@trpc/server": "^11.0.0",
    "@trpc/react-query": "^11.0.0",
    "next-auth": "^4.24.0",
    "zustand": "^4.4.0",
    "immer": "^10.0.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.292.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "playwright": "^1.40.0",
    "prisma": "^5.0.0",
    "tsx": "^4.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "stylelint": "^16.0.0",
    "stylelint-config-standard": "^36.0.0"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run type-check && npm run test"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix", "prettier --write"],
    "*.{md,json}": ["prettier --write"]
  }
}
```

### **Environment Configuration**

```bash
# .env.example
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/construction_db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# External APIs
WEATHER_API_KEY="your-weather-api-key"
MAPS_API_KEY="your-maps-api-key"

# File Storage
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
POSTHOG_KEY="your-posthog-key"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🚀 **Deployment Strategy**

### **Vercel Deployment Configuration**

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  },
  "build": {
    "env": {
      "SKIP_ENV_VALIDATION": "1"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### **CI/CD Pipeline**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

  deploy:
    runs-on: ubuntu-latest
    needs: [test, e2e]
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📈 **Monitoring and Analytics**

### **Error Tracking with Sentry**

```typescript
// src/lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  beforeSend(event) {
    // Filter out non-critical errors in production
    if (process.env.NODE_ENV === 'production') {
      if (event.exception) {
        const error = event.exception.values?.[0];
        if (error?.type === 'ChunkLoadError') {
          return null; // Don't send chunk load errors
        }
      }
    }
    return event;
  },
});

export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const addBreadcrumb = Sentry.addBreadcrumb;
```

### **Performance Monitoring**

```typescript
// src/lib/monitoring/performance.ts
export const performanceMonitor = {
  startTransaction: (name: string) => {
    return performance.mark(`${name}-start`);
  },

  endTransaction: (name: string) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const measure = performance.getEntriesByName(name)[0];
    if (measure.duration > 1000) {
      console.warn(`Slow operation detected: ${name} took ${measure.duration}ms`);
    }

    return measure.duration;
  },

  trackPageLoad: () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;

        // Track with analytics
        if (loadTime > 3000) {
          console.warn(`Slow page load: ${loadTime}ms`);
        }
      });
    }
  },
};
```

---

## 🎯 **Implementation Roadmap**

### **Phase 1: Foundation (Weeks 1-2)**

- [ ] Project setup with Next.js 15 and TypeScript
- [ ] Database schema design and Prisma setup
- [ ] Authentication system with NextAuth.js
- [ ] Basic UI components and design system
- [ ] SmartPanel component implementation

### **Phase 2: Core Features (Weeks 3-6)**

- [ ] Project management CRUD operations
- [ ] Task management system
- [ ] Team management and RBAC
- [ ] Real-time dashboard with smart panels
- [ ] Responsive layout system

### **Phase 3: Advanced Features (Weeks 7-10)**

- [ ] Document management system
- [ ] Advanced reporting and analytics
- [ ] Real-time notifications
- [ ] Mobile optimization and PWA
- [ ] Performance optimization

### **Phase 4: Testing & Deployment (Weeks 11-12)**

- [ ] Comprehensive testing suite
- [ ] E2E testing with Playwright
- [ ] CI/CD pipeline setup
- [ ] Production deployment
- [ ] Monitoring and analytics setup

### **Phase 5: Documentation & Maintenance (Ongoing)**

- [ ] Complete documentation system
- [ ] Automated documentation updates
- [ ] Performance monitoring
- [ ] User feedback integration
- [ ] Continuous improvements

---

This blueprint incorporates all the optimized patterns, components, and best practices from your Vital Ice project, providing a comprehensive foundation for building a world-class construction management application.

### **CSS Modules Configuration**

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-custom-properties': {
      preserve: false,
    },
    'postcss-nested': {},
    'postcss-import': {},
  },
};
```

```json
// .stylelintrc.json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]*$",
    "custom-property-pattern": "^[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",
    "declaration-block-trailing-semicolon": "always",
    "indentation": 2,
    "max-nesting-depth": 3,
    "selector-max-id": 0,
    "selector-no-qualifying-type": [
      true,
      {
        "ignore": ["attribute", "class"]
      }
    ]
  },
  "ignoreFiles": ["node_modules/**/*", "dist/**/*", ".next/**/*"]
}
```

### **TypeScript Configuration for CSS Modules**

```typescript
// src/types/css-modules.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}
```

```json
// tsconfig.json (CSS Modules section)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/components/*": ["./src/components/*"]
    }
  },
  "include": ["src/types/css-modules.d.ts"]
}
```

## 🔄 **Background Job System (Graphile Worker)**

### **Job Queue Implementation**

```typescript
// daemon/worker.ts
import { run } from 'graphile-worker';
import { Pool } from 'pg';
import * as jobs from './jobs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const runner = await run({
    pgPool: pool,
    concurrency: 5,
    noHandleSignals: false,
    pollInterval: 1000,
    taskList: {
      'email-notification': jobs.emailNotification,
      'report-generation': jobs.reportGeneration,
      'data-sync': jobs.dataSync,
      'ocr-processing': jobs.ocrProcessing,
      'permit-reminder': jobs.permitReminder,
      'budget-analysis': jobs.budgetAnalysis,
      'photo-classification': jobs.photoClassification,
    },
  });

  await runner.promise;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
```

### **Job Handlers**

```typescript
// daemon/jobs/email-notification.ts
import { Task } from 'graphile-worker';
import { sendEmail } from '../utils/email';

interface EmailNotificationPayload {
  to: string;
  template: string;
  data: Record<string, any>;
  projectId?: string;
}

export const emailNotification: Task = async (payload: EmailNotificationPayload) => {
  const { to, template, data, projectId } = payload;

  try {
    await sendEmail({
      to,
      template,
      data: {
        ...data,
        projectUrl: projectId ? `${process.env.APP_URL}/projects/${projectId}` : undefined,
      },
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error; // This will cause the job to retry
  }
};

// daemon/jobs/ocr-processing.ts
import { Task } from 'graphile-worker';
import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';
import { prisma } from '../utils/database';

interface OCRProcessingPayload {
  documentId: string;
  s3Bucket: string;
  s3Key: string;
}

export const ocrProcessing: Task = async (payload: OCRProcessingPayload) => {
  const { documentId, s3Bucket, s3Key } = payload;

  const textract = new TextractClient({ region: process.env.AWS_REGION });

  try {
    const command = new DetectDocumentTextCommand({
      Document: {
        S3Object: {
          Bucket: s3Bucket,
          Name: s3Key,
        },
      },
    });

    const response = await textract.send(command);
    const extractedText =
      response.Blocks?.filter(block => block.BlockType === 'LINE')
        .map(block => block.Text)
        .join('\n') || '';

    // Update document with OCR text
    await prisma.document.update({
      where: { id: documentId },
      data: { ocrText: extractedText },
    });

    // Trigger search index update
    await addJob('search-index-update', { documentId });

    console.log(`OCR processing completed for document ${documentId}`);
  } catch (error) {
    console.error('OCR processing failed:', error);
    throw error;
  }
};

// daemon/jobs/budget-analysis.ts
import { Task } from 'graphile-worker';
import { prisma } from '../utils/database';
import { analyzeVariance, predictOverruns } from '../utils/analytics';

interface BudgetAnalysisPayload {
  projectId: string;
  analysisType: 'variance' | 'prediction' | 'full';
}

export const budgetAnalysis: Task = async (payload: BudgetAnalysisPayload) => {
  const { projectId, analysisType } = payload;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        estimates: true,
        materials: true,
        timeEntries: true,
      },
    });

    if (!project) {
      throw new Error(`Project ${projectId} not found`);
    }

    let analysisResults = {};

    if (analysisType === 'variance' || analysisType === 'full') {
      analysisResults = {
        ...analysisResults,
        variance: await analyzeVariance(project),
      };
    }

    if (analysisType === 'prediction' || analysisType === 'full') {
      analysisResults = {
        ...analysisResults,
        prediction: await predictOverruns(project),
      };
    }

    // Store analysis results
    await prisma.event.create({
      data: {
        aggregateType: 'project',
        aggregateId: projectId,
        eventType: 'budget_analysis_completed',
        eventData: analysisResults,
      },
    });

    // Send notification if overrun predicted
    if (analysisResults.prediction?.riskLevel === 'high') {
      await addJob('email-notification', {
        to: project.managerEmail,
        template: 'budget-overrun-warning',
        data: { project, analysis: analysisResults },
        projectId,
      });
    }

    console.log(`Budget analysis completed for project ${projectId}`);
  } catch (error) {
    console.error('Budget analysis failed:', error);
    throw error;
  }
};
```

### **Job Scheduling**

```typescript
// src/utils/job-scheduler.ts
import { addJob } from 'graphile-worker';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const scheduleJob = async (
  taskName: string,
  payload: any,
  options: {
    runAt?: Date;
    maxAttempts?: number;
    priority?: number;
  } = {}
) => {
  return addJob(pool, taskName, payload, {
    runAt: options.runAt,
    maxAttempts: options.maxAttempts || 3,
    priority: options.priority || 0,
  });
};

// Schedule recurring jobs
export const scheduleRecurringJobs = async () => {
  // Daily budget analysis for active projects
  await scheduleJob(
    'budget-analysis-batch',
    {},
    {
      runAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    }
  );

  // Weekly permit reminders
  await scheduleJob(
    'permit-reminder-batch',
    {},
    {
      runAt: getNextWeekday(1), // Next Monday
    }
  );

  // Monthly report generation
  await scheduleJob(
    'monthly-report-batch',
    {},
    {
      runAt: getFirstDayOfNextMonth(),
    }
  );
};

// Utility functions
const getNextWeekday = (dayOfWeek: number): Date => {
  const date = new Date();
  const diff = dayOfWeek - date.getDay();
  const daysToAdd = diff > 0 ? diff : 7 + diff;
  date.setDate(date.getDate() + daysToAdd);
  date.setHours(9, 0, 0, 0); // 9 AM
  return date;
};

const getFirstDayOfNextMonth = (): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1, 1);
  date.setHours(6, 0, 0, 0); // 6 AM
  return date;
};
```

## 🔍 **Search & Discovery (Meilisearch Integration)**

### **Search Index Management**

```typescript
// src/utils/search.ts
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_URL || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY,
});

// Index configuration
export const initializeSearchIndexes = async () => {
  // Projects index
  const projectsIndex = client.index('projects');
  await projectsIndex.updateSettings({
    searchableAttributes: ['name', 'description', 'address', 'customFields'],
    filterableAttributes: ['status', 'startDate', 'endDate', 'budget'],
    sortableAttributes: ['createdAt', 'updatedAt', 'startDate', 'budget'],
    displayedAttributes: ['id', 'name', 'description', 'status', 'budget', 'address'],
  });

  // Documents index with OCR text
  const documentsIndex = client.index('documents');
  await documentsIndex.updateSettings({
    searchableAttributes: ['name', 'ocrText', 'category'],
    filterableAttributes: ['projectId', 'category', 'mimeType', 'createdAt'],
    sortableAttributes: ['createdAt', 'fileSize'],
  });

  // Tasks index
  const tasksIndex = client.index('tasks');
  await tasksIndex.updateSettings({
    searchableAttributes: ['title', 'description'],
    filterableAttributes: ['projectId', 'status', 'priority', 'assigneeId'],
    sortableAttributes: ['createdAt', 'dueDate', 'priority'],
  });
};

// Search functions
export const searchProjects = async (query: string, filters?: Record<string, any>) => {
  const index = client.index('projects');
  return await index.search(query, {
    filter: filters
      ? Object.entries(filters)
          .map(([key, value]) => `${key} = "${value}"`)
          .join(' AND ')
      : undefined,
    limit: 20,
  });
};

export const searchDocuments = async (query: string, projectId?: string) => {
  const index = client.index('documents');
  return await index.search(query, {
    filter: projectId ? `projectId = "${projectId}"` : undefined,
    limit: 50,
  });
};

// Sync data to search indexes
export const syncToSearch = async (type: 'project' | 'document' | 'task', data: any) => {
  const index = client.index(`${type}s`);
  await index.addDocuments([data]);
};
```

## 🎯 **Offline-First Architecture (Future)**

### **Replicache Integration**

```typescript
// src/utils/replicache.ts
import { Replicache } from 'replicache';
import { nanoid } from 'nanoid';

export interface Project {
  id: string;
  name: string;
  status: string;
  lastModified: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: string;
  lastModified: number;
}

// Mutators for offline operations
export const mutators = {
  createProject: async (tx: any, project: Omit<Project, 'id' | 'lastModified'>) => {
    const id = nanoid();
    const newProject: Project = {
      ...project,
      id,
      lastModified: Date.now(),
    };
    await tx.put(`project/${id}`, newProject);
    return newProject;
  },

  updateProject: async (tx: any, { id, ...updates }: Partial<Project> & { id: string }) => {
    const existing = await tx.get(`project/${id}`);
    if (!existing) throw new Error('Project not found');

    const updated = {
      ...existing,
      ...updates,
      lastModified: Date.now(),
    };
    await tx.put(`project/${id}`, updated);
    return updated;
  },

  createTask: async (tx: any, task: Omit<Task, 'id' | 'lastModified'>) => {
    const id = nanoid();
    const newTask: Task = {
      ...task,
      id,
      lastModified: Date.now(),
    };
    await tx.put(`task/${id}`, newTask);
    return newTask;
  },
};

// Initialize Replicache
export const createReplicache = (userId: string) => {
  return new Replicache({
    name: `construction-app-${userId}`,
    licenseKey: process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY!,
    pushURL: `/api/replicache/push`,
    pullURL: `/api/replicache/pull`,
    mutators,
  });
};

// React hook for Replicache
export const useReplicache = (userId: string) => {
  const [rep] = useState(() => createReplicache(userId));

  useEffect(() => {
    return () => rep.close();
  }, [rep]);

  return rep;
};
```

This comprehensive integration transforms the blueprint into a production-ready construction management platform with:

1. **Glassmorphism UI** with real photographic backgrounds
2. **PostgreSQL with advanced features** (ltree, JSONB, RLS, pgvector)
3. **Background job processing** with Graphile Worker
4. **Full-text search** with Meilisearch
5. **Offline-first capabilities** with Replicache
6. **Modular architecture** following your specified structure
7. **Context-based state management** instead of Zustand
8. **BEM CSS conventions** with colocated modules

The system is designed to scale from MVP to enterprise with clear upgrade paths to GraphQL, Temporal workflows, and AI/ML features.
