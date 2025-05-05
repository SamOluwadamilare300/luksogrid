"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BrainCircuit, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { createSignal } from "@/app/actions/signals"
import type { SignalFormData, Asset, Action, Timeframe } from "@/types"
import { useToast } from "@/hooks/use-toast"
export function SignalCreationForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  // Form state
  const [asset, setAsset] = useState<Asset | "">("")
  const [action, setAction] = useState<Action | "">("")
  const [timeframe, setTimeframe] = useState<Timeframe | "">("")
  const [priceTarget, setPriceTarget] = useState("")
  const [confidence, setConfidence] = useState([50])
  const [analysis, setAnalysis] = useState("")
  const [creatorName, setCreatorName] = useState("")
  const [creatorAddress, setCreatorAddress] = useState("")
  const [useAI, setUseAI] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!asset || !action || !timeframe || !analysis ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const formData: SignalFormData = {
      asset,
      action,
      timeframe,
      priceTarget: priceTarget || undefined,
      confidenceLevel: confidence[0],
      analysis,
      // creatorName,
      // creatorAddress,
      useAI,
    }

    startTransition(async () => {
      const result = await createSignal(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Signal created successfully",
        })
        router.push("/app/signals")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    })
  }

  const generateAIRecommendation = () => {
    // This would be implemented with an AI service
    const aiSuggestion =
      "Based on current market conditions, technical indicators suggest a bullish trend for this asset. RSI shows oversold conditions and MACD indicates a potential crossover. Consider including volume analysis to strengthen your signal."
    setAnalysis(analysis ? `${analysis}\n\nAI Suggestion: ${aiSuggestion}` : aiSuggestion)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
              <Label htmlFor="use-ai" className="flex items-center">
                <BrainCircuit className="mr-2 h-4 w-4 text-purple-500" />
                Use AI assistance
              </Label>
            </div>
            {useAI && (
              <Button type="button" variant="outline" size="sm" onClick={generateAIRecommendation}>
                Generate AI Recommendation
              </Button>
            )}
          </div>

          {/* <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="creator-name">Your Name</Label>
              <Input
                id="creator-name"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creator-address">Your Address</Label>
              <Input
                id="creator-address"
                value={creatorAddress}
                onChange={(e) => setCreatorAddress(e.target.value)}
                placeholder="Enter your wallet address"
                required
              />
            </div>
          </div> */}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="asset">Asset</Label>
              <Select value={asset} onValueChange={(value) => setAsset(value as Asset)} required>
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="lyx">LUKSO (LYX)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select value={action} onValueChange={(value) => setAction(value as Action)} required>
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="hold">Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)} required>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="1w">1 Week</SelectItem>
                  <SelectItem value="1m">1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-target">Price Target (optional)</Label>
              <Input
                id="price-target"
                type="text"
                placeholder="e.g. $65,000"
                value={priceTarget}
                onChange={(e) => setPriceTarget(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="confidence">Confidence Level</Label>
              <span className="text-sm text-muted-foreground">{confidence[0]}%</span>
            </div>
            <Slider id="confidence" min={0} max={100} step={1} value={confidence} onValueChange={setConfidence} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="analysis">Analysis & Rationale</Label>
            <Textarea
              id="analysis"
              placeholder="Provide your detailed analysis and reasoning for this signal..."
              rows={5}
              required
              value={analysis}
              onChange={(e) => setAnalysis(e.target.value)}
            />
            {useAI && (
              <div className="mt-2 p-3 bg-purple-500/10 rounded-md border border-purple-500/20">
                <div className="flex items-center text-sm font-medium text-purple-500 mb-2">
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  AI Suggestion
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on current market conditions, technical indicators suggest a bullish trend for this asset. RSI
                  shows oversold conditions and MACD indicates a potential crossover. Consider including volume analysis
                  to strengthen your signal.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Signal"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}



// "use client"

// import { useState, useTransition } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
// import { BrainCircuit, Loader2 } from "lucide-react"
// import { Switch } from "@/components/ui/switch"
// import { createSignal } from "@/app/actions/signals"
// import type { SignalFormData, Asset, Action, Timeframe } from "@/types"
// import { useToast } from "@/hooks/use-toast"
// import { useAccount } from "wagmi"
// import { useUniversalProfile } from "@/hooks"

// export function SignalCreationForm() {
//   const router = useRouter()
//   const [isPending, startTransition] = useTransition()
//   const { toast } = useToast()

//   // Get connected address and profile
//   const { address } = useAccount()
//   const { profile, isLoading: isProfileLoading, error: profileError } = useUniversalProfile(address, "https://rpc.mainnet.lukso.network")

//   // Form state
//   const [asset, setAsset] = useState<Asset | "">("")
//   const [action, setAction] = useState<Action | "">("")
//   const [timeframe, setTimeframe] = useState<Timeframe | "">("")
//   const [priceTarget, setPriceTarget] = useState("")
//   const [confidence, setConfidence] = useState([50])
//   const [analysis, setAnalysis] = useState("")
//   const [useAI, setUseAI] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Use profile?.name and address directly
//     if (!asset || !action || !timeframe || !analysis || !profile?.name || !address) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     const formData: SignalFormData = {
//       asset,
//       action,
//       timeframe,
//       priceTarget: priceTarget || undefined,
//       confidenceLevel: confidence[0],
//       analysis,
//       creatorName: profile.name,
//       creatorAddress: address,
//       useAI,
//     }

//     startTransition(async () => {
//       const result = await createSignal(formData)

//       if (result.success) {
//         toast({
//           title: "Success",
//           description: "Signal created successfully",
//         })
//         router.push("/app/signals")
//       } else {
//         toast({
//           title: "Error",
//           description: result.message,
//           variant: "destructive",
//         })
//       }
//     })
//   }

//   const generateAIRecommendation = () => {
//     const aiSuggestion =
//       "Based on current market conditions, technical indicators suggest a bullish trend for this asset. RSI shows oversold conditions and MACD indicates a potential crossover. Consider including volume analysis to strengthen your signal."
//     setAnalysis(analysis ? `${analysis}\n\nAI Suggestion: ${aiSuggestion}` : aiSuggestion)
//   }

//   // if (isProfileLoading) {
//   //   return <div>Loading profile...</div>
//   // }

//   // if (profileError) {
//   //   return <div>Error loading profile: {profileError}</div>
//   // }

//   return (
//     <Card>
//      <CardHeader>
//     <CardTitle>Create a Trading Signal in the App</CardTitle>
//      <CardDescription>
//      Creating a new trading signal in the App does not require holding any digital assets now or in the future.
//     </CardDescription>
//         </CardHeader>
//       <CardContent className="pt-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
//               <Label htmlFor="use-ai" className="flex items-center">
//                 <BrainCircuit className="mr-2 h-4 w-4 text-purple-500" />
//                 Use AI assistance
//               </Label>
//             </div>
//             {useAI && (
//               <Button type="button" variant="outline" size="sm" onClick={generateAIRecommendation}>
//                 Generate AI Recommendation
//               </Button>
//             )}
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="asset">Asset</Label>
//               <Select value={asset} onValueChange={(value) => setAsset(value as Asset)} required>
//                 <SelectTrigger id="asset">
//                   <SelectValue placeholder="Select asset" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
//                   <SelectItem value="eth">Ethereum (ETH)</SelectItem>
//                   <SelectItem value="lyx">LUKSO (LYX)</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="action">Action</Label>
//               <Select value={action} onValueChange={(value) => setAction(value as Action)} required>
//                 <SelectTrigger id="action">
//                   <SelectValue placeholder="Select action" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="buy">Buy</SelectItem>
//                   <SelectItem value="sell">Sell</SelectItem>
//                   <SelectItem value="hold">Hold</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="timeframe">Timeframe</Label>
//               <Select value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)} required>
//                 <SelectTrigger id="timeframe">
//                   <SelectValue placeholder="Select timeframe" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="1h">1 Hour</SelectItem>
//                   <SelectItem value="4h">4 Hours</SelectItem>
//                   <SelectItem value="1d">1 Day</SelectItem>
//                   <SelectItem value="1w">1 Week</SelectItem>
//                   <SelectItem value="1m">1 Month</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="price-target">Price Target (optional)</Label>
//               <Input
//                 id="price-target"
//                 type="text"
//                 placeholder="e.g. $65,000"
//                 value={priceTarget}
//                 onChange={(e) => setPriceTarget(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="confidence">Confidence Level</Label>
//               <span className="text-sm text-muted-foreground">{confidence[0]}%</span>
//             </div>
//             <Slider id="confidence" min={0} max={100} step={1} value={confidence} onValueChange={setConfidence} />
//             <div className="flex justify-between text-xs text-muted-foreground">
//               <span>Low</span>
//               <span>Medium</span>
//               <span>High</span>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="analysis">Analysis & Rationale</Label>
//             <Textarea
//               id="analysis"
//               placeholder="Provide your detailed analysis and reasoning for this signal..."
//               rows={5}
//               required
//               value={analysis}
//               onChange={(e) => setAnalysis(e.target.value)}
//             />
//             {useAI && (
//               <div className="mt-2 p-3 bg-purple-500/10 rounded-md border border-purple-500/20">
//                 <div className="flex items-center text-sm font-medium text-purple-500 mb-2">
//                   <BrainCircuit className="mr-2 h-4 w-4" />
//                   AI Suggestion
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Based on current market conditions, technical indicators suggest a bullish trend for this asset. RSI
//                   shows oversold conditions and MACD indicates a potential crossover. Consider including volume analysis
//                   to strengthen your signal.
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             <Button type="submit" size="lg" disabled={isPending}>
//               {isPending ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 "Create Signal"
//               )}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }





