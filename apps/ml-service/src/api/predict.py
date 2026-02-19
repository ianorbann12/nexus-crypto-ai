from fastapi import APIRouter, Depends, Request

from src.schemas.prediction import PredictionRequest, PredictionResponse
from src.models.registry import ModelRegistry

router = APIRouter()


def get_registry(request: Request) -> ModelRegistry:
    return request.app.state.model_registry


@router.post("/", response_model=PredictionResponse)
async def predict(
    body: PredictionRequest,
    registry: ModelRegistry = Depends(get_registry),
):
    """Generate price prediction for an asset."""
    model = registry.get_model(body.model_id or "ensemble")
    prediction = await model.predict(
        asset=body.asset,
        timeframe=body.timeframe,
    )
    return prediction
