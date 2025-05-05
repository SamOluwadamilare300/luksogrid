import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")

  if (!symbol) {
    return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 })
  }

  const CMC_API_KEY = process.env.COINMARKETCAP_API_KEY

  if (!CMC_API_KEY) {
    return NextResponse.json({ error: "CoinMarketCap API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`, {
      headers: {
        "X-CMC_PRO_API_KEY": CMC_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from CoinMarketCap:", error)
    return NextResponse.json({ error: "Failed to fetch data from CoinMarketCap" }, { status: 500 })
  }
}
