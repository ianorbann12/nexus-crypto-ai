import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { WS_EVENTS } from '@nexus/shared-constants';

export function setupWebSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
    pingTimeout: 60000,
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on(WS_EVENTS.SUBSCRIBE_PRICES, (assets: string[]) => {
      assets.forEach((asset) => socket.join(`prices:${asset}`));
    });

    socket.on(WS_EVENTS.UNSUBSCRIBE_PRICES, (assets: string[]) => {
      assets.forEach((asset) => socket.leave(`prices:${asset}`));
    });

    socket.on(WS_EVENTS.SUBSCRIBE_PORTFOLIO, (userId: string) => {
      socket.join(`portfolio:${userId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}
