import type { AxiosInstance } from 'axios';
import type { Prediction, PredictionRequest, PatternDetection } from '@nexus/shared-types';

export function createPredictionEndpoints(client: AxiosInstance) {
  return {
    getPrediction: (data: PredictionRequest) =>
      client.post<Prediction>('/v1/predictions', data),
    getHistory: (asset: string, params?: { limit?: number }) =>
      client.get<Prediction[]>(`/v1/predictions/history/${asset}`, { params }),
    getPatterns: (asset: string) =>
      client.get<PatternDetection[]>(`/v1/predictions/patterns/${asset}`),
    getAccuracy: () =>
      client.get<{ overall: number; byTimeframe: Record<string, number> }>(
        '/v1/predictions/accuracy',
      ),
  };
}
