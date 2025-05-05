"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLukso } from "@/components/lukso-provider"
import { ConnectWallet } from "@/components/connect-wallet"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { universalProfile } = useLukso()
  const router = useRouter()

  useEffect(() => {
    if (!universalProfile) {
      router.push("/")
    }
  }, [universalProfile, router])

  if (!universalProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6">Connect Your Universal Profile</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          You need to connect your LUKSO Universal Profile to access the dashboard.
        </p>
        <ConnectWallet />
      </div>
    )
  }

  return <>{children}</>
}
