import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, BrainCircuit, DollarSign, Percent, TrendingUp, Users } from "lucide-react"

export function DashboardCards() {
  const stats = [
    {
      title: "Total ROI",
      value: "+24.5%",
      icon: <Percent className="h-4 w-4" />,
      change: "+5.2%",
      trend: "up",
    },
    {
      title: "Win/Loss Ratio",
      value: "3.2",
      icon: <TrendingUp className="h-4 w-4" />,
      change: "+0.3",
      trend: "up",
    },
    {
      title: "Followers",
      value: "245",
      icon: <Users className="h-4 w-4" />,
      change: "+12",
      trend: "up",
    },
    {
      title: "AI Predictions",
      value: "18",
      icon: <BrainCircuit className="h-4 w-4" />,
      change: "+5",
      trend: "up",
    },
    {
      title: "Signal Value",
      value: "$12,450",
      icon: <DollarSign className="h-4 w-4" />,
      change: "-$320",
      trend: "down",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">{stat.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {stat.trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {stat.change} from last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
