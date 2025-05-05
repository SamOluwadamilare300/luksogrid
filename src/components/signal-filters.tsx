// "use client"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search } from "lucide-react"

// export function SignalFilters() {
//   return (
//     <div className="flex flex-col gap-4 md:flex-row">
//       <div className="relative flex-1">
//         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//         <Input type="search" placeholder="Search signals..." className="pl-8" />
//       </div>
//       <div className="flex flex-wrap gap-2">
//         <Select defaultValue="all">
//           <SelectTrigger className="w-[120px]">
//             <SelectValue placeholder="Asset" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Assets</SelectItem>
//             <SelectItem value="btc">Bitcoin</SelectItem>
//             <SelectItem value="eth">Ethereum</SelectItem>
//             <SelectItem value="lyx">LUKSO</SelectItem>
//             <SelectItem value="other">Other</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select defaultValue="all">
//           <SelectTrigger className="w-[120px]">
//             <SelectValue placeholder="Action" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Actions</SelectItem>
//             <SelectItem value="buy">Buy</SelectItem>
//             <SelectItem value="sell">Sell</SelectItem>
//             <SelectItem value="hold">Hold</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select defaultValue="all">
//           <SelectTrigger className="w-[120px]">
//             <SelectValue placeholder="Timeframe" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Timeframes</SelectItem>
//             <SelectItem value="1h">1 Hour</SelectItem>
//             <SelectItem value="4h">4 Hours</SelectItem>
//             <SelectItem value="1d">1 Day</SelectItem>
//             <SelectItem value="1w">1 Week</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button variant="outline">Reset Filters</Button>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useTransition, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import type { FilterOptions } from "@/types"

interface SignalFiltersProps {
  assets: string[]
  actions: string[]
  timeframes: string[]
}

export function SignalFilters({ assets, actions, timeframes }: SignalFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [filters, setFilters] = useState<FilterOptions>({
    asset: searchParams.get("asset") || undefined,
    action: searchParams.get("action") || undefined,
    timeframe: searchParams.get("timeframe") || undefined,
    search: searchParams.get("search") || undefined,
  })

  const [searchInput, setSearchInput] = useState(filters.search || "")

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams()
    if (filters.asset) params.set("asset", filters.asset)
    if (filters.action) params.set("action", filters.action)
    if (filters.timeframe) params.set("timeframe", filters.timeframe)
    if (filters.search) params.set("search", filters.search)

    startTransition(() => {
      router.push(`/app/signals${params.toString() ? `?${params.toString()}` : ""}`)
    })
  }, [filters, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, search: searchInput }))
  }

  const resetFilters = () => {
    setFilters({})
    setSearchInput("")
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined)

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Search signals..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className=" flex w-2xl"
        />
        <Button type="submit" size="icon" variant="outline">
          <Search className="h-4 w-2" />
        </Button>
      </form>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-2 w-full sm:w-auto">
          <Label htmlFor="asset-filter">Asset</Label>
          <Select
            value={filters.asset || ""}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, asset: value || undefined }))}
          >
            <SelectTrigger id="asset-filter" className="w-full sm:w-[150px]">
              <SelectValue placeholder="All Assets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              {assets.map((asset) => (
                <SelectItem key={asset} value={asset}>
                  {asset === "btc"
                    ? "Bitcoin (BTC)"
                    : asset === "eth"
                      ? "Ethereum (ETH)"
                      : asset === "lyx"
                        ? "LUKSO (LYX)"
                        : asset}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full sm:w-auto">
          <Label htmlFor="action-filter">Action</Label>
          <Select
            value={filters.action || ""}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, action: value || undefined }))}
          >
            <SelectTrigger id="action-filter" className="w-full sm:w-[150px]">
              <SelectValue placeholder="All Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {actions.map((action) => (
                <SelectItem key={action} value={action}>
                  {action.charAt(0).toUpperCase() + action.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full sm:w-auto">
          <Label htmlFor="timeframe-filter">Timeframe</Label>
          <Select
            value={filters.timeframe || ""}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, timeframe: value || undefined }))}
          >
            <SelectTrigger id="timeframe-filter" className="w-full sm:w-[150px]">
              <SelectValue placeholder="All Timeframes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Timeframes</SelectItem>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe} value={timeframe}>
                  {timeframe === "1h"
                    ? "1 Hour"
                    : timeframe === "4h"
                      ? "4 Hours"
                      : timeframe === "1d"
                        ? "1 Day"
                        : timeframe === "1w"
                          ? "1 Week"
                          : timeframe === "1m"
                            ? "1 Month"
                            : timeframe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="flex items-center gap-1">
            <X className="h-4 w-4" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  )
}
