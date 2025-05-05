// Types for cryptocurrency data
export interface CryptoData {
    id: number
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    volume: number
    marketCap: number
    rank: number
    category: string
    lastUpdated: string
  }
  
  export interface ChartDataItem {
    date: string
    price: number
    volume: number
  }
  
  // Helper functions for formatting
  export function formatNumber(num: number): string {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B"
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K"
    }
    return num.toString()
  }
  
  export function formatMarketCap(marketCap: number): string {
    if (marketCap >= 1000000000000) {
      return "$" + (marketCap / 1000000000000).toFixed(2) + "T"
    } else if (marketCap >= 1000000000) {
      return "$" + (marketCap / 1000000000).toFixed(2) + "B"
    } else if (marketCap >= 1000000) {
      return "$" + (marketCap / 1000000).toFixed(2) + "M"
    }
    return "$" + marketCap.toString()
  }
  
  export function formatPercent(percent: number): string {
    const sign = percent > 0 ? "+" : ""
    return `${sign}${percent.toFixed(2)}%`
  }
  
  export class CryptoDataService {
    private static API_KEY = process.env.COINMARKETCAP_API_KEY
    private static BASE_URL = "https://pro-api.coinmarketcap.com/v1"
    private static PROXY_URL = "/api/coinmarketcap" // We'll use a proxy to avoid CORS issues
  
    // Fetch top cryptocurrencies
    static async getTopCryptos(limit = 100): Promise<CryptoData[]> {
      try {
        const response = await fetch(`${this.PROXY_URL}/listings/latest?limit=${limit}`)
  
        if (!response.ok) {
          console.error(`API error: ${response.status} ${response.statusText}`)
          return this.getMockCryptoData()
        }
  
        // Check if the response is JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.error(`Invalid content type: ${contentType}`)
          return this.getMockCryptoData()
        }
  
        const data = await response.json()
  
        if (!data.data) {
          console.error("Invalid API response format:", data)
          return this.getMockCryptoData()
        }
  
        // Transform the data to match our interface
        return data.data.map((crypto: any) => ({
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
          price: crypto.quote.USD.price,
          change: crypto.quote.USD.price * (crypto.quote.USD.percent_change_24h / 100),
          changePercent: crypto.quote.USD.percent_change_24h,
          volume: crypto.quote.USD.volume_24h,
          marketCap: crypto.quote.USD.market_cap,
          rank: crypto.cmc_rank,
          category: crypto.tags?.[0] || "Cryptocurrency",
          lastUpdated: crypto.last_updated,
        }))
      } catch (error) {
        console.error("Error fetching top cryptocurrencies:", error)
        return this.getMockCryptoData()
      }
    }
  
    // Get mock cryptocurrency data
    private static getMockCryptoData(): CryptoData[] {
      return [
        {
          id: 1,
          symbol: "BTC",
          name: "Bitcoin",
          price: 50000,
          change: 1250,
          changePercent: 2.5,
          volume: 30000000000,
          marketCap: 950000000000,
          rank: 1,
          category: "Store of Value",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 1027,
          symbol: "ETH",
          name: "Ethereum",
          price: 3000,
          change: 45,
          changePercent: 1.5,
          volume: 15000000000,
          marketCap: 360000000000,
          rank: 2,
          category: "Smart Contract Platform",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 14866,
          symbol: "LYX",
          name: "LUKSO",
          price: 5.75,
          change: 0.184,
          changePercent: 3.2,
          volume: 5000000,
          marketCap: 86250000,
          rank: 120,
          category: "NFT & Collectibles",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 1839,
          symbol: "BNB",
          name: "Binance Coin",
          price: 400,
          change: -8,
          changePercent: -2.0,
          volume: 2000000000,
          marketCap: 62000000000,
          rank: 3,
          category: "Centralized Exchange",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 52,
          symbol: "XRP",
          name: "XRP",
          price: 0.5,
          change: 0.01,
          changePercent: 2.0,
          volume: 1500000000,
          marketCap: 25000000000,
          rank: 4,
          category: "Payment",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 2010,
          symbol: "ADA",
          name: "Cardano",
          price: 0.4,
          change: -0.01,
          changePercent: -2.5,
          volume: 800000000,
          marketCap: 14000000000,
          rank: 5,
          category: "Smart Contract Platform",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 5426,
          symbol: "SOL",
          name: "Solana",
          price: 100,
          change: 5,
          changePercent: 5.0,
          volume: 3000000000,
          marketCap: 42000000000,
          rank: 6,
          category: "Smart Contract Platform",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 74,
          symbol: "DOGE",
          name: "Dogecoin",
          price: 0.08,
          change: 0.004,
          changePercent: 5.0,
          volume: 500000000,
          marketCap: 11000000000,
          rank: 7,
          category: "Meme",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 3408,
          symbol: "USDC",
          name: "USD Coin",
          price: 1.0,
          change: 0,
          changePercent: 0,
          volume: 5000000000,
          marketCap: 30000000000,
          rank: 8,
          category: "Stablecoin",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 825,
          symbol: "USDT",
          name: "Tether",
          price: 1.0,
          change: 0,
          changePercent: 0,
          volume: 10000000000,
          marketCap: 80000000000,
          rank: 9,
          category: "Stablecoin",
          lastUpdated: new Date().toISOString(),
        },
      ]
    }
  
    // Fetch specific cryptocurrency by ID
    static async getCryptoById(id: number): Promise<CryptoData | null> {
      try {
        const response = await fetch(`${this.PROXY_URL}/cryptocurrency/quotes/latest?id=${id}`)
  
        if (!response.ok) {
          console.error(`API error: ${response.status} ${response.statusText}`)
          return this.getMockCryptoById(id)
        }
  
        const data = await response.json()
  
        if (!data.data || !data.data[id]) {
          console.error(`Failed to fetch data for cryptocurrency ID ${id}`)
          return this.getMockCryptoById(id)
        }
  
        const crypto = data.data[id]
        return {
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
          price: crypto.quote.USD.price,
          change: crypto.quote.USD.price * (crypto.quote.USD.percent_change_24h / 100),
          changePercent: crypto.quote.USD.percent_change_24h,
          volume: crypto.quote.USD.volume_24h,
          marketCap: crypto.quote.USD.market_cap,
          rank: crypto.cmc_rank,
          category: crypto.tags?.[0] || "Cryptocurrency",
          lastUpdated: crypto.last_updated,
        }
      } catch (error) {
        console.error(`Error fetching cryptocurrency ID ${id}:`, error)
        return this.getMockCryptoById(id)
      }
    }
  
    // Get mock cryptocurrency by ID
    private static getMockCryptoById(id: number): CryptoData | null {
      const mockData = this.getMockCryptoData()
      return mockData.find((crypto) => crypto.id === id) || null
    }
  
    // Get historical data for a cryptocurrency
    static async getCryptoHistoricalData(crypto: CryptoData): Promise<any[]> {
      try {
        // For historical data, we'll use a different endpoint
        // Note: CoinMarketCap's free tier doesn't include historical data, so we'll use mock data
        return this.generateMockHistoricalData(crypto)
      } catch (error) {
        console.error(`Error fetching historical data for ${crypto.symbol}:`, error)
        return this.generateMockHistoricalData(crypto)
      }
    }
  
    // Generate mock historical data
    private static generateMockHistoricalData(crypto: CryptoData): any[] {
      const data = []
      const now = new Date()
      const basePrice = crypto.price
      const volatility = 0.05 // 5% daily volatility
  
      for (let i = 180; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
  
        // Generate a random price movement
        const randomChange = (Math.random() - 0.5) * 2 * volatility
        const priceMultiplier = 1 + randomChange
  
        data.push({
          timestamp: date.toISOString(),
          quote: {
            USD: {
              price: basePrice * Math.pow(priceMultiplier, i),
              volume_24h: crypto.volume * (0.8 + Math.random() * 0.4),
            },
          },
        })
      }
  
      return data
    }
  
    // Format historical data for charts
    static formatChartData(historicalData: any[]): ChartDataItem[] {
      return historicalData.map((item) => ({
        date: item.timestamp,
        price: item.quote.USD.price,
        volume: item.quote.USD.volume_24h / 1000000, // Convert to millions
      }))
    }
  
    // Filter data by time range
    static filterDataByTimeRange(data: ChartDataItem[], timeRange: "1m" | "3m" | "6m" | "1y" | "5y"): ChartDataItem[] {
      const now = new Date()
      let cutoffDate: Date
  
      switch (timeRange) {
        case "1m":
          cutoffDate = new Date(now.setMonth(now.getMonth() - 1))
          break
        case "3m":
          cutoffDate = new Date(now.setMonth(now.getMonth() - 3))
          break
        case "6m":
          cutoffDate = new Date(now.setMonth(now.getMonth() - 6))
          break
        case "1y":
          cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1))
          break
        case "5y":
          cutoffDate = new Date(now.setFullYear(now.getFullYear() - 5))
          break
        default:
          cutoffDate = new Date(now.setMonth(now.getMonth() - 3))
      }
  
      return data.filter((item) => new Date(item.date) >= cutoffDate)
    }
  
    // Calculate change for a given dataset
    static calculateChange(data: ChartDataItem[]): { value: number; percent: string } {
      if (data.length < 2) {
        return { value: 0, percent: "0.00" }
      }
  
      const firstPrice = data[0].price
      const lastPrice = data[data.length - 1].price
      const change = lastPrice - firstPrice
      const percentChange = (change / firstPrice) * 100
  
      return {
        value: change,
        percent: percentChange.toFixed(2),
      }
    }
  }
  