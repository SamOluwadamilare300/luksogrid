"use client"

import { useState, useEffect } from "react"
// import { AIPredictionsHeader } from "@/components/ai-predictions-header"
import { AIPredictionsList } from "@/components/ai-predictions-list"
import { AIPredictionsStats } from "@/components/ai-predictions-stats"
import { MarketData } from "@/components/market-data"
import { Button } from "@/components/ui/button"
import { BrainCircuit } from "lucide-react"
import Link from "next/link"
// import { AIPredictionsFallback } from "@/components/prediction-error-fallback"

export default function AIPredictionsPage() {
  const [isPrismaAvailable, setIsPrismaAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if Prisma is available
    fetch("/api/health-check")
      .then((res) => res.json())
      .then((data) => {
        setIsPrismaAvailable(data.prismaAvailable)
      })
      .catch(() => {
        setIsPrismaAvailable(false)
      })
  }, [])

  // Show loading state while checking Prisma availability
  if (isPrismaAvailable === null) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If Prisma is not available, show the fallback component
  // if (!isPrismaAvailable) {
  //   return <AIPredictionsFallback />
  // }

  // If Prisma is available, show the full component
  return (
    <div className="space-y-6">
      {/* <AIPredictionsHeader /> */}
      <div className="flex justify-end">
        <Link href="/app/ai-predictions/models">
          <Button variant="outline" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            Manage AI Models
          </Button>
        </Link>
      </div>
      <AIPredictionsStats />
      <div className="grid gap-6 md:grid-cols-2">
      <AIPredictionsList 
      availableModels={[
      { id: 1, name: "DeepSeek-V3-0324" },
      { id: 2, name: "GPT-4" }
       ]}
      selectedModels={[1]}
       onModelSelectionChange={(models) => console.log(models)}
         />
        <div className="space-y-6">
          <MarketData />
        </div>
      </div>
    </div>
  )
}
