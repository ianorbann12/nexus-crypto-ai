import { io, Socket } from 'socket.io-client';
import { WS_EVENTS } from '@nexus/shared-constants';
import { useMarketStore } from '../stores/market';
import { useWebSocketStore } from '../stores/websocket';

const WS_URL = __DEV__ ? 'http://localhost:3000' : 'https://api.nexuscrypto.ai';

let socket: Socket | null = null;

export function connectWebSocket(token: string) {
  if (socket?.connected) return;

  socket = io(WS_URL, {
    auth: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    useWebSocketStore.getState().setStatus('connected');
  });

  socket.on('disconnect', () => {
    useWebSocketStore.getState().setStatus('disconnected');
  });

  socket.on(WS_EVENTS.PRICE_UPDATE, (data) => {
    useMarketStore.getState().updatePrice(data.asset, data);
  });
}

export function disconnectWebSocket() {
  socket?.disconnect();
  socket = null;
}

export function subscribePrices(assets: string[]) {
  socket?.emit(WS_EVENTS.SUBSCRIBE_PRICES, assets);
  useWebSocketStore.getState().subscribe(assets);
}

export function unsubscribePrices(assets: string[]) {
  socket?.emit(WS_EVENTS.UNSUBSCRIBE_PRICES, assets);
  useWebSocketStore.getState().unsubscribe(assets);
}
