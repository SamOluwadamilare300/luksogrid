import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, Award, BarChart3, Signal, Users } from "lucide-react"

export function ProfileStats() {
  const stats = [
    {
      title: "Total ROI",
      value: "+24.5%",
      icon: <ArrowUp className="h-4 w-4" />,
      description: "All-time return on investment",
    },
    {
      title: "Signals Created",
      value: "45",
      icon: <Signal className="h-4 w-4" />,
      description: "Trading signals shared",
    },
    {
      title: "Followers",
      value: "245",
      icon: <Users className="h-4 w-4" />,
      description: "People following your signals",
    },
    {
      title: "Achievements",
      value: "12",
      icon: <Award className="h-4 w-4" />,
      description: "NFT achievements earned",
    },
    {
      title: "Ranking",
      value: "#28",
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Your position on the leaderboard",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">{stat.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
