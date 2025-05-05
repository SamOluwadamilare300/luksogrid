"use client"

import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { useLukso } from "@/components/lukso-provider"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function LandingHero() {
  const { universalProfile } = useLukso()
  const router = useRouter()

  const handleGetStarted = () => {
    if (universalProfile) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="relative py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10" />
      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          LUKSO Grid Signal
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
          A social DeFi analytics dashboard powered by LUKSO Universal Profiles. Discover, follow, and share trading
          signals with the community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {universalProfile ? (
            <Button size="lg" onClick={handleGetStarted}>
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <ConnectWallet />
          )}
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
