"use client"

import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { useLukso } from "@/components/lukso-provider"
import { useRouter } from "next/navigation"

export function LandingCTA() {
  const { universalProfile } = useLukso()
  const router = useRouter()

  const handleGetStarted = () => {
    if (universalProfile) {
      router.push("/dashboard")
    }
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the LUKSO Grid Signal Community?</h2>
        <p className="text-white/80 mb-8 text-lg">
          Connect your Universal Profile and start discovering, sharing, and earning from your trading signals today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {universalProfile ? (
            <Button size="lg" variant="secondary" onClick={handleGetStarted}>
              Go to Dashboard
            </Button>
          ) : (
            <ConnectWallet />
          )}
        </div>
      </div>
    </section>
  )
}
