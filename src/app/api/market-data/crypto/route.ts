import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, pathname } = new URL(request.url)
  const path = pathname.replace("/api/coinmarketcap", "")

  // Build the CoinMarketCap API URL
  const apiUrl = new URL(`https://pro-api.coinmarketcap.com/v1${path}`)

  // Add all search params to the API URL
  searchParams.forEach((value, key) => {
    apiUrl.searchParams.append(key, value)
  })

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error(`CoinMarketCap API error: ${response.status} ${response.statusText}`)
      // Return a fallback response with mock data
      return NextResponse.json(getMockCryptoData())
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Invalid content type: ${contentType}`)
      // Return a fallback response with mock data
      return NextResponse.json(getMockCryptoData())
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error proxying request to CoinMarketCap:", error)
    // Return a fallback response with mock data
    return NextResponse.json(getMockCryptoData())
  }
}

// Mock data function to provide fallback data
function getMockCryptoData() {
  return {
    status: {
      timestamp: new Date().toISOString(),
      error_code: 0,
      error_message: null,
      elapsed: 10,
      credit_count: 1,
    },
    data: [
      {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        slug: "bitcoin",
        cmc_rank: 1,
        num_market_pairs: 500,
        circulating_supply: 19000000,
        total_supply: 21000000,
        max_supply: 21000000,
        last_updated: new Date().toISOString(),
        date_added: "2013-04-28T00:00:00.000Z",
        tags: ["mineable", "pow", "store-of-value"],
        quote: {
          USD: {
            price: 50000,
            volume_24h: 30000000000,
            percent_change_1h: 0.1,
            percent_change_24h: 2.5,
            percent_change_7d: 5,
            market_cap: 950000000000,
            last_updated: new Date().toISOString(),
          },
        },
      },
      {
        id: 1027,
        name: "Ethereum",
        symbol: "ETH",
        slug: "ethereum",
        cmc_rank: 2,
        num_market_pairs: 400,
        circulating_supply: 120000000,
        total_supply: 120000000,
        max_supply: null,
        last_updated: new Date().toISOString(),
        date_added: "2015-08-07T00:00:00.000Z",
        tags: ["mineable", "smart-contracts", "ethereum-ecosystem"],
        quote: {
          USD: {
            price: 3000,
            volume_24h: 15000000000,
            percent_change_1h: 0.2,
            percent_change_24h: 1.5,
            percent_change_7d: 3,
            market_cap: 360000000000,
            last_updated: new Date().toISOString(),
          },
        },
      },
      {
        id: 14866,
        name: "LUKSO",
        symbol: "LYX",
        slug: "lukso",
        cmc_rank: 120,
        num_market_pairs: 20,
        circulating_supply: 15000000,
        total_supply: 100000000,
        max_supply: 100000000,
        last_updated: new Date().toISOString(),
        date_added: "2021-05-25T00:00:00.000Z",
        tags: ["smart-contracts", "nft", "collectibles"],
        quote: {
          USD: {
            price: 5.75,
            volume_24h: 5000000,
            percent_change_1h: 0.5,
            percent_change_24h: 3.2,
            percent_change_7d: 10.5,
            market_cap: 86250000,
            last_updated: new Date().toISOString(),
          },
        },
      },
      // More mock cryptocurrencies as needed
    ],
  }
}
