from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.config import settings
from src.api.router import api_router
from src.models.registry import ModelRegistry


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: warm up models
    registry = ModelRegistry(settings.model_dir)
    app.state.model_registry = registry
    await registry.load_models()
    yield
    # Shutdown: cleanup
    await registry.unload_models()


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    lifespan=lifespan,
)

app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": settings.app_name,
        "models_loaded": hasattr(app.state, "model_registry"),
    }
