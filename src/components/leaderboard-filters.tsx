import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LeaderboardFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      <Select defaultValue="roi">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="roi">ROI</SelectItem>
          <SelectItem value="winRate">Win Rate</SelectItem>
          <SelectItem value="signals">Signal Count</SelectItem>
          <SelectItem value="followers">Followers</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="1w">Last Week</SelectItem>
          <SelectItem value="1m">Last Month</SelectItem>
          <SelectItem value="3m">Last 3 Months</SelectItem>
          <SelectItem value="1y">Last Year</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Asset Focus" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assets</SelectItem>
          <SelectItem value="btc">Bitcoin</SelectItem>
          <SelectItem value="eth">Ethereum</SelectItem>
          <SelectItem value="lyx">LUKSO</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">Reset Filters</Button>
    </div>
  )
}
