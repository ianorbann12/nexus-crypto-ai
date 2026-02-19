import { create } from 'zustand';

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

interface WebSocketState {
  status: ConnectionStatus;
  subscribedAssets: string[];
  setStatus: (status: ConnectionStatus) => void;
  subscribe: (assets: string[]) => void;
  unsubscribe: (assets: string[]) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  status: 'disconnected',
  subscribedAssets: [],
  setStatus: (status) => set({ status }),
  subscribe: (assets) =>
    set((state) => ({
      subscribedAssets: [...new Set([...state.subscribedAssets, ...assets])],
    })),
  unsubscribe: (assets) =>
    set((state) => ({
      subscribedAssets: state.subscribedAssets.filter((a) => !assets.includes(a)),
    })),
}));
