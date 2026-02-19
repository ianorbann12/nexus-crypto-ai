import { createNexusClient } from '@nexus/api-client';
import { useAuthStore } from '../stores/auth';
import storage from './storage';

const API_URL = __DEV__ ? 'http://localhost:3000' : 'https://api.nexuscrypto.ai';

export const api = createNexusClient(
  API_URL,
  () => useAuthStore.getState().tokens,
  async () => {
    const tokens = useAuthStore.getState().tokens;
    if (!tokens) return null;
    try {
      const response = await fetch(`${API_URL}/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });
      if (!response.ok) return null;
      const newTokens = await response.json();
      await storage.saveTokens(newTokens.accessToken, newTokens.refreshToken);
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        useAuthStore.getState().setAuth(currentUser, newTokens);
      }
      return newTokens;
    } catch {
      return null;
    }
  },
  async () => {
    await storage.clearAll();
    useAuthStore.getState().clearAuth();
  },
);
