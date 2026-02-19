export interface ExchangeConfig {
  id: string;
  name: string;
  logoUrl: string;
  supportedFeatures: string[];
}

export const EXCHANGES: Record<string, ExchangeConfig> = {
  binance: {
    id: 'binance',
    name: 'Binance',
    logoUrl: '/exchanges/binance.png',
    supportedFeatures: ['spot', 'futures', 'staking'],
  },
  coinbase: {
    id: 'coinbase',
    name: 'Coinbase',
    logoUrl: '/exchanges/coinbase.png',
    supportedFeatures: ['spot', 'staking'],
  },
  kraken: {
    id: 'kraken',
    name: 'Kraken',
    logoUrl: '/exchanges/kraken.png',
    supportedFeatures: ['spot', 'futures', 'staking'],
  },
  bybit: {
    id: 'bybit',
    name: 'Bybit',
    logoUrl: '/exchanges/bybit.png',
    supportedFeatures: ['spot', 'futures'],
  },
};
