import pandas as pd


def compute_technical_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """Compute technical indicators from OHLCV data."""
    if df.empty:
        return df

    # TODO: Compute RSI, MACD, Bollinger Bands, etc. using 'ta' library
    return df
