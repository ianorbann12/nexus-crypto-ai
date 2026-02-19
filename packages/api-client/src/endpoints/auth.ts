import type { AxiosInstance } from 'axios';
import type { AuthTokens, LoginRequest, RegisterRequest, User } from '@nexus/shared-types';

export function createAuthEndpoints(client: AxiosInstance) {
  return {
    login: (data: LoginRequest) => client.post<AuthTokens>('/v1/auth/login', data),
    register: (data: RegisterRequest) => client.post<AuthTokens>('/v1/auth/register', data),
    refresh: (refreshToken: string) =>
      client.post<AuthTokens>('/v1/auth/refresh', { refreshToken }),
    logout: () => client.post('/v1/auth/logout'),
    me: () => client.get<User>('/v1/auth/me'),
  };
}
