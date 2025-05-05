"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Users } from "lucide-react"

export function GovernanceProposals() {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Market Sentiment: Bitcoin Bull Run",
      description: "Community poll on the likelihood of Bitcoin reaching $100k by end of year",
      creator: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "active",
      endDate: "2 days left",
      votes: {
        yes: 65,
        no: 35,
        total: 245,
      },
      voted: null,
    },
    {
      id: 2,
      title: "Signal Verification: ETH Merge Impact",
      description: "Verify the accuracy of signals predicting ETH price movement post-merge",
      creator: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "active",
      endDate: "5 days left",
      votes: {
        yes: 72,
        no: 28,
        total: 189,
      },
      voted: "yes",
    },
    {
      id: 3,
      title: "LUKSO Ecosystem Growth",
      description: "Community assessment of LUKSO ecosystem growth and adoption rate",
      creator: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "completed",
      endDate: "Ended 3 days ago",
      votes: {
        yes: 88,
        no: 12,
        total: 312,
      },
      voted: "yes",
    },
  ])

  const vote = (id: number, vote: "yes" | "no") => {
    setProposals(
      proposals.map((proposal) => {
        if (proposal.id === id) {
          // If already voted, remove previous vote
          const prevVote = proposal.voted
          let yesVotes = proposal.votes.yes
          let noVotes = proposal.votes.no
          let totalVotes = proposal.votes.total

          if (prevVote === "yes") {
            yesVotes -= 1
            totalVotes -= 1
          } else if (prevVote === "no") {
            noVotes -= 1
            totalVotes -= 1
          }

          // Add new vote
          if (vote === "yes") {
            yesVotes += 1
            totalVotes += 1
          } else {
            noVotes += 1
            totalVotes += 1
          }

          return {
            ...proposal,
            votes: {
              yes: yesVotes,
              no: noVotes,
              total: totalVotes,
            },
            voted: prevVote === vote ? null : vote,
          }
        }
        return proposal
      }),
    )
  }

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{proposal.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={proposal.status === "active" ? "default" : "secondary"}>
                    {proposal.status === "active" ? "Active" : "Completed"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{proposal.endDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={proposal.creator.avatar || "/placeholder.svg"} alt={proposal.creator.name} />
                  <AvatarFallback>{proposal.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{proposal.creator.name}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{proposal.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Yes: {proposal.votes.yes}%</span>
                <span>No: {proposal.votes.no}%</span>
              </div>
              <Progress value={proposal.votes.yes} className="h-2" />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{proposal.votes.total} votes</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <Button
                variant={proposal.voted === "yes" ? "default" : "outline"}
                className="flex-1"
                onClick={() => vote(proposal.id, "yes")}
                disabled={proposal.status !== "active"}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Yes
              </Button>
              <Button
                variant={proposal.voted === "no" ? "default" : "outline"}
                className="flex-1"
                onClick={() => vote(proposal.id, "no")}
                disabled={proposal.status !== "active"}
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                No
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
