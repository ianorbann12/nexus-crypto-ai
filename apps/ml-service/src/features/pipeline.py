import pandas as pd

from src.features.technical import compute_technical_indicators
from src.features.on_chain import fetch_on_chain_features
from src.features.social import fetch_social_features


class FeaturePipeline:
    """Pipeline for computing ML features from raw data."""

    async def build_features(self, asset: str, timeframe: str) -> pd.DataFrame:
        """Build feature matrix for prediction."""
        # TODO: Fetch raw data and compute features
        technical = compute_technical_indicators(pd.DataFrame())
        on_chain = await fetch_on_chain_features(asset)
        social = await fetch_social_features(asset)

        # Merge all features
        features = pd.concat([technical, on_chain, social], axis=1)
        return features
