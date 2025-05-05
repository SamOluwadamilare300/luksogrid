"use client"

import { useState, useTransition } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { likeSignal, unlikeSignal } from "@/app/actions/likes"
import type { Like } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface LikeButtonProps {
  signalId: number
  initialLikes: Like[]
  userAddress?: string
  userName?: string
}

export function LikeButton({ signalId, initialLikes, userAddress, userName }: LikeButtonProps) {
  const [likes, setLikes] = useState<Like[]>(initialLikes)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  // Check if the current user has liked this signal
  const hasLiked = userAddress ? likes.some((like) => like.userAddress === userAddress) : false

  const handleLike = () => {
    if (!userAddress || !userName) {
      toast({
        title: "Authentication Required",
        description: "Please enter your name and address to like this signal",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      if (hasLiked) {
        // Unlike the signal
        const result = await unlikeSignal(userAddress, signalId)
        if (result.success) {
          setLikes((prev) => prev.filter((like) => like.userAddress !== userAddress))
          toast({
            title: "Success",
            description: "Signal unliked successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          })
        }
      } else {
        // Like the signal
        const result = await likeSignal({
          userAddress,
          userName,
          signalId,
        })
        if (result.success && result.like) {
          setLikes((prev) => [...prev, result.like!])
          toast({
            title: "Success",
            description: "Signal liked successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          })
        }
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-1 ${hasLiked ? "text-red-500" : ""}`}
      onClick={handleLike}
      disabled={isPending}
    >
      <Heart className={`h-4 w-4 ${hasLiked ? "fill-current" : ""}`} />
      <span>{likes.length}</span>
    </Button>
  )
}
