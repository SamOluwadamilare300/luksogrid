"use client"

import { Button } from "@/components/ui/button"
import { useLukso } from "@/components/lukso-provider"
import { Loader2 } from "lucide-react"

export function ConnectWallet() {
  const { connect, isConnecting } = useLukso()

  return (
    <Button size="lg" onClick={connect} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        "Connect Universal Profile"
      )}
    </Button>
  )
}
