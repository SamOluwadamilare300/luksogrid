import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, BrainCircuit, Percent, Target } from "lucide-react"

export function AIPredictionsStats() {
  const stats = [
    {
      title: "AI Accuracy",
      value: "78.5%",
      icon: <Target className="h-4 w-4" />,
      description: "Overall prediction accuracy",
    },
    {
      title: "AI ROI",
      value: "+32.7%",
      icon: <ArrowUp className="h-4 w-4" />,
      description: "Return on investment from AI signals",
    },
    {
      title: "Confidence Score",
      value: "85/100",
      icon: <Percent className="h-4 w-4" />,
      description: "Average confidence of predictions",
    },
    {
      title: "Active Models",
      value: "1",
      icon: <BrainCircuit className="h-4 w-4" />,
      description: "AI models currently generating signals",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
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
