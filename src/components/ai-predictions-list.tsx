
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, BrainCircuit, Share2, ThumbsUp, Sparkles, Settings, Signal, SignalHigh, SignalLow } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Prediction = {
  id: number
  modelId: number
  model: {
    name: string
  }
  asset: string
  action: string
  confidence: number
  timeframe: string
  reasoning: string
  priceTarget: number | null
  createdAt: string
  performance: number | null
  verified: boolean
  liked?: boolean
  likes?: number
}

interface AIPredictionsListProps {
  selectedModels?: number[]
  availableModels: { id: number; name: string }[]
  onModelSelectionChange?: (selectedModels: number[]) => void
}

export function AIPredictionsList({ 
  selectedModels = [], 
  availableModels = [],
  onModelSelectionChange 
}: AIPredictionsListProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [asset, setAsset] = useState("LYX")
  const [timeframe, setTimeframe] = useState("1d")
  const [useMarketData, setUseMarketData] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Load initial predictions
  useEffect(() => {
    const loadPredictions = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setPredictions([])
        setLoading(false)
      } catch (error) {
        console.error("Failed to load predictions:", error)
        setLoading(false)
      }
    }
    loadPredictions()
  }, [])

  const handleModelSelection = (modelId: number) => {
    const newSelectedModels = selectedModels.includes(modelId)
      ? selectedModels.filter(id => id !== modelId)
      : [...selectedModels, modelId]
    
    if (onModelSelectionChange) {
      onModelSelectionChange(newSelectedModels)
    }
  }

  const handleGeneratePrediction = async () => {
    if (selectedModels.length === 0) {
      toast({
        title: "No models selected",
        description: "Please select at least one AI model to generate a prediction.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch(
        "https://router.huggingface.co/hyperbolic/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY ?? ""}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
              
                content: `You are an expert financial AI assistant specialized in blockchain data analysis. Your task is:
                1. Analyze ${asset} price action in the ${timeframe} timeframe using simple, easy-to-understand language
                2. Explain the market situation like you're teaching a beginner:
                   - Describe the price movement clearly (up, down, or sideways)
                   - Mention trading volume and what it means
                   - Explain key indicators (like RSI) in plain terms
                   - Give clear reasons for your recommendation
                3. Provide your prediction with these exact fields:
                   - Decision: BUY/SELL/HOLD
                   - Confidence level: XX%
                   - Reasoning: [your analysis]
                   - Price target: [Calculate specific target based on support/resistance levels when possible. If no clear target exists, use "null"]
                
                Format your output like this example:
                Decision: HOLD, Confidence level: 65%, Reasoning: LYX is moving up and down without a clear direction. Trading volume is normal, meaning people aren't rushing to buy or sell. The RSI is near 50, which means the price isn't showing strong signs of going up or down right now. It's better to wait for a clearer trend., Price target: null
                
                Make sure to:
                - Use simple words and short sentences
                - Explain technical terms in plain language
                - Give practical advice a beginner could understand
                - Keep the exact output format shown above
                -Don't render the output in "" or  with ** or any symbal for that matter
                - Don't give any suggestion note.
                - Only use "null" when no clear technical levels exist`
                
              },
            ],
            stream: false,
            model: "deepseek-ai/DeepSeek-V3-0324",
            temperature: 0.7,
            max_tokens: 512,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      const predictionContent = data.choices[0].message.content

      if (!predictionContent) {
        throw new Error("No prediction returned from API")
      }

  // Replace the parsing logic with this:
// let parsedPrediction;
// try {
//   // Try to parse as JSON first (fallback)
//   parsedPrediction = JSON.parse(predictionContent);
// } catch {
//   // Parse the clean key-value format
//   parsedPrediction = {
//     action: predictionContent.match(/Decision:\s*(BUY|SELL|HOLD)/i)?.[1]?.toLowerCase() || "hold",
//     confidence: parseInt(predictionContent.match(/Confidence level:\s*(\d+)%/i)?.[1] || "70"),
//     reasoning: predictionContent.match(/Reasoning:\s*(.*?)(?:, Price target|$)/i)?.[1] || predictionContent,
//     priceTarget: parseFloat(predictionContent.match(/Price target:\s*([\d.]+)/i)?.[1]) || null
//   };
// }

let parsedPrediction;
try {
  parsedPrediction = JSON.parse(predictionContent);
} catch {
  parsedPrediction = {
    action: predictionContent.match(/Decision:\s*(BUY|SELL|HOLD)/i)?.[1]?.toLowerCase() || "hold",
    confidence: parseInt(predictionContent.match(/Confidence level:\s*(\d+)%/i)?.[1] || "50"),
    reasoning: predictionContent.match(/Reasoning:\s*(.*?)(?:, Price target|$)/i)?.[1] || predictionContent,
    priceTarget: extractPriceTarget(predictionContent) // Use improved extractor
  };
}


parsedPrediction.confidence = Math.min(100, Math.max(1, parsedPrediction.confidence))

const newPredictions = selectedModels.map(modelId => {
  const model = availableModels.find(m => m.id === modelId) || { name: "Unknown Model" }
  return {
    id: Date.now() + modelId,
    modelId,
    model: { name: model.name },
    asset,
    action: parsedPrediction.action,
    confidence: parsedPrediction.confidence,
    timeframe,
    reasoning: parsedPrediction.reasoning,
    priceTarget: parsedPrediction.priceTarget,
    createdAt: new Date().toISOString(),
    performance: null,
    verified: false,
    liked: false,
    likes: 0
  }
})

setPredictions(newPredictions)
toast({
  title: "Prediction Generated",
  description: `${asset} ${timeframe} prediction created for ${selectedModels.length} model(s)`,
})
setIsDialogOpen(false)
} catch (error) {
console.error("Prediction error:", error)
toast({
  title: "Prediction Failed",
  description: error instanceof Error ? error.message : "An unknown error occurred",
  variant: "destructive",
})
} finally {
setIsGenerating(false)
}
}

  // Helper functions
  const extractConfidence = (text: string): number => {
    const confidenceMatch = text.match(/(\d+)% confidence/)
    return confidenceMatch ? parseInt(confidenceMatch[1]) : 70
  }

  // const extractPriceTarget = (text: string): number | null => {
  //   const priceMatch = text.match(/\$([\d,]+\.?\d*)/)
  //   return priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : null
  // }

  function extractPriceTarget(text: string): number | null {
    // Try multiple patterns to find price
    const patterns = [
      /\$([\d,]+\.?\d*)/,                         // $12,345.67
      /Price target:\s*([\d,]+\.?\d*)/i,          // Price target: 12345
      /target(?: price)? of\s*([\d,]+\.?\d*)/i,   // target of 12345
      /around\s*([\d,]+\.?\d*)/i                  // around 12345
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return parseFloat(match[1].replace(/,/g, ''));
      }
    }
    return null;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else {
      return `${diffDays}d ago`
    }
  }

  const formatPerformance = (performance: number | null): string => {
    if (performance === null) return "N/A"
    return `${performance > 0 ? '+' : ''}${performance.toFixed(2)}%`
  }

  const toggleLike = (id: number) => {
    setPredictions(predictions.map(pred => 
      pred.id === id 
        ? { 
            ...pred, 
            liked: !pred.liked, 
            likes: (pred.likes || 0) + (pred.liked ? -1 : 1) 
          } 
        : pred
    ))
  }

  const getSignalVariant = (action: string, confidence: number) => {
    if (action === 'buy') {
      return confidence >= 70 ? (
        <SignalHigh className="h-4 w-4 text-green-500" />
      ) : (
        <SignalLow className="h-4 w-4 text-green-300" />
      )
    } else if (action === 'sell') {
      return confidence >= 70 ? (
        <SignalHigh className="h-4 w-4 text-red-500" />
      ) : (
        <SignalLow className="h-4 w-4 text-red-300" />
      )
    }
    return <Signal className="h-4 w-4 text-gray-500" />
  }

  const getSignalLabel = (action: string, confidence: number) => {
    if (action === 'buy') {
      return confidence >= 70 ? 'Strong Buy' : 'Buy'
    } else if (action === 'sell') {
      return confidence >= 70 ? 'Strong Sell' : 'Sell'
    }
    return 'Neutral'
  }

  const getSignalColor = (action: string) => {
    return action === 'buy' ? 'bg-green-50 hover:bg-green-100 border-green-200 text-green-600' :
           action === 'sell' ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600' :
           'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BrainCircuit className="mr-2 h-5 w-5 text-purple-500" />
              AI Signal Predictions
            </div>
           
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Sparkles className="h-4 w-4" />
                  Generate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate New AI Prediction</DialogTitle>
                  <DialogDescription>
                    Configure the parameters for your new prediction.
                  </DialogDescription>
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
                    <div className="col-span-3 space-y-2">
                      {availableModels.map(model => (
                        <div key={model.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`model-${model.id}`}
                            checked={selectedModels.includes(model.id)}
                            onCheckedChange={() => handleModelSelection(model.id)}
                          />
                          <Label htmlFor={`model-${model.id}`}>
                            {model.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="text-right">Data Sources</div>
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="market-data"
                          checked={useMarketData}
                          onCheckedChange={(checked) =>
                            setUseMarketData(checked === true)
                          }
                        />
                        <Label htmlFor="market-data">
                          Use CoinMarketCap data
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGeneratePrediction} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : "Generate Prediction"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Settings className="h-3 w-3" />
              {selectedModels.length > 0 
                ? `${selectedModels.length} model${selectedModels.length !== 1 ? 's' : ''} selected`
                : "No models selected"}
            </Badge>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="4h">4 Hours</SelectItem>
                <SelectItem value="1d">1 Day</SelectItem>
                <SelectItem value="1w">1 Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : predictions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <BrainCircuit className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No predictions available</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedModels.length === 0
                ? "Please select at least one AI model to view predictions"
                : "No predictions from the selected models yet"}
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="gap-1"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Generate First Prediction
            </Button>
          </div>
        ) : (
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
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${getSignalColor(prediction.action)}`}
                    >
                      {getSignalVariant(prediction.action, prediction.confidence)}
                      <span className="ml-1">{getSignalLabel(prediction.action, prediction.confidence)}</span>
                    </Button>
                    <span
                      className={`flex items-center ${
                        prediction.performance === null
                          ? "text-muted-foreground"
                          : prediction.performance > 0
                            ? "text-green-500"
                            : "text-red-500"
                      }`}
                    >
                      {prediction.performance === null ? (
                        "Pending"
                      ) : prediction.performance > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      <span>{formatPerformance(prediction.performance)}</span>
                    </span>
                  </div>
                </div>
                {/* <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Confidence</span>
                    <span className="font-medium">{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div> */}
                {/* {prediction.priceTarget && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Price Target</span>
                      <span className="font-medium">${prediction.priceTarget.toLocaleString()}</span>
                    </div>
                  </div>
                )} */}
                 {/* Update the Progress bar to show actual confidence */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span>Model Confidence</span>
          <span className="font-medium">{prediction.confidence}%</span>
        </div>
        <Progress 
          value={prediction.confidence} 
          className="h-2"
          indicatorClassName={
            prediction.confidence >= 70 ? "bg-green-500" :
            prediction.confidence >= 40 ? "bg-yellow-500" :
            "bg-red-500"
          }
        />
        <div className="text-xs text-muted-foreground mt-1">
          {prediction.confidence >= 70 ? "Strong signal" :
           prediction.confidence >= 40 ? "Moderate confidence" :
           "Low confidence"}
        </div>
      </div>


                {prediction.priceTarget ? (
                 <div className="mb-2">
                <div className="flex items-center justify-between text-sm">
             <span>Price Target</span>
               <span className="font-medium">${prediction.priceTarget.toLocaleString()}</span>
              </div>
             </div>
               ) : (
              <div className="mb-2 text-sm text-muted-foreground">
             No specific price target identified (waiting for clearer signals)
             </div>
             )}
                <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
                  {prediction.reasoning}
                </p>
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
                    {prediction.likes || 0}
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
        )}
      </CardContent>
    </Card>
  )
}
