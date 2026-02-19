export const WS_EVENTS = {
  // Client -> Server
  SUBSCRIBE_PRICES: 'subscribe:prices',
  UNSUBSCRIBE_PRICES: 'unsubscribe:prices',
  SUBSCRIBE_PORTFOLIO: 'subscribe:portfolio',

  // Server -> Client
  PRICE_UPDATE: 'price:update',
  PORTFOLIO_UPDATE: 'portfolio:update',
  PREDICTION_NEW: 'prediction:new',
  ALERT_TRIGGERED: 'alert:triggered',
  MARKET_OVERVIEW: 'market:overview',
  CONNECTION_STATUS: 'connection:status',
} as const;

export const WS_ROOMS = {
  PRICES: 'prices',
  PORTFOLIO: (userId: string) => `portfolio:${userId}`,
  ALERTS: (userId: string) => `alerts:${userId}`,
} as const;
