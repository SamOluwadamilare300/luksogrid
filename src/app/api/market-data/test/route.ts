import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API_KEY

  if (!apiKey) {
    return NextResponse.json({ success: false, error: "CoinMarketCap API key not configured" }, { status: 500 })
  }

  try {
    // Test the API key with a simple request
    const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=5", {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: "CoinMarketCap API key is working",
      sample: data.data.slice(0, 3), // Return first 3 items as a sample
    })
  } catch (error) {
    console.error("Error testing CoinMarketCap API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to CoinMarketCap API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
