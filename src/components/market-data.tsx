"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, RefreshCw, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


interface MarketData {
  symbol: string
  price: number
  change_24h: number
  change_7d: number
  market_cap: number
  volume_24h: number
  last_updated: string
}

export function MarketData() {
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({})
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const symbols = ["LYX", "BTC", "ETH", "SOL", "AVAX"]

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/market-data?symbols=" + symbols.join(","))
      if (!response.ok) {
        throw new Error(`Failed to fetch market data: ${response.statusText}`)
      }

      const data = await response.json()
      if (data.success) {
        setMarketData(data.data)
      } else {
        throw new Error(data.error || "Failed to fetch market data")
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch market data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up polling every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`
    } else {
      return formatCurrency(value)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
          Market Data
        </CardTitle>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : Object.keys(marketData).length === 0 ? (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <TrendingUp className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No market data available</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchData}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {symbols.map((symbol) => {
              const data = marketData[symbol]
              if (!data) return null

              return (
                <div key={symbol} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {symbol}
                    </Badge>
                    <span className="font-medium">{formatCurrency(data.price)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center ${data.change_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {data.change_24h >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      <span>{data.change_24h.toFixed(2)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Vol: {formatLargeNumber(data.volume_24h)}</div>
                  </div>
                </div>
              )
            })}
            <div className="text-xs text-muted-foreground text-right mt-2">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
