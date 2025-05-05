-- Add DeepSeek model to the AI models table
INSERT INTO ai_models (name, description, model_type, parameters)
VALUES 
('DeepSeek LUKSO Analyzer', 'Specialized model for LUKSO blockchain analysis using DeepSeek AI', 'deepseek', '{"temperature": 0.5, "huggingFaceToken": "YOUR_TOKEN_HERE"}')
ON CONFLICT (name) DO NOTHING;
