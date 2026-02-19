from fastapi import APIRouter

from src.schemas.prediction import PatternResponse

router = APIRouter()


@router.get("/detect/{asset}", response_model=list[PatternResponse])
async def detect_patterns(asset: str, timeframe: str = "1d"):
    """Detect chart patterns for an asset."""
    # TODO: Implement pattern detection
    return []
