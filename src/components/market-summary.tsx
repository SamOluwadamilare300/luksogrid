// "use client";

// import * as React from "react";
// import {
//   IconArrowUpRight,
//   IconChartBar,
//   IconTrendingDown,
//   IconTrendingUp,
//   IconCoins,
//   IconWallet,
//   IconUsers,
//   IconDiamond,
// } from "@tabler/icons-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { MarketDataService, formatPercent } from "@/lib/data";
// import type { MarketSummary as MarketSummaryType, SectorPerformance } from "@/lib/data";
// import { JSX } from "react";

// export function MarketSummary() {
//   const [marketData, setMarketData] = React.useState<MarketSummaryType | null>(null);
//   const [sectorData, setSectorData] = React.useState<SectorPerformance[]>([]);
//   const [isLoading, setIsLoading] = React.useState(true);

//   React.useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//       try {
//         const [marketSummary, sectorPerformance] = await Promise.all([
//           MarketDataService.getMarketSummary(),
//           MarketDataService.getSectorPerformance()
//         ]);

//         setMarketData(marketSummary);
//         setSectorData(sectorPerformance);
//       } catch (error) {
//         console.error("Failed to fetch market data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (isLoading || !marketData) {
//     return (
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         <Card className="h-[400px] flex items-center justify-center">
//           <p>Loading LUKSO data...</p>
//         </Card>
//         <Card className="h-[400px] flex items-center justify-center">
//           <p>Loading sector data...</p>
//         </Card>
//       </div>
//     );
//   }

//   // Calculate percentages
//   const totalAssets = marketData.advancers + marketData.decliners + marketData.unchanged;
//   const advancersPercent = (marketData.advancers / totalAssets) * 100;
//   const declinersPercent = (marketData.decliners / totalAssets) * 100;
//   const unchangedPercent = (marketData.unchanged / totalAssets) * 100;

//   // Sort sectors by performance
//   const sortedSectors = [...sectorData].sort((a, b) => b.change - a.change);
//   const topSectors = sortedSectors.slice(0, 5);
//   const bottomSectors = [...sortedSectors].reverse().slice(0, 5);

//   // Sector icons mapping
//   const sectorIcons: Record<"Identity" | "DeFi" | "Social" | "Gaming", JSX.Element> = {
//     "Identity": <IconWallet className="h-4 w-4" />,
//     "DeFi": <IconCoins className="h-4 w-4" />,
//     "Social": <IconUsers className="h-4 w-4" />,
//     "Gaming": <IconDiamond className="h-4 w-4" />,
//   };

//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//       <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <IconChartBar className="h-5 w-5" />
//             Market Pulse
//           </CardTitle>
//           <CardDescription>
//             Performance of assets in the LUKSO ecosystem
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-1 font-medium text-green-500">
//                   <IconTrendingUp className="h-4 w-4" />
//                   Gaining
//                 </div>
//                 <span>
//                   {marketData.advancers} (
//                   {advancersPercent.toFixed(1)}%)
//                 </span>
//               </div>
//               <Progress
//                 value={advancersPercent}
//                 className="h-2 bg-muted"
//                 indicatorClassName="bg-green-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-1 font-medium text-red-500">
//                   <IconTrendingDown className="h-4 w-4" />
//                   Declining
//                 </div>
//                 <span>
//                   {marketData.decliners} (
//                   {declinersPercent.toFixed(1)}%)
//                 </span>
//               </div>
//               <Progress
//                 value={declinersPercent}
//                 className="h-2 bg-muted"
//                 indicatorClassName="bg-red-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-1 font-medium text-muted-foreground">
//                   Stable
//                 </div>
//                 <span>
//                   {marketData.unchanged} (
//                   {unchangedPercent.toFixed(1)}%)
//                 </span>
//               </div>
//               <Progress
//                 value={unchangedPercent}
//                 className="h-2 bg-muted"
//                 indicatorClassName="bg-gray-500"
//               />
//             </div>

//             <div className="pt-2 text-sm">
//               <div className="flex items-center justify-between border-t pt-2">
//                 <span className="text-muted-foreground">Total Volume</span>
//                 <span className="font-medium">
//                   {marketData.totalVolume.toFixed(1)}M LYXe
//                 </span>
//               </div>
//               <div className="flex items-center justify-between border-t pt-2">
//                 <span className="text-muted-foreground">Market Sentiment</span>
//                 <span
//                   className={`font-medium ${
//                     marketData.marketTrend === "bullish"
//                       ? "text-green-500"
//                       : marketData.marketTrend === "bearish"
//                       ? "text-red-500"
//                       : "text-yellow-500"
//                   }`}
//                 >
//                   {marketData.marketTrend.charAt(0).toUpperCase() +
//                     marketData.marketTrend.slice(1)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <IconArrowUpRight className="h-5 w-5" />
//             Sector Performance
//           </CardTitle>
//           <CardDescription>
//             Top and bottom performing sectors in LUKSO
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <h4 className="mb-2 font-medium">Top Performers</h4>
//               <div className="space-y-2">
//                 {topSectors.map(sector => (
//                   <div
//                     key={sector.sector}
//                     className="flex items-center justify-between text-sm"
//                   >
//                     <div className="flex items-center gap-2">
//                       {sectorIcons[sector.sector as keyof typeof sectorIcons] || <IconCoins className="h-4 w-4" />}
//                       <span>{sector.sector}</span>
//                     </div>
//                     <span
//                       className={
//                         sector.change > 0 ? "text-green-500" : "text-red-500"
//                       }
//                     >
//                       {formatPercent(sector.change)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="pt-2">
//               <h4 className="mb-2 font-medium">Bottom Performers</h4>
//               <div className="space-y-2">
//                 {bottomSectors.map(sector => (
//                   <div
//                     key={sector.sector}
//                     className="flex items-center justify-between text-sm"
//                   >
//                     <div className="flex items-center gap-2">
//                       {sectorIcons[sector.sector as keyof typeof sectorIcons] || <IconCoins className="h-4 w-4" />}
//                       <span>{sector.sector}</span>
//                     </div>
//                     <span
//                       className={
//                         sector.change > 0 ? "text-green-500" : "text-red-500"
//                       }
//                     >
//                       {formatPercent(sector.change)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
  IconLayersSubtract,
  IconLock,
  IconDatabase,
} from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { JSX } from "react"

// Define types
type MarketSummary = {
  advancers: number
  decliners: number
  unchanged: number
  totalVolume: number
  marketTrend: "bullish" | "bearish" | "neutral"
}

type SectorPerformance = {
  sector: string
  change: number
}

// Helper function to format percent
export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

export function MarketSummary() {
  const [marketData, setMarketData] = React.useState<MarketSummary | null>(null)
  const [sectorData, setSectorData] = React.useState<SectorPerformance[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/market-data/summary")

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.success) {
          setMarketData(data.marketSummary)
          setSectorData(data.sectorPerformance)
        } else {
          throw new Error(data.error || "Failed to fetch market data")
        }
      } catch (err) {
        console.error("Failed to fetch market data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Set up polling every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading market data...</p>
        </Card>
        <Card className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading sector data...</p>
        </Card>
      </div>
    )
  }

  if (error || !marketData) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="h-[400px] flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-destructive mb-2">Failed to load market data</p>
            <p className="text-sm text-muted-foreground">{error || "Unknown error"}</p>
          </div>
        </Card>
        <Card className="h-[400px] flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-destructive mb-2">Failed to load sector data</p>
            <p className="text-sm text-muted-foreground">{error || "Unknown error"}</p>
          </div>
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
    "Layer 1": <IconLayersSubtract className="h-4 w-4" />,
    "Layer 2": <IconLayersSubtract className="h-4 w-4" />,
    Privacy: <IconLock className="h-4 w-4" />,
    Storage: <IconDatabase className="h-4 w-4" />,
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconChartBar className="h-5 w-5" />
            Market Pulse
          </CardTitle>
          <CardDescription>Performance of assets in the crypto market</CardDescription>
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
                <span className="font-medium">
                  $
                  {marketData.totalVolume.toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                  })}
                  M
                </span>
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
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-muted-foreground">Data Source</span>
                <span className="text-xs">CoinMarketCap</span>
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
