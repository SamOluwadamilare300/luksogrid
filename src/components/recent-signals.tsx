import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"

export function RecentSignals() {
  const signals = [
    {
      id: 1,
      user: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      asset: "BTC",
      action: "buy",
      confidence: "high",
      timeframe: "1d",
      created: "2h ago",
      performance: "+5.2%",
    },
    {
      id: 2,
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      asset: "ETH",
      action: "sell",
      confidence: "medium",
      timeframe: "4h",
      created: "5h ago",
      performance: "-2.1%",
    },
    {
      id: 3,
      user: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      asset: "LYX",
      action: "buy",
      confidence: "high",
      timeframe: "1w",
      created: "1d ago",
      performance: "+8.7%",
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Signals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {signals.map((signal) => (
            <div key={signal.id} className="flex items-start gap-4 p-3 rounded-lg border">
              <Avatar>
                <AvatarImage src={signal.user.avatar || "/placeholder.svg"} alt={signal.user.name} />
                <AvatarFallback>{signal.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{signal.user.name}</p>
                  <span className="text-xs text-muted-foreground">{signal.created}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={signal.action === "buy" ? "default" : "destructive"}>
                    {signal.action.toUpperCase()}
                  </Badge>
                  <span className="font-bold">{signal.asset}</span>
                  <Badge variant="outline">{signal.timeframe}</Badge>
                  <Badge variant="secondary">{signal.confidence}</Badge>
                </div>
                <div
                  className={`flex items-center ${
                    signal.performance.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {signal.performance.startsWith("+") ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{signal.performance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
