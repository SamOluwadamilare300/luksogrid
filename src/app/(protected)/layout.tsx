'use client'

import { redirect } from "next/navigation"
import { useAccount } from "wagmi"

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const { isConnected } = useAccount()
    if (!isConnected) redirect('/')
    return (
        <div>{children}</div>
    )
}
