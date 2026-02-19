from datetime import datetime, timezone
from pathlib import Path

from src.models.registry import BaseModel


class TransformerModel(BaseModel):
    name = "transformer"
    version = "0.1.0"

    async def load(self, model_dir: Path) -> None:
        # TODO: Load Transformer weights
        pass

    async def predict(self, asset: str, timeframe: str) -> dict:
        # TODO: Implement Transformer prediction
        return {
            "asset": asset,
            "model_id": self.name,
            "model_version": self.version,
            "timeframe": timeframe,
            "signal": "neutral",
            "confidence": 0.0,
            "predicted_price": 0.0,
            "predicted_change_percent": 0.0,
            "features_used": ["close", "volume", "rsi", "macd", "on_chain", "sentiment"],
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
