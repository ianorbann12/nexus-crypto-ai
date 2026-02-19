import { create } from 'zustand';
import type { MarketOverview, PriceTick } from '@nexus/shared-types';

interface MarketState {
  overview: MarketOverview | null;
  prices: Record<string, PriceTick>;
  watchlist: string[];
  isLoading: boolean;
  setOverview: (overview: MarketOverview) => void;
  updatePrice: (asset: string, tick: PriceTick) => void;
  setWatchlist: (assets: string[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  overview: null,
  prices: {},
  watchlist: ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC'],
  isLoading: false,
  setOverview: (overview) => set({ overview }),
  updatePrice: (asset, tick) =>
    set((state) => ({ prices: { ...state.prices, [asset]: tick } })),
  setWatchlist: (watchlist) => set({ watchlist }),
  setLoading: (isLoading) => set({ isLoading }),
}));
