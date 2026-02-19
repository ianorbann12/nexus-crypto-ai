export type AlertType = 'price' | 'percentage_change' | 'volume' | 'prediction' | 'portfolio';
export type AlertCondition = 'above' | 'below' | 'crosses';
export type AlertStatus = 'active' | 'triggered' | 'expired' | 'disabled';

export interface Alert {
  id: string;
  userId: string;
  asset: string;
  type: AlertType;
  condition: AlertCondition;
  targetValue: number;
  currentValue: number | null;
  status: AlertStatus;
  message: string;
  metadata: Record<string, unknown>;
  triggeredAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
}

export interface CreateAlertRequest {
  asset: string;
  type: AlertType;
  condition: AlertCondition;
  targetValue: number;
  message?: string;
  expiresAt?: string;
}
