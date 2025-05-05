"use client"

import * as React from "react"
import {
  IconArrowUpRight,
  IconChartBar,
  IconTrendingDown,
  IconTrendingUp,
  IconCoins,
  IconWallet,
  IconUsers,
  IconDiamond,
  IconLock,
  IconServer,
  IconBuildingStore,
  IconCurrencyDollar,
} from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatPercent } from "@/lib/crypto-utils"
import type { JSX } from "react"

interface MarketSummaryType {
  advancers: number
  decliners: number
  unchanged: number
  totalVolume: number
  marketTrend: "bullish" | "bearish" | "neutral"
}

interface SectorPerformance {
  sector: string
  change: number
  marketCap: number
  topCoin: string
}

export function CryptoMarketSummary() {
  const [marketData, setMarketData] = React.useState<MarketSummaryType | null>(null)
  const [sectorData, setSectorData] = React.useState<SectorPerformance[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        // Fetch data from our API endpoint
        const response = await fetch("/api/market-data/crypto?type=all")
        const data = await response.json()

        if (data.success) {
          setMarketData(data.summary)
          setSectorData(data.sectors)
        } else {
          console.error("Failed to fetch market data:", data.error)
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  if (isLoading || !marketData) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="h-[400px] flex items-center justify-center">
          <p>Loading market data...</p>
        </Card>
        <Card className="h-[400px] flex items-center justify-center">
          <p>Loading sector data...</p>
        </Card>
      </div>
    )
  }

  // Calculate percentages
  const totalAssets = marketData.advancers + marketData.decliners + marketData.unchanged
  const advancersPercent = (marketData.advancers / totalAssets) * 100
  const declinersPercent = (marketData.decliners / totalAssets) * 100
  const unchangedPercent = (marketData.unchanged / totalAssets) * 100

  // Sort sectors by performance
  const sortedSectors = [...sectorData].sort((a, b) => b.change - a.change)
  const topSectors = sortedSectors.slice(0, 5)
  const bottomSectors = [...sortedSectors].reverse().slice(0, 5)

  // Sector icons mapping
  const sectorIcons: Record<string, JSX.Element> = {
    Identity: <IconWallet className="h-4 w-4" />,
    DeFi: <IconCoins className="h-4 w-4" />,
    Social: <IconUsers className="h-4 w-4" />,
    Gaming: <IconDiamond className="h-4 w-4" />,
    Privacy: <IconLock className="h-4 w-4" />,
    Storage: <IconServer className="h-4 w-4" />,
    Platform: <IconBuildingStore className="h-4 w-4" />,
    Stablecoin: <IconCurrencyDollar className="h-4 w-4" />,
    NFT: <IconDiamond className="h-4 w-4" />,
    Other: <IconCoins className="h-4 w-4" />,
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconChartBar className="h-5 w-5" />
            Crypto Market Pulse
          </CardTitle>
          <CardDescription>Performance of cryptocurrencies in the market</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 font-medium text-green-500">
                  <IconTrendingUp className="h-4 w-4" />
                  Gaining
                </div>
                <span>
                  {marketData.advancers} ({advancersPercent.toFixed(1)}%)
                </span>
              </div>
              <Progress value={advancersPercent} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 font-medium text-red-500">
                  <IconTrendingDown className="h-4 w-4" />
                  Declining
                </div>
                <span>
                  {marketData.decliners} ({declinersPercent.toFixed(1)}%)
                </span>
              </div>
              <Progress value={declinersPercent} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 font-medium text-muted-foreground">Stable</div>
                <span>
                  {marketData.unchanged} ({unchangedPercent.toFixed(1)}%)
                </span>
              </div>
              <Progress value={unchangedPercent} className="h-2 bg-muted" indicatorClassName="bg-gray-500" />
            </div>

            <div className="pt-2 text-sm">
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-muted-foreground">Total Volume</span>
                <span className="font-medium">${marketData.totalVolume.toFixed(1)}M</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-muted-foreground">Market Sentiment</span>
                <span
                  className={`font-medium ${
                    marketData.marketTrend === "bullish"
                      ? "text-green-500"
                      : marketData.marketTrend === "bearish"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                >
                  {marketData.marketTrend.charAt(0).toUpperCase() + marketData.marketTrend.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconArrowUpRight className="h-5 w-5" />
            Sector Performance
          </CardTitle>
          <CardDescription>Top and bottom performing sectors in crypto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-medium">Top Performers</h4>
              <div className="space-y-2">
                {topSectors.map((sector) => (
                  <div key={sector.sector} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {sectorIcons[sector.sector] || <IconCoins className="h-4 w-4" />}
                      <span>{sector.sector}</span>
                    </div>
                    <span className={sector.change > 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercent(sector.change)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h4 className="mb-2 font-medium">Bottom Performers</h4>
              <div className="space-y-2">
                {bottomSectors.map((sector) => (
                  <div key={sector.sector} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {sectorIcons[sector.sector] || <IconCoins className="h-4 w-4" />}
                      <span>{sector.sector}</span>
                    </div>
                    <span className={sector.change > 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercent(sector.change)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
