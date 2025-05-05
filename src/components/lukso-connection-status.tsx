"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { getProvider } from "@/lib/lukso-contract"
import { useToast } from "@/hooks/use-toast"


export function LuksoConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const { toast } = useToast()

  const checkConnection = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setIsConnected(false)
      return
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      setIsConnected(accounts.length > 0)

      if (accounts.length > 0) {
        setAddress(accounts[0])
        const chainIdHex = await window.ethereum.request({ method: "eth_chainId" })
        setChainId(chainIdHex)
      }
    } catch (error) {
      console.error("Error checking connection:", error)
      setIsConnected(false)
    }
  }

  useEffect(() => {
    checkConnection()

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      setIsConnected(accounts.length > 0)
      if (accounts.length > 0) {
        setAddress(accounts[0])
      } else {
        setAddress(null)
      }
    }

    // Listen for chain changes
    const handleChainChanged = (chainId: string) => {
      setChainId(chainId)
      window.location.reload()
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const connect = async () => {
    if (!window.ethereum) {
      toast({
        title: "No Ethereum Provider",
        description: "Please install the Universal Profile browser extension or MetaMask",
        // variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    try {
      await getProvider()
      await checkConnection()
      toast({
        title: "Connected",
        description: "Successfully connected to LUKSO network",
      })
    } catch (error) {
      console.error("Error connecting:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to LUKSO network",
        // variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const isLuksoNetwork = chainId === "0x2a" // LUKSO Testnet chainId

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <>
          <Badge variant={isLuksoNetwork ? "default" : "destructive"}>
            {isLuksoNetwork ? "LUKSO Connected" : "Wrong Network"}
          </Badge>
          {!isLuksoNetwork && (
            <Button variant="outline" size="sm" onClick={connect}>
              Switch to LUKSO
            </Button>
          )}
        </>
      ) : (
        <Button size="sm" onClick={connect} disabled={isConnecting}>
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect to LUKSO"
          )}
        </Button>
      )}
    </div>
  )
}
