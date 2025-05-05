"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UniversalProfile = {
  address: string
  name: string
  avatar: string
  isConnected: boolean
}
       
type LuksoContextType = {
  universalProfile: UniversalProfile | null
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
}

const LuksoContext = createContext<LuksoContextType | undefined>(undefined)

export function LuksoProvider({ children }: { children: ReactNode }) {
  const [universalProfile, setUniversalProfile] = useState<UniversalProfile | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)


  useEffect(() => {
    const storedProfile = localStorage.getItem("luksoProfile")
    if (storedProfile) {
      setUniversalProfile(JSON.parse(storedProfile))
    }
  }, [])

  const connect = async () => {
    setIsConnecting(true)

    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockProfile = {
        address: "0x1234...5678",
        name: "LUKSO Trader",
        avatar: "/placeholder.svg?height=100&width=100",
        isConnected: true,
      }

      setUniversalProfile(mockProfile)
      localStorage.setItem("luksoProfile", JSON.stringify(mockProfile))
    } catch (error) {
      console.error("Failed to connect to Universal Profile:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setUniversalProfile(null)
    localStorage.removeItem("luksoProfile")
  }

  return (
    <LuksoContext.Provider value={{ universalProfile, connect, disconnect, isConnecting }}>
      {children}
    </LuksoContext.Provider>
  )
}

export function useLukso() {
  const context = useContext(LuksoContext)
  if (context === undefined) {
    throw new Error("useLukso must be used within a LuksoProvider")
  }
  return context
}
