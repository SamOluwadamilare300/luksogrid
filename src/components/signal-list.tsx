"use client"

import { useState } from "react"
import type { Signal } from "@/types"
import { SignalCard } from "@/components/signal-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SignalListProps {
  signals: Signal[]
}

export function SignalList({ signals }: SignalListProps) {
  const [userAddress, setUserAddress] = useState("")
  const [userName, setUserName] = useState("")
  const [showUserForm, setShowUserForm] = useState(false)

  if (signals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No signals found. Create your first signal to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {!userAddress && !showUserForm && (
        <div className="text-center mb-6">
          <Button variant="outline" onClick={() => setShowUserForm(true)}>
            Set Your Identity to Like Signals
          </Button>
        </div>
      )}

      {showUserForm && (
        <div className="bg-muted/30 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium mb-4">Your Identity</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="user-name">Your Name</Label>
              <Input
                id="user-name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-address">Your Address</Label>
              <Input
                id="user-address"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="Enter your wallet address"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                if (userName && userAddress) {
                  setShowUserForm(false)
                }
              }}
              disabled={!userName || !userAddress}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} userAddress={userAddress} userName={userName} />
        ))}
      </div>
    </div>
  )
}



// "use client"

// import { useAccount } from "wagmi"
// import { useUniversalProfile } from "@/hooks"
// import type { Signal } from "@/types"
// import { SignalCard } from "@/components/signal-card"

// interface SignalListProps {
//   signals: Signal[]
// }

// export function SignalList({ signals }: SignalListProps) {
//   const { address } = useAccount()
//   const { profile } = useUniversalProfile(address, "https://rpc.mainnet.lukso.network")

//   if (signals.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-muted-foreground">No signals found. Create your first signal to get started.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {signals.map((signal) => (
//           <SignalCard
//             key={signal.id}
//             signal={signal}
//             userAddress={address}
//             userName={profile?.name}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

