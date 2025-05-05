
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Loader2 } from "lucide-react"
import { createSignal } from "@/lib/lukso-contract"
import { useToast } from "@/hooks/use-toast"

export function CreateBlockchainSignalForm() {
  const [asset, setAsset] = useState("")
  const [action, setAction] = useState("buy")
  const [timeframe, setTimeframe] = useState("86400") 
  const [priceTarget, setPriceTarget] = useState("")
  const [confidenceLevel, setConfidenceLevel] = useState([75])
  const [analysis, setAnalysis] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!asset || !action || !timeframe || !priceTarget || !analysis) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      await createSignal(asset, action, Number.parseInt(timeframe), priceTarget, confidenceLevel[0], analysis)

      toast({
        title: "Success",
        description: "Your trading signal has been created on the blockchain",
      })

      // Reset form
      setAsset("")
      setAction("buy")
      setTimeframe("86400")
      setPriceTarget("")
      setConfidenceLevel([75])
      setAnalysis("")
    } catch (error) {
      console.error("Error creating signal:", error)
      toast({
        title: "Error",
        description: "Failed to create signal. Please check your wallet connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
       <CardHeader>
        <CardTitle>Create On-Chain Trading Signal</CardTitle>
         <CardDescription>
           Create a new trading signal that will be stored on the LUKSO blockchain Digital Asset         </CardDescription>
       </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
       
            <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="asset">Asset</Label>
                        <Select value={timeframe} onValueChange={setTimeframe} required>
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
                        <Select value={timeframe} onValueChange={setTimeframe} required>
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
                        <Select value={timeframe} onValueChange={setTimeframe} required>
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
                        <span className="text-sm">{confidenceLevel[0]}%</span>
                      </div>
                      <Slider id="confidence" min={0} max={100} step={1}value={confidenceLevel}
              onValueChange={setConfidenceLevel} />
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
                    </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Signal...
                </>
              ) : (
                "Create On-Chain Signal"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
