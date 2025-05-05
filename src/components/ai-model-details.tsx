"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BrainCircuit, ChevronDown, ChevronUp, Clock, Code, Settings } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { AIModel } from "@/components/ai-model-selector"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const performanceData = [
  { month: "Jan", accuracy: 76, signals: 24 },
  { month: "Feb", accuracy: 82, signals: 31 },
  { month: "Mar", accuracy: 79, signals: 28 },
  { month: "Apr", accuracy: 85, signals: 35 },
  { month: "May", accuracy: 81, signals: 30 },
  { month: "Jun", accuracy: 88, signals: 42 },
]

interface AIModelDetailsProps {
  model: AIModel
  isActive: boolean
  onToggleActive: (modelId: number) => void
}

export function AIModelDetails({ model, isActive, onToggleActive }: AIModelDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [temperature, setTemperature] = useState(model.parameters?.temperature || 0.7)
  const [huggingFaceToken, setHuggingFaceToken] = useState(model.parameters?.huggingFaceToken || "")

  // Calculate mock accuracy based on model id
  const accuracy = 75 + (model.id % 15)

  const handleSaveSettings = () => {
    // In a real app, this would update the model parameters in the database
    console.log("Saving settings:", { temperature, huggingFaceToken })
    setIsSettingsOpen(false)
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-purple-500" />
            <CardTitle>{model.name}</CardTitle>
            <Badge variant="outline">{model.model_type}</Badge>
            <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Inactive"}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={isActive ? "default" : "outline"} size="sm" onClick={() => onToggleActive(model.id)}>
              {isActive ? "Deactivate" : "Activate"}
            </Button>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Model settings</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Model Settings</DialogTitle>
                  <DialogDescription>Configure parameters for {model.name}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="temperature" className="text-right">
                      Temperature
                    </Label>
                    <div className="col-span-3">
                      <div className="flex items-center gap-4">
                        <Slider
                          id="temperature"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[temperature]}
                          onValueChange={(values) => setTemperature(values[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{temperature}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Higher values produce more creative results, lower values are more deterministic.
                      </p>
                    </div>
                  </div>

                  {model.model_type === "deepseek" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="huggingface-token" className="text-right">
                        HuggingFace Token
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id="huggingface-token"
                          type="password"
                          value={huggingFaceToken}
                          onChange={(e) => setHuggingFaceToken(e.target.value)}
                          placeholder="Enter your HuggingFace token"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Required for DeepSeek models. Get your token from huggingface.co.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <CardDescription className="flex items-center justify-between mt-1">
          <span>Version {model.parameters?.version || "1.0"}</span>
          <span className="font-medium">{accuracy}% accuracy</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{model.description}</p>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Overall Accuracy</span>
            <span className="font-medium">{accuracy}%</span>
          </div>
          <Progress value={accuracy} className="h-2" />
        </div>

        {model.model_type === "deepseek" && (
          <div className="mb-4 p-3 bg-purple-500/10 rounded-md border border-purple-500/20">
            <div className="flex items-center text-sm font-medium text-purple-500 mb-2">
              <BrainCircuit className="mr-2 h-4 w-4" />
              LUKSO Blockchain Integration
            </div>
            <p className="text-sm text-muted-foreground">
              This model uses DeepSeek AI to analyze LUKSO blockchain data and CoinMarketCap metrics for more accurate
              predictions.
            </p>
          </div>
        )}

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-2 h-auto">
              <span className="text-sm font-medium">Performance Details</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2">
              <Tabs defaultValue="accuracy">
                <TabsList className="mb-4">
                  <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                  <TabsTrigger value="signals">Signals</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                </TabsList>
                <TabsContent value="accuracy" className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#8884d8"
                        name="Accuracy (%)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="signals" className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="signals"
                        stroke="#82ca9d"
                        name="Signals Generated"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="assets">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>BTC</span>
                      <Badge variant="outline">92% accuracy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>ETH</span>
                      <Badge variant="outline">87% accuracy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>LYX</span>
                      <Badge variant="outline">94% accuracy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>SOL</span>
                      <Badge variant="outline">81% accuracy</Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {/* <span>Updated {new Date(model.updated_at).toLocaleDateString()}</span> */}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  <span>Based on 120,000 data points</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
