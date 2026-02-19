import { create } from 'zustand';
import type { PortfolioSummary, Wallet, Transaction } from '@nexus/shared-types';

interface PortfolioState {
  summary: PortfolioSummary | null;
  wallets: Wallet[];
  transactions: Transaction[];
  isLoading: boolean;
  setSummary: (summary: PortfolioSummary) => void;
  setWallets: (wallets: Wallet[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (loading: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  summary: null,
  wallets: [],
  transactions: [],
  isLoading: false,
  setSummary: (summary) => set({ summary }),
  setWallets: (wallets) => set({ wallets }),
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (isLoading) => set({ isLoading }),
}));
