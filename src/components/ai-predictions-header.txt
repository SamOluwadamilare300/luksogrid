"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Sparkles, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { AIModelSelector } from "@/components/ai-model-selector";
import { fetchUserModelPreferences } from "@/app/actions/ai-models";
import { useLukso } from "@/components/lukso-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createAIPrediction } from "@/app/actions/ai-predictions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function AIPredictionsHeader() {
  const [timeframe, setTimeframe] = useState("1d");
  const [selectedModels, setSelectedModels] = useState<number[]>([]);
  const [asset, setAsset] = useState("LYX");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [useMarketData, setUseMarketData] = useState(true);
  const { universalProfile } = useLukso();
  const { toast } = useToast();

  useEffect(() => {
    async function loadUserPreferences() {
      if (universalProfile) {
        try {
          const preferences = await fetchUserModelPreferences(
            universalProfile.address
          );
          if (
            preferences &&
            Array.isArray(preferences) &&
            preferences.length > 0
          ) {
            if (Array.isArray(preferences)) {
              setSelectedModels(preferences.map((p: any) => p.model.id));
            }
          }
        } catch (error) {
          console.error("Failed to load user preferences:", error);
        }
      }
    }

    loadUserPreferences();
  }, [universalProfile]);

  // const handleGeneratePrediction = async () => {
  //   if (selectedModels.length === 0) {
  //     toast({
  //       title: "No models selected",
  //       description:
  //         "Please select at least one AI model to generate a prediction.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsGenerating(true);
  //   try {
  //     const response = await fetch(
  //       "https://router.huggingface.co/hyperbolic/v1/chat/completions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY ?? ""}`,
  //         },
  //         body: JSON.stringify({
  //           messages: [
  //             {
  //               role: "user",
  //               content: `Generate a ${timeframe} price prediction for ${asset} cryptocurrency. 
  //                     Consider technical indicators and market trends. 
  //                     Provide your prediction in a clear format with potential price targets.`,
  //             },
  //           ],
  //           stream: false,
  //           model: "deepseek-ai/DeepSeek-V3-0324",
  //           temperature: 0.7,
  //           max_tokens: 512,
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`API request failed with status ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const prediction = data.choices[0].message.content;
  //     console.log("Prediction:", prediction);

  //     if (!prediction) {
  //       throw new Error("No prediction returned from API");
  //     }

  //     toast({
  //       title: "Prediction Generated",
  //       description: (
  //         <div className="max-w-[300px]">
  //           <p className="font-medium">
  //             {asset} {timeframe} Prediction:
  //           </p>
  //           <p className="text-sm mt-2">{prediction}</p>
  //         </div>
  //       ),
  //     });
  //   } catch (error) {
  //     console.error("Prediction error:", error);
  //     toast({
  //       title: "Prediction Failed",
  //       description:
  //         error instanceof Error ? error.message : "An unknown error occurred",
  //     });
  //   } finally {
  //     setIsGenerating(false);
  //     setIsDialogOpen(false);
  //   }
  // };

  return (
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
        {/* <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Generate New Prediction</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate New AI Prediction</DialogTitle>
                <DialogDescription>
                  Select the asset and timeframe for your new prediction.
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
                  <div className="col-span-3">
                    <AIModelSelector
                      selectedModels={selectedModels}
                      setSelectedModels={setSelectedModels}
                    />
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
                <div className="col-span-4">
                  <p className="text-xs text-muted-foreground">
                    DeepSeek models leverage CoinMarketCap metrics for more
                    accurate predictions.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGeneratePrediction} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        </div> */}
      </div>

      {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="4h">Last 4 Hours</SelectItem>
              <SelectItem value="1d">Last Day</SelectItem>
              <SelectItem value="1w">Last Week</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <AIModelSelector
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
          />
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Model settings</span>
          </Button>
        </div>
      </div> */}
    </div>
  );
}
