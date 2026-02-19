export interface Wallet {
  id: string;
  userId: string;
  address: string;
  chainId: number;
  label: string;
  isWatchOnly: boolean;
  createdAt: Date;
}

export interface ExchangeConnection {
  id: string;
  userId: string;
  exchange: string;
  apiKeyEncrypted: string;
  apiSecretEncrypted: string;
  label: string;
  isActive: boolean;
  lastSyncAt: Date | null;
  createdAt: Date;
}

export interface Holding {
  id: string;
  userId: string;
  asset: string;
  symbol: string;
  amount: number;
  avgBuyPrice: number;
  source: 'wallet' | 'exchange' | 'manual';
  sourceId: string | null;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  asset: string;
  type: 'buy' | 'sell' | 'transfer' | 'swap' | 'stake' | 'unstake' | 'reward';
  amount: number;
  price: number;
  fee: number;
  feeCurrency: string;
  fromAddress: string | null;
  toAddress: string | null;
  txHash: string | null;
  chainId: number | null;
  timestamp: Date;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercent: number;
  holdings: HoldingWithPrice[];
  lastUpdated: Date;
}

export interface HoldingWithPrice extends Holding {
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
  change24h: number;
}
