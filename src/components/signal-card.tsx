import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LikeButton } from "@/components/like-button"
import type { Signal } from "@/types"
import { ArrowDown, ArrowRight, ArrowUp, Clock, MessageSquare, User } from "lucide-react"

// Helper function to get asset display name
const getAssetName = (asset: string): string => {
  const assetMap: Record<string, string> = {
    btc: "Bitcoin (BTC)",
    eth: "Ethereum (ETH)",
    lyx: "LUKSO (LYX)",
    other: "Other",
  }
  return assetMap[asset] || asset
}

// Helper function to get action icon
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

// Helper function to get action color
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

// Helper function to get timeframe display
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

// Helper function to get confidence level color
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

interface SignalCardProps {
  signal: Signal
  userAddress?: string
  userName?: string
}

export function SignalCard({ signal, userAddress, userName }: SignalCardProps) {
  const {
    id,
    asset,
    action,
    timeframe,
    priceTarget,
    confidenceLevel,
    analysis,
    // creatorName,
    // creatorAddress,
    createdAt,
    comments,
    likes,
  } = signal

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true })
  const commentCount = comments?.length || 0
  const likeCount = likes?.length || 0

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link href={`/app/signals/${id}`} className="hover:underline">
            <CardTitle className="text-lg font-bold">{getAssetName(asset)}</CardTitle>
          </Link>
          <Badge className={`${getActionColor(action)} flex items-center gap-1`}>
            {getActionIcon(action)}
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {getTimeframeDisplay(timeframe)}
          </Badge>
          {priceTarget && <Badge variant="outline">Target: {priceTarget}</Badge>}
          <Badge variant="outline" className={getConfidenceColor(confidenceLevel)}>
            Confidence: {confidenceLevel}%
          </Badge>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Analysis & Rationale</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {analysis.length > 200 ? `${analysis.substring(0, 200)}...` : analysis}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {/* <span>{creatorName}</span>
            <span className="text-xs">({truncateAddress(creatorAddress)})</span> */}
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/app/signals/${id}#comments`} className="flex items-center gap-1 hover:text-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>{commentCount}</span>
            </Link>
            <LikeButton signalId={id} initialLikes={likes || []} userAddress={userAddress} userName={userName} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">Created {formattedDate}</CardFooter>
    </Card>
  )
}
