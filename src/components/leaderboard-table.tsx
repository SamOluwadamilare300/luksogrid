"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, UserPlus } from "lucide-react"

export function LeaderboardTable() {
  const [traders, setTraders] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      address: "0x1234...5678",
      roi: 32.5,
      winRate: 78,
      signals: 45,
      followers: 1245,
      following: false,
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      address: "0x8765...4321",
      roi: 28.7,
      winRate: 72,
      signals: 38,
      followers: 987,
      following: true,
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      address: "0x5678...9012",
      roi: 24.3,
      winRate: 68,
      signals: 52,
      followers: 1532,
      following: false,
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      address: "0x9012...3456",
      roi: 21.8,
      winRate: 65,
      signals: 29,
      followers: 756,
      following: true,
    },
    {
      id: 5,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      address: "0x3456...7890",
      roi: 19.2,
      winRate: 62,
      signals: 34,
      followers: 892,
      following: false,
    },
  ])

  const toggleFollow = (id: number) => {
    setTraders(
      traders.map((trader) => {
        if (trader.id === id) {
          return {
            ...trader,
            followers: trader.following ? trader.followers - 1 : trader.followers + 1,
            following: !trader.following,
          }
        }
        return trader
      }),
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Trader</TableHead>
          <TableHead className="text-right">
            <Button variant="ghost" className="p-0 h-auto font-medium">
              ROI
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">Win Rate</TableHead>
          <TableHead className="text-right">Signals</TableHead>
          <TableHead className="text-right">Followers</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {traders.map((trader) => (
          <TableRow key={trader.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                  <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{trader.name}</div>
                  <div className="text-xs text-muted-foreground">{trader.address}</div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium text-green-500">+{trader.roi}%</TableCell>
            <TableCell className="text-right">{trader.winRate}%</TableCell>
            <TableCell className="text-right">{trader.signals}</TableCell>
            <TableCell className="text-right">{trader.followers.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Button
                variant={trader.following ? "outline" : "default"}
                size="sm"
                onClick={() => toggleFollow(trader.id)}
              >
                {!trader.following && <UserPlus className="mr-1 h-4 w-4" />}
                {trader.following ? "Following" : "Follow"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
