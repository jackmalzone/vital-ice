# Mindbody Widget Navigation Issue - Final Working Solution

## Problem

The Mindbody widget was causing navigation issues and console errors, including:

- Mixpanel errors: `"You must name your new library: init(token, config, name)"`
- JSON parsing errors from widget data
- jQuery Migrate warnings
- Page freezing due to aggressive error suppression
- **Hydration mismatch errors** causing navigation delays and redirects

## Final Working Solution

### 1. Simple HTML Structure with Exact Attributes

Use the exact HTML structure provided by Mindbody with specific data attributes:

```html
<div
  class="healcode-widget"
  data-version="0.2"
  data-widget-type="registration"
  data-widget-id="12345"
  data-widget-config="{}"
  data-widget-options="{}"
></div>
```

### 2. Minimal Error Suppression (Non-Freezing Approach)

**CRITICAL**: Use minimal error suppression to avoid page freezing.

```typescript
// In Newsletter.tsx - Minimal error suppression only
useEffect(() => {
  if (typeof window === 'undefined') return;

  // Suppress jQuery Migrate warnings from third-party widgets
  if ((window as { jQuery?: { migrateMute?: boolean } }).jQuery) {
    (window as { jQuery?: { migrateMute?: boolean } }).jQuery!.migrateMute = true;
  }

  // Override JSON.parse to prevent widget errors
  const originalJSONParse = JSON.parse;
  JSON.parse = function (text, reviver) {
    try {
      return originalJSONParse.call(this, text, reviver);
    } catch (error) {
      if (error instanceof Error && error.message && error.message.includes('not valid JSON')) {
        return {}; // Return empty object as fallback
      }
      throw error;
    }
  };

  // Cleanup function
  return () => {
    // Restore original JSON.parse
    JSON.parse = originalJSONParse;
  };
}, []);
```

### 3. Fix Hydration Mismatch Issues

**CRITICAL**: Fix server/client rendering differences to prevent navigation delays.

```typescript
// In experience/page.tsx - Fix hydration mismatches
const ServiceNode: React.FC<ServiceNodeProps> = ({
  service,
  angle,
  radius,
  index,
  onHover,
  onLeave,
  onSelect,
  isHovered,
}) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const accentColor = SERVICE_COLORS[service.id as keyof typeof SERVICE_COLORS] || '#00bcd4';

  return (
    <motion.div
      className={styles.serviceNode}
      style={
        {
          '--x': `${x.toFixed(2)}px`,           // Fixed precision
          '--y': `${y.toFixed(2)}px`,           // Fixed precision
          '--accent-color': accentColor,
          '--index': String(index),             // Ensure string type
        } as React.CSSProperties
      }
      initial={{
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: Number(x.toFixed(2)),                // Consistent number type
        y: Number(y.toFixed(2)),                // Consistent number type
      }}
      // ... rest of component
    />
  );
};
```

### 4. Script Loading Strategy

Load Mindbody scripts in the correct order:

```typescript
// Load main Mindbody script first
const script = document.createElement('script');
script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
script.async = true;

// Load healcode script for registration widget
const healcodeScript = document.createElement('script');
healcodeScript.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
healcodeScript.async = true;
```

## Key Differences from Failed Approaches

| Approach                       | Result             | Why It Failed                                               |
| ------------------------------ | ------------------ | ----------------------------------------------------------- |
| Broad error event listeners    | ❌ Page freezing   | Interfered with Next.js internal error handling             |
| Global console.error override  | ❌ Page freezing   | Blocked critical Next.js error messages                     |
| No error suppression           | ❌ Console clutter | Mixpanel errors flooded console                             |
| **Minimal error suppression**  | ✅ **Working**     | Only suppresses JSON errors, allows Mixpanel errors through |
| **Fixed hydration mismatches** | ✅ **Working**     | Prevents navigation delays and redirects                    |

## Important Notes

1. **Never use broad error event listeners** - They cause page freezing
2. **Fix hydration mismatches** - Ensure consistent data types between server and client
3. **Use minimal error suppression** - Only suppress what's absolutely necessary
4. **Keep NavigationLoadingProvider enabled** - It's not the cause of issues
5. **Accept Mixpanel errors** - They don't affect functionality and are from third-party code

## Current Working State

### ✅ **What's Working:**

- Mindbody widget navigation works correctly
- No page freezing issues
- Navigation between pages is smooth
- No hydration mismatch errors
- Build passes successfully
- Development server runs without issues

### ⚠️ **Known Issues (Non-Critical):**

- Mixpanel errors still appear in console (from Mindbody's internal code)
- 429 rate limiting errors from Sentry (normal in development)
- These don't affect functionality

## Result

- ✅ Mindbody widget navigation works correctly
- ✅ No page freezing issues
- ✅ Smooth navigation between pages
- ✅ No hydration mismatch errors
- ✅ All other functionality preserved
- ✅ Build passes successfully

## Files Modified

- `src/components/sections/Newsletter/Newsletter.tsx` - Minimal error suppression
- `src/app/experience/page.tsx` - Fixed hydration mismatches
- `src/app/layout.tsx` - NavigationLoadingProvider enabled
- `src/components/layout/Header/Header.tsx` - useNavigationLoading hook enabled

## Final Status: ✅ **WORKING**

The Mindbody widget navigation issue has been successfully resolved. The key was fixing the hydration mismatch errors that were causing navigation delays, combined with minimal error suppression that doesn't interfere with page functionality.

**Mixpanel errors are accepted as a known limitation** - they come from Mindbody's internal code and don't affect functionality. Attempting to suppress them was causing more problems than it solved.
