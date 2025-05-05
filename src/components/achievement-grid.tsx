"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Lock } from "lucide-react"

export function AchievementGrid() {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Golden Signal",
      description: "Created a signal that resulted in over 20% ROI",
      asset: "BTC",
      date: "Apr 15, 2023",
      rarity: "Rare",
      claimed: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      title: "Winning Streak",
      description: "5 consecutive profitable signals",
      asset: "ETH",
      date: "May 22, 2023",
      rarity: "Uncommon",
      claimed: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      title: "LUKSO Pioneer",
      description: "First to predict a major LYX price movement",
      asset: "LYX",
      date: "Jun 10, 2023",
      rarity: "Epic",
      claimed: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      title: "Market Oracle",
      description: "Accurately predicted a market reversal",
      asset: "Multiple",
      date: "Jul 5, 2023",
      rarity: "Legendary",
      claimed: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      title: "Community Favorite",
      description: "Signal received over 100 likes",
      asset: "ETH",
      date: "Aug 18, 2023",
      rarity: "Uncommon",
      claimed: true,
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  const claimAchievement = (id: number) => {
    setAchievements(
      achievements.map((achievement) => {
        if (achievement.id === id) {
          return {
            ...achievement,
            claimed: true,
          }
        }
        return achievement
      }),
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="overflow-hidden">
          <div className="relative aspect-square bg-muted">
            <img
              src={achievement.image || "/placeholder.svg"}
              alt={achievement.title}
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-2 right-2" variant="secondary">
              {achievement.rarity}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              {achievement.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">{achievement.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{achievement.asset}</span>
              <span className="text-muted-foreground">{achievement.date}</span>
            </div>
          </CardContent>
          <CardFooter>
            {achievement.claimed ? (
              <Button variant="outline" className="w-full" disabled>
                Claimed
              </Button>
            ) : (
              <Button className="w-full" onClick={() => claimAchievement(achievement.id)}>
                <Lock className="mr-2 h-4 w-4" />
                Claim as NFT
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
