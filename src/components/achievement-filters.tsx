import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AchievementFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      <Select defaultValue="all">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Achievements</SelectItem>
          <SelectItem value="claimed">Claimed</SelectItem>
          <SelectItem value="unclaimed">Unclaimed</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Rarity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rarities</SelectItem>
          <SelectItem value="common">Common</SelectItem>
          <SelectItem value="uncommon">Uncommon</SelectItem>
          <SelectItem value="rare">Rare</SelectItem>
          <SelectItem value="epic">Epic</SelectItem>
          <SelectItem value="legendary">Legendary</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Asset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assets</SelectItem>
          <SelectItem value="btc">Bitcoin</SelectItem>
          <SelectItem value="eth">Ethereum</SelectItem>
          <SelectItem value="lyx">LUKSO</SelectItem>
          <SelectItem value="multiple">Multiple</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">Reset Filters</Button>
    </div>
  )
}
