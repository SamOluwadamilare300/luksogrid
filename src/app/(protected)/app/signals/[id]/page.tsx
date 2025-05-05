import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CommentSection } from "@/components/comment-section"
import { LikeButton } from "@/components/like-button"
import { getSignalById } from "@/app/actions/signals"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Clock, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Helper functions (same as in signal-card.tsx)
const getAssetName = (asset: string): string => {
  const assetMap: Record<string, string> = {
    btc: "Bitcoin (BTC)",
    eth: "Ethereum (ETH)",
    lyx: "LUKSO (LYX)",
    other: "Other",
  }
  return assetMap[asset] || asset
}

const getActionIcon = (action: string) => {
  switch (action) {
    case "buy":
      return <ArrowUp className="h-4 w-4 text-green-500" />
    case "sell":
      return <ArrowDown className="h-4 w-4 text-red-500" />
    case "hold":
      return <ArrowRight className="h-4 w-4 text-yellow-500" />
    default:
      return null
  }
}

const getActionColor = (action: string): string => {
  switch (action) {
    case "buy":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "sell":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "hold":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const getTimeframeDisplay = (timeframe: string): string => {
  const timeframeMap: Record<string, string> = {
    "1h": "1 Hour",
    "4h": "4 Hours",
    "1d": "1 Day",
    "1w": "1 Week",
    "1m": "1 Month",
  }
  return timeframeMap[timeframe] || timeframe
}

const getConfidenceColor = (level: number): string => {
  if (level < 30) return "bg-red-500/10 text-red-500 border-red-500/20"
  if (level < 70) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  return "bg-green-500/10 text-green-500 border-green-500/20"
}

// Helper function to truncate address
const truncateAddress = (address: string): string => {
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

interface SignalPageProps {
  // params: {
  //   id: string
 // }
 params: { id: string }
 searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function SignalPage({ params }: SignalPageProps) {
  const id = Number.parseInt(params.id, 10)

  if (isNaN(id)) {
    notFound()
  }

  const signal = await getSignalById(id)

  if (!signal) {
    notFound()
  }

  const {
    asset,
    action,
    timeframe,
    priceTarget,
    confidenceLevel,
    analysis,
    creatorName,
    creatorAddress,
    createdAt,
    comments = [],
    likes = [],
  } = signal

  const formattedCreatedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <div className="container py-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/app/signals">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Signals
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">{getAssetName(asset)}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{creatorName}</span>
                <span className="text-xs">({truncateAddress(creatorAddress)})</span>
              </div>
            </div>
            <Badge className={`${getActionColor(action)} flex items-center gap-1 text-base px-3 py-1`}>
              {getActionIcon(action)}
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="flex items-center gap-1 text-sm px-3 py-1">
              <Clock className="h-3 w-3" />
              {getTimeframeDisplay(timeframe)}
            </Badge>
            {priceTarget && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                Target: {priceTarget}
              </Badge>
            )}
            <Badge variant="outline" className={`${getConfidenceColor(confidenceLevel)} text-sm px-3 py-1`}>
              Confidence: {confidenceLevel}%
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Analysis & Rationale</h3>
            <div className="bg-muted/50 p-4 rounded-md whitespace-pre-line">{analysis}</div>
          </div>

          <div className="flex justify-end">
            <LikeButton signalId={id} initialLikes={likes} />
          </div>

          <div className="pt-4 border-t" id="comments">
            <CommentSection signalId={id} initialComments={comments} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">Created {formattedCreatedDate}</div>
          <div className="flex gap-2">
            <Button variant="outline">Share</Button>
            <Button>Update Signal</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
