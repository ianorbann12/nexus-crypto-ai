import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class BaseModel:
    """Base class for all ML models."""

    name: str = "base"
    version: str = "0.0.0"

    async def load(self, model_dir: Path) -> None:
        """Load model weights."""
        pass

    async def predict(self, asset: str, timeframe: str) -> dict:
        """Generate prediction."""
        raise NotImplementedError

    async def unload(self) -> None:
        """Cleanup model resources."""
        pass


class ModelRegistry:
    """Registry for managing ML models."""

    def __init__(self, model_dir: str):
        self.model_dir = Path(model_dir)
        self.models: dict[str, BaseModel] = {}

    async def load_models(self) -> None:
        """Load all registered models."""
        from src.models.lstm import LSTMModel
        from src.models.transformer import TransformerModel
        from src.models.ensemble import EnsembleModel

        model_classes = [LSTMModel, TransformerModel, EnsembleModel]

        for model_cls in model_classes:
            model = model_cls()
            try:
                await model.load(self.model_dir)
                self.models[model.name] = model
                logger.info(f"Loaded model: {model.name} v{model.version}")
            except Exception as e:
                logger.warning(f"Failed to load model {model.name}: {e}")

    async def unload_models(self) -> None:
        """Unload all models."""
        for model in self.models.values():
            await model.unload()
        self.models.clear()

    def get_model(self, model_id: str) -> BaseModel:
        """Get a model by ID."""
        if model_id not in self.models:
            raise ValueError(f"Model '{model_id}' not found. Available: {list(self.models.keys())}")
        return self.models[model_id]

    def list_models(self) -> list[dict]:
        """List all loaded models."""
        return [
            {"name": m.name, "version": m.version}
            for m in self.models.values()
        ]
