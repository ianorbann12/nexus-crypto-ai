export const TIMEFRAMES = {
  '1m': { label: '1 Minute', seconds: 60 },
  '5m': { label: '5 Minutes', seconds: 300 },
  '15m': { label: '15 Minutes', seconds: 900 },
  '1h': { label: '1 Hour', seconds: 3600 },
  '4h': { label: '4 Hours', seconds: 14400 },
  '1d': { label: '1 Day', seconds: 86400 },
  '7d': { label: '1 Week', seconds: 604800 },
  '30d': { label: '1 Month', seconds: 2592000 },
} as const;

export type Timeframe = keyof typeof TIMEFRAMES;

export const PREDICTION_TIMEFRAMES: Timeframe[] = ['1h', '4h', '1d', '7d', '30d'];
