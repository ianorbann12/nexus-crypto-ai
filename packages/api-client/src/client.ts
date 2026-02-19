import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

import type { AuthTokens } from '@nexus/shared-types';

type TokenRefresher = () => Promise<AuthTokens | null>;

export function createApiClient(
  baseURL: string,
  getTokens: () => AuthTokens | null,
  refreshTokens: TokenRefresher,
  onAuthFailure: () => void,
): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newTokens = await refreshTokens();
        if (newTokens) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return client(originalRequest);
        }
        onAuthFailure();
      }

      return Promise.reject(error);
    },
  );

  return client;
}
