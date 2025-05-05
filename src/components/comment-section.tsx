
// "use client"

// import type React from "react"
// import { useState, useTransition } from "react"
// import { formatDistanceToNow } from "date-fns"
// import { Loader2, Send } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { createComment } from "@/app/actions/comments"
// import type { Comment } from "@/types"
// import { useToast } from "@/hooks/use-toast"
// import { useAccount } from "wagmi"
// import { useUniversalProfile } from "@/hooks"

// interface CommentSectionProps {
//   signalId: number
//   initialComments: Comment[]
// }

// export function CommentSection({ signalId, initialComments }: CommentSectionProps) {
//   const [comments, setComments] = useState<Comment[]>(initialComments)
//   const [content, setContent] = useState("")
//   const [isPending, startTransition] = useTransition()
//   const { toast } = useToast()

//   // Get connected address and profile
//   const { address } = useAccount()
//   const { profile, isLoading: isProfileLoading, error: profileError } = useUniversalProfile(address, "https://rpc.mainnet.lukso.network")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!content || !address || !profile?.name) {
//       toast({
//         title: "Validation Error",
//         description: "Please connect your wallet and fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     startTransition(async () => {
//       const result = await createComment({
//         content,
//         authorName: profile.name ?? "",
//         authorAddress: address,
//         signalId,
//       })

//       if (result.success && result.comment) {
//         setComments((prev) => [...prev, result.comment!])
//         setContent("")
//         toast({
//           title: "Success",
//           description: "Comment added successfully",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: result.message,
//           variant: "destructive",
//         })
//       }
//     })
//   }

//   if (isProfileLoading) {
//     return <div>Loading profile...</div>
//   }

//   if (profileError) {
//     return <div>Error loading profile: {profileError}</div>
//   }

//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium">Comments ({comments.length})</h3>

//       <div className="space-y-4">
//         {comments.length === 0 ? (
//           <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
//         ) : (
//           comments.map((comment) => (
//             <div key={comment.id} className="bg-muted/30 p-4 rounded-md">
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <p className="font-medium">{comment.authorName}</p>
//                   <p className="text-xs text-muted-foreground truncate max-w-[200px]">{comment.authorAddress}</p>
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
//                 </p>
//               </div>
//               <p className="text-sm">{comment.content}</p>
//             </div>
//           ))
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex gap-2">
//           <Input
//             placeholder="Add a comment..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//             disabled={!address || isPending}
//           />
//           <Button type="submit" size="icon" disabled={isPending || !address}>
//             {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState, useTransition, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createComment } from "@/app/actions/comments"
import type { Comment } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { useAccount } from "wagmi"
import { useUniversalProfile } from "@/hooks"
import { ethers } from "ethers"

interface CommentSectionProps {
  signalId: number
  initialComments: Comment[]
}

export function CommentSection({ signalId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [content, setContent] = useState("")
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()


  // Get connected address
  const { address } = useAccount()

  // --- NEW: Detect network and set rpcUrl/networkName ---
  const [rpcUrl, setRpcUrl] = useState<string | null>(null)
  const [networkName, setNetworkName] = useState<"Mainnet" | "Testnet" | "Unknown">("Unknown")

  useEffect(() => {
    async function detectNetwork() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const { chainId } = await provider.getNetwork()
        if (chainId === BigInt(42)) {
          setRpcUrl("https://rpc.mainnet.lukso.network")
          setNetworkName("Mainnet")
        } else if (chainId === BigInt(4201)) {
          setRpcUrl("https://rpc.testnet.lukso.network")
          setNetworkName("Testnet")
        } else {
          setRpcUrl(null)
          setNetworkName("Unknown")
        }
      }
    }
    detectNetwork()
  }, [])

  // --- Use correct rpcUrl for profile fetch ---
  const { profile, isLoading: isProfileLoading, error: profileError } = useUniversalProfile(
    address,
    rpcUrl === "https://rpc.mainnet.lukso.network" ? "mainnet" : 
    rpcUrl === "https://rpc.testnet.lukso.network" ? "testnet" : "mainnet"
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content || !address || !profile?.name) {
      toast({
        title: "Validation Error",
        description: "Please connect your wallet and fill in all required fields",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      const result = await createComment({
        content,
        authorName: profile.name ?? "",
        authorAddress: address,
        signalId,
        network: networkName,
      })

      if (result.success && result.comment) {
        setComments((prev) => [...prev, result.comment!])
        setContent("")
        toast({
          title: "Success",
          description: "Comment added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    })
  }

  if (isProfileLoading) {
    return <div>Loading profile...</div>
  }

  if (profileError) {
    return <div>Error loading profile: {profileError}</div>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        Comments ({comments.length}){" "}
        <span className="text-xs text-muted-foreground">
          {networkName !== "Unknown" ? `[${networkName}]` : ""}
        </span>
      </h3>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-muted/30 p-4 rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{comment.authorName}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">{comment.authorAddress}</p>
                  {/* Optionally show network per comment if you store it */}
                  {comment.network && (
                    <p className="text-xs text-muted-foreground">[{comment.network}]</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </p>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={!address || isPending}
          />
          <Button type="submit" size="icon" disabled={isPending || !address}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}


