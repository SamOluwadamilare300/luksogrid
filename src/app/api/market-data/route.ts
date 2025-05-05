import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbols = searchParams.get("symbols")

  if (!symbols) {
    return NextResponse.json({ success: false, error: "Symbols parameter is required" }, { status: 400 })
  }

  const apiKey = process.env.COINMARKETCAP_API_KEY
  if (!apiKey) {
    return NextResponse.json({ success: false, error: "CoinMarketCap API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbols}&convert=USD`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json",
        },
        next: { revalidate: 300 }, 
      },
    )

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status} - ${response.statusText}`)
    }

    const rawData = await response.json()

    // Transform the data into a more usable format
    const formattedData: Record<string, any> = {}

    for (const symbol of symbols.split(",")) {
      const coinData = rawData.data[symbol.toUpperCase()]
      if (coinData && coinData.length > 0) {
        const quote = coinData[0].quote.USD

        formattedData[symbol] = {
          symbol: symbol,
          price: quote.price,
          change_24h: quote.percent_change_24h,
          change_7d: quote.percent_change_7d,
          market_cap: quote.market_cap,
          volume_24h: quote.volume_24h,
          last_updated: quote.last_updated,
        }
      }
    }

    return NextResponse.json({ success: true, data: formattedData })
  } catch (error) {
    console.error("Error fetching from CoinMarketCap:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch data from CoinMarketCap" }, { status: 500 })
  }
}
