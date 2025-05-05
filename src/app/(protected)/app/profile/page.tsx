import { ProfileHeader } from "@/components/profile-header"
import { ProfileStats } from "@/components/profile-stats"
import { ProfileSignals } from "@/components/profile-signals"
import { ProfileAchievements } from "@/components/profile-achievements"
import { ProfileFollowers } from "@/components/profile-followers"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileStats />
      <div className="grid gap-6 md:grid-cols-2">
        <ProfileSignals />
        <div className="space-y-6">
          <ProfileAchievements />
          <ProfileFollowers />
        </div>
      </div>
    </div>
  )
}
