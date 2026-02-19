import { create } from 'zustand';
import type { User, AuthTokens } from '@nexus/shared-types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  setAuth: (user: User, tokens: AuthTokens) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  tokens: null,
  isLoading: true,
  setAuth: (user, tokens) => set({ isAuthenticated: true, user, tokens, isLoading: false }),
  clearAuth: () => set({ isAuthenticated: false, user: null, tokens: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));
