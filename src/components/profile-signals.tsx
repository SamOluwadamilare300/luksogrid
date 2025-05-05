import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"

export function ProfileSignals() {
  const signals = [
    {
      id: 1,
      asset: "BTC",
      action: "buy",
      confidence: "high",
      timeframe: "1d",
      created: "Apr 15, 2023",
      performance: "+12.5%",
    },
    {
      id: 2,
      asset: "ETH",
      action: "sell",
      confidence: "medium",
      timeframe: "4h",
      created: "May 22, 2023",
      performance: "-2.1%",
    },
    {
      id: 3,
      asset: "LYX",
      action: "buy",
      confidence: "high",
      timeframe: "1w",
      created: "Jun 10, 2023",
      performance: "+18.7%",
    },
    {
      id: 4,
      asset: "BTC",
      action: "buy",
      confidence: "medium",
      timeframe: "1d",
      created: "Jul 5, 2023",
      performance: "+8.3%",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Signals</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {signals.map((signal) => (
            <div key={signal.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={signal.action === "buy" ? "default" : "destructive"}>
                    {signal.action.toUpperCase()}
                  </Badge>
                  <span className="font-bold">{signal.asset}</span>
                  <Badge variant="outline">{signal.timeframe}</Badge>
                  <Badge variant="secondary">{signal.confidence}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{signal.created}</div>
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
                <span className="font-medium">{signal.performance}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
