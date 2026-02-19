import { createNexusClient } from '@nexus/api-client';
import { useAuthStore } from '../stores/auth';

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
      return response.json();
    } catch {
      return null;
    }
  },
  () => useAuthStore.getState().clearAuth(),
);
