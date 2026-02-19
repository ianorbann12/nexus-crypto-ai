import type { AxiosInstance } from 'axios';
import type { MarketOHLCV, MarketOverview, PriceTick } from '@nexus/shared-types';

export function createMarketEndpoints(client: AxiosInstance) {
  return {
    getOverview: () => client.get<MarketOverview>('/v1/market/overview'),
    getPrice: (asset: string) => client.get<PriceTick>(`/v1/market/price/${asset}`),
    getOHLCV: (asset: string, params: { timeframe: string; limit?: number }) =>
      client.get<MarketOHLCV[]>(`/v1/market/ohlcv/${asset}`, { params }),
    search: (query: string) =>
      client.get<Array<{ asset: string; symbol: string; name: string }>>('/v1/market/search', {
        params: { q: query },
      }),
  };
}
