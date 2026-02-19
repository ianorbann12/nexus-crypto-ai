from fastapi import APIRouter

from src.schemas.prediction import SentimentResponse

router = APIRouter()


@router.get("/{asset}", response_model=SentimentResponse)
async def get_sentiment(asset: str):
    """Get sentiment analysis for an asset."""
    # TODO: Implement sentiment analysis
    return SentimentResponse(
        asset=asset,
        overall_score=0.0,
        sources={},
        summary="Sentiment analysis not yet implemented",
    )
