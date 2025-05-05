import { GovernanceProposals } from "@/components/governance-proposals"
import { GovernanceStats } from "@/components/governance-stats"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function GovernancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Community Governance</h1>
        <Link href="/dashboard/governance/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground">
        Participate in community-driven validation and sentiment analysis using LSP7 Digital Assets.
      </p>
      <GovernanceStats />
      <GovernanceProposals />
    </div>
  )
}
