-- Local dev migration (no TimescaleDB)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE holding_source AS ENUM ('wallet', 'exchange', 'manual');
CREATE TYPE transaction_type AS ENUM ('buy', 'sell', 'transfer', 'swap', 'stake', 'unstake', 'reward');
CREATE TYPE prediction_timeframe AS ENUM ('1h', '4h', '1d', '7d', '30d');
CREATE TYPE prediction_signal AS ENUM ('strong_buy', 'buy', 'neutral', 'sell', 'strong_sell');
CREATE TYPE alert_type AS ENUM ('price', 'percentage_change', 'volume', 'prediction', 'portfolio');
CREATE TYPE alert_condition AS ENUM ('above', 'below', 'crosses');
CREATE TYPE alert_status AS ENUM ('active', 'triggered', 'expired', 'disabled');
CREATE TYPE content_category AS ENUM ('basics', 'trading', 'defi', 'security', 'technical_analysis', 'ai_ml');
CREATE TYPE content_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  biometric_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Portfolio
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  address VARCHAR(255) NOT NULL,
  chain_id INTEGER NOT NULL,
  label VARCHAR(100) NOT NULL,
  is_watch_only BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE exchange_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exchange VARCHAR(50) NOT NULL,
  api_key_encrypted TEXT NOT NULL,
  api_secret_encrypted TEXT NOT NULL,
  label VARCHAR(100) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  asset VARCHAR(50) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  amount DECIMAL(30, 18) NOT NULL,
  avg_buy_price DECIMAL(30, 18) NOT NULL,
  source holding_source NOT NULL,
  source_id UUID,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  asset VARCHAR(50) NOT NULL,
  type transaction_type NOT NULL,
  amount DECIMAL(30, 18) NOT NULL,
  price DECIMAL(30, 18) NOT NULL,
  fee DECIMAL(30, 18) NOT NULL DEFAULT 0,
  fee_currency VARCHAR(20) NOT NULL DEFAULT 'USD',
  from_address VARCHAR(255),
  to_address VARCHAR(255),
  tx_hash VARCHAR(255),
  chain_id INTEGER,
  timestamp TIMESTAMPTZ NOT NULL
);

-- Market data (plain tables for local dev — no hypertables)
CREATE TABLE market_ohlcv (
  asset VARCHAR(50) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  open DECIMAL(30, 18) NOT NULL,
  high DECIMAL(30, 18) NOT NULL,
  low DECIMAL(30, 18) NOT NULL,
  close DECIMAL(30, 18) NOT NULL,
  volume DECIMAL(30, 8) NOT NULL,
  source VARCHAR(50) NOT NULL
);

CREATE TABLE price_ticks (
  asset VARCHAR(50) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  price DECIMAL(30, 18) NOT NULL,
  volume_24h DECIMAL(30, 8),
  market_cap DECIMAL(30, 8),
  source VARCHAR(50) NOT NULL
);

CREATE TABLE on_chain_metrics (
  asset VARCHAR(50) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  active_addresses INTEGER,
  transaction_count INTEGER,
  avg_transaction_value DECIMAL(30, 18),
  hash_rate BIGINT,
  total_value_locked DECIMAL(30, 8),
  source VARCHAR(50) NOT NULL
);

CREATE TABLE social_sentiment (
  asset VARCHAR(50) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  platform VARCHAR(50) NOT NULL,
  sentiment_score DECIMAL(5, 4) NOT NULL,
  volume INTEGER NOT NULL,
  positive_count INTEGER NOT NULL,
  negative_count INTEGER NOT NULL,
  neutral_count INTEGER NOT NULL
);

-- Predictions
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset VARCHAR(50) NOT NULL,
  model_id VARCHAR(100) NOT NULL,
  model_version VARCHAR(50) NOT NULL,
  timeframe prediction_timeframe NOT NULL,
  signal prediction_signal NOT NULL,
  confidence DECIMAL(5, 4) NOT NULL,
  predicted_price DECIMAL(30, 18) NOT NULL,
  predicted_change_percent DECIMAL(10, 4) NOT NULL,
  features JSONB NOT NULL DEFAULT '{}',
  actual_price DECIMAL(30, 18),
  actual_change_percent DECIMAL(10, 4),
  accuracy DECIMAL(5, 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  evaluated_at TIMESTAMPTZ
);

-- Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  asset VARCHAR(50) NOT NULL,
  type alert_type NOT NULL,
  condition alert_condition NOT NULL,
  target_value DECIMAL(30, 18) NOT NULL,
  current_value DECIMAL(30, 18),
  status alert_status NOT NULL DEFAULT 'active',
  message TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  triggered_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Education
CREATE TABLE education_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category content_category NOT NULL,
  difficulty content_difficulty NOT NULL,
  body TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES education_content(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  quiz_score DECIMAL(5, 2)
);

-- Indexes
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_wallets_user ON wallets(user_id);
CREATE INDEX idx_holdings_user ON holdings(user_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_asset ON transactions(asset);
CREATE INDEX idx_predictions_asset ON predictions(asset);
CREATE INDEX idx_predictions_created ON predictions(created_at DESC);
CREATE INDEX idx_alerts_user_status ON alerts(user_id, status);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
