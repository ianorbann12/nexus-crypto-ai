from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Nexus ML Service"
    debug: bool = False

    # Database
    database_url: str = "postgresql+asyncpg://nexus:nexus_dev@localhost:5432/nexus_crypto"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # Model settings
    model_dir: str = "./models/weights"
    default_model: str = "ensemble"

    # API settings
    api_v1_prefix: str = "/v1"

    model_config = {"env_file": "../../.env", "env_prefix": "ML_"}


settings = Settings()
