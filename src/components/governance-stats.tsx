import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleCheck, CircleDashed, Vote } from "lucide-react"

export function GovernanceStats() {
  const stats = [
    {
      title: "Active Proposals",
      value: "8",
      icon: <Vote className="h-4 w-4" />,
      description: "Ongoing community votes",
    },
    {
      title: "Your Participation",
      value: "75%",
      icon: <CircleCheck className="h-4 w-4" />,
      description: "Proposals you've voted on",
    },
    {
      title: "Governance Tokens",
      value: "250 LSP7",
      icon: <CircleDashed className="h-4 w-4" />,
      description: "Your voting power",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
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
