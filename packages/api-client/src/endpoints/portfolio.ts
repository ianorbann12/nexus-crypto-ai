import type { AxiosInstance } from 'axios';
import type { PortfolioSummary, Wallet, Holding, Transaction } from '@nexus/shared-types';

export function createPortfolioEndpoints(client: AxiosInstance) {
  return {
    getSummary: () => client.get<PortfolioSummary>('/v1/portfolio/summary'),
    getWallets: () => client.get<Wallet[]>('/v1/portfolio/wallets'),
    addWallet: (data: { address: string; chainId: number; label: string }) =>
      client.post<Wallet>('/v1/portfolio/wallets', data),
    removeWallet: (id: string) => client.delete(`/v1/portfolio/wallets/${id}`),
    getHoldings: () => client.get<Holding[]>('/v1/portfolio/holdings'),
    getTransactions: (params?: { asset?: string; limit?: number; offset?: number }) =>
      client.get<Transaction[]>('/v1/portfolio/transactions', { params }),
    syncPortfolio: () => client.post('/v1/portfolio/sync'),
  };
}
