import { LeaderboardTable } from "@/components/leaderboard-table"
import { LeaderboardFilters } from "@/components/leaderboard-filters"

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Performance Leaderboard</h1>
      <p className="text-muted-foreground">
        Discover top-performing signal providers based on verified on-chain performance metrics.
      </p>
      <LeaderboardFilters />
      <LeaderboardTable />
    </div>
  )
}
