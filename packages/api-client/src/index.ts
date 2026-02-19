import type { AxiosInstance } from 'axios';
import type { AuthTokens } from '@nexus/shared-types';

import { createApiClient } from './client';
import { createAuthEndpoints } from './endpoints/auth';
import { createPortfolioEndpoints } from './endpoints/portfolio';
import { createMarketEndpoints } from './endpoints/market';
import { createPredictionEndpoints } from './endpoints/predictions';
import { createAlertEndpoints } from './endpoints/alerts';

export interface NexusApiClient {
  auth: ReturnType<typeof createAuthEndpoints>;
  portfolio: ReturnType<typeof createPortfolioEndpoints>;
  market: ReturnType<typeof createMarketEndpoints>;
  predictions: ReturnType<typeof createPredictionEndpoints>;
  alerts: ReturnType<typeof createAlertEndpoints>;
}

export function createNexusClient(
  baseURL: string,
  getTokens: () => AuthTokens | null,
  refreshTokens: () => Promise<AuthTokens | null>,
  onAuthFailure: () => void,
): NexusApiClient {
  const client: AxiosInstance = createApiClient(baseURL, getTokens, refreshTokens, onAuthFailure);

  return {
    auth: createAuthEndpoints(client),
    portfolio: createPortfolioEndpoints(client),
    market: createMarketEndpoints(client),
    predictions: createPredictionEndpoints(client),
    alerts: createAlertEndpoints(client),
  };
}

export { createApiClient } from './client';
