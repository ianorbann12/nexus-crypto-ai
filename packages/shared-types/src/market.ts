export interface MarketOHLCV {
  asset: string;
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  source: string;
}

export interface PriceTick {
  asset: string;
  timestamp: Date;
  price: number;
  volume24h: number;
  marketCap: number;
  source: string;
}

export interface OnChainMetrics {
  asset: string;
  timestamp: Date;
  activeAddresses: number;
  transactionCount: number;
  avgTransactionValue: number;
  hashRate: number | null;
  totalValueLocked: number | null;
  source: string;
}

export interface SocialSentiment {
  asset: string;
  timestamp: Date;
  platform: string;
  sentimentScore: number;
  volume: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

export interface MarketOverview {
  totalMarketCap: number;
  total24hVolume: number;
  btcDominance: number;
  fearGreedIndex: number;
  topMovers: TopMover[];
}

export interface TopMover {
  asset: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}
