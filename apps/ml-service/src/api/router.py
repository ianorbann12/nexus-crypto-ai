from fastapi import APIRouter

from src.api.predict import router as predict_router
from src.api.patterns import router as patterns_router
from src.api.sentiment import router as sentiment_router

api_router = APIRouter()

api_router.include_router(predict_router, prefix="/predict", tags=["predictions"])
api_router.include_router(patterns_router, prefix="/patterns", tags=["patterns"])
api_router.include_router(sentiment_router, prefix="/sentiment", tags=["sentiment"])
