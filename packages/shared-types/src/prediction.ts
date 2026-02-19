export type PredictionTimeframe = '1h' | '4h' | '1d' | '7d' | '30d';
export type PredictionSignal = 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';

export interface Prediction {
  id: string;
  asset: string;
  modelId: string;
  modelVersion: string;
  timeframe: PredictionTimeframe;
  signal: PredictionSignal;
  confidence: number;
  predictedPrice: number;
  predictedChangePercent: number;
  features: Record<string, number>;
  actualPrice: number | null;
  actualChangePercent: number | null;
  accuracy: number | null;
  createdAt: Date;
  evaluatedAt: Date | null;
}

export interface PredictionRequest {
  asset: string;
  timeframe: PredictionTimeframe;
}

export interface PatternDetection {
  asset: string;
  pattern: string;
  confidence: number;
  startTimestamp: Date;
  endTimestamp: Date;
  implications: string;
}
