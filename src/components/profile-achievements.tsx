import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award } from "lucide-react"

export function ProfileAchievements() {
  const achievements = [
    {
      id: 1,
      title: "Golden Signal",
      rarity: "Rare",
      date: "Apr 15, 2023",
    },
    {
      id: 2,
      title: "Winning Streak",
      rarity: "Uncommon",
      date: "May 22, 2023",
    },
    {
      id: 3,
      title: "LUKSO Pioneer",
      rarity: "Epic",
      date: "Jun 10, 2023",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Achievements</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.date}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-muted-foreground">{achievement.rarity}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
