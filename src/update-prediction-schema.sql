-- Add real-time flag and update timestamp to predictions table
ALTER TABLE ai_predictions 
ADD COLUMN IF NOT EXISTS is_realtime BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create a table for real-time market data
CREATE TABLE IF NOT EXISTS market_data (
  id SERIAL PRIMARY KEY,
  asset VARCHAR(10) NOT NULL,
  price DECIMAL(18, 8) NOT NULL,
  change_24h DECIMAL(8, 2),
  change_7d DECIMAL(8, 2),
  market_cap DECIMAL(18, 2),
  volume_24h DECIMAL(18, 2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on asset for faster lookups
CREATE INDEX IF NOT EXISTS idx_market_data_asset ON market_data(asset);

-- Create a table for blockchain data
CREATE TABLE IF NOT EXISTS blockchain_data (
  id SERIAL PRIMARY KEY,
  network VARCHAR(50) NOT NULL,
  block_number BIGINT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data JSONB
);

-- Create a table for prediction subscriptions
CREATE TABLE IF NOT EXISTS prediction_subscriptions (
  id SERIAL PRIMARY KEY,
  user_address VARCHAR(255) NOT NULL,
  asset VARCHAR(10) NOT NULL,
  timeframe VARCHAR(10) NOT NULL,
  model_id INTEGER REFERENCES ai_models(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_address, asset, timeframe, model_id)
);
