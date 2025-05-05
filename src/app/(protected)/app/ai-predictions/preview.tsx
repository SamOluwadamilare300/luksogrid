"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, BrainCircuit, RefreshCw, Share2, Sparkles, ThumbsUp, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function AIPredictionsPreview() {
  const [selectedModels, setSelectedModels] = useState<number[]>([1])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [asset, setAsset] = useState("LYX")
  const [timeframe, setTimeframe] = useState("1d")
  const [useMarketData, setUseMarketData] = useState(true)
  const [predictions, setPredictions] = useState<any[]>([
    {
      id: 1,
      model: { name: "DeepSeek LUKSO Analyzer" },
      asset: "LYX",
      action: "buy",
      confidence: 85,
      timeframe: "1d",
      reasoning:
        "LUKSO (LYX) is showing strong bullish momentum with increasing volume. The recent network upgrade has improved scalability and transaction throughput, which is attracting more developers to the ecosystem. Technical indicators suggest a potential breakout above the current resistance level.",
      priceTarget: 12.75,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      performance: null,
      verified: false,
      liked: false,
      likes: 12,
    },
  ])

  const handleGeneratePrediction = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      const newPrediction = {
        id: Date.now(),
        model: { name: "DeepSeek LUKSO Analyzer" },
        asset: asset,
        action: Math.random() > 0.3 ? "buy" : Math.random() > 0.5 ? "sell" : "hold",
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99
        timeframe: timeframe,
        reasoning: `Based on the latest market data and on-chain metrics, ${asset} is showing ${Math.random() > 0.5 ? "bullish" : "bearish"} signals. The ${Math.random() > 0.5 ? "increasing" : "decreasing"} trading volume combined with ${Math.random() > 0.5 ? "positive" : "negative"} social sentiment suggests a potential ${Math.random() > 0.5 ? "upward" : "downward"} movement in the ${timeframe} timeframe.`,
        priceTarget: Math.random() > 0.3 ? Number.parseFloat((Math.random() * 20 + 10).toFixed(2)) : null,
        createdAt: new Date().toISOString(),
        performance: null,
        verified: false,
        liked: false,
        likes: Math.floor(Math.random() * 10),
      }

      setPredictions([newPrediction, ...predictions])
      setIsGenerating(false)
      setIsDialogOpen(false)
    }, 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else {
      const diffHours = Math.floor(diffMins / 60)
      return `${diffHours}h ago`
    }
  }

  const toggleLike = (id: number) => {
    setPredictions(
      predictions.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              AI-Powered Predictions
              <Sparkles className="ml-2 h-5 w-5 text-purple-500" />
            </h1>
            <p className="text-muted-foreground">
              DeepSeek AI model trained on market data to generate trading signals
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Button onClick={() => setIsDialogOpen(true)}>Generate New Prediction</Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate New AI Prediction</DialogTitle>
                  <DialogDescription>Select the asset and timeframe for your new prediction.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="asset" className="text-right">
                      Asset
                    </label>
                    <Select value={asset} onValueChange={setAsset}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LYX">LUKSO (LYX)</SelectItem>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="SOL">Solana (SOL)</SelectItem>
                        <SelectItem value="AVAX">Avalanche (AVAX)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="timeframe" className="text-right">
                      Timeframe
                    </label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="4h">4 Hours</SelectItem>
                        <SelectItem value="1d">1 Day</SelectItem>
                        <SelectItem value="1w">1 Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="models" className="text-right">
                      AI Models
                    </label>
                    <div className="col-span-3">
                      <Button variant="outline" className="w-full justify-between">
                        DeepSeek LUKSO Analyzer
                        <Badge className="ml-2">Selected</Badge>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="text-right">Data Sources</div>
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="market-data"
                          checked={useMarketData}
                          onCheckedChange={(checked) => setUseMarketData(checked === true)}
                        />
                        <Label htmlFor="market-data">Use CoinMarketCap data</Label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <p className="text-xs text-muted-foreground">
                      DeepSeek models leverage CoinMarketCap metrics for more accurate predictions.
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGeneratePrediction} disabled={isGenerating}>
                    {isGenerating ? "Generating..." : "Generate Prediction"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Predictions List */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BrainCircuit className="mr-2 h-5 w-5 text-purple-500" />
              AI Signal Predictions
              <Badge variant="outline" className="ml-2">
                1 model selected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          prediction.action === "buy"
                            ? "default"
                            : prediction.action === "sell"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {prediction.action.toUpperCase()}
                      </Badge>
                      <span className="font-bold">{prediction.asset}</span>
                      <Badge variant="outline">{prediction.timeframe}</Badge>
                    </div>
                    <span className="text-muted-foreground">Pending</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Confidence</span>
                      <span className="font-medium">{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{prediction.reasoning}</p>
                  {prediction.priceTarget && (
                    <p className="text-sm font-medium mb-3">Price Target: ${prediction.priceTarget}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BrainCircuit className="h-3 w-3" />
                      <span>{prediction.model.name}</span>
                    </div>
                    <span>{formatDate(prediction.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={prediction.liked ? "text-primary" : ""}
                      onClick={() => toggleLike(prediction.id)}
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {prediction.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="ml-auto">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Data */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
              Market Data
            </CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    LYX
                  </Badge>
                  <span className="font-medium">$11.24</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>5.32%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Vol: $14.2M</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    BTC
                  </Badge>
                  <span className="font-medium">$67,245.78</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>2.14%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Vol: $28.5B</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    ETH
                  </Badge>
                  <span className="font-medium">$3,421.56</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-red-500">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>0.87%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Vol: $12.7B</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    SOL
                  </Badge>
                  <span className="font-medium">$142.89</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>3.45%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Vol: $4.2B</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    AVAX
                  </Badge>
                  <span className="font-medium">$28.76</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-red-500">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>1.23%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Vol: $1.8B</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-right mt-2">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
