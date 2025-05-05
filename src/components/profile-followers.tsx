import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileFollowers() {
  const followers = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      since: "2 months ago",
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      since: "3 weeks ago",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      since: "5 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Followers</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {followers.map((follower) => (
            <div key={follower.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={follower.avatar || "/placeholder.svg"} alt={follower.name} />
                  <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{follower.name}</div>
              </div>
              <div className="text-sm text-muted-foreground">{follower.since}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
