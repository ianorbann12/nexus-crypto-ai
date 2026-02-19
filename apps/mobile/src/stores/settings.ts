import { create } from 'zustand';

interface SettingsState {
  currency: string;
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'dark' | 'light';
  setCurrency: (currency: string) => void;
  setBiometric: (enabled: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  currency: 'USD',
  biometricEnabled: false,
  notificationsEnabled: true,
  theme: 'dark',
  setCurrency: (currency) => set({ currency }),
  setBiometric: (biometricEnabled) => set({ biometricEnabled }),
  setNotifications: (notificationsEnabled) => set({ notificationsEnabled }),
  setTheme: (theme) => set({ theme }),
}));
