export enum WSEvent {
  PRICE_UPDATE = 'price:update',
  PORTFOLIO_UPDATE = 'portfolio:update',
  PREDICTION_NEW = 'prediction:new',
  ALERT_TRIGGERED = 'alert:triggered',
  MARKET_OVERVIEW = 'market:overview',
  CONNECTION_STATUS = 'connection:status',
}

export interface WSPriceUpdate {
  asset: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

export interface WSPortfolioUpdate {
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  updatedHoldings: Array<{
    asset: string;
    value: number;
    pnl: number;
  }>;
}

export interface WSPredictionUpdate {
  asset: string;
  signal: string;
  confidence: number;
  predictedChangePercent: number;
  timeframe: string;
}

export interface WSAlertTriggered {
  alertId: string;
  asset: string;
  message: string;
  triggeredAt: number;
}
