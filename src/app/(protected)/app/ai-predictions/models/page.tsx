"use client"

import { useState, useEffect } from "react"
import { AIModelDetails } from "@/components/ai-model-details"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrainCircuit, Plus, Search } from "lucide-react"
import { fetchAIModels, toggleModelPreference } from "@/app/actions/ai-models"
import { useLukso } from "@/components/lukso-provider"
import { useToast } from "@/hooks/use-toast"
import type { AIModel } from "@/components/ai-model-selector"

export default function AIModelsPage() {
  const [models, setModels] = useState< AIModel[]>([])
  const [activeModels, setActiveModels] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const { universalProfile } = useLukso()
  const { toast } = useToast()

  useEffect(() => {
    async function loadModels() {
      setLoading(true)
      try {
        const { success, models: fetchedModels } = await fetchAIModels()

        if (success && fetchedModels) {
          setModels(fetchedModels)

          // Set initial active models (in a real app, this would come from user preferences)
          const initialActive = fetchedModels.filter((m: any) => m.is_active !== false).map((m: any) => m.id)

          setActiveModels(initialActive)
        }
      } catch (error) {
        console.error("Failed to load AI models:", error)
        toast({
          title: "Error",
          description: "Failed to load AI models. Please try again.",
          // variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadModels()
  }, [])

  const toggleModelActive = async (modelId: number) => {
    if (!universalProfile) {
      toast({
        title: "Not connected",
        description: "Please connect your Universal Profile to manage AI models.",
        variant: "destructive",
      })
      return
    }

    const isActive = !activeModels.includes(modelId)

    try {
      const { success } = await toggleModelPreference(universalProfile.address, modelId, isActive)

      if (success) {
        if (isActive) {
          setActiveModels([...activeModels, modelId])
        } else {
          setActiveModels(activeModels.filter((id) => id !== modelId))
        }

        toast({
          title: isActive ? "Model activated" : "Model deactivated",
          description: `Successfully ${isActive ? "activated" : "deactivated"} the AI model.`,
        })
      }
    } catch (error) {
      console.error("Error toggling model:", error)
      toast({
        title: "Error",
        description: "Failed to update model status. Please try again.",
        // variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            AI Models
            <BrainCircuit className="ml-2 h-5 w-5 text-purple-500" />
          </h1>
          <p className="text-muted-foreground">Manage and configure your AI prediction models</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Model
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search models..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="grok">Grok</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="active">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Models</TabsTrigger>
          <TabsTrigger value="active">Active ({activeModels.length})</TabsTrigger>
          <TabsTrigger value="custom">Custom Models</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex items-center justify-center p-8 mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-4">
              {models.map((model) => (
                <AIModelDetails
                  key={model.id}
                  model={model}
                  isActive={activeModels.includes(model.id)}
                  onToggleActive={toggleModelActive}
                />
              ))}
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              {models
                .filter((model) => activeModels.includes(model.id))
                .map((model) => (
                  <AIModelDetails key={model.id} model={model} isActive={true} onToggleActive={toggleModelActive} />
                ))}
            </TabsContent>
            <TabsContent value="custom" className="mt-4">
              <div className="flex flex-col items-center justify-center p-8 border rounded-lg border-dashed">
                <BrainCircuit className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Custom Models Yet</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Create your own AI prediction models or import existing ones
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Model
                </Button>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
