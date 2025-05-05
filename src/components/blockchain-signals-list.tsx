"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink } from "lucide-react"
import { getAllSignals, type Signal } from "@/lib/lukso-contract"
import { useToast } from "@/hooks/use-toast"



export function BlockchainSignalsList() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSignals() {
      try {
        setLoading(true)
        setError(null)
        const fetchedSignals = await getAllSignals()
        setSignals(fetchedSignals)
      } catch (err) {
        console.error("Error fetching signals:", err)
        setError("Failed to fetch signals from the blockchain. Please make sure you're connected to the LUKSO network.")
        toast({
          title: "Error",
          description: "Failed to fetch signals from the blockchain",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSignals()
  }, [toast])

  // Function to format timeframe (assuming it's in seconds)
  const formatTimeframe = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`
    return `${Math.floor(seconds / 86400)} days`
  }

  // Function to get a shortened version of an address
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Function to get the explorer URL for an address
  const getExplorerUrl = (address: string) => {
    return `https://explorer.lukso.network/address/${address}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>On-Chain Trading Signals</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : signals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No signals found on the blockchain yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {signals.map((signal) => (
              <div key={signal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Badge variant={signal.action.toLowerCase() === "buy" ? "default" : "destructive"}>
                      {signal.action.toUpperCase()}
                    </Badge>
                    <span className="ml-2 font-medium">
                      Asset:{" "}
                      <a
                        href={getExplorerUrl(signal.asset)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center"
                      >
                        {shortenAddress(signal.asset)}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </span>
                  </div>
                  <Badge variant="outline">{formatTimeframe(signal.timeframe)}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Price Target:</span>
                    <p className="font-medium">${Number.parseFloat(signal.priceTarget).toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <p className="font-medium">{signal.confidenceLevel}%</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Analysis:</span>
                  <p className="mt-1 text-sm">{signal.analysis}</p>
                </div>

                <div className="text-xs text-muted-foreground">Created: {signal.formattedTimestamp}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
