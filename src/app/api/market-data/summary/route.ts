import { NextResponse } from "next/server"

// Define types for our response
export type MarketSummary = {
  advancers: number
  decliners: number
  unchanged: number
  totalVolume: number
  marketTrend: "bullish" | "bearish" | "neutral"
}

export type SectorPerformance = {
  sector: string
  change: number
}

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "CoinMarketCap API key not configured" }, { status: 500 })
  }

  try {
    // Fetch top 100 cryptocurrencies data
    const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100", {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.statusText}`)
    }

    const data = await response.json()
    const cryptos = data.data || []

    // Calculate market summary
    let advancers = 0
    let decliners = 0
    let unchanged = 0
    let totalVolume = 0

    cryptos.forEach((crypto: any) => {
      const change24h = crypto.quote.USD.percent_change_24h

      if (change24h > 0.5) advancers++
      else if (change24h < -0.5) decliners++
      else unchanged++

      totalVolume += crypto.quote.USD.volume_24h
    })

    // Convert total volume to millions
    totalVolume = totalVolume / 1000000

    // Determine market trend
    let marketTrend: "bullish" | "bearish" | "neutral"
    if (advancers > decliners * 1.5) marketTrend = "bullish"
    else if (decliners > advancers * 1.5) marketTrend = "bearish"
    else marketTrend = "neutral"

    // Create sector performance data
    // For this example, we'll categorize coins into sectors based on their tags
    // In a real implementation, you might want to use a more sophisticated categorization
    const sectors: Record<string, { count: number; totalChange: number }> = {
      Identity: { count: 0, totalChange: 0 },
      DeFi: { count: 0, totalChange: 0 },
      Social: { count: 0, totalChange: 0 },
      Gaming: { count: 0, totalChange: 0 },
      "Layer 1": { count: 0, totalChange: 0 },
      "Layer 2": { count: 0, totalChange: 0 },
      Privacy: { count: 0, totalChange: 0 },
      Storage: { count: 0, totalChange: 0 },
      Other: { count: 0, totalChange: 0 },
    }

    // Categorize coins based on their tags or category
    cryptos.forEach((crypto: any) => {
      const tags = crypto.tags || []
      const change = crypto.quote.USD.percent_change_24h

      if (tags.includes("identity") || crypto.name === "LUKSO") {
        sectors["Identity"].count++
        sectors["Identity"].totalChange += change
      } else if (tags.includes("defi") || tags.includes("decentralized-finance")) {
        sectors["DeFi"].count++
        sectors["DeFi"].totalChange += change
      } else if (tags.includes("social") || tags.includes("media")) {
        sectors["Social"].count++
        sectors["Social"].totalChange += change
      } else if (tags.includes("gaming") || tags.includes("metaverse")) {
        sectors["Gaming"].count++
        sectors["Gaming"].totalChange += change
      } else if (tags.includes("layer-1")) {
        sectors["Layer 1"].count++
        sectors["Layer 1"].totalChange += change
      } else if (tags.includes("layer-2")) {
        sectors["Layer 2"].count++
        sectors["Layer 2"].totalChange += change
      } else if (tags.includes("privacy")) {
        sectors["Privacy"].count++
        sectors["Privacy"].totalChange += change
      } else if (tags.includes("storage")) {
        sectors["Storage"].count++
        sectors["Storage"].totalChange += change
      } else {
        sectors["Other"].count++
        sectors["Other"].totalChange += change
      }
    })

    // Calculate average change per sector
    const sectorPerformance: SectorPerformance[] = Object.entries(sectors)
      .filter(([_, data]) => data.count > 0)
      .map(([sector, data]) => ({
        sector,
        change: data.totalChange / data.count,
      }))

    // Prepare response
    const marketSummary: MarketSummary = {
      advancers,
      decliners,
      unchanged,
      totalVolume,
      marketTrend,
    }

    return NextResponse.json({
      success: true,
      marketSummary,
      sectorPerformance,
    })
  } catch (error) {
    console.error("Error fetching from CoinMarketCap:", error)
    return NextResponse.json({ error: "Failed to fetch data from CoinMarketCap" }, { status: 500 })
  }
}
