import { AchievementGrid } from "@/components/achievement-grid"
import { AchievementFilters } from "@/components/achievement-filters"

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Signal NFT Achievements</h1>
      <p className="text-muted-foreground">
        View and claim your trading signal achievements as LSP8 Identifiable Digital Assets.
      </p>
      <AchievementFilters />
      <AchievementGrid />
    </div>
  )
}
