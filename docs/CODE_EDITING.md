# Vital Ice Code Editing Guide

## Code Style & Formatting

### TypeScript/JavaScript

1. **General Rules**
   - Use TypeScript for all new code
   - Prefer functional components over class components
   - Use arrow functions for component definitions
   - Use explicit return types for functions
   - Use interfaces for component props

2. **Naming Conventions**
   - PascalCase for components and types
   - camelCase for variables, functions, and methods
   - UPPER_CASE for constants
   - Prefix interfaces with 'I' (e.g., IButtonProps)
   - Suffix type definitions with 'Type' (e.g., ButtonType)

3. **Component Structure**
   ```tsx
   // Example component structure
   import { FC } from 'react';
   import styles from './Component.module.css';

   interface IComponentProps {
     title: string;
     onClick?: () => void;
   }

   export const Component: FC<IComponentProps> = ({ title, onClick }) => {
     return (
       <div className={styles.container}>
         <h2>{title}</h2>
         <button onClick={onClick}>Click me</button>
       </div>
     );
   };
   ```

### CSS/SCSS

1. **Module Structure**
   - One CSS module per component
   - Use BEM naming convention within modules
   - Keep selectors shallow (max 2 levels)
   - Use CSS variables for theming

2. **Naming Convention**
   ```css
   /* Example CSS module */
   .container {
     /* Base styles */
   }
   
   .container__header {
     /* Child element */
   }
   
   .container--active {
     /* Modifier */
   }
   ```

3. **Media Queries**
   ```css
   /* Mobile first approach */
   .element {
     /* Base styles */
   }
   
   @media (min-width: 768px) {
     .element {
       /* Tablet styles */
     }
   }
   
   @media (min-width: 1024px) {
     .element {
       /* Desktop styles */
     }
   }
   ```

## Git Workflow

### Branch Naming

- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Hotfixes: `hotfix/description`
- Documentation: `docs/description`

### Commit Messages

1. **Format**
   ```
   type(scope): description
   
   [optional body]
   [optional footer]
   ```

2. **Types**
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes
   - `refactor`: Code refactoring
   - `test`: Adding tests
   - `chore`: Maintenance tasks

3. **Examples**
   ```
   feat(auth): add Google OAuth login
   fix(booking): resolve timezone issues
   docs(readme): update installation steps
   ```

## Code Review Guidelines

### What to Review

1. **Functionality**
   - Does the code work as intended?
   - Are edge cases handled?
   - Is error handling implemented?

2. **Code Quality**
   - Is the code readable and maintainable?
   - Are there any code smells?
   - Is the code DRY (Don't Repeat Yourself)?

3. **Performance**
   - Are there any performance bottlenecks?
   - Is the code optimized?
   - Are there unnecessary re-renders?

4. **Security**
   - Are there any security vulnerabilities?
   - Is sensitive data handled properly?
   - Are inputs properly validated?

### Review Process

1. **Before Review**
   - Self-review your changes
   - Run tests locally
   - Check for linting errors
   - Update documentation if needed

2. **During Review**
   - Be constructive and specific
   - Explain the "why" behind suggestions
   - Consider the bigger picture
   - Look for potential issues

3. **After Review**
   - Address all comments
   - Make requested changes
   - Update tests if needed
   - Request re-review if necessary

## Testing Guidelines

### Unit Tests

1. **Component Tests**
   ```tsx
   // Example component test
   import { render, screen } from '@testing-library/react';
   import { Button } from './Button';
   
   describe('Button', () => {
     it('renders correctly', () => {
       render(<Button>Click me</Button>);
       expect(screen.getByText('Click me')).toBeInTheDocument();
     });
   
     it('handles click events', () => {
       const handleClick = jest.fn();
       render(<Button onClick={handleClick}>Click me</Button>);
       screen.getByText('Click me').click();
       expect(handleClick).toHaveBeenCalled();
     });
   });
   ```

2. **Hook Tests**
   ```tsx
   // Example hook test
   import { renderHook, act } from '@testing-library/react-hooks';
   import { useCounter } from './useCounter';
   
   describe('useCounter', () => {
     it('increments counter', () => {
       const { result } = renderHook(() => useCounter());
       act(() => {
         result.current.increment();
       });
       expect(result.current.count).toBe(1);
     });
   });
   ```

### Integration Tests

1. **Page Tests**
   ```tsx
   // Example page test
   import { render, screen } from '@testing-library/react';
   import HomePage from './pages/Home';
   
   describe('HomePage', () => {
     it('loads and displays content', async () => {
       render(<HomePage />);
       expect(await screen.findByText('Welcome')).toBeInTheDocument();
     });
   });
   ```

## Documentation

### Code Comments

1. **When to Comment**
   - Complex business logic
   - Non-obvious solutions
   - Workarounds
   - Performance considerations

2. **Comment Format**
   ```typescript
   /**
    * Calculates the total price including tax
    * @param price - The base price
    * @param taxRate - The tax rate as a decimal
    * @returns The total price with tax
    */
   const calculateTotal = (price: number, taxRate: number): number => {
     return price * (1 + taxRate);
   };
   ```

### README Updates

1. **What to Document**
   - New features
   - Configuration changes
   - Breaking changes
   - Dependencies updates

2. **Format**
   ```markdown
   ## Feature Name
   
   ### Description
   Brief description of the feature
   
   ### Usage
   ```tsx
   <Component prop="value" />
   ```
   
   ### Props
   | Prop | Type | Required | Description |
   |------|------|----------|-------------|
   | prop | string | Yes | Description |
   ```

## Performance Considerations

### React Optimization

1. **Memoization**
   ```tsx
   // Use memo for expensive calculations
   const MemoizedComponent = React.memo(({ data }) => {
     return <div>{data}</div>;
   });
   
   // Use useMemo for computed values
   const computedValue = useMemo(() => {
     return expensiveCalculation(data);
   }, [data]);
   
   // Use useCallback for function props
   const handleClick = useCallback(() => {
     doSomething();
   }, []);
   ```

2. **Code Splitting**
   ```tsx
   // Lazy load components
   const LazyComponent = React.lazy(() => import('./LazyComponent'));
   
   // Use with Suspense
   <Suspense fallback={<Loading />}>
     <LazyComponent />
   </Suspense>
   ```

### Image Optimization

1. **Next.js Image Component**
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={500}
     height={300}
     priority={false}
     loading="lazy"
   />
   ```

2. **Responsive Images**
   ```tsx
   <Image
     src="/image.jpg"
     alt="Description"
     sizes="(max-width: 768px) 100vw, 50vw"
     fill
     style={{ objectFit: 'cover' }}
   />
   ```

## Accessibility

### ARIA Guidelines

1. **Common Patterns**
   ```tsx
   // Button with loading state
   <button
     aria-busy={isLoading}
     aria-disabled={isLoading}
   >
     {isLoading ? 'Loading...' : 'Submit'}
   </button>
   
   // Navigation
   <nav aria-label="Main navigation">
     <ul role="menubar">
       <li role="none">
         <a role="menuitem" href="/">Home</a>
       </li>
     </ul>
   </nav>
   ```

2. **Form Elements**
   ```tsx
   // Input with label
   <div>
     <label htmlFor="email">Email</label>
     <input
       id="email"
       type="email"
       aria-required="true"
       aria-invalid={!!error}
       aria-describedby="email-error"
     />
     {error && (
       <span id="email-error" role="alert">
         {error}
       </span>
     )}
   </div>
   ```

## Error Handling

### React Error Boundaries

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```typescript
// API client with error handling
const apiClient = {
  async fetch<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      // Log error
      console.error('API Error:', error);
      // Rethrow for component handling
      throw error;
    }
  }
};
``` 