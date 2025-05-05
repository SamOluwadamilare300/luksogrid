// Format a number as currency
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }
  
  // Format a number as a percentage
  export function formatPercent(value: number): string {
    const sign = value > 0 ? "+" : ""
    return `${sign}${value.toFixed(2)}%`
  }
  
  // Format a large number (e.g., market cap)
  export function formatMarketCap(value: number): string {
    if (value >= 1_000_000_000_000) {
      return `$${(value / 1_000_000_000_000).toFixed(2)}T`
    } else if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`
    } else {
      return `$${value.toFixed(2)}`
    }
  }
  
  // Format a number with commas
  export function formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US").format(value)
  }
  
  // Format a volume number (in millions)
  export function formatVolume(value: number): string {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  
  // Generate historical data for a cryptocurrency
  export function generateHistoricalData(basePrice: number, days = 180, volatility = 5) {
    const data = []
    let currentPrice = basePrice
    const today = new Date()
  
    for (let i = days; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
  
      // Add some random movement to the price
      const change = (Math.random() - 0.5) * (volatility / 100) * currentPrice
      currentPrice += change
  
      // Ensure price doesn't go below 0
      if (currentPrice < 0) currentPrice = basePrice * 0.1
  
      // Generate a random volume
      const volume = Math.random() * basePrice * 1000000
  
      data.push({
        date: date.toISOString().split("T")[0],
        price: currentPrice,
        volume: volume,
      })
    }
  
    return data
  }
  