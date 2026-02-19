import type { AxiosInstance } from 'axios';
import type { Alert, CreateAlertRequest } from '@nexus/shared-types';

export function createAlertEndpoints(client: AxiosInstance) {
  return {
    getAll: () => client.get<Alert[]>('/v1/alerts'),
    create: (data: CreateAlertRequest) => client.post<Alert>('/v1/alerts', data),
    update: (id: string, data: Partial<CreateAlertRequest>) =>
      client.patch<Alert>(`/v1/alerts/${id}`, data),
    remove: (id: string) => client.delete(`/v1/alerts/${id}`),
  };
}
