# Complete Component Migration List

## Overview

This document provides a comprehensive list of all components that need to be migrated from local state to the centralized Zustand store.

---

## 📊 **Migration Priority Overview**

| Priority   | Count | Components                                               | Status        |
| ---------- | ----- | -------------------------------------------------------- | ------------- |
| **HIGH**   | 3     | Header ✅, Widgets, LoadingScreen                        | 1/3 Complete  |
| **MEDIUM** | 4     | Hero, Testimonials, ServiceNavigation, RollingBookButton | 0/4 Complete  |
| **LOW**    | 8     | Pages (5), Utilities (3)                                 | 0/8 Complete  |
| **TOTAL**  | 15    | All components                                           | 1/15 Complete |

---

## 🎯 **Detailed Component List**

### **🔴 HIGH PRIORITY (Core Functionality)**

#### **1. Header Component** ✅ **COMPLETED**

- **File**: `src/components/layout/Header/Header.tsx`
- **Current State**: `useState` for menu open/close
- **Migration**: ✅ **DONE** - Using `useNavigation()` hook
- **Benefits**: Menu state persists across navigation

#### **2. Widget Components** 🔄 **NEXT**

- **Files**:
  - `src/components/ui/Widget/Widget.tsx`
  - `src/components/sections/Newsletter/Newsletter.tsx`
  - `src/app/book/page.tsx`
- **Current State**: `useState` for loading/error states
- **Migration Target**: Use `useWidgets()` hook
- **Benefits**: Centralized widget state management

#### **3. LoadingScreen Component**

- **File**: `src/components/ui/LoadingScreen/LoadingScreen.tsx`
- **Current State**: `useState` for progress and visibility
- **Migration Target**: Use `useNavigation()` hook
- **Benefits**: Consistent loading state across app

---

### **🟡 MEDIUM PRIORITY (User Experience)**

#### **4. Hero Component**

- **File**: `src/components/sections/Hero/Hero.tsx`
- **Current State**: `useState` for video rotation
- **Migration Target**: Use `usePerformance()` hook
- **Benefits**: Performance-aware video loading

#### **5. Testimonials Component**

- **File**: `src/components/sections/Testimonials/Testimonials.tsx`
- **Current State**: `useState` for carousel index
- **Migration Target**: Use `useNavigation()` hook
- **Benefits**: Carousel state persists across navigation

#### **6. ServiceNavigation Component**

- **File**: `src/components/ui/ServiceNavigation/ServiceNavigation.tsx`
- **Current State**: `useState` for sidebar open/close
- **Migration Target**: Use `useNavigation()` hook
- **Benefits**: Consistent navigation state

#### **7. RollingBookButton Component**

- **File**: `src/components/ui/RollingBookButton/RollingBookButton.tsx`
- **Current State**: `useState` for footer proximity
- **Migration Target**: Use `useNavigation()` hook
- **Benefits**: Button state management

---

### **🟢 LOW PRIORITY (Page-Specific)**

#### **8. About Page**

- **File**: `src/app/about/page.tsx`
- **Current State**: `useState` for expanded founders
- **Migration Target**: Use `useUserPreferences()` hook
- **Benefits**: Remember expanded state

#### **9. Contact Page**

- **File**: `src/app/contact/page.tsx`
- **Current State**: `useState` for form data
- **Migration Target**: Use `useUserPreferences()` hook
- **Benefits**: Persistent form data

#### **10. FAQ Page**

- **File**: `src/app/faq/page.tsx`
- **Current State**: `useState` for open items
- **Migration Target**: Use `useUserPreferences()` hook
- **Benefits**: Remember open FAQ items

#### **11. Careers Page**

- **File**: `src/app/careers/page.tsx`
- **Current State**: `useState` for expanded jobs
- **Migration Target**: Use `useUserPreferences()` hook
- **Benefits**: Remember expanded job listings

#### **12. Experience Page**

- **File**: `src/app/experience/page.tsx`
- **Current State**: `useState` for hover states and layout
- **Migration Target**: Use `useUserPreferences()` hook
- **Benefits**: Remember layout preferences

#### **13. AdaptiveMedia Component**

- **File**: `src/components/ui/AdaptiveMedia/AdaptiveMedia.tsx`
- **Current State**: `useState` for format preference and error states
- **Migration Target**: Use `usePerformance()` hook
- **Benefits**: Performance-aware media loading

#### **14. VideoBackground Component**

- **File**: `src/components/ui/VideoBackground/VideoBackground.tsx`
- **Current State**: `useState` for video states (loaded, error, playing)
- **Migration Target**: Use `usePerformance()` hook
- **Benefits**: Performance-aware video loading

#### **15. PhotoGallery Component**

- **File**: `src/components/ui/PhotoGallery/PhotoGallery.tsx`
- **Current State**: `useState` for current image index
- **Migration Target**: Use `usePerformance()` hook
- **Benefits**: Remember current image position

---

## 🔄 **Migration Process for Each Component**

### **Step 1: Analyze Current State**

```typescript
// Example: Widget Component
const [isLoading, setIsLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [widgetHTML, setWidgetHTML] = useState('');
```

### **Step 2: Choose Store Hook**

```typescript
// Choose appropriate hook based on state type
import { useWidgets } from '@/lib/store/AppStore';
const { widgetStates, setWidgetState } = useWidgets();
```

### **Step 3: Replace State Management**

```typescript
// Before: Local state
setIsLoading(true);
setHasError(false);

// After: Store actions
setWidgetState(widgetId, { isLoading: true, hasError: false });
```

### **Step 4: Update Component Logic**

```typescript
// Before: Local state checks
if (isLoading) return <LoadingSpinner />;
if (hasError) return <ErrorMessage />;

// After: Store state checks
const widgetState = widgetStates[widgetId] || { isLoading: false, hasError: false };
if (widgetState.isLoading) return <LoadingSpinner />;
if (widgetState.hasError) return <ErrorMessage />;
```

---

## 📋 **Migration Checklist Template**

### **For Each Component:**

- [ ] **Identify current state usage**
- [ ] **Choose appropriate store hook**
- [ ] **Replace `useState` with store hook**
- [ ] **Update state access patterns**
- [ ] **Update state mutation patterns**
- [ ] **Test component functionality**
- [ ] **Verify no regressions**
- [ ] **Update component documentation**

### **Store Hooks Available:**

1. **`useNavigation()`** - Page, menu, navigation state
2. **`useWidgets()`** - Widget loading/error states
3. **`useUserPreferences()`** - User settings and preferences
4. **`usePerformance()`** - Performance profile and media settings

---

## 🎯 **Migration Timeline**

### **Week 1: High Priority**

- [x] Header Component ✅
- [ ] Widget Components
- [ ] LoadingScreen Component

### **Week 2: Medium Priority**

- [ ] Hero Component
- [ ] Testimonials Component
- [ ] ServiceNavigation Component
- [ ] RollingBookButton Component

### **Week 3-4: Low Priority**

- [ ] Page Components (5 files)
- [ ] Utility Components (3 files)

---

## 📊 **Expected Results**

### **After Complete Migration:**

- **Centralized State**: All 15 components using Zustand
- **Reduced Bundle Size**: Fewer context providers
- **Better Performance**: Efficient state updates
- **Improved UX**: Persistent user preferences
- **Easier Debugging**: Single source of truth

### **Performance Improvements:**

- **Faster Initial Load**: Reduced provider overhead
- **Better Memory Usage**: Efficient state management
- **Reduced Re-renders**: Only affected components update

---

## 📞 **Migration Support**

### **Reference Documentation**

- **Store Structure**: `src/lib/store/AppStore.ts`
- **Migration Example**: `src/components/layout/Header/Header.tsx`
- **Migration Guide**: `docs/migration/COMPONENT_MIGRATION_PLAN.md`

### **Available Hooks**

- `useNavigation()` - Page, menu, navigation state
- `useWidgets()` - Widget loading/error states
- `useUserPreferences()` - User settings and preferences
- `usePerformance()` - Performance profile and media settings
