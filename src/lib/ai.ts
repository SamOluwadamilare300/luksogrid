type ModelParameters = {
  temperature?: number
  contextWindow?: number
  huggingFaceToken?: string
  marketData?: any
}

// Function to generate predictions using DeepSeek
async function generateDeepSeekPrediction(asset: string, timeframe: string, parameters: ModelParameters = {}) {
  const { temperature = 0.7, huggingFaceToken, marketData } = parameters

  if (!huggingFaceToken) {
    throw new Error("HuggingFace token is required for DeepSeek model")
  }

  let marketContext = ""
  if (marketData) {
    try {
      const assetData = marketData.data[asset]
      marketContext = `
        Current market data for ${asset}:
        - Price: $${assetData.quote.USD.price.toFixed(2)}
        - 24h Change: ${assetData.quote.USD.percent_change_24h.toFixed(2)}%
        - 7d Change: ${assetData.quote.USD.percent_change_7d.toFixed(2)}%
        - Market Cap: $${(assetData.quote.USD.market_cap / 1000000).toFixed(2)}M
        - Volume 24h: $${(assetData.quote.USD.volume_24h / 1000000).toFixed(2)}M
      `
    } catch (error) {
      console.warn("Failed to parse market data for prompt:", error)
    }
  }

  const prompt = `
    You are an expert financial AI assistant specialized in blockchain data analysis. Your task is: 

    1. Analyze the market activity for ${asset} with a ${timeframe} timeframe.
    ${marketContext ? `\nHere is the latest market data:\n${marketContext}\n` : ""}
    2. Based on this analysis, predict whether it is a good time to BUY, SELL, or HOLD.
    3. Provide a clear prediction, including:
       - Decision: BUY / SELL / HOLD
       - Confidence level (percentage)
       - Reasoning for the decision
       - Optional price target if applicable
    
    Format your output in JSON format as follows:
    {
      "action": "buy|sell|hold",
      "confidence": <number between 1-100>,
      "reasoning": "<detailed analysis explaining your prediction>",
      "priceTarget": <optional price target>
    }

    Only respond with the JSON object, no additional text.
  `

  const response = await fetch("https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-V3-0324", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${huggingFaceToken}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 512,
      model: "deepseek-ai/DeepSeek-V3-0324",
      stream: false,
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// Function to fetch LUKSO blockchain data from RPC
async function fetchLuksoBlockchainData() {
  try {
    const response = await fetch("https://rpc.lukso.gateway.fm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1,
      }),
    })

    if (!response.ok) {
      throw new Error(`LUKSO RPC error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching LUKSO blockchain data:", error)
    throw error
  }
}

// Function to fetch CoinMarketCap data
export async function fetchCoinMarketCapData(asset: string, apiKey: string) {
  try {
    // In server components/actions, we can directly call the API
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${asset}`, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching CoinMarketCap data:", error)
    throw error
  }
}

// Main function to generate predictions
export async function generatePrediction(asset: string, timeframe: string, modelId: number, parameters: ModelParameters = {}) {
  try {
    const text = await generateDeepSeekPrediction(asset, timeframe, parameters)

    try {
      return JSON.parse(text)
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", text)
      throw new Error("Invalid AI response format")
    }
  } catch (error) {
    console.error("Error generating prediction:", error)
    throw error
  }
}

export { fetchLuksoBlockchainData }
