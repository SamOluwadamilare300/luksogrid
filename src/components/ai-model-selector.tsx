
"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export type AIModel = {
  id: number
  name: string
  description?: string
  model_type: string
  parameters: any
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

interface AIModelSelectorProps {
  selectedModels: number[]
  setSelectedModels: (models: number[]) => void
}

export function AIModelSelector({ selectedModels, setSelectedModels }: AIModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadModels() {
      try {
        // Load from your existing API endpoint
        const response = await fetch("/api/ai-models")
        const dbModels = response.ok ? await response.json() : []
        
        // Add DeepSeek as an available model
        setModels([
          ...(dbModels.success ? dbModels.models : []),
          {
            id: -1, // Special ID for DeepSeek
            name: "DeepSeek-V3",
            description: "Advanced AI prediction model from DeepSeek",
            model_type: "AI",
            parameters: {
              provider: "HuggingFace",
              model: "deepseek-ai/DeepSeek-V3-0324"
            },
            is_active: true,
            createdAt: new Date().toISOString()
          }
        ])
      } catch (error) {
        console.error("Failed to load models:", error)
        toast({
          title: "Error",
          description: "Could not load AI models",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadModels()
  }, [toast])

  const toggleModel = (modelId: number) => {
    setSelectedModels(
      selectedModels.includes(modelId)
        ? selectedModels.filter(id => id !== modelId)
        : [...selectedModels, modelId]
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open} 
          className="justify-between"
          disabled={loading}
        >
          {loading ? "Loading models..." :
           selectedModels.length === 0 ? "Select models..." :
           `${selectedModels.length} selected`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
            <CommandEmpty>No models found</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.name}
                  onSelect={() => toggleModel(model.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedModels.includes(model.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span>{model.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {model.model_type}
                        </Badge>
                      </div>
                      {model.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {model.description}
                        </p>
                      )}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[300px]">
                          <p className="text-sm">
                            <strong>Model:</strong> {model.name}<br />
                            <strong>Type:</strong> {model.model_type}<br />
                            {model.description && (
                              <>
                                <strong>Description:</strong> {model.description}
                              </>
                            )}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
