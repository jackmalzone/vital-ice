import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface PerformanceProfile {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldLoadHeavyMedia: boolean;
}

interface WidgetState {
  isLoading: boolean;
  hasError: boolean;
  lastUpdated: number;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  animations: 'full' | 'reduced' | 'none';
  notifications: boolean;
}

interface AppState {
  // Navigation State
  currentPage: string;
  isMenuOpen: boolean;
  navigationHistory: string[];

  // Performance State
  performanceProfile: PerformanceProfile;

  // Widget State
  widgetStates: Record<string, WidgetState>;

  // User Preferences
  userPreferences: UserPreferences;

  // Actions
  setCurrentPage: (page: string) => void;
  toggleMenu: () => void;
  setWidgetState: (widgetId: string, state: Partial<WidgetState>) => void;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void;
  updatePerformanceProfile: (profile: Partial<PerformanceProfile>) => void;
  resetStore: () => void;
}

// Initial state
const initialState = {
  currentPage: '/',
  isMenuOpen: false,
  navigationHistory: [],
  performanceProfile: {
    isMobile: false,
    prefersReducedMotion: false,
    shouldLoadHeavyMedia: true,
  },
  widgetStates: {},
  userPreferences: {
    theme: 'auto' as const,
    animations: 'full' as const,
    notifications: true,
  },
};

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      ...initialState,

      // Navigation Actions
      setCurrentPage: page =>
        set(state => ({
          currentPage: page,
          navigationHistory: [...state.navigationHistory, page].slice(-10), // Keep last 10 pages
        })),

      toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),

      // Widget Actions
      setWidgetState: (widgetId, state) =>
        set(appState => ({
          widgetStates: {
            ...appState.widgetStates,
            [widgetId]: {
              ...appState.widgetStates[widgetId],
              isLoading: false,
              hasError: false,
              lastUpdated: Date.now(),
              ...state,
            },
          },
        })),

      // User Preferences Actions
      updateUserPreferences: prefs =>
        set(state => ({
          userPreferences: { ...state.userPreferences, ...prefs },
        })),

      // Performance Actions
      updatePerformanceProfile: profile =>
        set(state => ({
          performanceProfile: { ...state.performanceProfile, ...profile },
        })),

      // Utility Actions
      resetStore: () => set(initialState),
    }),
    {
      name: 'vital-ice-store',
      // Only persist user preferences and performance profile
      partialize: state => ({
        userPreferences: state.userPreferences,
        performanceProfile: state.performanceProfile,
      }),
    }
  )
);

// Convenience hooks for specific state slices
export const useNavigation = () => {
  const { currentPage, isMenuOpen, navigationHistory, setCurrentPage, toggleMenu } = useAppStore();
  return { currentPage, isMenuOpen, navigationHistory, setCurrentPage, toggleMenu };
};

export const useWidgets = () => {
  const { widgetStates, setWidgetState } = useAppStore();
  return { widgetStates, setWidgetState };
};

export const useUserPreferences = () => {
  const { userPreferences, updateUserPreferences } = useAppStore();
  return { userPreferences, updateUserPreferences };
};

export const usePerformance = () => {
  const { performanceProfile, updatePerformanceProfile } = useAppStore();
  return { performanceProfile, updatePerformanceProfile };
};
