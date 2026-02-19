import { create } from 'zustand';
import type { Prediction, PatternDetection } from '@nexus/shared-types';

interface PredictionsState {
  predictions: Record<string, Prediction>;
  patterns: Record<string, PatternDetection[]>;
  accuracy: { overall: number; byTimeframe: Record<string, number> } | null;
  isLoading: boolean;
  setPrediction: (asset: string, prediction: Prediction) => void;
  setPatterns: (asset: string, patterns: PatternDetection[]) => void;
  setAccuracy: (accuracy: { overall: number; byTimeframe: Record<string, number> }) => void;
  setLoading: (loading: boolean) => void;
}

export const usePredictionsStore = create<PredictionsState>((set) => ({
  predictions: {},
  patterns: {},
  accuracy: null,
  isLoading: false,
  setPrediction: (asset, prediction) =>
    set((state) => ({ predictions: { ...state.predictions, [asset]: prediction } })),
  setPatterns: (asset, patterns) =>
    set((state) => ({ patterns: { ...state.patterns, [asset]: patterns } })),
  setAccuracy: (accuracy) => set({ accuracy }),
  setLoading: (isLoading) => set({ isLoading }),
}));
