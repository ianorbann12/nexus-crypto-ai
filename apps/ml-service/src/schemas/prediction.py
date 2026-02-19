from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class Timeframe(str, Enum):
    H1 = "1h"
    H4 = "4h"
    D1 = "1d"
    D7 = "7d"
    D30 = "30d"


class Signal(str, Enum):
    STRONG_BUY = "strong_buy"
    BUY = "buy"
    NEUTRAL = "neutral"
    SELL = "sell"
    STRONG_SELL = "strong_sell"


class PredictionRequest(BaseModel):
    asset: str = Field(..., description="Asset symbol, e.g., 'BTC'")
    timeframe: Timeframe = Field(..., description="Prediction timeframe")
    model_id: str | None = Field(None, description="Specific model to use")


class PredictionResponse(BaseModel):
    asset: str
    model_id: str
    model_version: str
    timeframe: Timeframe
    signal: Signal
    confidence: float = Field(..., ge=0, le=1)
    predicted_price: float
    predicted_change_percent: float
    features_used: list[str]
    created_at: datetime


class PatternResponse(BaseModel):
    asset: str
    pattern: str
    confidence: float
    start_timestamp: datetime
    end_timestamp: datetime
    implications: str


class SentimentResponse(BaseModel):
    asset: str
    overall_score: float = Field(..., ge=-1, le=1)
    sources: dict[str, float]
    summary: str
